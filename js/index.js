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

// =====================================================
// SIMULADOR DE TRÂNSITO · CNH Brasil
// =====================================================

let tsCanvas, tsCtx, tsW, tsH;
let tsRunning = false;
let tsChaosMode = false;
let tsSpeedMult = 1;
let tsSimHour = 8;
let tsTimeOfDay = 'day';
let tsWeather = 'sunny';
let tsTotalViolations = 0;
let tsTotalAccidents = 0;
let tsRainDrops = [];
let tsLastT = 0;
let tsRafId = null;
let tsInited = false;
let tsSpawnTimer = 0;
let tsPedSpawnTimer = 0;

let tsVehicles = [], tsPedestrians = [], tsTrafficLights = [], tsParticles = [];
let tsRoads = { h: [], v: [], highway: null };
let tsIntersections = [], tsCrosswalks = [], tsParkingZones = [], tsLoadingZones = [];

const tsCtbTips = {
  redlight: '🔴 <b>Art. 208 CTB:</b> Avançar sinal vermelho — infração GRAVÍSSIMA: R$293,47 + 7 pts + retenção do veículo.',
  speed:    '💨 <b>Art. 218 CTB:</b> Excesso de velocidade acima de 50%: multa GRAVÍSSIMA ×3 = R$880,41 + 7 pts.',
  park:     '🅿 <b>Art. 181 CTB:</b> Estacionar em local proibido: multa MÉDIA R$130,16 + 4 pts + remoção do veículo.',
  drunk:    '🍺 <b>Lei Seca (Lei 12.760/12):</b> Tolerância ZERO. Multa R$2.934,70 + suspensão 12 meses. Crime a partir de 0,6 g/L.',
  ped:      '🚶 <b>Art. 214 CTB:</b> Não dar preferência ao pedestre na faixa: multa GRAVE R$195,23 + 5 pts.',
  nolight:  '💡 <b>Art. 230 CTB:</b> Trafegar sem farol aceso à noite: multa GRAVE R$195,23 + 5 pts.',
};

function tsR(a, b) { return a + Math.random() * (b - a); }
function tsRI(a, b) { return Math.floor(tsR(a, b + 1)); }
function tsDist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

// ── Init guard ─────────────────────────────────────
function tsInitIfNeeded() {
  if (tsInited) return;
  tsInited = true;
  tsCanvas = document.getElementById('ts-canvas');
  if (!tsCanvas) return;
  tsCtx = tsCanvas.getContext('2d');
  tsBuildLayout();
  tsInitRain();
  for (let i = 0; i < 8; i++) tsSpawnVehicle();
  for (let i = 0; i < 5; i++) tsSpawnPedestrian();
  tsRunning = true;
  tsLastT = 0;
  tsUpdateBadges();
  tsUpdateStats();
  tsLog('🚦', 'Simulador iniciado! Observe veículos, pedestres e semáforos.', 'info');
  tsLog('ℹ️', 'Use os controles para alterar clima, horário e forçar infrações.', 'info');
  requestAnimationFrame(tsFrame);
  window.addEventListener('resize', tsResize);
  tsResize();
}

function tsResize() {
  if (!tsCanvas) return;
  const wrap = tsCanvas.parentElement;
  tsW = tsCanvas.width  = wrap.clientWidth  || 800;
  tsH = tsCanvas.height = wrap.clientHeight || 500;
  tsBuildLayout();
  tsInitRain();
}

// ── Layout ─────────────────────────────────────────
function tsBuildLayout() {
  const W = tsW, H = tsH;
  tsRoads.h = [0.28, 0.55, 0.78].map(f => ({ y: H * f, laneW: 34, lanes: 2 }));
  tsRoads.v = [0.22, 0.5, 0.78].map(f => ({ x: W * f, laneW: 34, lanes: 2 }));
  tsRoads.highway = { x: W * 0.87, laneW: 38, lanes: 3 };

  tsIntersections = [];
  tsRoads.h.forEach(hr => {
    tsRoads.v.forEach(vr => {
      tsIntersections.push({ x: vr.x, y: hr.y });
    });
  });

  tsCrosswalks = [];
  tsIntersections.forEach(int => {
    tsCrosswalks.push({ x: int.x - 55, y: int.y, w: 34, h: 7, dir: 'h' });
    tsCrosswalks.push({ x: int.x, y: int.y - 55, w: 7, h: 34, dir: 'v' });
  });

  tsParkingZones = [
    { x: W*.22-75, y: H*.28-16, w: 75, h: 9, forbidden: true },
    { x: W*.5+38,  y: H*.55-16, w: 60, h: 9, forbidden: true },
    { x: W*.78-48, y: H*.78+7,  w: 48, h: 9, forbidden: true },
    { x: W*.22+18, y: H*.28+7,  w: 50, h: 9, forbidden: false },
  ];
  tsLoadingZones = [
    { x: W*.36, y: H*.28+7, w: 52, h: 9 },
    { x: W*.64, y: H*.55+7, w: 52, h: 9 },
  ];

  tsTrafficLights = tsIntersections.map((int, i) => ({
    x: int.x, y: int.y,
    phase: (i * 38) % 120,
    cycle: 120,
    state: 'green',
  }));
}

function tsInitRain() {
  tsRainDrops = Array.from({ length: 180 }, () => ({
    x: tsR(0, tsW), y: tsR(0, tsH),
    len: tsR(8, 18), spd: tsR(7, 14), alpha: tsR(.3, .65),
  }));
}

