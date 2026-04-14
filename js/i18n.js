// =====================================================
// CNH Brasil · i18n.js
// Internacionalização (PT / EN / FR) + Text-to-Speech
// =====================================================

// ─────────────────────────────────────────────────────
// TRANSLATIONS
// ─────────────────────────────────────────────────────
const TRANSLATIONS = {
  pt: {
    // Header
    appTitle: "CNH Brasil",
    // Nav tabs
    tabModulos: "📚 Módulos",
    tabSimulado: "📝 Simulado",
    tabPlacas: "🛑 Guia de Placas",
    tabInfracoes: "⚠️ Infrações",
    tabDirecao: "🛞 Direção Segura",
    tabVisual: "🖼️ Visual",
    tabTransito: "🎮 Simulador",
    // Mobile nav
    tabVisualMobile: "🖼️ Guia Visual",
    tabTransitoMobile: "🎮 Simulador de Trânsito",
    // Progress pill
    progressPill: "Andando",
    // Hero
    heroTag: "// Formação de Condutores · Detran Brasil",
    heroTitle: "Prepare-se para a CNH<br>de forma interativa",
    heroSub: "4 módulos · Quizzes · Simulado · Placas · Infrações · Direção defensiva · Guia Visual",
    // Stats
    statModulesLabel: "Módulos de estudo",
    statQuestionsLabel: "Questões de simulado",
    statLessonsLabel: "Aulas interativas",
    statScenesLabel: "Cenas visuais",
    // Module status
    statusEmAndamento: "Em andamento",
    statusConcluido: "Concluído",
    statusNaoIniciado: "Não iniciado",
    moduleNumPrefix: "Módulo 0",
    // Lesson nav
    backToModules: "← Voltar aos módulos",
    prevLesson: "← Anterior",
    nextLesson: "Próxima →",
    // Quiz
    checkAnswer: "Verificar resposta",
    nextQuestion: "Próxima questão",
    quizCorrect: "✓ Correto!",
    quizWrong: "✗ Incorreto",
    quizExplanation: "Explicação:",
    quizResult: "Resultado do Quiz",
    quizScore: "Pontuação",
    quizRetry: "🔄 Refazer Quiz",
    quizContinue: "Continuar módulo →",
    // Simulado section
    simuladoTitle: "📝 Simulado de Trânsito",
    simuladoSub: "Questões no estilo do exame do Detran · 45 minutos",
    simuladoHowTitle: "ℹ️ Como funciona o exame real?",
    simuladoHowBody: "O exame teórico do Detran tem <strong>30 questões</strong> objetivas. Para aprovação, são necessários <strong>21 acertos</strong> (70%). O tempo é de <strong>45 minutos</strong>. As questões abordam sinalização, infrações, direção defensiva e meio ambiente.",
    simuladoTip: "<strong>Dica:</strong> O candidato só pode errar <strong>9 questões</strong>. Fique atento às questões sobre álcool e velocidade — são as mais cobradas!",
    simuladoBtnStart: "▶ Iniciar Simulado",
    simuladoBtnContinue: "▶ Continuar Simulado",
    simuladoTimeLeft: "Tempo restante",
    simuladoQuestion: "Questão",
    simuladoOf: "de",
    simuladoConfirm: "Confirmar resposta",
    simuladoResultTitle: "Resultado do Simulado",
    simuladoApproved: "✅ Aprovado!",
    simuladoFailed: "❌ Reprovado",
    simuladoCorrect: "acertos",
    simuladoMinimum: "Mínimo para aprovação: 21 acertos (70%)",
    simuladoRestart: "🔄 Novo Simulado",
    // Placas section
    placasTitle: "🛑 Guia Completo de Placas",
    placasSub: "Clique em qualquer placa para ver detalhes e exemplos",
    filterAll: "Todas",
    filterReg: "Regulamentação",
    filterAdv: "Advertência",
    filterInd: "Indicação",
    // Infracoes section
    infracoesTitle: "⚠️ Infrações e Penalidades",
    infracoesSub: "Sistema de pontos e multas conforme o CTB",
    infracoesPointsTitle: "📊 Sistema de Pontos da CNH",
    infracoesPointsBody: "O condutor que acumular <strong>20 pontos</strong> em 12 meses tem a CNH suspensa por 6 meses a 1 ano. Motoristas profissionais têm limite de <strong>30 pontos</strong>. Com 40+ pontos em 12 meses, independente da categoria, ocorre suspensão imediata.",
    tableHeaderInfracao: "Infração",
    tableHeaderNatureza: "Natureza",
    tableHeaderPontos: "Pontos",
    tableHeaderMulta: "Multa (R$)",
    tableHeaderMedidas: "Medidas",
    // Direcao section
    direcaoTitle: "🛞 Direção Segura",
    direcaoSub: "Técnicas de direção defensiva e situações de risco",
    // TTS player
    ttsTitle: "🔊 Leitura em Áudio",
    ttsBtnPlayAll: "▶ Ouvir tudo",
    ttsBtnPause: "⏸ Pausar",
    ttsBtnResume: "▶ Continuar",
    ttsBtnStop: "⏹ Parar",
    ttsBtnPrev: "⏮ Anterior",
    ttsBtnNext: "⏭ Próxima",
    ttsSection: "Seção:",
    ttsSentence: "Frase:",
    ttsSpeed: "Velocidade:",
    ttsReading: "Lendo...",
    ttsFinished: "Concluído",
    ttsNoContent: "Nenhum conteúdo para ler",
    // Language selector
    langLabel: "Idioma",
  },
  en: {
    appTitle: "CNH Brasil",
    tabModulos: "📚 Modules",
    tabSimulado: "📝 Exam Sim",
    tabPlacas: "🛑 Signs Guide",
    tabInfracoes: "⚠️ Violations",
    tabDirecao: "🛞 Safe Driving",
    tabVisual: "🖼️ Visual",
    tabTransito: "🎮 Simulator",
    tabVisualMobile: "🖼️ Visual Guide",
    tabTransitoMobile: "🎮 Traffic Simulator",
    progressPill: "In Progress",
    heroTag: "// Driver Training · Brazilian DMV",
    heroTitle: "Prepare for your Driver's<br>License interactively",
    heroSub: "4 modules · Quizzes · Exam Sim · Signs · Violations · Defensive Driving · Visual Guide",
    statModulesLabel: "Study modules",
    statQuestionsLabel: "Exam questions",
    statLessonsLabel: "Interactive lessons",
    statScenesLabel: "Visual scenes",
    statusEmAndamento: "In progress",
    statusConcluido: "Completed",
    statusNaoIniciado: "Not started",
    moduleNumPrefix: "Module 0",
    backToModules: "← Back to modules",
    prevLesson: "← Previous",
    nextLesson: "Next →",
    checkAnswer: "Check answer",
    nextQuestion: "Next question",
    quizCorrect: "✓ Correct!",
    quizWrong: "✗ Incorrect",
    quizExplanation: "Explanation:",
    quizResult: "Quiz Result",
    quizScore: "Score",
    quizRetry: "🔄 Retry Quiz",
    quizContinue: "Continue module →",
    simuladoTitle: "📝 Traffic Exam Simulation",
    simuladoSub: "Questions in Detran exam style · 45 minutes",
    simuladoHowTitle: "ℹ️ How does the real exam work?",
    simuladoHowBody: "The Detran theory exam has <strong>30 multiple-choice questions</strong>. You need <strong>21 correct answers</strong> (70%) to pass. Time allowed is <strong>45 minutes</strong>. Topics include signs, violations, defensive driving, and environment.",
    simuladoTip: "<strong>Tip:</strong> You can only get <strong>9 questions</strong> wrong. Pay extra attention to alcohol and speed questions — they are the most common!",
    simuladoBtnStart: "▶ Start Exam",
    simuladoBtnContinue: "▶ Continue Exam",
    simuladoTimeLeft: "Time remaining",
    simuladoQuestion: "Question",
    simuladoOf: "of",
    simuladoConfirm: "Confirm answer",
    simuladoResultTitle: "Exam Result",
    simuladoApproved: "✅ Passed!",
    simuladoFailed: "❌ Failed",
    simuladoCorrect: "correct answers",
    simuladoMinimum: "Minimum to pass: 21 correct (70%)",
    simuladoRestart: "🔄 New Exam",
    placasTitle: "🛑 Complete Signs Guide",
    placasSub: "Click any sign to see details and examples",
    filterAll: "All",
    filterReg: "Regulatory",
    filterAdv: "Warning",
    filterInd: "Informational",
    infracoesTitle: "⚠️ Violations & Penalties",
    infracoesSub: "Points system and fines according to the CTB",
    infracoesPointsTitle: "📊 Driver's License Point System",
    infracoesPointsBody: "A driver who accumulates <strong>20 points</strong> in 12 months has their license suspended for 6 months to 1 year. Professional drivers have a limit of <strong>30 points</strong>. With 40+ points in 12 months, regardless of category, immediate suspension occurs.",
    tableHeaderInfracao: "Violation",
    tableHeaderNatureza: "Severity",
    tableHeaderPontos: "Points",
    tableHeaderMulta: "Fine (R$)",
    tableHeaderMedidas: "Measures",
    direcaoTitle: "🛞 Safe Driving",
    direcaoSub: "Defensive driving techniques and risk situations",
    ttsTitle: "🔊 Audio Reading",
    ttsBtnPlayAll: "▶ Play all",
    ttsBtnPause: "⏸ Pause",
    ttsBtnResume: "▶ Resume",
    ttsBtnStop: "⏹ Stop",
    ttsBtnPrev: "⏮ Previous",
    ttsBtnNext: "⏭ Next",
    ttsSection: "Section:",
    ttsSentence: "Sentence:",
    ttsSpeed: "Speed:",
    ttsReading: "Reading...",
    ttsFinished: "Finished",
    ttsNoContent: "No content to read",
    langLabel: "Language",
  },
  fr: {
    appTitle: "CNH Brasil",
    tabModulos: "📚 Modules",
    tabSimulado: "📝 Examen Sim",
    tabPlacas: "🛑 Guide Panneaux",
    tabInfracoes: "⚠️ Infractions",
    tabDirecao: "🛞 Conduite Sûre",
    tabVisual: "🖼️ Visuel",
    tabTransito: "🎮 Simulateur",
    tabVisualMobile: "🖼️ Guide Visuel",
    tabTransitoMobile: "🎮 Simulateur de Trafic",
    progressPill: "En cours",
    heroTag: "// Formation des Conducteurs · Detran Brésil",
    heroTitle: "Préparez-vous au permis de<br>conduire de façon interactive",
    heroSub: "4 modules · Quiz · Simulation · Panneaux · Infractions · Conduite défensive · Guide visuel",
    statModulesLabel: "Modules d'étude",
    statQuestionsLabel: "Questions d'examen",
    statLessonsLabel: "Leçons interactives",
    statScenesLabel: "Scènes visuelles",
    statusEmAndamento: "En cours",
    statusConcluido: "Terminé",
    statusNaoIniciado: "Non commencé",
    moduleNumPrefix: "Module 0",
    backToModules: "← Retour aux modules",
    prevLesson: "← Précédent",
    nextLesson: "Suivant →",
    checkAnswer: "Vérifier la réponse",
    nextQuestion: "Question suivante",
    quizCorrect: "✓ Correct !",
    quizWrong: "✗ Incorrect",
    quizExplanation: "Explication :",
    quizResult: "Résultat du Quiz",
    quizScore: "Score",
    quizRetry: "🔄 Refaire le Quiz",
    quizContinue: "Continuer le module →",
    simuladoTitle: "📝 Simulation d'Examen de Trafic",
    simuladoSub: "Questions style examen Detran · 45 minutes",
    simuladoHowTitle: "ℹ️ Comment fonctionne le vrai examen ?",
    simuladoHowBody: "L'examen théorique du Detran comporte <strong>30 questions</strong> à choix multiple. Il faut <strong>21 bonnes réponses</strong> (70%) pour réussir. Le temps imparti est de <strong>45 minutes</strong>. Les sujets incluent la signalisation, les infractions, la conduite défensive et l'environnement.",
    simuladoTip: "<strong>Astuce :</strong> Vous ne pouvez vous tromper que sur <strong>9 questions</strong>. Soyez attentif aux questions sur l'alcool et la vitesse — ce sont les plus fréquentes !",
    simuladoBtnStart: "▶ Démarrer l'examen",
    simuladoBtnContinue: "▶ Continuer l'examen",
    simuladoTimeLeft: "Temps restant",
    simuladoQuestion: "Question",
    simuladoOf: "sur",
    simuladoConfirm: "Confirmer la réponse",
    simuladoResultTitle: "Résultat de l'examen",
    simuladoApproved: "✅ Réussi !",
    simuladoFailed: "❌ Échoué",
    simuladoCorrect: "bonnes réponses",
    simuladoMinimum: "Minimum pour réussir : 21 bonnes réponses (70%)",
    simuladoRestart: "🔄 Nouvel examen",
    placasTitle: "🛑 Guide complet des panneaux",
    placasSub: "Cliquez sur un panneau pour voir les détails et exemples",
    filterAll: "Tous",
    filterReg: "Réglementation",
    filterAdv: "Avertissement",
    filterInd: "Indication",
    infracoesTitle: "⚠️ Infractions et Pénalités",
    infracoesSub: "Système de points et amendes selon le CTB",
    infracoesPointsTitle: "📊 Système de Points du Permis",
    infracoesPointsBody: "Un conducteur qui accumule <strong>20 points</strong> en 12 mois voit son permis suspendu de 6 mois à 1 an. Les conducteurs professionnels ont une limite de <strong>30 points</strong>. Avec 40+ points en 12 mois, quelle que soit la catégorie, une suspension immédiate se produit.",
    tableHeaderInfracao: "Infraction",
    tableHeaderNatureza: "Nature",
    tableHeaderPontos: "Points",
    tableHeaderMulta: "Amende (R$)",
    tableHeaderMedidas: "Mesures",
    direcaoTitle: "🛞 Conduite Sûre",
    direcaoSub: "Techniques de conduite défensive et situations à risque",
    ttsTitle: "🔊 Lecture Audio",
    ttsBtnPlayAll: "▶ Tout écouter",
    ttsBtnPause: "⏸ Pause",
    ttsBtnResume: "▶ Reprendre",
    ttsBtnStop: "⏹ Arrêter",
    ttsBtnPrev: "⏮ Précédent",
    ttsBtnNext: "⏭ Suivant",
    ttsSection: "Section :",
    ttsSentence: "Phrase :",
    ttsSpeed: "Vitesse :",
    ttsReading: "Lecture...",
    ttsFinished: "Terminé",
    ttsNoContent: "Aucun contenu à lire",
    langLabel: "Langue",
  }
};

