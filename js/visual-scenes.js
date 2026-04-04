// =====================================================================
// CNH Brasil · Módulo Visual de Trânsito
// Cenas SVG interativas com veículos, vias, placas e situações reais
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
  <!-- Sky -->
  <defs>
    <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#87ceeb"/>
      <stop offset="100%" stop-color="#c8e8f5"/>
    </linearGradient>
    <linearGradient id="road1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#555"/>
      <stop offset="100%" stop-color="#444"/>
    </linearGradient>
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
  <!-- Lane markings - right side dashed white -->
  <line x1="0" y1="180" x2="700" y2="180" stroke="white" stroke-width="2" stroke-dasharray="30,20"/>
  <line x1="0" y1="240" x2="700" y2="240" stroke="white" stroke-width="2" stroke-dasharray="30,20"/>
  <!-- CENTER LINE - continuous yellow (the key element) -->
  <line x1="0" y1="210" x2="700" y2="210" stroke="#fbbf24" stroke-width="5"/>
  <!-- Lane arrows -->
  <text x="120" y="202" fill="white" font-size="18" opacity="0.4">→</text>
  <text x="120" y="234" fill="white" font-size="18" opacity="0.4">→</text>
  <text x="500" y="202" fill="white" font-size="18" opacity="0.4">←</text>
  <text x="500" y="234" fill="white" font-size="18" opacity="0.4">←</text>
  
  <!-- Car 1 (blue, correct side) -->
  <g transform="translate(80,178)">
    <rect x="0" y="0" width="62" height="28" rx="5" fill="#2563eb"/>
    <rect x="8" y="-10" width="42" height="16" rx="3" fill="#3b82f6"/>
    <rect x="10" y="-8" width="18" height="11" rx="2" fill="#93c5fd" opacity="0.8"/>
    <rect x="32" y="-8" width="16" height="11" rx="2" fill="#93c5fd" opacity="0.8"/>
    <circle cx="12" cy="28" r="6" fill="#1e293b"/>
    <circle cx="12" cy="28" r="3" fill="#475569"/>
    <circle cx="50" cy="28" r="6" fill="#1e293b"/>
    <circle cx="50" cy="28" r="3" fill="#475569"/>
    <rect x="1" y="8" width="6" height="10" rx="2" fill="#fef08a"/>
    <rect x="55" y="8" width="6" height="10" rx="2" fill="#ef4444"/>
    <!-- Green checkmark -->
    <text x="20" y="-20" font-size="16">✅</text>
  </g>

  <!-- Car 2 (red, WRONG - crossing the line) -->
  <g transform="translate(400,178)">
    <rect x="0" y="0" width="62" height="28" rx="5" fill="#dc2626"/>
    <rect x="8" y="-10" width="42" height="16" rx="3" fill="#ef4444"/>
    <rect x="10" y="-8" width="18" height="11" rx="2" fill="#fca5a5" opacity="0.8"/>
    <rect x="32" y="-8" width="16" height="11" rx="2" fill="#fca5a5" opacity="0.8"/>
    <circle cx="12" cy="28" r="6" fill="#1e293b"/>
    <circle cx="12" cy="28" r="3" fill="#475569"/>
    <circle cx="50" cy="28" r="6" fill="#1e293b"/>
    <circle cx="50" cy="28" r="3" fill="#475569"/>
    <!-- Car arrow showing it's crossing -->
    <text x="15" y="-22" font-size="14">🚫</text>
    <!-- X marks violation -->
    <text x="20" y="-35" font-size="11" fill="#ef4444" font-weight="bold">PROIBIDO!</text>
  </g>
  
  <!-- Phantom car coming from opposite direction -->
  <g transform="translate(480,213)">
    <rect x="0" y="0" width="55" height="25" rx="4" fill="#7c3aed"/>
    <rect x="6" y="-8" width="38" height="14" rx="3" fill="#8b5cf6"/>
    <rect x="8" y="-6" width="15" height="9" rx="2" fill="#c4b5fd" opacity="0.8"/>
    <rect x="27" y="-6" width="14" height="9" rx="2" fill="#c4b5fd" opacity="0.8"/>
    <circle cx="10" cy="25" r="5" fill="#1e293b"/>
    <circle cx="44" cy="25" r="5" fill="#1e293b"/>
    <rect x="49" y="6" width="5" height="9" rx="2" fill="#fef08a"/>
  </g>

  <!-- Label callouts -->
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
  </defs>
  <rect width="700" height="320" fill="url(#sky2)"/>
  <rect x="0" y="200" width="700" height="120" fill="#4a7c59"/>
  <rect x="0" y="145" width="700" height="130" fill="#555"/>
  <rect x="0" y="145" width="700" height="5" fill="#f59e0b" opacity="0.5"/>
  <rect x="0" y="270" width="700" height="5" fill="#f59e0b" opacity="0.5"/>
  <line x1="0" y1="178" x2="700" y2="178" stroke="white" stroke-width="2" stroke-dasharray="30,20"/>
  <line x1="0" y1="242" x2="700" y2="242" stroke="white" stroke-width="2" stroke-dasharray="30,20"/>
  <!-- CENTER dashed yellow -->
  <line x1="0" y1="210" x2="700" y2="210" stroke="#fbbf24" stroke-width="4" stroke-dasharray="40,25"/>
  
  <!-- Car 1 (blue, overtaking correctly) -->
  <g transform="translate(300,148)">
    <rect x="0" y="0" width="62" height="28" rx="5" fill="#16a34a"/>
    <rect x="8" y="-10" width="42" height="16" rx="3" fill="#22c55e"/>
    <rect x="10" y="-8" width="18" height="11" rx="2" fill="#bbf7d0" opacity="0.8"/>
    <rect x="32" y="-8" width="16" height="11" rx="2" fill="#bbf7d0" opacity="0.8"/>
    <circle cx="12" cy="28" r="6" fill="#1e293b"/>
    <circle cx="12" cy="28" r="3" fill="#475569"/>
    <circle cx="50" cy="28" r="6" fill="#1e293b"/>
    <circle cx="50" cy="28" r="3" fill="#475569"/>
    <!-- Blinker on -->
    <rect x="55" y="2" width="7" height="10" rx="2" fill="#fbbf24"/>
    <text x="5" y="-20" font-size="15">✅</text>
  </g>
  <!-- Slow car being overtaken -->
  <g transform="translate(120,215)">
    <rect x="0" y="0" width="55" height="26" rx="4" fill="#94a3b8"/>
    <rect x="6" y="-8" width="38" height="14" rx="3" fill="#cbd5e1"/>
    <circle cx="10" cy="26" r="5" fill="#1e293b"/>
    <circle cx="44" cy="26" r="5" fill="#1e293b"/>
    <text x="10" y="-18" font-size="10" fill="#64748b">🐢 Lento</text>
  </g>
  
  <!-- Visibility arrows showing clear road ahead -->
  <text x="450" y="175" font-size="22" fill="#22c55e">→→→</text>
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
  
  <!-- Pedestrian walking -->
  <g transform="translate(330,188)">
    <circle cx="0" cy="0" r="10" fill="#fcd34d"/>
    <rect x="-5" y="10" width="10" height="20" rx="3" fill="#3b82f6"/>
    <line x1="-5" y1="18" x2="-15" y2="28" stroke="#fcd34d" stroke-width="3" stroke-linecap="round"/>
    <line x1="5" y1="18" x2="12" y2="26" stroke="#fcd34d" stroke-width="3" stroke-linecap="round"/>
    <line x1="-3" y1="30" x2="-5" y2="44" stroke="#fcd34d" stroke-width="3" stroke-linecap="round"/>
    <line x1="3" y1="30" x2="7" y2="44" stroke="#fcd34d" stroke-width="3" stroke-linecap="round"/>
    <text x="-8" y="-18" font-size="14">🚶</text>
  </g>
  <!-- Another pedestrian -->
  <g transform="translate(370,215)">
    <circle cx="0" cy="0" r="9" fill="#fbbf24"/>
    <rect x="-5" y="9" width="10" height="18" rx="3" fill="#ec4899"/>
    <line x1="-3" y1="27" x2="-5" y2="38" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/>
    <line x1="3" y1="27" x2="6" y2="38" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/>
  </g>
  
  <!-- Car stopped correctly -->
  <g transform="translate(120,205)">
    <rect x="0" y="0" width="62" height="28" rx="5" fill="#2563eb"/>
    <rect x="8" y="-10" width="42" height="16" rx="3" fill="#3b82f6"/>
    <rect x="10" y="-8" width="18" height="11" rx="2" fill="#93c5fd" opacity="0.8"/>
    <rect x="32" y="-8" width="16" height="11" rx="2" fill="#93c5fd" opacity="0.8"/>
    <circle cx="12" cy="28" r="6" fill="#1e293b"/>
    <circle cx="50" cy="28" r="6" fill="#1e293b"/>
    <!-- Stop signal -->
    <text x="3" y="-20" font-size="16">✅ PAROU</text>
  </g>
  
  <!-- Car wrongly on top of crosswalk -->
  <g transform="translate(475,205)" opacity="0.7">
    <rect x="0" y="0" width="60" height="27" rx="5" fill="#dc2626"/>
    <rect x="7" y="-9" width="40" height="15" rx="3" fill="#ef4444"/>
    <rect x="9" y="-7" width="16" height="10" rx="2" fill="#fca5a5" opacity="0.8"/>
    <rect x="30" y="-7" width="15" height="10" rx="2" fill="#fca5a5" opacity="0.8"/>
    <circle cx="11" cy="27" r="5" fill="#1e293b"/>
    <circle cx="48" cy="27" r="5" fill="#1e293b"/>
    <text x="5" y="-20" font-size="11" fill="#dc2626" font-weight="bold">🚫 SOBRE A FAIXA!</text>
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
  </defs>
  <rect width="700" height="340" fill="#1e293b"/>
  <!-- Night scene -->
  <rect x="0" y="220" width="700" height="120" fill="#374151"/>
  <!-- Road -->
  <rect x="0" y="160" width="700" height="140" fill="#4b5563"/>
  <!-- Lane markings -->
  <line x1="0" y1="210" x2="700" y2="210" stroke="white" stroke-width="2.5" stroke-dasharray="40,25"/>
  <line x1="0" y1="270" x2="700" y2="270" stroke="white" stroke-width="2.5" stroke-dasharray="40,25"/>
  <!-- Stop line -->
  <rect x="280" y="155" width="5" height="100" fill="white"/>
  <!-- Crosswalk -->
  <rect x="285" y="155" width="12" height="100" fill="white" opacity="0.7"/>
  <rect x="305" y="155" width="12" height="100" fill="white" opacity="0.7"/>
  <rect x="325" y="155" width="12" height="100" fill="white" opacity="0.7"/>
  <rect x="345" y="155" width="12" height="100" fill="white" opacity="0.7"/>
  <!-- Cross street suggestion -->
  <rect x="285" y="0" width="220" height="165" fill="#4b5563"/>
  <rect x="285" y="0" width="220" height="5" fill="#374151"/>
  
  <!-- Traffic light pole -->
  <rect x="268" y="20" width="8" height="140" fill="#374151"/>
  <!-- Traffic light box -->
  <rect x="248" y="20" width="48" height="120" rx="8" fill="#1f2937"/>
  <rect x="250" y="22" width="44" height="116" rx="7" fill="#111827"/>
  <!-- RED light ON with glow -->
  <circle cx="272" cy="50" r="14" fill="url(#redglow)"/>
  <circle cx="272" cy="50" r="12" fill="#ef4444"/>
  <circle cx="272" cy="50" r="9" fill="#fca5a5"/>
  <!-- Yellow light OFF -->
  <circle cx="272" cy="82" r="12" fill="#1f2937"/>
  <circle cx="272" cy="82" r="9" fill="#78350f" opacity="0.4"/>
  <!-- Green light OFF -->
  <circle cx="272" cy="114" r="12" fill="#1f2937"/>
  <circle cx="272" cy="114" r="9" fill="#14532d" opacity="0.4"/>
  
  <!-- Car stopped at line (correct) -->
  <g transform="translate(190,185)">
    <rect x="0" y="0" width="65" height="30" rx="5" fill="#1d4ed8"/>
    <rect x="9" y="-12" width="44" height="18" rx="3" fill="#2563eb"/>
    <rect x="11" y="-10" width="18" height="12" rx="2" fill="#93c5fd" opacity="0.85"/>
    <rect x="33" y="-10" width="18" height="12" rx="2" fill="#93c5fd" opacity="0.85"/>
    <circle cx="13" cy="30" r="7" fill="#0f172a"/>
    <circle cx="52" cy="30" r="7" fill="#0f172a"/>
    <!-- Headlights -->
    <rect x="60" y="8" width="7" height="14" rx="2" fill="#fef08a"/>
    <text x="8" y="-22" font-size="14">✅ PAROU</text>
  </g>

  <!-- Car 2 running red -->
  <g transform="translate(370,215)">
    <rect x="0" y="0" width="60" height="27" rx="5" fill="#dc2626"/>
    <rect x="8" y="-10" width="40" height="16" rx="3" fill="#ef4444"/>
    <rect x="10" y="-8" width="16" height="11" rx="2" fill="#fca5a5" opacity="0.8"/>
    <rect x="30" y="-8" width="14" height="11" rx="2" fill="#fca5a5" opacity="0.8"/>
    <circle cx="11" cy="27" r="6" fill="#0f172a"/>
    <circle cx="49" cy="27" r="6" fill="#0f172a"/>
    <text x="0" y="-22" font-size="10" fill="#fbbf24" font-weight="bold">🚫 AVANÇOU!</text>
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
  </defs>
  <rect width="700" height="340" fill="#0f172a"/>
  <rect x="0" y="220" width="700" height="120" fill="#374151"/>
  <rect x="0" y="155" width="700" height="135" fill="#4b5563"/>
  <line x1="0" y1="210" x2="700" y2="210" stroke="white" stroke-width="2" stroke-dasharray="40,25"/>
  <rect x="285" y="0" width="220" height="160" fill="#4b5563"/>
  <rect x="268" y="20" width="8" height="140" fill="#374151"/>
  <rect x="248" y="20" width="48" height="120" rx="8" fill="#1f2937"/>
  <rect x="250" y="22" width="44" height="116" rx="7" fill="#111827"/>
  <!-- Red OFF -->
  <circle cx="272" cy="50" r="12" fill="#1f2937"/>
  <circle cx="272" cy="50" r="9" fill="#7f1d1d" opacity="0.4"/>
  <!-- YELLOW ON -->
  <circle cx="272" cy="82" r="14" fill="url(#yellowglow)"/>
  <circle cx="272" cy="82" r="12" fill="#fbbf24"/>
  <circle cx="272" cy="82" r="9" fill="#fef08a"/>
  <!-- Green OFF -->
  <circle cx="272" cy="114" r="12" fill="#1f2937"/>
  <circle cx="272" cy="114" r="9" fill="#14532d" opacity="0.4"/>
  
  <!-- Car braking (correct) -->
  <g transform="translate(155,180)">
    <rect x="0" y="0" width="62" height="28" rx="5" fill="#7c3aed"/>
    <rect x="8" y="-10" width="42" height="16" rx="3" fill="#8b5cf6"/>
    <rect x="10" y="-8" width="18" height="11" rx="2" fill="#c4b5fd" opacity="0.8"/>
    <rect x="32" y="-8" width="16" height="11" rx="2" fill="#c4b5fd" opacity="0.8"/>
    <circle cx="12" cy="28" r="6" fill="#0f172a"/>
    <circle cx="50" cy="28" r="6" fill="#0f172a"/>
    <!-- Brake lights red -->
    <rect x="1" y="8" width="7" height="12" rx="2" fill="#ef4444"/>
    <text x="0" y="-22" font-size="12">✅ Freando</text>
    <!-- Skid marks -->
    <line x1="-10" y1="28" x2="-60" y2="30" stroke="#6b7280" stroke-width="3" opacity="0.6" stroke-dasharray="5,3"/>
  </g>
  
  <!-- Car accelerating (WRONG) -->
  <g transform="translate(430,220)">
    <rect x="0" y="0" width="60" height="27" rx="5" fill="#dc2626"/>
    <rect x="8" y="-10" width="40" height="16" rx="3" fill="#ef4444"/>
    <rect x="10" y="-8" width="16" height="11" rx="2" fill="#fca5a5" opacity="0.8"/>
    <circle cx="11" cy="27" r="6" fill="#0f172a"/>
    <circle cx="48" cy="27" r="6" fill="#0f172a"/>
    <text x="0" y="-22" font-size="11" fill="#fbbf24" font-weight="bold">🚫 Acelerou!</text>
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
  <circle cx="272" cy="114" r="12" fill="#22c55e"/>
  <circle cx="272" cy="114" r="9" fill="#bbf7d0"/>
  
  <!-- Car moving correctly, checking sides -->
  <g transform="translate(380,178)">
    <rect x="0" y="0" width="65" height="30" rx="5" fill="#2563eb"/>
    <rect x="9" y="-12" width="44" height="18" rx="3" fill="#3b82f6"/>
    <rect x="11" y="-10" width="18" height="12" rx="2" fill="#93c5fd" opacity="0.85"/>
    <rect x="33" y="-10" width="18" height="12" rx="2" fill="#93c5fd" opacity="0.85"/>
    <circle cx="13" cy="30" r="7" fill="#0f172a"/>
    <circle cx="52" cy="30" r="7" fill="#0f172a"/>
    <rect x="60" y="8" width="7" height="14" rx="2" fill="#fef08a"/>
    <text x="0" y="-25" font-size="13">✅ Avançando</text>
  </g>
  
  <!-- Pedestrian still clearing -->
  <g transform="translate(340,162)">
    <circle cx="0" cy="0" r="8" fill="#fcd34d"/>
    <rect x="-4" y="8" width="8" height="16" rx="2" fill="#f97316"/>
    <line x1="-2" y1="24" x2="-4" y2="35" stroke="#fcd34d" stroke-width="2"/>
    <line x1="2" y1="24" x2="5" y2="35" stroke="#fcd34d" stroke-width="2"/>
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
  </defs>
  <rect width="700" height="320" fill="url(#sky3)"/>
  <!-- Mountains/trees bg -->
  <ellipse cx="100" cy="130" rx="80" ry="60" fill="#5c8a5e" opacity="0.5"/>
  <ellipse cx="200" cy="140" rx="60" ry="45" fill="#4a7c59" opacity="0.5"/>
  <ellipse cx="600" cy="125" rx="90" ry="65" fill="#5c8a5e" opacity="0.5"/>
  <!-- Road base -->
  <rect x="0" y="170" width="700" height="150" fill="#4b5563"/>
  <!-- Grass median -->
  <rect x="0" y="165" width="700" height="10" fill="#6b7280"/>
  <!-- Guardrail/median -->
  <rect x="0" y="215" width="700" height="18" fill="#9ca3af"/>
  <rect x="0" y="222" width="700" height="4" fill="#e2e8f0"/>
  <!-- Road shoulders -->
  <rect x="0" y="165" width="30" height="155" fill="#6b7280"/>
  <rect x="670" y="165" width="30" height="155" fill="#6b7280"/>
  <!-- Lane lines - left side (going) -->
  <line x1="0" y1="200" x2="700" y2="200" stroke="white" stroke-width="2.5" stroke-dasharray="40,20"/>
  <!-- Lane lines - right side (coming) -->
  <line x1="0" y1="250" x2="700" y2="250" stroke="white" stroke-width="2.5" stroke-dasharray="40,20"/>
  <!-- Edge lines -->
  <line x1="30" y1="165" x2="30" y2="320" stroke="#fbbf24" stroke-width="3"/>
  <line x1="670" y1="165" x2="670" y2="320" stroke="#fbbf24" stroke-width="3"/>
  
  <!-- Speed sign -->
  <rect x="40" y="90" width="50" height="60" rx="4" fill="#1e293b"/>
  <rect x="42" y="92" width="46" height="56" rx="3" fill="white"/>
  <circle cx="65" cy="135" r="22" fill="white" stroke="#ef4444" stroke-width="4"/>
  <text x="65" y="141" text-anchor="middle" font-size="15" font-weight="bold" fill="#1e293b">110</text>
  <line x1="65" y1="148" x2="65" y2="170" stroke="#9ca3af" stroke-width="3"/>
  <rect x="55" y="170" width="20" height="8" rx="2" fill="#9ca3af"/>
  
  <!-- Car on right lane (slow) -->
  <g transform="translate(120,175)">
    <rect x="0" y="0" width="72" height="32" rx="6" fill="#16a34a"/>
    <rect x="9" y="-13" width="50" height="20" rx="4" fill="#22c55e"/>
    <rect x="12" y="-11" width="20" height="14" rx="2" fill="#bbf7d0" opacity="0.8"/>
    <rect x="36" y="-11" width="20" height="14" rx="2" fill="#bbf7d0" opacity="0.8"/>
    <circle cx="14" cy="32" r="7" fill="#0f172a"/>
    <circle cx="58" cy="32" r="7" fill="#0f172a"/>
    <rect x="67" y="9" width="7" height="14" rx="2" fill="#fef08a"/>
    <text x="5" y="-23" font-size="10" fill="#16a34a">✅ Faixa direita</text>
    <text x="5" y="-12" font-size="9" fill="#16a34a">80 km/h</text>
  </g>
  
  <!-- Car on left lane (overtaking) -->
  <g transform="translate(350,170)">
    <rect x="0" y="0" width="72" height="32" rx="6" fill="#2563eb"/>
    <rect x="9" y="-13" width="50" height="20" rx="4" fill="#3b82f6"/>
    <rect x="12" y="-11" width="20" height="14" rx="2" fill="#93c5fd" opacity="0.8"/>
    <rect x="36" y="-11" width="20" height="14" rx="2" fill="#93c5fd" opacity="0.8"/>
    <circle cx="14" cy="32" r="7" fill="#0f172a"/>
    <circle cx="58" cy="32" r="7" fill="#0f172a"/>
    <rect x="67" y="9" width="7" height="14" rx="2" fill="#fef08a"/>
    <text x="5" y="-24" font-size="10" fill="#3b82f6">✅ Faixa esquerda</text>
    <text x="5" y="-13" font-size="9" fill="#3b82f6">ultrapassagem</text>
  </g>
  
  <!-- Truck on right lane -->
  <g transform="translate(480,225)">
    <rect x="0" y="0" width="95" height="40" rx="4" fill="#6d28d9"/>
    <rect x="0" y="-18" width="32" height="24" rx="4" fill="#7c3aed"/>
    <rect x="3" y="-15" width="25" height="16" rx="2" fill="#c4b5fd" opacity="0.8"/>
    <circle cx="15" cy="40" r="8" fill="#0f172a"/>
    <circle cx="35" cy="40" r="8" fill="#0f172a"/>
    <circle cx="78" cy="40" r="8" fill="#0f172a"/>
    <rect x="90" y="15" width="7" height="12" rx="2" fill="#fef08a"/>
    <text x="20" y="-26" font-size="10" fill="#8b5cf6">Caminhão · Faixa direita</text>
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
  <rect width="700" height="320" fill="#93c5fd"/>
  <!-- Buildings -->
  <rect x="0" y="20" width="90" height="140" fill="#4b5563"/>
  <rect x="5" y="25" width="80" height="130" fill="#374151"/>
  <!-- Windows -->
  <rect x="12" y="30" width="20" height="15" fill="#fef08a" opacity="0.7"/>
  <rect x="38" y="30" width="20" height="15" fill="#fef08a" opacity="0.7"/>
  <rect x="62" y="30" width="20" height="15" fill="#fef08a" opacity="0.7"/>
  <rect x="12" y="55" width="20" height="15" fill="#fef08a" opacity="0.3"/>
  <rect x="38" y="55" width="20" height="15" fill="#fef08a" opacity="0.7"/>
  <rect x="12" y="80" width="20" height="15" fill="#bfdbfe" opacity="0.7"/>
  <rect x="62" y="80" width="20" height="15" fill="#fef08a" opacity="0.7"/>
  <!-- Building 2 -->
  <rect x="95" y="40" width="70" height="120" fill="#6b7280"/>
  <rect x="100" y="45" width="60" height="110" fill="#4b5563"/>
  <rect x="105" y="50" width="16" height="12" fill="#fef08a" opacity="0.7"/>
  <rect x="128" y="50" width="16" height="12" fill="#bfdbfe" opacity="0.7"/>
  <rect x="105" y="72" width="16" height="12" fill="#fef08a" opacity="0.5"/>
  <!-- Building right side -->
  <rect x="540" y="15" width="100" height="150" fill="#4b5563"/>
  <rect x="545" y="20" width="90" height="140" fill="#374151"/>
  <rect x="552" y="28" width="22" height="16" fill="#fef08a" opacity="0.7"/>
  <rect x="582" y="28" width="22" height="16" fill="#bfdbfe" opacity="0.7"/>
  <rect x="612" y="28" width="22" height="16" fill="#fef08a" opacity="0.7"/>
  <rect x="552" y="55" width="22" height="16" fill="#fef08a" opacity="0.4"/>
  <rect x="612" y="55" width="22" height="16" fill="#fef08a" opacity="0.7"/>
  
  <!-- Sidewalks -->
  <rect x="0" y="155" width="700" height="20" fill="#d1d5db"/>
  <rect x="0" y="280" width="700" height="40" fill="#d1d5db"/>
  <!-- Road -->
  <rect x="0" y="175" width="700" height="108" fill="#4b5563"/>
  <!-- Lane lines -->
  <line x1="0" y1="230" x2="700" y2="230" stroke="white" stroke-width="2" stroke-dasharray="30,20"/>
  <!-- Center line yellow -->
  <line x1="0" y1="228" x2="700" y2="228" stroke="#fbbf24" stroke-width="3"/>
  
  <!-- Speed sign urban -->
  <circle cx="530" cy="120" r="24" fill="white" stroke="#ef4444" stroke-width="5"/>
  <text x="530" y="128" text-anchor="middle" font-size="18" font-weight="bold" fill="#1e293b">60</text>
  <line x1="530" y1="144" x2="530" y2="160" stroke="#6b7280" stroke-width="3"/>
  
  <!-- Traffic light pole -->
  <rect x="490" y="90" width="6" height="70" fill="#374151"/>
  <rect x="472" y="90" width="42" height="90" rx="6" fill="#1f2937"/>
  <circle cx="493" cy="105" r="10" fill="#ef4444"/>
  <circle cx="493" cy="125" r="10" fill="#1f2937" opacity="0.5"/>
  <circle cx="493" cy="145" r="10" fill="#1f2937" opacity="0.5"/>
  
  <!-- Crosswalk lines -->
  <rect x="450" y="155" width="12" height="130" fill="white" opacity="0.8"/>
  <rect x="470" y="155" width="12" height="130" fill="white" opacity="0.8"/>
  <rect x="490" y="155" width="12" height="130" fill="white" opacity="0.8"/>
  <rect x="510" y="155" width="12" height="130" fill="white" opacity="0.8"/>
  
  <!-- Car 1 -->
  <g transform="translate(100,185)">
    <rect x="0" y="0" width="60" height="27" rx="5" fill="#1d4ed8"/>
    <rect x="7" y="-10" width="40" height="16" rx="3" fill="#2563eb"/>
    <rect x="9" y="-8" width="16" height="11" rx="2" fill="#93c5fd" opacity="0.8"/>
    <rect x="29" y="-8" width="15" height="11" rx="2" fill="#93c5fd" opacity="0.8"/>
    <circle cx="11" cy="27" r="6" fill="#0f172a"/>
    <circle cx="49" cy="27" r="6" fill="#0f172a"/>
  </g>
  <!-- Car 2 -->
  <g transform="translate(250,237)">
    <rect x="0" y="0" width="60" height="27" rx="5" fill="#dc2626"/>
    <rect x="7" y="-10" width="40" height="16" rx="3" fill="#ef4444"/>
    <rect x="9" y="-8" width="16" height="11" rx="2" fill="#fca5a5" opacity="0.8"/>
    <circle cx="11" cy="27" r="6" fill="#0f172a"/>
    <circle cx="49" cy="27" r="6" fill="#0f172a"/>
  </g>
  <!-- Motorcycle -->
  <g transform="translate(370,195)">
    <rect x="0" y="5" width="40" height="14" rx="8" fill="#f59e0b"/>
    <circle cx="8" cy="22" r="7" fill="#0f172a"/>
    <circle cx="34" cy="22" r="7" fill="#0f172a"/>
    <!-- Rider -->
    <circle cx="22" cy="-2" r="7" fill="#fbbf24"/>
    <rect x="15" y="5" width="15" height="10" rx="2" fill="#f59e0b"/>
    <text x="-2" y="-14" font-size="9" fill="#f59e0b">⛑️ Capacete</text>
  </g>
  
  <!-- Pedestrian on sidewalk -->
  <g transform="translate(600,260)">
    <circle cx="0" cy="0" r="8" fill="#fcd34d"/>
    <rect x="-5" y="8" width="10" height="16" rx="2" fill="#16a34a"/>
    <line x1="-3" y1="24" x2="-5" y2="35" stroke="#fcd34d" stroke-width="2"/>
    <line x1="3" y1="24" x2="6" y2="35" stroke="#fcd34d" stroke-width="2"/>
  </g>
  
  <!-- Bus stop -->
  <rect x="640" y="158" width="60" height="30" rx="3" fill="#3b82f6" opacity="0.8"/>
  <text x="645" y="178" font-size="10" fill="white" font-weight="bold">🚌 Ônibus</text>
  
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
  </defs>
  <rect width="700" height="320" fill="url(#skyrot)"/>
  <!-- Road background -->
  <rect x="0" y="0" width="700" height="320" fill="#d1fae5" opacity="0.3"/>
  
  <!-- Road arms -->
  <!-- Top arm -->
  <rect x="290" y="0" width="120" height="120" fill="#555"/>
  <!-- Bottom arm -->
  <rect x="290" y="200" width="120" height="120" fill="#555"/>
  <!-- Left arm -->
  <rect x="0" y="110" width="170" height="100" fill="#555"/>
  <!-- Right arm -->
  <rect x="530" y="110" width="170" height="100" fill="#555"/>
  
  <!-- Round about circle -->
  <circle cx="350" cy="160" r="120" fill="#555"/>
  <circle cx="350" cy="160" r="80" fill="#4a7c59"/>
  <!-- Inner island decoration -->
  <circle cx="350" cy="160" r="65" fill="#16a34a"/>
  <circle cx="350" cy="160" r="45" fill="#4a7c59"/>
  <circle cx="350" cy="160" r="30" fill="#22c55e" opacity="0.7"/>
  <text x="350" y="168" text-anchor="middle" font-size="22">🌀</text>
  
  <!-- Lane markings on roundabout -->
  <circle cx="350" cy="160" r="100" fill="none" stroke="white" stroke-width="2" stroke-dasharray="25,15"/>
  
  <!-- Yield signs at entries -->
  <!-- Bottom entry yield -->
  <polygon points="350,198 335,222 365,222" fill="white" stroke="#ef4444" stroke-width="2"/>
  <text x="350" y="218" text-anchor="middle" font-size="8" fill="#ef4444" font-weight="bold">▼</text>
  
  <!-- Cars in roundabout (correct flow) -->
  <!-- Car going around clockwise -->
  <g transform="translate(330,90) rotate(0)">
    <rect x="0" y="0" width="50" height="22" rx="4" fill="#2563eb"/>
    <rect x="6" y="-8" width="34" height="13" rx="3" fill="#3b82f6"/>
    <circle cx="10" cy="22" r="6" fill="#0f172a"/>
    <circle cx="40" cy="22" r="6" fill="#0f172a"/>
    <!-- Arrow showing direction -->
    <text x="55" y="15" font-size="16">↙</text>
  </g>
  
  <!-- Car entering from bottom (waiting) -->
  <g transform="translate(310,250)">
    <rect x="0" y="0" width="50" height="22" rx="4" fill="#16a34a"/>
    <rect x="6" y="-8" width="34" height="13" rx="3" fill="#22c55e"/>
    <circle cx="10" cy="22" r="6" fill="#0f172a"/>
    <circle cx="40" cy="22" r="6" fill="#0f172a"/>
    <text x="-2" y="-18" font-size="11">⏸ Aguardando</text>
  </g>

  <!-- Arrows showing flow -->
  <path d="M 350 240 A 100 100 0 0 0 450 160" fill="none" stroke="#22c55e" stroke-width="3" stroke-dasharray="12,8" marker-end="url(#arrowhead)"/>
  
  <!-- Labels -->
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
  <rect width="700" height="320" fill="#e2e8f0"/>
  <rect x="0" y="210" width="700" height="110" fill="#4a7c59"/>
  <rect x="0" y="175" width="700" height="80" fill="#555"/>
  <line x1="0" y1="215" x2="700" y2="215" stroke="white" stroke-width="2" stroke-dasharray="30,20"/>
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
  <!-- Two cars icon -->
  <rect x="162" y="60" width="16" height="10" rx="2" fill="#1e293b"/>
  <rect x="168" y="72" width="16" height="10" rx="2" fill="#ef4444"/>
  <!-- Red diagonal line -->
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

  <!-- Sign 4: PARE (octagonal) -->
  <rect x="430" y="70" width="8" height="115" fill="#6b7280"/>
  <polygon points="434,38 452,38 466,52 466,90 452,104 434,104 420,90 420,52" fill="#ef4444"/>
  <text x="443" y="78" text-anchor="middle" font-size="18" font-weight="bold" fill="white">PARE</text>
  <text x="443" y="120" text-anchor="middle" font-size="11" fill="#374151" font-weight="bold">Parada</text>
  <text x="443" y="133" text-anchor="middle" font-size="11" fill="#374151">Obrigatória</text>

  <!-- Sign 5: Dê a preferência -->
  <rect x="555" y="70" width="8" height="115" fill="#6b7280"/>
  <polygon points="559,40 595,100 523,100" fill="white" stroke="#ef4444" stroke-width="6" transform="rotate(180, 559, 70)"/>
  <text x="559" y="120" text-anchor="middle" font-size="11" fill="#374151" font-weight="bold">Dê a</text>
  <text x="559" y="133" text-anchor="middle" font-size="11" fill="#374151">Preferência</text>

  <!-- Car obeying speed limit -->
  <g transform="translate(100,185)">
    <rect x="0" y="0" width="58" height="26" rx="4" fill="#16a34a"/>
    <rect x="7" y="-9" width="38" height="14" rx="3" fill="#22c55e"/>
    <circle cx="11" cy="26" r="6" fill="#0f172a"/>
    <circle cx="46" cy="26" r="6" fill="#0f172a"/>
    <text x="4" y="-18" font-size="10" fill="#22c55e">✅ 58 km/h</text>
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
  <rect width="700" height="320" fill="#fef9c3"/>
  <rect x="0" y="210" width="700" height="110" fill="#4a7c59"/>
  <rect x="0" y="175" width="700" height="80" fill="#555"/>
  <line x1="0" y1="215" x2="700" y2="215" stroke="white" stroke-width="2" stroke-dasharray="30,20"/>
  <line x1="0" y1="177" x2="700" y2="177" stroke="#fbbf24" stroke-width="3"/>
  <line x1="0" y1="251" x2="700" y2="251" stroke="#fbbf24" stroke-width="3"/>

  <!-- Sign 1: Curva perigosa -->
  <rect x="60" y="60" width="8" height="125" fill="#6b7280"/>
  <polygon points="64,20 100,80 28,80" fill="#fbbf24" stroke="#1e293b" stroke-width="3"/>
  <!-- Curve icon -->
  <path d="M52,50 Q64,35 76,50" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/>
  <text x="64" y="102" text-anchor="middle" font-size="11" fill="#374151" font-weight="bold">Curva</text>
  <text x="64" y="115" text-anchor="middle" font-size="11" fill="#374151">Perigosa</text>

  <!-- Sign 2: Zona escolar -->
  <rect x="185" y="60" width="8" height="125" fill="#6b7280"/>
  <polygon points="189,20 225,80 153,80" fill="#fbbf24" stroke="#1e293b" stroke-width="3"/>
  <text x="189" y="58" text-anchor="middle" font-size="22">🏫</text>
  <text x="189" y="102" text-anchor="middle" font-size="11" fill="#374151" font-weight="bold">Zona</text>
  <text x="189" y="115" text-anchor="middle" font-size="11" fill="#374151">Escolar</text>

  <!-- Sign 3: Lombada -->
  <rect x="310" y="60" width="8" height="125" fill="#6b7280"/>
  <polygon points="314,20 350,80 278,80" fill="#fbbf24" stroke="#1e293b" stroke-width="3"/>
  <!-- Speed bump shape -->
  <path d="M297,56 Q314,44 331,56" fill="#1e293b" stroke="#1e293b" stroke-width="2"/>
  <text x="314" y="102" text-anchor="middle" font-size="11" fill="#374151" font-weight="bold">Lombada</text>
  <text x="314" y="115" text-anchor="middle" font-size="11" fill="#374151">à Frente</text>

  <!-- Sign 4: Animais -->
  <rect x="432" y="60" width="8" height="125" fill="#6b7280"/>
  <polygon points="436,20 472,80 400,80" fill="#fbbf24" stroke="#1e293b" stroke-width="3"/>
  <text x="436" y="58" text-anchor="middle" font-size="20">🐄</text>
  <text x="436" y="102" text-anchor="middle" font-size="11" fill="#374151" font-weight="bold">Animais</text>
  <text x="436" y="115" text-anchor="middle" font-size="11" fill="#374151">na Pista</text>

  <!-- Sign 5: Obras -->
  <rect x="555" y="60" width="8" height="125" fill="#6b7280"/>
  <polygon points="559,20 595,80 523,80" fill="#fbbf24" stroke="#1e293b" stroke-width="3"/>
  <text x="559" y="58" text-anchor="middle" font-size="20">🚧</text>
  <text x="559" y="102" text-anchor="middle" font-size="11" fill="#374151" font-weight="bold">Obras</text>
  <text x="559" y="115" text-anchor="middle" font-size="11" fill="#374151">à Frente</text>

  <!-- Car slowing down correctly -->
  <g transform="translate(200,185)">
    <rect x="0" y="0" width="58" height="26" rx="4" fill="#7c3aed"/>
    <rect x="7" y="-9" width="38" height="14" rx="3" fill="#8b5cf6"/>
    <circle cx="11" cy="26" r="6" fill="#0f172a"/>
    <circle cx="46" cy="26" r="6" fill="#0f172a"/>
    <rect x="1" y="6" width="7" height="12" rx="2" fill="#ef4444"/>
    <text x="4" y="-18" font-size="10" fill="#8b5cf6">✅ Reduziu</text>
  </g>
  
  <!-- Speedbump on road -->
  <ellipse cx="450" cy="215" rx="40" ry="6" fill="#fbbf24" opacity="0.8"/>
  <text x="450" y="240" text-anchor="middle" font-size="10" fill="#fbbf24">lombada</text>

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
  </defs>
  <rect width="700" height="320" fill="url(#sky4)"/>
  <!-- Road -->
  <rect x="0" y="165" width="700" height="130" fill="#555"/>
  <!-- Road with curve -->
  <rect x="0" y="160" width="700" height="8" fill="#6b7280"/>
  <rect x="0" y="290" width="700" height="8" fill="#6b7280"/>
  <line x1="0" y1="210" x2="700" y2="210" stroke="#fbbf24" stroke-width="4"/>
  <!-- Curve/hill in background -->
  <ellipse cx="350" cy="165" rx="200" ry="40" fill="#4a7c59"/>
  <rect x="150" y="125" width="400" height="45" fill="#4a7c59"/>
  
  <!-- Car 1 - wanting to overtake (WRONG position) -->
  <g transform="translate(100,175)">
    <rect x="0" y="0" width="62" height="28" rx="5" fill="#dc2626"/>
    <rect x="8" y="-10" width="42" height="16" rx="3" fill="#ef4444"/>
    <rect x="10" y="-8" width="18" height="11" rx="2" fill="#fca5a5" opacity="0.8"/>
    <circle cx="12" cy="28" r="6" fill="#0f172a"/>
    <circle cx="50" cy="28" r="6" fill="#0f172a"/>
    <!-- Swerving out to overtake arrow -->
    <path d="M62,14 L90,14 L90,2" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="5,3" marker-end="url(#redArrow)"/>
    <text x="5" y="-22" font-size="10" fill="#ef4444" font-weight="bold">🚫 Tentando ultrapassar</text>
    <text x="5" y="-11" font-size="9" fill="#ef4444">na curva!</text>
  </g>
  
  <!-- Car 2 - slow car in front -->
  <g transform="translate(220,175)">
    <rect x="0" y="0" width="58" height="26" rx="5" fill="#6b7280"/>
    <rect x="7" y="-9" width="38" height="14" rx="3" fill="#9ca3af"/>
    <circle cx="11" cy="26" r="6" fill="#0f172a"/>
    <circle cx="46" cy="26" r="6" fill="#0f172a"/>
    <text x="8" y="-20" font-size="9" fill="#6b7280">🐢 Lento</text>
  </g>
  
  <!-- Car coming from other side (danger!) -->
  <g transform="translate(450,180)" opacity="0.85">
    <rect x="0" y="0" width="60" height="26" rx="5" fill="#7c3aed"/>
    <rect x="7" y="-9" width="38" height="14" rx="3" fill="#8b5cf6"/>
    <rect x="9" y="-7" width="16" height="10" rx="2" fill="#c4b5fd" opacity="0.8"/>
    <circle cx="11" cy="26" r="6" fill="#0f172a"/>
    <circle cx="49" cy="26" r="6" fill="#0f172a"/>
    <rect x="54" y="6" width="7" height="12" rx="2" fill="#fef08a"/>
    <text x="5" y="-22" font-size="10" fill="#8b5cf6">Outro carro vindo!</text>
  </g>
  
  <!-- Danger collision warning -->
  <text x="350" y="165" text-anchor="middle" font-size="30">💥</text>
  <text x="350" y="145" text-anchor="middle" font-size="13" fill="#ef4444" font-weight="bold">COLISÃO FRONTAL!</text>
  
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
  <rect width="700" height="320" fill="#0f172a"/>
  <!-- Night scene with city bg -->
  <rect x="0" y="220" width="700" height="100" fill="#374151"/>
  <rect x="0" y="175" width="700" height="95" fill="#4b5563"/>
  <line x1="0" y1="215" x2="700" y2="215" stroke="white" stroke-width="2" stroke-dasharray="30,20"/>
  <!-- City silhouette -->
  <rect x="0" y="120" width="80" height="60" fill="#1e293b"/>
  <rect x="10" y="100" width="50" height="80" fill="#1e293b"/>
  <rect x="600" y="110" width="100" height="70" fill="#1e293b"/>
  <rect x="620" y="90" width="60" height="90" fill="#1e293b"/>
  <rect x="550" y="130" width="70" height="50" fill="#1e293b"/>
  <!-- Windows glowing -->
  <rect x="18" y="108" width="10" height="8" fill="#fef08a" opacity="0.5"/>
  <rect x="35" y="108" width="10" height="8" fill="#fef08a" opacity="0.8"/>
  <rect x="18" y="124" width="10" height="8" fill="#fef08a" opacity="0.3"/>
  <rect x="625" y="98" width="10" height="8" fill="#fef08a" opacity="0.7"/>
  <rect x="645" y="98" width="10" height="8" fill="#fef08a" opacity="0.4"/>
  
  <!-- Police checkpoint -->
  <rect x="310" y="155" width="80" height="25" fill="#1d4ed8" opacity="0.9" rx="3"/>
  <text x="350" y="172" text-anchor="middle" font-size="12" fill="white" font-weight="bold">🚔 BLITZ</text>
  <!-- Police barrier -->
  <rect x="300" y="176" width="8" height="45" fill="#6b7280"/>
  <rect x="392" y="176" width="8" height="45" fill="#6b7280"/>
  <rect x="300" y="176" width="100" height="8" fill="#ef4444"/>
  <!-- Red/white stripe on barrier -->
  <rect x="300" y="176" width="12" height="8" fill="white"/>
  <rect x="324" y="176" width="12" height="8" fill="white"/>
  <rect x="348" y="176" width="12" height="8" fill="white"/>
  <rect x="372" y="176" width="12" height="8" fill="white"/>
  
  <!-- Drunk driver car (swerving) -->
  <g transform="translate(80,182) rotate(-4)">
    <rect x="0" y="0" width="62" height="28" rx="5" fill="#dc2626"/>
    <rect x="8" y="-10" width="42" height="16" rx="3" fill="#ef4444"/>
    <rect x="10" y="-8" width="18" height="11" rx="2" fill="#fca5a5" opacity="0.8"/>
    <circle cx="12" cy="28" r="6" fill="#0f172a"/>
    <circle cx="50" cy="28" r="6" fill="#0f172a"/>
    <!-- Zigzag driving marks -->
    <path d="M-50,14 L-35,6 L-20,18 L-5,8" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="5,3" opacity="0.7"/>
    <text x="5" y="-22" font-size="11" fill="#fbbf24">🍺 Bêbado</text>
  </g>
  
  <!-- Breathalyzer test -->
  <g transform="translate(460,175)">
    <rect x="0" y="0" width="90" height="50" rx="6" fill="#1e293b"/>
    <rect x="4" y="4" width="82" height="42" rx="5" fill="#0f172a"/>
    <rect x="8" y="8" width="74" height="20" rx="3" fill="#111827"/>
    <!-- Scale 0 to 1.0 -->
    <rect x="8" y="8" width="25" height="20" rx="3" fill="#22c55e"/>
    <text x="10" y="22" font-size="9" fill="white" font-weight="bold">0,0</text>
    <text x="35" y="22" font-size="9" fill="#fbbf24">0,3</text>
    <text x="58" y="22" font-size="9" fill="#ef4444">0,6+</text>
    <!-- Needle at 0 (clean test) -->
    <line x1="15" y1="30" x2="15" y2="42" stroke="#22c55e" stroke-width="3"/>
    <text x="10" y="58" font-size="10" fill="#22c55e">Bafômetro</text>
    <text x="10" y="70" font-size="9" fill="#22c55e">0,0 = OK ✅</text>
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
  <rect width="700" height="320" fill="#0f172a"/>
  <rect x="0" y="180" width="700" height="140" fill="#374151"/>
  <rect x="0" y="140" width="700" height="90" fill="#4b5563"/>
  <line x1="0" y1="185" x2="700" y2="185" stroke="white" stroke-width="2" stroke-dasharray="30,20"/>
  <line x1="0" y1="225" x2="700" y2="225" stroke="white" stroke-width="2" stroke-dasharray="30,20"/>
  <line x1="0" y1="142" x2="700" y2="142" stroke="#fbbf24" stroke-width="3"/>
  <line x1="0" y1="228" x2="700" y2="228" stroke="#fbbf24" stroke-width="3"/>
  
  <!-- Braking distance diagram -->
  <!-- 60 km/h - short stop -->
  <rect x="20" y="50" width="120" height="60" rx="6" fill="#1e293b" opacity="0.9"/>
  <text x="80" y="72" text-anchor="middle" font-size="14" fill="#22c55e" font-weight="bold">60 km/h</text>
  <text x="80" y="90" text-anchor="middle" font-size="11" fill="#86efac">≈ 25m p/ parar</text>
  <text x="80" y="106" text-anchor="middle" font-size="10" fill="#86efac">≈ 0,8s reação</text>
  
  <!-- 60 car -->
  <g transform="translate(30,150)">
    <rect x="0" y="0" width="52" height="22" rx="4" fill="#22c55e"/>
    <rect x="6" y="-8" width="35" height="13" rx="3" fill="#4ade80"/>
    <circle cx="10" cy="22" r="5" fill="#0f172a"/>
    <circle cx="42" cy="22" r="5" fill="#0f172a"/>
    <!-- Brake distance marker -->
    <rect x="55" y="8" width="60" height="6" rx="3" fill="#22c55e" opacity="0.5"/>
    <text x="68" y="5" font-size="9" fill="#22c55e">25m</text>
  </g>
  
  <!-- 80 km/h - medium -->
  <rect x="200" y="40" width="120" height="65" rx="6" fill="#1e293b" opacity="0.9"/>
  <text x="260" y="63" text-anchor="middle" font-size="14" fill="#f59e0b" font-weight="bold">80 km/h</text>
  <text x="260" y="81" text-anchor="middle" font-size="11" fill="#fcd34d">≈ 50m p/ parar</text>
  <text x="260" y="98" text-anchor="middle" font-size="10" fill="#fcd34d">Dobra o risco!</text>
  
  <g transform="translate(210,148)">
    <rect x="0" y="0" width="52" height="22" rx="4" fill="#f59e0b"/>
    <rect x="6" y="-8" width="35" height="13" rx="3" fill="#fbbf24"/>
    <circle cx="10" cy="22" r="5" fill="#0f172a"/>
    <circle cx="42" cy="22" r="5" fill="#0f172a"/>
    <rect x="55" y="8" width="100" height="6" rx="3" fill="#f59e0b" opacity="0.5"/>
    <text x="78" y="5" font-size="9" fill="#f59e0b">50m</text>
  </g>
  
  <!-- 100 km/h - long -->
  <rect x="400" y="30" width="150" height="70" rx="6" fill="#1e293b" opacity="0.9"/>
  <text x="475" y="55" text-anchor="middle" font-size="14" fill="#ef4444" font-weight="bold">100 km/h</text>
  <text x="475" y="73" text-anchor="middle" font-size="11" fill="#fca5a5">≈ 100m p/ parar!</text>
  <text x="475" y="90" text-anchor="middle" font-size="10" fill="#fca5a5">4× mais perigoso!</text>
  
  <g transform="translate(380,146)">
    <rect x="0" y="0" width="52" height="22" rx="4" fill="#dc2626"/>
    <rect x="6" y="-8" width="35" height="13" rx="3" fill="#ef4444"/>
    <circle cx="10" cy="22" r="5" fill="#0f172a"/>
    <circle cx="42" cy="22" r="5" fill="#0f172a"/>
    <rect x="55" y="8" width="220" height="6" rx="3" fill="#dc2626" opacity="0.5"/>
    <text x="115" y="5" font-size="9" fill="#ef4444">100m !!!</text>
  </g>
  
  <!-- Obstacle (person) at 250m -->
  <g transform="translate(648,150)">
    <circle cx="0" cy="0" r="8" fill="#fcd34d"/>
    <rect x="-5" y="8" width="10" height="18" rx="2" fill="#3b82f6"/>
    <line x1="-3" y1="26" x2="-5" y2="38" stroke="#fcd34d" stroke-width="2"/>
    <line x1="3" y1="26" x2="6" y2="38" stroke="#fcd34d" stroke-width="2"/>
    <text x="-10" y="-12" font-size="10" fill="#ef4444">⚠️</text>
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

  // Collect all scenes from this cat and find prev/next
  const allInCat = cat.scenes;
  const idx = allInCat.findIndex(s => s.id === sceneId);
  const prevScene = idx > 0 ? allInCat[idx-1] : null;
  const nextScene = idx < allInCat.length - 1 ? allInCat[idx+1] : null;

  // Also find other categories for navigation
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
        style="margin-bottom:1.5rem;font-size:.9rem;line-height:1.7">
        <strong>📋 Regra do CTB:</strong> ${scene.rule}
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

function vsBackToCategory() {
  document.getElementById('vs-home').style.display = '';
  document.getElementById('vs-cats').style.display = '';
  document.getElementById('vs-scene-view').style.display = 'none';
  vsCurrentScene = null;
}