// ── Vehicles ───────────────────────────────────────
const TS_CAR_TYPES = [
  { type:'car',   colors:['#3b82f6','#6366f1','#0ea5e9','#22d3ee','#60a5fa','#e2e8f0','#fff'], speed:1.2 },
  { type:'moto',  colors:['#f59e0b','#fbbf24','#d97706'],                                       speed:1.7 },
  { type:'bus',   colors:['#8b5cf6','#7c3aed'],                                                 speed:0.75 },
  { type:'truck', colors:['#64748b','#475569','#94a3b8'],                                       speed:0.65 },
  { type:'taxi',  colors:['#fbbf24'],                                                            speed:1.1 },
];

function tsSpawnVehicle() {
  if (tsVehicles.length >= 30) return;
  const t = TS_CAR_TYPES[tsRI(0, TS_CAR_TYPES.length - 1)];
  const horiz = Math.random() > 0.5;
  let x, y, dx, dy, roadRef;
  if (horiz) {
    const r = tsRoads.h[tsRI(0, tsRoads.h.length - 1)];
    const dir = Math.random() > .5 ? 1 : -1;
    const lane = tsRI(0, 1);
    x = dir > 0 ? -50 : tsW + 50;
    y = r.y + (lane === 0 ? -r.laneW / 2 : r.laneW / 2);
    dx = dir; dy = 0; roadRef = r;
  } else {
    const r = tsRoads.v[tsRI(0, tsRoads.v.length - 1)];
    const dir = Math.random() > .5 ? 1 : -1;
    const lane = tsRI(0, 1);
    y = dir > 0 ? -50 : tsH + 50;
    x = r.x + (lane === 0 ? -r.laneW / 2 : r.laneW / 2);
    dx = 0; dy = dir; roadRef = r;
  }
  const wm = tsWeather === 'rain' ? .75 : tsWeather === 'storm' ? .55 : tsWeather === 'fog' ? .7 : 1;
  const isV = tsChaosMode ? Math.random() < .45 : Math.random() < .09;
  const color = t.colors[tsRI(0, t.colors.length - 1)];
  tsVehicles.push({
    x, y, dx, dy, speed: t.speed * wm, type: t.type,
    color: isV ? '#ef4444' : color, origColor: color,
    violator: isV, redLightRunner: isV && Math.random() < .5,
    speeder: isV && Math.random() < .45,
    hasFarol: (tsTimeOfDay === 'night' || tsTimeOfDay === 'dawn') ? Math.random() > .1 : false,
    noFarolV: false, stopped: false, parkTimer: 0,
    alpha: 1, alive: true, horiz, roadRef, id: Math.random(),
    hasFlash: false, flashTimer: 0, drunk: false, wobble: 0,
    brakeLights: false,
  });
}

function tsSpawnPedestrian() {
  if (tsPedestrians.length >= 16) return;
  const isR = tsChaosMode ? Math.random() < .5 : Math.random() < .1;
  const cw = tsCrosswalks[tsRI(0, tsCrosswalks.length - 1)];
  const side = Math.random() > .5 ? 1 : -1;
  let x, y, dx, dy;
  if (cw.dir === 'h') {
    x = cw.x + tsR(0, cw.w); y = cw.y + side * 60; dx = 0; dy = -side * .6;
  } else {
    y = cw.y + tsR(0, cw.h); x = cw.x + side * 60; dx = -side * .6; dy = 0;
  }
  const colors = isR ? ['#f97316','#ef4444'] : ['#22c55e','#4ade80','#86efac'];
  tsPedestrians.push({
    x, y, dx, dy, r: 5, color: colors[tsRI(0, colors.length - 1)],
    reckless: isR, crossing: false, alive: true, alpha: 1, id: Math.random(),
    dstX: cw.x + (cw.dir === 'h' ? tsR(0, cw.w) : 0),
    dstY: cw.y + (cw.dir === 'v' ? tsR(0, cw.h) : 0),
    crosswalk: cw, phase: 'approach',
  });
}

// ── Particles ──────────────────────────────────────
function tsSpawnParticle(x, y, type) {
  const count = type === 'crash' ? 18 : 4;
  for (let i = 0; i < count; i++) {
    const a = tsR(0, Math.PI * 2), s = type === 'crash' ? tsR(2, 5) : tsR(.5, 2);
    tsParticles.push({
      x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s,
      r: type === 'crash' ? tsR(3, 7) : tsR(1, 3),
      color: type === 'crash' ? (Math.random() > .5 ? '#ef4444' : '#fbbf24') : '#00e5ff',
      life: 1, decay: type === 'crash' ? tsR(.015, .03) : tsR(.025, .05), alive: true,
    });
  }
}

// ── Draw ───────────────────────────────────────────
function tsDrawGround() {
  const gc = tsTimeOfDay === 'night' ? '#070d04' : tsTimeOfDay === 'dusk' ? '#120e04' : '#152008';
  tsCtx.fillStyle = gc;
  tsCtx.fillRect(0, 0, tsW, tsH);
}