// ─────────────────────────────────────────────────────
// MODULE/LESSON TRANSLATIONS
// ─────────────────────────────────────────────────────
const MODULE_TRANSLATIONS = {
  en: {
    modules: [
      {
        title: "Signs, Colors & Roads",
        desc: "Learn traffic sign types, traffic light signals, road markings, and how to read the road environment.",
        lessons: [
          { title: "Introduction", concepts: [
            { title: "Module Objective", body: "This module introduces the Brazilian traffic signaling system: signs, traffic lights, road markings, sound signals, and traffic agent gestures." },
            { title: "Why is it important?", body: "Signaling is the language of traffic. Those who don't know the signals cannot circulate safely, and ignoring signaling is always a violation." },
            { title: "Types of signaling", body: "• Vertical (signs)\n• Horizontal (road markings)\n• Traffic light\n• Auxiliary devices\n• Traffic agent gestures" }
          ], highlights: [
            { type: "info", text: "<strong>Signaling has hierarchy:</strong> Traffic agent > Traffic light > Signs > Road markings. When there is conflict, obey in this order." }
          ], quiz: [
            { q: "What is the correct hierarchy of traffic signaling, from highest to lowest priority?", opts: ["Traffic light > Signs > Agent > Markings", "Signs > Traffic light > Agent > Markings", "Agent > Traffic light > Signs > Markings", "Markings > Signs > Traffic light > Agent"], correct: 2, exp: "The hierarchy is: Traffic agent (maximum authority) > Traffic lights > Signs > Road markings. When an agent makes a gesture, it prevails over any other signal." }
          ]},
          { title: "Vertical Signaling (Signs)", concepts: [
            { title: "Regulatory (R) — red circular signs", body: "Impose obligations, prohibitions, or restrictions. Must always be obeyed. Ex: maximum speed, no overtaking, STOP." },
            { title: "Warning (A) — triangular yellow signs", body: "Alert about dangerous situations ahead. They don't prohibit — they just signal caution. Ex: dangerous curve, school zone, speed bump." },
            { title: "Informational (I) — rectangular blue/green signs", body: "Inform about localities, distances, services, destinations, and route obligations. Blue background = information. Green background = highways." },
            { title: "Sign shapes — exam tip", body: "Octagonal → STOP\nInverted triangle → Yield\nRed circle → Prohibition\nBlue circle → Obligation\nYellow triangle → Warning\nRectangular → Information" }
          ], highlights: [
            { type: "info", text: "<strong>Color rule:</strong> RED border/background = prohibition or obligation. YELLOW = caution/warning. BLUE = information/positive obligation. GREEN = highways. BROWN = tourism." },
            { type: "warn", text: "<strong>⚠️ STOP sign:</strong> requires a COMPLETE stop, even if the road seems clear. Slowing down without stopping is already a serious violation!" }
          ], quiz: [
            { q: "A circular sign with a red border and number 80 in the center indicates:", opts: ["Minimum speed of 80 km/h", "Maximum speed of 80 km/h", "Maximum weight of 80 tons", "Distance of 80 meters to risk area"], correct: 1, exp: "Circular signs with red borders are REGULATORY and indicate prohibitions or restrictions. Number in center = maximum permitted speed." },
            { q: "What is the shape of the 'Yield' sign?", opts: ["Red circle", "Red octagon", "Triangle pointing up", "Triangle pointing down"], correct: 3, exp: "The 'Yield' sign has a triangular shape with the vertex pointing downward (inverted triangle), white background and red borders." },
            { q: "Warning signs have which characteristic shape and color?", opts: ["Circular and red", "Triangular pointing up and yellow", "Rectangular and blue", "Octagonal and red"], correct: 1, exp: "Warning signs are triangular pointing up, yellow background and black symbol. They warn — they don't prohibit." }
          ]},
          { title: "Road Markings", concepts: [
            { title: "Continuous YELLOW line", body: "Separates opposing traffic directions. PROHIBITED TO OVERTAKE in any situation. Double line = even more dangerous. Serious violation: 5 points." },
            { title: "Dashed YELLOW line", body: "Allows overtaking when there is good visibility, adequate safety, and sufficient space. Use with caution and always signal." },
            { title: "Continuous WHITE line", body: "Marks lanes of the same direction. Avoid crossing unnecessarily. May cross to leave the road (turn, side access)." },
            { title: "Dashed WHITE line", body: "Lane of the same direction. Allows lane change within the same traffic direction." },
            { title: "Crosswalk (Zebra)", body: "MANDATORY to reduce speed and stop if there is a pedestrian. Pedestrians have absolute priority. Stopping on the crosswalk is a serious violation." },
            { title: "Bicycle Lane", body: "Space reserved for cyclists. Cars must respect it. Parking on bike lanes is a serious violation." },
            { title: "Edge markings (RED)", body: "At special intersections or areas with restrictions. Indicates areas prohibited for parking or circulation." }
          ], highlights: [
            { type: "info", text: "<strong>Golden rule:</strong> Continuous line (yellow or white) = PROHIBITED to cross. Dashed line = allowed to cross safely." },
            { type: "warn", text: "<strong>NEVER overtake on the crosswalk!</strong> It is a serious violation even if no pedestrians are visible." }
          ], quiz: [
            { q: "What does a continuous yellow line in the center of the road mean?", opts: ["Separation of same direction", "Separation of opposing directions with no overtaking", "Road elevation", "Speed limit start"], correct: 1, exp: "Continuous yellow line separates opposing directions and PROHIBITS overtaking. Crossing it is a SERIOUS violation even if no car is coming." },
            { q: "What is the difference between continuous and dashed white lines?", opts: ["None — both prohibit crossing", "Continuous = prohibits crossing; dashed = allows lane change", "Continuous = old road; dashed = new road", "Both allow crossing freely"], correct: 1, exp: "Continuous white line marks same-direction lanes — avoid crossing. Dashed = allows safe lane change between same-direction lanes." }
          ]},
          { title: "Traffic Lights & Agent Signals", concepts: [
            { title: "Traffic Light — Red: STOP", body: "No vehicle may advance. Stopping is mandatory. Violation: very serious, 7 points and fine of R$293.47." },
            { title: "Traffic Light — Yellow: CAUTION", body: "Indicates the light is about to turn red. Only proceed if you are so close that stopping would be dangerous. Never accelerate on yellow." },
            { title: "Traffic Light — Green: GO", body: "Allows proceeding, but always with attention: check for pedestrians or vehicles still crossing before proceeding." },
            { title: "Flashing Traffic Light", body: "Flashing yellow = EXTRA CAUTION. Flashing red = STOP and verify conditions before crossing." },
            { title: "Continuous yellow line", body: "Separates opposing traffic. Overtaking prohibited. Crossing this line is a serious violation." },
            { title: "Dashed yellow line", body: "Allows overtaking when there is sufficient visibility and safety." },
            { title: "Crosswalk", body: "Pedestrians have absolute priority. Vehicles MUST stop when a pedestrian is waiting or crossing." },
            { title: "Traffic agent gestures", body: "Raised arm = caution/stop. Extended arm = go. Both arms open = stop from both sides. Rotating arm = accelerate." }
          ], highlights: [
            { type: "highlight", text: "<strong>Frequent exam question:</strong> 'What should a driver do when facing a yellow signal?' → Should stop, unless stopping could cause an accident." },
            { type: "info", text: "<strong>Road marking colors:</strong><br>• Yellow → separates opposing directions<br>• White → same direction, lanes, stops<br>• Red → bike lanes and special intersections" }
          ], quiz: [
            { q: "When approaching an intersection with a yellow light, the driver should:", opts: ["Accelerate to cross before it closes", "Stop, unless stopping would cause an accident", "Always stop, no exception", "Honk and cross slowly"], correct: 1, exp: "The CTB (Art. 44) determines that the yellow signal means caution and that the driver must stop, unless stopping could cause an accident. Never accelerate on yellow." },
            { q: "A continuous yellow line in the center of the road indicates:", opts: ["Same-direction lane separation", "No overtaking prohibition", "Area of permitted maneuvers", "Start of dual carriageway"], correct: 1, exp: "Continuous yellow line on the axis separates opposing directions and indicates PROHIBITION of overtaking." },
            { q: "A traffic agent and traffic light give opposing orders. The driver must obey:", opts: ["The traffic light, as it is official equipment", "The traffic agent, as they have maximum authority", "Common sense — choose the safest", "The code — ignore both and go slowly"], correct: 1, exp: "The signaling hierarchy places the traffic agent at the top: their order prevails over the traffic light, signs, and road markings." }
          ]},
          { title: "Test your knowledge!", type: "quiz-only", concepts: [], highlights: [
            { type: "info", text: "Answer the questions below to test what you learned in Module 1. You need 70% correct (equivalent to the real DETRAN exam)." }
          ], quiz: [
            { q: "At a crosswalk, a pedestrian on the curb waiting to cross:", opts: ["Has no priority — must wait for the signal", "Has priority over vehicles", "Must yield to vehicles", "Only has priority when there is a traffic light"], correct: 1, exp: "According to the CTB, pedestrians have priority of passage at crosswalks even without a traffic light. The driver MUST stop and give way." },
            { q: "Flashing yellow traffic light means:", opts: ["Mandatory stop", "Proceed normally without reducing speed", "Caution and extra care", "Prohibited from circulating on that road"], correct: 2, exp: "Flashing yellow traffic light indicates CAUTION — the driver should reduce speed and check conditions before crossing." },
            { q: "A driver who runs a red light is subject to:", opts: ["Verbal warning", "Light fine and 3 points", "Very serious fine and 7 points", "Serious fine and 5 points"], correct: 2, exp: "Running a red light is a VERY SERIOUS violation: fine of R$293.47 and 7 points. Repeated offenses can result in license suspension." },
            { q: "What color are regulatory signs indicating prohibition?", opts: ["Blue with white symbol", "Green with white letters", "Circular with red border", "Yellow with black symbol"], correct: 2, exp: "Regulatory prohibition signs have a red border, white background, and red/black symbol. The shape is circular." }
          ]},
          { title: "Road Types & Roundabouts", concepts: [
            { title: "Highway — Dual Carriageway", body: "High-speed roads with two lanes separated by a physical barrier. Maximum speed: 110 km/h. Overtaking permitted in the left lane after checking." },
            { title: "Highway — Single Carriageway", body: "One lane in each direction. Maximum speed: 100 km/h. Overtaking is one of the most dangerous maneuvers — only do it with full visibility and sufficient space." },
            { title: "Arterial Road (main)", body: "Connects different neighborhoods in urban areas. Maximum speed: 60 km/h. Usually has public lighting and frequent traffic lights." },
            { title: "Collector Road", body: "Distributes traffic within neighborhoods. Speed: 40 km/h. Connects local roads to arterial roads." },
            { title: "Local Road (residential street)", body: "Common neighborhood streets. Maximum speed: 30 km/h. Priority for pedestrians, children, and the elderly. Extra vigilance." },
            { title: "Roundabout — How to navigate correctly", body: "1. Those INSIDE the roundabout have priority\n2. When ENTERING, yield\n3. When EXITING, signal with turn signal\n4. Stay in outer lane (closest to desired exit)\n5. Circulating multiple times is PROHIBITED — it's a violation" },
            { title: "Common roundabout mistakes", body: "❌ Thinking you have priority when entering\n❌ Not using turn signal when exiting\n❌ Changing lanes abruptly\n❌ Driving over the roundabout center\n❌ Demanding priority by honking" }
          ], highlights: [
            { type: "warn", text: "<strong>Golden rule in roundabouts:</strong> Those who ENTER yield; those CIRCULATING pass. If unsure which exit to take, go around again." },
            { type: "info", text: "<strong>Practical tip:</strong> Before entering a roundabout, observe for a moment waiting for a safe gap. Don't rush!" }
          ], quiz: [
            { q: "In a roundabout, which vehicle has right of way?", opts: ["Who enters from the right", "Who is already circulating inside", "Who enters from the left", "The larger vehicle"], correct: 1, exp: "Those already CIRCULATING INSIDE the roundabout have priority. Those about to ENTER must yield waiting for a safe gap." },
            { q: "What is the maximum speed on an urban local road?", opts: ["40 km/h", "50 km/h", "30 km/h", "60 km/h"], correct: 2, exp: "On local roads (residential streets), the maximum speed is 30 km/h according to the CTB." },
            { q: "You enter a roundabout but aren't sure which exit to take. What do you do?", opts: ["Turn abruptly to any exit", "Go around completely and exit at the correct one", "Brake in the middle of the roundabout to think", "Honk for information"], correct: 1, exp: "If you entered a roundabout and are unsure of the exit, the correct thing is to complete the loop and exit at the next opportunity. Never exit abruptly!" }
          ]}
        ]
      },
      {
        title: "Choices & Consequences",
        desc: "Violations, penalties, license points, suspension, revocation and the legal responsibility of the driver.",
        lessons: [
          { title: "Introduction", concepts: [
            { title: "Brazilian Traffic Code (CTB)", body: "Law No. 9,503/1997 — regulates all forms of traffic on land routes, ports, airports, and borders of Brazil." },
            { title: "Driver responsibility", body: "The driver is responsible for the safety of the vehicle and all occupants. Carrying a valid license is mandatory for any motor vehicle operation." },
            { title: "Traffic authorities", body: "DETRAN, traffic police, DER, SENATRAN, and municipalities have authority to monitor and fine traffic violations." }
          ], highlights: [
            { type: "info", text: "<strong>Main driver obligations (CTB):</strong><br>• Carry valid license and vehicle document<br>• Wear seatbelt and require all to wear it<br>• Don't use phone while driving<br>• Respect signaling<br>• Don't drive under influence of alcohol or drugs" }
          ], quiz: [
            { q: "According to the CTB, who is responsible for the license and vehicle documentation?", opts: ["The vehicle owner", "The driver", "DETRAN", "The insurer"], correct: 1, exp: "The DRIVER is responsible for carrying and presenting their license and vehicle document whenever required by the traffic authority." }
          ]},
          { title: "Violations & Penalties", type: "table", tableHeaders: ["Severity", "Points", "Fine (R$)", "Example"], tableRows: [
            ["Light", "3", "88.38", "No turn signal"],
            ["Medium", "4", "130.16", "Parking in prohibited area"],
            ["Serious", "5", "195.23", "Using phone while driving"],
            ["Very Serious", "7", "293.47", "Running a red light"],
            ["Very Serious ×3", "7", "880.41", "Speed excess >50%"],
            ["Very Serious ×5", "7", "1,467.35", "Street racing"],
            ["Very Serious ×10", "7", "2,934.70", "Drunk driving"]
          ], concepts: [], highlights: [
            { type: "warn", text: "<strong>Point limits:</strong> Regular driver → 20 pts in 12 months = suspension. Professional driver → 30 pts. Any driver → 40 pts = immediate suspension." },
            { type: "info", text: "<strong>Penalties beyond fines:</strong> written warning, license suspension, license revocation, mandatory refresher course, and vehicle impoundment." }
          ], quiz: [
            { q: "A regular driver accumulated 22 points in 12 months. What happens?", opts: ["Nothing, as the limit is 30", "License suspended for 6 months to 1 year", "License permanently revoked", "Extra fine of R$500"], correct: 1, exp: "The limit for regular drivers is 20 points in 12 months. With 22 points, the license is suspended for 6 months to 1 year. The 30-point limit is only for professional drivers." },
            { q: "Street racing on a public road is classified as:", opts: ["Serious violation — 5 points", "Very serious violation — 7 points", "Very serious ×5 and traffic crime", "Medium violation — 4 points"], correct: 2, exp: "Street racing is a very serious violation with ×5 multiplier (fine of R$1,467.35) and constitutes a traffic crime, which may result in detention." }
          ]},
          { title: "Most Common Violations", concepts: [
            { title: "Phone while driving — SERIOUS", body: "Using a phone (including hands-free) while driving is a serious violation: 5 points and fine of R$293.47. Just holding the device is already a violation." },
            { title: "Running red light — VERY SERIOUS", body: "7 points and fine of R$293.47. One of the biggest causes of fatal accidents at urban intersections." },
            { title: "Speed excess", body: "Up to 20% above: serious violation (5 pts). From 20% to 50%: very serious (7 pts, R$293.47). Above 50%: very serious ×3 (R$880.41 + impoundment)." },
            { title: "Seatbelt — SERIOUS", body: "Mandatory for ALL occupants. The driver is responsible for passengers not wearing it. 5 points per passenger without seatbelt." },
            { title: "Drunk driving — VERY SERIOUS ×10", body: "Any detection: R$2,934.70 + 12-month suspension + impoundment. Repeat offense in 12 months: 3-year suspension. From 0.34 mg/L in air: CRIME." },
            { title: "Child without car seat — VERY SERIOUS", body: "Transporting a child under 10 in the front seat or without proper restraint device: 7 points + R$293.47 + impoundment." }
          ], highlights: [
            { type: "warn", text: "<strong>Specific CTB prohibitions:</strong><br>• Stopping on crosswalk (serious)<br>• Crossing continuous line (serious)<br>• Driving without license (very serious + impoundment)<br>• Driving without headlights at night (serious)" }
          ], quiz: [
            { q: "Using a cell phone while driving is:", opts: ["Light violation — just a warning", "Medium violation — 4 points", "Serious violation — 5 points and fine", "Very serious — 7 points"], correct: 2, exp: "Using a phone while driving is a SERIOUS violation: 5 points and fine of R$293.47. This applies even for hands-free if the driver is holding the device." },
            { q: "A driver travels at 80 km/h on a road with a 50 km/h limit. This is a speed excess of:", opts: ["20% — serious violation", "40% — very serious violation", "60% — very serious ×3", "Not a violation as the difference is small"], correct: 2, exp: "80 km/h in a 50 km/h zone represents 60% above the limit, constituting a VERY SERIOUS ×3 violation: fine of R$880.41 and vehicle impoundment." }
          ]},
          { title: "Test your knowledge!", type: "quiz-only", concepts: [], highlights: [
            { type: "info", text: "Time to test what you learned about violations and consequences! Answer the questions in DETRAN exam style." }
          ], quiz: [
            { q: "Professional drivers have their license suspended after accumulating how many points in 12 months?", opts: ["20 points", "25 points", "30 points", "40 points"], correct: 2, exp: "Professional drivers (passenger or cargo transporters) have a limit of 30 points in 12 months. Regular drivers have a limit of 20 points." },
            { q: "Refusing the breathalyzer test implies:", opts: ["No penalty — it's a citizen's right", "Only verbal warning", "The same administrative penalties as a positive test", "Only vehicle impoundment"], correct: 2, exp: "Refusing the breathalyzer implies the same administrative penalties: fine of R$2,934.70 + 12-month suspension + vehicle impoundment." },
            { q: "Driving without a license is what type of violation?", opts: ["Light — warning", "Medium — 4 points", "Serious — 5 points", "Very serious — 7 points + impoundment"], correct: 3, exp: "Driving without a license is a VERY SERIOUS violation: 7 points and vehicle impoundment. Driving with an expired license is a serious violation." },
            { q: "The seatbelt is mandatory for:", opts: ["Only the driver", "Driver and front passengers", "All occupants in any position", "Only on highways"], correct: 2, exp: "The seatbelt is mandatory for ALL vehicle occupants, in ALL positions. The driver is responsible for the violation of each passenger who doesn't wear it." }
          ]},
          { title: "Special Locations & How to Navigate", concepts: [
            { title: "Near Hospitals", body: "PROHIBITED unnecessary horn use (violation). Reduce speed. Take great care with ambulances and healthcare staff." },
            { title: "Near Schools", body: "Maximum speed: 20-30 km/h depending on signage. Increase attention at student entry/exit. Child running/near road = maximum risk." },
            { title: "Near Churches", body: "Reduce speed during service hours (services, weddings, funerals). Horn is prohibited at these locations." },
            { title: "Near Bus Stops", body: "Watch for pedestrians getting on/off. Bus may leave suddenly. Don't overtake a stopped bus loading passengers — very dangerous." },
            { title: "Emergency Vehicle Passage (ambulance/fire)", body: "When you hear siren: reduce speed, move right and CLEAR THE WAY. If necessary, STOP on the shoulder. NEVER follow an ambulance/fire truck — it's a violation." },
            { title: "Unsignaled Intersection", body: "Priority for those coming from the RIGHT. If both arrive simultaneously, the one from the right passes. Reduce speed when approaching." },
            { title: "Road Works & Speed Bumps", body: "Drastically reduce speed. Follow agent instructions or temporary signage. Detours can be dangerous — full attention." },
            { title: "Bridges & Overpasses", body: "PROHIBITED to overtake on bridges. Reduce speed if the bridge is narrow. Beware of water entries (heavy rain). During floods, may become impassable." }
          ], highlights: [
            { type: "info", text: "<strong>When you see a vehicle with siren and lights:</strong> Move right, reduce speed, and STOP if necessary, completely clearing the path." },
            { type: "warn", text: "<strong>Never follow emergency vehicles</strong> — it's a serious violation. They have circulation privileges, you don't!" }
          ], quiz: [
            { q: "When approaching a bus stop with people in line waiting, the driver should:", opts: ["Maintain normal speed", "Honk to signal arrival", "Reduce speed and watch for people crossing", "Change lanes quickly"], correct: 2, exp: "The driver should reduce speed and watch for pedestrians who may move suddenly (children are especially unpredictable)." },
            { q: "What is the right of way at an intersection WITHOUT any signage?", opts: ["Whoever arrives first", "Whoever comes from the RIGHT", "Whoever comes from the left", "The larger vehicle has priority"], correct: 1, exp: "At an unsignaled intersection, priority is ALWAYS for whoever comes from the RIGHT. This is a fundamental CTB principle (Art. 29, § III)." },
            { q: "Your vehicle is a rideshare near a school. What is the maximum recommended speed?", opts: ["60 km/h — normal road speed", "30 km/h — per school signage", "Can accelerate — it's a service vehicle", "20 km/h if children are visible"], correct: 1, exp: "Near schools, the maximum speed is typically 20-30 km/h as per specific signage. The risk of a child running onto the road is very high." }
          ]}
        ]
      },
      {
        title: "Driving Safely",
        desc: "Defensive driving, safety distance, adverse conditions, driver fatigue, and first aid.",
        lessons: [
          { title: "Introduction", concepts: [
            { title: "What is safe driving?", body: "Traffic safety is the result of technical knowledge, defensive posture, respect for rules, and responsibility for human life." },
            { title: "Brazilian traffic data", body: "Brazil is one of the countries with the most traffic deaths in the world. Most accidents involve speeding, alcohol, or distracted driving." },
            { title: "Active vs passive safety", body: "Active: prevents accidents (brakes, tires, lighting). Passive: minimizes damage when an accident occurs (airbag, seatbelt, bumper)." }
          ], highlights: [
            { type: "info", text: "<strong>The three risk factors in traffic:</strong><br>• Human factor (75-85% of cases): driver, pedestrian, and passenger errors<br>• Vehicle factor: mechanical failures and lack of maintenance<br>• Road factor: poor road conditions" }
          ], quiz: [
            { q: "Which factor is responsible for most traffic accidents?", opts: ["Road factor — poor road conditions", "Vehicle factor — mechanical failures", "Human factor — driver errors", "Climate factor — rain and fog"], correct: 2, exp: "The human factor accounts for 75 to 85% of traffic accidents, including errors by drivers, pedestrians, and passengers. Speeding, alcohol, and distraction are the most frequent causes." }
          ]},
          { title: "General Traffic Rules", concepts: [
            { title: "General rule: keep right", body: "On roads with more than one lane, stay in the right lane. Left lanes are for overtaking." },
            { title: "Roundabout", body: "Those in the roundabout have priority. Those about to enter must wait. Signal when exiting using the turn signal." },
            { title: "Intersections", body: "Without signage: priority for those from the right. With STOP sign: mandatory stop. With traffic light: obey the traffic light." },
            { title: "Horn use", body: "Only to signal imminent danger. Prohibited at night in cities, near hospitals, schools, and churches. Honking unnecessarily is a violation." },
            { title: "Headlight use", body: "Low beam: public road at night, tunnels and fog. High beam: highways without lighting. High beam PROHIBITED with vehicle ahead or on roads with public lighting." },
            { title: "Maximum speeds by road type", body: "Dual carriageway highway: 110 km/h\nSingle carriageway highway: 100 km/h\nFast transit road: 80 km/h\nArterial road: 60 km/h\nCollector road: 40 km/h\nLocal road: 30 km/h" }
          ], highlights: [
            { type: "info", text: "<strong>Obligations before performing a maneuver:</strong><br>1. Check the rearview mirror<br>2. Activate turn signal at least 30 meters in advance<br>3. Check the blind spot<br>4. Execute the maneuver safely" }
          ], quiz: [
            { q: "At an unsignaled intersection, two vehicles approach simultaneously. Who has priority?", opts: ["Whoever arrives first", "Whoever comes from the right", "Whoever comes from the left", "The larger vehicle"], correct: 1, exp: "At an unsignaled intersection, priority goes to whoever comes from the RIGHT (Art. 29, III of CTB). Whoever comes from the left must yield." },
            { q: "On a multi-lane road, which should be the preferred lane for driving?", opts: ["The left lane — faster", "The center lane", "The right lane — leaving others for overtaking", "Any lane, no preference"], correct: 2, exp: "The CTB determines that on multi-lane roads, the driver should stay in the right lane. The left lanes are reserved for overtaking." }
          ]},
          { title: "Defensive & Safe Driving", concepts: [
            { title: "1. Knowledge", body: "Knowing the laws, signs, and traffic rules — mandatory foundation for any safe driver." },
            { title: "2. Prediction", body: "Anticipate risk situations before they happen, observing the behavior of others and the environment." },
            { title: "3. Attention", body: "Maintain full focus on driving, without distractions (phone, loud radio, long conversations)." },
            { title: "4. Skill & Decision", body: "Technical ability to maneuver the vehicle safely and make the right decision at the right time." },
            { title: "Safety distance", body: "2-second technique: choose a fixed point. The car ahead passes it — you should pass the same point with 2 seconds of difference. In rain: 4 seconds." },
            { title: "Fatigue and drowsiness while driving", body: "Microsleep at 100 km/h: 28 meters covered without control! Mandatory break every 2 hours on highways. Signs: heavy blinking, scattered thoughts, difficulty maintaining lane." },
            { title: "Aquaplaning", body: "Loss of traction due to water layer between tire and asphalt. What to do: release the accelerator GRADUALLY, hold the steering wheel steady. NEVER brake or steer abruptly." }
          ], highlights: [
            { type: "info", text: "<strong>The 5 principles of defensive driving:</strong><br>1. Knowledge → Know the law<br>2. Attention → Always be alert<br>3. Prediction → Anticipate the risk<br>4. Opportunity → Act at the right time<br>5. Decision → Take the right action" },
            { type: "warn", text: "<strong>Places where overtaking is prohibited:</strong> continuous line, bridges, tunnels, overpasses, intersections, speed bumps, curves without visibility, near level crossings." }
          ], quiz: [
            { q: "The main objective of defensive driving is:", opts: ["Drive faster safely", "Avoid accidents regardless of others' errors", "Save fuel", "Follow speed limits"], correct: 1, exp: "Defensive driving aims to avoid accidents even when others make mistakes. It is an active prevention stance, not just passively following rules." },
            { q: "In case of aquaplaning, the driver should:", opts: ["Brake abruptly", "Turn the wheel quickly", "Release the accelerator gradually and hold the wheel steady", "Accelerate to get out of the wet area"], correct: 2, exp: "In aquaplaning, braking or steering abruptly can cause skidding. The correct action is to release the accelerator gradually, hold the wheel steady, and wait for the vehicle to regain traction." },
            { q: "On highways, what is the recommended maximum interval between rest stops?", opts: ["1 hour", "2 hours", "3 hours", "4 hours"], correct: 1, exp: "On highways, a break of at least 15 minutes every 2 hours of driving is recommended. Driver fatigue is one of the leading causes of serious accidents." }
          ]},
          { title: "Test your knowledge!", type: "quiz-only", concepts: [], highlights: [
            { type: "info", text: "Put into practice what you learned about traffic safety. Good luck!" }
          ], quiz: [
            { q: "On a highway at 100 km/h with dry road, what is the minimum recommended safety distance?", opts: ["10 meters", "25 meters", "50 meters", "100 meters"], correct: 2, exp: "The practical rule is 1 car length per 10 km/h. At 100 km/h, that's 10 cars ≈ 45-50 meters. In rain or wet conditions, double this distance." },
            { q: "High beam use is PROHIBITED when:", opts: ["On highways without lighting at night", "In the presence of vehicles ahead or oncoming", "In dense fog", "On dirt roads"], correct: 1, exp: "High beams are prohibited when there are vehicles ahead or oncoming, and on roads with public lighting. High beams blind other drivers and cause accidents." },
            { q: "In case of an accident with victims, what is the correct sequence (PAS)?", opts: ["Aid, Alert, Protect", "Protect, Alert, Aid", "Alert, Protect, Aid", "Protect, Aid, Alert"], correct: 1, exp: "PAS: Protect (signal and prevent new accidents), Alert (call SAMU/Fire/Police), Aid (provide first aid without moving the victim unnecessarily)." },
            { q: "What signs indicate driver fatigue?", opts: ["Driving faster and honking more", "Heavy blinking, scattered thoughts, difficulty keeping in lane", "Becoming calmer and driving slower", "Feeling hungry and thirsty frequently"], correct: 1, exp: "Frequent and heavy blinking, scattered thoughts, difficulty keeping lane, and microsleeps are classic signs of driver fatigue." }
          ]}
        ]
      },
      {
        title: "Care, Act & Preserve",
        desc: "Environment, citizenship in traffic, ecological issues, and the driver's socio-environmental responsibility.",
        lessons: [
          { title: "Introduction", concepts: [
            { title: "Traffic and social responsibility", body: "Driving is a social act. The driver's choices impact the environment, public health, and quality of life of the entire community." },
            { title: "Citizenship in traffic", body: "Respecting pedestrians, cyclists, the elderly, and people with disabilities is a legal and moral duty. Humanized traffic saves lives." },
            { title: "Sustainability", body: "Economical driving reduces emissions, saves fuel, and contributes to more sustainable, less polluting traffic." }
          ], highlights: [
            { type: "info", text: "<strong>Impact of vehicles:</strong> The transportation sector accounts for about 30% of CO₂ emissions in Brazil. A poorly tuned vehicle emits up to 10 times more pollutants than one in good condition." }
          ], quiz: [
            { q: "The transportation sector represents approximately what percentage of pollutant emissions in Brazilian cities?", opts: ["5 to 10%", "15 to 20%", "25 to 35%", "50 to 60%"], correct: 2, exp: "The transportation sector accounts for about 25 to 35% of pollutant emissions in Brazilian cities, being one of the main sources of air quality degradation." }
          ]},
          { title: "Care & First Aid", concepts: [
            { title: "1. PROTECT — Signal the site", body: "Signal the area to prevent new accidents. Turn on hazard lights and place the warning triangle at least 30m from the vehicle." },
            { title: "2. ALERT — Call for help", body: "Call immediately: 192 (SAMU), 193 (Fire), or 190 (Police). Provide exact location, number of victims, and their condition." },
            { title: "3. AID — Don't move victims", body: "Keep the victim conscious by talking. Don't remove motorcycle helmets (risk of cervical injury). Only move if there is imminent risk (fire, drowning)." },
            { title: "CPR — Cardiopulmonary Resuscitation", body: "If the victim isn't breathing: 30 chest compressions (center of sternum, 5-6 cm depth) + 2 rescue breaths. Maintain rhythm of 100-120 compressions per minute." },
            { title: "Bleeding", body: "Compress the wound firmly with a clean cloth. Don't remove the object that caused the wound. Elevate the limb if possible." },
            { title: "Burns", body: "Cool the area with running water for 10 minutes. Never use ice, butter, or toothpaste. Cover with a clean cloth and don't pop blisters." }
          ], highlights: [
            { type: "warn", text: "<strong>NEVER move the victim without necessity</strong> — it can worsen spinal injuries. Abandoning a crash victim is a CRIME under the CTB and Brazilian Penal Code." },
            { type: "info", text: "<strong>Emergency numbers:</strong><br>• 192 → SAMU (medical emergencies)<br>• 193 → Fire Department<br>• 190 → Military Police<br>• 191 → Federal Highway Police" }
          ], quiz: [
            { q: "In case of an accident with victims, what is the correct sequence (PAS)?", opts: ["Aid, Alert, Protect", "Protect, Alert, Aid", "Alert, Protect, Aid", "Any order is correct"], correct: 1, exp: "PAS: Protect (signal and prevent new accidents), Alert (call SAMU/Fire/Police), Aid (provide first aid without moving victim unnecessarily)." },
            { q: "What number do you call for medical emergencies (SAMU)?", opts: ["190", "191", "192", "193"], correct: 2, exp: "SAMU (Mobile Emergency Care Service) is reached at 192. Fire Department: 193. Military Police: 190." },
            { q: "Abandoning a traffic accident victim is:", opts: ["Not a crime — the driver isn't a doctor", "A minor offense — simple fine", "A crime under the CTB and Penal Code", "Only a serious traffic violation"], correct: 2, exp: "Abandoning an accident victim is a CRIME under both the Brazilian Traffic Code and Penal Code. Every driver has a legal obligation to provide aid." }
          ]},
          { title: "Environmental Care", concepts: [
            { title: "Air pollution", body: "Vehicles emit CO₂, CO, NOx, and particulate matter. An old or poorly tuned vehicle can emit up to 10x more pollutants." },
            { title: "Noise pollution", body: "Unnecessary honking, loud exhaust, and excessive acceleration contribute to urban noise pollution, harming health." },
            { title: "Incorrect waste disposal", body: "Throwing garbage, oil, or fluids on the road or in drains is an environmental crime and a traffic violation. Motor oil must be disposed of at collection points." },
            { title: "Economical driving", body: "Avoid sudden starts, maintain constant speed, keep tires properly inflated, and do preventive maintenance — reduces fuel consumption and emissions by up to 30%." },
            { title: "Inspection & Maintenance Program (I/M)", body: "Periodically evaluates vehicle emissions. Vehicles with emissions above limits must be repaired before circulating." },
            { title: "Tire and battery disposal", body: "Old tires and batteries contain toxic materials. Improper disposal contaminates soil and water. Take to the manufacturer or authorized collection point." }
          ], highlights: [
            { type: "info", text: "<strong>Economical driving tips:</strong><br>• Maintain constant speed (cruise)<br>• Avoid sudden braking<br>• Change gears at the right RPM<br>• Turn off engine at stops over 1 minute<br>• Keep tires properly inflated" }
          ], quiz: [
            { q: "The Vehicle Inspection and Maintenance Program (I/M) has what main objective?", opts: ["Collect taxes for the government", "Reduce pollution from vehicles with mechanical problems", "Check vehicle documentation", "Control the number of vehicles on the road"], correct: 1, exp: "The I/M Program periodically evaluates vehicle emissions and requires maintenance for those that pollute above limits. This significantly reduces air pollution in cities." },
            { q: "Dumping motor oil in drains or on the ground is:", opts: ["A light traffic violation", "Allowed in small amounts", "An environmental crime and traffic violation", "Only prohibited in urban areas"], correct: 2, exp: "Incorrect disposal of motor oil is an environmental crime (Law 9,605/98) and a traffic violation. One liter of oil can contaminate up to 1 million liters of water." }
          ]},
          { title: "Test your knowledge!", type: "quiz-only", concepts: [], highlights: [
            { type: "info", text: "Module 4 final test! You are almost ready for the real DETRAN exam." }
          ], quiz: [
            { q: "When an ambulance with siren and lights approaches, the driver should:", opts: ["Stop abruptly in the middle of the road", "Move right and clear the way", "Increase speed to get out of the way", "Ignore — ambulances have automatic priority"], correct: 1, exp: "The correct action is to move right, reduce speed, and stop if necessary, creating a corridor for the emergency vehicle to pass." },
            { q: "Parking in a disabled parking space without authorization is:", opts: ["Light violation", "Medium violation", "Serious violation with vehicle removal", "Not a violation for short periods"], correct: 2, exp: "Parking in a disabled space without the credential is a SERIOUS violation: 5 points, fine of R$195.23, and vehicle removal. No exceptions." },
            { q: "Which driving technique reduces fuel consumption and emissions?", opts: ["Accelerate quickly to reach speed immediately", "Maintain constant speed and avoid unnecessary braking", "Use low gears at high speeds", "Leave the engine warming for 10 minutes before starting"], correct: 1, exp: "Maintaining constant speed and anticipating situations to avoid sudden braking is the most effective technique for saving fuel and reducing emissions." },
            { q: "The correct destination for used tires is:", opts: ["Throw in regular trash", "Burn in a remote location", "Return to the manufacturer or authorized collection point", "Bury in the garden"], correct: 2, exp: "Used tires must be returned to the manufacturer or authorized collection point. Improper disposal is an environmental crime. Manufacturers are legally required to collect used tires." }
          ]}
        ]
      }
    ]
  },
  fr: {
    modules: [
      {
        title: "Panneaux, Couleurs & Routes",
        desc: "Apprenez les types de panneaux de signalisation, les feux de circulation, les marquages routiers et comment lire l'environnement routier.",
        lessons: [
          { title: "Introduction", concepts: [
            { title: "Objectif du module", body: "Ce module présente le système de signalisation routière brésilien : panneaux, feux de circulation, marquages au sol, signaux sonores et gestes des agents de circulation." },
            { title: "Pourquoi est-ce important ?", body: "La signalisation est le langage de la circulation. Qui ne connaît pas les signaux ne peut pas circuler en toute sécurité, et ignorer la signalisation est toujours une infraction." },
            { title: "Types de signalisation", body: "• Verticale (panneaux)\n• Horizontale (marquages au sol)\n• Feux de circulation\n• Dispositifs auxiliaires\n• Gestes des agents de circulation" }
          ], highlights: [
            { type: "info", text: "<strong>La signalisation a une hiérarchie :</strong> Agent de circulation > Feu de circulation > Panneaux > Marquages. En cas de conflit, respectez cet ordre." }
          ], quiz: [
            { q: "Quelle est la hiérarchie correcte de la signalisation routière, du plus au moins prioritaire ?", opts: ["Feu > Panneaux > Agent > Marquages", "Panneaux > Feu > Agent > Marquages", "Agent > Feu > Panneaux > Marquages", "Marquages > Panneaux > Feu > Agent"], correct: 2, exp: "La hiérarchie est : Agent de circulation (autorité maximale) > Feux de circulation > Panneaux > Marquages routiers. Quand un agent fait un geste, il prévaut sur tout autre signal." }
          ]},
          { title: "Signalisation Verticale (Panneaux)", concepts: [
            { title: "Réglementation (R) — panneaux circulaires rouges", body: "Imposent des obligations, interdictions ou restrictions. Doivent toujours être respectés. Ex : vitesse maximale, interdiction de dépasser, STOP." },
            { title: "Avertissement (A) — panneaux triangulaires jaunes", body: "Alertent sur des situations dangereuses à venir. Ils n'interdisent pas — ils signalent simplement la prudence. Ex : virage dangereux, zone scolaire, dos d'âne." },
            { title: "Information (I) — panneaux rectangulaires bleus/verts", body: "Informent sur les localités, distances, services, destinations et obligations d'itinéraire. Fond bleu = information. Fond vert = autoroutes." },
            { title: "Formes des panneaux — astuce d'examen", body: "Octogone → STOP\nTriangle inversé → Cédez le passage\nCercle rouge → Interdiction\nCercle bleu → Obligation\nTriangle jaune → Avertissement\nRectangle → Information" }
          ], highlights: [
            { type: "info", text: "<strong>Règle des couleurs :</strong> Bordure/fond ROUGE = interdiction ou obligation. JAUNE = attention/avertissement. BLEU = information/obligation positive. VERT = autoroutes. MARRON = tourisme." },
            { type: "warn", text: "<strong>⚠️ Panneau STOP :</strong> exige un arrêt COMPLET, même si la route semble libre. Ralentir sans s'arrêter est déjà une infraction grave !" }
          ], quiz: [
            { q: "Un panneau circulaire avec une bordure rouge et le chiffre 80 au centre indique :", opts: ["Vitesse minimale de 80 km/h", "Vitesse maximale de 80 km/h", "Poids maximum de 80 tonnes", "Distance de 80 mètres jusqu'à la zone de risque"], correct: 1, exp: "Les panneaux circulaires à bordure rouge sont de RÉGLEMENTATION et indiquent des interdictions ou restrictions. Le chiffre au centre = vitesse maximale autorisée." },
            { q: "Quelle est la forme du panneau 'Cédez le passage' ?", opts: ["Cercle rouge", "Octogone rouge", "Triangle pointe en haut", "Triangle pointe en bas"], correct: 3, exp: "Le panneau 'Cédez le passage' a une forme triangulaire avec le sommet pointant vers le bas (triangle inversé), fond blanc et bordures rouges." },
            { q: "Les panneaux d'avertissement ont quelle forme et couleur caractéristiques ?", opts: ["Circulaires et rouges", "Triangulaires pointe en haut et jaunes", "Rectangulaires et bleus", "Octogonaux et rouges"], correct: 1, exp: "Les panneaux d'avertissement sont triangulaires pointe en haut, fond jaune et symbole noir. Ils avertissent — ils n'interdisent pas." }
          ]},
          { title: "Marquages au Sol", concepts: [
            { title: "Ligne continue JAUNE", body: "Sépare les sens de circulation opposés. INTERDICTION DE DÉPASSER dans toute situation. Ligne double = encore plus dangereux. Infraction grave : 5 points." },
            { title: "Ligne discontinue JAUNE", body: "Permet le dépassement lorsqu'il y a bonne visibilité, sécurité adéquate et espace suffisant. Utiliser avec prudence et toujours signaler." },
            { title: "Ligne continue BLANCHE", body: "Marque les voies du même sens. Éviter de traverser inutilement. Peut traverser pour quitter la route (retour, accès latéral)." },
            { title: "Ligne discontinue BLANCHE", body: "Voie du même sens. Permet le changement de file dans le même sens de circulation." },
            { title: "Passage piétons (Zébra)", body: "OBLIGATOIRE de réduire la vitesse et s'arrêter s'il y a un piéton. Les piétons ont la priorité absolue. S'arrêter sur le passage est une infraction grave." },
            { title: "Piste cyclable", body: "Espace réservé aux cyclistes. Les voitures doivent respecter. Se garer sur les pistes cyclables est une infraction grave." },
            { title: "Marquages de bord (ROUGE)", body: "Aux intersections spéciales ou zones avec restrictions. Indique les zones interdites au stationnement ou à la circulation." }
          ], highlights: [
            { type: "info", text: "<strong>Règle d'or :</strong> Ligne continue (jaune ou blanche) = INTERDICTION de traverser. Ligne discontinue = autorisé à traverser en sécurité." },
            { type: "warn", text: "<strong>NE JAMAIS dépasser sur le passage piétons !</strong> C'est une infraction grave même si aucun piéton n'est visible." }
          ], quiz: [
            { q: "Que signifie une ligne jaune continue au centre de la chaussée ?", opts: ["Séparation du même sens", "Séparation des sens opposés avec interdiction de dépasser", "Dévers de la chaussée", "Début de limitation de vitesse"], correct: 1, exp: "La ligne jaune continue sépare les sens opposés et INTERDIT le dépassement. La traverser est une infraction GRAVE même sans voiture en face." },
            { q: "Quelle est la différence entre ligne blanche continue et discontinue ?", opts: ["Aucune — toutes deux interdisent de traverser", "Continue = interdit de traverser ; discontinue = permet de changer de file", "Continue = ancienne route ; discontinue = nouvelle route", "Les deux permettent de traverser librement"], correct: 1, exp: "Ligne blanche continue marque les voies du même sens — éviter de traverser. Discontinue = permet le changement de file entre voies du même sens." }
          ]},
          { title: "Feux & Signaux des Agents", concepts: [
            { title: "Feu Rouge : STOP", body: "Aucun véhicule ne peut avancer. S'arrêter est obligatoire. Infraction : très grave, 7 points et amende de R$293,47." },
            { title: "Feu Jaune : ATTENTION", body: "Indique que le feu va passer au rouge. N'avancez que si vous êtes si proche que s'arrêter serait dangereux. Ne jamais accélérer au jaune." },
            { title: "Feu Vert : AVANCEZ", body: "Autorise à avancer, mais toujours avec attention : vérifiez les piétons ou véhicules encore en train de traverser." },
            { title: "Feu Clignotant", body: "Jaune clignotant = PRUDENCE accrue. Rouge clignotant = STOP et vérifiez les conditions avant de traverser." },
            { title: "Ligne jaune continue", body: "Sépare les sens opposés. Dépassement interdit. Traverser cette ligne est une infraction grave." },
            { title: "Ligne jaune discontinue", body: "Permet le dépassement lorsqu'il y a visibilité et sécurité suffisantes." },
            { title: "Passage piétons", body: "Les piétons ont la priorité absolue. Les véhicules DOIVENT s'arrêter quand un piéton attend ou traverse." },
            { title: "Gestes des agents de circulation", body: "Bras levé = attention/stop. Bras tendu = avancez. Les deux bras ouverts = stop des deux côtés. Bras en rotation = accélérez." }
          ], highlights: [
            { type: "highlight", text: "<strong>Question fréquente à l'examen :</strong> 'Que doit faire le conducteur face au feu jaune ?' → Doit s'arrêter, sauf si l'arrêt peut causer un accident." },
            { type: "info", text: "<strong>Couleurs des marquages routiers :</strong><br>• Jaune → sépare les sens opposés<br>• Blanc → même sens, voies, arrêts<br>• Rouge → pistes cyclables et intersections spéciales" }
          ], quiz: [
            { q: "En s'approchant d'un carrefour avec un feu jaune, le conducteur doit :", opts: ["Accélérer pour passer avant qu'il ferme", "S'arrêter, sauf si l'arrêt peut causer un accident", "Toujours s'arrêter, sans exception", "Klaxonner et traverser lentement"], correct: 1, exp: "Le CTB (Art. 44) détermine que le feu jaune signifie attention et que le conducteur doit s'arrêter, sauf si l'arrêt peut causer un accident. Ne jamais accélérer au jaune." },
            { q: "Une ligne jaune continue au centre de la chaussée indique :", opts: ["Séparation de voies du même sens", "Interdiction de dépassement", "Zone de manœuvres autorisées", "Début de route à double sens"], correct: 1, exp: "La ligne jaune continue sur l'axe sépare les sens opposés et indique l'INTERDICTION de dépassement." },
            { q: "Un agent de circulation et un feu donnent des ordres opposés. Le conducteur doit obéir :", opts: ["Au feu, car c'est un équipement officiel", "À l'agent, car il a l'autorité maximale", "Au bon sens — choisir la plus sûre", "Au code — ignorer les deux et avancer lentement"], correct: 1, exp: "La hiérarchie de la signalisation place l'agent de circulation au sommet : son ordre prévaut sur le feu, les panneaux et les marquages." }
          ]},
          { title: "Testez vos connaissances !", type: "quiz-only", concepts: [], highlights: [
            { type: "info", text: "Répondez aux questions ci-dessous pour tester ce que vous avez appris dans le Module 1. Vous avez besoin de 70% de bonnes réponses." }
          ], quiz: [
            { q: "Sur un passage piétons, un piéton sur le trottoir attendant de traverser :", opts: ["N'a pas la priorité — doit attendre le feu", "A la priorité sur les véhicules", "Doit céder la priorité aux véhicules", "N'a la priorité qu'avec un feu"], correct: 1, exp: "Selon le CTB, sur un passage piétons le piéton a la priorité même sans feu de circulation. Le conducteur DOIT s'arrêter et laisser passer." },
            { q: "Feu jaune clignotant signifie :", opts: ["Arrêt obligatoire", "Avancer normalement sans réduire la vitesse", "Attention et prudence accrue", "Interdit de circuler sur cette voie"], correct: 2, exp: "Le feu jaune clignotant indique ATTENTION et prudence — le conducteur doit réduire la vitesse et vérifier les conditions avant de traverser." },
            { q: "Le conducteur qui brûle un feu rouge est passible de :", opts: ["Avertissement verbal", "Amende légère et 3 points", "Amende très grave et 7 points", "Amende grave et 5 points"], correct: 2, exp: "Brûler un feu rouge est une infraction TRÈS GRAVE : amende de R$293,47 et 7 points. En récidive peut entraîner la suspension du permis." },
            { q: "De quelle couleur sont les panneaux de réglementation indiquant une interdiction ?", opts: ["Bleu avec symbole blanc", "Vert avec lettres blanches", "Circulaire avec bordure rouge", "Jaune avec symbole noir"], correct: 2, exp: "Les panneaux de réglementation d'interdiction ont une bordure rouge, fond blanc et symbole rouge/noir. La forme est circulaire." }
          ]},
          { title: "Types de Voies & Rond-points", concepts: [
            { title: "Autoroute — Double voie", body: "Voies à grande vitesse avec deux chaussées séparées par une barrière physique. Vitesse maximale : 110 km/h. Dépassement autorisé sur la voie gauche après vérification." },
            { title: "Route nationale — Voie simple", body: "Une voie par sens. Vitesse maximale : 100 km/h. Le dépassement est l'une des manœuvres les plus dangereuses — ne le faites qu'avec pleine visibilité et espace suffisant." },
            { title: "Voie artérielle (principale)", body: "Relie différents quartiers en zone urbaine. Vitesse maximale : 60 km/h. Généralement éclairée et avec des feux fréquents." },
            { title: "Voie collectrice", body: "Distribue le trafic à l'intérieur des quartiers. Vitesse : 40 km/h. Relie les voies locales aux artérielles." },
            { title: "Voie locale (rue résidentielle)", body: "Rues courantes de quartiers. Vitesse maximale : 30 km/h. Priorité aux piétons, enfants et personnes âgées. Vigilance accrue." },
            { title: "Rond-point — Comment circuler correctement", body: "1. CEUX DANS LE ROND-POINT ont la priorité\n2. À l'ENTRÉE, cédez le passage\n3. À la SORTIE, signalez avec le clignotant\n4. Restez sur la voie extérieure (proche de la sortie souhaitée)\n5. Circuler plusieurs fois est INTERDIT — c'est une infraction" },
            { title: "Erreurs courantes en rond-point", body: "❌ Penser avoir la priorité en entrant\n❌ Ne pas mettre le clignotant en sortant\n❌ Changer de voie brusquement\n❌ Passer sur l'îlot central\n❌ Réclamer la priorité en klaxonnant" }
          ], highlights: [
            { type: "warn", text: "<strong>Règle d'or en rond-point :</strong> Celui qui ENTRE cède ; celui qui CIRCULE passe. Si vous ne savez pas quelle sortie prendre, faites le tour complet à nouveau." },
            { type: "info", text: "<strong>Conseil pratique :</strong> Avant d'entrer dans un rond-point, observez quelques secondes en attendant un espace sûr. Ne vous précipitez pas !" }
          ], quiz: [
            { q: "Dans un rond-point, quel véhicule a la priorité ?", opts: ["Celui qui entre par la droite", "Celui qui circule déjà dans le rond-point", "Celui qui entre par la gauche", "Le plus grand véhicule"], correct: 1, exp: "Ceux qui circulent DÉJÀ DANS le rond-point ont la priorité. Ceux qui vont ENTRER doivent céder en attendant un espace sûr." },
            { q: "Quelle est la vitesse maximale sur une voie locale urbaine ?", opts: ["40 km/h", "50 km/h", "30 km/h", "60 km/h"], correct: 2, exp: "Sur les voies locales (rues résidentielles), la vitesse maximale est de 30 km/h selon le CTB." },
            { q: "Vous entrez dans un rond-point mais ne savez pas quelle sortie prendre. Que faites-vous ?", opts: ["Tourner brusquement vers n'importe quelle sortie", "Faire le tour complet et sortir à la bonne", "Freiner au milieu du rond-point pour réfléchir", "Klaxonner pour demander de l'aide"], correct: 1, exp: "Si vous êtes entré dans un rond-point et n'êtes pas sûr de la sortie, il faut compléter le tour et sortir à la prochaine occasion. Ne sortez jamais brusquement !" }
          ]}
        ]
      },
      {
        title: "Choix & Conséquences",
        desc: "Infractions, pénalités, points de permis, suspension, retrait et responsabilité légale du conducteur.",
        lessons: []
      },
      {
        title: "Conduire en Sécurité",
        desc: "Conduite défensive, distance de sécurité, conditions défavorables, fatigue au volant et premiers secours.",
        lessons: []
      },
      {
        title: "Prendre Soin, Agir & Préserver",
        desc: "Environnement, citoyenneté dans la circulation, questions écologiques et responsabilité socioenvironnementale du conducteur.",
        lessons: []
      }
    ]
  }
};

