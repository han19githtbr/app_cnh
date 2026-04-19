// =====================================================================
// CNH Brasil · Módulo Visual de Trânsito
// Cenas SVG interativas com animações contextuais — lógica real de trânsito
// =====================================================================

const VISUAL_SCENES = [
  {
    id: 'linhas-pista',
    icon: '━━',
    title: 'Linhas do Pavimento',
    desc: 'Entenda cada linha da pista — o que pode e o que é proibido',
    scenes: [
      {
        id: 'linha-amarela-continua',
        title: 'Linha Amarela Contínua — PROIBIDO Ultrapassar',
        rule: 'Linha contínua amarela = NUNCA ultrapasse. Infração GRAVE: 5 pontos + R$195,23',
        status: 'danger',
        svg: `<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#87ceeb"/>
      <stop offset="100%" stop-color="#c8e8f5"/>
    </linearGradient>
    <linearGradient id="road1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#555"/>
      <stop offset="100%" stop-color="#444"/>
    </linearGradient>
    <style>
      /* Carro azul se move para frente na faixa correta */
      @keyframes carBlueMove {
        0%   { transform: translateX(-80px); }
        100% { transform: translateX(700px); }
      }
      /* Carro vermelho tenta cruzar a linha — avança e recua em loop para mostrar a tentativa proibida */
      @keyframes carRedBadAttempt {
        0%   { transform: translate(350px,178px); }
        30%  { transform: translate(390px,165px); }
        55%  { transform: translate(370px,170px); }
        70%  { transform: translate(390px,165px); }
        100% { transform: translate(350px,178px); }
      }
      /* Carro roxo (sentido contrário) se move da direita para esquerda */
      @keyframes carPurpleOncoming {
        0%   { transform: translateX(220px); }
        100% { transform: translateX(-700px); }
      }
      /* Alerta pisca */
      @keyframes alertPulse {
        0%,100% { opacity:1; }
        50%      { opacity:0.2; }
      }
      /* Linha tracejada da pista se move para simular rolagem */
      @keyframes dashMove {
        0%   { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: -100; }
      }
      .car-blue-lane  { animation: carBlueMove 4s linear infinite; }
      .car-red-bad    { animation: carRedBadAttempt 3s ease-in-out infinite; }
      .car-purple-oncoming { animation: carPurpleOncoming 5s linear infinite; }
      .alert-blink    { animation: alertPulse 0.7s ease-in-out infinite; }
      .dash-road      { animation: dashMove 1.5s linear infinite; }
    </style>
  </defs>
  <!-- Sky background -->
  <rect width="700" height="320" fill="url(#sky1)"/>
  <!-- Ground/grass -->
  <rect x="0" y="200" width="700" height="120" fill="#4a7c59"/>
  <!-- Road surface -->
  <rect x="0" y="145" width="700" height="130" fill="url(#road1)"/>
  <!-- Road shoulders -->
  <rect x="0" y="145" width="700" height="6" fill="#f59e0b" opacity="0.6"/>
  <rect x="0" y="269" width="700" height="6" fill="#f59e0b" opacity="0.6"/>
  <!-- Lane markings movendo -->
  <line class="dash-road" x1="0" y1="180" x2="700" y2="180" stroke="white" stroke-width="2" stroke-dasharray="30,20"/>
  <line class="dash-road" x1="0" y1="240" x2="700" y2="240" stroke="white" stroke-width="2" stroke-dasharray="30,20"/>
  <!-- CENTER LINE - continuous yellow (não se move — é contínua) -->
  <line x1="0" y1="210" x2="700" y2="210" stroke="#fbbf24" stroke-width="5"/>

  <!-- Carro azul na faixa correta (sentido →) -->
  <g class="car-blue-lane" transform="translateX(-80px)">
    <rect x="80" y="178" width="62" height="28" rx="5" fill="#2563eb"/>
    <rect x="88" y="168" width="42" height="16" rx="3" fill="#3b82f6"/>
    <rect x="90" y="170" width="18" height="11" rx="2" fill="#93c5fd" opacity="0.8"/>
    <rect x="112" y="170" width="16" height="11" rx="2" fill="#93c5fd" opacity="0.8"/>
    <circle cx="92" cy="206" r="6" fill="#1e293b"/>
    <circle cx="92" cy="206" r="3" fill="#475569"/>
    <circle cx="130" cy="206" r="6" fill="#1e293b"/>
    <circle cx="130" cy="206" r="3" fill="#475569"/>
    <rect x="81" y="186" width="6" height="10" rx="2" fill="#fef08a"/>
    <rect x="135" y="186" width="6" height="10" rx="2" fill="#ef4444"/>
    <text x="86" y="162" font-size="13">✅</text>
  </g>

  <!-- Carro vermelho TENTANDO cruzar linha (proibido) -->
  <g class="car-red-bad">
    <rect x="0" y="0" width="62" height="28" rx="5" fill="#dc2626"/>
    <rect x="8" y="-10" width="42" height="16" rx="3" fill="#ef4444"/>
    <rect x="10" y="-8" width="18" height="11" rx="2" fill="#fca5a5" opacity="0.8"/>
    <rect x="32" y="-8" width="16" height="11" rx="2" fill="#fca5a5" opacity="0.8"/>
    <circle cx="12" cy="28" r="6" fill="#1e293b"/>
    <circle cx="50" cy="28" r="6" fill="#1e293b"/>
    <text class="alert-blink" x="5" y="-20" font-size="14">🚫</text>
    <text class="alert-blink" x="2" y="-33" font-size="10" fill="#ef4444" font-weight="bold">PROIBIDO!</text>
  </g>

  <!-- Carro roxo vindo no sentido contrário (←) -->
  <g class="car-purple-oncoming" transform="translateX(220px)">
    <rect x="480" y="213" width="55" height="25" rx="4" fill="#7c3aed"/>
    <rect x="486" y="205" width="38" height="14" rx="3" fill="#8b5cf6"/>
    <rect x="488" y="207" width="15" height="9" rx="2" fill="#c4b5fd" opacity="0.8"/>
    <circle cx="490" cy="238" r="5" fill="#1e293b"/>
    <circle cx="524" cy="238" r="5" fill="#1e293b"/>
    <rect x="529" y="219" width="5" height="9" rx="2" fill="#fef08a"/>
  </g>

  <!-- Label callouts (fixo) -->
  <rect x="255" y="140" width="180" height="42" rx="6" fill="#fbbf24"/>
  <text x="265" y="157" font-size="11" font-weight="bold" fill="#1c1917">⚠️ LINHA AMARELA CONTÍNUA</text>
  <text x="265" y="173" font-size="10" fill="#292524">Proibição TOTAL de ultrapassar</text>

  <!-- Fine label -->
  <rect x="10" y="290" width="680" height="24" rx="4" fill="#1e293b" opacity="0.85"/>
  <text x="350" y="306" font-size="11" fill="#fbbf24" text-anchor="middle" font-weight="bold">🚫 Cruzar a linha amarela contínua = Infração GRAVE · 5 pts · R$195,23</text>
</svg>`
      },
      {
        id: 'linha-amarela-tracejada',
        title: 'Linha Amarela Tracejada — Ultrapassagem Permitida',
        rule: 'Linha tracejada amarela = ultrapassagem PERMITIDA quando há visibilidade e segurança.',
        status: 'ok',
        svg: `<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#87ceeb"/>
      <stop offset="100%" stop-color="#c8e8f5"/>
    </linearGradient>
    <style>
      /* Carro lento avança devagar na faixa direita */
      @keyframes slowCarMove {
        0%   { transform: translateX(0); }
        100% { transform: translateX(700px); }
      }
      /* Carro verde faz ultrapassagem: sai da faixa, passa, volta */
      @keyframes overtakeMove {
        0%   { transform: translate(180px, 215px); }
        15%  { transform: translate(220px, 190px); }
        50%  { transform: translate(420px, 148px); }
        75%  { transform: translate(560px, 148px); }
        90%  { transform: translate(620px, 200px); }
        100% { transform: translate(700px, 215px); }
      }
      /* Pisca-pisca piscando antes da ultrapassagem */
      @keyframes blinkerOn {
        0%,49%  { opacity: 1; }
        50%,100% { opacity: 0; }
      }
      /* Dash road movement */
      @keyframes dashMoveOk {
        0%   { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: -100; }
      }
      .slow-car   { animation: slowCarMove 6s linear infinite; }
      .overtake   { animation: overtakeMove 5s ease-in-out infinite; }
      .blinker    { animation: blinkerOn 0.5s step-end infinite; }
      .dash-ok    { animation: dashMoveOk 1.5s linear infinite; }
    </style>
  </defs>
  <rect width="700" height="320" fill="url(#sky2)"/>
  <rect x="0" y="200" width="700" height="120" fill="#4a7c59"/>
  <rect x="0" y="145" width="700" height="130" fill="#555"/>
  <rect x="0" y="145" width="700" height="5" fill="#f59e0b" opacity="0.5"/>
  <rect x="0" y="270" width="700" height="5" fill="#f59e0b" opacity="0.5"/>
  <line class="dash-ok" x1="0" y1="178" x2="700" y2="178" stroke="white" stroke-width="2" stroke-dasharray="30,20"/>
  <line class="dash-ok" x1="0" y1="242" x2="700" y2="242" stroke="white" stroke-width="2" stroke-dasharray="30,20"/>
  <!-- CENTER dashed yellow — também se move para reforçar que é tracejada -->
  <line class="dash-ok" x1="0" y1="210" x2="700" y2="210" stroke="#fbbf24" stroke-width="4" stroke-dasharray="40,25"/>

  <!-- Carro lento (cinza) na faixa direita -->
  <g class="slow-car" transform="translateX(-120px)">
    <rect x="120" y="215" width="55" height="26" rx="4" fill="#94a3b8"/>
    <rect x="126" y="207" width="38" height="14" rx="3" fill="#cbd5e1"/>
    <circle cx="130" cy="241" r="5" fill="#1e293b"/>
    <circle cx="164" cy="241" r="5" fill="#1e293b"/>
    <text x="122" y="202" font-size="10" fill="#64748b">🐢 Lento</text>
  </g>

  <!-- Carro verde fazendo ultrapassagem correta -->
  <g class="overtake">
    <rect x="0" y="0" width="62" height="28" rx="5" fill="#16a34a"/>
    <rect x="8" y="-10" width="42" height="16" rx="3" fill="#22c55e"/>
    <rect x="10" y="-8" width="18" height="11" rx="2" fill="#bbf7d0" opacity="0.8"/>
    <rect x="32" y="-8" width="16" height="11" rx="2" fill="#bbf7d0" opacity="0.8"/>
    <circle cx="12" cy="28" r="6" fill="#1e293b"/>
    <circle cx="50" cy="28" r="6" fill="#1e293b"/>
    <!-- Pisca-pisca piscando -->
    <rect class="blinker" x="55" y="2" width="7" height="10" rx="2" fill="#fbbf24"/>
    <text x="5" y="-20" font-size="13">✅</text>
  </g>

  <!-- Seta de visibilidade livre à frente -->
  <text x="450" y="175" font-size="22" fill="#22c55e" opacity="0.7">→→→</text>
  <text x="450" y="165" font-size="10" fill="#22c55e">Via livre à frente</text>

  <rect x="10" y="140" width="220" height="42" rx="6" fill="#22c55e"/>
  <text x="20" y="157" font-size="11" font-weight="bold" fill="white">✅ LINHA AMARELA TRACEJADA</text>
  <text x="20" y="173" font-size="10" fill="white">Ultrapassagem permitida com segurança</text>

  <rect x="10" y="290" width="680" height="24" rx="4" fill="#1e293b" opacity="0.85"/>
  <text x="350" y="306" font-size="11" fill="#22c55e" text-anchor="middle" font-weight="bold">✅ Linha tracejada = permitido ultrapassar · Verifique visibilidade e sinalize antes!</text>
</svg>`
      },
      {
        id: 'faixa-pedestres',
        title: 'Faixa de Pedestres — Prioridade Absoluta',
        rule: 'Pedestre na faixa = PARE. Parar SOBRE a faixa é infração. Não dar preferência = infração GRAVE.',
        status: 'danger',
        svg: `<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      /* Pedestre 1 caminha da esquerda para direita atravessando a faixa */
      @keyframes ped1Walk {
        0%   { transform: translate(290px, 188px); }
        100% { transform: translate(430px, 188px); }
      }
      /* Pedestre 2 caminha mais devagar */
      @keyframes ped2Walk {
        0%   { transform: translate(290px, 215px); }
        100% { transform: translate(430px, 215px); }
      }
      /* Pernas do pedestre oscilam para simular caminhada */
      @keyframes legSwing {
        0%,100% { transform: rotate(15deg); }
        50%     { transform: rotate(-15deg); }
      }
      /* Carro azul para antes da faixa */
      @keyframes carStop {
        0%   { transform: translateX(-50px); }
        40%  { transform: translateX(55px); }
        100% { transform: translateX(55px); }
      }
      /* Carro vermelho para SOBRE a faixa (errado) — aparece na outra faixa */
      @keyframes carWrongStop {
        0%   { transform: translateX(200px); }
        50%  { transform: translateX(160px); }
        100% { transform: translateX(160px); }
      }
      /* Alerta pisca no carro errado */
      @keyframes warnBlink {
        0%,100% { opacity:1; }
        50%     { opacity:0; }
      }
      .ped1       { animation: ped1Walk 4s linear infinite; }
      .ped2       { animation: ped2Walk 6s linear infinite; }
      .car-blue-stop { animation: carStop 5s ease-out infinite; }
      .car-red-over  { animation: carWrongStop 4s ease-out infinite; }
      .warn-blink    { animation: warnBlink 0.8s infinite; }
      .leg1 { transform-origin: 5px 0; animation: legSwing 0.5s ease-in-out infinite; }
      .leg2 { transform-origin: 5px 0; animation: legSwing 0.5s ease-in-out infinite reverse; }
    </style>
  </defs>
  <rect width="700" height="320" fill="#87ceeb"/>
  <rect x="0" y="195" width="700" height="125" fill="#555"/>
  <!-- Calçadas -->
  <rect x="0" y="175" width="700" height="22" fill="#9ca3af"/>
  <rect x="0" y="293" width="700" height="27" fill="#9ca3af"/>
  <!-- Zebra crossing -->
  <rect x="290" y="175" width="120" height="122" fill="none"/>
  <rect x="290" y="175" width="18" height="122" fill="white" opacity="0.9"/>
  <rect x="316" y="175" width="18" height="122" fill="white" opacity="0.9"/>
  <rect x="342" y="175" width="18" height="122" fill="white" opacity="0.9"/>
  <rect x="368" y="175" width="18" height="122" fill="white" opacity="0.9"/>
  <rect x="394" y="175" width="18" height="122" fill="white" opacity="0.9"/>

  <!-- Pedestre 1 andando -->
  <g class="ped1">
    <circle cx="0" cy="0" r="10" fill="#fcd34d"/>
    <rect x="-5" y="10" width="10" height="20" rx="3" fill="#3b82f6"/>
    <!-- Braços -->
    <line x1="-5" y1="18" x2="-15" y2="28" stroke="#fcd34d" stroke-width="3" stroke-linecap="round"/>
    <line x1="5" y1="18" x2="12" y2="26" stroke="#fcd34d" stroke-width="3" stroke-linecap="round"/>
    <!-- Pernas animadas -->
    <g class="leg1"><line x1="-3" y1="30" x2="-7" y2="44" stroke="#fcd34d" stroke-width="3" stroke-linecap="round"/></g>
    <g class="leg2"><line x1="3" y1="30" x2="9" y2="44" stroke="#fcd34d" stroke-width="3" stroke-linecap="round"/></g>
    <text x="-8" y="-18" font-size="14">🚶</text>
  </g>

  <!-- Pedestre 2 -->
  <g class="ped2">
    <circle cx="0" cy="0" r="9" fill="#fbbf24"/>
    <rect x="-5" y="9" width="10" height="18" rx="3" fill="#ec4899"/>
    <g class="leg1"><line x1="-3" y1="27" x2="-6" y2="38" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/></g>
    <g class="leg2"><line x1="3" y1="27" x2="7" y2="38" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/></g>
  </g>

  <!-- Carro azul PARANDO corretamente -->
  <g class="car-blue-stop">
    <rect x="65" y="205" width="62" height="28" rx="5" fill="#2563eb"/>
    <rect x="73" y="195" width="42" height="16" rx="3" fill="#3b82f6"/>
    <rect x="75" y="197" width="18" height="11" rx="2" fill="#93c5fd" opacity="0.8"/>
    <rect x="97" y="197" width="16" height="11" rx="2" fill="#93c5fd" opacity="0.8"/>
    <circle cx="77" cy="233" r="6" fill="#1e293b"/>
    <circle cx="115" cy="233" r="6" fill="#1e293b"/>
    <!-- Freios acesos -->
    <rect x="66" y="213" width="6" height="10" rx="2" fill="#ef4444"/>
    <text x="68" y="190" font-size="16">✅ PAROU</text>
  </g>

  <!-- Carro vermelho PARADO SOBRE a faixa (errado) -->
  <g class="car-red-over">
    <rect x="330" y="205" width="60" height="27" rx="5" fill="#dc2626"/>
    <rect x="337" y="196" width="40" height="15" rx="3" fill="#ef4444"/>
    <rect x="339" y="198" width="16" height="10" rx="2" fill="#fca5a5" opacity="0.8"/>
    <rect x="360" y="198" width="15" height="10" rx="2" fill="#fca5a5" opacity="0.8"/>
    <circle cx="341" cy="232" r="5" fill="#1e293b"/>
    <circle cx="378" cy="232" r="5" fill="#1e293b"/>
    <text class="warn-blink" x="330" y="190" font-size="11" fill="#dc2626" font-weight="bold">🚫 SOBRE A FAIXA!</text>
  </g>

  <rect x="10" y="290" width="680" height="24" rx="4" fill="#1e293b" opacity="0.9"/>
  <text x="350" y="306" font-size="11" fill="#fbbf24" text-anchor="middle" font-weight="bold">⚠️ Pedestre na faixa = PARE. Parar sobre a faixa = infração GRAVE · 5 pts</text>
</svg>`
      }
    ]
  },
  {
    id: 'semaforos',
    icon: '🚦',
    title: 'Semáforos',
    desc: 'Situações reais com semáforos: o que cada luz significa e como agir',
    scenes: [
      {
        id: 'sinal-vermelho',
        title: 'Sinal Vermelho — PARE Obrigatoriamente',
        rule: 'Avançar sinal vermelho = Infração GRAVÍSSIMA: 7 pontos + R$293,47. Causa a maioria dos acidentes em cruzamentos.',
        status: 'danger',
        svg: `<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="redglow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ef4444" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#ef4444" stop-opacity="0"/>
    </radialGradient>
    <style>
      /* Carro azul desacelera e para na linha */
      @keyframes blueCarBrake {
        0%   { transform: translateX(-100px); }
        60%  { transform: translateX(90px); }
        100% { transform: translateX(90px); }
      }
      /* Luz vermelha pulsa para chamar atenção */
      @keyframes redLightPulse {
        0%,100% { r: 12; opacity: 1; }
        50%     { r: 14; opacity: 0.7; }
      }
      /* Carro vermelho avança o sinal — se move para frente */
      @keyframes redCarRun {
        0%   { transform: translateX(0px); }
        100% { transform: translateX(400px); }
      }
      /* Símbolo de perigo pisca */
      @keyframes dangerPulse {
        0%,100% { opacity: 1; transform: scale(1); }
        50%     { opacity: 0.3; transform: scale(0.8); }
      }
      /* Freios acendem */
      @keyframes brakeLight {
        0%,100% { fill: #ef4444; opacity: 1; }
        50%     { fill: #fca5a5; opacity: 0.5; }
      }
      .blue-brake  { animation: blueCarBrake 4s ease-out infinite; }
      .red-run     { animation: redCarRun 3s ease-in 1s infinite; }
      .danger-sign { animation: dangerPulse 0.9s ease-in-out infinite; }
      .brake-lt    { animation: brakeLight 0.4s ease-in-out infinite; }
      circle.red-pulse { animation: redLightPulse 1s ease-in-out infinite; }
    </style>
  </defs>
  <rect width="700" height="340" fill="#1e293b"/>
  <rect x="0" y="220" width="700" height="120" fill="#374151"/>
  <rect x="0" y="160" width="700" height="140" fill="#4b5563"/>
  <line x1="0" y1="210" x2="700" y2="210" stroke="white" stroke-width="2.5" stroke-dasharray="40,25"/>
  <line x1="0" y1="270" x2="700" y2="270" stroke="white" stroke-width="2.5" stroke-dasharray="40,25"/>
  <!-- Stop line -->
  <rect x="280" y="155" width="5" height="100" fill="white"/>
  <!-- Crosswalk -->
  <rect x="285" y="155" width="12" height="100" fill="white" opacity="0.7"/>
  <rect x="305" y="155" width="12" height="100" fill="white" opacity="0.7"/>
  <rect x="325" y="155" width="12" height="100" fill="white" opacity="0.7"/>
  <rect x="345" y="155" width="12" height="100" fill="white" opacity="0.7"/>
  <!-- Cross street -->
  <rect x="285" y="0" width="220" height="165" fill="#4b5563"/>
  <rect x="285" y="0" width="220" height="5" fill="#374151"/>

  <!-- Traffic light pole -->
  <rect x="268" y="20" width="8" height="140" fill="#374151"/>
  <rect x="248" y="20" width="48" height="120" rx="8" fill="#1f2937"/>
  <rect x="250" y="22" width="44" height="116" rx="7" fill="#111827"/>
  <!-- RED light ON pulsando -->
  <circle cx="272" cy="50" r="16" fill="url(#redglow)"/>
  <circle class="red-pulse" cx="272" cy="50" r="12" fill="#ef4444"/>
  <circle cx="272" cy="50" r="9" fill="#fca5a5"/>
  <!-- Yellow light OFF -->
  <circle cx="272" cy="82" r="12" fill="#1f2937"/>
  <circle cx="272" cy="82" r="9" fill="#78350f" opacity="0.4"/>
  <!-- Green light OFF -->
  <circle cx="272" cy="114" r="12" fill="#1f2937"/>
  <circle cx="272" cy="114" r="9" fill="#14532d" opacity="0.4"/>

  <!-- Carro azul freando e parando corretamente -->
  <g class="blue-brake">
    <rect x="100" y="185" width="65" height="30" rx="5" fill="#1d4ed8"/>
    <rect x="109" y="173" width="44" height="18" rx="3" fill="#2563eb"/>
    <rect x="111" y="175" width="18" height="12" rx="2" fill="#93c5fd" opacity="0.85"/>
    <rect x="133" y="175" width="18" height="12" rx="2" fill="#93c5fd" opacity="0.85"/>
    <circle cx="113" cy="215" r="7" fill="#0f172a"/>
    <circle cx="152" cy="215" r="7" fill="#0f172a"/>
    <!-- Headlights -->
    <rect x="160" y="193" width="7" height="14" rx="2" fill="#fef08a"/>
    <!-- Freios piscando -->
    <rect class="brake-lt" x="101" y="193" width="7" height="14" rx="2" fill="#ef4444"/>
    <text x="106" y="168" font-size="13">✅ PAROU</text>
  </g>

  <!-- Carro vermelho AVANÇANDO o sinal (errado) -->
  <g class="red-run" transform="translateX(0px)">
    <rect x="300" y="220" width="60" height="27" rx="5" fill="#dc2626"/>
    <rect x="308" y="210" width="40" height="16" rx="3" fill="#ef4444"/>
    <rect x="310" y="212" width="16" height="11" rx="2" fill="#fca5a5" opacity="0.8"/>
    <rect x="330" y="212" width="14" height="11" rx="2" fill="#fca5a5" opacity="0.8"/>
    <circle cx="311" cy="247" r="6" fill="#0f172a"/>
    <circle cx="349" cy="247" r="6" fill="#0f172a"/>
    <text class="danger-sign" x="298" y="205" font-size="11" fill="#fbbf24" font-weight="bold">🚫 AVANÇOU!</text>
  </g>

  <!-- Red label -->
  <rect x="400" y="22" width="290" height="120" rx="8" fill="#1f2937" opacity="0.95"/>
  <text x="412" y="45" font-size="13" fill="#ef4444" font-weight="bold">🔴 LUZ VERMELHA</text>
  <text x="412" y="65" font-size="11" fill="#f1f5f9">• Parada TOTAL obrigatória</text>
  <text x="412" y="82" font-size="11" fill="#f1f5f9">• Aguardar até o verde</text>
  <text x="412" y="99" font-size="11" fill="#f1f5f9">• Vale mesmo de madrugada</text>
  <text x="412" y="116" font-size="11" fill="#f1f5f9">• Infração: GRAVÍSSIMA 7pts</text>
  <text x="412" y="133" font-size="11" fill="#f1f5f9">• Multa: R$ 293,47</text>

  <rect x="10" y="315" width="680" height="22" rx="4" fill="#7f1d1d" opacity="0.9"/>
  <text x="350" y="330" font-size="11" fill="#fca5a5" text-anchor="middle" font-weight="bold">🔴 Avançar sinal vermelho = principal causa de mortes em cruzamentos urbanos</text>
</svg>`
      },
      {
        id: 'sinal-amarelo',
        title: 'Sinal Amarelo — Atenção: Prepare-se para Parar',
        rule: 'Amarelo NÃO significa acelerar. Só passe se parar for mais perigoso que continuar.',
        status: 'warning',
        svg: `<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="yellowglow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#fbbf24" stop-opacity="0"/>
    </radialGradient>
    <style>
      /* Carro roxo freia ao ver amarelo */
      @keyframes purpleBrake {
        0%   { transform: translateX(-80px); }
        55%  { transform: translateX(65px); }
        100% { transform: translateX(65px); }
      }
      /* Carro vermelho acelera no amarelo (ERRADO) */
      @keyframes redAccel {
        0%   { transform: translateX(260px); }
        100% { transform: translateX(800px); }
      }
      /* Luz amarela pisca (amarelo SEMPRE pisca em trânsito) */
      @keyframes yellowBlink {
        0%,49%  { opacity: 1; fill: #fbbf24; }
        50%,100% { opacity: 0.2; fill: #78350f; }
      }
      /* Freios acendem */
      @keyframes brakeGlow {
        0%,100% { fill: #ef4444; opacity: 1; }
        50%     { fill: #7f1d1d; opacity: 0.4; }
      }
      /* Linha de piso se move */
      @keyframes dashY {
        0%   { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: -100; }
      }
      .purple-brake { animation: purpleBrake 4s ease-out infinite; }
      .red-accel    { animation: redAccel 2.5s ease-in 1s infinite; }
      .yellow-light { animation: yellowBlink 0.8s step-end infinite; }
      .brake-glow   { animation: brakeGlow 0.4s infinite; }
      .dash-y       { animation: dashY 1.5s linear infinite; }
    </style>
  </defs>
  <rect width="700" height="340" fill="#0f172a"/>
  <rect x="0" y="220" width="700" height="120" fill="#374151"/>
  <rect x="0" y="155" width="700" height="135" fill="#4b5563"/>
  <line class="dash-y" x1="0" y1="210" x2="700" y2="210" stroke="white" stroke-width="2" stroke-dasharray="40,25"/>
  <rect x="285" y="0" width="220" height="160" fill="#4b5563"/>
  <rect x="268" y="20" width="8" height="140" fill="#374151"/>
  <rect x="248" y="20" width="48" height="120" rx="8" fill="#1f2937"/>
  <rect x="250" y="22" width="44" height="116" rx="7" fill="#111827"/>
  <!-- Red OFF -->
  <circle cx="272" cy="50" r="12" fill="#1f2937"/>
  <circle cx="272" cy="50" r="9" fill="#7f1d1d" opacity="0.4"/>
  <!-- YELLOW ON piscando -->
  <circle cx="272" cy="82" r="14" fill="url(#yellowglow)"/>
  <circle class="yellow-light" cx="272" cy="82" r="12" fill="#fbbf24"/>
  <!-- Green OFF -->
  <circle cx="272" cy="114" r="12" fill="#1f2937"/>
  <circle cx="272" cy="114" r="9" fill="#14532d" opacity="0.4"/>

  <!-- Carro roxo freando (correto) -->
  <g class="purple-brake">
    <rect x="80" y="180" width="62" height="28" rx="5" fill="#7c3aed"/>
    <rect x="88" y="170" width="42" height="16" rx="3" fill="#8b5cf6"/>
    <rect x="90" y="172" width="18" height="11" rx="2" fill="#c4b5fd" opacity="0.8"/>
    <rect x="112" y="172" width="16" height="11" rx="2" fill="#c4b5fd" opacity="0.8"/>
    <circle cx="92" cy="208" r="6" fill="#0f172a"/>
    <circle cx="130" cy="208" r="6" fill="#0f172a"/>
    <rect class="brake-glow" x="81" y="188" width="7" height="12" rx="2" fill="#ef4444"/>
    <text x="80" y="163" font-size="13">✅ Freando</text>
    <!-- Marcas de frenagem -->
    <line x1="72" y1="208" x2="20" y2="210" stroke="#6b7280" stroke-width="3" opacity="0.6" stroke-dasharray="5,3"/>
  </g>

  <!-- Carro vermelho ACELERANDO no amarelo (errado) -->
  <g class="red-accel">
    <rect x="0" y="220" width="60" height="27" rx="5" fill="#dc2626"/>
    <rect x="8" y="210" width="40" height="16" rx="3" fill="#ef4444"/>
    <rect x="10" y="212" width="16" height="11" rx="2" fill="#fca5a5" opacity="0.8"/>
    <circle cx="11" cy="247" r="6" fill="#0f172a"/>
    <circle cx="48" cy="247" r="6" fill="#0f172a"/>
    <text x="0" y="205" font-size="11" fill="#fbbf24" font-weight="bold">🚫 Acelerou!</text>
  </g>

  <rect x="390" y="20" width="300" height="125" rx="8" fill="#1f2937" opacity="0.95"/>
  <text x="402" y="42" font-size="13" fill="#fbbf24" font-weight="bold">🟡 LUZ AMARELA</text>
  <text x="402" y="62" font-size="11" fill="#f1f5f9">• Atenção: sinal vai fechar</text>
  <text x="402" y="80" font-size="11" fill="#f1f5f9">• Prepare-se para parar</text>
  <text x="402" y="98" font-size="11" fill="#ef4444">• NUNCA acelere no amarelo!</text>
  <text x="402" y="116" font-size="11" fill="#f1f5f9">• Só continue se parar</text>
  <text x="402" y="133" font-size="11" fill="#f1f5f9">  for mais perigoso</text>

  <rect x="10" y="315" width="680" height="22" rx="4" fill="#78350f" opacity="0.9"/>
  <text x="350" y="330" font-size="11" fill="#fef08a" text-anchor="middle" font-weight="bold">⚠️ Amarelo ≠ acelere! Avançar indevidamente no amarelo = infração GRAVE (5 pts)</text>
</svg>`
      },
      {
        id: 'sinal-verde',
        title: 'Sinal Verde — Prossiga com Atenção',
        rule: 'Verde = pode avançar, MAS verifique antes! Pedestres ou carros podem ainda estar cruzando.',
        status: 'ok',
        svg: `<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="greenglow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#22c55e" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#22c55e" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="daysky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#7dd3fc"/>
      <stop offset="100%" stop-color="#bae6fd"/>
    </linearGradient>
    <style>
      /* Carro azul arranca do sinal com cautela */
      @keyframes blueGo {
        0%    { transform: translateX(280px); }
        20%   { transform: translateX(285px); }
        100%  { transform: translateX(800px); }
      }
      /* Pedestre ainda termina de cruzar — vai saindo do caminho */
      @keyframes pedClear {
        0%   { transform: translate(340px, 162px); }
        60%  { transform: translate(420px, 162px); }
        100% { transform: translate(430px, 162px); }
      }
      /* Luz verde pulsa suavemente */
      @keyframes greenPulse {
        0%,100% { opacity: 1; }
        50%     { opacity: 0.7; }
      }
      /* Pernas pedestre andam */
      @keyframes pedLeg {
        0%,100% { transform: rotate(20deg); }
        50%     { transform: rotate(-20deg); }
      }
      .blue-go    { animation: blueGo 5s ease-in 0.5s infinite; }
      .ped-clear  { animation: pedClear 3s ease-in-out infinite; }
      .green-lit  { animation: greenPulse 1s ease-in-out infinite; }
      .pleg       { transform-origin: 4px 0; animation: pedLeg 0.45s ease-in-out infinite; }
      .pleg2      { transform-origin: 4px 0; animation: pedLeg 0.45s ease-in-out infinite reverse; }
    </style>
  </defs>
  <rect width="700" height="340" fill="url(#daysky)"/>
  <rect x="0" y="220" width="700" height="120" fill="#4a7c59"/>
  <rect x="0" y="155" width="700" height="135" fill="#555"/>
  <line x1="0" y1="210" x2="700" y2="210" stroke="white" stroke-width="2" stroke-dasharray="40,25"/>
  <rect x="285" y="0" width="220" height="160" fill="#555"/>
  <!-- Crosswalk -->
  <rect x="285" y="150" width="14" height="65" fill="white" opacity="0.8"/>
  <rect x="307" y="150" width="14" height="65" fill="white" opacity="0.8"/>
  <rect x="329" y="150" width="14" height="65" fill="white" opacity="0.8"/>
  <rect x="351" y="150" width="14" height="65" fill="white" opacity="0.8"/>
  <rect x="373" y="150" width="14" height="65" fill="white" opacity="0.8"/>

  <rect x="268" y="20" width="8" height="140" fill="#6b7280"/>
  <rect x="248" y="20" width="48" height="120" rx="8" fill="#374151"/>
  <rect x="250" y="22" width="44" height="116" rx="7" fill="#111827"/>
  <!-- Red OFF -->
  <circle cx="272" cy="50" r="12" fill="#1f2937"/>
  <circle cx="272" cy="50" r="9" fill="#7f1d1d" opacity="0.4"/>
  <!-- Yellow OFF -->
  <circle cx="272" cy="82" r="12" fill="#1f2937"/>
  <circle cx="272" cy="82" r="9" fill="#78350f" opacity="0.4"/>
  <!-- GREEN ON -->
  <circle cx="272" cy="114" r="14" fill="url(#greenglow)"/>
  <circle class="green-lit" cx="272" cy="114" r="12" fill="#22c55e"/>
  <circle cx="272" cy="114" r="9" fill="#bbf7d0"/>

  <!-- Carro azul arrancando no verde com cautela -->
  <g class="blue-go">
    <rect x="0" y="178" width="65" height="30" rx="5" fill="#2563eb"/>
    <rect x="9" y="166" width="44" height="18" rx="3" fill="#3b82f6"/>
    <rect x="11" y="168" width="18" height="12" rx="2" fill="#93c5fd" opacity="0.85"/>
    <rect x="33" y="168" width="18" height="12" rx="2" fill="#93c5fd" opacity="0.85"/>
    <circle cx="13" cy="208" r="7" fill="#0f172a"/>
    <circle cx="52" cy="208" r="7" fill="#0f172a"/>
    <rect x="60" y="186" width="7" height="14" rx="2" fill="#fef08a"/>
    <text x="0" y="160" font-size="13">✅ Avançando</text>
  </g>

  <!-- Pedestre ainda terminando de cruzar -->
  <g class="ped-clear">
    <circle cx="0" cy="0" r="8" fill="#fcd34d"/>
    <rect x="-4" y="8" width="8" height="16" rx="2" fill="#f97316"/>
    <g class="pleg"><line x1="-2" y1="24" x2="-5" y2="35" stroke="#fcd34d" stroke-width="2" stroke-linecap="round"/></g>
    <g class="pleg2"><line x1="2" y1="24" x2="6" y2="35" stroke="#fcd34d" stroke-width="2" stroke-linecap="round"/></g>
    <text x="-14" y="-12" font-size="10" fill="#f97316">Ainda</text>
    <text x="-14" y="-2" font-size="10" fill="#f97316">cruzando!</text>
  </g>

  <rect x="10" y="12" width="220" height="120" rx="8" fill="#14532d" opacity="0.9"/>
  <text x="20" y="35" font-size="13" fill="#22c55e" font-weight="bold">🟢 LUZ VERDE</text>
  <text x="20" y="55" font-size="11" fill="#f1f5f9">• Pode avançar</text>
  <text x="20" y="73" font-size="11" fill="#f1f5f9">• Verifique pedestres</text>
  <text x="20" y="91" font-size="11" fill="#f1f5f9">• Verifique cruzamentos</text>
  <text x="20" y="109" font-size="11" fill="#fbbf24">⚠️ Verde ≠ livre!</text>
  <text x="20" y="127" font-size="11" fill="#f1f5f9">Confirme antes de avançar</text>

  <rect x="10" y="315" width="680" height="22" rx="4" fill="#14532d" opacity="0.9"/>
  <text x="350" y="330" font-size="11" fill="#bbf7d0" text-anchor="middle" font-weight="bold">🟢 Sinal verde = pode avançar, mas sempre confirme se a via está livre antes!</text>
</svg>`
      }
    ]
  },
  {
    id: 'tipos-via',
    icon: '🛣️',
    title: 'Tipos de Via e Velocidades',
    desc: 'Rodovias, vias urbanas, locais especiais e limites de velocidade',
    scenes: [
      {
        id: 'rodovia-dupla',
        title: 'Rodovia — Pista Dupla (máx. 110 km/h)',
        rule: 'Pista dupla com divisor físico. Velocidade máxima 110 km/h. Use faixa da direita; esquerda = ultrapassagem.',
        status: 'info',
        svg: `<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky3" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#b8d4e8"/>
      <stop offset="100%" stop-color="#dbeafe"/>
    </linearGradient>
    <style>
      /* Carro verde vai na faixa direita (tráfego normal) */
      @keyframes greenRight {
        0%   { transform: translateX(-100px); }
        100% { transform: translateX(800px); }
      }
      /* Carro azul ultrapassa pela esquerda (mais rápido) */
      @keyframes blueLeft {
        0%   { transform: translateX(-200px); }
        100% { transform: translateX(800px); }
      }
      /* Caminhão vai mais devagar na faixa direita */
      @keyframes truckRight {
        0%   { transform: translateX(-50px); }
        100% { transform: translateX(800px); }
      }
      /* Linhas tracejadas da pista se movem */
      @keyframes dashHighway {
        0%   { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: -100; }
      }
      /* Árvores ao fundo se movem mais devagar (parallax) */
      @keyframes bgParallax {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-120px); }
      }
      .car-right  { animation: greenRight 5s linear infinite; }
      .car-left   { animation: blueLeft 3.5s linear infinite; }
      .truck-slow { animation: truckRight 8s linear infinite; }
      .dash-hw    { animation: dashHighway 1.2s linear infinite; }
      .bg-trees   { animation: bgParallax 8s linear infinite; }
    </style>
  </defs>
  <rect width="700" height="320" fill="url(#sky3)"/>
  <!-- Árvores de fundo com parallax -->
  <g class="bg-trees">
    <ellipse cx="100" cy="130" rx="80" ry="60" fill="#5c8a5e" opacity="0.5"/>
    <ellipse cx="200" cy="140" rx="60" ry="45" fill="#4a7c59" opacity="0.5"/>
    <ellipse cx="400" cy="128" rx="70" ry="55" fill="#5c8a5e" opacity="0.4"/>
    <ellipse cx="600" cy="125" rx="90" ry="65" fill="#5c8a5e" opacity="0.5"/>
    <ellipse cx="750" cy="135" rx="60" ry="50" fill="#4a7c59" opacity="0.5"/>
  </g>
  <!-- Road -->
  <rect x="0" y="170" width="700" height="150" fill="#4b5563"/>
  <rect x="0" y="165" width="700" height="10" fill="#6b7280"/>
  <!-- Guardrail/median -->
  <rect x="0" y="215" width="700" height="18" fill="#9ca3af"/>
  <rect x="0" y="222" width="700" height="4" fill="#e2e8f0"/>
  <!-- Road shoulders -->
  <rect x="0" y="165" width="30" height="155" fill="#6b7280"/>
  <rect x="670" y="165" width="30" height="155" fill="#6b7280"/>
  <!-- Lane lines -->
  <line class="dash-hw" x1="0" y1="200" x2="700" y2="200" stroke="white" stroke-width="2.5" stroke-dasharray="40,20"/>
  <line class="dash-hw" x1="0" y1="250" x2="700" y2="250" stroke="white" stroke-width="2.5" stroke-dasharray="40,20"/>
  <!-- Edge lines fixas -->
  <line x1="30" y1="165" x2="30" y2="320" stroke="#fbbf24" stroke-width="3"/>
  <line x1="670" y1="165" x2="670" y2="320" stroke="#fbbf24" stroke-width="3"/>

  <!-- Speed sign (fixo) -->
  <rect x="40" y="90" width="50" height="60" rx="4" fill="#1e293b"/>
  <rect x="42" y="92" width="46" height="56" rx="3" fill="white"/>
  <circle cx="65" cy="135" r="22" fill="white" stroke="#ef4444" stroke-width="4"/>
  <text x="65" y="141" text-anchor="middle" font-size="15" font-weight="bold" fill="#1e293b">110</text>
  <line x1="65" y1="148" x2="65" y2="170" stroke="#9ca3af" stroke-width="3"/>
  <rect x="55" y="170" width="20" height="8" rx="2" fill="#9ca3af"/>

  <!-- Carro verde na faixa direita (ritmo normal) -->
  <g class="car-right" transform="translateX(-100px)">
    <rect x="120" y="175" width="72" height="32" rx="6" fill="#16a34a"/>
    <rect x="129" y="162" width="50" height="20" rx="4" fill="#22c55e"/>
    <rect x="132" y="164" width="20" height="14" rx="2" fill="#bbf7d0" opacity="0.8"/>
    <rect x="156" y="164" width="20" height="14" rx="2" fill="#bbf7d0" opacity="0.8"/>
    <circle cx="134" cy="207" r="7" fill="#0f172a"/>
    <circle cx="178" cy="207" r="7" fill="#0f172a"/>
    <rect x="187" y="184" width="7" height="14" rx="2" fill="#fef08a"/>
    <text x="120" y="157" font-size="9" fill="#16a34a">✅ Faixa direita 80km/h</text>
  </g>

  <!-- Carro azul ultrapassando pela esquerda -->
  <g class="car-left" transform="translateX(-200px)">
    <rect x="350" y="170" width="72" height="32" rx="6" fill="#2563eb"/>
    <rect x="359" y="157" width="50" height="20" rx="4" fill="#3b82f6"/>
    <rect x="362" y="159" width="20" height="14" rx="2" fill="#93c5fd" opacity="0.8"/>
    <rect x="386" y="159" width="20" height="14" rx="2" fill="#93c5fd" opacity="0.8"/>
    <circle cx="364" cy="202" r="7" fill="#0f172a"/>
    <circle cx="408" cy="202" r="7" fill="#0f172a"/>
    <rect x="417" y="179" width="7" height="14" rx="2" fill="#fef08a"/>
    <text x="350" y="152" font-size="9" fill="#3b82f6">✅ Esquerda: ultrapassagem</text>
  </g>

  <!-- Caminhão devagar na faixa direita -->
  <g class="truck-slow" transform="translateX(-50px)">
    <rect x="480" y="225" width="95" height="40" rx="4" fill="#6d28d9"/>
    <rect x="480" y="207" width="32" height="24" rx="4" fill="#7c3aed"/>
    <rect x="483" y="210" width="25" height="16" rx="2" fill="#c4b5fd" opacity="0.8"/>
    <circle cx="495" cy="265" r="8" fill="#0f172a"/>
    <circle cx="515" cy="265" r="8" fill="#0f172a"/>
    <circle cx="558" cy="265" r="8" fill="#0f172a"/>
    <rect x="570" y="240" width="7" height="12" rx="2" fill="#fef08a"/>
    <text x="480" y="202" font-size="9" fill="#8b5cf6">Caminhão · Faixa direita</text>
  </g>

  <rect x="10" y="295" width="680" height="22" rx="4" fill="#1e293b" opacity="0.85"/>
  <text x="350" y="310" font-size="11" fill="#93c5fd" text-anchor="middle" font-weight="bold">🛣️ Rodovia pista dupla · Máx. 110 km/h · Faixa da esquerda = ultrapassagem</text>
</svg>`
      },
      {
        id: 'via-urbana',
        title: 'Via Urbana Arterial (máx. 60 km/h)',
        rule: 'Via arterial urbana: máx. 60 km/h. Semáforos frequentes, pedestres e ciclistas. Requer atenção redobrada.',
        status: 'info',
        svg: `<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      /* Carro azul vai devagar na via urbana */
      @keyframes urbanCar1 {
        0%   { transform: translateX(-80px); }
        100% { transform: translateX(800px); }
      }
      /* Carro vermelho no sentido contrário */
      @keyframes urbanCar2 {
        0%   { transform: translateX(200px); }
        100% { transform: translateX(-800px); }
      }
      /* Moto passa entre os carros (corredor) */
      @keyframes motoPass {
        0%   { transform: translateX(-50px); }
        100% { transform: translateX(800px); }
      }
      /* Pedestre caminha na calçada */
      @keyframes pedWalk {
        0%   { transform: translateX(0px); }
        100% { transform: translateX(150px); }
      }
      /* Semáforo alterna entre vermelho e verde */
      @keyframes trafficSeq {
        0%,45%  { } /* vermelho */
        50%,100% { }
      }
      /* Luz verde do semáforo pisca para mostrar ciclo */
      @keyframes tlRed {
        0%,49%  { opacity: 1; }
        50%,100% { opacity: 0.2; }
      }
      @keyframes tlGreen {
        0%,49%  { opacity: 0.2; }
        50%,100% { opacity: 1; }
      }
      /* Roda de moto gira */
      @keyframes wheelSpin {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .urban-car1  { animation: urbanCar1 7s linear infinite; }
      .urban-car2  { animation: urbanCar2 6s linear infinite; }
      .moto-pass   { animation: motoPass 4s linear infinite; }
      .ped-walk    { animation: pedWalk 5s linear infinite; }
      .tl-red-light  { animation: tlRed 4s step-end infinite; }
      .tl-green-light{ animation: tlGreen 4s step-end infinite; }
    </style>
  </defs>
  <rect width="700" height="320" fill="#93c5fd"/>
  <!-- Buildings (fixos) -->
  <rect x="0" y="20" width="90" height="140" fill="#4b5563"/>
  <rect x="5" y="25" width="80" height="130" fill="#374151"/>
  <rect x="12" y="30" width="20" height="15" fill="#fef08a" opacity="0.7"/>
  <rect x="38" y="30" width="20" height="15" fill="#fef08a" opacity="0.7"/>
  <rect x="62" y="30" width="20" height="15" fill="#fef08a" opacity="0.7"/>
  <rect x="12" y="55" width="20" height="15" fill="#fef08a" opacity="0.3"/>
  <rect x="38" y="55" width="20" height="15" fill="#fef08a" opacity="0.7"/>
  <rect x="12" y="80" width="20" height="15" fill="#bfdbfe" opacity="0.7"/>
  <rect x="62" y="80" width="20" height="15" fill="#fef08a" opacity="0.7"/>
  <rect x="95" y="40" width="70" height="120" fill="#6b7280"/>
  <rect x="100" y="45" width="60" height="110" fill="#4b5563"/>
  <rect x="105" y="50" width="16" height="12" fill="#fef08a" opacity="0.7"/>
  <rect x="128" y="50" width="16" height="12" fill="#bfdbfe" opacity="0.7"/>
  <rect x="105" y="72" width="16" height="12" fill="#fef08a" opacity="0.5"/>
  <rect x="540" y="15" width="100" height="150" fill="#4b5563"/>
  <rect x="545" y="20" width="90" height="140" fill="#374151"/>
  <rect x="552" y="28" width="22" height="16" fill="#fef08a" opacity="0.7"/>
  <rect x="582" y="28" width="22" height="16" fill="#bfdbfe" opacity="0.7"/>
  <rect x="612" y="28" width="22" height="16" fill="#fef08a" opacity="0.7"/>

  <!-- Sidewalks -->
  <rect x="0" y="155" width="700" height="20" fill="#d1d5db"/>
  <rect x="0" y="280" width="700" height="40" fill="#d1d5db"/>
  <!-- Road -->
  <rect x="0" y="175" width="700" height="108" fill="#4b5563"/>
  <line x1="0" y1="230" x2="700" y2="230" stroke="white" stroke-width="2" stroke-dasharray="30,20"/>
  <line x1="0" y1="228" x2="700" y2="228" stroke="#fbbf24" stroke-width="3"/>

  <!-- Speed sign 60 (fixo) -->
  <circle cx="530" cy="120" r="24" fill="white" stroke="#ef4444" stroke-width="5"/>
  <text x="530" y="128" text-anchor="middle" font-size="18" font-weight="bold" fill="#1e293b">60</text>
  <line x1="530" y1="144" x2="530" y2="160" stroke="#6b7280" stroke-width="3"/>

  <!-- Semáforo com ciclo animado -->
  <rect x="490" y="90" width="6" height="70" fill="#374151"/>
  <rect x="472" y="90" width="42" height="90" rx="6" fill="#1f2937"/>
  <circle class="tl-red-light"   cx="493" cy="105" r="10" fill="#ef4444"/>
  <circle cx="493" cy="125" r="10" fill="#1f2937" opacity="0.5"/>
  <circle class="tl-green-light" cx="493" cy="145" r="10" fill="#22c55e"/>

  <!-- Crosswalk lines (fixas) -->
  <rect x="450" y="155" width="12" height="130" fill="white" opacity="0.8"/>
  <rect x="470" y="155" width="12" height="130" fill="white" opacity="0.8"/>
  <rect x="490" y="155" width="12" height="130" fill="white" opacity="0.8"/>
  <rect x="510" y="155" width="12" height="130" fill="white" opacity="0.8"/>

  <!-- Carro azul sentido → -->
  <g class="urban-car1" transform="translateX(-80px)">
    <rect x="100" y="185" width="60" height="27" rx="5" fill="#1d4ed8"/>
    <rect x="107" y="175" width="40" height="16" rx="3" fill="#2563eb"/>
    <rect x="109" y="177" width="16" height="11" rx="2" fill="#93c5fd" opacity="0.8"/>
    <rect x="129" y="177" width="15" height="11" rx="2" fill="#93c5fd" opacity="0.8"/>
    <circle cx="111" cy="212" r="6" fill="#0f172a"/>
    <circle cx="149" cy="212" r="6" fill="#0f172a"/>
    <text x="100" y="170" font-size="9" fill="#93c5fd">55 km/h ✅</text>
  </g>

  <!-- Carro vermelho sentido ← -->
  <g class="urban-car2" transform="translateX(200px)">
    <rect x="400" y="237" width="60" height="27" rx="5" fill="#dc2626" transform="scale(-1,1) translate(-860,0)"/>
    <rect x="407" y="228" width="40" height="16" rx="3" fill="#ef4444" transform="scale(-1,1) translate(-860,0)"/>
    <circle cx="411" cy="264" r="6" fill="#0f172a"/>
    <circle cx="449" cy="264" r="6" fill="#0f172a"/>
  </g>

  <!-- Moto passando -->
  <g class="moto-pass" transform="translateX(-50px)">
    <rect x="370" y="197" width="40" height="14" rx="8" fill="#f59e0b"/>
    <circle cx="378" cy="214" r="7" fill="#0f172a"/>
    <circle cx="404" cy="214" r="7" fill="#0f172a"/>
    <circle cx="392" cy="190" r="7" fill="#fbbf24"/>
    <rect x="385" y="197" width="15" height="10" rx="2" fill="#f59e0b"/>
    <text x="368" y="186" font-size="9" fill="#f59e0b">⛑️</text>
  </g>

  <!-- Pedestre na calçada -->
  <g class="ped-walk" transform="translateX(0px)">
    <circle cx="600" cy="268" r="8" fill="#fcd34d"/>
    <rect x="595" y="276" width="10" height="16" rx="2" fill="#16a34a"/>
    <line x1="597" y1="292" x2="595" y2="303" stroke="#fcd34d" stroke-width="2"/>
    <line x1="603" y1="292" x2="606" y2="303" stroke="#fcd34d" stroke-width="2"/>
  </g>

  <rect x="10" y="296" width="680" height="22" rx="4" fill="#1e293b" opacity="0.85"/>
  <text x="350" y="311" font-size="11" fill="#93c5fd" text-anchor="middle" font-weight="bold">🏙️ Via Arterial Urbana · Máx. 60 km/h · Fique atento a semáforos e pedestres</text>
</svg>`
      },
      {
        id: 'rotatoria',
        title: 'Rotatória — Quem Está Dentro Tem Preferência',
        rule: 'Na rotatória: quem está DENTRO tem preferência. Ao entrar, ceda passagem. Ao sair, use o pisca.',
        status: 'info',
        svg: `<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="skyrot" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#bae6fd"/>
      <stop offset="100%" stop-color="#e0f2fe"/>
    </linearGradient>
    <style>
      /* Carro dentro da rotatória gira no sentido anti-horário */
      @keyframes roundaboutCircle {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      /* Carro entrando pela baixo: espera, depois entra quando há espaço */
      @keyframes carEntering {
        0%,40%  { transform: translate(325px, 262px); }
        55%     { transform: translate(325px, 235px); }
        70%     { transform: translate(335px, 215px); }
        100%    { transform: translate(325px, 262px); }
      }
      /* Pisca-pisca do carro saindo */
      @keyframes exitBlinker {
        0%,49%  { opacity: 1; }
        50%,100%{ opacity: 0; }
      }
      /* Carro saindo pela direita */
      @keyframes carExiting {
        0%    { transform: translate(430px, 160px); }
        40%   { transform: translate(500px, 160px); }
        70%   { transform: translate(580px, 160px); }
        100%  { transform: translate(700px, 160px); }
      }
      .car-inside   { animation: roundaboutCircle 5s linear infinite; transform-origin: 350px 160px; }
      .car-entering { animation: carEntering 5s ease-in-out infinite; }
      .exit-blink   { animation: exitBlinker 0.5s step-end infinite; }
      .car-exiting  { animation: carExiting 6s ease-in-out infinite; }
    </style>
  </defs>
  <rect width="700" height="320" fill="url(#skyrot)"/>

  <!-- Road arms -->
  <rect x="290" y="0" width="120" height="120" fill="#555"/>
  <rect x="290" y="200" width="120" height="120" fill="#555"/>
  <rect x="0" y="110" width="170" height="100" fill="#555"/>
  <rect x="530" y="110" width="170" height="100" fill="#555"/>

  <!-- Round about circle -->
  <circle cx="350" cy="160" r="120" fill="#555"/>
  <circle cx="350" cy="160" r="80" fill="#4a7c59"/>
  <circle cx="350" cy="160" r="65" fill="#16a34a"/>
  <circle cx="350" cy="160" r="45" fill="#4a7c59"/>
  <circle cx="350" cy="160" r="30" fill="#22c55e" opacity="0.7"/>
  <text x="350" y="168" text-anchor="middle" font-size="22">🌀</text>

  <!-- Lane markings on roundabout -->
  <circle cx="350" cy="160" r="100" fill="none" stroke="white" stroke-width="2" stroke-dasharray="25,15"/>

  <!-- Yield signs at entries (fixos) -->
  <polygon points="350,198 335,222 365,222" fill="white" stroke="#ef4444" stroke-width="2"/>
  <text x="350" y="218" text-anchor="middle" font-size="8" fill="#ef4444" font-weight="bold">▼</text>

  <!-- Carro azul DENTRO da rotatória girando -->
  <g class="car-inside">
    <rect x="326" y="80" width="50" height="22" rx="4" fill="#2563eb" transform="rotate(-90, 350, 100)"/>
    <circle cx="338" cy="102" r="5" fill="#0f172a"/>
    <circle cx="362" cy="102" r="5" fill="#0f172a"/>
    <!-- Seta mostrando direção anti-horária -->
    <text x="390" y="100" font-size="14" fill="#22c55e">↙</text>
  </g>

  <!-- Carro verde ENTRANDO — aguardando e depois entrando -->
  <g class="car-entering">
    <rect x="0" y="0" width="50" height="22" rx="4" fill="#16a34a"/>
    <rect x="6" y="-8" width="34" height="13" rx="3" fill="#22c55e"/>
    <circle cx="10" cy="22" r="6" fill="#0f172a"/>
    <circle cx="40" cy="22" r="6" fill="#0f172a"/>
    <text x="-2" y="-18" font-size="11">⏸ Cedendo</text>
  </g>

  <!-- Carro laranja SAINDO pela direita com pisca-pisca -->
  <g class="car-exiting">
    <rect x="0" y="0" width="50" height="22" rx="4" fill="#f59e0b"/>
    <rect x="6" y="-8" width="34" height="13" rx="3" fill="#fbbf24"/>
    <circle cx="10" cy="22" r="6" fill="#0f172a"/>
    <circle cx="40" cy="22" r="6" fill="#0f172a"/>
    <!-- Pisca-pisca aceso -->
    <rect class="exit-blink" x="45" y="4" width="7" height="10" rx="2" fill="#fbbf24"/>
    <text x="-5" y="-18" font-size="10">Saindo → pisca!</text>
  </g>

  <!-- Labels (fixos) -->
  <rect x="10" y="10" width="220" height="90" rx="8" fill="#1e293b" opacity="0.88"/>
  <text x="20" y="33" font-size="12" fill="#22c55e" font-weight="bold">🔄 ROTATÓRIA</text>
  <text x="20" y="52" font-size="11" fill="#f1f5f9">• Quem está DENTRO: preferência</text>
  <text x="20" y="70" font-size="11" fill="#f1f5f9">• Ao entrar: CEDA passagem</text>
  <text x="20" y="88" font-size="11" fill="#f1f5f9">• Ao sair: use o pisca-pisca</text>

  <rect x="470" y="10" width="220" height="70" rx="8" fill="#7f1d1d" opacity="0.88"/>
  <text x="480" y="30" font-size="12" fill="#ef4444" font-weight="bold">🚫 PROIBIDO</text>
  <text x="480" y="50" font-size="11" fill="#f1f5f9">• Circular mais de 1 vez</text>
  <text x="480" y="68" font-size="11" fill="#f1f5f9">• Parar dentro da rotatória</text>

  <rect x="10" y="295" width="680" height="22" rx="4" fill="#1e293b" opacity="0.85"/>
  <text x="350" y="310" font-size="11" fill="#bbf7d0" text-anchor="middle" font-weight="bold">🔄 Rotatória: fluxo anti-horário · Dentro tem preferência · Sempre sinalize ao sair!</text>
</svg>`
      }
    ]
  },
  {
    id: 'placas-visuais',
    icon: '🛑',
    title: 'Placas em Contexto Real',
    desc: 'Veja placas instaladas em vias reais com situações do cotidiano',
    scenes: [
      {
        id: 'placas-proibicao',
        title: 'Placas de Regulamentação (Proibição)',
        rule: 'Placas circulares com borda vermelha = proibição ou restrição. SEMPRE obedeça.',
        status: 'danger',
        svg: `<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      /* Carro verde obedece o limite — passa em velocidade correta */
      @keyframes obeyCar {
        0%   { transform: translateX(-80px); }
        100% { transform: translateX(800px); }
      }
      /* Velocímetro oscila mostrando 58km/h */
      @keyframes speedometer {
        0%,100% { transform: rotate(-30deg); }
        50%     { transform: rotate(-20deg); }
      }
      /* Placa de PARE pisca para chamar atenção */
      @keyframes parePulse {
        0%,100% { fill: #ef4444; }
        50%     { fill: #dc2626; }
      }
      /* Linhas da pista movem */
      @keyframes dashPlaca {
        0%   { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: -100; }
      }
      .obey-car    { animation: obeyCar 7s linear infinite; }
      .dash-placa  { animation: dashPlaca 1.5s linear infinite; }
      .pare-sign   { animation: parePulse 1s ease-in-out infinite; }
    </style>
  </defs>
  <rect width="700" height="320" fill="#e2e8f0"/>
  <rect x="0" y="210" width="700" height="110" fill="#4a7c59"/>
  <rect x="0" y="175" width="700" height="80" fill="#555"/>
  <line class="dash-placa" x1="0" y1="215" x2="700" y2="215" stroke="white" stroke-width="2" stroke-dasharray="30,20"/>
  <line x1="0" y1="177" x2="700" y2="177" stroke="#fbbf24" stroke-width="3"/>
  <line x1="0" y1="251" x2="700" y2="251" stroke="#fbbf24" stroke-width="3"/>

  <!-- Sign 1: Speed limit 60 -->
  <rect x="50" y="70" width="8" height="115" fill="#6b7280"/>
  <circle cx="54" cy="70" r="32" fill="white" stroke="#ef4444" stroke-width="7"/>
  <text x="54" y="78" text-anchor="middle" font-size="22" font-weight="bold" fill="#1e293b">60</text>
  <text x="54" y="120" text-anchor="middle" font-size="11" fill="#374151" font-weight="bold">Vel. Máxima</text>
  <text x="54" y="133" text-anchor="middle" font-size="11" fill="#374151">60 km/h</text>

  <!-- Sign 2: No overtaking -->
  <rect x="175" y="70" width="8" height="115" fill="#6b7280"/>
  <circle cx="179" cy="70" r="32" fill="white" stroke="#ef4444" stroke-width="7"/>
  <rect x="162" y="60" width="16" height="10" rx="2" fill="#1e293b"/>
  <rect x="168" y="72" width="16" height="10" rx="2" fill="#ef4444"/>
  <line x1="158" y1="52" x2="202" y2="90" stroke="#ef4444" stroke-width="4"/>
  <text x="179" y="120" text-anchor="middle" font-size="11" fill="#374151" font-weight="bold">Proibido</text>
  <text x="179" y="133" text-anchor="middle" font-size="11" fill="#374151">Ultrapassar</text>

  <!-- Sign 3: No parking -->
  <rect x="305" y="70" width="8" height="115" fill="#6b7280"/>
  <circle cx="309" cy="70" r="32" fill="white" stroke="#ef4444" stroke-width="7"/>
  <text x="309" y="78" text-anchor="middle" font-size="30" fill="#3b82f6" font-weight="bold">P</text>
  <line x1="288" y1="52" x2="332" y2="90" stroke="#ef4444" stroke-width="4"/>
  <text x="309" y="120" text-anchor="middle" font-size="11" fill="#374151" font-weight="bold">Proibido</text>
  <text x="309" y="133" text-anchor="middle" font-size="11" fill="#374151">Estacionar</text>

  <!-- Sign 4: PARE (octagonal) — pulsando -->
  <rect x="430" y="70" width="8" height="115" fill="#6b7280"/>
  <polygon class="pare-sign" points="434,38 452,38 466,52 466,90 452,104 434,104 420,90 420,52" fill="#ef4444"/>
  <text x="443" y="78" text-anchor="middle" font-size="18" font-weight="bold" fill="white">PARE</text>
  <text x="443" y="120" text-anchor="middle" font-size="11" fill="#374151" font-weight="bold">Parada</text>
  <text x="443" y="133" text-anchor="middle" font-size="11" fill="#374151">Obrigatória</text>

  <!-- Sign 5: Dê a preferência -->
  <rect x="555" y="70" width="8" height="115" fill="#6b7280"/>
  <polygon points="559,40 595,100 523,100" fill="white" stroke="#ef4444" stroke-width="6" transform="rotate(180, 559, 70)"/>
  <text x="559" y="120" text-anchor="middle" font-size="11" fill="#374151" font-weight="bold">Dê a</text>
  <text x="559" y="133" text-anchor="middle" font-size="11" fill="#374151">Preferência</text>

  <!-- Carro verde obedecendo o limite (animado) -->
  <g class="obey-car" transform="translateX(-80px)">
    <rect x="100" y="185" width="58" height="26" rx="4" fill="#16a34a"/>
    <rect x="107" y="175" width="38" height="14" rx="3" fill="#22c55e"/>
    <circle cx="111" cy="211" r="6" fill="#0f172a"/>
    <circle cx="146" cy="211" r="6" fill="#0f172a"/>
    <text x="104" y="169" font-size="10" fill="#22c55e">✅ 58 km/h</text>
  </g>

  <!-- Background info -->
  <rect x="10" y="8" width="680" height="40" rx="6" fill="#1e293b" opacity="0.85"/>
  <text x="350" y="30" text-anchor="middle" font-size="13" fill="#f8fafc" font-weight="bold">🛑 PLACAS CIRCULARES COM BORDA VERMELHA = REGULAMENTAÇÃO (Proibição/Restrição)</text>

  <rect x="10" y="295" width="680" height="22" rx="4" fill="#1e293b" opacity="0.85"/>
  <text x="350" y="310" font-size="11" fill="#fca5a5" text-anchor="middle" font-weight="bold">Ignorar placa de regulamentação = SEMPRE infração. Forma circular = regulamentação!</text>
</svg>`
      },
      {
        id: 'placas-advertencia',
        title: 'Placas de Advertência (Triangulares Amarelas)',
        rule: 'Placas triangulares amarelas = ATENÇÃO. Não proíbem, mas alertam sobre perigo à frente.',
        status: 'warning',
        svg: `<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      /* Carro roxo reduz velocidade ao se aproximar das placas */
      @keyframes carSlowDown {
        0%   { transform: translateX(-80px); }
        40%  { transform: translateX(130px); }
        70%  { transform: translateX(180px); }
        100% { transform: translateX(800px); }
      }
      /* Animal entra na pista (placa de animais) */
      @keyframes cowOnRoad {
        0%,30%  { transform: translate(432px, 205px); }
        50%     { transform: translate(432px, 195px); }
        70%     { transform: translate(432px, 185px); }
        80%,100%{ transform: translate(432px, 205px); }
      }
      /* Lombada: carro sobe e desce ao passar */
      @keyframes bumpCross {
        0%,45%  { transform: translate(200px, 185px) rotate(0deg); }
        55%     { transform: translate(260px, 180px) rotate(-3deg); }
        65%     { transform: translate(310px, 187px) rotate(3deg); }
        75%,100%{ transform: translate(380px, 185px) rotate(0deg); }
      }
      /* Placa de advertência pisca levemente */
      @keyframes warnGlow {
        0%,100% { opacity: 1; }
        50%     { opacity: 0.7; }
      }
      /* Linha pista move */
      @keyframes dashAdv {
        0%   { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: -100; }
      }
      .car-slow    { animation: carSlowDown 7s ease-in-out infinite; }
      .cow-road    { animation: cowOnRoad 6s ease-in-out infinite; }
      .bump-cross  { animation: bumpCross 5s ease-in-out infinite; }
      .warn-glow   { animation: warnGlow 1.5s ease-in-out infinite; }
      .dash-adv    { animation: dashAdv 1.5s linear infinite; }
    </style>
  </defs>
  <rect width="700" height="320" fill="#fef9c3"/>
  <rect x="0" y="210" width="700" height="110" fill="#4a7c59"/>
  <rect x="0" y="175" width="700" height="80" fill="#555"/>
  <line class="dash-adv" x1="0" y1="215" x2="700" y2="215" stroke="white" stroke-width="2" stroke-dasharray="30,20"/>
  <line x1="0" y1="177" x2="700" y2="177" stroke="#fbbf24" stroke-width="3"/>
  <line x1="0" y1="251" x2="700" y2="251" stroke="#fbbf24" stroke-width="3"/>

  <!-- Sign 1: Curva perigosa -->
  <rect x="60" y="60" width="8" height="125" fill="#6b7280"/>
  <polygon class="warn-glow" points="64,20 100,80 28,80" fill="#fbbf24" stroke="#1e293b" stroke-width="3"/>
  <path d="M52,50 Q64,35 76,50" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/>
  <text x="64" y="102" text-anchor="middle" font-size="11" fill="#374151" font-weight="bold">Curva</text>
  <text x="64" y="115" text-anchor="middle" font-size="11" fill="#374151">Perigosa</text>

  <!-- Sign 2: Zona escolar -->
  <rect x="185" y="60" width="8" height="125" fill="#6b7280"/>
  <polygon class="warn-glow" points="189,20 225,80 153,80" fill="#fbbf24" stroke="#1e293b" stroke-width="3"/>
  <text x="189" y="58" text-anchor="middle" font-size="22">🏫</text>
  <text x="189" y="102" text-anchor="middle" font-size="11" fill="#374151" font-weight="bold">Zona</text>
  <text x="189" y="115" text-anchor="middle" font-size="11" fill="#374151">Escolar</text>

  <!-- Sign 3: Lombada -->
  <rect x="310" y="60" width="8" height="125" fill="#6b7280"/>
  <polygon class="warn-glow" points="314,20 350,80 278,80" fill="#fbbf24" stroke="#1e293b" stroke-width="3"/>
  <path d="M297,56 Q314,44 331,56" fill="#1e293b" stroke="#1e293b" stroke-width="2"/>
  <text x="314" y="102" text-anchor="middle" font-size="11" fill="#374151" font-weight="bold">Lombada</text>
  <text x="314" y="115" text-anchor="middle" font-size="11" fill="#374151">à Frente</text>

  <!-- Sign 4: Animais -->
  <rect x="432" y="60" width="8" height="125" fill="#6b7280"/>
  <polygon class="warn-glow" points="436,20 472,80 400,80" fill="#fbbf24" stroke="#1e293b" stroke-width="3"/>
  <text x="436" y="58" text-anchor="middle" font-size="20">🐄</text>
  <text x="436" y="102" text-anchor="middle" font-size="11" fill="#374151" font-weight="bold">Animais</text>
  <text x="436" y="115" text-anchor="middle" font-size="11" fill="#374151">na Pista</text>

  <!-- Sign 5: Obras -->
  <rect x="555" y="60" width="8" height="125" fill="#6b7280"/>
  <polygon class="warn-glow" points="559,20 595,80 523,80" fill="#fbbf24" stroke="#1e293b" stroke-width="3"/>
  <text x="559" y="58" text-anchor="middle" font-size="20">🚧</text>
  <text x="559" y="102" text-anchor="middle" font-size="11" fill="#374151" font-weight="bold">Obras</text>
  <text x="559" y="115" text-anchor="middle" font-size="11" fill="#374151">à Frente</text>

  <!-- Lombada na pista (física) -->
  <ellipse cx="290" cy="215" rx="40" ry="6" fill="#fbbf24" opacity="0.8"/>

  <!-- Carro cruzando lombada (sobe e desce) -->
  <g class="bump-cross">
    <rect x="0" y="0" width="58" height="26" rx="4" fill="#7c3aed"/>
    <rect x="7" y="-9" width="38" height="14" rx="3" fill="#8b5cf6"/>
    <circle cx="11" cy="26" r="6" fill="#0f172a"/>
    <circle cx="46" cy="26" r="6" fill="#0f172a"/>
    <rect x="1" y="6" width="7" height="12" rx="2" fill="#ef4444"/>
    <text x="4" y="-18" font-size="10" fill="#8b5cf6">✅ Reduziu</text>
  </g>

  <!-- Vaca entrando na pista animada -->
  <g class="cow-road">
    <text x="0" y="0" font-size="22">🐄</text>
  </g>

  <rect x="10" y="8" width="680" height="40" rx="6" fill="#78350f" opacity="0.85"/>
  <text x="350" y="30" text-anchor="middle" font-size="13" fill="#fef08a" font-weight="bold">⚠️ PLACAS TRIANGULARES AMARELAS = ADVERTÊNCIA · Alerta de perigo, não proibição</text>

  <rect x="10" y="295" width="680" height="22" rx="4" fill="#1e293b" opacity="0.85"/>
  <text x="350" y="310" font-size="11" fill="#fef08a" text-anchor="middle" font-weight="bold">Ao ver placa de advertência: reduza a velocidade e aumente a atenção!</text>
</svg>`
      }
    ]
  },
  {
    id: 'ultrapassagem',
    icon: '🚗💨',
    title: 'Ultrapassagem — Quando Pode e Quando Não Pode',
    desc: 'Situações reais onde a ultrapassagem é permitida, proibida e perigosa',
    scenes: [
      {
        id: 'ultrapassagem-proibida',
        title: 'Locais Proibidos para Ultrapassar',
        rule: 'NUNCA ultrapasse em: curvas sem visibilidade, pontes, cruzamentos, linha contínua, faixa de pedestres.',
        status: 'danger',
        svg: `<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky4" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#7dd3fc"/>
      <stop offset="100%" stop-color="#bfdbfe"/>
    </linearGradient>
    <style>
      /* Carro cinza lento avança devagar */
      @keyframes slowGray {
        0%   { transform: translateX(-60px); }
        100% { transform: translateX(800px); }
      }
      /* Carro vermelho tenta ultrapassar na curva — sai da faixa com risco */
      @keyframes dangerOvertake {
        0%   { transform: translate(100px, 175px); }
        20%  { transform: translate(140px, 160px); }
        40%  { transform: translate(200px, 152px); }
        55%  { transform: translate(240px, 153px); }
        /* vê o carro vindo e recua em pânico */
        70%  { transform: translate(200px, 162px); }
        85%  { transform: translate(150px, 172px); }
        100% { transform: translate(100px, 175px); }
      }
      /* Carro roxo vindo no sentido contrário (ameaça) */
      @keyframes oncomingThreat {
        0%   { transform: translateX(400px); }
        55%  { transform: translateX(260px); }
        70%  { transform: translate(260px, -5px); }
        80%  { transform: translate(260px, -5px); }
        100% { transform: translateX(-100px); }
      }
      /* Símbolo de colisão aparece e some */
      @keyframes crashAppear {
        0%,45%  { opacity: 0; transform: scale(0.5); }
        55%,80% { opacity: 1; transform: scale(1.2); }
        100%    { opacity: 0; }
      }
      /* Linha pista move */
      @keyframes dashDang {
        0%   { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: -100; }
      }
      .slow-gray      { animation: slowGray 8s linear infinite; }
      .danger-ov      { animation: dangerOvertake 5s ease-in-out infinite; }
      .oncoming-thr   { animation: oncomingThreat 5s ease-in-out infinite; }
      .crash-appear   { animation: crashAppear 5s ease-in-out infinite; }
      .dash-dang      { animation: dashDang 1.5s linear infinite; }
    </style>
  </defs>
  <rect width="700" height="320" fill="url(#sky4)"/>
  <!-- Road -->
  <rect x="0" y="165" width="700" height="130" fill="#555"/>
  <rect x="0" y="160" width="700" height="8" fill="#6b7280"/>
  <rect x="0" y="290" width="700" height="8" fill="#6b7280"/>
  <!-- Linha amarela contínua (proibição de ultrapassar) -->
  <line x1="0" y1="210" x2="700" y2="210" stroke="#fbbf24" stroke-width="4"/>
  <!-- Curva/morro no fundo -->
  <ellipse cx="350" cy="165" rx="200" ry="40" fill="#4a7c59"/>
  <rect x="150" y="125" width="400" height="45" fill="#4a7c59"/>

  <!-- Carro cinza lento -->
  <g class="slow-gray" transform="translateX(-60px)">
    <rect x="220" y="175" width="58" height="26" rx="5" fill="#6b7280"/>
    <rect x="227" y="166" width="38" height="14" rx="3" fill="#9ca3af"/>
    <circle cx="231" cy="201" r="6" fill="#0f172a"/>
    <circle cx="266" cy="201" r="6" fill="#0f172a"/>
    <text x="218" y="160" font-size="9" fill="#6b7280">🐢 Lento</text>
  </g>

  <!-- Carro vermelho tentando ultrapassar na curva (vai e volta) -->
  <g class="danger-ov">
    <rect x="0" y="0" width="62" height="28" rx="5" fill="#dc2626"/>
    <rect x="8" y="-10" width="42" height="16" rx="3" fill="#ef4444"/>
    <rect x="10" y="-8" width="18" height="11" rx="2" fill="#fca5a5" opacity="0.8"/>
    <circle cx="12" cy="28" r="6" fill="#0f172a"/>
    <circle cx="50" cy="28" r="6" fill="#0f172a"/>
    <text x="5" y="-22" font-size="10" fill="#ef4444" font-weight="bold">🚫 Tentando ultrapassar na curva!</text>
  </g>

  <!-- Carro roxo vindo no sentido contrário -->
  <g class="oncoming-thr">
    <rect x="0" y="180" width="60" height="26" rx="5" fill="#7c3aed" transform="scale(-1,1) translate(-60,0)"/>
    <rect x="7" y="171" width="38" height="14" rx="3" fill="#8b5cf6" transform="scale(-1,1) translate(-60,0)"/>
    <circle cx="11" cy="206" r="6" fill="#0f172a"/>
    <circle cx="49" cy="206" r="6" fill="#0f172a"/>
    <text x="5" y="165" font-size="10" fill="#8b5cf6">⚠️ Outro carro vindo!</text>
  </g>

  <!-- Símbolo de colisão iminente -->
  <g class="crash-appear">
    <text x="230" y="165" text-anchor="middle" font-size="30">💥</text>
    <text x="230" y="145" text-anchor="middle" font-size="13" fill="#ef4444" font-weight="bold">COLISÃO FRONTAL!</text>
  </g>

  <!-- Legend boxes -->
  <rect x="10" y="10" width="340" height="130" rx="8" fill="#1e293b" opacity="0.9"/>
  <text x="20" y="32" font-size="12" fill="#ef4444" font-weight="bold">🚫 PROIBIDO ULTRAPASSAR EM:</text>
  <text x="20" y="52" font-size="11" fill="#f1f5f9">• Curvas e morros sem visibilidade total</text>
  <text x="20" y="70" font-size="11" fill="#f1f5f9">• Linha amarela contínua no centro</text>
  <text x="20" y="88" font-size="11" fill="#f1f5f9">• Pontes, viadutos e túneis</text>
  <text x="20" y="106" font-size="11" fill="#f1f5f9">• Cruzamentos e interseções</text>
  <text x="20" y="124" font-size="11" fill="#f1f5f9">• Próximo a faixas de pedestres</text>

  <rect x="360" y="10" width="330" height="130" rx="8" fill="#14532d" opacity="0.9"/>
  <text x="370" y="32" font-size="12" fill="#22c55e" font-weight="bold">✅ PODE ULTRAPASSAR QUANDO:</text>
  <text x="370" y="52" font-size="11" fill="#f1f5f9">• Linha amarela TRACEJADA</text>
  <text x="370" y="70" font-size="11" fill="#f1f5f9">• Visibilidade total da pista à frente</text>
  <text x="370" y="88" font-size="11" fill="#f1f5f9">• Espaço suficiente para a manobra</text>
  <text x="370" y="106" font-size="11" fill="#f1f5f9">• Pisca-pisca ligado antes</text>
  <text x="370" y="124" font-size="11" fill="#f1f5f9">• Retorno à faixa com segurança</text>

  <rect x="10" y="295" width="680" height="22" rx="4" fill="#7f1d1d" opacity="0.9"/>
  <text x="350" y="310" font-size="11" fill="#fca5a5" text-anchor="middle" font-weight="bold">💥 Ultrapassagem em curva é uma das maiores causas de acidentes fatais no Brasil!</text>
</svg>`
      }
    ]
  },
  {
    id: 'alcool-velocidade',
    icon: '🍺',
    title: 'Álcool, Velocidade e Celular',
    desc: 'As três infrações mais cobradas e mais perigosas no trânsito brasileiro',
    scenes: [
      {
        id: 'lei-seca-visual',
        title: 'Lei Seca — Tolerância ZERO no Brasil',
        rule: 'TOLERÂNCIA ZERO: qualquer nível de álcool detectado = R$2.934,70 + suspensão 12 meses. Acima de 0,6g/L = CRIME.',
        status: 'danger',
        svg: `<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      /* Carro bêbado ziguezagueia (simulando direção embriagada) */
      @keyframes drunkDrive {
        0%   { transform: translate(-80px, 182px) rotate(0deg); }
        15%  { transform: translate(0px, 175px) rotate(-5deg); }
        30%  { transform: translate(80px, 190px) rotate(4deg); }
        45%  { transform: translate(160px, 178px) rotate(-6deg); }
        60%  { transform: translate(230px, 195px) rotate(5deg); }
        75%  { transform: translate(290px, 178px) rotate(-3deg); }
        100% { transform: translate(310px, 182px) rotate(0deg); }
      }
      /* Blitz: luz de sirene da viatura pisca alternando azul/vermelho */
      @keyframes sirenBlue {
        0%,49%  { fill: #3b82f6; opacity: 1; }
        50%,100%{ fill: #3b82f6; opacity: 0.1; }
      }
      @keyframes sirenRed {
        0%,49%  { fill: #ef4444; opacity: 0.1; }
        50%,100%{ fill: #ef4444; opacity: 1; }
      }
      /* Bafômetro: ponteiro sobe ao medir álcool */
      @keyframes needleUp {
        0%,20%  { transform: rotate(-60deg); }
        60%,80% { transform: rotate(30deg); }
        100%    { transform: rotate(-60deg); }
      }
      /* Agente de trânsito aparece com bafômetro */
      @keyframes agentSignal {
        0%,30%  { transform: translate(320px, 170px); }
        50%,100%{ transform: translate(320px, 170px); }
      }
      /* Linhas de pista movem lentamente (blitz = trânsito lento) */
      @keyframes dashSlow {
        0%   { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: -100; }
      }
      .drunk-car   { animation: drunkDrive 4s ease-in-out infinite; }
      .siren-blue  { animation: sirenBlue 0.5s step-end infinite; }
      .siren-red   { animation: sirenRed 0.5s step-end infinite; }
      .needle      { transform-origin: 15px 28px; animation: needleUp 4s ease-in-out infinite; }
      .dash-slow   { animation: dashSlow 2s linear infinite; }
    </style>
  </defs>
  <rect width="700" height="320" fill="#0f172a"/>
  <!-- Night scene -->
  <rect x="0" y="220" width="700" height="100" fill="#374151"/>
  <rect x="0" y="175" width="700" height="95" fill="#4b5563"/>
  <line class="dash-slow" x1="0" y1="215" x2="700" y2="215" stroke="white" stroke-width="2" stroke-dasharray="30,20"/>
  <!-- City silhouette -->
  <rect x="0" y="120" width="80" height="60" fill="#1e293b"/>
  <rect x="10" y="100" width="50" height="80" fill="#1e293b"/>
  <rect x="600" y="110" width="100" height="70" fill="#1e293b"/>
  <rect x="620" y="90" width="60" height="90" fill="#1e293b"/>
  <rect x="550" y="130" width="70" height="50" fill="#1e293b"/>
  <!-- Windows -->
  <rect x="18" y="108" width="10" height="8" fill="#fef08a" opacity="0.5"/>
  <rect x="35" y="108" width="10" height="8" fill="#fef08a" opacity="0.8"/>
  <rect x="18" y="124" width="10" height="8" fill="#fef08a" opacity="0.3"/>
  <rect x="625" y="98" width="10" height="8" fill="#fef08a" opacity="0.7"/>
  <rect x="645" y="98" width="10" height="8" fill="#fef08a" opacity="0.4"/>

  <!-- Police checkpoint / Blitz -->
  <rect x="310" y="155" width="80" height="25" fill="#1d4ed8" opacity="0.9" rx="3"/>
  <text x="350" y="172" text-anchor="middle" font-size="12" fill="white" font-weight="bold">🚔 BLITZ</text>
  <!-- Sirene piscando -->
  <rect class="siren-blue" x="300" y="148" width="18" height="10" rx="3" fill="#3b82f6"/>
  <rect class="siren-red"  x="382" y="148" width="18" height="10" rx="3" fill="#ef4444"/>
  <!-- Police barrier -->
  <rect x="300" y="176" width="8" height="45" fill="#6b7280"/>
  <rect x="392" y="176" width="8" height="45" fill="#6b7280"/>
  <rect x="300" y="176" width="100" height="8" fill="#ef4444"/>
  <rect x="300" y="176" width="12" height="8" fill="white"/>
  <rect x="324" y="176" width="12" height="8" fill="white"/>
  <rect x="348" y="176" width="12" height="8" fill="white"/>
  <rect x="372" y="176" width="12" height="8" fill="white"/>

  <!-- Carro bêbado ziguezagueando -->
  <g class="drunk-car">
    <rect x="0" y="0" width="62" height="28" rx="5" fill="#dc2626"/>
    <rect x="8" y="-10" width="42" height="16" rx="3" fill="#ef4444"/>
    <rect x="10" y="-8" width="18" height="11" rx="2" fill="#fca5a5" opacity="0.8"/>
    <circle cx="12" cy="28" r="6" fill="#0f172a"/>
    <circle cx="50" cy="28" r="6" fill="#0f172a"/>
    <text x="5" y="-22" font-size="11" fill="#fbbf24">🍺 Bêbado</text>
  </g>

  <!-- Bafômetro animado -->
  <g transform="translate(460, 175)">
    <rect x="0" y="0" width="90" height="55" rx="6" fill="#1e293b"/>
    <rect x="4" y="4" width="82" height="47" rx="5" fill="#0f172a"/>
    <!-- Escala -->
    <rect x="8" y="8" width="74" height="22" rx="3" fill="#111827"/>
    <!-- Barras de nível -->
    <rect x="8" y="8"  width="24" height="22" rx="0" fill="#22c55e" opacity="0.8"/>
    <rect x="32" y="8" width="24" height="22" rx="0" fill="#f59e0b" opacity="0.8"/>
    <rect x="56" y="8" width="26" height="22" rx="0" fill="#ef4444" opacity="0.8"/>
    <text x="12" y="24" font-size="8" fill="white" font-weight="bold">0,0</text>
    <text x="36" y="24" font-size="8" fill="white">0,3</text>
    <text x="60" y="24" font-size="8" fill="white">0,6+</text>
    <!-- Ponteiro animado -->
    <g class="needle">
      <line x1="15" y1="28" x2="15" y2="42" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/>
      <circle cx="15" cy="42" r="3" fill="#fbbf24"/>
    </g>
    <text x="4" y="60" font-size="9" fill="#22c55e">Bafômetro</text>
  </g>

  <!-- Penalty boxes -->
  <rect x="10" y="10" width="280" height="140" rx="8" fill="#7f1d1d" opacity="0.95"/>
  <text x="20" y="33" font-size="12" fill="#ef4444" font-weight="bold">🍺 LEI SECA · TOLERÂNCIA ZERO</text>
  <text x="20" y="55" font-size="11" fill="#f1f5f9">• Qualquer álcool detectado:</text>
  <text x="20" y="72" font-size="11" fill="#fbbf24">  Multa: R$ 2.934,70</text>
  <text x="20" y="89" font-size="11" fill="#fbbf24">  Suspensão: 12 meses</text>
  <text x="20" y="106" font-size="11" fill="#fbbf24">  Retenção do veículo</text>
  <text x="20" y="123" font-size="11" fill="#ef4444">• Acima de 0,6g/L = CRIME!</text>
  <text x="20" y="140" font-size="11" fill="#ef4444">• Recusa ao bafômetro = mesma multa!</text>

  <rect x="10" y="295" width="680" height="22" rx="4" fill="#7f1d1d" opacity="0.9"/>
  <text x="350" y="310" font-size="11" fill="#fca5a5" text-anchor="middle" font-weight="bold">🍺 Dirigiu? Não bebeu. Bebeu? Não dirija. Tolerância ZERO no Brasil!</text>
</svg>`
      },
      {
        id: 'excesso-velocidade',
        title: 'Excesso de Velocidade — Distância de Frenagem',
        rule: 'A cada 10 km/h a mais, a distância de frenagem aumenta muito. A 100km/h, você precisa de 100m para parar.',
        status: 'warning',
        svg: `<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      /* Carro verde (60km/h) para rapidamente */
      @keyframes car60brake {
        0%   { transform: translateX(-60px); }
        50%  { transform: translateX(30px); }
        70%  { transform: translateX(60px); }
        100% { transform: translateX(60px); }
      }
      /* Carro amarelo (80km/h) para mais devagar */
      @keyframes car80brake {
        0%   { transform: translateX(-60px); }
        60%  { transform: translateX(100px); }
        80%  { transform: translateX(140px); }
        100% { transform: translateX(140px); }
      }
      /* Carro vermelho (100km/h) não consegue parar — bate no pedestre */
      @keyframes car100crash {
        0%   { transform: translateX(-60px); }
        70%  { transform: translateX(220px); }
        80%  { transform: translateX(260px); }
        85%  { transform: translateX(265px) rotate(5deg); }
        100% { transform: translateX(265px) rotate(5deg); }
      }
      /* Pedestre tenta fugir, mas tarde demais para o carro rápido */
      @keyframes pedFlee {
        0%,60%  { transform: translate(648px, 150px); }
        80%     { transform: translate(670px, 148px); }
        90%,100%{ transform: translate(672px, 148px); }
      }
      /* Impacto aparece */
      @keyframes impactFlash {
        0%,75%  { opacity: 0; }
        80%,90% { opacity: 1; }
        100%    { opacity: 0; }
      }
      /* Marcas de frenagem crescem */
      @keyframes skidGrow {
        0%,50%  { stroke-dashoffset: 200; }
        70%,100%{ stroke-dashoffset: 0; }
      }
      /* Linha pista move */
      @keyframes dashSpd {
        0%   { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: -100; }
      }
      .car-60  { animation: car60brake 5s ease-in-out infinite; }
      .car-80  { animation: car80brake 5s ease-in-out 0.3s infinite; }
      .car-100 { animation: car100crash 5s ease-in-out 0.1s infinite; }
      .ped-flee{ animation: pedFlee 5s ease-in-out infinite; }
      .impact  { animation: impactFlash 5s ease-in-out infinite; }
      .skid60  { stroke-dasharray: 80; animation: skidGrow 5s ease-in-out infinite; }
      .skid80  { stroke-dasharray: 130; animation: skidGrow 5s ease-in-out 0.3s infinite; }
      .skid100 { stroke-dasharray: 220; animation: skidGrow 5s ease-in-out 0.1s infinite; }
      .dash-spd{ animation: dashSpd 1.5s linear infinite; }
    </style>
  </defs>
  <rect width="700" height="320" fill="#0f172a"/>
  <rect x="0" y="180" width="700" height="140" fill="#374151"/>
  <rect x="0" y="140" width="700" height="90" fill="#4b5563"/>
  <line class="dash-spd" x1="0" y1="185" x2="700" y2="185" stroke="white" stroke-width="2" stroke-dasharray="30,20"/>
  <line class="dash-spd" x1="0" y1="225" x2="700" y2="225" stroke="white" stroke-width="2" stroke-dasharray="30,20"/>
  <line x1="0" y1="142" x2="700" y2="142" stroke="#fbbf24" stroke-width="3"/>
  <line x1="0" y1="228" x2="700" y2="228" stroke="#fbbf24" stroke-width="3"/>

  <!-- Info boxes (fixos) -->
  <rect x="20" y="50" width="120" height="62" rx="6" fill="#1e293b" opacity="0.9"/>
  <text x="80" y="72" text-anchor="middle" font-size="14" fill="#22c55e" font-weight="bold">60 km/h</text>
  <text x="80" y="90" text-anchor="middle" font-size="11" fill="#86efac">≈ 25m p/ parar</text>
  <text x="80" y="106" text-anchor="middle" font-size="10" fill="#86efac">≈ 0,8s reação</text>

  <rect x="200" y="40" width="120" height="66" rx="6" fill="#1e293b" opacity="0.9"/>
  <text x="260" y="63" text-anchor="middle" font-size="14" fill="#f59e0b" font-weight="bold">80 km/h</text>
  <text x="260" y="81" text-anchor="middle" font-size="11" fill="#fcd34d">≈ 50m p/ parar</text>
  <text x="260" y="98" text-anchor="middle" font-size="10" fill="#fcd34d">Dobra o risco!</text>

  <rect x="400" y="30" width="150" height="70" rx="6" fill="#1e293b" opacity="0.9"/>
  <text x="475" y="55" text-anchor="middle" font-size="14" fill="#ef4444" font-weight="bold">100 km/h</text>
  <text x="475" y="73" text-anchor="middle" font-size="11" fill="#fca5a5">≈ 100m p/ parar!</text>
  <text x="475" y="90" text-anchor="middle" font-size="10" fill="#fca5a5">4× mais perigoso!</text>

  <!-- Carro verde (60km/h) para -->
  <g class="car-60" transform="translateX(-60px)">
    <rect x="30" y="150" width="52" height="22" rx="4" fill="#22c55e"/>
    <rect x="36" y="142" width="35" height="13" rx="3" fill="#4ade80"/>
    <circle cx="40" cy="172" r="5" fill="#0f172a"/>
    <circle cx="72" cy="172" r="5" fill="#0f172a"/>
    <!-- Marcas de freio curtas -->
    <line class="skid60" x1="21" y1="172" x2="-60" y2="172" stroke="#6b7280" stroke-width="4" opacity="0.7"/>
    <text x="55" y="140" font-size="10" fill="#22c55e">25m</text>
  </g>

  <!-- Carro amarelo (80km/h) para mais longe -->
  <g class="car-80" transform="translateX(-60px)">
    <rect x="30" y="190" width="52" height="22" rx="4" fill="#f59e0b"/>
    <rect x="36" y="182" width="35" height="13" rx="3" fill="#fbbf24"/>
    <circle cx="40" cy="212" r="5" fill="#0f172a"/>
    <circle cx="72" cy="212" r="5" fill="#0f172a"/>
    <line class="skid80" x1="21" y1="212" x2="-120" y2="212" stroke="#6b7280" stroke-width="4" opacity="0.7"/>
    <text x="55" y="180" font-size="10" fill="#f59e0b">50m</text>
  </g>

  <!-- Carro vermelho (100km/h) não para -->
  <g class="car-100" transform="translateX(-60px)">
    <rect x="30" y="148" width="52" height="22" rx="4" fill="#dc2626"/>
    <rect x="36" y="140" width="35" height="13" rx="3" fill="#ef4444"/>
    <circle cx="40" cy="170" r="5" fill="#0f172a"/>
    <circle cx="72" cy="170" r="5" fill="#0f172a"/>
    <line class="skid100" x1="21" y1="170" x2="-220" y2="170" stroke="#7f1d1d" stroke-width="5" opacity="0.8"/>
    <text x="40" y="138" font-size="10" fill="#ef4444">100m!!!</text>
  </g>

  <!-- Pedestre tentando fugir -->
  <g class="ped-flee">
    <circle cx="0" cy="0" r="8" fill="#fcd34d"/>
    <rect x="-5" y="8" width="10" height="18" rx="2" fill="#3b82f6"/>
    <line x1="-3" y1="26" x2="-5" y2="38" stroke="#fcd34d" stroke-width="2"/>
    <line x1="3" y1="26" x2="6" y2="38" stroke="#fcd34d" stroke-width="2"/>
    <text x="-10" y="-12" font-size="10" fill="#ef4444">⚠️</text>
  </g>

  <!-- Impacto -->
  <g class="impact">
    <text x="630" y="165" font-size="28">💥</text>
  </g>

  <!-- Fine info box -->
  <rect x="10" y="248" width="680" height="50" rx="6" fill="#1e293b" opacity="0.9"/>
  <text x="350" y="267" text-anchor="middle" font-size="12" fill="#fbbf24" font-weight="bold">⚡ MULTAS POR EXCESSO DE VELOCIDADE</text>
  <text x="80" y="288" text-anchor="middle" font-size="11" fill="#22c55e">Até 20% acima: R$195,23 + 5pts</text>
  <text x="300" y="288" text-anchor="middle" font-size="11" fill="#f59e0b">20-50% acima: R$293,47 + 7pts</text>
  <text x="560" y="288" text-anchor="middle" font-size="11" fill="#ef4444">+50% acima: R$880,41 + suspensão!</text>

  <rect x="10" y="300" width="680" height="18" rx="4" fill="#7f1d1d" opacity="0.9"/>
  <text x="350" y="313" font-size="10" fill="#fca5a5" text-anchor="middle">A distância de frenagem aumenta ao quadrado com a velocidade — dobrar a vel. = 4× mais espaço para parar!</text>
</svg>`
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════
  // NOVA CATEGORIA — MANOBRAS E SITUAÇÕES REAIS
  // ════════════════════════════════════════════════════════════════
  {
    id: 'manobras-reais',
    icon: '🎯',
    title: 'Manobras e Situações Reais',
    desc: 'Cenários práticos do dia a dia: cruzamentos, rotatórias, conversões e estacionamento',
    scenes: [
      {
        id: 'cruzamento-sem-sinal',
        title: 'Cruzamento Sem Sinalização — Preferência da Direita',
        rule: 'Em cruzamento SEM placas, semáforo ou agente, a preferência é de quem vem pela DIREITA (CTB Art. 29, III). Reduza a velocidade ao se aproximar e observe.',
        status: 'warning',
        svg: `<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="skyCS" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#7dd3fc"/>
      <stop offset="100%" stop-color="#bae6fd"/>
    </linearGradient>
    <style>
      /* Carro vermelho (vem da DIREITA — tem preferência): movimento contínuo e suave */
      @keyframes carRedPriority {
        0%   { transform: translate(620px, 150px) rotate(180deg); }
        100% { transform: translate(80px,  150px) rotate(180deg); }
      }
      /* Carro azul (vem da ESQUERDA — deve ceder): aproxima, FREIA, espera, prossegue */
      @keyframes carBlueYield {
        0%   { transform: translate(-40px, 180px); }
        25%  { transform: translate(240px, 180px); }
        35%  { transform: translate(280px, 180px); }   /* freia */
        65%  { transform: translate(280px, 180px); }   /* espera */
        100% { transform: translate(720px, 180px); }   /* segue */
      }
      /* Luz de freio piscando ao parar */
      @keyframes brakeLight {
        0%, 24%   { opacity: 0; }
        25%, 64%  { opacity: 1; }
        65%, 100% { opacity: 0; }
      }
      /* Seta indicando preferência piscando */
      @keyframes arrowBlink {
        0%, 50%   { opacity: 1; transform: scale(1); }
        51%, 100% { opacity: 0.3; transform: scale(0.92); }
      }
      .car-red-prio  { animation: carRedPriority 5s linear infinite; }
      .car-blue-yld  { animation: carBlueYield 6s ease-in-out infinite; }
      .brake-light   { animation: brakeLight 6s ease-in-out infinite; }
      .arrow-blink   { animation: arrowBlink 1s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
    </style>
  </defs>

  <!-- Sky and ground -->
  <rect width="700" height="360" fill="url(#skyCS)"/>
  <rect y="220" width="700" height="140" fill="#86efac"/>
  <rect y="218" width="700" height="3" fill="#65a30d"/>

  <!-- Cross roads -->
  <rect y="140" width="700" height="100" fill="#444"/>
  <rect x="290" width="120" height="360" fill="#444"/>
  <!-- Lane stripes -->
  <line x1="0" y1="190" x2="280" y2="190" stroke="#fbbf24" stroke-width="2" stroke-dasharray="14 10"/>
  <line x1="420" y1="190" x2="700" y2="190" stroke="#fbbf24" stroke-width="2" stroke-dasharray="14 10"/>
  <line x1="350" y1="0" x2="350" y2="130" stroke="#fff" stroke-width="2" stroke-dasharray="12 10"/>
  <line x1="350" y1="250" x2="350" y2="360" stroke="#fff" stroke-width="2" stroke-dasharray="12 10"/>

  <!-- Buildings -->
  <rect x="30" y="60" width="220" height="80" fill="#94a3b8"/>
  <rect x="50" y="80" width="20" height="20" fill="#fbbf24"/>
  <rect x="90" y="80" width="20" height="20" fill="#fbbf24"/>
  <rect x="130" y="80" width="20" height="20" fill="#1e293b"/>
  <rect x="170" y="80" width="20" height="20" fill="#fbbf24"/>
  <rect x="210" y="80" width="20" height="20" fill="#1e293b"/>

  <rect x="450" y="50" width="220" height="90" fill="#a3a3a3"/>
  <rect x="470" y="70" width="20" height="20" fill="#1e293b"/>
  <rect x="510" y="70" width="20" height="20" fill="#fbbf24"/>
  <rect x="550" y="70" width="20" height="20" fill="#fbbf24"/>
  <rect x="590" y="70" width="20" height="20" fill="#1e293b"/>
  <rect x="630" y="70" width="20" height="20" fill="#fbbf24"/>

  <!-- Tree -->
  <circle cx="60" cy="290" r="25" fill="#16a34a"/>
  <rect x="56" y="300" width="8" height="30" fill="#78350f"/>
  <circle cx="640" cy="290" r="25" fill="#16a34a"/>
  <rect x="636" y="300" width="8" height="30" fill="#78350f"/>

  <!-- Priority arrow (right) -->
  <g class="arrow-blink">
    <polygon points="500,110 560,110 560,100 590,125 560,150 560,140 500,140" fill="#22c55e" stroke="#fff" stroke-width="2"/>
    <text x="545" y="130" text-anchor="middle" font-size="11" font-weight="bold" fill="#fff">PREFERÊNCIA</text>
  </g>

  <!-- Yield warning (left) -->
  <g class="arrow-blink" style="animation-delay:0.5s">
    <polygon points="200,250 140,250 140,240 110,265 140,290 140,280 200,280" fill="#ef4444" stroke="#fff" stroke-width="2"/>
    <text x="155" y="270" text-anchor="middle" font-size="11" font-weight="bold" fill="#fff">CEDA</text>
  </g>

  <!-- Red car (priority - from right going left) -->
  <g class="car-red-prio">
    <rect x="0" y="0" width="60" height="30" rx="5" fill="#dc2626" stroke="#7f1d1d" stroke-width="2"/>
    <rect x="10" y="5" width="40" height="12" rx="3" fill="#1e293b"/>
    <circle cx="12" cy="32" r="5" fill="#1e293b"/>
    <circle cx="48" cy="32" r="5" fill="#1e293b"/>
    <rect x="-2" y="10" width="4" height="6" fill="#fde047"/>
  </g>

  <!-- Blue car (yields - from left going right) -->
  <g class="car-blue-yld">
    <rect x="0" y="0" width="60" height="30" rx="5" fill="#3b82f6" stroke="#1e3a8a" stroke-width="2"/>
    <rect x="10" y="5" width="40" height="12" rx="3" fill="#1e293b"/>
    <circle cx="12" cy="32" r="5" fill="#1e293b"/>
    <circle cx="48" cy="32" r="5" fill="#1e293b"/>
    <rect x="58" y="10" width="4" height="6" fill="#fde047"/>
    <!-- Brake lights -->
    <rect class="brake-light" x="-3" y="8" width="4" height="6" fill="#ef4444"/>
    <rect class="brake-light" x="-3" y="18" width="4" height="6" fill="#ef4444"/>
  </g>
</svg>`
      },
      {
        id: 'rotatoria-avancada',
        title: 'Rotatória — Quem Entra Cede, Quem Está Dentro Passa',
        rule: 'Quem JÁ está circulando na rotatória tem preferência absoluta. Use pisca-pisca à DIREITA ao SAIR. Faixa externa = saídas próximas; faixa interna = saídas distantes.',
        status: 'info',
        svg: `<svg viewBox="0 0 700 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      /* Carro circulando na rotatória (preferência) */
      @keyframes carCircle {
        0%   { transform: rotate(0deg) translate(150px) rotate(0deg); }
        100% { transform: rotate(360deg) translate(150px) rotate(-360deg); }
      }
      /* Carro entrando — espera depois entra */
      @keyframes carEnter {
        0%   { transform: translate(-30px, 320px); }
        30%  { transform: translate(180px, 320px); }
        45%  { transform: translate(180px, 320px); } /* espera */
        100% { transform: translate(330px, 220px); } /* entra */
      }
      /* Pisca-pisca direito ao sair */
      @keyframes blinkerR {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
      .car-circ  { animation: carCircle 8s linear infinite; transform-origin: 350px 190px; }
      .car-enter { animation: carEnter 7s ease-in-out infinite; }
      .blinker   { animation: blinkerR 0.6s ease-in-out infinite; fill:#fbbf24; }
    </style>
  </defs>

  <!-- Background -->
  <rect width="700" height="380" fill="#86efac"/>

  <!-- Outer roundabout road -->
  <circle cx="350" cy="190" r="170" fill="none" stroke="#444" stroke-width="80"/>
  <circle cx="350" cy="190" r="170" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="10 8"/>
  <circle cx="350" cy="190" r="130" fill="none" stroke="#fff" stroke-width="2"/>

  <!-- Center island -->
  <circle cx="350" cy="190" r="80" fill="#16a34a"/>
  <circle cx="350" cy="190" r="60" fill="#22c55e"/>
  <text x="350" y="195" text-anchor="middle" font-size="36" fill="#fff">↻</text>

  <!-- Entry/exit arms -->
  <rect x="0"   y="160" width="180" height="60" fill="#444"/>
  <rect x="520" y="160" width="180" height="60" fill="#444"/>
  <rect x="320" y="0"   width="60"  height="140" fill="#444"/>
  <rect x="320" y="290" width="60"  height="90"  fill="#444"/>

  <!-- Lane markings on arms -->
  <line x1="0" y1="190" x2="170" y2="190" stroke="#fff" stroke-width="2" stroke-dasharray="10 8"/>
  <line x1="530" y1="190" x2="700" y2="190" stroke="#fff" stroke-width="2" stroke-dasharray="10 8"/>
  <line x1="350" y1="0" x2="350" y2="130" stroke="#fff" stroke-width="2" stroke-dasharray="10 8"/>
  <line x1="350" y1="295" x2="350" y2="380" stroke="#fff" stroke-width="2" stroke-dasharray="10 8"/>

  <!-- YIELD signs at entries -->
  <polygon points="180,150 220,150 200,185" fill="#fff" stroke="#dc2626" stroke-width="3"/>
  <text x="200" y="172" text-anchor="middle" font-size="9" font-weight="bold" fill="#dc2626">CEDA</text>

  <!-- Circulating car (priority) -->
  <g class="car-circ">
    <rect x="-25" y="-15" width="50" height="28" rx="4" fill="#22c55e" stroke="#14532d" stroke-width="2"/>
    <rect x="-18" y="-10" width="36" height="10" rx="2" fill="#1e293b"/>
    <circle cx="-15" cy="15" r="4" fill="#1e293b"/>
    <circle cx="15"  cy="15" r="4" fill="#1e293b"/>
    <!-- Right turn signal blinking - sinaliza a saída -->
    <rect class="blinker" x="22" y="-5" width="4" height="5"/>
  </g>

  <!-- Entering car (yields) -->
  <g class="car-enter">
    <rect x="0" y="0" width="50" height="28" rx="4" fill="#3b82f6" stroke="#1e3a8a" stroke-width="2"/>
    <rect x="7" y="3" width="36" height="10" rx="2" fill="#1e293b"/>
    <circle cx="10" cy="30" r="4" fill="#1e293b"/>
    <circle cx="40" cy="30" r="4" fill="#1e293b"/>
  </g>

  <!-- Legend -->
  <rect x="10" y="10" width="220" height="70" fill="#0f172a" opacity="0.85" rx="6"/>
  <circle cx="25" cy="30" r="6" fill="#22c55e"/>
  <text x="40" y="34" font-size="11" fill="#fff">Carro VERDE: já dentro = preferência</text>
  <circle cx="25" cy="50" r="6" fill="#3b82f6"/>
  <text x="40" y="54" font-size="11" fill="#fff">Carro AZUL: vai entrar = espera</text>
  <text x="25" y="72" font-size="10" fill="#fbbf24">⚠ Pisca direito ao SAIR — sempre!</text>
</svg>`
      },
      {
        id: 'conversao-esquerda',
        title: 'Conversão à Esquerda em Cruzamento',
        rule: 'Sinalize com pisca-pisca esquerdo 30m antes. Posicione-se na faixa mais à esquerda. Aguarde no centro do cruzamento se necessário, dando passagem aos veículos em sentido contrário.',
        status: 'warning',
        svg: `<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      /* Carro azul: aproxima, sinaliza, espera, vira */
      @keyframes carLeftTurn {
        0%   { transform: translate(20px, 220px); }
        20%  { transform: translate(280px, 220px); }
        35%  { transform: translate(330px, 200px) rotate(-20deg); }
        50%  { transform: translate(370px, 170px) rotate(-45deg); }
        65%  { transform: translate(385px, 140px) rotate(-70deg); }
        80%  { transform: translate(385px, 80px) rotate(-90deg); }
        100% { transform: translate(385px, 0px) rotate(-90deg); }
      }
      /* Carro vermelho oncoming - segue reto continuamente */
      @keyframes carOncoming {
        0%   { transform: translate(700px, 150px) rotate(180deg); }
        100% { transform: translate(-80px, 150px) rotate(180deg); }
      }
      /* Pisca esquerdo */
      @keyframes leftBlink {
        0%, 50% { opacity:1; fill:#fbbf24; }
        51%,100% { opacity:0.2; fill:#78350f; }
      }
      .car-lt { animation: carLeftTurn 7s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
      .car-onc { animation: carOncoming 4s linear infinite; }
      .blink-l { animation: leftBlink 0.5s steps(2) infinite; }
    </style>
  </defs>

  <!-- Sky -->
  <rect width="700" height="360" fill="#bae6fd"/>
  <!-- Ground -->
  <rect y="100" width="700" height="260" fill="#86efac"/>

  <!-- Horizontal road -->
  <rect y="140" width="700" height="120" fill="#444"/>
  <line x1="0" y1="200" x2="350" y2="200" stroke="#fbbf24" stroke-width="2"/>
  <line x1="420" y1="200" x2="700" y2="200" stroke="#fbbf24" stroke-width="2"/>

  <!-- Vertical road -->
  <rect x="350" width="70" height="360" fill="#444"/>
  <line x1="385" y1="0" x2="385" y2="130" stroke="#fff" stroke-width="2" stroke-dasharray="10 8"/>
  <line x1="385" y1="270" x2="385" y2="360" stroke="#fff" stroke-width="2" stroke-dasharray="10 8"/>

  <!-- Crosswalk -->
  <g fill="#fff">
    <rect x="340" y="135" width="6" height="10"/>
    <rect x="350" y="135" width="6" height="10"/>
    <rect x="360" y="135" width="6" height="10"/>
    <rect x="370" y="135" width="6" height="10"/>
    <rect x="380" y="135" width="6" height="10"/>
    <rect x="390" y="135" width="6" height="10"/>
    <rect x="400" y="135" width="6" height="10"/>
    <rect x="410" y="135" width="6" height="10"/>
    <rect x="420" y="135" width="6" height="10"/>
  </g>

  <!-- Blue car - turning left -->
  <g class="car-lt">
    <rect x="0" y="0" width="55" height="28" rx="5" fill="#3b82f6" stroke="#1e3a8a" stroke-width="2"/>
    <rect x="8" y="4" width="38" height="10" rx="2" fill="#1e293b"/>
    <circle cx="10" cy="30" r="4" fill="#1e293b"/>
    <circle cx="45" cy="30" r="4" fill="#1e293b"/>
    <rect x="53" y="6" width="4" height="5" fill="#fde047"/>
    <!-- Left blinker (front + rear) -->
    <rect class="blink-l" x="-3" y="6" width="4" height="5"/>
    <rect class="blink-l" x="-3" y="18" width="4" height="5"/>
  </g>

  <!-- Red oncoming car -->
  <g class="car-onc">
    <rect x="0" y="0" width="55" height="28" rx="5" fill="#dc2626" stroke="#7f1d1d" stroke-width="2"/>
    <rect x="9" y="4" width="38" height="10" rx="2" fill="#1e293b"/>
    <circle cx="10" cy="30" r="4" fill="#1e293b"/>
    <circle cx="45" cy="30" r="4" fill="#1e293b"/>
    <rect x="-3" y="10" width="4" height="6" fill="#fde047"/>
  </g>

  <!-- Arrow indicating left turn -->
  <path d="M 240 80 Q 240 60 300 60 L 360 60 L 360 50 L 390 65 L 360 80 L 360 70 L 240 70 Z" fill="#22c55e" opacity="0.7"/>
  <text x="300" y="100" font-size="11" fill="#14532d" font-weight="bold">Conversão à esquerda</text>

  <!-- Legend -->
  <rect x="10" y="280" width="280" height="70" fill="#0f172a" opacity="0.85" rx="6"/>
  <text x="20" y="298" font-size="11" font-weight="bold" fill="#fbbf24">⚠ Antes de virar à esquerda:</text>
  <text x="20" y="313" font-size="10" fill="#fff">1. Pisca esquerdo 30m antes</text>
  <text x="20" y="327" font-size="10" fill="#fff">2. Posicione-se à esquerda da faixa</text>
  <text x="20" y="341" font-size="10" fill="#fff">3. Aguarde veículos em sentido contrário</text>
</svg>`
      },
      {
        id: 'estacionamento-paralelo',
        title: 'Estacionamento Paralelo (Baliza)',
        rule: '1) Pare ao lado do carro à frente, espelhos alinhados, 50cm de distância. 2) Engate a ré, gire o volante TOTALMENTE para a direita. 3) Quando o farol traseiro alinhar com o para-choque do carro à frente, ENDIREITE o volante. 4) Continue ré e, ao tocar o ângulo certo, gire para a esquerda.',
        status: 'info',
        svg: `<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      /* Carro fazendo baliza — 4 fases sincronizadas */
      @keyframes parking {
        0%   { transform: translate(380px, 90px) rotate(0deg); }     /* lado do carro à frente */
        15%  { transform: translate(380px, 90px) rotate(0deg); }
        35%  { transform: translate(360px, 105px) rotate(15deg); }   /* gira direita, recua */
        55%  { transform: translate(330px, 130px) rotate(30deg); }
        70%  { transform: translate(310px, 150px) rotate(15deg); }   /* endireita */
        85%  { transform: translate(305px, 165px) rotate(0deg); }    /* alinhado */
        100% { transform: translate(305px, 165px) rotate(0deg); }    /* estacionado */
      }
      /* Setas guia piscando */
      @keyframes hint1 { 0%,30% { opacity:1; } 31%,100% { opacity:0; } }
      @keyframes hint2 { 0%,30% { opacity:0; } 31%,55% { opacity:1; } 56%,100% { opacity:0; } }
      @keyframes hint3 { 0%,55% { opacity:0; } 56%,85% { opacity:1; } 86%,100% { opacity:0; } }
      @keyframes hint4 { 0%,85% { opacity:0; } 86%,100% { opacity:1; } }
      .park-car { animation: parking 8s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
      .h1 { animation: hint1 8s ease-in-out infinite; }
      .h2 { animation: hint2 8s ease-in-out infinite; }
      .h3 { animation: hint3 8s ease-in-out infinite; }
      .h4 { animation: hint4 8s ease-in-out infinite; }
      /* Luz de ré */
      @keyframes reverseLight { 0%,15% { opacity:0;} 16%,85% { opacity:1;} 86%,100% {opacity:0;} }
      .rev-light { animation: reverseLight 8s ease-in-out infinite; fill:#fff; }
    </style>
  </defs>

  <!-- Sky and sidewalk -->
  <rect width="700" height="320" fill="#0f172a"/>
  <rect y="80" width="700" height="190" fill="#475569"/>
  <rect y="270" width="700" height="50" fill="#94a3b8"/>
  <line x1="0" y1="80" x2="700" y2="80" stroke="#fff" stroke-width="2"/>
  <line x1="0" y1="270" x2="700" y2="270" stroke="#fff" stroke-width="2"/>

  <!-- Lane line center -->
  <line x1="0" y1="60" x2="700" y2="60" stroke="#fbbf24" stroke-width="2" stroke-dasharray="14 10"/>

  <!-- Parked car in front -->
  <g transform="translate(200,160)">
    <rect width="100" height="38" rx="6" fill="#dc2626" stroke="#7f1d1d" stroke-width="2"/>
    <rect x="12" y="6" width="76" height="14" rx="3" fill="#1e293b"/>
    <circle cx="20" cy="40" r="6" fill="#1e293b"/>
    <circle cx="80" cy="40" r="6" fill="#1e293b"/>
  </g>

  <!-- Parked car behind (target spot AFTER) -->
  <g transform="translate(440,160)">
    <rect width="100" height="38" rx="6" fill="#22c55e" stroke="#14532d" stroke-width="2"/>
    <rect x="12" y="6" width="76" height="14" rx="3" fill="#1e293b"/>
    <circle cx="20" cy="40" r="6" fill="#1e293b"/>
    <circle cx="80" cy="40" r="6" fill="#1e293b"/>
  </g>

  <!-- Parking spot guide (between red and green cars) -->
  <rect x="305" y="155" width="125" height="48" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="6 5" rx="4"/>

  <!-- Maneuvering car (blue) -->
  <g class="park-car">
    <rect x="0" y="0" width="100" height="38" rx="6" fill="#3b82f6" stroke="#1e3a8a" stroke-width="2"/>
    <rect x="12" y="6" width="76" height="14" rx="3" fill="#1e293b"/>
    <circle cx="20" cy="40" r="6" fill="#1e293b"/>
    <circle cx="80" cy="40" r="6" fill="#1e293b"/>
    <rect x="-3" y="8" width="4" height="6" fill="#fde047"/>
    <rect x="-3" y="24" width="4" height="6" fill="#fde047"/>
    <!-- Reverse white light -->
    <rect class="rev-light" x="98" y="14" width="5" height="10"/>
  </g>

  <!-- Step hints -->
  <g class="h1">
    <rect x="20" y="20" width="180" height="35" rx="6" fill="#1e293b" stroke="#fbbf24" stroke-width="1"/>
    <text x="30" y="42" font-size="13" fill="#fbbf24" font-weight="bold">1️⃣ Alinhe espelhos</text>
  </g>
  <g class="h2">
    <rect x="20" y="20" width="220" height="35" rx="6" fill="#1e293b" stroke="#fbbf24" stroke-width="1"/>
    <text x="30" y="42" font-size="13" fill="#fbbf24" font-weight="bold">2️⃣ Ré + volante p/ direita</text>
  </g>
  <g class="h3">
    <rect x="20" y="20" width="240" height="35" rx="6" fill="#1e293b" stroke="#fbbf24" stroke-width="1"/>
    <text x="30" y="42" font-size="13" fill="#fbbf24" font-weight="bold">3️⃣ Endireite o volante</text>
  </g>
  <g class="h4">
    <rect x="20" y="20" width="220" height="35" rx="6" fill="#1e293b" stroke="#22c55e" stroke-width="1"/>
    <text x="30" y="42" font-size="13" fill="#22c55e" font-weight="bold">✅ Estacionado!</text>
  </g>
</svg>`
      }
    ]
  }
];

// ─────────────────────────────────────────────────────
// RENDERER DO MÓDULO VISUAL
// ─────────────────────────────────────────────────────

let vsCurrentCategory = null;
let vsCurrentScene    = null;

function renderVisualModule() {
  const sec = document.getElementById('sec-visual');
  if (!sec) return;

  sec.innerHTML = `
    <div class="section-title">🖼️ Guia Visual de Trânsito</div>
    <div class="section-sub">Cenas interativas com veículos, vias, placas e situações reais</div>

    <!-- Category selector -->
    <div id="vs-cats" style="display:flex;gap:.5rem;margin-bottom:1.5rem;flex-wrap:wrap"></div>

    <!-- Category home grid -->
    <div id="vs-home" class="modules-grid" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr))"></div>

    <!-- Scene viewer -->
    <div id="vs-scene-view" style="display:none">
      <button class="back-btn" onclick="vsBackToCategory()">← Voltar</button>
      <div id="vs-scene-inner"></div>
    </div>
  `;

  renderVsCategoryButtons();
  renderVsHome();
}

function renderVsCategoryButtons() {
  const el = document.getElementById('vs-cats');
  if (!el) return;
  let html = `<button class="scenario-btn active" onclick="vsFilterCat('todas', this)">Todas</button>`;
  VISUAL_SCENES.forEach(cat => {
    html += `<button class="scenario-btn" onclick="vsFilterCat('${cat.id}', this)">${cat.icon} ${cat.title}</button>`;
  });
  el.innerHTML = html;
}

function vsFilterCat(id, btn) {
  document.querySelectorAll('#vs-cats .scenario-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  vsCurrentCategory = id === 'todas' ? null : id;
  renderVsHome();
}

function renderVsHome() {
  const grid = document.getElementById('vs-home');
  if (!grid) return;

  const cats = vsCurrentCategory
    ? VISUAL_SCENES.filter(c => c.id === vsCurrentCategory)
    : VISUAL_SCENES;

  let html = '';
  cats.forEach(cat => {
    cat.scenes.forEach(scene => {
      const borderColor = scene.status === 'danger' ? '#ef4444' :
                          scene.status === 'warning' ? '#f59e0b' :
                          scene.status === 'ok'      ? '#22c55e' : '#3b82f6';
      html += `
        <div class="module-card" onclick="vsOpenScene('${cat.id}','${scene.id}')"
          style="border-left:4px solid ${borderColor};cursor:pointer">
          <div class="module-icon">${cat.icon}</div>
          <div class="module-title" style="font-size:.9rem">${scene.title}</div>
          <div class="module-desc" style="font-size:.78rem;margin-top:.4rem;color:var(--muted)">${scene.rule.substring(0,80)}...</div>
          <div style="margin-top:.8rem;font-size:.72rem;color:${borderColor};font-weight:600;text-transform:uppercase">
            ${ scene.status === 'danger'  ? '⛔ Infração/Perigo' :
               scene.status === 'warning' ? '⚠️ Atenção'          :
               scene.status === 'ok'      ? '✅ Correto'           : 'ℹ️ Informação' }
          </div>
        </div>`;
    });
  });
  grid.innerHTML = html;
}

function vsOpenScene(catId, sceneId) {
  const cat   = VISUAL_SCENES.find(c => c.id === catId);
  const scene = cat ? cat.scenes.find(s => s.id === sceneId) : null;
  if (!scene) return;

  vsCurrentScene = scene;
  document.getElementById('vs-home').style.display = 'none';
  document.getElementById('vs-cats').style.display = 'none';
  document.getElementById('vs-scene-view').style.display = 'block';

  const statusColor = scene.status === 'danger'  ? '#ef4444' :
                      scene.status === 'warning'  ? '#f59e0b' :
                      scene.status === 'ok'       ? '#22c55e' : '#3b82f6';
  const statusLabel = scene.status === 'danger'  ? '⛔ Infração/Perigo' :
                      scene.status === 'warning'  ? '⚠️ Atenção'          :
                      scene.status === 'ok'       ? '✅ Correto'           : 'ℹ️ Informação';

  const allInCat = cat.scenes;
  const idx = allInCat.findIndex(s => s.id === sceneId);
  const prevScene = idx > 0 ? allInCat[idx-1] : null;
  const nextScene = idx < allInCat.length - 1 ? allInCat[idx+1] : null;

  const allScenes = VISUAL_SCENES.flatMap(c => c.scenes.map(s => ({...s, catId: c.id})));
  const globalIdx = allScenes.findIndex(s => s.id === sceneId && s.catId === catId);
  const globalPrev = globalIdx > 0 ? allScenes[globalIdx-1] : null;
  const globalNext = globalIdx < allScenes.length-1 ? allScenes[globalIdx+1] : null;

  document.getElementById('vs-scene-inner').innerHTML = `
    <div class="lesson-area" style="max-width:900px;margin:0 auto">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.2rem;flex-wrap:wrap">
        <div style="font-size:1.05rem;font-weight:700;color:var(--fg)">${scene.title}</div>
        <span style="background:${statusColor}22;color:${statusColor};border:1px solid ${statusColor};
          padding:.2rem .7rem;border-radius:99px;font-size:.75rem;font-weight:700">${statusLabel}</span>
      </div>

      <!-- SVG scene -->
      <div style="border-radius:12px;overflow:hidden;border:2px solid ${statusColor}44;
        box-shadow:0 0 30px ${statusColor}22;margin-bottom:1.2rem;background:#0a0e1a">
        ${scene.svg}
      </div>

      <!-- Rule box -->
      <div class="${scene.status === 'danger' ? 'warn-box' : scene.status === 'warning' ? 'highlight-box' : 'info-box'}"
        style="margin-bottom:1rem;font-size:.9rem;line-height:1.7">
        <strong>📋 Regra do CTB:</strong> ${scene.rule}
      </div>

      <!-- TTS narration -->
      <div style="margin-bottom:1.5rem">
        <button class="sim-btn" id="vs-tts-btn" onclick="vsToggleSceneTTS()"
          style="font-size:.85rem;padding:.55rem 1.1rem;display:inline-flex;align-items:center;gap:.5rem">
          🔊 <span id="vs-tts-label">Ouvir regra em voz alta</span>
        </button>
      </div>

      <!-- Navigation -->
      <div style="display:flex;gap:.8rem;justify-content:space-between;flex-wrap:wrap">
        ${globalPrev ? `<button class="sim-btn" onclick="vsOpenScene('${globalPrev.catId}','${globalPrev.id}')"
          style="font-size:.8rem;padding:.6rem 1.2rem">← Anterior</button>` : '<div></div>'}
        ${globalNext ? `<button class="sim-btn sim-btn-primary" onclick="vsOpenScene('${globalNext.catId}','${globalNext.id}')"
          style="font-size:.8rem;padding:.6rem 1.2rem">Próxima Cena →</button>` : '<div></div>'}
      </div>
    </div>
  `;

  document.getElementById('vs-scene-view').scrollIntoView({ behavior:'smooth' });
}

// ─────────────────────────────────────────────────────
// TTS por cena — narra título + regra usando speechSynthesis nativo
// ─────────────────────────────────────────────────────
function vsToggleSceneTTS() {
  if (!('speechSynthesis' in window)) {
    alert('Seu navegador não suporta narração por voz.');
    return;
  }
  const synth = window.speechSynthesis;
  const label = document.getElementById('vs-tts-label');

  if (synth.speaking) {
    synth.cancel();
    if (label) label.textContent = 'Ouvir regra em voz alta';
    return;
  }
  if (!vsCurrentScene) return;

  const tmp = document.createElement('div');
  tmp.innerHTML = vsCurrentScene.rule || '';
  const ruleText = tmp.textContent || tmp.innerText || '';
  const text = `${vsCurrentScene.title}. ${ruleText}`;

  const utter = new SpeechSynthesisUtterance(text);
  const lang = (typeof currentLang !== 'undefined' && currentLang === 'en') ? 'en-US'
            : (typeof currentLang !== 'undefined' && currentLang === 'fr') ? 'fr-FR'
            : 'pt-BR';
  utter.lang = lang;
  utter.rate = 1.0;
  utter.pitch = 1.0;

  const voices = synth.getVoices();
  const match = voices.find(v => v.lang && v.lang.toLowerCase().startsWith(lang.toLowerCase().slice(0,2)));
  if (match) utter.voice = match;

  utter.onstart = () => { if (label) label.textContent = '⏹ Parar narração'; };
  utter.onend   = () => { if (label) label.textContent = 'Ouvir regra em voz alta'; };
  utter.onerror = () => { if (label) label.textContent = 'Ouvir regra em voz alta'; };

  synth.speak(utter);
}

function vsBackToCategory() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  document.getElementById('vs-home').style.display = '';
  document.getElementById('vs-cats').style.display = '';
  document.getElementById('vs-scene-view').style.display = 'none';
  vsCurrentScene = null;
}