function tsDrawRoads() {
  const W = tsW, H = tsH;
  const wet = tsWeather === 'rain' || tsWeather === 'storm';
  const asp = tsTimeOfDay === 'night' ? (wet ? '#1a2530' : '#181818') : (wet ? '#1e2a35' : '#282828');

  const drawH = (r) => {
    const rw = r.laneW * r.lanes * 2;
    tsCtx.fillStyle = asp;
    tsCtx.fillRect(0, r.y - rw/2, W, rw);
    tsCtx.setLineDash([16, 11]);
    tsCtx.strokeStyle = '#fbbf2455';
    tsCtx.lineWidth = 1.5;
    tsCtx.beginPath(); tsCtx.moveTo(0, r.y); tsCtx.lineTo(W, r.y); tsCtx.stroke();
    tsCtx.setLineDash([]);
    tsCtx.strokeStyle = '#ffffff28'; tsCtx.lineWidth = 1;
    tsCtx.beginPath(); tsCtx.moveTo(0, r.y-rw/2); tsCtx.lineTo(W, r.y-rw/2); tsCtx.stroke();
    tsCtx.beginPath(); tsCtx.moveTo(0, r.y+rw/2); tsCtx.lineTo(W, r.y+rw/2); tsCtx.stroke();
  };
  const drawV = (r) => {
    const rw = r.laneW * r.lanes * 2;
    tsCtx.fillStyle = asp;
    tsCtx.fillRect(r.x - rw/2, 0, rw, H);
    tsCtx.setLineDash([16, 11]);
    tsCtx.strokeStyle = '#fbbf2455';
    tsCtx.lineWidth = 1.5;
    tsCtx.beginPath(); tsCtx.moveTo(r.x, 0); tsCtx.lineTo(r.x, H); tsCtx.stroke();
    tsCtx.setLineDash([]);
    tsCtx.strokeStyle = '#ffffff28'; tsCtx.lineWidth = 1;
    tsCtx.beginPath(); tsCtx.moveTo(r.x-rw/2, 0); tsCtx.lineTo(r.x-rw/2, H); tsCtx.stroke();
    tsCtx.beginPath(); tsCtx.moveTo(r.x+rw/2, 0); tsCtx.lineTo(r.x+rw/2, H); tsCtx.stroke();
  };

  tsRoads.h.forEach(drawH);
  tsRoads.v.forEach(drawV);

  // Highway
  const hw = tsRoads.highway;
  const hwW = hw.laneW * hw.lanes * 2;
  tsCtx.fillStyle = tsTimeOfDay === 'night' ? '#111' : '#222';
  tsCtx.fillRect(hw.x - hwW/2, 0, hwW, H);
  tsCtx.strokeStyle = '#fff4';
  tsCtx.lineWidth = 1.5;
  tsCtx.setLineDash([]);
  tsCtx.beginPath(); tsCtx.moveTo(hw.x - hwW/2, 0); tsCtx.lineTo(hw.x - hwW/2, H); tsCtx.stroke();
  tsCtx.beginPath(); tsCtx.moveTo(hw.x + hwW/2, 0); tsCtx.lineTo(hw.x + hwW/2, H); tsCtx.stroke();
  tsCtx.setLineDash([22, 13]);
  tsCtx.strokeStyle = '#fff3'; tsCtx.lineWidth = 1.2;
  [-hw.laneW/2, hw.laneW/2].forEach(off => {
    tsCtx.beginPath(); tsCtx.moveTo(hw.x+off, 0); tsCtx.lineTo(hw.x+off, H); tsCtx.stroke();
  });
  tsCtx.setLineDash([]);
  // Speed signs
  tsDrawSpeedSign(hw.x + 28, H * .12, '110');
  tsDrawSpeedSign(hw.x + 28, H * .62, '110');
}

function tsDrawSpeedSign(x, y, spd) {
  tsCtx.save();
  tsCtx.fillStyle = '#fff'; tsCtx.strokeStyle = '#cc0000'; tsCtx.lineWidth = 2.5;
  tsCtx.beginPath(); tsCtx.arc(x, y, 13, 0, Math.PI*2); tsCtx.fill(); tsCtx.stroke();
  tsCtx.fillStyle = '#111'; tsCtx.font = 'bold 8px DM Sans, sans-serif';
  tsCtx.textAlign = 'center'; tsCtx.textBaseline = 'middle';
  tsCtx.fillText(spd, x, y);
  tsCtx.restore();
}

function tsDrawCrosswalks() {
  tsCtx.fillStyle = '#fbbf24';
  tsCrosswalks.forEach(cw => {
    const n = cw.dir === 'h' ? 4 : 4;
    const sw = cw.dir === 'h' ? cw.w / n : 6;
    const sh = cw.dir === 'h' ? 6 : cw.h / n;
    for (let i = 0; i < n; i += 2) {
      tsCtx.fillRect(
        cw.x + (cw.dir === 'h' ? i * sw : 0),
        cw.y + (cw.dir === 'v' ? i * sh : 0),
        sw, sh
      );
    }
  });
}

function tsDrawZones() {
  tsParkingZones.forEach(pz => {
    tsCtx.fillStyle = pz.forbidden ? 'rgba(239,68,68,.3)' : 'rgba(34,197,94,.18)';
    tsCtx.fillRect(pz.x, pz.y, pz.w, pz.h);
    if (pz.forbidden) {
      tsCtx.strokeStyle = '#ef4444'; tsCtx.lineWidth = 1.2;
      tsCtx.setLineDash([3,3]); tsCtx.strokeRect(pz.x, pz.y, pz.w, pz.h); tsCtx.setLineDash([]);
      tsCtx.fillStyle = '#ef4444'; tsCtx.font = 'bold 7px DM Mono, monospace';
      tsCtx.textAlign = 'left'; tsCtx.fillText('⛔ PROIBIDO', pz.x, pz.y - 2);
    }
  });
  tsLoadingZones.forEach(lz => {
    tsCtx.fillStyle = 'rgba(168,255,62,.22)';
    tsCtx.fillRect(lz.x, lz.y, lz.w, lz.h);
    tsCtx.strokeStyle = '#a8ff3e'; tsCtx.lineWidth = 1.2;
    tsCtx.setLineDash([3,3]); tsCtx.strokeRect(lz.x, lz.y, lz.w, lz.h); tsCtx.setLineDash([]);
    tsCtx.fillStyle = '#a8ff3e'; tsCtx.font = 'bold 7px DM Mono, monospace';
    tsCtx.textAlign = 'left'; tsCtx.fillText('📦 CARGA', lz.x, lz.y - 2);
  });
}