// ─────────────────────────────────────────────────────
// LANGUAGE STATE
// ─────────────────────────────────────────────────────
let CURRENT_LANG = localStorage.getItem('cnhLang') || 'pt';

function t(key) {
  return (TRANSLATIONS[CURRENT_LANG] && TRANSLATIONS[CURRENT_LANG][key]) || TRANSLATIONS['pt'][key] || key;
}

function setLanguage(lang) {
  CURRENT_LANG = lang;
  localStorage.setItem('cnhLang', lang);
  applyLanguage();
  // Re-render everything
  if (typeof DB !== 'undefined' && DB) {
    renderModulesHome();
    renderPlacasGrid(window._currentPlacaFilter || 'todas');
    renderInfracoes();
    renderDirecaoCards();
  }
  // Update static UI text
  updateStaticTexts();
  // Stop TTS if running
  if (typeof TTS !== 'undefined') TTS.stop();
}

function getLangVoice() {
  if (CURRENT_LANG === 'en') return 'en-US';
  if (CURRENT_LANG === 'fr') return 'fr-FR';
  return 'pt-BR';
}

function getModuleTranslation(modIdx, lessonIdx) {
  const langMods = MODULE_TRANSLATIONS[CURRENT_LANG]?.modules;
  if (!langMods || !langMods[modIdx]) return null;
  const mod = langMods[modIdx];
  if (lessonIdx === undefined) return mod;
  return mod.lessons?.[lessonIdx] || null;
}

