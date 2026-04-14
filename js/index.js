// =====================================================
// CNH Brasil · app.js
// Todo o JavaScript lê os dados de data.json via fetch
// =====================================================

let DB = null;
let currentModuleId = null;
let currentLessonIdx = 0;
let quizStates = {};
let simState = {};
const STORAGE_KEY = 'cnhBrasilProgress';
let APP_PROGRESS = { lastModule: null, quizzes: {}, simulado: null };

function loadUserProgress() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored && typeof stored === 'object') APP_PROGRESS = stored;
  } catch (e) {
    console.warn('Não foi possível carregar o progresso salvo:', e);
  }
}

function saveUserProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(APP_PROGRESS));
  } catch (e) {
    console.warn('Não foi possível salvar o progresso:', e);
  }
}

function saveLastModulePosition() {
  if (!currentModuleId && currentModuleId !== 0) return;
  APP_PROGRESS.lastModule = { id: currentModuleId, lessonIdx: currentLessonIdx };
  saveUserProgress();
}

function getSavedLessonIndex(moduleId) {
  return APP_PROGRESS.lastModule?.id === moduleId ? APP_PROGRESS.lastModule.lessonIdx : 0;
}

function persistQuizState(id) {
  const state = quizStates[id];
  if (!state) return;
  APP_PROGRESS.quizzes[id] = {
    current: state.current,
    score: state.score
  };
  saveUserProgress();
}

function clearQuizProgress(id) {
  if (APP_PROGRESS.quizzes[id]) {
    delete APP_PROGRESS.quizzes[id];
    saveUserProgress();
  }
}

function persistSimState() {
  if (!simState || simState.timeLeft == null) return;
  APP_PROGRESS.simulado = {
    active: true,
    current: simState.current,
    score: simState.score,
    timeLeft: simState.timeLeft,
    answered: simState.answered
  };
  saveUserProgress();
}

function clearSimProgress() {
  APP_PROGRESS.simulado = null;
  saveUserProgress();
}

function updateSimStartButton() {
  const btn = document.getElementById('btn-start-sim');
  if (!btn) return;
  if (APP_PROGRESS.simulado?.active && APP_PROGRESS.simulado.timeLeft > 0 && APP_PROGRESS.simulado.current < (DB?.simulado?.length || 0)) {
    btn.textContent = '▶ Continuar Simulado';
  } else {
    btn.textContent = '▶ Iniciar Simulado';
  }
}

// ─────────────────────────────────────────────────────
// BOOT — carrega data.json antes de tudo
// ─────────────────────────────────────────────────────
async function boot() {
  try {
    const res = await fetch('database/data.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    DB = await res.json();
    loadUserProgress();
    renderModulesHome();
    renderPlacasGrid('todas');
    renderInfracoes();
    renderDirecaoCards();
    updateSimStartButton();
  } catch (e) {
    document.body.innerHTML = `
      <div style="color:#ef4444;padding:3rem;font-family:monospace;background:#0a0e1a;min-height:100vh">
        <h2>❌ Erro ao carregar data.json</h2>
        <p style="margin-top:1rem;color:#6b7ea0">${e.message}</p>
        <p style="margin-top:1rem;color:#6b7ea0">
          Certifique-se de abrir o app via servidor HTTP, não como arquivo local (file://).<br>
          Exemplo: <code>npx serve .</code> ou use o Live Server do VS Code.
        </p>
      </div>`;
  }
}

// ─────────────────────────────────────────────────────
// NAVEGAÇÃO POR ABAS
// ─────────────────────────────────────────────────────
function showTab(tab, btn) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('sec-' + tab).classList.add('active');
  btn.classList.add('active');
}

// ─────────────────────────────────────────────────────
// MÓDULOS — tela inicial
// ─────────────────────────────────────────────────────
function renderModulesHome() {
  const grid = document.getElementById('modules-grid');
  const statModules   = document.getElementById('stat-modules');
  const statQuestions = document.getElementById('stat-questions');
  const statLessons   = document.getElementById('stat-lessons');

  if (statModules)   statModules.textContent   = DB.modules.length;
  if (statQuestions) statQuestions.textContent = DB.simulado.length + '+';
  if (statLessons)   statLessons.textContent   = DB.modules.reduce((a, m) => a + m.lessons.length, 0);

  grid.innerHTML = DB.modules.map((mod, modIdx) => `
    <div class="module-card" onclick="openModule(${mod.id})">
      <div class="module-status status-${mod.status}">
        ${ mod.status === 'em-andamento' ? (typeof t==='function'?t('statusEmAndamento'):'Em andamento') :
           mod.status === 'concluido'    ? (typeof t==='function'?t('statusConcluido'):'Concluído')    : (typeof t==='function'?t('statusNaoIniciado'):'Não iniciado') }
      </div>
      <div class="module-num">Módulo 0${mod.id}</div>
      <div class="module-icon">${mod.icon}</div>
      <div class="module-title">${mod.title}</div>
      <div class="module-desc">${mod.desc}</div>
      <div class="module-progress">
        <div class="module-progress-bar" style="width:${mod.progress}%"></div>
      </div>
    </div>
  `).join('');
}

function backToModules() {
  document.getElementById('module-content-area').style.display = 'none';
  document.getElementById('modules-home').style.display = 'block';
}

// ─────────────────────────────────────────────────────
// ABRIR MÓDULO
// ─────────────────────────────────────────────────────
function openModule(id) {
  currentModuleId  = id;
  currentLessonIdx = getSavedLessonIndex(id) || 0;
  saveLastModulePosition();
  document.getElementById('modules-home').style.display = 'none';
  document.getElementById('module-content-area').style.display = 'block';
  renderLesson();
}

function goToLesson(idx) {
  const mod = DB.modules.find(m => m.id === currentModuleId);
  if (!mod || idx < 0 || idx >= mod.lessons.length) return;
  currentLessonIdx = idx;
  saveLastModulePosition();
  renderLesson();
  document.querySelector('.lesson-area')?.scrollIntoView({ behavior: 'smooth' });
}

