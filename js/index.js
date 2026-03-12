// =====================================================
// CNH Brasil · app.js
// Todo o JavaScript lê os dados de data.json via fetch
// =====================================================

let DB = null;
let currentModuleId = null;
let currentLessonIdx = 0;
let quizStates = {};
let simState = {};

// ─────────────────────────────────────────────────────
// BOOT — carrega data.json antes de tudo
// ─────────────────────────────────────────────────────
async function boot() {
  try {
    const res = await fetch('database/data.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    DB = await res.json();
    renderModulesHome();
    renderPlacasGrid('todas');
    renderInfracoes();
    renderDirecaoCards();
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

  grid.innerHTML = DB.modules.map(mod => `
    <div class="module-card" onclick="openModule(${mod.id})">
      <div class="module-status status-${mod.status}">
        ${ mod.status === 'em-andamento' ? 'Em andamento' :
           mod.status === 'concluido'    ? 'Concluído'    : 'Não iniciado' }
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
  currentLessonIdx = 0;
  document.getElementById('modules-home').style.display = 'none';
  document.getElementById('module-content-area').style.display = 'block';
  renderLesson();
}

function goToLesson(idx) {
  const mod = DB.modules.find(m => m.id === currentModuleId);
  if (!mod || idx < 0 || idx >= mod.lessons.length) return;
  currentLessonIdx = idx;
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
}

// ─────────────────────────────────────────────────────
// CONSTRUIR CORPO DA AULA (a partir dos dados JSON)
// ─────────────────────────────────────────────────────
function buildLessonBody(lesson) {
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
  (lesson.concepts || []).forEach(c => {
    html += `<div class="concept-card">
      <div class="concept-title"><span style="font-size:1.1rem">${c.icon}</span> ${c.title}</div>
      <div class="concept-body">${c.body.replace(/\n/g, '<br>')}</div>
    </div>`;
  });

  // highlights/warns
  (lesson.highlights || []).forEach(h => {
    const cls = h.type === 'warn' ? 'warn-box' : h.type === 'info' ? 'info-box' : 'highlight-box';
    html += `<div class="${cls}">${h.text}</div>`;
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
function buildQuizHTML(lesson) {
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
  quizStates[id] = { questions, current: 0, score: 0, answered: false };
  renderQuizQuestion(id);
}

function renderQuizQuestion(id) {
  const state = quizStates[id];
  const el    = document.getElementById('quiz-body-' + id);
  if (!el || !state) return;

  if (state.current >= state.questions.length) {
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

  const fb = document.getElementById('qfb-' + id);
  fb.className = 'quiz-feedback show ' + (idx === q.correct ? 'ok' : 'err');
  fb.textContent = q.exp;
  document.getElementById('qnext-' + id).classList.add('show');
}

function nextQuiz(id) {
  quizStates[id].current++;
  renderQuizQuestion(id);
}

function restartQuiz(id) {
  quizStates[id] = { ...quizStates[id], current: 0, score: 0, answered: false };
  renderQuizQuestion(id);
}

// ─────────────────────────────────────────────────────
// SIMULADO
// ─────────────────────────────────────────────────────
function startSimulado() {
  simState = {
    current: 0, score: 0, answered: false,
    timeLeft: (DB.meta.simuladoMinutes || 45) * 60,
    timer: null
  };
  document.getElementById('sim-start-screen').style.display = 'none';
  document.getElementById('sim-quiz-area').style.display = 'block';
  renderSimQuestion();
  simState.timer = setInterval(() => {
    simState.timeLeft--;
    const el = document.getElementById('sim-timer-disp');
    if (el) {
      const m = Math.floor(simState.timeLeft / 60);
      const s = simState.timeLeft % 60;
      el.textContent = `${m}:${s.toString().padStart(2, '0')}`;
    }
    if (simState.timeLeft <= 0) endSimulado();
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
  renderSimQuestion();
}

function endSimulado() {
  clearInterval(simState.timer);
  const total    = DB.simulado.length;
  const pct      = Math.round(simState.score / total * 100);
  const approved = pct >= (DB.meta.passingScore || 70);

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
  document.querySelectorAll('#sec-placas .scenario-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderPlacasGrid(cat);
}

function showSignDetail(id) {
  const placa  = DB.placas.find(p => p.id === id);
  if (!placa) return;
  const detail = document.getElementById('placa-detail');
  document.getElementById('pd-title').textContent = placa.name;
  document.getElementById('pd-body').textContent  = placa.desc;
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