function applyLanguage() {
  document.documentElement.lang = CURRENT_LANG === 'fr' ? 'fr' : CURRENT_LANG === 'en' ? 'en' : 'pt-BR';
}

function updateStaticTexts() {
  // Update nav tabs
  const tabMap = {
    modulos: 'tabModulos', simulado: 'tabSimulado', placas: 'tabPlacas',
    infracoes: 'tabInfracoes', direcao: 'tabDirecao', visual: 'tabVisual', transito: 'tabTransito'
  };
  document.querySelectorAll('.tab-btn').forEach(btn => {
    const onclick = btn.getAttribute('onclick') || '';
    for (const [tab, key] of Object.entries(tabMap)) {
      if (onclick.includes(`'${tab}'`)) {
        btn.textContent = t(key);
        break;
      }
    }
  });
  // Mobile tabs
  document.querySelectorAll('.mobile-tab-btn').forEach(btn => {
    const onclick = btn.getAttribute('onclick') || '';
    for (const [tab, key] of Object.entries(tabMap)) {
      if (onclick.includes(`'${tab}'`)) {
        btn.textContent = t(key);
        break;
      }
    }
  });
  // Progress pill
  const pill = document.querySelector('.progress-pill');
  if (pill) pill.innerHTML = `<span class="pulse-dot"></span>${t('progressPill')}`;
  // Hero
  const heroTag = document.querySelector('.hero-tag');
  if (heroTag) heroTag.textContent = t('heroTag');
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) heroTitle.innerHTML = t('heroTitle');
  const heroSub = document.querySelector('.hero-sub');
  if (heroSub) heroSub.textContent = t('heroSub');
  // Stat labels
  const statLabels = document.querySelectorAll('.stat-label');
  const statKeys = ['statModulesLabel', 'statQuestionsLabel', 'statLessonsLabel', 'statScenesLabel'];
  statLabels.forEach((el, i) => { if (statKeys[i]) el.textContent = t(statKeys[i]); });
  // Section titles
  const simTitle = document.querySelector('#sec-simulado .section-title');
  if (simTitle) simTitle.textContent = t('simuladoTitle');
  const simSub = document.querySelector('#sec-simulado .section-sub');
  if (simSub) simSub.textContent = t('simuladoSub');
  const placasTitle = document.querySelector('#sec-placas .section-title');
  if (placasTitle) placasTitle.textContent = t('placasTitle');
  const placasSub = document.querySelector('#sec-placas .section-sub');
  if (placasSub) placasSub.textContent = t('placasSub');
  const infracoesTitle = document.querySelector('#sec-infracoes .section-title');
  if (infracoesTitle) infracoesTitle.textContent = t('infracoesTitle');
  const infracoesSub = document.querySelector('#sec-infracoes .section-sub');
  if (infracoesSub) infracoesSub.textContent = t('infracoesSub');
  const direcaoTitle = document.querySelector('#sec-direcao .section-title');
  if (direcaoTitle) direcaoTitle.textContent = t('direcaoTitle');
  const direcaoSub = document.querySelector('#sec-direcao .section-sub');
  if (direcaoSub) direcaoSub.textContent = t('direcaoSub');
  // Filter buttons
  const filterBtns = document.querySelectorAll('.placas-filter-btn');
  filterBtns.forEach(btn => {
    const filter = btn.dataset.filter;
    if (filter === 'todas') btn.textContent = t('filterAll');
    else if (filter === 'regulamentacao') btn.textContent = t('filterReg');
    else if (filter === 'advertencia') btn.textContent = t('filterAdv');
    else if (filter === 'indicacao') btn.textContent = t('filterInd');
  });
  // Simulado start screen
  updateSimStartButton();
  // Update language selector
  const langSel = document.getElementById('lang-select');
  if (langSel) langSel.value = CURRENT_LANG;
}