function tsDrawTrafficLights() {
  tsTrafficLights.forEach(tl => {
    const sz = 9;
    tsCtx.fillStyle = '#1a1a1a';
    tsCtx.fillRect(tl.x - sz/2 - 2, tl.y - sz*3 - 3, sz+4, sz*3+3);
    const colMap = {
      green:  ['#333','#333','#22c55e'],
      yellow: ['#333','#fbbf24','#333'],
      red:    ['#ef4444','#333','#333'],
    };
    colMap[tl.state].forEach((c, i) => {
      if (c !== '#333') { tsCtx.shadowColor = c; tsCtx.shadowBlur = 10; }
      tsCtx.fillStyle = c;
      tsCtx.beginPath();
      tsCtx.arc(tl.x, tl.y - sz*(2-i) - 2, sz/2, 0, Math.PI*2);
      tsCtx.fill();
      tsCtx.shadowBlur = 0;
    });
    // Night halo
    if (tsTimeOfDay === 'night' || tsTimeOfDay === 'dawn') {
      const hc = tl.state === 'green' ? '#22c55e' : tl.state === 'yellow' ? '#fbbf24' : '#ef4444';
      const grd = tsCtx.createRadialGradient(tl.x, tl.y - sz, 0, tl.x, tl.y - sz, 45);
      grd.addColorStop(0, hc+'44'); grd.addColorStop(1, 'transparent');
      tsCtx.fillStyle = grd; tsCtx.fillRect(tl.x-45, tl.y-sz*3, 90, sz*3+45);
    }
  });
}

function tsDrawBuildings() {
  const W = tsW, H = tsH;
  const bldgs = [
    {x:8, y:H*.06, w:55, h:75, c:'#1e293b'},{x:70, y:H*.06, w:40, h:55, c:'#172036'},
    {x:W*.3+70, y:H*.04, w:65, h:85, c:'#1a2840'},{x:W*.6+70, y:H*.04, w:50, h:65, c:'#1e2d3d'},
    {x:8, y:H*.84, w:55, h:45, c:'#1e293b'},{x:70, y:H*.84, w:45, h:65, c:'#172036'},
    {x:W*.55, y:H*.84, w:75, h:50, c:'#1a2840'},
  ];
  bldgs.forEach(b => {
    tsCtx.fillStyle = b.c; tsCtx.fillRect(b.x, b.y, b.w, b.h);
    const wc = tsTimeOfDay === 'night' ? '#fbbf2460' : '#ffffff18';
    tsCtx.fillStyle = wc;
    for (let r=0; r<Math.floor(b.h/11); r++) {
      for (let c=0; c<Math.floor(b.w/13); c++) {
        if (Math.random() > (tsTimeOfDay==='night'?.35:.65))
          tsCtx.fillRect(b.x+4+c*13, b.y+4+r*11, 7, 5);
      }
    }
  });
}

function tsDrawVehicle(v) {
  if (!v.alive) return;
  tsCtx.save();
  tsCtx.globalAlpha = v.alpha;
  tsCtx.translate(v.x, v.y);
  const angle = v.horiz ? (v.dx>0?0:Math.PI) : (v.dy>0?Math.PI/2:-Math.PI/2);
  tsCtx.rotate(angle + (v.drunk ? Math.sin(Date.now()*.008)*.12 : 0));

  const cw = v.type==='moto'?8 : (v.type==='bus'||v.type==='truck')?24:18;
  const ch = v.type==='moto'?18 : v.type==='bus'?50 : v.type==='truck'?44:32;

  tsCtx.shadowColor = 'rgba(0,0,0,.5)'; tsCtx.shadowBlur = 6; tsCtx.shadowOffsetY = 3;
  tsCtx.fillStyle = v.color;
  tsCtx.beginPath(); tsCtx.roundRect(-cw/2,-ch/2,cw,ch,v.type==='moto'?2:4); tsCtx.fill();
  tsCtx.shadowBlur = 0; tsCtx.shadowOffsetY = 0;

  if (v.type==='car'||v.type==='taxi') {
    tsCtx.fillStyle='rgba(147,210,255,.55)';
    tsCtx.fillRect(-cw/2+2,-ch/2+4,cw-4,ch*.34);
    tsCtx.fillStyle='rgba(147,210,255,.38)';
    tsCtx.fillRect(-cw/2+2,ch/2-ch*.24,cw-4,ch*.2);
    if (tsTimeOfDay==='night'||tsTimeOfDay==='dawn'||v.hasFarol) {
      tsCtx.fillStyle='#ffffcc'; tsCtx.shadowColor='#ffff99'; tsCtx.shadowBlur=14;
      tsCtx.fillRect(-cw/2+1,-ch/2+1,4,3); tsCtx.fillRect(cw/2-5,-ch/2+1,4,3);
      tsCtx.shadowBlur=0;
    }
    if (v.brakeLights||v.stopped) {
      tsCtx.fillStyle='#ff1f00'; tsCtx.shadowColor='#ff1f00'; tsCtx.shadowBlur=9;
      tsCtx.fillRect(-cw/2+1,ch/2-4,4,3); tsCtx.fillRect(cw/2-5,ch/2-4,4,3);
      tsCtx.shadowBlur=0;
    }
  } else if (v.type==='bus') {
    for(let i=0;i<5;i++){tsCtx.fillStyle='rgba(147,210,255,.45)';tsCtx.fillRect(-cw/2+3,-ch/2+7+i*8,cw-6,5);}
  }
  if (v.hasFlash) {
    tsCtx.fillStyle=`rgba(255,50,50,${.45+Math.sin(Date.now()*.02)*.45})`;
    tsCtx.beginPath(); tsCtx.arc(0,0,cw,0,Math.PI*2); tsCtx.fill();
  }
  if (v.drunk) {
    tsCtx.strokeStyle='#f43f5e'; tsCtx.lineWidth=2; tsCtx.setLineDash([3,3]);
    tsCtx.strokeRect(-cw/2-3,-ch/2-3,cw+6,ch+6); tsCtx.setLineDash([]);
  }
  tsCtx.restore();
}