// ─────────────────────────────────────────────────────
// RENDERIZAR AULA
// ─────────────────────────────────────────────────────
function renderLesson() {
  const mod    = DB.modules.find(m => m.id === currentModuleId);
  const lesson = mod.lessons[currentLessonIdx];
  const inner  = document.getElementById('module-content-inner');

  inner.innerHTML = `
    <div class="content-layout">
      <div class="sidebar">
        <div class="sidebar-title">Módulo ${mod.id}</div>
        ${mod.lessons.map((l, i) => `
          <div class="sidebar-item ${i === currentLessonIdx ? 'active' : ''}" onclick="goToLesson(${i})">
            <span class="item-icon">${l.icon}</span>
            <span>${l.title}</span>
            ${i < currentLessonIdx ? '<span class="item-check">✓</span>' : ''}
          </div>
        `).join('')}
      </div>
      <div class="lesson-area">
        <div class="lesson-header">
          <div class="lesson-emoji">${lesson.icon}</div>
          <div class="lesson-meta">
            <div class="lesson-label">Módulo ${mod.id} · Aula ${currentLessonIdx + 1} de ${mod.lessons.length}</div>
            <div class="lesson-title-h">${lesson.title}</div>
          </div>
        </div>
        <div class="lesson-body lesson-content-area">
          ${buildLessonBody(lesson)}
          ${buildQuizHTML(lesson)}
          <div class="lesson-nav">
            <button class="lesson-nav-btn"
              onclick="goToLesson(${currentLessonIdx - 1})"
              ${currentLessonIdx === 0 ? 'disabled' : ''}>← Aula anterior</button>
            <button class="lesson-nav-btn next-btn"
              onclick="goToLesson(${currentLessonIdx + 1})"
              ${currentLessonIdx === mod.lessons.length - 1 ? 'disabled' : ''}>Próxima aula →</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // interativos
  if (lesson.type === 'semaforo') initSemaforo();
  initQuiz(lesson.id, lesson.quiz);

  // TTS: recarrega seções da aula toda para o player global
  setTimeout(() => {
    const el = document.getElementById('module-content-inner');
    if (el && typeof TTS !== 'undefined') {
      const secs = TTS.buildSectionsFromElement(el);
      TTS.load(secs);
    }
  }, 300);
}

// ─────────────────────────────────────────────────────
// LEITURA DE ÁUDIO POR CARD (inline)
// ─────────────────────────────────────────────────────

let _cardTTSActive = null;
let _cardTTSUtter  = null;

function playCard(cardId) {
  const card = document.getElementById(cardId);
  if (!card) return;

  if (_cardTTSActive === cardId) {
    _stopCardTTS();
    return;
  }

  _stopCardTTS();
  if (typeof TTS !== 'undefined') TTS.stop();

  const titleEl = card.querySelector('.concept-title');
  const bodyEl  = card.querySelector('.concept-body');
  const rawTitle = titleEl ? titleEl.textContent.replace('🔊','').replace('⏹','').trim() : '';
  const rawBody  = bodyEl  ? (bodyEl.textContent || bodyEl.innerText || '').trim()
                           : card.textContent.replace('🔊','').replace('⏹','').trim();
  const text = [rawTitle, rawBody].filter(Boolean).join('. ');
  if (!text) return;

  _cardTTSActive = cardId;
  card.classList.add('card-tts-playing');
  _updateCardBtn(cardId, true);

  const lang = (typeof getLangVoice === 'function') ? getLangVoice() : 'pt-BR';
  const rate = parseFloat(document.getElementById('tts-rate')?.value || '1');

  _cardTTSUtter = new SpeechSynthesisUtterance(text);
  _cardTTSUtter.lang  = lang;
  _cardTTSUtter.rate  = rate;
  _cardTTSUtter.pitch = 1;
  _cardTTSUtter.onend   = () => _stopCardTTS(cardId);
  _cardTTSUtter.onerror = () => _stopCardTTS(cardId);

  window.speechSynthesis.speak(_cardTTSUtter);
}

function _stopCardTTS(cardId) {
  if (_cardTTSUtter) {
    _cardTTSUtter.onend = null;
    _cardTTSUtter.onerror = null;
    _cardTTSUtter = null;
  }
  window.speechSynthesis.cancel();
  document.querySelectorAll('.card-tts-playing').forEach(el => el.classList.remove('card-tts-playing'));
  document.querySelectorAll('.card-tts-btn').forEach(b => {
    b.textContent = '🔊';
    b.classList.remove('playing');
    b.title = 'Ouvir este conteúdo';
  });
  _cardTTSActive = null;
}

function _updateCardBtn(cardId, isPlaying) {
  const card = document.getElementById(cardId);
  if (!card) return;
  const btn = card.querySelector('.card-tts-btn');
  if (!btn) return;
  btn.textContent = isPlaying ? '⏹' : '🔊';
  btn.classList.toggle('playing', isPlaying);
  btn.title = isPlaying ? 'Parar leitura' : 'Ouvir este conteúdo';
}

// ─────────────────────────────────────────────────────
// CONSTRUIR CORPO DA AULA (a partir dos dados JSON)
// ─────────────────────────────────────────────────────
function buildLessonBody(lesson, modIdx, lessonIdx) {
  const _lt = (typeof getModuleTranslation==='function' && modIdx!==undefined && lessonIdx!==undefined) ? getModuleTranslation(modIdx, lessonIdx) : null;
  let html = '';

  // semáforo interativo
  if (lesson.type === 'semaforo') html += buildSemaforoWidget();

  // tabela (velocidades, pontos)
  if (lesson.type === 'table' && lesson.tableHeaders) {
    html += `<div style="overflow-x:auto"><table class="infraction-table" style="margin:0 0 1.25rem">
      <thead><tr>${lesson.tableHeaders.map(h => `<th>${h}</th>`).join('')}</tr></thead>
      <tbody>${lesson.tableRows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>`;
  }

  // conceitos
  (lesson.concepts || []).forEach((c, ci) => {
    const cardId = `cc-${lesson.id}-${ci}`;
    html += `<div class="concept-card" id="${cardId}">
      <div class="concept-title">
        <span style="font-size:1.1rem">${c.icon}</span> ${c.title}
        <button class="card-tts-btn" onclick="playCard('${cardId}')" title="Ouvir este conteúdo">🔊</button>
      </div>
      <div class="concept-body">${c.body.replace(/\n/g, '<br>')}</div>
    </div>`;
  });

  // highlights/warns
  (lesson.highlights || []).forEach((h, hi) => {
    const cls = h.type === 'warn' ? 'warn-box' : h.type === 'info' ? 'info-box' : 'highlight-box';
    const boxId = `hl-${lesson.id}-${hi}`;
    html += `<div class="${cls}" id="${boxId}">
      <button class="card-tts-btn card-tts-btn--box" onclick="playCard('${boxId}')" title="Ouvir este conteúdo">🔊</button>
      ${h.text}
    </div>`;
  });

  return html;
}

// ─────────────────────────────────────────────────────
// SEMÁFORO INTERATIVO
// ─────────────────────────────────────────────────────
function buildSemaforoWidget() {
  return `
    <p style="font-size:0.85rem;color:var(--muted);margin-bottom:1rem">Clique nas luzes abaixo para interagir:</p>
    <div class="semaforo-demo">
      <div class="semaforo">
        <div class="semaforo-label">Veicular</div>
        <div class="semaforo-body">
          <div class="light light-red on"    id="v-red"    onclick="setSemaforo('red')"></div>
          <div class="light light-yellow off" id="v-yellow" onclick="setSemaforo('yellow')"></div>
          <div class="light light-green off"  id="v-green"  onclick="setSemaforo('green')"></div>
        </div>
        <div class="semaforo-meaning" id="v-meaning">PARE — proibido avançar</div>
      </div>
      <div class="semaforo">
        <div class="semaforo-label">Pedestre</div>
        <div class="semaforo-body">
          <div class="light light-red on"    id="p-red"></div>
          <div class="light light-green off" id="p-green"></div>
        </div>
        <div class="semaforo-meaning" id="p-meaning">Pedestres aguardam</div>
      </div>
    </div>`;
}

function initSemaforo() { setSemaforo('red'); }

function setSemaforo(color) {
  const cfg = {
    red:    { v:[true,false,false],  meaning:'PARE — proibido avançar',       peds:[true,false],  pedText:'Pedestres aguardam' },
    yellow: { v:[false,true,false],  meaning:'ATENÇÃO — prepare para parar',  peds:[true,false],  pedText:'Pedestres aguardam' },
    green:  { v:[false,false,true],  meaning:'SIGA — com atenção',            peds:[false,true],  pedText:'Pedestres podem cruzar' }
  };
  const s = cfg[color];
  ['red','yellow','green'].forEach((l,i) => {
    const el = document.getElementById('v-' + l);
    if (el) el.className = `light light-${l} ${s.v[i] ? 'on' : 'off'}`;
  });
  const pR = document.getElementById('p-red');
  const pG = document.getElementById('p-green');
  if (pR) pR.className = `light light-red ${s.peds[0] ? 'on' : 'off'}`;
  if (pG) pG.className = `light light-green ${s.peds[1] ? 'on' : 'off'}`;
  const mv = document.getElementById('v-meaning');
  const pm = document.getElementById('p-meaning');
  if (mv) mv.textContent = s.meaning;
  if (pm) pm.textContent = s.pedText;
}

// ─────────────────────────────────────────────────────
// QUIZ DA AULA
// ─────────────────────────────────────────────────────
function buildQuizHTML(lesson, modIdx, lessonIdx) {
  const _qlt = (typeof getModuleTranslation==='function' && modIdx!==undefined && lessonIdx!==undefined) ? getModuleTranslation(modIdx, lessonIdx) : null;
  if (!lesson.quiz || !lesson.quiz.length) return '';
  return `
    <div class="quiz-section" id="quiz-${lesson.id}">
      <div class="quiz-header-row">
        <div class="quiz-title-label">🧠 Quiz da Aula</div>
        <div class="quiz-count" id="qcount-${lesson.id}">1/${lesson.quiz.length}</div>
      </div>
      <div id="quiz-body-${lesson.id}"></div>
    </div>`;
}

function initQuiz(id, questions) {
  if (!questions || !questions.length) return;
  const saved = APP_PROGRESS.quizzes[id];
  const current = saved?.current != null ? Math.min(saved.current, questions.length) : 0;
  const score = saved?.score != null ? saved.score : 0;
  quizStates[id] = {
    _modIdx: modIdx, _lessonIdx: lessonIdx, questions, current, score, answered: false };
  renderQuizQuestion(id);
}

function renderQuizQuestion(id) {
  const state = quizStates[id];
  const el    = document.getElementById('quiz-body-' + id);
  if (!el || !state) return;

  if (state.current >= state.questions.length) {
    persistQuizState(id);
    const pct = Math.round(state.score / state.questions.length * 100);
    el.innerHTML = `
      <div class="quiz-score show">
        <div class="score-emoji">${pct >= 70 ? '🎉' : '📚'}</div>
        <div class="score-text">${state.score}/${state.questions.length} acertos</div>
        <div class="score-sub">${pct >= 70 ? 'Ótimo! Você está no caminho certo.' : 'Continue estudando — você consegue!'}</div>
        <button class="quiz-restart-btn" onclick="restartQuiz('${id}')">↺ Tentar novamente</button>
      </div>`;
    return;
  }

  const q = state.questions[state.current];
  const countEl = document.getElementById('qcount-' + id);
  if (countEl) countEl.textContent = `${state.current + 1}/${state.questions.length}`;

  el.innerHTML = `
    <div class="quiz-q">${q.q}</div>
    <div class="quiz-options">
      ${q.opts.map((opt, i) => `
        <button class="quiz-opt" onclick="answerQuiz('${id}', ${i})">${opt}</button>
      `).join('')}
    </div>
    <div class="quiz-feedback" id="qfb-${id}"></div>
    <button class="quiz-next-btn" id="qnext-${id}" onclick="nextQuiz('${id}')">Próxima →</button>`;
  state.answered = false;
}

function answerQuiz(id, idx) {
  const state = quizStates[id];
  if (!state || state.answered) return;
  state.answered = true;

  const q    = state.questions[state.current];
  const opts = document.querySelectorAll(`#quiz-body-${id} .quiz-opt`);
  opts.forEach(o => o.disabled = true);
  opts[q.correct].classList.add('correct');
  if (idx !== q.correct) opts[idx].classList.add('wrong');
  else state.score++;

  persistQuizState(id);

  const fb = document.getElementById('qfb-' + id);
  fb.className = 'quiz-feedback show ' + (idx === q.correct ? 'ok' : 'err');
  fb.textContent = q.exp;
  document.getElementById('qnext-' + id).classList.add('show');
}

function nextQuiz(id) {
  quizStates[id].current++;
  persistQuizState(id);
  renderQuizQuestion(id);
}

function restartQuiz(id) {
  quizStates[id] = { ...quizStates[id], current: 0, score: 0, answered: false };
  clearQuizProgress(id);
  renderQuizQuestion(id);
}

// ─────────────────────────────────────────────────────
// SIMULADO
// ─────────────────────────────────────────────────────
function startSimulado() {
  const saved = APP_PROGRESS.simulado;
  const total = DB.simulado.length;
  if (saved?.active && saved.timeLeft > 0 && saved.current < total) {
    simState = {
      current: saved.current,
      score: saved.score,
      answered: saved.answered,
      timeLeft: saved.timeLeft,
      timer: null
    };
  } else {
    simState = {
      current: 0,
      score: 0,
      answered: false,
      timeLeft: (DB.meta.simuladoMinutes || 45) * 60,
      timer: null
    };
    clearSimProgress();
  }

  APP_PROGRESS.simulado = {
    active: true,
    current: simState.current,
    score: simState.score,
    timeLeft: simState.timeLeft,
    answered: simState.answered
  };
  saveUserProgress();

  document.getElementById('sim-start-screen').style.display = 'none';
  document.getElementById('sim-quiz-area').style.display = 'block';
  renderSimQuestion();
  simState.timer = setInterval(() => {
    simState.timeLeft--;
    if (simState.timeLeft < 0) simState.timeLeft = 0;
    const el = document.getElementById('sim-timer-disp');
    if (el) {
      const m = Math.floor(simState.timeLeft / 60);
      const s = simState.timeLeft % 60;
      el.textContent = `${m}:${s.toString().padStart(2, '0')}`;
    }
    if (simState.timeLeft <= 0) endSimulado();
    if (simState.timeLeft % 5 === 0) persistSimState();
  }, 1000);
}

function renderSimQuestion() {
  const questions = DB.simulado;
  if (simState.current >= questions.length) { endSimulado(); return; }

  const q        = questions[simState.current];
  const progress = (simState.current / questions.length * 100).toFixed(0);
  const m        = Math.floor(simState.timeLeft / 60);
  const s        = simState.timeLeft % 60;

  document.getElementById('sim-quiz-area').innerHTML = `
    <div class="sim-question-area">
      <div class="sim-q-header">
        <div class="sim-q-num">Questão ${simState.current + 1} / ${questions.length}</div>
        <div class="sim-timer" id="sim-timer-disp">${m}:${s.toString().padStart(2,'0')}</div>
      </div>
      <div class="sim-progress-bar">
        <div class="sim-progress-fill" style="width:${progress}%"></div>
      </div>
      <div class="sim-q-body">
        <div class="sim-q-text">${q.q}</div>
        <div class="sim-options">
          ${q.opts.map((o, i) => `
            <button class="sim-opt" onclick="answerSim(${i})">
              <span class="sim-opt-letter">${'ABCD'[i]}</span>${o}
            </button>`).join('')}
        </div>
        <div id="sim-feedback" style="display:none;margin-top:1rem;padding:.75rem 1rem;border-radius:8px;font-size:.83rem;line-height:1.6"></div>
      </div>
    </div>
    <div class="sim-controls">
      <button class="sim-btn sim-btn-secondary" onclick="endSimulado()">Encerrar</button>
      <button class="sim-btn sim-btn-primary" id="sim-next-btn" onclick="nextSim()" style="display:none">Próxima →</button>
    </div>`;
  simState.answered = false;
}

function answerSim(idx) {
  if (simState.answered) return;
  simState.answered = true;

  const q    = DB.simulado[simState.current];
  const opts = document.querySelectorAll('.sim-opt');
  opts.forEach(o => o.disabled = true);
  opts[q.correct].classList.add('correct');
  if (idx !== q.correct) opts[idx].classList.add('wrong');
  else simState.score++;

  persistSimState();

  const ok = idx === q.correct;
  const fb = document.getElementById('sim-feedback');
  fb.style.cssText = `display:block;
    background:${ok ? 'rgba(16,185,129,.1)' : 'rgba(239,68,68,.1)'};
    border:1px solid ${ok ? 'rgba(16,185,129,.25)' : 'rgba(239,68,68,.25)'};
    color:${ok ? '#a7f3d0' : '#fca5a5'}`;
  fb.textContent = q.exp;
  document.getElementById('sim-next-btn').style.display = 'inline-block';
}

function nextSim() {
  simState.current++;
  persistSimState();
  renderSimQuestion();
}

function endSimulado() {
  clearInterval(simState.timer);
  const total    = DB.simulado.length;
  const pct      = Math.round(simState.score / total * 100);
  const approved = pct >= (DB.meta.passingScore || 70);

  clearSimProgress();
  updateSimStartButton();

  document.getElementById('sim-quiz-area').style.display = 'none';
  const result = document.getElementById('sim-result-area');
  result.style.display = 'block';
  result.innerHTML = `
    <div style="text-align:center;padding:2rem">
      <div style="font-size:4rem;margin-bottom:1rem">${approved ? '🎉' : '📚'}</div>
      <div style="font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;margin-bottom:.5rem">
        ${simState.score}/${total}
      </div>
      <div style="font-size:1.1rem;color:${approved ? 'var(--accent3)' : 'var(--danger)'};margin-bottom:.25rem;font-weight:600">
        ${approved ? '✓ APROVADO' : '✗ REPROVADO'}
      </div>
      <div style="color:var(--muted);font-size:.85rem;margin-bottom:2rem">
        ${pct}% de acertos · Mínimo: ${DB.meta.passingScore || 70}%
      </div>
      <button class="sim-btn sim-btn-primary" onclick="restartSim()" style="font-size:.85rem;padding:.8rem 2rem">
        ↺ Tentar Novamente
      </button>
    </div>`;
}

function restartSim() {
  clearInterval(simState.timer);
  clearSimProgress();
  updateSimStartButton();
  document.getElementById('sim-result-area').style.display = 'none';
  document.getElementById('sim-start-screen').style.display = 'block';
}

// ─────────────────────────────────────────────────────
// GUIA DE PLACAS
// ─────────────────────────────────────────────────────
function renderPlacasGrid(filter) {
  const grid = document.getElementById('placas-grid');
  if (!grid || !DB) return;
  const list = filter === 'todas' ? DB.placas : DB.placas.filter(p => p.category === filter);
  grid.innerHTML = list.map(p => buildSignCard(p)).join('');
}

function buildSignCard(p) {
  return `
    <div class="sign-card" onclick="showSignDetail('${p.id}')">
      ${buildSignShape(p.type, p.symbol)}
      <div class="sign-meaning">${p.name}</div>
    </div>`;
}

function buildSignShape(type, symbol) {
  switch (type) {
    case 'octagon':      return `<div class="sign-octagon">${symbol}</div>`;
    case 'triangle-inv': return `<div class="sign-triangle-inv"></div>`;
    case 'triangle-warn':return `<div class="sign-triangle-warn"></div>`;
    case 'circle-red':   return `<div class="sign-circle-red">${symbol}</div>`;
    case 'circle-blue':  return `<div class="sign-circle-blue">${symbol}</div>`;
    default:             return `<div class="sign-rect-blue">${symbol}</div>`;
  }
}

function filterPlacas(cat, btn) {
  window._currentPlacaFilter = cat;
  document.querySelectorAll('#sec-placas .scenario-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderPlacasGrid(cat);
}

function showSignDetail(id) {
  const placa  = DB.placas.find(p => p.id === id);
  if (!placa) return;
  const detail = document.getElementById('placa-detail');
  const translations = DB.translations?.[id] || {};
  const pt = translations.pt || { name: placa.name, desc: placa.desc };
  const en = translations.en || { name: placa.name, desc: placa.desc };
  const es = translations.es || { name: placa.name, desc: placa.desc };

  document.getElementById('pd-title').textContent = pt.name || placa.name;
  document.getElementById('pd-body').innerHTML = `
    <div class="lang-blocks">
      <div class="lang-card">
        <div class="lang-label">Português</div>
        <div>${pt.desc}</div>
      </div>
      <div class="lang-card">
        <div class="lang-label">English</div>
        <div>${en.desc}</div>
      </div>
      <div class="lang-card">
        <div class="lang-label">Español</div>
        <div>${es.desc}</div>
      </div>
    </div>`;
  detail.style.display = 'block';
  detail.scrollIntoView({ behavior: 'smooth' });
}

// ─────────────────────────────────────────────────────
// INFRAÇÕES
// ─────────────────────────────────────────────────────
function renderInfracoes() {
  const tbody = document.getElementById('infraction-tbody');
  if (!tbody || !DB) return;
  tbody.innerHTML = DB.infracoes.map(i => {
    const n   = i.nature;
    let cls   = 'sev-leve';
    if (n.includes('Gravíssima')) cls = 'sev-gravissima';
    else if (n.includes('Grave')) cls = 'sev-grave';
    else if (n.includes('Média')) cls = 'sev-media';
    return `<tr>
      <td>${i.infraction}</td>
      <td><span class="severity-pill ${cls}">${i.nature}</span></td>
      <td><strong>${i.points}</strong></td>
      <td>R$ ${i.fine}</td>
      <td style="color:var(--muted);font-size:.78rem">${i.measures}</td>
    </tr>`;
  }).join('');
}

// ─────────────────────────────────────────────────────
// DIREÇÃO SEGURA
// ─────────────────────────────────────────────────────
function renderDirecaoCards() {
  const grid = document.getElementById('direcao-cards-grid');
  if (!grid || !DB) return;
  grid.innerHTML = DB.direcaoSegura.map(t => `
    <div class="module-card" onclick="openDirecaoTopic('${t.id}')">
      <div class="module-icon">${t.icon}</div>
      <div class="module-title">${t.title}</div>
      <div class="module-desc">${t.shortDesc}</div>
    </div>`).join('');
}

function openDirecaoTopic(id) {
  const topic = DB.direcaoSegura.find(t => t.id === id);
  if (!topic) return;

  let bodyHtml = '';
  (topic.concepts || []).forEach(c => {
    bodyHtml += `<div class="concept-card">
      <div class="concept-title">${c.icon} ${c.title}</div>
      <div class="concept-body">${c.body.replace(/\n/g, '<br>')}</div>
    </div>`;
  });
  (topic.highlights || []).forEach(h => {
    const cls = h.type === 'warn' ? 'warn-box' : h.type === 'info' ? 'info-box' : 'highlight-box';
    bodyHtml += `<div class="${cls}">${h.text}</div>`;
  });

  const el = document.getElementById('direcao-detail');
  el.style.display = 'block';
  el.innerHTML = `
    <div class="lesson-area">
      <div class="lesson-header">
        <div class="lesson-emoji">${topic.icon}</div>
        <div class="lesson-meta">
          <div class="lesson-label">Direção Segura</div>
          <div class="lesson-title-h">${topic.title}</div>
        </div>
      </div>
      <div class="lesson-body lesson-content-area">${bodyHtml}</div>
    </div>`;
  el.scrollIntoView({ behavior: 'smooth' });
}

// ─────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', boot);


// =====================================================================
// SIMULADOR DE TRÂNSITO v3 · CNH Brasil
// Motor de Regras CTB completo — cada regra é verificada em tempo real
// =====================================================================

// ── Estado global ─────────────────────────────────
let tsCanvas, tsCtx, tsW, tsH;
let tsRunning   = false;
let tsChaosMode = false;
let tsSpeedMult = 1;
let tsSimHour   = 8;
let tsTimeOfDay = 'day';
let tsWeather   = 'sunny';
let tsFrameCount = 0;
let tsLastT      = 0;
let tsRafId      = null;
let tsInited     = false;
let tsSpawnTimer    = 0;
let tsPedSpawnTimer = 0;
let tsSelectedVehicle = null;
let tsHoveredVehicle  = null;
let tsBuildingWindows = [];
let tsRainDrops = [];

let tsVehicles = [], tsPedestrians = [], tsTrafficLights = [], tsParticles = [];
let tsRoads = { h:[], v:[], highway:null };
let tsIntersections=[], tsCrosswalks=[], tsParkingZones=[], tsLoadingZones=[];
let tsSchoolZones=[], tsSpeedBumps=[];
let tsTrees = [];
let tsZoom = 1;
let tsMapMode = 'city';
let tsMapState = null;
let tsAudioEnabled = false;
let tsVoiceEnabled = false;
let tsAudioCtx = null;
let tsAmbientGain = null;
let tsAmbientNoise = null;
let tsAmbientHum = null;

const TS_MAP_MODES = {
  city: {
    label:'Cidade', 
    h:[0.24,0.48,0.72], v:[0.2,0.5,0.78], highway:true,
    buildings:10, trees:0.25, trafficFactor:1.0, spawnRate:1.0, maxVehicles:42, lights:6
  },
  urban: {
    label:'Zona Urbana', 
    h:[0.3,0.6], v:[0.28,0.72], highway:false,
    buildings:8, trees:0.35, trafficFactor:0.9, spawnRate:1.2, maxVehicles:34, lights:5
  },
  interior: {
    label:'Interior', 
    h:[0.4], v:[0.63], highway:false,
    buildings:4, trees:0.75, trafficFactor:0.55, spawnRate:2.4, maxVehicles:24, lights:2
  },
  forest: {
    label:'Mais Árvores', 
    h:[0.34,0.66], v:[0.55], highway:false,
    buildings:3, trees:0.85, trafficFactor:0.55, spawnRate:2.2, maxVehicles:24, lights:3
  },
  quiet: {
    label:'Menos Movimentação', 
    h:[0.36,0.58], v:[0.48], highway:false,
    buildings:4, trees:0.65, trafficFactor:0.6, spawnRate:2.2, maxVehicles:28, lights:3
  }
};

// ── Contadores ────────────────────────────────────
let tsTotalViolations = 0;
let tsTotalAccidents  = 0;
let tsTotalFines      = 0; // R$ total de multas aplicadas
let tsViolationLog    = []; // histórico detalhado

// ── Banco de Regras CTB ───────────────────────────
// Cada regra tem: id, artigo, descrição, gravidade, pontos, multa, penalidades extras
const CTB_RULES = {
  RED_LIGHT: {
    id:'RED_LIGHT', art:'Art. 208 CTB',
    desc:'Avançar sinal vermelho ou parada obrigatória',
    gravity:'GRAVÍSSIMA', pts:7, fine:293.47,
    extra:'Retenção do veículo + medida administrativa',
    color:'#ef4444', icon:'🔴',
    educational:'O sinal vermelho indica PARE de forma absoluta. Avançá-lo é uma das principais causas de acidentes fatais em cruzamentos.',
  },
  SPEEDING_20: {
    id:'SPEEDING_20', art:'Art. 218 I CTB',
    desc:'Excesso de velocidade até 20% acima do limite',
    gravity:'GRAVE', pts:5, fine:195.23,
    extra:'', color:'#f97316', icon:'💨',
    educational:'Em via urbana com limite de 60km/h, o limite prático é 72km/h. A distância de frenagem aumenta ao quadrado com a velocidade.',
  },
  SPEEDING_50: {
    id:'SPEEDING_50', art:'Art. 218 III CTB',
    desc:'Excesso de velocidade acima de 50% do limite',
    gravity:'GRAVÍSSIMA×3', pts:7, fine:880.41,
    extra:'Suspensão imediata do direito de dirigir',
    color:'#dc2626', icon:'🚀',
    educational:'Acima de 50% do limite, a multa é triplicada. A 90km/h em zona de 60, o impacto equivale a cair de um prédio de 3 andares.',
  },
  DRUNK_DRIVING: {
    id:'DRUNK_DRIVING', art:'Lei 12.760/2012 (Lei Seca)',
    desc:'Dirigir sob influência de álcool ou substâncias',
    gravity:'GRAVÍSSIMA×3', pts:7, fine:2934.70,
    extra:'Suspensão 12 meses + crime (art. 306 CTB) + teste obrigatório',
    color:'#f43f5e', icon:'🍺',
    educational:'Tolerância ZERO no Brasil. A partir de 0,6g/L configura CRIME, não só infração. Reflexos caem 30% com apenas 0,2g/L.',
  },
  NO_SEATBELT: {
    id:'NO_SEATBELT', art:'Art. 167 CTB',
    desc:'Deixar de usar cinto de segurança',
    gravity:'GRAVE', pts:5, fine:195.23,
    extra:'Obrigatório para todos os ocupantes de todos os assentos',
    color:'#f59e0b', icon:'🔗',
    educational:'O cinto reduz o risco de morte em 45% e de lesão grave em 50%. Sem o cinto, o ocupante vira projétil dentro do veículo.',
  },
  NO_HELMET: {
    id:'NO_HELMET', art:'Art. 244 II CTB',
    desc:'Motociclista sem capacete certificado',
    gravity:'GRAVE', pts:5, fine:195.23,
    extra:'Retenção do veículo até regularização',
    color:'#f59e0b', icon:'⛑',
    educational:'O capacete reduz o risco de morte em 40% e de lesão cerebral em 69%. Obrigatório para piloto e passageiro.',
  },
  NO_HEADLIGHTS: {
    id:'NO_HEADLIGHTS', art:'Art. 230 VIII CTB',
    desc:'Trafegar sem farol aceso no período noturno ou de baixa visibilidade',
    gravity:'GRAVE', pts:5, fine:195.23,
    extra:'Obrigatório também em túneis e com chuva forte',
    color:'#64748b', icon:'💡',
    educational:'Faróis são obrigatórios do anoitecer ao amanhecer, em túneis e situações de baixa visibilidade. Também facilitam ser visto pelos outros.',
  },
  PEDESTRIAN_RIGHT: {
    id:'PEDESTRIAN_RIGHT', art:'Art. 214 CTB',
    desc:'Deixar de dar preferência ao pedestre na faixa de travessia',
    gravity:'GRAVE', pts:5, fine:195.23,
    extra:'Agravante se causar dano ao pedestre',
    color:'#8b5cf6', icon:'🚶',
    educational:'O pedestre tem prioridade ABSOLUTA na faixa de pedestres. O motorista deve parar e aguardar a travessia completa.',
  },
  WRONG_WAY: {
    id:'WRONG_WAY', art:'Art. 186 I CTB',
    desc:'Trafegar na contramão de direção',
    gravity:'GRAVÍSSIMA', pts:7, fine:293.47,
    extra:'Retenção do veículo',
    color:'#ef4444', icon:'↩',
    educational:'Dirigir na contramão é extremamente perigoso pois o impacto das velocidades some. Uma colisão frontal a 60km/h equivale a 120km/h.',
  },
  ILLEGAL_PARKING: {
    id:'ILLEGAL_PARKING', art:'Art. 181 CTB',
    desc:'Estacionar em local proibido',
    gravity:'MÉDIA', pts:4, fine:130.16,
    extra:'Remoção do veículo para depósito',
    color:'#ef4444', icon:'🅿',
    educational:'Estacionar em local proibido obstrui a via, dificulta visibilidade e pode bloquear acesso de emergência. O veículo pode ser removido.',
  },
  CELLPHONE: {
    id:'CELLPHONE', art:'Art. 252 I CTB',
    desc:'Usar celular ao volante sem dispositivo mãos-livres',
    gravity:'GRAVÍSSIMA', pts:7, fine:293.47,
    extra:'Suspensão imediata se reincidir',
    color:'#8b5cf6', icon:'📱',
    educational:'O uso do celular triplica o risco de acidente. O tempo de reação aumenta de 0,8s para 3s. Equivale a dirigir 3× mais bêbado.',
  },
  UNSAFE_DISTANCE: {
    id:'UNSAFE_DISTANCE', art:'Art. 182 VI CTB',
    desc:'Não manter distância segura do veículo à frente',
    gravity:'MÉDIA', pts:4, fine:130.16,
    extra:'A distância mínima é de 2 segundos em condições normais',
    color:'#f59e0b', icon:'↔',
    educational:'A regra dos 2 segundos: quando o carro à frente passar por um ponto fixo, você deve só passar por esse ponto 2 segundos depois. Com chuva: 4 segundos.',
  },
  SCHOOL_ZONE: {
    id:'SCHOOL_ZONE', art:'Art. 218 CTB + Res. CONTRAN 396',
    desc:'Excesso de velocidade em zona escolar (limite 30km/h)',
    gravity:'GRAVÍSSIMA', pts:7, fine:880.41,
    extra:'Pena agravada em área de proteção de crianças',
    color:'#f59e0b', icon:'🏫',
    educational:'Em zonas escolares o limite é 30km/h. Crianças têm reação mais lenta e campo de visão menor. A multa é triplicada por ser zona especial.',
  },
  NO_SIGNAL_CHANGE_LANE: {
    id:'NO_SIGNAL_CHANGE_LANE', art:'Art. 182 VII CTB',
    desc:'Mudar de faixa sem usar seta/pisca',
    gravity:'LEVE', pts:3, fine:88.38,
    extra:'',
    color:'#fbbf24', icon:'🔀',
    educational:'O sinaleiro (seta/pisca) deve ser acionado ANTES da mudança de faixa, dando tempo para os outros motoristas reagirem.',
  },
  SPEED_BUMP: {
    id:'SPEED_BUMP', art:'Art. 218 CTB',
    desc:'Não reduzir velocidade em lombada/redutor de velocidade',
    gravity:'MÉDIA', pts:4, fine:130.16,
    extra:'',
    color:'#f59e0b', icon:'〰',
    educational:'Lombadas exigem redução de velocidade por segurança dos pedestres e da via. Passar em alta velocidade pode danificar o veículo e a via.',
  },
};

// ── Utilitários ────────────────────────────────────
function tsR(a,b){ return a+Math.random()*(b-a); }
function tsRI(a,b){ return Math.floor(tsR(a,b+1)); }
function tsDist(a,b){ return Math.hypot(a.x-b.x,a.y-b.y); }
function tsAdjColor(hex,amt){
  try{
    let c=hex.replace('#','');
    if(c.length===3)c=c.split('').map(x=>x+x).join('');
    const r=Math.max(0,Math.min(255,parseInt(c.slice(0,2),16)+amt));
    const g=Math.max(0,Math.min(255,parseInt(c.slice(2,4),16)+amt));
    const b=Math.max(0,Math.min(255,parseInt(c.slice(4,6),16)+amt));
    return `rgb(${r},${g},${b})`;
  }catch(e){return hex;}
}
function tsGenPlate(){
  const L='ABCDEFGHIJKLMNOPRSTUVWXYZ';
  const l=()=>L[tsRI(0,L.length-1)];
  const n=()=>tsRI(0,9);
  return Math.random()>.4?`${l()}${l()}${l()}${n()}${l()}${n()}${n()}`:`${l()}${l()}${l()}-${n()}${n()}${n()}${n()}`;
}

// ── Aplicar Penalidade ─────────────────────────────
// Chamada sempre que uma regra é violada. Registra, exibe e atualiza UI.
function tsApplyViolation(vehicle, ruleId, extraCtx) {
  const rule = CTB_RULES[ruleId];
  if (!rule) return;

  tsTotalViolations++;
  tsTotalFines += rule.fine;

  const hh=String(Math.floor(tsSimHour)).padStart(2,'0');
  const mm=String(Math.floor((tsSimHour%1)*60)).padStart(2,'0');

  const entry = {
    time:`${hh}:${mm}`, rule, vehicle,
    plateNum: vehicle ? vehicle.plateNum : '---',
    extraCtx: extraCtx||'',
  };
  tsViolationLog.unshift(entry);
  if (tsViolationLog.length > 50) tsViolationLog.pop();

  // Event log
  tsLog(rule.icon,
    `[${rule.gravity}] ${rule.desc} · ${vehicle?vehicle.plateNum:''}`,
    rule.gravity.includes('GRAVÍSSIMA')?'danger':'warn'
  );

  // CTB tip box
  tsSetCtbDetail(rule);

  // Floating notification com penalidade
  const msg = `${rule.icon} ${rule.art} · R$${rule.fine.toFixed(2)} · ${rule.pts} pontos${rule.extra?'\n'+rule.extra:''}`;
  tsShowNotif(msg, rule.gravity.includes('GRAVÍSSIMA')?'danger':'warn');
  if(tsVoiceEnabled){
    tsSpeak(`${rule.desc}. Multa de ${rule.fine.toFixed(0).replace('.',',')} reais. ${rule.extra || ''}`);
  }

  // Marcar veículo
  if (vehicle) {
    vehicle.violator = true;
    vehicle.lastViolation = rule;
    vehicle.violationFlash = 90;
    if (!vehicle.violations) vehicle.violations=[];
    vehicle.violations.push(ruleId);
    // Suspensão: acumula pontos
    vehicle.points = (vehicle.points||0) + rule.pts;
    if (vehicle.points >= 20) {
      tsLog('🚫',`CNH SUSPENSA! ${vehicle.plateNum} acumulou ${vehicle.points} pontos!`,'danger');
    }
  }

  tsUpdateStats();
}

// ── Inicialização ──────────────────────────────────
function tsInitIfNeeded(){
  if(tsInited)return;
  tsInited=true;
  tsCanvas=document.getElementById('ts-canvas');
  if(!tsCanvas)return;
  tsCtx=tsCanvas.getContext('2d');
  tsBuildLayout();
  tsInitRain();
  tsBuildingWindows=tsGenBuildingWindows();
  for(let i=0;i<10;i++)tsSpawnVehicle();
  for(let i=0;i<7;i++) tsSpawnPedestrian();
  tsRunning=true;
  tsLastT=0;
  tsUpdateBadges();
  tsUpdateStats();
  tsLog('🚦','Simulador CTB v3 iniciado! Todas as regras de trânsito estão ativas.','info');
  tsLog('ℹ️','Clique em veículos para ver detalhes e infrações cometidas.','info');
  tsLog('📖','Cada infração exibe o artigo do CTB, multa e penalidades reais.','info');
  requestAnimationFrame(tsFrame);
  window.addEventListener('resize',tsResize);
  tsCanvas.addEventListener('click',tsOnCanvasClick);
  tsCanvas.addEventListener('mousemove',tsOnCanvasHover);
  tsResize();
  tsUpdateControls();
}

function tsResize(){
  if(!tsCanvas)return;
  const wrap=tsCanvas.parentElement;
  tsW=tsCanvas.width =wrap.clientWidth ||800;
  tsH=tsCanvas.height=wrap.clientHeight||500;
  tsBuildLayout();
  tsInitRain();
  tsBuildingWindows=tsGenBuildingWindows();
}

// ── Layout ────────────────────────────────────────
function tsBuildLayout(){
  const W=tsW,H=tsH;
  tsMapState = TS_MAP_MODES[tsMapMode] || TS_MAP_MODES.city;

  tsRoads.h = tsMapState.h.map(f=>({y:H*f,laneW:32,lanes:2,speedLimit:tsMapState.highway?60:50}));
  tsRoads.v = tsMapState.v.map(f=>({x:W*f,laneW:32,lanes:2,speedLimit:tsMapState.highway?60:50}));
  tsRoads.highway = tsMapState.highway ? {x:W*0.87,laneW:36,lanes:3,speedLimit:110} : null;

  tsIntersections=[];
  tsRoads.h.forEach(hr=>tsRoads.v.forEach(vr=>{
    tsIntersections.push({x:vr.x,y:hr.y});
  }));

  tsCrosswalks=[];
  tsIntersections.forEach(int=>{
    tsCrosswalks.push({x:int.x-55,y:int.y,w:34,h:7,dir:'h',int});
    tsCrosswalks.push({x:int.x,y:int.y-55,w:7,h:34,dir:'v',int});
  });

  tsSchoolZones=[
    {x:W*.22-80,y:H*.28-60,w:100,h:50,speedLimit:30},
  ];

  tsSpeedBumps=[
    {x:W*.22,y:H*.55,horiz:false},
    {x:W*.5, y:H*.28,horiz:true},
    {x:W*.78,y:H*.55,horiz:false},
  ];

  tsParkingZones=[
    {x:W*.22-75,y:H*.28-16,w:75,h:9,forbidden:true},
    {x:W*.5+38, y:H*.55-16,w:60,h:9,forbidden:true},
    {x:W*.78-48,y:H*.78+7, w:48,h:9,forbidden:true},
    {x:W*.22+18,y:H*.28+7, w:50,h:9,forbidden:false},
  ];
  tsLoadingZones=[
    {x:W*.36,y:H*.28+7,w:52,h:9},
    {x:W*.64,y:H*.55+7,w:52,h:9},
  ];

  tsTrafficLights = tsIntersections.slice(0, tsMapState.lights).map((int,i)=>({
    x:int.x,y:int.y,
    phase:(i*40)%120,cycle:120,
    state:'green',countdown:0,
  }));

  tsTrees = tsGenTrees(tsMapState.trees);
}

function tsInitRain(){
  tsRainDrops=Array.from({length:220},()=>({
    x:tsR(0,tsW),y:tsR(0,tsH),
    len:tsR(8,20),spd:tsR(8,16),alpha:tsR(.3,.65),
    splashTimer:0,splashX:0,splashY:0,
  }));
}

function tsWorldFromScreen(mx,my){
  const viewX = (1 - tsZoom) * tsW * 0.5;
  const viewY = (1 - tsZoom) * tsH * 0.5;
  return {x:(mx - viewX)/tsZoom, y:(my - viewY)/tsZoom};
}

function tsGenBuildingWindows(){
  const bldgs=tsGetBuildings();
  return bldgs.map(b=>{
    const rows=Math.floor(b.h/11),cols=Math.floor(b.w/13);
    return{...b,rows,cols,windows:Array.from({length:rows*cols},()=>Math.random())};
  });
}

function tsGenTrees(density){
  const trees=[];
  const count = Math.max(10, Math.round(20 + density * 50));
  for(let i=0;i<count;i++){
    const x = tsR(20, tsW-20);
    const y = tsR(20, tsH-40);
    if(tsRoads.v.some(r=>Math.abs(x-r.x) < 50) || tsRoads.h.some(r=>Math.abs(y-r.y) < 40)) continue;
    trees.push({x,y,size:tsR(10,18),shade:tsR(-20,20)});
  }
  return trees;
}
function tsGetBuildings(){
  const W=tsW,H=tsH;
  return[
    {x:8,y:H*.06,w:55,h:75,c:'#1e293b',c2:'#172036'},
    {x:70,y:H*.06,w:40,h:55,c:'#172036',c2:'#1a2840'},
    {x:W*.3+70,y:H*.04,w:65,h:85,c:'#1a2840',c2:'#1e293b'},
    {x:W*.6+70,y:H*.04,w:50,h:65,c:'#1e2d3d',c2:'#1a2840'},
    {x:8,y:H*.84,w:55,h:45,c:'#1e293b',c2:'#172036'},
    {x:70,y:H*.84,w:45,h:65,c:'#172036',c2:'#1e293b'},
    {x:W*.55,y:H*.84,w:75,h:50,c:'#1a2840',c2:'#1e2d3d'},
    {x:W*.3-60,y:H*.06,w:48,h:60,c:'#152030',c2:'#1a2840'},
    {x:W*.58+12,y:H*.84,w:40,h:38,c:'#1e2d3d',c2:'#1a2840'},
  ];
}

// ── Tipos de Veículos ─────────────────────────────
const TS_VEHICLE_TYPES=[
  {type:'car',  colors:['#3b82f6','#6366f1','#0ea5e9','#22d3ee','#60a5fa','#cbd5e1','#f8fafc'],speed:1.2,label:'Carro'},
  {type:'moto', colors:['#f59e0b','#fbbf24','#d97706','#fb923c'],speed:1.7,label:'Moto'},
  {type:'bus',  colors:['#8b5cf6','#7c3aed'],speed:0.75,label:'Ônibus'},
  {type:'truck',colors:['#64748b','#475569','#94a3b8'],speed:0.65,label:'Caminhão'},
  {type:'taxi', colors:['#fbbf24'],speed:1.1,label:'Táxi'},
  {type:'ambulance',colors:['#f8fafc'],speed:1.9,label:'Ambulância'},
];

function tsSpawnVehicle(){
  const maxVehicles = tsMapState?.maxVehicles || 38;
  if(tsVehicles.length >= maxVehicles) return;
  // Ambulância: rara
  const tIdx=(tsChaosMode&&Math.random()<.12)?5:tsRI(0,4);
  const t=TS_VEHICLE_TYPES[tIdx];
  const isAmbulance=t.type==='ambulance';
  const horiz=Math.random()>.5;
  let x,y,dx,dy,roadRef,speedLimit;

  if(horiz){
    const r=tsRoads.h[tsRI(0,tsRoads.h.length-1)];
    const dir=Math.random()>.5?1:-1;
    const lane=tsRI(0,1);
    x=dir>0?-55:tsW+55;
    y=r.y+(lane===0?-r.laneW/2:r.laneW/2);
    dx=dir;dy=0;roadRef=r;speedLimit=r.speedLimit;
  }else{
    const r=tsRoads.v[tsRI(0,tsRoads.v.length-1)];
    const dir=Math.random()>.5?1:-1;
    const lane=tsRI(0,1);
    y=dir>0?-55:tsH+55;
    x=r.x+(lane===0?-r.laneW/2:r.laneW/2);
    dx=0;dy=dir;roadRef=r;speedLimit=r.speedLimit;
  }

  const wMul=tsWeather==='rain'?.75:tsWeather==='storm'?.55:tsWeather==='fog'?.7:1;
  const needsLight=tsTimeOfDay==='night'||tsTimeOfDay==='dawn';

  // Decidir comportamento (chance de infrator)
  const infChance=tsChaosMode?.5:.08;
  const isInf=!isAmbulance&&Math.random()<infChance;

  const color=t.colors[tsRI(0,t.colors.length-1)];
  const baseSpd=isAmbulance?1.9:t.speed;

  // Distribuir tipos de infração
  const drunk     =isInf&&Math.random()<.25;
  const speederLvl=isInf&&!drunk?
    (Math.random()<.4?'heavy':Math.random()<.6?'moderate':'light'):'none';
  const redRunner =isInf&&!drunk&&Math.random()<.45;
  const noHelmet  =isInf&&t.type==='moto'&&Math.random()<.5;
  const noBelt    =isInf&&(t.type==='car'||t.type==='taxi')&&Math.random()<.35;
  const noLight   =isInf&&needsLight&&Math.random()<.4;
  const cellphone =isInf&&Math.random()<.3;
  const wrongWay  =isInf&&Math.random()<.12;

  const angle = Math.atan2(dy,dx);
  const finalDx = wrongWay ? -dx : dx;
  const finalDy = wrongWay ? -dy : dy;
  const v={
    x,y,dx:finalDx,dy:finalDy,
    // Direção do movimento
    angle: angle + (wrongWay ? Math.PI : 0),
    speed:baseSpd*wMul,
    type:t.type,color:isInf?'#ef4444':color,origColor:color,
    label:t.label,
    plateNum:tsGenPlate(),
    alive:true,alpha:1,horiz,roadRef,speedLimit,id:Math.random(),
    // Comportamentos
    isAmbulance,
    drunk,
    speederLvl, // 'none'|'light'(até20%)|'moderate'(20-50%)|'heavy'(>50%)
    redRunner,
    noHelmet,noBelt,noLight,cellphone,
    wrongWay,
    // Estado
    stopped:false,brakeLights:false,parkTimer:0,
    hasFarol:needsLight&&!noLight,
    wobble:0,wobblePhase:0,
    // Infração tracking
    violations:[],points:0,
    lastViolation:null,violationFlash:0,
    // Distância ao veículo à frente (segurança)
    frontVehicle:null,frontDist:999,
    unsafeDistTimer:0,
    // Celular
    cellphoneLogged:false,
    // Lombada
    speedBumpLogged:false,
    // Escola
    schoolZoneLogged:false,
    // Farol
    noLightLogged:false,
    // Contramão
    wrongWayLogged:false,
    // Cinturão / capacete
    beltLogged:false,helmetLogged:false,
    // Flash
    violationFlash:0,
  };
  tsVehicles.push(v);
}

function tsSpawnPedestrian(){
  if(tsPedestrians.length>=22)return;
  const isR=tsChaosMode?Math.random()<.45:Math.random()<.1;
  const cw=tsCrosswalks[tsRI(0,tsCrosswalks.length-1)];
  const side=Math.random()>.5?1:-1;
  let x,y,dx,dy;
  if(cw.dir==='h'){
    x=cw.x+tsR(0,cw.w);y=cw.y+side*60;dx=0;dy=-side*.6;
  }else{
    y=cw.y+tsR(0,cw.h);x=cw.x+side*60;dx=-side*.6;dy=0;
  }
  const colors=isR?['#f97316','#ef4444']:['#22c55e','#4ade80','#86efac','#34d399'];
  tsPedestrians.push({
    x,y,dx,dy,r:5,color:colors[tsRI(0,colors.length-1)],
    reckless:isR,crossing:false,alive:true,alpha:1,id:Math.random(),
    dstX:cw.x+(cw.dir==='h'?tsR(0,cw.w):0),
    dstY:cw.y+(cw.dir==='v'?tsR(0,cw.h):0),
    crosswalk:cw,phase:'approach',waitTimer:0,
  });
}

// ── Partículas ────────────────────────────────────
function tsSpawnParticle(x,y,type){
  const cnt=type==='crash'?24:type==='smoke'?5:4;
  for(let i=0;i<cnt;i++){
    const a=tsR(0,Math.PI*2),s=type==='crash'?tsR(2,5.5):tsR(.5,2.5);
    tsParticles.push({
      x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,
      r:type==='crash'?tsR(3,8):type==='smoke'?tsR(4,8):tsR(1,3),
      color:type==='crash'?(Math.random()>.5?'#ef4444':'#fbbf24'):
            type==='smoke'?`rgba(${tsRI(80,120)},${tsRI(80,120)},${tsRI(80,120)},0.6)`:'#00e5ff',
      life:1,decay:type==='crash'?tsR(.012,.025):type==='smoke'?tsR(.008,.015):tsR(.025,.05),
      alive:true,type,
    });
  }
}

// ═══════════════════════════════════════════════════
// MOTOR DE REGRAS CTB — verificado a cada frame
// ═══════════════════════════════════════════════════
function tsCheckAllRules(v,dt){
  if(!v.alive||v.isAmbulance)return; // ambulâncias têm passagem livre

  // ── Regra 1: SINAL VERMELHO ────────────────────
  if(v.redRunner&&!v.stopped){
    tsTrafficLights.forEach(tl=>{
      if(tl.state==='red'){
        const d=tsDist(v,tl);
        // Cruzou o ponto do semáforo vermelho
        if(d<20&&!v._rlFired){
          v._rlFired=true;
          tsApplyViolation(v,'RED_LIGHT');
          v.color='#dc2626';
          tsSpawnParticle(v.x,v.y,'alert');
          setTimeout(()=>{v._rlFired=false;},8000);
        }
      }
    });
  }

  // ── Regra 2: EXCESSO DE VELOCIDADE ─────────────
  const kmh=tsGetVehicleKmh(v);
  const limit=tsGetSpeedLimit(v);
  if(!v.stopped){
    const excess=kmh/limit;
    if(excess>1.5&&!v._spd50Logged){
      v._spd50Logged=true;
      tsApplyViolation(v,'SPEEDING_50');
      setTimeout(()=>{v._spd50Logged=false;},10000);
    } else if(excess>1.2&&excess<=1.5&&!v._spd20Logged){
      v._spd20Logged=true;
      tsApplyViolation(v,'SPEEDING_20');
      setTimeout(()=>{v._spd20Logged=false;},10000);
    }
  }

  // ── Regra 3: ZONA ESCOLAR ──────────────────────
  if(!v.schoolZoneLogged&&!v.stopped){
    const inSchool=tsSchoolZones.some(sz=>
      v.x>=sz.x&&v.x<=sz.x+sz.w&&v.y>=sz.y&&v.y<=sz.y+sz.h
    );
    if(inSchool&&kmh>30){
      v.schoolZoneLogged=true;
      tsApplyViolation(v,'SCHOOL_ZONE');
      setTimeout(()=>{v.schoolZoneLogged=false;},8000);
    }
  }

  // ── Regra 4: DIRIGIR EMBRIAGADO ────────────────
  if(v.drunk&&!v._drunkLogged){
    v._drunkLogged=true;
    tsApplyViolation(v,'DRUNK_DRIVING');
    // Não reseta: multa aplicada uma vez por viagem
  }

  // ── Regra 5: CINTO DE SEGURANÇA ────────────────
  if(v.noBelt&&!v.beltLogged){
    v.beltLogged=true;
    tsApplyViolation(v,'NO_SEATBELT');
  }

  // ── Regra 6: CAPACETE (moto) ───────────────────
  if(v.noHelmet&&!v.helmetLogged&&v.type==='moto'){
    v.helmetLogged=true;
    tsApplyViolation(v,'NO_HELMET');
  }

  // ── Regra 7: FAROL NOTURNO ─────────────────────
  const needsLight=tsTimeOfDay==='night'||tsTimeOfDay==='dawn'||tsWeather==='storm';
  if(needsLight&&v.noLight&&!v.noLightLogged){
    v.noLightLogged=true;
    tsApplyViolation(v,'NO_HEADLIGHTS');
  }

  // ── Regra 8: CELULAR AO VOLANTE ────────────────
  if(v.cellphone&&!v.cellphoneLogged){
    v.cellphoneLogged=true;
    tsApplyViolation(v,'CELLPHONE');
  }

  // ── Regra 9: CONTRAMÃO ─────────────────────────
  if(v.wrongWay&&!v.wrongWayLogged){
    v.wrongWayLogged=true;
    tsApplyViolation(v,'WRONG_WAY');
  }

  // ── Regra 10: DISTÂNCIA SEGURA ─────────────────
  // A regra de 2 segundos: distância mínima ≈ velocidade/2 em metros (simplif.)
  let minDist=kmh*0.5; // ~distância de 2s em km/h→pixels
  if(tsWeather==='rain'||tsWeather==='storm') minDist*=2;
  v.frontDist=999;
  tsVehicles.forEach(other=>{
    if(other===v||!other.alive)return;
    const d=tsDist(v,other);
    if(d<v.frontDist){
      // Verifica se está à frente (mesma direção)
      const sameDirH=(v.horiz&&other.horiz&&v.dx===other.dx);
      const sameDirV=(!v.horiz&&!other.horiz&&v.dy===other.dy);
      if((sameDirH||sameDirV)&&d<80){
        v.frontDist=d;
        v.frontVehicle=other;
      }
    }
  });
  if(v.frontDist<minDist*0.35&&!v.stopped){
    v.unsafeDistTimer=(v.unsafeDistTimer||0)+dt;
    if(v.unsafeDistTimer>3&&!v._unsafeDist){
      v._unsafeDist=true;
      tsApplyViolation(v,'UNSAFE_DISTANCE');
      setTimeout(()=>{v._unsafeDist=false;v.unsafeDistTimer=0;},12000);
    }
  }else{
    v.unsafeDistTimer=Math.max(0,(v.unsafeDistTimer||0)-dt*0.5);
  }

  // ── Regra 11: LOMBADA ──────────────────────────
  if(!v.speedBumpLogged&&!v.stopped){
    const nearBump=tsSpeedBumps.some(sb=>{
      const d=tsDist(v,sb);
      return d<25&&((sb.horiz&&v.horiz)||(!sb.horiz&&!v.horiz));
    });
    if(nearBump&&kmh>20){
      v.speedBumpLogged=true;
      tsApplyViolation(v,'SPEED_BUMP');
      setTimeout(()=>{v.speedBumpLogged=false;},6000);
    }
  }
}

// ── Preferência do Pedestre ────────────────────────
function tsCheckPedestrianRight(v,p){
  if(!v.alive||!p.alive||!p.crossing||v.isAmbulance)return;
  if(tsDist(v,p)<28&&!v.stopped){
    tsTotalAccidents++;
    tsApplyViolation(v,'PEDESTRIAN_RIGHT','Atropelamento na faixa');
    tsSpawnParticle(p.x,p.y,'crash');
    p.alive=false;
    v.violationFlash=120;
    tsShowNotif('💥 ATROPELAMENTO! Pedestre tinha preferência na faixa!','danger');
    if(tsVoiceEnabled) tsSpeak('Atropelamento na faixa de pedestres. Chame a ambulância!');
  }
}

// ── Velocidade real em km/h ────────────────────────
function tsGetVehicleKmh(v){
  const wMul=tsWeather==='rain'?.75:tsWeather==='storm'?.55:tsWeather==='fog'?.7:1;
  const spdMul=v.speederLvl==='heavy'?2.2:v.speederLvl==='moderate'?1.4:v.speederLvl==='light'?1.2:1;
  const drunkMul=v.drunk?.75:1;
  return Math.round(v.speed*58*wMul*spdMul*drunkMul*(v.stopped?0:1));
}
function tsGetSpeedLimit(v){
  // Verifica rodovia
  if(tsRoads.highway&&Math.abs(v.x-tsRoads.highway.x)<60) return 110;
  if(v.roadRef) return v.roadRef.speedLimit||60;
  return 60;
}

// ══════════════════════════════════════════════════
// DESENHO
// ══════════════════════════════════════════════════
function tsDrawGround(){
  const isN=tsTimeOfDay==='night',isD=tsTimeOfDay==='dusk';
  tsCtx.fillStyle=isN?'#07100a':isD?'#130f06':'#162208';
  tsCtx.fillRect(0,0,tsW,tsH);
  tsCtx.strokeStyle=isN?'#0d1a0e':'#1a2e0f';
  tsCtx.lineWidth=1; tsCtx.setLineDash([8,20]);
  for(let y=0;y<tsH;y+=14){tsCtx.beginPath();tsCtx.moveTo(0,y);tsCtx.lineTo(tsW,y);tsCtx.stroke();}
  tsCtx.setLineDash([]);
}

function tsDrawTrees(){
  tsTrees.forEach(tree=>{
    const trunkH = tree.size * 0.8;
    tsCtx.fillStyle='#3c2b18';
    tsCtx.fillRect(tree.x-1.5, tree.y+tree.size*0.3, 3, trunkH);
    const clamp = v => Math.max(0, Math.min(255, v));
    const glow = tsCtx.createRadialGradient(tree.x, tree.y, tree.size*0.2, tree.x, tree.y, tree.size);
    glow.addColorStop(0, `rgba(${clamp(160+tree.shade)},${clamp(230+tree.shade)},${clamp(120+tree.shade)},0.85)`);
    glow.addColorStop(1, 'rgba(23,68,27,0)');
    tsCtx.fillStyle=glow;
    tsCtx.beginPath();
    tsCtx.arc(tree.x, tree.y, tree.size*1.2, 0, Math.PI*2);
    tsCtx.fill();
    const r = Math.max(32, Math.min(220, 90+tree.shade));
    const g = Math.max(72, Math.min(230, 140+tree.shade));
    const b = Math.max(24, Math.min(180, 70+tree.shade));
    tsCtx.fillStyle=`rgb(${r},${g},${b})`;
    tsCtx.beginPath();
    tsCtx.arc(tree.x, tree.y, tree.size*0.95, 0, Math.PI*2);
    tsCtx.fill();
  });
}

function tsDrawRoads(){
  const W=tsW,H=tsH;
  const wet=tsWeather==='rain'||tsWeather==='storm';
  const isN=tsTimeOfDay==='night';
  const asp=isN?(wet?'#1a2530':'#1a1a1a'):(wet?'#1e2a35':'#2a2a2a');

  const drawH=r=>{
    const rw=r.laneW*r.lanes*2;
    tsCtx.fillStyle='rgba(0,0,0,.28)';tsCtx.fillRect(0,r.y-rw/2+2,W,rw);
    tsCtx.fillStyle=asp;tsCtx.fillRect(0,r.y-rw/2,W,rw);
    if(wet){
      const g=tsCtx.createLinearGradient(0,r.y-rw/2,0,r.y+rw/2);
      g.addColorStop(0,'rgba(100,160,200,.04)');g.addColorStop(.5,'rgba(100,160,200,.1)');g.addColorStop(1,'rgba(100,160,200,.04)');
      tsCtx.fillStyle=g;tsCtx.fillRect(0,r.y-rw/2,W,rw);
    }
    tsCtx.setLineDash([18,12]);tsCtx.strokeStyle=wet?'#fbbf2430':'#fbbf2455';tsCtx.lineWidth=1.5;
    tsCtx.beginPath();tsCtx.moveTo(0,r.y);tsCtx.lineTo(W,r.y);tsCtx.stroke();
    tsCtx.setLineDash([]);
    tsCtx.strokeStyle='#ffffff30';tsCtx.lineWidth=1.2;
    tsCtx.beginPath();tsCtx.moveTo(0,r.y-rw/2);tsCtx.lineTo(W,r.y-rw/2);tsCtx.stroke();
    tsCtx.beginPath();tsCtx.moveTo(0,r.y+rw/2);tsCtx.lineTo(W,r.y+rw/2);tsCtx.stroke();
  };
  const drawV=r=>{
    const rw=r.laneW*r.lanes*2;
    tsCtx.fillStyle='rgba(0,0,0,.25)';tsCtx.fillRect(r.x-rw/2+2,0,rw,H);
    tsCtx.fillStyle=asp;tsCtx.fillRect(r.x-rw/2,0,rw,H);
    if(wet){
      const g=tsCtx.createLinearGradient(r.x-rw/2,0,r.x+rw/2,0);
      g.addColorStop(0,'rgba(100,160,200,.04)');g.addColorStop(.5,'rgba(100,160,200,.1)');g.addColorStop(1,'rgba(100,160,200,.04)');
      tsCtx.fillStyle=g;tsCtx.fillRect(r.x-rw/2,0,rw,H);
    }
    tsCtx.setLineDash([18,12]);tsCtx.strokeStyle=wet?'#fbbf2430':'#fbbf2455';tsCtx.lineWidth=1.5;
    tsCtx.beginPath();tsCtx.moveTo(r.x,0);tsCtx.lineTo(r.x,H);tsCtx.stroke();
    tsCtx.setLineDash([]);
    tsCtx.strokeStyle='#ffffff30';tsCtx.lineWidth=1.2;
    tsCtx.beginPath();tsCtx.moveTo(r.x-rw/2,0);tsCtx.lineTo(r.x-rw/2,H);tsCtx.stroke();
    tsCtx.beginPath();tsCtx.moveTo(r.x+rw/2,0);tsCtx.lineTo(r.x+rw/2,H);tsCtx.stroke();
  };

  tsRoads.h.forEach(drawH);
  tsRoads.v.forEach(drawV);

  if(tsRoads.highway){
    const hw=tsRoads.highway;const hwW=hw.laneW*hw.lanes*2;
    tsCtx.fillStyle=isN?'#111':'#1e1e1e';tsCtx.fillRect(hw.x-hwW/2,0,hwW,H);
    tsCtx.strokeStyle='#fff5';tsCtx.lineWidth=1.8;
    tsCtx.beginPath();tsCtx.moveTo(hw.x-hwW/2,0);tsCtx.lineTo(hw.x-hwW/2,H);tsCtx.stroke();
    tsCtx.beginPath();tsCtx.moveTo(hw.x+hwW/2,0);tsCtx.lineTo(hw.x+hwW/2,H);tsCtx.stroke();
    tsCtx.strokeStyle='#fbbf2488';tsCtx.lineWidth=2;tsCtx.setLineDash([]);
    tsCtx.beginPath();tsCtx.moveTo(hw.x,0);tsCtx.lineTo(hw.x,H);tsCtx.stroke();
    tsCtx.setLineDash([22,13]);tsCtx.strokeStyle='#fff4';tsCtx.lineWidth=1.2;
    [-hw.laneW/2,hw.laneW/2].forEach(off=>{tsCtx.beginPath();tsCtx.moveTo(hw.x+off,0);tsCtx.lineTo(hw.x+off,H);tsCtx.stroke();});
    tsCtx.setLineDash([]);
    tsDrawSpeedSign(hw.x+30,H*.12,'110');tsDrawSpeedSign(hw.x+30,H*.62,'110');
    tsCtx.fillStyle='#ffffff25';tsCtx.font='bold 7px DM Mono,monospace';tsCtx.textAlign='center';
    tsCtx.fillText('RODOVIA',hw.x,H*.35);
  }

  // Speed signs on urban roads
  tsRoads.h.forEach((r,i)=>{
    if(i===0) tsDrawSpeedSign(W*.08,r.y-r.laneW*r.lanes-10,'60');
  });
}

function tsDrawSpeedSign(x,y,spd){
  tsCtx.save();
  tsCtx.strokeStyle='#888';tsCtx.lineWidth=1.5;
  tsCtx.beginPath();tsCtx.moveTo(x,y+13);tsCtx.lineTo(x,y+28);tsCtx.stroke();
  tsCtx.fillStyle='#fff';tsCtx.strokeStyle='#cc0000';tsCtx.lineWidth=2.5;
  tsCtx.beginPath();tsCtx.arc(x,y,13,0,Math.PI*2);tsCtx.fill();tsCtx.stroke();
  tsCtx.fillStyle='#cc0000';tsCtx.font='bold 8px DM Sans,sans-serif';
  tsCtx.textAlign='center';tsCtx.textBaseline='middle';tsCtx.fillText(spd,x,y);
  tsCtx.restore();
}

function tsDrawSchoolZones(){
  tsSchoolZones.forEach(sz=>{
    tsCtx.fillStyle='rgba(251,191,36,.1)';
    tsCtx.fillRect(sz.x,sz.y,sz.w,sz.h);
    tsCtx.strokeStyle='#fbbf24';tsCtx.lineWidth=1.5;
    tsCtx.setLineDash([4,3]);tsCtx.strokeRect(sz.x,sz.y,sz.w,sz.h);tsCtx.setLineDash([]);
    tsCtx.fillStyle='#fbbf24';tsCtx.font='bold 8px DM Mono,monospace';
    tsCtx.textAlign='left';tsCtx.textBaseline='bottom';
    tsCtx.fillText('🏫 ZONA ESCOLAR 30km/h',sz.x+2,sz.y-1);
  });
}

function tsDrawSpeedBumps(){
  tsSpeedBumps.forEach(sb=>{
    tsCtx.save();
    tsCtx.fillStyle='#fbbf2499';
    if(sb.horiz){
      tsCtx.fillRect(sb.x-40,sb.y-3,80,6);
      // Listras
      for(let i=0;i<5;i++){
        tsCtx.fillStyle=i%2===0?'#fbbf24':'#000000aa';
        tsCtx.fillRect(sb.x-40+i*16,sb.y-3,16,6);
      }
    }else{
      tsCtx.fillRect(sb.x-3,sb.y-40,6,80);
      for(let i=0;i<5;i++){
        tsCtx.fillStyle=i%2===0?'#fbbf24':'#000000aa';
        tsCtx.fillRect(sb.x-3,sb.y-40+i*16,6,16);
      }
    }
    tsCtx.restore();
    tsCtx.fillStyle='#fbbf24';tsCtx.font='bold 7px DM Mono,monospace';
    tsCtx.textAlign='center';tsCtx.fillText('〰',sb.x,sb.y-8);
  });
}

function tsDrawCrosswalks(){
  tsCrosswalks.forEach(cw=>{
    const n=4;
    const sw=cw.dir==='h'?cw.w/n:7;
    const sh=cw.dir==='h'?7:cw.h/n;
    const activePed=tsPedestrians.find(p=>p.alive&&p.crosswalk===cw&&p.phase==='cross');
    if(activePed){tsCtx.shadowColor='#fbbf24';tsCtx.shadowBlur=10;}
    tsCtx.fillStyle='#fbbf24cc';
    for(let i=0;i<n;i+=2){
      tsCtx.fillRect(
        cw.x+(cw.dir==='h'?i*sw:0),
        cw.y+(cw.dir==='v'?i*sh:0),
        sw,sh
      );
    }
    tsCtx.shadowBlur=0;
  });
}

function tsDrawZones(){
  tsParkingZones.forEach(pz=>{
    tsCtx.fillStyle=pz.forbidden?'rgba(239,68,68,.25)':'rgba(34,197,94,.14)';
    tsCtx.fillRect(pz.x,pz.y,pz.w,pz.h);
    tsCtx.strokeStyle=pz.forbidden?'#ef4444':'#22c55e';tsCtx.lineWidth=1.2;
    tsCtx.setLineDash([3,3]);tsCtx.strokeRect(pz.x,pz.y,pz.w,pz.h);tsCtx.setLineDash([]);
    tsCtx.fillStyle=pz.forbidden?'#ef4444':'#22c55e';tsCtx.font='bold 7px DM Mono,monospace';
    tsCtx.textAlign='left';
    tsCtx.fillText(pz.forbidden?'⛔ PROIBIDO':'🅿 ESTAC.',pz.x,pz.y-2);
  });
  tsLoadingZones.forEach(lz=>{
    tsCtx.fillStyle='rgba(168,255,62,.18)';tsCtx.fillRect(lz.x,lz.y,lz.w,lz.h);
    tsCtx.strokeStyle='#a8ff3e';tsCtx.lineWidth=1.2;
    tsCtx.setLineDash([3,3]);tsCtx.strokeRect(lz.x,lz.y,lz.w,lz.h);tsCtx.setLineDash([]);
    tsCtx.fillStyle='#a8ff3e';tsCtx.font='bold 7px DM Mono,monospace';
    tsCtx.textAlign='left';tsCtx.fillText('📦 CARGA',lz.x,lz.y-2);
  });
}

function tsDrawTrafficLights(){
  tsTrafficLights.forEach(tl=>{
    const sz=10;
    // Poste
    tsCtx.strokeStyle='#555';tsCtx.lineWidth=2;
    tsCtx.beginPath();tsCtx.moveTo(tl.x,tl.y);tsCtx.lineTo(tl.x,tl.y-sz*4);tsCtx.stroke();
    // Caixa
    tsCtx.fillStyle='#1a1a1a';tsCtx.strokeStyle='#333';tsCtx.lineWidth=1;
    tsCtx.beginPath();tsCtx.roundRect(tl.x-sz/2-3,tl.y-sz*3.5-5,sz+6,sz*3.5+6,3);
    tsCtx.fill();tsCtx.stroke();
    // Lâmpadas
    const colMap={green:['#1a0000','#1a1000','#22c55e'],yellow:['#1a0000','#fbbf24','#001a00'],red:['#ef4444','#1a1000','#001a00']};
    const glow={green:'#22c55e',yellow:'#fbbf24',red:'#ef4444'};
    colMap[tl.state].forEach((c,i)=>{
      const lit=c!=='#1a0000'&&c!=='#1a1000'&&c!=='#001a00';
      if(lit){tsCtx.shadowColor=glow[tl.state];tsCtx.shadowBlur=14;}
      tsCtx.fillStyle=c;
      tsCtx.beginPath();tsCtx.arc(tl.x,tl.y-sz*(2.8-i)-2,sz/2,0,Math.PI*2);tsCtx.fill();
      tsCtx.shadowBlur=0;
    });
    // Contagem regressiva
    tsCtx.fillStyle='#ffffff66';tsCtx.font='bold 6px DM Mono,monospace';
    tsCtx.textAlign='center';tsCtx.textBaseline='middle';
    tsCtx.fillText(Math.ceil(tl.countdown)||'',tl.x,tl.y-sz*2+3);
    // Halo noturno
    if(tsTimeOfDay==='night'||tsTimeOfDay==='dawn'){
      const hc=tl.state==='green'?'#22c55e':tl.state==='yellow'?'#fbbf24':'#ef4444';
      const grd=tsCtx.createRadialGradient(tl.x,tl.y-sz,0,tl.x,tl.y-sz,55);
      grd.addColorStop(0,hc+'33');grd.addColorStop(1,'transparent');
      tsCtx.fillStyle=grd;tsCtx.fillRect(tl.x-55,tl.y-sz*4,110,sz*4+55);
    }
  });
}

function tsDrawBuildings(){
  tsBuildingWindows.forEach(b=>{
    const isN=tsTimeOfDay==='night',isD=tsTimeOfDay==='dusk';
    tsCtx.fillStyle='rgba(0,0,0,.32)';tsCtx.fillRect(b.x+3,b.y+3,b.w,b.h);
    const grad=tsCtx.createLinearGradient(b.x,b.y,b.x+b.w,b.y+b.h);
    grad.addColorStop(0,b.c);grad.addColorStop(1,b.c2||b.c);
    tsCtx.fillStyle=grad;tsCtx.fillRect(b.x,b.y,b.w,b.h);
    tsCtx.strokeStyle='#ffffff10';tsCtx.lineWidth=1;tsCtx.strokeRect(b.x,b.y,b.w,b.h);
    for(let r=0;r<b.rows;r++)for(let c=0;c<b.cols;c++){
      const v=b.windows[r*b.cols+c];
      const wc=isN?(v>.4?`rgba(255,230,120,${.4+v*.3})`:'rgba(20,30,50,.8)'):
               isD?(v>.55?'rgba(255,200,80,.35)':'rgba(147,210,255,.15)'):
               (v>.45?'rgba(147,210,255,.4)':'rgba(20,40,70,.5)');
      tsCtx.fillStyle=wc;tsCtx.fillRect(b.x+4+c*13,b.y+4+r*11,7,5);
    }
  });
}

function tsDrawVehicle(v){
  if(!v.alive)return;
  tsCtx.save();
  tsCtx.globalAlpha=v.alpha;
  const isSel=tsSelectedVehicle&&tsSelectedVehicle.id===v.id;
  const isHov=tsHoveredVehicle&&tsHoveredVehicle.id===v.id;
  tsCtx.translate(v.x,v.y);
  const angle = v.angle || Math.atan2(v.dy,v.dx);
  tsCtx.rotate(angle + (v.drunk ? Math.sin(Date.now()*.008)*.15 : 0));

  let cw,ch;
  switch(v.type){case 'moto':cw=7;ch=17;break;case 'bus':cw=24;ch=52;break;case 'truck':cw=22;ch=46;break;case 'ambulance':cw=20;ch=40;break;default:cw=17;ch=32;}

  // Sombra
  tsCtx.fillStyle='rgba(0,0,0,.4)';
  tsCtx.beginPath();tsCtx.ellipse(2,3,cw*.7,ch*.35,0,0,Math.PI*2);tsCtx.fill();

  // Anel seleção/hover
  if(isSel){
    tsCtx.strokeStyle='#f5c518';tsCtx.lineWidth=2.5;
    tsCtx.setLineDash([4,3]);tsCtx.strokeRect(-cw/2-5,-ch/2-5,cw+10,ch+10);tsCtx.setLineDash([]);
  }else if(isHov){
    tsCtx.strokeStyle='#22d3ee55';tsCtx.lineWidth=1.5;tsCtx.strokeRect(-cw/2-3,-ch/2-3,cw+6,ch+6);
  }

  // Anel flash de infração
  if(v.violationFlash>0){
    const a=Math.sin(Date.now()*.03)*.5+.5;
    tsCtx.strokeStyle=`rgba(239,68,68,${a})`;tsCtx.lineWidth=3;
    tsCtx.strokeRect(-cw/2-6,-ch/2-6,cw+12,ch+12);
  }

  // Corpo
  tsCtx.shadowColor='rgba(0,0,0,.5)';tsCtx.shadowBlur=6;tsCtx.shadowOffsetY=2;
  tsCtx.fillStyle=v.color;
  tsCtx.beginPath();tsCtx.roundRect(-cw/2,-ch/2,cw,ch,v.type==='moto'?3:5);tsCtx.fill();
  tsCtx.shadowBlur=0;tsCtx.shadowOffsetY=0;

  // Detalhes por tipo
  if(v.type==='car'||v.type==='taxi'){
    tsCtx.fillStyle='rgba(150,220,255,.6)';
    tsCtx.beginPath();tsCtx.roundRect(-cw/2+2,-ch/2+3,cw-4,ch*.28,2);tsCtx.fill();
    tsCtx.fillStyle='rgba(150,220,255,.4)';
    tsCtx.beginPath();tsCtx.roundRect(-cw/2+2,ch/2-ch*.22,cw-4,ch*.18,2);tsCtx.fill();
    tsCtx.fillStyle=tsAdjColor(v.color,-20);
    tsCtx.beginPath();tsCtx.roundRect(-cw/2+3,-ch/2+ch*.28,cw-6,ch*.42,2);tsCtx.fill();
    if(v.type==='taxi'){tsCtx.fillStyle='#222';tsCtx.font='bold 5px DM Sans';tsCtx.textAlign='center';tsCtx.textBaseline='middle';tsCtx.fillText('TAXI',0,-ch*.08);}
    // Faróis
    const needLight=tsTimeOfDay==='night'||tsTimeOfDay==='dawn'||tsWeather==='storm';
    if(needLight&&!v.noLight){
      tsCtx.fillStyle='#ffffcc';tsCtx.shadowColor='#ffff99';tsCtx.shadowBlur=18;
      tsCtx.fillRect(-cw/2+1,-ch/2+1,5,3);tsCtx.fillRect(cw/2-6,-ch/2+1,5,3);
      const g=tsCtx.createLinearGradient(0,-ch/2,0,-ch/2-40);
      g.addColorStop(0,'rgba(255,255,180,.16)');g.addColorStop(1,'transparent');
      tsCtx.fillStyle=g;tsCtx.beginPath();
      tsCtx.moveTo(-cw/2,-ch/2);tsCtx.lineTo(-cw*1.5,-ch/2-45);tsCtx.lineTo(cw*1.5,-ch/2-45);tsCtx.lineTo(cw/2,-ch/2);
      tsCtx.fill();tsCtx.shadowBlur=0;
    }
    // Brake
    if(v.brakeLights||v.stopped){
      tsCtx.fillStyle='#ff2200';tsCtx.shadowColor='#ff2200';tsCtx.shadowBlur=12;
      tsCtx.fillRect(-cw/2+1,ch/2-4,5,3);tsCtx.fillRect(cw/2-6,ch/2-4,5,3);tsCtx.shadowBlur=0;
    }
    // Celular (ícone sobre o carro)
    if(v.cellphone){
      tsCtx.font='7px serif';tsCtx.textAlign='center';
      tsCtx.fillText('📱',0,-ch*.05);
    }
    // Sem cinto (ícone)
    if(v.noBelt){
      tsCtx.fillStyle='#fbbf24';tsCtx.font='6px serif';tsCtx.textAlign='center';
      tsCtx.fillText('🔗',cw*.3,-ch*.1);
    }
  }else if(v.type==='moto'){
    tsCtx.fillStyle='#fde68a';tsCtx.beginPath();tsCtx.arc(0,-ch*.28,3.5,0,Math.PI*2);tsCtx.fill();
    if(v.noHelmet){
      // Sem capacete — cabeça exposta
      tsCtx.fillStyle='#fde68a';tsCtx.beginPath();tsCtx.arc(0,-ch*.28,3.5,0,Math.PI*2);tsCtx.fill();
      tsCtx.font='7px serif';tsCtx.textAlign='center';tsCtx.fillText('⛑',0,-ch*.52);
    }else{
      tsCtx.fillStyle='#1e293b';tsCtx.beginPath();tsCtx.arc(0,-ch*.28,3.5,-Math.PI,.2);tsCtx.fill();
    }
    tsCtx.strokeStyle='#ffffff30';tsCtx.lineWidth=2;
    tsCtx.beginPath();tsCtx.ellipse(0,-ch*.42,cw*.5,2,0,0,Math.PI*2);tsCtx.stroke();
    tsCtx.beginPath();tsCtx.ellipse(0,ch*.42,cw*.5,2,0,0,Math.PI*2);tsCtx.stroke();
  }else if(v.type==='bus'){
    for(let i=0;i<6;i++){
      tsCtx.fillStyle=i===0?'rgba(150,220,255,.65)':'rgba(147,210,255,.4)';
      tsCtx.fillRect(-cw/2+3,-ch/2+5+i*7.5,cw-6,5.5);
    }
    if(v.brakeLights||v.stopped){tsCtx.fillStyle='#ff2200';tsCtx.shadowColor='#ff2200';tsCtx.shadowBlur=10;tsCtx.fillRect(-cw/2,ch/2-3,cw,3);tsCtx.shadowBlur=0;}
  }else if(v.type==='truck'){
    tsCtx.fillStyle=tsAdjColor(v.color,20);tsCtx.beginPath();tsCtx.roundRect(-cw/2,-ch/2,cw,ch*.35,3);tsCtx.fill();
    tsCtx.fillStyle='rgba(150,220,255,.55)';tsCtx.fillRect(-cw/2+2,-ch/2+2,cw-4,ch*.22);
    tsCtx.strokeStyle='#ffffff18';tsCtx.lineWidth=1.2;tsCtx.strokeRect(-cw/2,ch*.35-ch/2,cw,ch*.62);
    if(Math.random()<.025)tsSpawnParticle(v.x,v.y,'smoke');
  }else if(v.type==='ambulance'){
    tsCtx.fillStyle='#ef4444';tsCtx.fillRect(-cw/2,-ch/2,cw,6);tsCtx.fillRect(-cw/2,ch/2-6,cw,6);
    tsCtx.fillStyle='#ef4444';tsCtx.fillRect(-2,-ch*.15,4,ch*.3);tsCtx.fillRect(-cw*.3,-3,cw*.6,4);
    tsCtx.font='5px serif';tsCtx.fillStyle='#fff';tsCtx.textAlign='center';tsCtx.fillText('SAMU',0,ch*.35);
    const ft=Date.now()*.015;
    tsCtx.fillStyle=Math.sin(ft)>.3?'rgba(0,100,255,.7)':'rgba(255,50,50,.7)';
    tsCtx.shadowColor=Math.sin(ft)>.3?'#0044ff':'#ff2200';tsCtx.shadowBlur=20;
    tsCtx.beginPath();tsCtx.arc(-cw*.3,-ch*.4,3,0,Math.PI*2);tsCtx.fill();
    tsCtx.fillStyle=Math.sin(ft)>.3?'rgba(255,50,50,.7)':'rgba(0,100,255,.7)';
    tsCtx.shadowColor=Math.sin(ft)>.3?'#ff2200':'#0044ff';
    tsCtx.beginPath();tsCtx.arc(cw*.3,-ch*.4,3,0,Math.PI*2);tsCtx.fill();
    tsCtx.shadowBlur=0;
  }

  // Bêbado: borda ondulada
  if(v.drunk){
    tsCtx.strokeStyle='#f43f5e';tsCtx.lineWidth=2;tsCtx.setLineDash([3,3]);
    tsCtx.strokeRect(-cw/2-3,-ch/2-3,cw+6,ch+6);tsCtx.setLineDash([]);
  }

  // Contramão: seta vermelha
  if(v.wrongWay){
    tsCtx.fillStyle='#ef4444';tsCtx.font='bold 8px serif';
    tsCtx.textAlign='center';tsCtx.fillText('↩',-0,-ch/2-8);
  }

  // Badge de velocidade (infratores ou selecionados)
  if(isSel||(v.violator&&!v.stopped)){
    tsCtx.rotate(-angle);
    const kmh=tsGetVehicleKmh(v);
    const lim=tsGetSpeedLimit(v);
    const col=kmh>lim*1.5?'#dc2626':kmh>lim*1.2?'#f97316':kmh>lim?'#fbbf24':'#22c55e';
    tsCtx.fillStyle='rgba(0,0,0,.75)';
    tsCtx.beginPath();tsCtx.roundRect(-20,-ch/2-22,40,15,4);tsCtx.fill();
    tsCtx.fillStyle=col;tsCtx.font='bold 7px DM Mono,monospace';
    tsCtx.textAlign='center';tsCtx.textBaseline='middle';
    tsCtx.fillText(`${kmh}/${lim}km/h`,0,-ch/2-15);
  }

  tsCtx.restore();
}

function tsDrawPedestrian(p){
  if(!p.alive)return;
  tsCtx.save();tsCtx.globalAlpha=p.alpha;
  tsCtx.fillStyle='rgba(0,0,0,.2)';
  tsCtx.beginPath();tsCtx.ellipse(p.x,p.y+p.r+2,p.r*.9,2.5,0,0,Math.PI*2);tsCtx.fill();
  tsCtx.fillStyle=p.color;tsCtx.shadowColor=p.color;tsCtx.shadowBlur=p.reckless?10:4;
  tsCtx.beginPath();tsCtx.arc(p.x,p.y,p.r,0,Math.PI*2);tsCtx.fill();tsCtx.shadowBlur=0;
  tsCtx.fillStyle='#fde68a';tsCtx.beginPath();tsCtx.arc(p.x,p.y-p.r*1.5,p.r*.65,0,Math.PI*2);tsCtx.fill();
  const t=Date.now()*.008;
  if(p.phase==='cross'){
    tsCtx.strokeStyle=p.color;tsCtx.lineWidth=1.5;tsCtx.beginPath();
    tsCtx.moveTo(p.x,p.y+p.r);tsCtx.lineTo(p.x-2+Math.sin(t)*2.5,p.y+p.r*2.2+Math.abs(Math.sin(t))*1.5);
    tsCtx.moveTo(p.x,p.y+p.r);tsCtx.lineTo(p.x+2-Math.sin(t)*2.5,p.y+p.r*2.2+Math.abs(Math.cos(t))*1.5);
    tsCtx.stroke();
  }
  if(p.reckless){tsCtx.font='9px serif';tsCtx.fillStyle='#f97316';tsCtx.textAlign='center';tsCtx.shadowColor='#000';tsCtx.shadowBlur=3;tsCtx.fillText('⚠',p.x,p.y-p.r*2.8);tsCtx.shadowBlur=0;}
  if(p.phase==='wait'){tsCtx.fillStyle='rgba(251,191,36,.8)';tsCtx.beginPath();tsCtx.arc(p.x,p.y-p.r*3,4,0,Math.PI*2);tsCtx.fill();}
  tsCtx.restore();
}

function tsDrawParticles(){
  tsParticles.forEach(p=>{
    if(!p.alive)return;
    tsCtx.save();tsCtx.globalAlpha=p.life;
    if(p.type==='smoke'){
      tsCtx.fillStyle=p.color;tsCtx.beginPath();tsCtx.arc(p.x,p.y,p.r*(2-p.life),0,Math.PI*2);tsCtx.fill();
    }else{
      tsCtx.fillStyle=p.color;tsCtx.shadowColor=p.color;tsCtx.shadowBlur=5;
      tsCtx.beginPath();tsCtx.arc(p.x,p.y,p.r,0,Math.PI*2);tsCtx.fill();
    }
    tsCtx.restore();
  });
}

function tsDrawRain(){
  if(tsWeather!=='rain'&&tsWeather!=='storm')return;
  const inten=tsWeather==='storm'?1.8:1;
  tsCtx.save();tsCtx.strokeStyle=`rgba(174,214,241,${tsWeather==='storm'?.55:.38})`;tsCtx.lineWidth=tsWeather==='storm'?1.5:1;
  tsRainDrops.forEach(d=>{
    tsCtx.beginPath();tsCtx.moveTo(d.x,d.y);tsCtx.lineTo(d.x-2.5*inten,d.y+d.len*inten);tsCtx.stroke();
  });
  if(tsWeather==='storm'&&Math.random()<.002){tsCtx.fillStyle='rgba(255,255,255,.06)';tsCtx.fillRect(0,0,tsW,tsH);}
  tsCtx.restore();
}

function tsDrawFog(){
  if(tsWeather!=='fog')return;
  tsCtx.fillStyle='rgba(195,205,215,.2)';tsCtx.fillRect(0,0,tsW,tsH);
  const t=Date.now()/4000;
  for(let i=0;i<5;i++){
    const fx=((t*25+i*tsW/5)%(tsW+200))-100,fy=tsH*(.2+i*.14);
    const g=tsCtx.createRadialGradient(fx,fy,0,fx,fy,130);
    g.addColorStop(0,'rgba(205,215,225,.25)');g.addColorStop(1,'transparent');
    tsCtx.fillStyle=g;tsCtx.fillRect(fx-130,fy-65,260,130);
  }
}

function tsDrawHeat(){
  if(tsWeather!=='hot')return;
  const t=Date.now()/500;
  tsCtx.save();tsCtx.globalAlpha=.04;
  for(let i=0;i<5;i++){
    const y=tsH*(.25+i*.13)+Math.sin(t+i*1.3)*4;
    const g=tsCtx.createLinearGradient(0,y,0,y+16);
    g.addColorStop(0,'rgba(255,180,30,.6)');g.addColorStop(1,'transparent');
    tsCtx.fillStyle=g;tsCtx.fillRect(0,y,tsW,16);
  }
  tsCtx.restore();
}

function tsDrawNight(){
  if(tsTimeOfDay==='day')return;
  const a={dawn:.22,dusk:.45,night:.72}[tsTimeOfDay]||0;
  tsCtx.fillStyle=`rgba(5,10,25,${a})`;tsCtx.fillRect(0,0,tsW,tsH);
  if(tsTimeOfDay==='night'||tsTimeOfDay==='dawn'){
    tsRoads.h.forEach(r=>{
      [tsW*.22,tsW*.5,tsW*.78].forEach(sx=>{
        const g=tsCtx.createRadialGradient(sx,r.y-40,0,sx,r.y,75);
        g.addColorStop(0,'rgba(255,235,160,.22)');g.addColorStop(1,'transparent');
        tsCtx.fillStyle=g;tsCtx.fillRect(sx-75,r.y-45,150,90);
      });
    });
    if(tsTimeOfDay==='night'){
      tsCtx.fillStyle='rgba(255,255,255,.7)';
      for(let i=0;i<40;i++){tsCtx.beginPath();tsCtx.arc((i*137.5)%tsW,(i*79.3)%(tsH*.25),i%5===0?1.2:.6,0,Math.PI*2);tsCtx.fill();}
    }
  }
  if(tsTimeOfDay==='dusk'){
    const g=tsCtx.createLinearGradient(0,0,0,tsH*.3);
    g.addColorStop(0,'rgba(220,100,30,.25)');g.addColorStop(1,'transparent');
    tsCtx.fillStyle=g;tsCtx.fillRect(0,0,tsW,tsH*.3);
  }
}

// ── Tooltip do veículo selecionado ────────────────
function tsDrawVehicleTooltip(){
  const v=tsSelectedVehicle;
  if(!v||!v.alive){tsSelectedVehicle=null;return;}
  const kmh=tsGetVehicleKmh(v);
  const lim=tsGetSpeedLimit(v);
  const h=Math.min(160+(v.violations.length)*14,220);
  const px=Math.min(v.x+24,tsW-170);
  const py=Math.max(v.y-h/2,5);
  const w=162;

  tsCtx.save();
  tsCtx.fillStyle='rgba(5,10,20,.94)';
  tsCtx.strokeStyle=v.violations.length>0?'#ef4444':'#22c55e';
  tsCtx.lineWidth=1.5;
  tsCtx.beginPath();tsCtx.roundRect(px,py,w,h,7);tsCtx.fill();tsCtx.stroke();

  tsCtx.textBaseline='top';tsCtx.textAlign='left';
  // Título
  tsCtx.fillStyle='#e8edf5';tsCtx.font='bold 8.5px DM Mono,monospace';
  tsCtx.fillText(`${v.type==='ambulance'?'🚨':v.type==='moto'?'🏍':'🚗'} ${v.label}`,px+7,py+7);
  // Placa
  tsCtx.fillStyle='#6b7ea0';tsCtx.font='7px DM Mono,monospace';
  tsCtx.fillText(`Placa: ${v.plateNum}`,px+7,py+20);
  // Velocidade
  const sCol=kmh>lim*1.5?'#dc2626':kmh>lim*1.2?'#f97316':kmh>lim?'#fbbf24':'#22c55e';
  tsCtx.fillStyle=sCol;
  tsCtx.fillText(`Veloc: ${kmh} km/h  (limite: ${lim})`,px+7,py+31);
  // Pontos CNH
  const pCol=v.points>=20?'#ef4444':v.points>=15?'#f97316':v.points>0?'#fbbf24':'#22c55e';
  tsCtx.fillStyle=pCol;
  tsCtx.fillText(`Pontos CNH: ${v.points}/20`,px+7,py+42);
  // Multas acumuladas
  tsCtx.fillStyle='#e8edf5';
  const fineTotal=v.violations.reduce((s,r)=>{const rule=CTB_RULES[r];return s+(rule?rule.fine:0);},0);
  tsCtx.fillText(`Multas: R$${fineTotal.toFixed(2)}`,px+7,py+53);

  // Status
  const status=v.isAmbulance?'🚨 Emergência':
    v.drunk?'🍺 Embriagado':
    v.wrongWay?'↩ Contramão':
    v.speederLvl!=='none'?'💨 Excesso Veloc.':
    v.redRunner?'🔴 Furou Sinal':
    v.noBelt?'🔗 Sem cinto':
    v.noHelmet?'⛑ Sem capacete':
    v.cellphone?'📱 Celular':
    v.violations.length>0?'⚠️ Infrator':'✅ Regular';
  tsCtx.fillStyle=v.violations.length>0&&!v.isAmbulance?'#ef4444':'#22c55e';
  tsCtx.fillText(`Status: ${status}`,px+7,py+64);

  // Infrações
  if(v.violations.length>0){
    tsCtx.fillStyle='#6b7ea0';tsCtx.font='6.5px DM Mono,monospace';
    tsCtx.fillText('── Infrações registradas ──',px+7,py+76);
    v.violations.slice(0,5).forEach((rId,i)=>{
      const rule=CTB_RULES[rId];if(!rule)return;
      tsCtx.fillStyle=rule.color||'#fbbf24';
      tsCtx.fillText(`${rule.icon} ${rule.art} +${rule.pts}pts R$${rule.fine}`,px+7,py+87+i*12);
    });
    if(v.violations.length>5){
      tsCtx.fillStyle='#6b7ea0';
      tsCtx.fillText(`...e mais ${v.violations.length-5} infração(ões)`,px+7,py+87+5*12);
    }
  }

  // Fechar
  tsCtx.fillStyle='#ffffff25';tsCtx.font='6px DM Sans';
  tsCtx.fillText('Clique novamente para fechar',px+7,py+h-9);
  tsCtx.restore();
}

// ═══════════════════════════════════════════════════
// ATUALIZAÇÃO (lógica por frame)
// ═══════════════════════════════════════════════════
function tsUpdateTL(dt){
  tsTrafficLights.forEach(tl=>{
    tl.phase=(tl.phase+dt*tsSpeedMult*28)%tl.cycle;
    const p=tl.phase/tl.cycle;
    const prev=tl.state;
    tl.state=p<.55?'green':p<.65?'yellow':'red';
    // Contador regressivo real
    if(p<.55)         tl.countdown=Math.ceil(tl.cycle*(.55-p)/28);
    else if(p<.65)    tl.countdown=Math.ceil(tl.cycle*(.65-p)/28);
    else              tl.countdown=Math.ceil(tl.cycle*(1-p+.55)/28);
  });
}

function tsUpdateVehicles(dt){
  const BASE=58;
  tsVehicles.forEach(v=>{
    if(!v.alive)return;
    if(v.stopped&&v.parkTimer>0){v.parkTimer-=dt*tsSpeedMult*60;if(v.parkTimer<=0)v.alive=false;return;}

    // Verificar todas as regras CTB
    if(Math.random()<.1)tsCheckAllRules(v,dt); // stagger checks para performance

    // Semáforo: parar ou passar
    let shouldStop=false;
    tsTrafficLights.forEach(tl=>{
      if(tl.state==='red'||tl.state==='yellow'){
        const d=tsDist(v,tl);
        if(d<55&&d>18&&!v.redRunner&&!v.isAmbulance)shouldStop=true;
      }
    });

    // Distância segura: travar atrás de outro veículo
    tsVehicles.forEach(other=>{
      if(other===v||!other.alive||other===v.frontVehicle)return;
      const d=tsDist(v,other);
      const sameDirH=v.horiz&&other.horiz&&Math.sign(v.dx)===Math.sign(other.dx);
      const sameDirV=!v.horiz&&!other.horiz&&Math.sign(v.dy)===Math.sign(other.dy);
      if((sameDirH||sameDirV)&&d<32&&!v.redRunner&&!v.isAmbulance)shouldStop=true;
    });

    v.brakeLights=shouldStop;v.stopped=shouldStop;

    if(!v.stopped){
      const wm=tsWeather==='rain'?.75:tsWeather==='storm'?.55:tsWeather==='fog'?.7:1;
      const sm=v.speederLvl==='heavy'?2.2:v.speederLvl==='moderate'?1.4:v.speederLvl==='light'?1.2:1;
      const dm=v.drunk?.75:1;
      const am=v.isAmbulance?1.4:1;
      const sp=v.speed*BASE*wm*sm*dm*am*tsSpeedMult;
      v.x+=v.dx*sp*dt;v.y+=v.dy*sp*dt;
      if(v.drunk){v.wobblePhase+=dt*2;v.y+=Math.sin(v.wobblePhase)*1.5*tsSpeedMult;}
    }

    if(v.violationFlash>0)v.violationFlash-=dt*60;
    if(v.x<-130||v.x>tsW+130||v.y<-130||v.y>tsH+130)v.alive=false;

    // Verificar colisão com pedestre
    tsPedestrians.forEach(p=>tsCheckPedestrianRight(v,p));
  });
  tsVehicles=tsVehicles.filter(v=>v.alive);
}

function tsUpdatePedestrians(dt){
  tsPedestrians.forEach(p=>{
    if(!p.alive)return;
    const cw=p.crosswalk;
    if(p.phase==='approach'){
      const tx=cw.dir==='h'?p.dstX:cw.x,ty=cw.dir==='v'?p.dstY:cw.y;
      const ddx=tx-p.x,ddy=ty-p.y,d=Math.hypot(ddx,ddy);
      if(d<8){p.phase=p.reckless?'cross':'wait';}
      else{const sp=38*tsSpeedMult;p.x+=ddx/d*sp*dt;p.y+=ddy/d*sp*dt;}
    }else if(p.phase==='wait'){
      p.waitTimer+=dt;
      const nl=tsTrafficLights.reduce((b,tl)=>tsDist(tl,cw)<tsDist(b,cw)?tl:b,tsTrafficLights[0]);
      if(nl&&nl.state==='green'){p.phase='cross';p.crossing=true;tsLog('🚶','Pedestre atravessando na faixa com sinal aberto.','ok');}
      if(p.reckless&&nl&&nl.state!=='green'&&Math.random()<.007){
        p.phase='cross';p.crossing=true;tsTotalViolations++;
        tsLog('⚠️','Pedestre imprudente atravessou no sinal fechado! Art. 254 CTB','warn');
        tsShowNotif('⚠️ Pedestre infrator! Art. 254 CTB','warn');
      }
      if(!p.reckless&&p.waitTimer>15&&Math.random()<.002){
        p.phase='cross';p.crossing=true;tsTotalViolations++;
        tsLog('⚠️','Pedestre impaciente atravessou sem aguardar sinal!','warn');
      }
    }else if(p.phase==='cross'){
      const sp=30*tsSpeedMult;p.x+=p.dx*sp*dt;p.y+=p.dy*sp*dt;p.crossing=true;
      const dx2=cw.dir==='h'?p.dstX:cw.x+(p.dx>0?60:-60);
      const dy2=cw.dir==='v'?p.dstY:cw.y+(p.dy>0?60:-60);
      if(Math.abs(p.x-dx2)<8&&Math.abs(p.y-dy2)<8){p.phase='depart';p.crossing=false;}
    }else if(p.phase==='depart'){
      p.alpha-=dt*tsSpeedMult*.8;if(p.alpha<=0)p.alive=false;
    }
  });
  tsPedestrians=tsPedestrians.filter(p=>p.alive);
}

function tsUpdateParticles(dt){
  tsParticles.forEach(p=>{
    p.x+=p.vx*tsSpeedMult;p.y+=p.vy*tsSpeedMult;
    if(p.type!=='smoke')p.vy+=.06*tsSpeedMult;
    p.life-=p.decay*tsSpeedMult;if(p.life<=0)p.alive=false;
  });
  tsParticles=tsParticles.filter(p=>p.alive);
}

function tsUpdateRain(dt){
  tsRainDrops.forEach(d=>{
    d.y+=d.spd*tsSpeedMult;d.x-=.6*tsSpeedMult;
    if(d.y>tsH){d.splashX=d.x;d.splashY=tsH-2;d.splashTimer=.8;d.y=tsR(-20,0);d.x=tsR(0,tsW);}
    if(d.splashTimer>0)d.splashTimer-=dt*2;
  });
}

function tsUpdateTime(dt){
  tsSimHour+=dt*tsSpeedMult*(1/60);
  if(tsSimHour>=24)tsSimHour-=24;
  const h=tsSimHour;
  if(h>=5&&h<7)tsTimeOfDay='dawn';
  else if(h>=7&&h<18)tsTimeOfDay='day';
  else if(h>=18&&h<20)tsTimeOfDay='dusk';
  else tsTimeOfDay='night';
  tsUpdateBadges();tsUpdateTimeButtons();
}

// ── Interação canvas ──────────────────────────────
function tsOnCanvasClick(e){
  const rect=tsCanvas.getBoundingClientRect();
  const mx=(e.clientX-rect.left)*(tsW/rect.width);
  const my=(e.clientY-rect.top)*(tsH/rect.height);
  const world = tsWorldFromScreen(mx,my);
  if(tsSelectedVehicle&&tsDist(world,tsSelectedVehicle)<25){tsSelectedVehicle=null;return;}
  const hit=tsVehicles.find(v=>v.alive&&tsDist(world,v)<22);
  tsSelectedVehicle=hit||null;
  if(hit){
    const vCount=hit.violations.length;
    tsLog(vCount>0?'⚠️':'ℹ️',
      vCount>0?`Veículo ${hit.plateNum} com ${vCount} infração(ões) · ${hit.points} pontos na CNH`:
               `Veículo ${hit.plateNum} · Regular · Sem infrações`,
      vCount>0?'warn':'info');
    if(hit.lastViolation) tsSetCtbDetail(hit.lastViolation);
  }
}

function tsOnCanvasHover(e){
  const rect=tsCanvas.getBoundingClientRect();
  const mx=(e.clientX-rect.left)*(tsW/rect.width);
  const my=(e.clientY-rect.top)*(tsH/rect.height);
  const world = tsWorldFromScreen(mx,my);
  tsHoveredVehicle=tsVehicles.find(v=>v.alive&&tsDist(world,v)<22)||null;
  tsCanvas.style.cursor=tsHoveredVehicle?'pointer':'default';
}

// ── Loop principal ────────────────────────────────
function tsFrame(ts){
  if(!tsLastT)tsLastT=ts;
  const dt=Math.min((ts-tsLastT)/1000,.05);
  tsLastT=ts;tsFrameCount++;

  if(tsRunning){
    tsSpawnTimer+=dt*tsSpeedMult;tsPedSpawnTimer+=dt*tsSpeedMult;
    const vehicleInterval = tsChaosMode ? 0.55 : (tsMapState?.spawnRate || 1.25);
    const pedInterval = tsChaosMode ? 1.1 : 2.1;
    if(tsSpawnTimer > vehicleInterval){tsSpawnVehicle();tsSpawnTimer=0;}
    if(tsPedSpawnTimer > pedInterval){tsSpawnPedestrian();tsPedSpawnTimer=0;}
    tsUpdateTL(dt);tsUpdateVehicles(dt);tsUpdatePedestrians(dt);
    tsUpdateParticles(dt);tsUpdateRain(dt);tsUpdateTime(dt);
    tsUpdateAmbientSound();
    if(tsFrameCount%6===0)tsUpdateStats();
  }

  // Render
  tsCtx.clearRect(0,0,tsW,tsH);
  const viewX = (1 - tsZoom) * tsW * 0.5;
  const viewY = (1 - tsZoom) * tsH * 0.5;
  tsCtx.save();
  tsCtx.setTransform(tsZoom, 0, 0, tsZoom, viewX, viewY);
  tsDrawGround();
  tsDrawTrees();
  tsDrawBuildings();
  tsDrawRoads();
  tsDrawSchoolZones();tsDrawSpeedBumps();
  tsDrawCrosswalks();tsDrawZones();tsDrawTrafficLights();
  tsPedestrians.forEach(tsDrawPedestrian);
  tsVehicles.forEach(tsDrawVehicle);
  tsDrawParticles();tsDrawRain();tsDrawFog();tsDrawHeat();tsDrawNight();
  if(tsSelectedVehicle&&tsSelectedVehicle.alive)tsDrawVehicleTooltip();
  tsCtx.restore();

  tsRafId=requestAnimationFrame(tsFrame);
}

// ── UI helpers ────────────────────────────────────
function tsLog(icon,text,sev){
  const log=document.getElementById('ts-event-log');if(!log)return;
  const hh=String(Math.floor(tsSimHour)).padStart(2,'0');
  const mm=String(Math.floor((tsSimHour%1)*60)).padStart(2,'0');
  const cls=sev==='danger'?'ts-ev-danger':sev==='warn'?'ts-ev-warn':sev==='ok'?'ts-ev-ok':'ts-ev-info';
  const div=document.createElement('div');div.className=`ts-ev-item ${cls}`;
  div.innerHTML=`<span class="ts-ev-icon">${icon}</span><span class="ts-ev-time">${hh}:${mm}</span><span>${text}</span>`;
  log.prepend(div);while(log.children.length>35)log.removeChild(log.lastChild);
}

function tsSetCtbDetail(rule){
  const el=document.getElementById('ts-ctb-tip');if(!el)return;
  el.innerHTML=`
    <div style="margin-bottom:.4rem">
      <span style="color:${rule.color||'#fbbf24'};font-weight:700">${rule.icon} ${rule.art}</span>
      <span style="float:right;background:${rule.gravity.includes('GRAVÍSSIMA')?'#7f1d1d':rule.gravity==='GRAVE'?'#7c2d12':'#713f12'};color:#fff;font-size:.6rem;padding:.1rem .4rem;border-radius:4px">${rule.gravity}</span>
    </div>
    <div style="color:var(--text);margin-bottom:.3rem;font-weight:600">${rule.desc}</div>
    <div style="color:#ef4444;margin-bottom:.25rem">💰 Multa: <b>R$${rule.fine.toFixed(2)}</b> · 🎯 <b>${rule.pts} pontos</b></div>
    ${rule.extra?`<div style="color:#fbbf24;margin-bottom:.25rem">⚠ ${rule.extra}</div>`:''}
    <div style="color:var(--muted);font-style:italic;border-top:1px solid #1e2d47;padding-top:.3rem;margin-top:.2rem">${rule.educational}</div>
  `;
}

function tsShowNotif(msg,cls=''){
  const n=document.getElementById('ts-notif');if(!n)return;
  n.innerHTML=msg.replace('\n','<br>');
  n.className=`ts-notif ts-notif-show${cls?' ts-notif-'+cls:''}`;
  clearTimeout(window._tsNotifT);
  window._tsNotifT=setTimeout(()=>n.className='ts-notif',4500);
}

function tsUpdateStats(){
  const alive=tsVehicles.filter(v=>v.alive);
  const aliveP=tsPedestrians.filter(p=>p.alive);
  const el=id=>document.getElementById(id);
  if(el('ts-s-vehicles'))el('ts-s-vehicles').textContent=alive.length;
  if(el('ts-s-pedestrians'))el('ts-s-pedestrians').textContent=aliveP.length;
  if(el('ts-s-violations'))el('ts-s-violations').textContent=tsTotalViolations;
  if(el('ts-s-accidents'))el('ts-s-accidents').textContent=tsTotalAccidents;
  if(el('ts-s-fines'))el('ts-s-fines').textContent=`R$${tsTotalFines.toFixed(0)}`;
  if(el('ts-s-rate')){
    const inf=alive.filter(v=>v.violations&&v.violations.length>0).length;
    el('ts-s-rate').textContent=alive.length?`${Math.round(inf/alive.length*100)}%`:'0%';
  }
}

function tsUpdateBadges(){
  const tb=document.getElementById('ts-time-badge');
  const wb=document.getElementById('ts-weather-badge');
  if(!tb||!wb)return;
  const hh=String(Math.floor(tsSimHour)).padStart(2,'0');
  const mm=String(Math.floor((tsSimHour%1)*60)).padStart(2,'0');
  const te={dawn:'🌅',day:'☀️',dusk:'🌆',night:'🌙'}[tsTimeOfDay];
  const h=Math.floor(tsSimHour);
  const peak=((h>=7&&h<9)||(h>=17&&h<19))?' · 🚗 Horário de Pico':'';
  tb.textContent=`${te} ${hh}:${mm}${peak}`;
  wb.textContent={
    sunny:'☀️ Ensolarado · 28°C',
    hot:'🌡️ Calor Extremo · 38°C',
    rain:'🌧️ Chuva · 18°C · Pista Molhada',
    storm:'⛈️ Tempestade · 14°C · Visib. Reduzida',
    fog:'🌫️ Neblina · 16°C · Visibilidade Reduzida',
  }[tsWeather];
}

function tsUpdateTimeButtons(){
  ['dawn','day','dusk','night'].forEach(t=>{
    const b=document.getElementById('tt-'+t);if(b)b.className='ts-sm-btn'+(tsTimeOfDay===t?' ts-sm-on':'');
  });
}

// ── Controles públicos ────────────────────────────
function tsToggleRun(){
  tsRunning=!tsRunning;
  const btn=document.getElementById('btn-start-ts');
  if(btn){btn.textContent=tsRunning?'⏸ Pausar':'▶ Continuar';}
  if(tsRunning && !tsRafId){
    tsLastT=0;
    requestAnimationFrame(tsFrame);
  }
  if(tsAudioEnabled) tsUpdateAmbientSound();
}
function tsReset(){
  if(tsRafId) cancelAnimationFrame(tsRafId);
  tsRafId = null;
  tsVehicles=[]; tsPedestrians=[]; tsParticles=[]; tsViolationLog=[];
  tsTotalViolations=0; tsTotalAccidents=0; tsTotalFines=0;
  tsSelectedVehicle=null; tsHoveredVehicle=null;
  tsSimHour=8; tsTimeOfDay='day'; tsWeather='sunny'; tsSpeedMult=1;
  tsChaosMode=false; tsZoom=1;
  tsBuildLayout(); tsInitRain(); tsBuildingWindows=tsGenBuildingWindows();
  for(let i=0;i<10;i++) tsSpawnVehicle();
  for(let i=0;i<7;i++) tsSpawnPedestrian();
  tsRunning=true; tsLastT=0;
  tsUpdateBadges(); tsUpdateStats(); tsUpdateControls();
  tsLog('🔄','Simulador reiniciado com cenário limpo e realista.','ok');
  if(tsAudioEnabled) tsStartAmbient();
  requestAnimationFrame(tsFrame);
}
function tsUpdateControls(){
  const btn=document.getElementById('btn-start-ts');
  if(btn) btn.textContent=tsRunning?'⏸ Pausar':'▶ Continuar';
  const sound=document.getElementById('btn-sound');
  if(sound) sound.className='sim-ctrl-btn'+(tsAudioEnabled?' sim-ctrl-active':'');
  const voice=document.getElementById('btn-voice');
  if(voice) voice.className='sim-ctrl-btn'+(tsVoiceEnabled?' sim-ctrl-active':'');
  const map=document.getElementById('ts-map-mode-sel');
  if(map) map.value = tsMapMode;
  const zoomLabel=document.getElementById('ts-zoom-label');
  if(zoomLabel) zoomLabel.textContent = `${tsZoom.toFixed(2)}×`;
}

function tsSetMapMode(mode){
  if(!TS_MAP_MODES[mode]) return;
  tsMapMode = mode;
  tsBuildLayout();
  tsVehicles=[]; tsPedestrians=[]; tsParticles=[];
  for(let i=0;i<10;i++) tsSpawnVehicle();
  for(let i=0;i<7;i++) tsSpawnPedestrian();
  tsLog('🗺️',`Modo de mapa alterado para ${TS_MAP_MODES[mode].label}.`,`info`);
  tsUpdateControls();
}

function tsSetZoom(value){
  tsZoom = Math.min(1.4, Math.max(0.7, Math.round(value * 100) / 100));
  tsUpdateControls();
  tsShowNotif(`Zoom ajustado para ${tsZoom.toFixed(2)}×`,'');
}

function tsToggleAudio(){
  tsAudioEnabled = !tsAudioEnabled;
  if(tsAudioEnabled) tsStartAmbient();
  else tsStopAmbient();
  tsUpdateControls();
  tsShowNotif(tsAudioEnabled ? '🎧 Som ambiente ativado' : '🔇 Som ambiente desativado','');
}

function tsToggleVoice(){
  tsVoiceEnabled = !tsVoiceEnabled;
  tsUpdateControls();
  tsShowNotif(tsVoiceEnabled ? '🗣️ Voz ativa para avisos' : '🔕 Voz desativada','');
}

function tsSetSpeed(v){tsSpeedMult=parseFloat(v);}

function tsCycleWeather(){const ws=['sunny','rain','storm','fog','hot'];tsSetWeather(ws[(ws.indexOf(tsWeather)+1)%ws.length]);}
function tsSetWeather(w){
  tsWeather=w;
  ['sunny','rain','storm','fog','hot'].forEach(id=>{const b=document.getElementById('tw-'+id);if(b)b.className='ts-sm-btn'+(w===id?' ts-sm-on':'');});
  const tips={
    rain:'🌧 Pista molhada: dobre a distância de segurança. Reduza 25% da velocidade. Risco de aquaplanagem.',
    storm:'⛈ Tempestade: reduza 50% da velocidade, ligue faróis. Evite ultrapassagens.',
    fog:'🌫 Neblina: use farol de neblina (não alto!). Reduza muito a velocidade.',
    hot:'🌡 Calor extremo: pneus sobreaquecem, verifique pressão. Asfalto amolece.',
    sunny:'☀️ Condições normais. Atenção ao ofuscamento solar no amanhecer e entardecer.',
  };
  tsLog('🌤',tips[w],'info');tsUpdateBadges();tsUpdateAmbientSound();
}

function tsCycleTime(){const ts2=['dawn','day','dusk','night'];tsSetTime(ts2[(ts2.indexOf(tsTimeOfDay)+1)%ts2.length]);}
function tsSetTime(t){
  tsTimeOfDay=t;const hrs={dawn:5.5,day:10,dusk:18.5,night:22};tsSimHour=hrs[t];
  tsUpdateTimeButtons();
  const tips={
    dawn:'🌅 Amanhecer: faróis obrigatórios (Art. 230 CTB). Motoristas sonolentos. Alta taxa de acidentes.',
    day:'☀️ Dia claro: condições normais. Atenção ao horário de pico (07-09h e 17-19h).',
    dusk:'🌆 Entardecer: ofuscamento solar — reduza velocidade. Ligue faróis.',
    night:'🌙 Noite: FARÓIS OBRIGATÓRIOS (Art. 230). Visibilidade muito reduzida. Risco 3× maior.',
  };
  tsLog('🕐',tips[t],'info');tsUpdateBadges();tsUpdateAmbientSound();
}

function tsToggleChaos(){
  tsChaosMode=!tsChaosMode;
  const btn=document.getElementById('btn-chaos');
  if(btn)btn.className=`sim-ctrl-btn sim-ctrl-danger${tsChaosMode?' sim-ctrl-active':''}`;
  if(tsChaosMode){
    tsLog('💥','MODO CAOS ativado! Alta frequência de infrações simultâneas!','danger');
    tsShowNotif('💥 MODO CAOS: Infrações frequentes ativadas!','danger');
    tsSpeak('Modo caos ativado. Cuidado com infrações e acidentes.');
    setTimeout(()=>tsForceEvent('drunk'),400);
    setTimeout(()=>tsForceEvent('redlight'),900);
    setTimeout(()=>tsForceEvent('wrong_way'),1400);
  }else{
    tsLog('✅','Modo Caos desativado. Trânsito normalizado.','ok');
    tsShowNotif('✅ Trânsito normalizado.','');
    tsSpeak('Modo caos desativado. O tráfego está mais seguro.');
  }
}

function tsInitAudio(){
  if(tsAudioCtx) return;
  tsAudioCtx = new (window.AudioContext||window.webkitAudioContext)();
  const noiseBuffer = tsAudioCtx.createBuffer(1, tsAudioCtx.sampleRate * 2, tsAudioCtx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for(let i=0;i<data.length;i++) data[i] = Math.random() * 2 - 1;
  tsAmbientNoise = tsAudioCtx.createBufferSource();
  tsAmbientNoise.buffer = noiseBuffer;
  tsAmbientNoise.loop = true;
  const noiseFilter = tsAudioCtx.createBiquadFilter();
  noiseFilter.type = 'lowpass';
  noiseFilter.frequency.value = 1200;
  tsAmbientGain = tsAudioCtx.createGain();
  tsAmbientGain.gain.value = 0;
  noiseFilter.connect(tsAmbientGain).connect(tsAudioCtx.destination);
  tsAmbientNoise.connect(noiseFilter);
  tsAmbientNoise.start();

  tsAmbientHum = tsAudioCtx.createOscillator();
  const humGain = tsAudioCtx.createGain();
  tsAmbientHum.type = 'sine';
  tsAmbientHum.frequency.value = 64;
  humGain.gain.value = 0.02;
  tsAmbientHum.connect(humGain).connect(tsAmbientGain);
  tsAmbientHum.start();
}

function tsStartAmbient(){
  if(!tsAudioCtx) tsInitAudio();
  if(tsAudioCtx.state === 'suspended') tsAudioCtx.resume();
  tsUpdateAmbientSound();
}

function tsStopAmbient(){
  if(!tsAmbientGain) return;
  tsAmbientGain.gain.setTargetAtTime(0, tsAudioCtx.currentTime, 0.2);
}

function tsUpdateAmbientSound(){
  if(!tsAudioCtx||!tsAmbientGain) return;
  const base = tsAudioEnabled ? 0.05 + Math.min(0.12, tsVehicles.length * 0.002) : 0;
  const weatherBoost = tsWeather === 'rain' ? 0.06 : tsWeather === 'storm' ? 0.1 : 0;
  tsAmbientGain.gain.setTargetAtTime(base + weatherBoost, tsAudioCtx.currentTime, 0.15);
}

function tsSpeak(text){
  if(!tsVoiceEnabled || !window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'pt-BR';
  utter.rate = 0.9;
  utter.pitch = 1;
  window.speechSynthesis.speak(utter);
}

function tsForceEvent(type){
  const v=type==='drunk'? tsVehicles.find(v=>!v.drunk&&v.alive&&!v.isAmbulance):
          type==='redlight'? tsVehicles.find(v=>!v.redRunner&&v.alive&&!v.isAmbulance):
          type==='speed'? tsVehicles.find(v=>v.speederLvl==='none'&&v.alive&&!v.isAmbulance):
          type==='ped'? tsPedestrians.find(p=>!p.reckless&&p.alive):
          type==='park'? null:
          type==='wrong_way'? tsVehicles.find(v=>!v.wrongWay&&v.alive&&!v.isAmbulance):null;

  if(type==='drunk'&&v){
    v.drunk=true;v.speederLvl='none';v.color='#f43f5e';v.violator=true;
    tsApplyViolation(v,'DRUNK_DRIVING');
  }else if(type==='redlight'&&v){
    v.redRunner=true;v.violator=true;v.color='#ef4444';
    tsApplyViolation(v,'RED_LIGHT');
  }else if(type==='speed'&&v){
    v.speederLvl='heavy';v.violator=true;v.color='#ff6b35';
    tsApplyViolation(v,'SPEEDING_50');
  }else if(type==='ped'&&v){
    v.reckless=true;v.color='#f97316';
    tsLog('⚠️','Pedestre imprudente forçado na simulação!','warn');
  }else if(type==='park'){
    const pz=tsParkingZones.find(p=>p.forbidden);
    if(pz){
      const pv={
        x:pz.x+20,y:pz.y,dx:0,dy:0,speed:0,type:'car',label:'Carro',
        color:'#ef4444',origColor:'#ef4444',violator:true,
        stopped:true,parkTimer:320,alpha:1,alive:true,horiz:true,
        isAmbulance:false,drunk:false,wrongWay:false,
        speederLvl:'none',redRunner:false,noHelmet:false,noBelt:false,
        noLight:false,cellphone:false,
        hasFarol:false,wobble:0,wobblePhase:0,brakeLights:false,
        violations:[],points:0,lastViolation:null,violationFlash:0,
        plateNum:tsGenPlate(),id:Math.random(),
        _drunkLogged:false,beltLogged:false,helmetLogged:false,noLightLogged:false,
        cellphoneLogged:false,wrongWayLogged:false,schoolZoneLogged:false,speedBumpLogged:false,
        frontDist:999,frontVehicle:null,unsafeDistTimer:0,
      };
      tsVehicles.push(pv);
      tsApplyViolation(pv,'ILLEGAL_PARKING');
    }
  }else if(type==='wrong_way'&&v){
    v.wrongWay=true;v.dx=-v.dx;v.dy=-v.dy;v.angle=Math.atan2(v.dy,v.dx);v.violator=true;v.color='#ef4444';
    tsApplyViolation(v,'WRONG_WAY');
  }
  tsUpdateStats();
}