// ─────────────────────────────────────────────────────
// TEXT-TO-SPEECH ENGINE  (v2 — granular control)
//
// MODES:
//   • Frase a frase  — ▶ lê UMA frase e para. ◀/▶ navega manualmente.
//   • Seção contínua — ▶▶ lê todas as frases da seção atual e para.
//   • Tudo contínuo  — ▶▶▶ lê tudo sem parar.
//
// STATE MACHINE:
//   idle → playing → paused → playing (resume) | idle (stop)
//   Cada frase termina e o engine decide se continua ou para
//   dependendo do modo ativo.
// ─────────────────────────────────────────────────────
const TTS = (() => {

  // ── Estado interno ────────────────────────────────
  let sections  = [];   // [{ title:string, sentences:string[] }]
  let secIdx    = 0;
  let sentIdx   = 0;

  // Modos: 'single' | 'section' | 'all'
  let mode      = 'single';

  // idle | playing | paused
  let state     = 'idle';

  let rate      = 1.0;
  let utter     = null;   // utterance em execução

  // ── Helpers de texto ─────────────────────────────
  function stripHtml(html) {
    const d = document.createElement('div');
    d.innerHTML = html;
    return (d.textContent || d.innerText || '').replace(/\s+/g, ' ').trim();
  }

  function splitSentences(raw) {
    const text = raw.replace(/\n+/g, '. ').replace(/\s+/g, ' ').trim();
    // Split em pontuação de fim de frase
    const parts = text.match(/[^.!?•\n]+[.!?]*/g) || [text];
    return parts.map(s => s.trim()).filter(s => s.length > 2);
  }

  // ── Build sections a partir do DOM renderizado ────
  function buildSectionsFromElement(el) {
    const secs = [];
    if (!el) return secs;

    // Cada .concept-card → uma seção
    el.querySelectorAll('.concept-card').forEach((card, i) => {
      const titleEl = card.querySelector('.concept-title');
      const bodyEl  = card.querySelector('.concept-body');
      const title   = titleEl ? titleEl.textContent.trim() : `Seção ${i + 1}`;
      const body    = bodyEl  ? bodyEl.textContent.trim()  : '';
      const sentences = splitSentences(body);
      if (sentences.length) secs.push({ title, sentences, domEl: card });
    });

    // .warn-box / .info-box / .highlight-box → seção extra
    el.querySelectorAll('.warn-box, .info-box, .highlight-box').forEach(box => {
      const text = stripHtml(box.innerHTML).trim();
      const sentences = splitSentences(text);
      if (sentences.length) secs.push({ title: '💡 Destaque', sentences, domEl: box });
    });

    // Fallback: pega texto geral se nada encontrado
    if (!secs.length) {
      const text = el.textContent.trim();
      if (text) secs.push({ title: 'Conteúdo', sentences: splitSentences(text), domEl: null });
    }

    return secs;
  }

  // ── Anotação visual do DOM ────────────────────────
  // Envolve cada frase em <span data-tts-sent> para destaque
  function annotateDom() {
    sections.forEach((sec, si) => {
      if (!sec.domEl) return;
      const bodyEl = sec.domEl.querySelector('.concept-body') || sec.domEl;
      // Só anota se ainda não foi anotado
      if (bodyEl.querySelector('[data-tts-sent]')) return;
      bodyEl.innerHTML = sec.sentences
        .map((s, i) => `<span class="tts-sent" data-tts-sec="${si}" data-tts-sent="${i}">${s}</span>`)
        .join(' ');
    });
  }

  function clearHighlights() {
    document.querySelectorAll('.tts-sent-active').forEach(e => e.classList.remove('tts-sent-active'));
    document.querySelectorAll('.tts-sec-active').forEach(e  => e.classList.remove('tts-sec-active'));
  }

  function highlightCurrent() {
    clearHighlights();
    const sentEl = document.querySelector(`[data-tts-sec="${secIdx}"][data-tts-sent="${sentIdx}"]`);
    if (sentEl) {
      sentEl.classList.add('tts-sent-active');
      sentEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    const sec = sections[secIdx];
    if (sec?.domEl) sec.domEl.classList.add('tts-sec-active');
  }

  // ── Carrega novo conteúdo ─────────────────────────
  function load(newSections) {
    _cancel();
    sections = newSections;
    secIdx   = 0;
    sentIdx  = 0;
    state    = 'idle';
    mode     = 'single';
    setTimeout(annotateDom, 50);
    updateUI();
  }

  // ── Cancelamento interno (sem reset de posição) ───
  function _cancel() {
    if (utter) { utter.onend = null; utter.onerror = null; }
    window.speechSynthesis.cancel();
    utter = null;
  }

  // ── Falar a frase atual ───────────────────────────
  function _speakCurrent(onDone) {
    const sec  = sections[secIdx];
    const text = sec?.sentences[sentIdx];
    if (!text) { onDone && onDone('empty'); return; }

    utter = new SpeechSynthesisUtterance(text);
    utter.lang  = getLangVoice();
    utter.rate  = rate;
    utter.pitch = 1;

    utter.onend = () => { utter = null; onDone && onDone('end'); };
    utter.onerror = (e) => {
      utter = null;
      if (e.error === 'interrupted' || e.error === 'canceled') { onDone && onDone('canceled'); return; }
      onDone && onDone('error');
    };

    highlightCurrent();
    updateStatus(t('ttsReading') + ' — ' + (sec.title || ''));
    window.speechSynthesis.speak(utter);
  }

  // ── Avança posição ────────────────────────────────
  function _advance() {
    const sec = sections[secIdx];
    if (!sec) return false;
    sentIdx++;
    if (sentIdx >= sec.sentences.length) {
      sentIdx = 0;
      secIdx++;
      if (secIdx >= sections.length) return false; // chegou ao fim
    }
    return true;
  }

  // ── Recua posição ─────────────────────────────────
  function _retreat() {
    sentIdx--;
    if (sentIdx < 0) {
      secIdx = Math.max(0, secIdx - 1);
      sentIdx = Math.max(0, (sections[secIdx]?.sentences.length || 1) - 1);
    }
  }

  // ── Loop de reprodução ────────────────────────────
  // Chama _speakCurrent e, quando termina, decide se continua
  function _playLoop() {
    if (state !== 'playing') return;

    _speakCurrent((reason) => {
      if (reason === 'canceled') return; // foi interrompido externamente
      if (state !== 'playing')   return; // pausou ou parou durante a fala

      if (mode === 'single') {
        // Modo frase-a-frase: para após cada frase
        state = 'idle';
        updateUI();
        updateStatus('');
        clearHighlights();
        return;
      }

      if (mode === 'section') {
        // Continua dentro da seção atual; para ao trocar de seção
        const prevSec = secIdx;
        const ok = _advance();
        if (!ok || secIdx !== prevSec) {
          // chegou ao fim da seção (ou do conteúdo) — recua sentIdx p/ início da seção seguinte
          if (ok) sentIdx = 0; // já está na nova seção, começa do início
          state = 'idle';
          updateUI();
          updateStatus(t('ttsFinished'));
          clearHighlights();
          return;
        }
        updateUI();
        _playLoop();
        return;
      }

      // mode === 'all': continua até o fim
      const ok = _advance();
      if (!ok) {
        state = 'idle';
        secIdx  = Math.max(0, sections.length - 1);
        sentIdx = 0;
        updateUI();
        updateStatus(t('ttsFinished'));
        clearHighlights();
        return;
      }
      updateUI();
      _playLoop();
    });
  }

  // ── API Pública ───────────────────────────────────

  /** Lê apenas a frase atual e para (modo frase-a-frase) */
  function playSentence() {
    if (!sections.length) { updateStatus(t('ttsNoContent')); return; }
    _cancel();
    mode  = 'single';
    state = 'playing';
    updateUI();
    _playLoop();
  }

  /** Lê toda a seção atual e para */
  function playSection() {
    if (!sections.length) { updateStatus(t('ttsNoContent')); return; }
    _cancel();
    sentIdx = 0; // começa do início da seção
    mode    = 'section';
    state   = 'playing';
    updateUI();
    _playLoop();
  }

  /** Lê tudo de onde está até o fim */
  function playAll() {
    if (!sections.length) { updateStatus(t('ttsNoContent')); return; }
    _cancel();
    mode  = 'all';
    state = 'playing';
    updateUI();
    _playLoop();
  }

  /** Resume após pausa (mantém o modo anterior) */
  function resume() {
    if (state !== 'paused') return;
    state = 'playing';
    updateUI();
    // speechSynthesis.resume() funciona apenas se a pausa foi via pause()
    // Como cancelamos no pause, relançamos a frase atual
    _playLoop();
  }

  /** Pausa preservando posição */
  function pause() {
    if (state !== 'playing') return;
    _cancel();
    state = 'paused';
    updateUI();
    updateStatus('⏸ Pausado');
  }

  /** Para e volta ao início */
  function stop() {
    _cancel();
    state   = 'idle';
    secIdx  = 0;
    sentIdx = 0;
    clearHighlights();
    updateUI();
    updateStatus('');
  }

  /** Avança uma frase manualmente */
  function nextSentence() {
    _cancel();
    const wasActive = (state === 'playing' || state === 'paused');
    const ok = _advance();
    if (!ok) { secIdx = Math.max(0, sections.length - 1); sentIdx = 0; }
    state = 'idle';
    updateUI();
    highlightCurrent();
    if (wasActive) playSentence();
  }

  /** Recua uma frase manualmente */
  function prevSentence() {
    _cancel();
    const wasActive = (state === 'playing' || state === 'paused');
    _retreat();
    state = 'idle';
    updateUI();
    highlightCurrent();
    if (wasActive) playSentence();
  }

  /** Avança uma seção inteira */
  function nextSection() {
    _cancel();
    const wasActive = (state === 'playing' || state === 'paused');
    if (secIdx < sections.length - 1) { secIdx++; sentIdx = 0; }
    state = 'idle';
    updateUI();
    highlightCurrent();
    if (wasActive) playSection();
  }

  /** Recua uma seção inteira */
  function prevSection() {
    _cancel();
    const wasActive = (state === 'playing' || state === 'paused');
    if (secIdx > 0) { secIdx--; sentIdx = 0; }
    state = 'idle';
    updateUI();
    highlightCurrent();
    if (wasActive) playSection();
  }

  function setRate(r) {
    rate = parseFloat(r);
    const lbl = document.getElementById('tts-rate-label');
    if (lbl) lbl.textContent = rate.toFixed(1) + '×';
  }

  function updateStatus(msg) {
    const el = document.getElementById('tts-status');
    if (el) el.textContent = msg;
  }

  function updateUI() {
    const totalSec  = sections.length;
    const currentSec = sections[secIdx];
    const totalSent  = currentSec?.sentences.length || 0;

    // Contadores
    const elSec  = document.getElementById('tts-sec-label');
    const elSent = document.getElementById('tts-sent-label');
    if (elSec)  elSec.textContent  = totalSec  ? `${secIdx + 1}/${totalSec}`   : '0/0';
    if (elSent) elSent.textContent = totalSent ? `${sentIdx + 1}/${totalSent}` : '0/0';

    // Nome da seção atual
    const elSecName = document.getElementById('tts-sec-name');
    if (elSecName) elSecName.textContent = currentSec?.title || '';

    // Botões de play/pause/stop
    const btnPlay    = document.getElementById('tts-btn-play-sentence');
    const btnSecPlay = document.getElementById('tts-btn-play-section');
    const btnAllPlay = document.getElementById('tts-btn-play-all');
    const btnPause   = document.getElementById('tts-btn-pause');
    const btnStop    = document.getElementById('tts-btn-stop');

    const isPlaying = state === 'playing';
    const isPaused  = state === 'paused';
    const isIdle    = state === 'idle';

    // Esconde todos os plays quando tocando, mostra resume quando pausado
    if (btnPlay)    btnPlay.style.display    = (isIdle || isPaused) ? 'inline-flex' : 'none';
    if (btnSecPlay) btnSecPlay.style.display = (isIdle || isPaused) ? 'inline-flex' : 'none';
    if (btnAllPlay) btnAllPlay.style.display = (isIdle || isPaused) ? 'inline-flex' : 'none';

    if (btnPlay)    btnPlay.innerHTML    = isPaused && mode === 'single'  ? `▶ ${t('ttsBtnResume')}` : `▶ Frase`;
    if (btnSecPlay) btnSecPlay.innerHTML = isPaused && mode === 'section' ? `▶ ${t('ttsBtnResume')}` : `▶▶ Seção`;
    if (btnAllPlay) btnAllPlay.innerHTML = isPaused && mode === 'all'     ? `▶ ${t('ttsBtnResume')}` : `▶▶▶ Tudo`;

    if (btnPause) btnPause.style.display = isPlaying ? 'inline-flex' : 'none';
    if (btnStop)  btnStop.style.display  = (!isIdle) ? 'inline-flex' : 'none';

    // Highlight do botão de modo ativo
    [btnPlay, btnSecPlay, btnAllPlay].forEach(b => b?.classList.remove('tts-btn-mode-active'));
    if (isPlaying) {
      if (mode === 'single'  && btnPlay)    btnPlay.classList.add('tts-btn-mode-active');
      if (mode === 'section' && btnSecPlay) btnSecPlay.classList.add('tts-btn-mode-active');
      if (mode === 'all'     && btnAllPlay) btnAllPlay.classList.add('tts-btn-mode-active');
    }
  }

  // Expõe buildSectionsFromElement e stripHtml para uso externo
  return {
    load, stop, pause, resume,
    playSentence, playSection, playAll,
    nextSentence, prevSentence, nextSection, prevSection,
    setRate, updateUI,
    buildSectionsFromElement,
    stripHtml, splitSentences,
  };
})();

// ─────────────────────────────────────────────────────
// RENDER TTS PLAYER (floating bar — v2)
// ─────────────────────────────────────────────────────
function renderTTSPlayer() {
  if (document.getElementById('tts-player')) return;

  const bar = document.createElement('div');
  bar.id = 'tts-player';
  bar.className = 'tts-player';
  bar.innerHTML = `
    <div class="tts-top-row">
      <span class="tts-player-title">🔊 Leitura em Áudio</span>
      <div class="tts-position">
        <span class="tts-pos-label">Seção:</span>
        <span id="tts-sec-label" class="tts-pos-val">0/0</span>
        <span class="tts-pos-label">Frase:</span>
        <span id="tts-sent-label" class="tts-pos-val">0/0</span>
        <span id="tts-sec-name" class="tts-sec-name"></span>
      </div>
      <span id="tts-status" class="tts-status"></span>
    </div>

    <div class="tts-controls-row">

      <!-- Navegação de seção -->
      <div class="tts-group tts-group-nav">
        <span class="tts-group-label">Seção</span>
        <button class="tts-ctrl-btn" title="Seção anterior" onclick="TTS.prevSection()">⏮</button>
        <button class="tts-ctrl-btn" title="Próxima seção"  onclick="TTS.nextSection()">⏭</button>
      </div>

      <div class="tts-divider"></div>

      <!-- Navegação de frase -->
      <div class="tts-group tts-group-nav">
        <span class="tts-group-label">Frase</span>
        <button class="tts-ctrl-btn" title="Frase anterior"  onclick="TTS.prevSentence()">◀</button>
        <button class="tts-ctrl-btn" title="Próxima frase"   onclick="TTS.nextSentence()">▶</button>
      </div>

      <div class="tts-divider"></div>

      <!-- Botões de play por modo -->
      <div class="tts-group tts-group-play">
        <span class="tts-group-label">Reproduzir</span>
        <button class="tts-ctrl-btn tts-btn-mode" id="tts-btn-play-sentence"
          title="Lê só esta frase e para"
          onclick="TTS.playSentence()">▶ Frase</button>
        <button class="tts-ctrl-btn tts-btn-mode tts-btn-sec" id="tts-btn-play-section"
          title="Lê toda a seção e para"
          onclick="TTS.playSection()">▶▶ Seção</button>
        <button class="tts-ctrl-btn tts-btn-mode tts-btn-all" id="tts-btn-play-all"
          title="Lê tudo até o fim"
          onclick="TTS.playAll()">▶▶▶ Tudo</button>
      </div>

      <!-- Pausa / Stop (aparecem quando tocando) -->
      <button class="tts-ctrl-btn tts-btn-pause" id="tts-btn-pause"
        onclick="TTS.pause()" style="display:none">⏸ Pausar</button>
      <button class="tts-ctrl-btn tts-btn-stop"  id="tts-btn-stop"
        onclick="TTS.stop()"  style="display:none">⏹ Parar</button>

      <div class="tts-divider"></div>

      <!-- Velocidade -->
      <div class="tts-group tts-rate-ctrl">
        <span class="tts-group-label">Vel.</span>
        <input type="range" id="tts-rate" min="0.5" max="2" step="0.1" value="1"
          oninput="TTS.setRate(this.value)" class="tts-rate-slider">
        <span id="tts-rate-label" class="tts-rate-val">1.0×</span>
      </div>

    </div>
  `;
  document.body.appendChild(bar);
}

// ─────────────────────────────────────────────────────
// ANNOTATE DOM with TTS data attributes
// ─────────────────────────────────────────────────────
function annotateTTS(container, secs) {
  if (!container || !secs.length) return;
  const cards = container.querySelectorAll('.concept-card');
  cards.forEach((card, si) => {
    if (si >= secs.length) return;
    card.setAttribute('data-tts-sec', si);
    const bodyEl = card.querySelector('.concept-body');
    if (!bodyEl) return;
    const sentences = secs[si].sentences;
    bodyEl.innerHTML = sentences.map((s, i) =>
      `<span data-tts-sent="${i}" class="tts-sent">${s}</span>`
    ).join(' ');
  });
}

// ─────────────────────────────────────────────────────
// INJECT LANGUAGE SELECTOR into header
// ─────────────────────────────────────────────────────
function injectLangSelector() {
  if (document.getElementById('lang-select')) return;
  const headerInner = document.querySelector('.header-inner');
  if (!headerInner) return;

  const wrap = document.createElement('div');
  wrap.className = 'lang-selector';
  wrap.innerHTML = `
    <span class="lang-label">🌐</span>
    <select id="lang-select" onchange="setLanguage(this.value)" aria-label="Language / Idioma / Langue">
      <option value="pt" ${CURRENT_LANG==='pt'?'selected':''}>🇧🇷 PT</option>
      <option value="en" ${CURRENT_LANG==='en'?'selected':''}>🇺🇸 EN</option>
      <option value="fr" ${CURRENT_LANG==='fr'?'selected':''}>🇫🇷 FR</option>
    </select>
  `;
  // Insert before the hamburger button
  const hamburger = headerInner.querySelector('.hamburger');
  if (hamburger) {
    headerInner.insertBefore(wrap, hamburger);
  } else {
    headerInner.appendChild(wrap);
  }
}

// ─────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  injectLangSelector();
  renderTTSPlayer();
  applyLanguage();
  // Small delay to let main app boot
  setTimeout(updateStaticTexts, 500);
});