function tsDrawPedestrian(p) {
  if (!p.alive) return;
  tsCtx.save(); tsCtx.globalAlpha = p.alpha;
  tsCtx.fillStyle='rgba(0,0,0,.25)';
  tsCtx.beginPath(); tsCtx.ellipse(p.x,p.y+p.r+2,p.r*.85,2.5,0,0,Math.PI*2); tsCtx.fill();
  tsCtx.fillStyle=p.color; tsCtx.shadowColor=p.color; tsCtx.shadowBlur=p.reckless?8:4;
  tsCtx.beginPath(); tsCtx.arc(p.x,p.y,p.r,0,Math.PI*2); tsCtx.fill();
  tsCtx.shadowBlur=0;
  tsCtx.fillStyle='#fde68a'; tsCtx.beginPath(); tsCtx.arc(p.x,p.y-p.r*1.4,p.r*.65,0,Math.PI*2); tsCtx.fill();
  if (p.reckless) {
    tsCtx.font='8px serif'; tsCtx.fillStyle='#f97316'; tsCtx.textAlign='center';
    tsCtx.fillText('⚠', p.x, p.y - p.r*2.5);
  }
  tsCtx.restore();
}

function tsDrawParticles() {
  tsParticles.forEach(p => {
    if (!p.alive) return;
    tsCtx.save(); tsCtx.globalAlpha=p.life;
    tsCtx.fillStyle=p.color; tsCtx.shadowColor=p.color; tsCtx.shadowBlur=5;
    tsCtx.beginPath(); tsCtx.arc(p.x,p.y,p.r,0,Math.PI*2); tsCtx.fill();
    tsCtx.restore();
  });
}

function tsDrawRain() {
  if (tsWeather!=='rain'&&tsWeather!=='storm') return;
  const inten = tsWeather==='storm'?1.7:1;
  tsCtx.save(); tsCtx.strokeStyle=`rgba(174,214,241,${tsWeather==='storm'?.5:.38})`; tsCtx.lineWidth=1;
  tsRainDrops.forEach(d => {
    tsCtx.beginPath(); tsCtx.moveTo(d.x,d.y); tsCtx.lineTo(d.x-2*inten,d.y+d.len*inten); tsCtx.stroke();
  });
  tsCtx.restore();
}

function tsDrawFog() {
  if (tsWeather!=='fog') return;
  tsCtx.fillStyle='rgba(195,205,215,.22)'; tsCtx.fillRect(0,0,tsW,tsH);
  const t = Date.now()/4000;
  for(let i=0;i<4;i++){
    const fx=((t*28+i*tsW/4)%(tsW+180))-90, fy=tsH*(.25+i*.16);
    const gr=tsCtx.createRadialGradient(fx,fy,0,fx,fy,110);
    gr.addColorStop(0,'rgba(205,215,225,.22)'); gr.addColorStop(1,'transparent');
    tsCtx.fillStyle=gr; tsCtx.fillRect(fx-110,fy-55,220,110);
  }
}

function tsDrawHeat() {
  if (tsWeather!=='hot') return;
  const t=Date.now()/500;
  tsCtx.save(); tsCtx.globalAlpha=.035;
  for(let i=0;i<4;i++){
    const y=tsH*(.3+i*.15)+Math.sin(t+i)*3;
    const gr=tsCtx.createLinearGradient(0,y,0,y+14);
    gr.addColorStop(0,'rgba(255,200,50,.55)'); gr.addColorStop(1,'transparent');
    tsCtx.fillStyle=gr; tsCtx.fillRect(0,y,tsW,14);
  }
  tsCtx.restore();
}

function tsDrawNight() {
  if (tsTimeOfDay==='day') return;
  const a={dawn:.22, dusk:.42, night:.7}[tsTimeOfDay]||0;
  tsCtx.fillStyle=`rgba(5,10,25,${a})`; tsCtx.fillRect(0,0,tsW,tsH);
  if (tsTimeOfDay==='night'||tsTimeOfDay==='dawn') {
    tsRoads.h.forEach(r=>{
      [tsW*.22,tsW*.5,tsW*.78].forEach(sx=>{
        const grd=tsCtx.createRadialGradient(sx,r.y-35,0,sx,r.y,70);
        grd.addColorStop(0,'rgba(255,240,180,.18)'); grd.addColorStop(1,'transparent');
        tsCtx.fillStyle=grd; tsCtx.fillRect(sx-70,r.y-40,140,80);
      });
    });
  }
}

// ── Update logic ───────────────────────────────────
function tsUpdateTL(dt) {
  tsTrafficLights.forEach(tl => {
    tl.phase = (tl.phase + dt * tsSpeedMult * 28) % tl.cycle;
    const p = tl.phase / tl.cycle;
    tl.state = p < .55 ? 'green' : p < .65 ? 'yellow' : 'red';
  });
}

function tsUpdateVehicles(dt) {
  const base = 58;
  tsVehicles.forEach(v => {
    if (!v.alive) return;
    if (v.stopped && v.parkTimer > 0) { v.parkTimer -= dt * tsSpeedMult * 60; if (v.parkTimer<=0) v.alive=false; return; }

    let shouldStop = false;
    tsTrafficLights.forEach(tl => {
      if (tl.state==='red') {
        const d = tsDist(v, tl);
        if (d<55&&d>18) {
          if (!v.redLightRunner) shouldStop=true;
          else if (Math.random()<.002) {
            tsTotalViolations++; tsLog('🔴','Motorista avançou o sinal vermelho!','danger'); tsSetCtbTip('redlight');
          }
        }
      }
    });
    v.brakeLights=shouldStop; v.stopped=shouldStop;
    if (!v.stopped) {
      const wm=tsWeather==='rain'?.75:tsWeather==='storm'?.55:tsWeather==='fog'?.7:1;
      const sp=v.speed*base*wm*(v.speeder?2.2:1)*tsSpeedMult;
      v.x+=v.dx*sp*dt; v.y+=v.dy*sp*dt;
      if (v.drunk) { v.wobble+=dt*2; v.y+=Math.sin(v.wobble)*1.2*tsSpeedMult; }
    }
    if (!v.noFarolV&&(tsTimeOfDay==='night'||tsTimeOfDay==='dawn')&&!v.hasFarol&&Math.random()<.001) {
      v.noFarolV=true; tsTotalViolations++; tsLog('💡','Veículo sem farol à noite!','warn'); tsSetCtbTip('nolight');
    }
    if (v.speeder&&Math.random()<.04) tsSpawnParticle(v.x,v.y,'smoke');
    if (v.x<-120||v.x>tsW+120||v.y<-120||v.y>tsH+120) v.alive=false;

    // Check pedestrian collision
    tsPedestrians.forEach(p=>{
      if (!p.alive||!p.crossing) return;
      if (tsDist(v,p)<24&&!v.stopped) {
        tsTotalAccidents++; tsTotalViolations++;
        tsLog('💥',`Acidente! ${v.type} atingiu pedestre na faixa!`,'danger');
        tsSpawnParticle(p.x,p.y,'crash'); p.alive=false;
        v.hasFlash=true; v.flashTimer=120;
        tsShowNotif('💥 ACIDENTE! Motorista não respeitou o pedestre!','danger');
        tsSetCtbTip('ped'); tsUpdateStats();
      }
    });
    if (v.flashTimer>0){v.flashTimer-=dt*60; if(v.flashTimer<=0)v.hasFlash=false;}
  });
  tsVehicles=tsVehicles.filter(v=>v.alive);
}

function tsUpdatePedestrians(dt) {
  tsPedestrians.forEach(p=>{
    if (!p.alive) return;
    const cw=p.crosswalk;
    if (p.phase==='approach') {
      const tx=cw.dir==='h'?p.dstX:cw.x, ty=cw.dir==='v'?p.dstY:cw.y;
      const ddx=tx-p.x,ddy=ty-p.y,d=Math.hypot(ddx,ddy);
      if (d<8) { p.phase=p.reckless?'cross':'wait'; }
      else { const sp=38*tsSpeedMult; p.x+=ddx/d*sp*dt; p.y+=ddy/d*sp*dt; }
    } else if (p.phase==='wait') {
      const nl=tsTrafficLights.reduce((b,tl)=>tsDist(tl,cw)<tsDist(b,cw)?tl:b,tsTrafficLights[0]);
      if (nl&&nl.state==='green') { p.phase='cross'; p.crossing=true; tsLog('🚶','Pedestre atravessando com sinal aberto.','ok'); }
      if (p.reckless&&nl&&nl.state!=='green'&&Math.random()<.007) {
        p.phase='cross'; p.crossing=true; tsTotalViolations++;
        tsLog('⚠️','Pedestre imprudente atravessou no sinal fechado!','warn'); tsSetCtbTip('ped');
      }
    } else if (p.phase==='cross') {
      const sp=33*tsSpeedMult; p.x+=p.dx*sp*dt; p.y+=p.dy*sp*dt; p.crossing=true;
      const dx2=cw.dir==='h'?p.dstX:cw.x+(p.dx>0?60:-60);
      const dy2=cw.dir==='v'?p.dstY:cw.y+(p.dy>0?60:-60);
      if (Math.abs(p.x-dx2)<8&&Math.abs(p.y-dy2)<8) { p.phase='depart'; p.crossing=false; }
    } else if (p.phase==='depart') {
      p.alpha-=dt*tsSpeedMult*.8; if(p.alpha<=0) p.alive=false;
    }
  });
  tsPedestrians=tsPedestrians.filter(p=>p.alive);
}

function tsUpdateParticles(dt) {
  tsParticles.forEach(p=>{
    p.x+=p.vx*tsSpeedMult; p.y+=p.vy*tsSpeedMult; p.vy+=.05*tsSpeedMult;
    p.life-=p.decay*tsSpeedMult; if(p.life<=0)p.alive=false;
  });
  tsParticles=tsParticles.filter(p=>p.alive);
}

function tsUpdateRain(dt) {
  tsRainDrops.forEach(d=>{
    d.y+=d.spd*tsSpeedMult; d.x-=.5*tsSpeedMult;
    if(d.y>tsH){d.y=tsR(-20,0);d.x=tsR(0,tsW);}
  });
}

function tsUpdateTime(dt) {
  tsSimHour += dt * tsSpeedMult * (1/60);
  if (tsSimHour >= 24) tsSimHour -= 24;
  if (tsSimHour>=5&&tsSimHour<7) tsTimeOfDay='dawn';
  else if (tsSimHour>=7&&tsSimHour<18) tsTimeOfDay='day';
  else if (tsSimHour>=18&&tsSimHour<20) tsTimeOfDay='dusk';
  else tsTimeOfDay='night';
  tsUpdateBadges();
  tsUpdateTimeButtons();
}

// ── Main loop ──────────────────────────────────────
function tsFrame(ts) {
  if (!tsLastT) tsLastT = ts;
  const dt = Math.min((ts - tsLastT) / 1000, .05);
  tsLastT = ts;

  if (tsRunning) {
    tsSpawnTimer += dt * tsSpeedMult;
    tsPedSpawnTimer += dt * tsSpeedMult;
    if (tsSpawnTimer > (tsChaosMode?.7:1.4)) { tsSpawnVehicle(); tsSpawnTimer=0; }
    if (tsPedSpawnTimer > (tsChaosMode?1.4:2.4)) { tsSpawnPedestrian(); tsPedSpawnTimer=0; }
    tsUpdateTL(dt);
    tsUpdateVehicles(dt);
    tsUpdatePedestrians(dt);
    tsUpdateParticles(dt);
    tsUpdateRain(dt);
    tsUpdateTime(dt);
    if (Math.random()<.012*tsSpeedMult) tsUpdateStats();
  }

  tsCtx.clearRect(0, 0, tsW, tsH);
  tsDrawGround();
  tsDrawBuildings();
  tsDrawRoads();
  tsDrawCrosswalks();
  tsDrawZones();
  tsDrawTrafficLights();
  tsVehicles.forEach(tsDrawVehicle);
  tsPedestrians.forEach(tsDrawPedestrian);
  tsDrawParticles();
  tsDrawRain();
  tsDrawFog();
  tsDrawHeat();
  tsDrawNight();

  tsRafId = requestAnimationFrame(tsFrame);
}

// ── UI helpers ─────────────────────────────────────
function tsLog(icon, text, sev) {
  const log = document.getElementById('ts-event-log');
  if (!log) return;
  const hh=String(Math.floor(tsSimHour)).padStart(2,'0');
  const mm=String(Math.floor((tsSimHour%1)*60)).padStart(2,'0');
  const cls=sev==='danger'?'ts-ev-danger':sev==='warn'?'ts-ev-warn':sev==='ok'?'ts-ev-ok':'ts-ev-info';
  const div=document.createElement('div');
  div.className=`ts-ev-item ${cls}`;
  div.innerHTML=`<span class="ts-ev-icon">${icon}</span><span class="ts-ev-time">${hh}:${mm}</span><span>${text}</span>`;
  log.prepend(div);
  while(log.children.length>28) log.removeChild(log.lastChild);
}

function tsSetCtbTip(type) {
  const el=document.getElementById('ts-ctb-tip');
  if(el) el.innerHTML=tsCtbTips[type]||'';
}

function tsShowNotif(msg, cls='') {
  const n=document.getElementById('ts-notif');
  if(!n) return;
  n.textContent=msg; n.className=`ts-notif ts-notif-show${cls?' ts-notif-'+cls:''}`;
  clearTimeout(window._tsNotifT);
  window._tsNotifT=setTimeout(()=>n.className='ts-notif',3000);
}

function tsUpdateStats() {
  const sv=document.getElementById('ts-s-vehicles');
  const sp=document.getElementById('ts-s-pedestrians');
  const sv2=document.getElementById('ts-s-violations');
  const sa=document.getElementById('ts-s-accidents');
  if(sv) sv.textContent=tsVehicles.filter(v=>v.alive).length;
  if(sp) sp.textContent=tsPedestrians.filter(p=>p.alive).length;
  if(sv2) sv2.textContent=tsTotalViolations;
  if(sa) sa.textContent=tsTotalAccidents;
}

function tsUpdateBadges() {
  const tb=document.getElementById('ts-time-badge');
  const wb=document.getElementById('ts-weather-badge');
  if(!tb||!wb) return;
  const hh=String(Math.floor(tsSimHour)).padStart(2,'0');
  const mm=String(Math.floor((tsSimHour%1)*60)).padStart(2,'0');
  const te={dawn:'🌅',day:'☀️',dusk:'🌆',night:'🌙'}[tsTimeOfDay];
  tb.textContent=`${te} ${hh}:${mm}`;
  wb.textContent={
    sunny:'☀️ Ensolarado · 28°C',hot:'🌡️ Calor Extremo · 38°C',
    rain:'🌧️ Chuva · 18°C · Pista Molhada',storm:'⛈️ Tempestade · 14°C',
    fog:'🌫️ Neblina · 16°C · Visib. Reduzida'
  }[tsWeather];
}

function tsUpdateTimeButtons() {
  ['dawn','day','dusk','night'].forEach(t=>{
    const b=document.getElementById('tt-'+t);
    if(b) b.className='ts-sm-btn'+(tsTimeOfDay===t?' ts-sm-on':'');
  });
}

// ── Public controls (called from HTML) ─────────────
function tsTogglePlay() {
  tsRunning=!tsRunning;
  const btn=document.getElementById('btn-play');
  if(btn){btn.textContent=tsRunning?'⏸ Pausar':'▶ Continuar';btn.className=tsRunning?'sim-ctrl-btn sim-ctrl-active':'sim-ctrl-btn';}
}

function tsSetSpeed(v) { tsSpeedMult=parseFloat(v); }

function tsCycleWeather() {
  const ws=['sunny','rain','storm','fog','hot'];
  tsSetWeather(ws[(ws.indexOf(tsWeather)+1)%ws.length]);
}

function tsSetWeather(w) {
  tsWeather=w;
  ['sunny','rain','storm','fog','hot'].forEach(id=>{
    const b=document.getElementById('tw-'+id);
    if(b) b.className='ts-sm-btn'+(w===id?' ts-sm-on':'');
  });
  const tips={
    rain:'🌧 Pista molhada! Dobre a distância de segurança. Risco de aquaplanagem.',
    storm:'⛈ Tempestade! Reduza velocidade, ligue faróis. Evite ultrapassagens.',
    fog:'🌫 Neblina! Use farol de neblina. Reduza muito a velocidade.',
    hot:'🌡 Calor extremo: pneus sobreaquecem, asfalto derrete. Cuide da pressão.',
    sunny:'☀️ Condições normais. Atenção ao ofuscamento solar no horizonte.',
  };
  tsLog('🌤',tips[w]||'','info'); tsUpdateBadges();
}

function tsCycleTime() {
  const ts2=['dawn','day','dusk','night'];
  tsSetTime(ts2[(ts2.indexOf(tsTimeOfDay)+1)%ts2.length]);
}

function tsSetTime(t) {
  tsTimeOfDay=t;
  const hrs={dawn:5.5,day:10,dusk:18.5,night:22};
  tsSimHour=hrs[t];
  tsUpdateTimeButtons();
  const tips={
    dawn:'🌅 Amanhecer: visibilidade reduzida. Use faróis baixos. Risco de motoristas sonolentos.',
    day:'☀️ Dia claro: condições normais. Atenção nos horários de pico.',
    dusk:'🌆 Entardecer: sol no horizonte cria ofuscamento. Reduza a velocidade.',
    night:'🌙 Noite: use faróis obrigatoriamente. Visibilidade muito reduzida.',
  };
  tsLog('🕐',tips[t],'info'); tsUpdateBadges();
}

function tsToggleChaos() {
  tsChaosMode=!tsChaosMode;
  const btn=document.getElementById('btn-chaos');
  if(btn) btn.className=`sim-ctrl-btn sim-ctrl-danger${tsChaosMode?' sim-ctrl-active':''}`;
  if(tsChaosMode){
    tsLog('💥','Modo Caos ativado! Múltiplas infrações!','danger');
    tsShowNotif('💥 MODO CAOS: Infrações frequentes ativadas!','danger');
  } else {
    tsLog('✅','Modo Caos desativado. Trânsito normalizado.','ok');
    tsShowNotif('✅ Trânsito normalizado.','');
  }
}

function tsForceEvent(type) {
  if (type==='redlight') {
    const v=tsVehicles.find(v=>!v.redLightRunner&&v.alive);
    if(v){v.redLightRunner=true;v.violator=true;v.color='#ef4444';}
    tsTotalViolations++; tsLog('🔴','Motorista avançou o sinal vermelho!','danger'); tsSetCtbTip('redlight');
  } else if (type==='speed') {
    const v=tsVehicles.find(v=>!v.speeder&&v.alive);
    if(v){v.speeder=true;v.speed*=2.5;v.violator=true;v.color='#ff6b35';}
    tsTotalViolations++; tsLog('💨','Veículo em excesso de velocidade!','danger'); tsSetCtbTip('speed');
  } else if (type==='ped') {
    const p=tsPedestrians.find(p=>!p.reckless&&p.alive);
    if(p){p.reckless=true;p.color='#f97316';}
    tsTotalViolations++; tsLog('🚶','Pedestre imprudente atravessou fora da faixa!','warn'); tsSetCtbTip('ped');
  } else if (type==='park') {
    const pz=tsParkingZones.find(p=>p.forbidden);
    if(pz){
      tsVehicles.push({x:pz.x+20,y:pz.y,dx:0,dy:0,speed:0,type:'car',color:'#ef4444',violator:true,
        stopped:true,parkTimer:280,alpha:1,alive:true,horiz:true,hasFarol:false,hasFlash:false,
        drunk:false,wobble:0,brakeLights:false,noFarolV:false,redLightRunner:false,speeder:false,id:Math.random()});
    }
    tsTotalViolations++; tsLog('🅿','Veículo estacionado em local proibido!','danger'); tsSetCtbTip('park');
  } else if (type==='drunk') {
    const v=tsVehicles.find(v=>!v.drunk&&v.alive);
    if(v){v.drunk=true;v.color='#f43f5e';}
    tsTotalViolations++; tsLog('🍺','Motorista embriagado detectado!','danger'); tsSetCtbTip('drunk');
    tsShowNotif('⚠️ MOTORISTA EMBRIAGADO! Mantenha distância!','danger');
  }
  tsUpdateStats();
}
