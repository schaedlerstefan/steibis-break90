const ACTIVE_KEY = "steibis-break90-active";
const ARCHIVE_KEY = "steibis-break90-archive";
const PROFILE_KEY = "steibis-caddie-profile";

/* Tee data checked May 25, 2026.
   Hole lengths: Golfify scorecard. Totals/CR/Slope cross-checked against Albrecht Golf Guide and German Golf Guide. */
const TEE_DATA = {
  yellow: { label: "Gelb",   cr: 69.0, slope: 135,
    meters: [308,381,159,468,169,463,379,492,180,438,167,332,114,297,136,270,89,440] },
  blue:   { label: "Blau", cr: 67.2, slope: 131,
    meters: [294,314,133,456,151,441,364,448,154,420,157,287,109,285,129,270,89,426] },
  red:    { label: "Rot",     cr: 70.5, slope: 128,
    meters: [276,314,133,429,151,403,348,442,154,388,143,287,103,263,109,249,89,385] },
  orange: { label: "Orange", cr: 68.9, slope: 125,
    meters: [266,272,115,389,129,369,331,397,127,388,143,265,98,252,109,249,66,362] },
};

const COURSE = [
  { hole:  1, par: 4, si: 13 },
  { hole:  2, par: 4, si:  7 },
  { hole:  3, par: 3, si: 17 },
  { hole:  4, par: 5, si: 15 },
  { hole:  5, par: 3, si:  9 },
  { hole:  6, par: 5, si:  1 },
  { hole:  7, par: 4, si: 11 },
  { hole:  8, par: 5, si:  3 },
  { hole:  9, par: 3, si:  5 },
  { hole: 10, par: 5, si:  2 },
  { hole: 11, par: 3, si:  8 },
  { hole: 12, par: 4, si:  4 },
  { hole: 13, par: 3, si: 16 },
  { hole: 14, par: 4, si: 14 },
  { hole: 15, par: 3, si: 10 },
  { hole: 16, par: 4, si: 12 },
  { hole: 17, par: 3, si: 18 },
  { hole: 18, par: 5, si:  6 },
];

/* Keep for backward-compat with archived rounds that stored meters */
const COURSE_RATING = { tee: "Gelb", cr: 69.0, slope: 135, par: 70 };

const GLOSSARY = {
  "Handicap Index": "Kennzahl für deine Spielstärke. Je niedriger, desto besser. Sie hilft, Erwartungen und Zielscore realistischer zu setzen.",
  "Course Rating": "Einschätzung, welchen Score ein Scratch-Golfer auf diesem Platz erwartbar spielt.",
  Slope: "Zeigt, wie stark die Platzschwierigkeit für Bogey-Golfer steigt. 113 ist neutral; 135 ist anspruchsvoll.",
  "Stroke Index": "Schwierigkeitsrang eines Lochs von 1 bis 18. SI 1 ist das schwerste Loch.",
  "Penalty Area": "Bereich, meist rot oder gelb markiert. Bei Erleichterung fällt normalerweise ein Strafschlag an.",
  "Gelbe Penalty Area": "Penalty Area mit Erleichterungsoptionen Schlag-und-Distanz oder Zurück-auf-der-Linie; keine Standard-seitliche Erleichterung.",
  "Aus Weiss": "Ausgrenze. Der Ball darf nicht gespielt werden; normalerweise Schlag und Distanz mit Strafschlag.",
  "Provisorischer Ball": "Zusätzlicher Ball, wenn der ursprüngliche Ball außerhalb einer Penalty Area verloren oder im Aus sein könnte.",
  "Unspielbarer Ball": "Ball, den du mit einem Strafschlag für unspielbar erklärst, außer in einer Penalty Area.",
  Dropzone: "Lokal definierter Bereich zum Droppen. Ob straflos oder mit Strafschlag hängt von der Platzregel ab.",
  Besserlegen: "Lokale Regel, die das straflose Besserlegen unter bestimmten Bedingungen erlaubt, meist bei Winterregeln.",
  Biotop: "Meist Spielverbotszone. Ob straflos oder mit Strafschlag erleichtert wird, hängt von Markierung und lokalen Regeln ab.",
  "Break 90": "Runde unter 90 Schlägen. Auf Par 70 bedeutet das maximal 89 Schläge.",
  Layup: "Bewusst kürzerer, sicherer Schlag in eine gute Position.",
  "Low Point": "Tiefster Punkt des Schwungs. Entscheidend für sauberen Ballkontakt.",
  "3-Putt": "Drei Putts auf einem Grün. Einer der schnellsten Hebel für bessere Scores.",
};

const SHOT_RESULTS = [
  { label: "Exakt umgesetzt", category: "good" },
  { label: "Rechts", category: "direction" },
  { label: "Links", category: "direction" },
  { label: "Zu kurz", category: "distance" },
  { label: "Zu lang", category: "distance" },
  { label: "Getoppt", category: "contact" },
  { label: "Fett", category: "contact" },
  { label: "Aus Gelb", category: "penalty", rule: "yellow" },
  { label: "Aus Rot", category: "penalty", rule: "red" },
  { label: "Aus Weiß", category: "penalty", rule: "white" },
  { label: "Biotop", category: "penalty", rule: "biotope" },
  { label: "Ball verloren", category: "penalty", rule: "lost" },
  { label: "Provisorisch", category: "penalty", rule: "provisional" },
  { label: "Unspielbar", category: "penalty", rule: "unplayable" },
  { label: "Dropzone", category: "penalty", rule: "dropzone" },
  { label: "Besserlegen", category: "penalty", rule: "preferred" },
  { label: "Sonstiges", category: "other" },
];
const PUTT_RESULTS = ["Exakt", "Rechts", "Links", "Zu kurz", "Zu lang"];
const RESULTS = SHOT_RESULTS.map((item) => item.label);
const SHOT_LABELS = {
  "Exakt umgesetzt": ["Plan getroffen", "wie visualisiert"],
  Rechts: ["Push / Slice", "rechts verfehlt"],
  Links: ["Pull / Hook", "links verfehlt"],
  "Zu kurz": ["Short", "Carry zu kurz"],
  "Zu lang": ["Long", "über Ziel"],
  Getoppt: ["Top", "dünn getroffen"],
  Fett: ["Fat", "Boden vor Ball"],
  "Aus Rot": ["Penalty Area rot", "Regelinfo"],
  "Aus Gelb": ["Penalty Area gelb", "Regelinfo"],
  "Aus Weiß": ["Out of Bounds", "Regelinfo"],
  Biotop: ["No-Play-Zone", "Regelinfo"],
  "Ball verloren": ["Lost Ball", "Regelinfo"],
  Provisorisch: ["Provisional", "Regelinfo"],
  Unspielbar: ["Unplayable", "Regelinfo"],
  Dropzone: ["Drop Zone", "Local Rule"],
  Besserlegen: ["Preferred Lies", "Local Rule"],
  Sonstiges: ["Anderer Fehler", "notieren"],
};
const PUTT_LABELS = {
  Exakt: ["Startlinie & Speed", "wie geplant"],
  Rechts: ["Rechts vorbei", "Startlinie"],
  Links: ["Links vorbei", "Startlinie"],
  "Zu kurz": ["Zu kurz", "Speed"],
  "Zu lang": ["Zu lang", "Speed"],
};
const SHOT_TYPES = ["Tee", "Transport", "Annäherung", "Recovery", "Putt"];
const FEEDBACK_KEY = "steibis-caddie-feedback";
const FEEDBACK_QUESTIONS = [
  "War die Eingabe während der Runde schnell genug?",
  "War der KI-Caddie nachvollziehbar?",
  "Hat die Lochstrategie beim Entscheiden geholfen?",
  "Waren Regeln und Glossar verständlich?",
  "Würdest du die App in der nächsten Runde wieder nutzen?",
];

/* ── PGA score names ── */
const SCORE_NAMES_DE = {
  "-4": "4 unter Par", "-3": "Albatross", "-2": "Eagle",
  "-1": "Birdie", "0": "Par", "1": "Bogey",
  "2": "Double Bogey", "3": "Triple Bogey",
};
const SCORE_CSS = {
  "-4": "eagle", "-3": "eagle", "-2": "eagle", "-1": "birdie", "0": "par",
  "1": "bogey", "2": "double", "3": "triple",
};

const UI_TEXT = {
  de: {
    score: "Score",
    toPar: "zu Par",
    target: "Ziel",
    challenge: "Challenge",
    newRound: "Neue Runde starten",
    nextTip: "Tipp zum nächsten Schlag",
    saveRound: "Runde speichern",
    shareRound: "Link kopieren",
    resetRound: "Alle Eingaben dieser Runde zurücksetzen",
    round: "Runde",
    training: "Training",
    history: "Historie",
    settings: "Einstellungen",
  },
  en: {
    score: "Score",
    toPar: "to par",
    target: "Target",
    challenge: "Challenge",
    newRound: "Start new round",
    nextTip: "Next-shot tip",
    saveRound: "Save round",
    shareRound: "Copy link",
    resetRound: "Reset this round",
    round: "Round",
    training: "Training",
    history: "History",
    settings: "Settings",
  },
};
const HOLE_PLANS_EN = {
  1: "Controlled start. Aim at the middle of the fairway; bogey is acceptable, par is a bonus.",
  2: "Longer par 4. Keep the tee ball in play and plan the second shot to the safe side.",
  3: "Par 3: middle of the green. Avoid short-siding yourself and accept two putts.",
  4: "Par 5 without hero shots. Three solid shots beat two risky ones.",
  5: "Respect this par 3. Choose enough club and avoid the short miss.",
  6: "Hardest hole. The goal is bogey. No shot needs to be perfect.",
  7: "Longer par 4. Put the tee ball in play, then use the widest target zone.",
  8: "Par 5 and SI 3. A layup is strong when the attack is narrow.",
  9: "Long par 3. Middle green or safe front edge; no flag hunting.",
  10: "Par 5 restart. Use your bogey buffer; attack only after a good drive.",
  11: "Par 3. A stress-free chip or putt is the goal, not the perfect flag shot.",
  12: "Hard par 4. Prioritize tee-ball safety and actively avoid double bogey.",
  13: "Short par 3. Good par chance: middle green and first-putt speed.",
  14: "Short par 4. Do not overpower it; a full second shot is often better.",
  15: "Par 3. Pick the club by carry distance, not wish distance.",
  16: "Short par 4. Fairway first, then middle green. Par can happen here.",
  17: "Very short par 3. Calm swing, large target, avoid three putts.",
  18: "Finishing par 5. Attack only from a good lie; bogey is often enough.",
};

const RULE_INFO = {
  yellow: {
    title: "Aus Gelb / gelbe Penalty Area",
    body: "Bei einer gelben Penalty Area darfst du den Ball ohne Strafschlag spielen, wie er liegt. Nimmst du Erleichterung, gibt es einen Strafschlag. Die typischen Optionen sind Schlag-und-Distanz oder Zurück-auf-der-Linie. Seitliche Erleichterung mit zwei Schlägerlängen ist bei Gelb nicht die Standardoption.",
    source: "Regelbasis: R&A/USGA Regel 17.1d. Vor Turnierrunden offizielle Rules-App oder Spielleitung prüfen.",
    url: "https://www.randa.org/en/rog/the-rules-of-golf/rule-17",
    options: [
      { label: "Ball spielbar: ohne Strafschlag weiterspielen", result: "Aus Gelb", penalty: false },
      { label: "Erleichterung genommen: +1 Strafschlag", result: "Aus Gelb", penalty: true },
    ],
  },
  red: {
    title: "Aus Rot / rote Penalty Area",
    body: "Wenn der Ball in einer roten Penalty Area liegt, darfst du ihn ohne Strafschlag spielen, wie er liegt. Nimmst du Erleichterung außerhalb der Penalty Area, folgt ein Strafschlag. Rot hat zusätzlich zur Schlag-und-Distanz- und Zurück-auf-der-Linie-Erleichterung die seitliche Erleichterung innerhalb von zwei Schlägerlängen.",
    source: "Regelbasis: R&A/USGA Regel 17.1d. Vor Turnierrunden offizielle Rules-App oder Spielleitung prüfen.",
    url: "https://www.randa.org/en/rog/the-rules-of-golf/rule-17",
    options: [
      { label: "Ball spielbar: ohne Strafschlag weiterspielen", result: "Aus Rot", penalty: false },
      { label: "Erleichterung genommen: +1 Strafschlag", result: "Aus Rot", penalty: true },
    ],
  },
  white: {
    title: "Aus Weiß / Ausgrenze",
    body: "Weiße Pfosten markieren normalerweise Aus. Ein Ball im Aus darf nicht gespielt werden. Die offizielle Regel ist Schlag und Distanz: ein Strafschlag, und du spielst vom Ort des vorherigen Schlags erneut.",
    source: "Regelbasis: R&A/USGA Regel 18.2, Stroke and Distance. Vor Turnierrunden offizielle Rules-App oder Spielleitung prüfen.",
    url: "https://www.randa.org/en/rog/the-rules-of-golf/rule-18",
    options: [{ label: "Aus Weiß eintragen: +1 Strafschlag", result: "Aus Weiß", penalty: true }],
  },
  biotope: {
    title: "Biotop / Spielverbotszone",
    body: "Ein Biotop ist häufig als Spielverbotszone markiert. Daraus darf nicht gespielt werden. Ob die Erleichterung straflos oder mit Strafschlag ist, hängt von der Platzkennzeichnung und lokalen Regel ab: Spielverbotszone in einer Penalty Area führt normalerweise zu Penalty-Area-Erleichterung mit +1; Spielverbotszone als ungewöhnliche Platzverhältnisse kann straflose Erleichterung bedeuten.",
    source: "Regelbasis: R&A/USGA Regeln 16.1f und 17.1e; lokale Platzregeln unbedingt prüfen.",
    url: "https://www.randa.org/en/rog/the-rules-of-golf/rule-16",
    options: [
      { label: "Biotop in Penalty Area: +1 Strafschlag", result: "Biotop", penalty: true },
      { label: "Biotop mit strafloser Erleichterung laut Platzregel", result: "Biotop", penalty: false },
    ],
  },
  lost: {
    title: "Ball verloren",
    body: "Ist ein Ball verloren, musst du nach Schlag und Distanz verfahren: ein Strafschlag, und der nächste Schlag wird von der Stelle des vorherigen Schlags gespielt. In Privatrunden kann es lokale Sonderregeln geben, diese sind aber nicht automatisch Turnierregel.",
    source: "Regelbasis: R&A/USGA Regel 18.2. Lokale Regeln prüfen.",
    url: "https://www.randa.org/en/rog/the-rules-of-golf/rule-18",
    options: [{ label: "Ball verloren eintragen: +1 Strafschlag", result: "Ball verloren", penalty: true }],
  },
  provisional: {
    title: "Provisorischer Ball",
    body: "Ein provisorischer Ball ist erlaubt, wenn dein Ball außerhalb einer Penalty Area verloren oder im Aus sein könnte. Er ist nicht gedacht, wenn bekannt oder so gut wie sicher ist, dass der Ball in einer Penalty Area liegt. Wird der Originalball rechtzeitig gefunden und ist spielbar, wird der provisorische Ball aufgehoben.",
    source: "Regelbasis: R&A/USGA Regel 18.3. Penalty Area nach Regel 17 getrennt behandeln.",
    url: "https://www.randa.org/en/rog/the-rules-of-golf/rule-18",
    options: [
      { label: "Nur provisorisch gespielt: noch kein Strafschlag", result: "Provisorisch", penalty: false },
      { label: "Provisorischer Ball wird Ball im Spiel: +1 Strafschlag", result: "Provisorisch", penalty: true },
    ],
  },
  unplayable: {
    title: "Unspielbarer Ball",
    body: "Du darfst deinen Ball überall auf dem Platz als unspielbar erklären, außer in einer Penalty Area. Dann gibt es einen Strafschlag. Erleichterungsoptionen sind typischerweise Schlag-und-Distanz, Zurück-auf-der-Linie oder seitliche Erleichterung innerhalb von zwei Schlägerlängen.",
    source: "Regelbasis: R&A/USGA Regel 19. Ball in Penalty Area: Regel 17 nutzen.",
    url: "https://www.randa.org/en/rog/the-rules-of-golf/rule-19",
    options: [{ label: "Unspielbar genommen: +1 Strafschlag", result: "Unspielbar", penalty: true }],
  },
  dropzone: {
    title: "Dropzone / lokale Platzregel",
    body: "Dropzonen sind lokale Regeln. Ob und wann du sie benutzen darfst, hängt von der Platzregel oder Spielleitung ab. Häufig ist die Dropzone eine zusätzliche Erleichterungsoption mit Strafschlag, z.B. bei Penalty Areas.",
    source: "Regelbasis: lokale Platzregel / Spielleitung. Vor der Runde prüfen.",
    url: "https://www.randa.org/en/rog/committee-procedures",
    options: [
      { label: "Dropzone mit Strafschlag genutzt", result: "Dropzone", penalty: true },
      { label: "Dropzone laut Platzregel straflos genutzt", result: "Dropzone", penalty: false },
    ],
  },
  preferred: {
    title: "Besserlegen / Winterregel",
    body: "Besserlegen ist keine automatische Grundregel, sondern eine lokale Platzregel. Sie gilt nur, wenn sie durch den Club oder die Spielleitung aktiviert wurde, meist auf kurz gemähten Bereichen. Ohne lokale Regel darf nicht einfach bessergelegt werden.",
    source: "Regelbasis: Musterplatzregel E-3 / lokale Platzregel. Ausschreibung prüfen.",
    url: "https://www.randa.org/en/rog/committee-procedures",
    options: [
      { label: "Besserlegen laut Platzregel genutzt: straflos", result: "Besserlegen", penalty: false },
      { label: "Unsichere Anwendung markieren", result: "Besserlegen", penalty: false },
    ],
  },
};

const TRAINING_SOURCES = {
  putting: {
    title: "3-Putt vermeiden: Distanzkontrolle",
    coach: "Butch Harmon / Phil-Mickelson-Drill",
    text: "Setze Ziele bei 9, 12 und 15 Metern und putte in Zonen statt auf gelochte Treffer. Ziel: erster Putt bleibt innerhalb einer Putterlänge.",
    url: "https://www.golfdigest.com/story/do-you-know-how-to-lag-putt",
  },
  strike: {
    title: "Fett, getoppt, zu kurz: Low Point kontrollieren",
    coach: "Adam Young",
    text: "Lege eine Linie oder ein flaches Objekt knapp hinter den Ball. Trainiere, dass der tiefste Punkt vor dem Ball liegt. Das reduziert fette und getoppte Treffer.",
    url: "https://www.adamyounggolf.com/",
  },
  direction: {
    title: "Rechts/Links: Schlagform akzeptieren",
    coach: "Scott Fawcett / DECADE",
    text: "Plane mit deiner Streuung. Zielen heisst nicht Fahne, sondern Zielzone: weg von Aus, Wasser und kurzseitigen Fehlern.",
    url: "https://decade.golf/",
  },
  penalties: {
    title: "Penalty vermeiden: grosse Zahlen stoppen",
    coach: "DECADE / Course Management",
    text: "Wenn Rot oder Weiss droht, wird die sichere Seite zum Ziel. Break 90 gewinnt man oft durch den vermiedenen Strafschlag.",
    url: "https://decade.golf/",
  },
  break90: {
    title: "Break 90: weniger Trouble, weniger 3-Putts",
    coach: "Shot-Scope-Daten / Golf Monthly",
    text: "Der größte Hebel ist nicht Perfektion, sondern eine Runde mit weniger unspielbaren Abschlägen und einem 3-Putt weniger.",
    url: "https://www.golfmonthly.com/tips/how-to-break-90",
  },
};

const HOLE_PLANS = {
  1: "Kontrollierter Start. Ziel ist Fairway-Mitte, Bogey ist im Plan, Par ein Bonus.",
  2: "Längeres Par 4. Vom Tee spielbar bleiben, zweiten Schlag zur sicheren Seite planen.",
  3: "Par 3: Mitte Grün. Kurzseitig vermeiden, zwei Putts akzeptieren.",
  4: "Par 5 ohne Heldenschlag. Drei solide Schläge schlagen zwei riskante.",
  5: "Par 3 mit Respekt. Schläger eher großzügig wählen, Fehler kurz vermeiden.",
  6: "Schwerstes Loch. Break-90-Ziel ist Bogey. Kein Schlag muss perfekt sein.",
  7: "Längeres Par 4. Tee-Ball in Spiel bringen, dann zur breitesten Zielzone.",
  8: "Par 5 und SI 3. Layup ist stark, wenn der Angriff eng wirkt.",
  9: "Langes Par 3. Mitte Grün oder sichere Vorderkante, kein Fahnenjagd-Modus.",
  10: "Par 5 zum Neustart. Nutze den Bogey-Puffer, Risiko erst nach gutem Drive.",
  11: "Par 3. Ziel ist ein stressfreier Chip oder Putt, nicht die perfekte Fahne.",
  12: "Schweres Par 4. Tee-Ball priorisieren, Doppelbogey aktiv vermeiden.",
  13: "Kurzes Par 3. Gute Par-Chance: Mitte Grün, Speed beim ersten Putt.",
  14: "Kurzes Par 4. Nicht überpowern, voller zweiter Schlag ist oft besser.",
  15: "Par 3. Schläger nach Carry wählen, nicht nach Wunschdistanz.",
  16: "Kurzes Par 4. Fairway zuerst, dann Mitte Grün. Hier kann Par fallen.",
  17: "Sehr kurzes Par 3. Ruhiger Schlag, grosse Zielzone, drei Putts vermeiden.",
  18: "Par 5 Abschluss. Nur angreifen, wenn der Ball gut liegt. Bogey reicht für Break 90 oft völlig.",
};

const state = {
  activeTab: "track",
  currentHole: 0,
  selectedShotType: "Tee",
  language: "de",
  activeTee: "yellow",
  showMissOptions: false,
  showPuttMissOptions: false,
  historyView: "month",
  archive: loadArchive(),
  round: loadActiveRound(),
  profile: loadProfile(),
};

const els = {
  newRound: document.querySelector("#newRound"),
  resetRound: document.querySelector("#resetRound"),
  scoreTotal: document.querySelector("#scoreTotal"),
  toPar: document.querySelector("#toPar"),
  targetPace: document.querySelector("#targetPace"),
  breakTarget: document.querySelector("#breakTarget"),
  toggleProfile: document.querySelector("#toggleProfile"),
  profileFields: document.querySelector("#profileFields"),
  profileSummary: document.querySelector("#profileSummary"),
  handicap: document.querySelector("#handicap"),
  playerGoal: document.querySelector("#playerGoal"),
  teeSelect: document.querySelector("#teeSelect"),
  tabs: document.querySelectorAll(".tab"),
  panels: {
    track: document.querySelector("#trackPanel"),
    training: document.querySelector("#trainingPanel"),
    settings: document.querySelector("#settingsPanel"),
  },
  prevHole: document.querySelector("#prevHole"),
  nextHole: document.querySelector("#nextHole"),
  holeNumber: document.querySelector("#holeNumber"),
  parValue: document.querySelector("#parValue"),
  lengthValue: document.querySelector("#lengthValue"),
  holeScore: document.querySelector("#holeScore"),
  holeRating: document.querySelector("#holeRating"),
  toggleHoleMenu: document.querySelector("#toggleHoleMenu"),
  holeStrip: document.querySelector("#holeStrip"),
  holeWarning: document.querySelector("#holeWarning"),
  holePlan: document.querySelector("#holePlan"),
  shotTypeGrid: document.querySelector("#shotTypeGrid"),
  planHit: document.querySelector("#planHit"),
  planMiss: document.querySelector("#planMiss"),
  missOptions: document.querySelector("#missOptions"),
  shotGrid: document.querySelector("#shotGrid"),
  puttHit: document.querySelector("#puttHit"),
  puttMiss: document.querySelector("#puttMiss"),
  puttMissOptions: document.querySelector("#puttMissOptions"),
  puttGrid: document.querySelector("#puttGrid"),
  finishHole: document.querySelector("#finishHole"),
  shotList: document.querySelector("#shotList"),
  undoShot: document.querySelector("#undoShot"),
  scratchHole: document.querySelector("#scratchHole"),
  note: document.querySelector("#note"),
  noteSuggestions: document.querySelector("#noteSuggestions"),
  saveRound: document.querySelector("#saveRound"),
  shareRound: document.querySelector("#shareRound"),
  exportPdf: document.querySelector("#exportPdf"),
  shareOutput: document.querySelector("#shareOutput"),
  summaryGrid: document.querySelector("#summaryGrid"),
  topThree: document.querySelector("#topThree"),
  aiCaddie: document.querySelector("#aiCaddie"),
  aiReview: document.querySelector("#aiReview"),
  courseStrategy: document.querySelector("#courseStrategy"),
  insights: document.querySelector("#insights"),
  trainingList: document.querySelector("#trainingList"),
  coachReport: document.querySelector("#coachReport"),
  archiveList: document.querySelector("#archiveList"),
  historyStats: document.querySelector("#historyStats"),
  historyViewButtons: document.querySelectorAll("[data-history-view]"),
  glossaryList: document.querySelector("#glossaryList"),
  ruleModal: document.querySelector("#ruleModal"),
  closeRuleModal: document.querySelector("#closeRuleModal"),
  ruleTitle: document.querySelector("#ruleTitle"),
  ruleBody: document.querySelector("#ruleBody"),
  ruleOptions: document.querySelector("#ruleOptions"),
  ruleSource: document.querySelector("#ruleSource"),
  feedbackModal: document.querySelector("#feedbackModal"),
  closeFeedbackModal: document.querySelector("#closeFeedbackModal"),
  feedbackList: document.querySelector("#feedbackList"),
  feedbackText: document.querySelector("#feedbackText"),
  roundEmotion: document.querySelector("#roundEmotion"),
  saveFeedback: document.querySelector("#saveFeedback"),
  languageToggle: document.querySelector("#languageToggle"),
  shareActions: document.querySelector("#shareActions"),
  appName: document.querySelector("#appName"),
  aboutApp: document.querySelector("#aboutApp"),
  openTip: document.querySelector("#openTip"),
  infoModal: document.querySelector("#infoModal"),
  closeInfoModal: document.querySelector("#closeInfoModal"),
  infoEyebrow: document.querySelector("#infoEyebrow"),
  infoTitle: document.querySelector("#infoTitle"),
  infoBody: document.querySelector("#infoBody"),
};

/* ── Haptic ── */
function haptic(ms = 8) {
  try { navigator.vibrate?.(ms); } catch (_) {}
}

/* ── Confetti ── */
function showConfetti() {
  const COLORS = ["#163627","#295e73","#a87820","#7dba90","#ffffff","#c8e6d0","#f0c040"];
  const wrap = document.createElement("div");
  wrap.className = "confetti-wrap";
  document.body.appendChild(wrap);
  for (let i = 0; i < 34; i++) {
    const p = document.createElement("div");
    p.className = "cp";
    p.style.setProperty("--x", `${Math.random() * 100}vw`);
    p.style.setProperty("--y", `${-10 - Math.random() * 20}px`);
    p.style.setProperty("--rot", `${Math.random() * 720 - 360}deg`);
    p.style.setProperty("--c", COLORS[Math.floor(Math.random() * COLORS.length)]);
    p.style.animationDuration = `${950 + Math.random() * 650}ms`;
    p.style.animationDelay = `${Math.random() * 280}ms`;
    wrap.appendChild(p);
  }
  setTimeout(() => wrap.remove(), 2400);
}

/* ── PDF export ── */
function exportPdf() {
  window.print();
}

/* ── PGA score label ── */
function holeScoreLabel(shots, par) {
  if (!shots) return null;
  const diff = shots - par;
  const key = String(Math.max(-4, Math.min(3, diff)));
  return {
    name: SCORE_NAMES_DE[key] || (diff > 0 ? `+${diff}` : String(diff)),
    css: SCORE_CSS[key] || "triple",
  };
}

function loadProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROFILE_KEY));
    if (saved && typeof saved === "object") {
      return {
        handicap: saved.handicap ?? "",
        goal: saved.goal || "break90",
        tee: saved.tee || "yellow",
      };
    }
  } catch {
    localStorage.removeItem(PROFILE_KEY);
  }
  return { handicap: "", goal: "break90", tee: "yellow" };
}

function saveProfile() {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(state.profile));
}

function newRound() {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    course: "Golfclub Oberstaufen-Steibis",
    goal: 89,
    breakTarget: 90,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    holes: COURSE.map((hole) => ({ ...hole, shots: [], note: "" })),
  };
}

function resetRoundInputs() {
  if (!confirm("Warnung: Dadurch werden alle Eingaben der aktuellen Runde gelöscht. Gespeicherte Runden in der Historie bleiben erhalten. Wirklich zurücksetzen?")) return;
  const keepTarget = state.round.breakTarget || 90;
  state.round = newRound();
  state.round.breakTarget = keepTarget;
  state.round.goal = keepTarget - 1;
  state.currentHole = 0;
  saveActive();
  render();
}

function loadActiveRound() {
  const imported = importFromHash();
  if (imported) return imported;
  try {
    const saved = JSON.parse(localStorage.getItem(ACTIVE_KEY));
    if (saved?.holes?.length === 18) return normalizeRound(saved);
  } catch {
    localStorage.removeItem(ACTIVE_KEY);
  }
  return newRound();
}

function loadArchive() {
  try {
    const saved = JSON.parse(localStorage.getItem(ARCHIVE_KEY));
    if (Array.isArray(saved)) return saved.map(normalizeRound);
  } catch {
    localStorage.removeItem(ARCHIVE_KEY);
  }
  return [];
}

function normalizeRound(round) {
  return {
    ...newRound(),
    ...round,
    breakTarget: round.breakTarget || (round.goal ? round.goal + 1 : 90),
    holes: COURSE.map((courseHole, index) => ({
      ...courseHole,
      ...(round.holes?.[index] || {}),
      shots: Array.isArray(round.holes?.[index]?.shots) ? round.holes[index].shots : [],
      scratched: Boolean(round.holes?.[index]?.scratched),
      note: round.holes?.[index]?.note || "",
    })),
  };
}

function importFromHash() {
  if (!location.hash.startsWith("#round=")) return null;
  try {
    const json = decodeURIComponent(escape(atob(location.hash.replace("#round=", ""))));
    return normalizeRound(JSON.parse(json));
  } catch {
    return null;
  }
}

function saveActive() {
  state.round.updatedAt = new Date().toISOString();
  localStorage.setItem(ACTIVE_KEY, JSON.stringify(state.round));
}

function saveArchive() {
  localStorage.setItem(ARCHIVE_KEY, JSON.stringify(state.archive));
}

function hole(index = state.currentHole) {
  return state.round.holes[index];
}

function playedHoles(round = state.round) {
  return round.holes.filter((item) => item.shots.length > 0 || item.scratched);
}

function holeScore(item) {
  if (item.scratched) return 10;
  return item.shots.reduce((sum, shot) => sum + (shot.penalty ? 2 : 1), 0);
}

function roundScore(round = state.round) {
  return playedHoles(round).reduce((sum, item) => sum + holeScore(item), 0);
}

function playedPar(round = state.round) {
  return playedHoles(round).reduce((sum, item) => sum + item.par, 0);
}

function toPar(round = state.round) {
  const par = playedPar(round);
  return par ? roundScore(round) - par : 0;
}

function targetForPlayed(round = state.round) {
  const holes = playedHoles(round);
  const fullPar = COURSE.reduce((sum, item) => sum + item.par, 0);
  const targetOverPar = (round.breakTarget || 90) - 1 - fullPar;
  return Math.floor(holes.reduce((sum, item) => sum + item.par, 0) + (targetOverPar * holes.length) / COURSE.length);
}

function linkGlossary(text) {
  return Object.keys(GLOSSARY)
    .sort((a, b) => b.length - a.length)
    .reduce((html, term) => {
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return html.replace(new RegExp(`\\b${escaped}\\b`, "g"), `<button class="glossary-link" type="button" data-glossary="${term}">${term}</button>`);
    }, text);
}

function hcpBand() {
  const hcp = Number(state.profile.handicap);
  if (!Number.isFinite(hcp)) return "ohne HCP-Daten";
  if (hcp <= 9) return "Single-HCP";
  if (hcp <= 18) return "HCP 10-18";
  if (hcp <= 28) return "HCP 19-28";
  return "HCP 29+";
}

function t(key) {
  return UI_TEXT[state.language]?.[key] || UI_TEXT.de[key] || key;
}

function applyLanguage() {
  document.documentElement.lang = state.language;
  els.languageToggle.textContent = state.language.toUpperCase();
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  els.newRound.setAttribute("aria-label", t("newRound"));
  els.newRound.setAttribute("title", t("newRound"));
  els.openTip.textContent = t("nextTip");
  els.saveRound.textContent = t("saveRound");
  if (els.shareRound) els.shareRound.textContent = t("shareRound");
  els.resetRound.textContent = t("resetRound");
}

function formatToPar(value) {
  if (value === 0) return "E";
  return value > 0 ? `+${value}` : `${value}`;
}

function addShot(result, options = {}) {
  haptic(result === "Exakt umgesetzt" ? 18 : 8);
  if (result === "Exakt umgesetzt") showConfetti();
  state.showMissOptions = false;
  state.showPuttMissOptions = false;
  const penalty = Boolean(options.penalty);
  hole().scratched = false;
  hole().shots.push({
    result,
    penalty,
    type: options.type || state.selectedShotType,
    note: options.note || "",
    at: new Date().toISOString(),
    number: hole().shots.length + 1,
  });
  saveActive();
  render();
}

function undoShot() {
  haptic(10);
  if (hole().scratched) hole().scratched = false;
  else hole().shots.pop();
  saveActive();
  render();
}

function scratchHole() {
  haptic([18, 40, 18]);
  hole().scratched = true;
  hole().shots = [];
  saveActive();
  finishHole();
}

function openRuleModal(ruleKey) {
  const info = RULE_INFO[ruleKey];
  if (!info) return;
  els.ruleTitle.textContent = info.title;
  els.ruleBody.innerHTML = `<p>${info.body}</p>`;
  els.ruleSource.innerHTML = `${info.source} <a href="${info.url}" target="_blank" rel="noreferrer">Offizielle Regel prüfen</a>`;
  els.ruleOptions.innerHTML = info.options
    .map(
      (option, index) => `
        <button class="rule-option ${option.penalty ? "penalty" : ""}" type="button" data-rule-option="${index}">
          ${option.label}
        </button>
      `,
    )
    .join("");
  els.ruleModal.dataset.rule = ruleKey;
  els.ruleModal.hidden = false;
}

function closeRuleModal() {
  els.ruleModal.hidden = true;
  delete els.ruleModal.dataset.rule;
}

function chooseRuleOption(index) {
  const info = RULE_INFO[els.ruleModal.dataset.rule];
  const option = info?.options[index];
  if (!option) return;
  addShot(option.result, { penalty: option.penalty, note: option.label });
  closeRuleModal();
}

function setHole(index, options = {}) {
  const previous = state.currentHole;
  state.currentHole = Math.max(0, Math.min(17, index));
  state.showMissOptions = false;
  state.showPuttMissOptions = false;
  if (options.manual && state.currentHole !== previous + 1) {
    els.holeStrip.classList.remove("collapsed");
  } else {
    els.holeStrip.classList.add("collapsed");
  }
  render();
  flashAiCaddie();
  if (options.showCaddie) openInfoModal("caddie");
}

function finishHole() {
  haptic(12);
  if (state.currentHole < 17) setHole(state.currentHole + 1, { showCaddie: true });
  else {
    saveCurrentRound();
    state.activeTab = "training";
    render();
  }
}

function resultCounts(rounds = [state.round]) {
  const counts = Object.fromEntries(RESULTS.map((result) => [result, 0]));
  counts.byType = Object.fromEntries(SHOT_TYPES.map((type) => [type, 0]));
  let putts = 0;
  let penalties = 0;
  let scratched = 0;
  rounds.forEach((round) => {
    round.holes.forEach((item) => {
      if (item.scratched) scratched += 1;
      item.shots.forEach((shot) => {
        if (shot.result === "Putt" || shot.type === "putt" || shot.type === "Putt") putts += 1;
        if (counts.byType[shot.type] !== undefined) counts.byType[shot.type] += 1;
        if (shot.penalty) penalties += 1;
        if (counts[shot.result] !== undefined) counts[shot.result] += 1;
      });
    });
  });
  return { ...counts, Putts: putts, Strafschläge: penalties, Gestrichen: scratched };
}

function currentRoundCounts() {
  return resultCounts([state.round]);
}

function historicHoleCounts(holeNumber) {
  const counts = Object.fromEntries(RESULTS.map((result) => [result, 0]));
  counts.Gestrichen = 0;
  state.archive.forEach((round) => {
    const item = round.holes[holeNumber - 1];
    if (item?.scratched) counts.Gestrichen += 1;
    item?.shots.forEach((shot) => {
      if (counts[shot.result] !== undefined) counts[shot.result] += 1;
    });
  });
  return counts;
}

function noteSuggestions() {
  const notes = new Set();
  [...state.archive, state.round].forEach((round) => {
    round.holes.forEach((item) => {
      if (item.note.trim()) notes.add(item.note.trim());
    });
  });
  return [...notes].slice(-30).reverse();
}

function saveCurrentRound() {
  const normalized = normalizeRound(state.round);
  const index = state.archive.findIndex((item) => item.id === normalized.id);
  if (index >= 0) state.archive[index] = normalized;
  else state.archive.unshift(normalized);
  saveArchive();
  saveActive();
  els.shareOutput.textContent = "Runde gespeichert. Du findest sie im Archiv.";
  els.shareOutput.classList.add("active");
  renderArchive();
  openFeedbackModal();
}

function makeShareLink() {
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(state.round))));
  return `${location.origin}${location.pathname}#round=${encoded}`;
}

async function shareRound() {
  const link = makeShareLink();
  try {
    await navigator.clipboard.writeText(link);
    els.shareOutput.textContent = "Link kopiert – teile ihn direkt in WhatsApp, iMessage oder per E-Mail.";
  } catch {
    els.shareOutput.textContent = `Link: ${link}`;
  }
  els.shareOutput.classList.add("active");
}

function renderTabs() {
  els.tabs.forEach((tab) => {
    const active = tab.dataset.tab === state.activeTab;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", active);
  });
  Object.entries(els.panels).forEach(([name, panel]) => panel.classList.toggle("active", name === state.activeTab));
}

function renderScore() {
  const score = roundScore();
  els.scoreTotal.textContent = score || "0";
  els.toPar.textContent = playedHoles().length ? formatToPar(toPar()) : "E";
  els.targetPace.textContent = playedHoles().length ? targetForPlayed() : `B${state.round.breakTarget || 90}`;
  els.breakTarget.value = String(state.round.breakTarget || 90);
}

function renderProfile() {
  els.handicap.value = state.profile.handicap;
  els.playerGoal.value = state.profile.goal;
  if (els.teeSelect) els.teeSelect.value = state.activeTee;
  const teeLabel = TEE_DATA[state.activeTee]?.label || "Gelb";
  const hcpPart = state.profile.handicap === "" ? "HCP offen" : `HCP ${state.profile.handicap} · ${hcpBand()}`;
  els.profileSummary.textContent = `${hcpPart} · ${teeLabel}`;
}

function renderHoleStrip() {
  els.holeStrip.innerHTML = state.round.holes
    .map((item, index) => {
      const classes = ["hole-chip"];
      if (index === state.currentHole) classes.push("active");
      if (item.shots.length) classes.push("played");
      if (Object.values(historicHoleCounts(item.hole)).some((count) => count >= 2)) classes.push("risk");
      return `<button class="${classes.join(" ")}" type="button" data-hole="${index}" style="--difficulty:${difficultyColor(item.si)}">${item.hole}<small>Par ${item.par}</small></button>`;
    })
    .join("");
}

function renderTrack() {
  const item = hole();
  const tee = TEE_DATA[state.activeTee] || TEE_DATA.yellow;
  const meters = tee.meters[state.currentHole];

  els.holeNumber.textContent = item.hole;
  els.parValue.textContent = item.par;
  els.lengthValue.textContent = meters;

  const shots = holeScore(item);
  const label = shots > 0 ? holeScoreLabel(shots, item.par) : null;
  if (label) {
    els.holeScore.innerHTML = `${shots} Schl. <span class="score-label score-${label.css}">${label.name}</span>`;
  } else {
    els.holeScore.textContent = "0 Schläge";
  }

  els.holeRating.textContent = `SI ${item.si} · ${difficultyLabel(item.si)} · CR ${tee.cr.toFixed(1)} / Slope ${tee.slope}`;
  els.holeRating.style.background = difficultyColor(item.si);
  if (els.note) els.note.value = item.note;

  els.shotList.innerHTML = item.scratched
    ? `<div class="shot-row scratch"><strong>-</strong><span>Loch gestrichen · ${holeScore(item)} Schläge</span></div>`
    : item.shots.length
    ? (() => {
        const shot = item.shots[item.shots.length - 1];
        return `<div class="shot-row ${shot.penalty ? "penalty" : ""}"><strong>${item.shots.length}</strong><span>Letzte Eingabe: ${shot.type || "Schlag"} · ${shot.result}${shot.note ? ` · ${shot.note}` : ""}${shot.penalty ? " · +1 Strafschlag" : ""}</span></div>`;
      })()
    : `<div class="empty-state compact">Noch keine Eingabe auf diesem Loch.</div>`;

  renderHolePlan(item);
  renderAiCaddie(item);
}

function difficultyLabel(si) {
  if (si <= 3) return "sehr schwer";
  if (si <= 6) return "schwer";
  if (si <= 12) return "mittel";
  if (si <= 15) return "leichter";
  return "leicht";
}

function difficultyColor(si) {
  const colors = {
    1: "#6f1d1b", 2: "#84231f", 3: "#9b2c25", 4: "#b33b2f", 5: "#c85a3f",
    6: "#d9784d", 7: "#d99a45", 8: "#c9aa43", 9: "#b3ad45", 10: "#9cab4d",
    11: "#86a957", 12: "#72a761", 13: "#5fa66b", 14: "#4da475",
    15: "#3da27f", 16: "#329d83", 17: "#2f947d", 18: "#2e8b57",
  };
  return colors[si] || "#66716b";
}

function break90Chance() {
  const played = playedHoles().length;
  if (!played) return 72;
  const score = roundScore();
  const projected = Math.round((score / played) * 18);
  const counts = currentRoundCounts();
  const penalty = counts.Rechts + counts.Links + counts.Fett + counts.Getoppt + counts["Aus Gelb"] * 2 + counts["Aus Rot"] * 2 + counts["Aus Weiß"] * 2 + counts["Ball verloren"] * 3 + counts.Unspielbar * 2 + counts.Biotop * 2 + counts.Gestrichen * 3 + counts.Sonstiges;
  const chance = 100 - Math.max(0, projected - 89) * 8 - penalty * 2;
  return Math.max(8, Math.min(92, chance));
}

function holeRisk(item) {
  const history = historicHoleCounts(item.hole);
  const historicRisk = Object.values(history).reduce((sum, count) => sum + count, 0);
  const difficulty = Math.max(0, 7 - item.si);
  const currentTrouble = item.shots.filter((shot) => shot.result !== "Exakt umgesetzt" && shot.result !== "Putt").length;
  return Math.min(100, difficulty * 8 + historicRisk * 12 + currentTrouble * 18);
}

function nextBestDecision(item) {
  const risk = holeRisk(item);
  const shots = holeScore(item);
  const parTarget = item.par + 1;
  const hcp = Number(state.profile.handicap);
  const cautious = Number.isFinite(hcp) && hcp >= 18;
  if (shots === 0 && cautious && item.si <= 9) return "HCP-orientiert: Ball in Spiel bringen. Nimm den Schläger, mit dem Aus und Penalty Area am unwahrscheinlichsten sind.";
  if (shots === 0 && item.si <= 6) return "Tee-Ball nur in Spiel bringen. Distanz ist weniger wichtig als ein freier zweiter Schlag.";
  if (shots === 0 && item.par === 3) return "Mitte Grün oder sichere Vorderkante. Fahne ignorieren, wenn sie eng steht.";
  if (shots >= parTarget - 1) return "Schaden begrenzen: größte Zielzone, kein Schlag mit Doppel-Fehler-Potenzial.";
  if (risk > 55) return "Konservativ bleiben. Ziel ist der nächste einfache Schlag, nicht der perfekte.";
  return "Normaler Plan: klare Zielzone wählen, 80 Prozent Tempo, Ergebnis sofort tippen.";
}

function renderAiCaddie(item) {
  const chance = break90Chance();
  const risk = holeRisk(item);
  const dataPoints = state.archive.reduce((sum, round) => sum + playedHoles(round).length, 0) + playedHoles().length;
  const recommendation = nextBestDecision(item);
  const why = item.si <= 6
    ? `Loch ${item.hole} ist Stroke Index ${item.si}. Dein Ziel ist hier kontrolliertes Bogey statt Risiko.`
    : `Loch ${item.hole} erlaubt mehr Spielraum. Der Plan bleibt: klare Zielzone und nächster einfacher Schlag.`;
  const alternative = risk > 55 ? "Alternative: defensiver Schläger, Layup oder Mitte Grün." : "Alternative: normaler Schlag auf die breite Zielseite.";
  els.aiCaddie.innerHTML = `
    <h3>KI-Caddie</h3>
    <div class="metric-row">
      <div class="metric-pill"><span>Break-Chance</span><strong>${chance}%</strong><div class="ai-meter"><span style="width: ${chance}%"></span></div></div>
      <div class="metric-pill"><span>Lochrisiko</span><strong>${risk}%</strong><div class="ai-meter"><span style="width: ${risk}%"></span></div></div>
    </div>
    <div class="ai-breakdown">
      <div class="ai-line"><strong>Empfehlung</strong><p>${linkGlossary(recommendation)}</p></div>
      <div class="ai-line"><strong>Warum</strong><p>${linkGlossary(why)}</p></div>
      <div class="ai-line"><strong>Risiko</strong><p>Konservativ ab ${risk > 55 ? "jetzt" : "Fehlerfolge"} denken.</p></div>
      <div class="ai-line"><strong>Datenbasis</strong><p>${hcpBand()} · ${dataPoints} Lochdaten · ${state.archive.length} gespeicherte Runden</p></div>
      <div class="ai-line"><strong>Alternative</strong><p>${linkGlossary(alternative)}</p></div>
    </div>
    <p class="premium-note">KI-Caddie Pro: verfügbar nach 3 gespeicherten Runden mit Mehr-Runden-Trends.</p>
  `;
}

function flashAiCaddie() {
  els.aiCaddie.classList.remove("highlight");
  requestAnimationFrame(() => {
    els.aiCaddie.classList.add("highlight");
    window.setTimeout(() => els.aiCaddie.classList.remove("highlight"), 1100);
  });
}

function renderHolePlan(item) {
  const hcp = Number(state.profile.handicap);
  const breakTarget = state.round.breakTarget || 90;
  const meters = (TEE_DATA[state.activeTee] || TEE_DATA.yellow).meters[state.currentHole];
  const target = item.si <= 6 || breakTarget >= 95 || hcp >= 24 ? "Bogey-Plan" : item.par === 3 && meters <= 140 ? "Par-Chance" : "Bogey-Par";
  const scoreNow = holeScore(item);
  const risks = historicRisks(item);
  const paceText = scoreNow
    ? `Aktuell: ${scoreNow} Schläge auf diesem Loch.`
    : Number.isFinite(hcp)
      ? `Vor dem Schlag: Zielzone passend zu HCP ${hcp} und Break ${breakTarget} festlegen.`
      : "Vor dem Schlag: Zielzone festlegen, dann Ergebnis tippen.";
  els.holePlan.innerHTML = `
    <h3>${risks.length ? "Warnung & " : ""}${target} · Loch ${item.hole}</h3>
    ${risks.length ? `<p class="plan-warning"><strong>Historisch häufig:</strong> ${risks.slice(0, 2).join(" / ")}. Sichere Zielzone priorisieren.</p>` : ""}
    <p>${linkGlossary(state.language === "en" ? HOLE_PLANS_EN[item.hole] : HOLE_PLANS[item.hole])}</p>
    <p>${linkGlossary(paceText)}</p>
  `;
  els.holePlan.classList.toggle("has-warning", risks.length > 0);
}

function historicRisks(item) {
  const counts = historicHoleCounts(item.hole);
  return Object.entries(counts)
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .map(([result]) => result);
}

function renderWarning(item) {
  const risks = historicRisks(item);

  if (!risks.length) {
    els.holeWarning.classList.remove("active");
    els.holeWarning.textContent = "";
    return;
  }

  els.holeWarning.innerHTML = `<strong>Warnung Loch ${item.hole}:</strong> Historisch häufig ${risks.slice(0, 2).join(" / ")}. Break-90-Plan: Mitte Grün oder sichere Layup-Zone, keinen Heldenschlag erzwingen.`;
  els.holeWarning.classList.add("active");
}

function renderShotButtons() {
  els.shotTypeGrid.innerHTML = SHOT_TYPES.map((type) => `<button class="shot-type ${type === state.selectedShotType ? "active" : ""}" type="button" data-shot-type="${type}">${type}</button>`).join("");
  els.missOptions.hidden = !state.showMissOptions;
  els.planHit.classList.toggle("active", !state.showMissOptions);
  els.planMiss.classList.toggle("active", state.showMissOptions);
  els.puttMissOptions.hidden = !state.showPuttMissOptions;
  els.puttHit.classList.toggle("active", !state.showPuttMissOptions);
  els.puttMiss.classList.toggle("active", state.showPuttMissOptions);
  els.shotGrid.innerHTML = SHOT_RESULTS.filter((item) => item.label !== "Exakt umgesetzt").map((item) => {
    const [label, hint] = SHOT_LABELS[item.label] || [item.label, ""];
    return `<button class="shot-button" data-result="${item.label}" data-category="${item.category}" ${item.rule ? `data-rule="${item.rule}"` : ""} type="button">${label}${item.rule ? '<span class="rule-badge">i</span>' : ""}<small>${hint}</small></button>`;
  }).join("");
  els.puttGrid.innerHTML = PUTT_RESULTS.map((result) => {
    const [label, hint] = PUTT_LABELS[result] || [result, ""];
    return `<button class="shot-button" data-putt="${result}" data-category="putt" type="button">${label}<small>${hint}</small></button>`;
  }).join("");
}

function renderNotes() {
  els.noteSuggestions.innerHTML = noteSuggestions().map((note) => `<option value="${escapeHtml(note)}"></option>`).join("");
}

function renderAnalysis() {
  const counts = resultCounts();
  const played = playedHoles().length;
  const score = roundScore();
  const par = playedPar();
  const threePlus = state.round.holes.filter((item) => item.shots.filter((shot) => shot.result === "Putt" || shot.type === "putt").length >= 3).length;
  const trouble = counts.Rechts + counts.Links + counts.Getoppt + counts.Fett + counts["Zu kurz"] + counts["Zu lang"] + counts["Aus Gelb"] + counts["Aus Rot"] + counts["Aus Weiß"] + counts["Ball verloren"] + counts.Unspielbar + counts.Dropzone + counts.Biotop + counts.Sonstiges + counts.Gestrichen;
  const exactRate = counts["Exakt umgesetzt"] + trouble ? Math.round((counts["Exakt umgesetzt"] / Math.max(1, counts["Exakt umgesetzt"] + trouble)) * 100) : 0;
  const penaltyRate = played ? Math.round((counts.Strafschläge / played) * 100) : 0;
  const puttLoad = played ? Math.round((counts.Putts / played) * 100) : 0;

  els.summaryGrid.innerHTML = [
    ["Gespielte Löcher", played, Math.min(100, Math.round((played / 18) * 100)), "Datenbasis"],
    ["Score / Ziel", `${score || 0}/${played ? targetForPlayed() : 90}`, played ? Math.min(100, Math.round((score / Math.max(1, targetForPlayed())) * 100)) : 0, "Zielkorridor"],
    ["Plan getroffen", `${exactRate}%`, exactRate, `${counts["Exakt umgesetzt"]} Treffer`],
    ["Fehler-Schläge", trouble, Math.min(100, trouble * 10), "Abweichungen"],
    ["3+ Putts", threePlus, Math.min(100, threePlus * 25), "Putting"],
    ["Strafschläge", counts.Strafschläge, Math.min(100, penaltyRate), "Penalty-Last"],
    ["Gestrichen", counts.Gestrichen, Math.min(100, counts.Gestrichen * 35), "10er-Loch"],
    ["Putt-Volumen", counts.Putts, Math.min(100, puttLoad), "Putts je Loch"],
  ]
    .map(([label, value, width, sub]) => `<article class="summary-card stat-card"><span>${label}</span><strong>${value}</strong><small>${sub}</small><div class="stat-bar"><i style="width:${width}%"></i></div></article>`)
    .join("");

  renderTopThree(counts, threePlus);
  renderAiReview(counts, threePlus);

  const pace = played ? targetForPlayed() - score : 0;
  els.courseStrategy.innerHTML = `
    <h3>Course Strategy Break 90</h3>
    <p>${linkGlossary(state.language === "en" ? "Steibis is par 70. For Break 90 you have 19 strokes of buffer. Play every hole for bogey, take par only as a bonus on the shorter holes 13, 16 and 17. On Stroke Index 1-6, controlled bogey beats double-bogey risk." : "Steibis ist Par 70. Für Break 90 hast du 19 Schläge Puffer. Spiele jedes Loch auf Bogey, nimm Par nur als Bonus auf den kürzeren Löchern 13, 16 und 17. Auf Stroke Index 1-6 ist ein kontrolliertes Bogey besser als Risiko Richtung Doppelbogey.")}</p>
    <p>${played ? `Aktuell bist du ${pace >= 0 ? `${pace} Schläge im Zielkorridor` : `${Math.abs(pace)} Schläge hinter dem Zielkorridor`}.` : "Starte die Runde, dann wird der Zielkorridor laufend mitgerechnet."}</p>
  `;

  const insights = [];
  if (counts.Rechts || counts.Links || counts["Aus Gelb"] || counts["Aus Rot"] || counts["Aus Weiß"] || counts.Biotop || counts["Ball verloren"]) insights.push(["Richtung", "Plane breiter. Dein Ziel ist die sichere Hälfte des Fairways oder Grüns, nicht die Fahne."]);
  if (counts.Fett || counts.Getoppt) insights.push(["Kontakt", "Low Point und Boden-Kontakt sind dein Hebel. Erst Kontakt stabilisieren, dann Schlaglänge."]);
  if (counts["Zu kurz"] || counts["Zu lang"]) insights.push(["Länge", "Nimm bei Gefahr vorne oder hinten den konservativen Schläger. Carry-Zone statt Wunschdistanz."]);
  if (counts.Strafschläge || counts.Gestrichen) insights.push(["Strafen", "Rot, Weiss oder Streichen sind Break-90-Killer. Nächstes Ziel: Ball in Spiel, auch wenn es kürzer ist."]);
  if (threePlus) insights.push(["Putting", "Speed-Control ist Priorität. Ein 3-Putt weniger ist direkt ein Schlag besser."]);

  els.insights.innerHTML = insights.length
    ? insights.map(([title, text]) => `<article class="insight-card"><h3>${title}</h3><p>${text}</p></article>`).join("")
    : `<div class="empty-state">Noch keine Muster. Nach ein paar Löchern entsteht hier deine persönliche Steibis-Analyse.</div>`;
}

function renderAiReview(counts, threePlus) {
  const played = playedHoles().length;
  const score = roundScore();
  const projected = played ? Math.round((score / played) * 18) : 0;
  const biggest = [
    ["Richtung", counts.Rechts + counts.Links + counts.Sonstiges],
    ["Strafen", counts.Strafschläge * 3 + counts.Gestrichen * 4 + counts.Biotop * 2 + counts["Ball verloren"] * 3],
    ["Kontakt", counts.Fett + counts.Getoppt + counts["Zu kurz"] + counts["Zu lang"]],
    ["Putting", threePlus * 2],
  ].sort((a, b) => b[1] - a[1])[0];
  const action = biggest[0] === "Richtung"
    ? "Nächste Runde: breitere Startlinie und sichere Seite vor jedem Schlag festlegen."
    : biggest[0] === "Strafen"
      ? "Nächste Runde: bei Rot/Weiss-Gefahr automatisch defensiven Schläger oder Layup wählen."
    : biggest[0] === "Kontakt"
      ? "Nächste Einheit: 20 Minuten Low-Point-Drill vor jedem Distanztraining."
      : "Nächste Einheit: Lag-Putting auf 9, 12 und 15 Meter.";

  els.aiReview.innerHTML = `
    <h3>KI-Rundenurteil</h3>
    <p>${played ? `Hochrechnung über 18 Loch: ${projected}.` : "Noch keine Hochrechnung möglich."} Wichtigster Hebel aktuell: ${biggest[0]}.</p>
    <p>${action}</p>
  `;
}

function renderTopThree(counts, threePlus) {
  const items = [
    {
      title: "Richtung kontrollieren",
      score: counts.Rechts + counts.Links + counts["Aus Gelb"] * 3 + counts["Aus Rot"] * 3 + counts["Aus Weiß"] * 3 + counts["Ball verloren"] * 3 + counts.Biotop * 3 + counts.Sonstiges,
      text: "Streuung einplanen: sichere Hälfte des Fairways oder Grüns als Ziel nehmen.",
    },
    {
      title: "Ballkontakt stabilisieren",
      score: counts.Fett + counts.Getoppt + counts["Zu kurz"] + counts["Zu lang"],
      text: "Low Point und Carry priorisieren. Ein solider Kontakt schlägt den perfekten Plan.",
    },
    {
      title: "3-Putts streichen",
      score: threePlus * 3 + counts.Putts / 12,
      text: "Erster Putt in die Nähe, zweiter Putt rein. Speed vor Linie.",
    },
    {
      title: "Break-90-Disziplin",
      score: Math.max(1, playedHoles().filter((item) => holeScore(item) - item.par >= 2).length * 2 + counts.Strafschläge * 3 + counts.Gestrichen * 4),
      text: "Bogey ist ein gutes Ergebnis. Doppelbogey entsteht meist durch den zweiten Fehler.",
    },
  ]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  els.topThree.innerHTML = items
    .map(
      (item, index) => `
        <article class="top-card">
          <p class="eyebrow">Top ${index + 1}</p>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `,
    )
    .join("");
}

function renderTraining() {
  const counts = resultCounts();
  const played = playedHoles().length;
  const score = roundScore();
  const projected = played ? Math.round((score / played) * 18) : 0;
  const threePlus = state.round.holes.filter((item) => item.shots.filter((shot) => shot.result === "Putt" || shot.type === "putt").length >= 3).length;
  const trouble = counts.Rechts + counts.Links + counts.Getoppt + counts.Fett + counts["Zu kurz"] + counts["Zu lang"] + counts["Aus Gelb"] + counts["Aus Rot"] + counts["Aus Weiß"] + counts["Ball verloren"] + counts.Unspielbar + counts.Dropzone + counts.Biotop + counts.Sonstiges + counts.Gestrichen;
  const totalSignals = Math.max(1, counts["Exakt umgesetzt"] + trouble + counts.Putts + counts.Strafschläge);
  const priorities = [
    { key: "putting", score: threePlus * 4 + counts.Putts / 10 },
    { key: "strike", score: counts.Fett * 3 + counts.Getoppt * 3 + counts["Zu kurz"] + counts["Zu lang"] },
    { key: "penalties", score: counts.Strafschläge * 5 + counts.Gestrichen * 6 + counts.Biotop * 3 + counts["Ball verloren"] * 4 },
    { key: "direction", score: counts.Rechts * 2 + counts.Links * 2 + counts.Sonstiges },
    { key: "break90", score: 1 },
  ].sort((a, b) => b.score - a.score);
  const primary = TRAINING_SOURCES[priorities[0].key];
  const hcpText = hcpBand();
  const nextAction = played
    ? `${hcpText}: Fokus zuerst auf ${primary.title.toLowerCase()}. Hochrechnung aktuell ${projected} Schläge.`
    : `${hcpText}: Spiele ein paar Löcher, dann priorisiert die App automatisch Training, Caddie-Strategie und Coach-Hinweise.`;

  els.trainingList.innerHTML = `
    <article class="training-card ai-training-card">
      <p class="eyebrow">Individueller KI-Fokus</p>
      <h3>${played ? "Dein nächster Trainingshebel" : "Noch keine Rundendaten"}</h3>
      <p>${linkGlossary(nextAction)}</p>
      <p>${played ? `Datenbasis: ${played} gespielte Löcher · ${counts.Strafschläge} Strafschläge · ${threePlus} Loch/Löcher mit 3+ Putts · HCP-Profil ${hcpText}.` : "Nach der Runde entsteht hier automatisch ein Trainerplan aus Score, HCP, Schlagtyp und Fehlerprofil."}</p>
    </article>
    <article class="training-card chart-card">
      <p class="eyebrow">KI-Statistik</p>
      <h3>Fehlerprofil</h3>
      ${[
        ["Plan getroffen", counts["Exakt umgesetzt"], "good"],
        ["Richtung", counts.Rechts + counts.Links, "direction"],
        ["Kontakt", counts.Fett + counts.Getoppt, "contact"],
        ["Länge", counts["Zu kurz"] + counts["Zu lang"], "distance"],
        ["Penalty/Gestrichen", counts.Strafschläge + counts.Gestrichen, "penalty"],
        ["Putts", counts.Putts, "putt"],
      ].map(([label, value, tone]) => `<div class="chart-row ${tone}"><span>${label}</span><strong>${value}</strong><i style="width:${Math.max(4, Math.round((value / totalSignals) * 100))}%"></i></div>`).join("")}
    </article>
  `;

  els.trainingList.insertAdjacentHTML("beforeend", priorities
    .slice(0, 3)
    .map(({ key }, index) => {
      const source = TRAINING_SOURCES[key];
      return `
        <article class="training-card">
          <p class="eyebrow">${index === 0 ? "Priorität" : source.coach}</p>
          <h3>${source.title}</h3>
          <p>${source.text}</p>
          <a href="${source.url}" target="_blank" rel="noreferrer">Quelle öffnen</a>
        </article>
      `;
    })
    .join(""));
  els.trainingList.insertAdjacentHTML("beforeend", `<div class="premium-note">Mehr-Runden-Trends: Premium. Trainerbericht: Pro-Feature.</div>`);
}

function renderCoachReport() {
  const counts = resultCounts();
  const played = playedHoles().length;
  const score = roundScore();
  const focus = [
    ["Strafschläge", counts.Strafschläge + counts.Gestrichen],
    ["Richtung", counts.Rechts + counts.Links + counts["Aus Gelb"] + counts["Aus Rot"] + counts["Aus Weiß"] + counts["Ball verloren"]],
    ["Kontakt", counts.Fett + counts.Getoppt],
    ["Putting", counts.Putts],
  ].sort((a, b) => b[1] - a[1])[0][0];
  els.coachReport.innerHTML = `
    <article class="coach-card">
      <p class="eyebrow">Spielerprofil</p>
      <h3>${hcpBand()} · Ziel ${state.round.breakTarget ? `Break ${state.round.breakTarget}` : "offen"}</h3>
      <ul>
        <li>${played} gespielte Löcher, Score ${score || 0}</li>
        <li>Primärer Trainingshebel: ${focus}</li>
        <li>Schlagtypen: Tee ${counts.byType.Tee}, Transport ${counts.byType.Transport}, Annäherung ${counts.byType.Annäherung}, Recovery ${counts.byType.Recovery}, Putt ${counts.byType.Putt}</li>
      </ul>
    </article>
    <article class="coach-card">
      <p class="eyebrow">Coach-Kommentar</p>
      <h3>Vorbereitung für Trainer-Version</h3>
      <ul>
        <li>Nächste Einheit am größten Hebel ausrichten.</li>
        <li>Nächste Runde nur eine Entscheidungsregel testen.</li>
        <li>Nach 3 gespeicherten Runden wird ein stabilerer Trend sichtbar.</li>
      </ul>
      <p class="premium-note">Trainerbericht: Pro-Feature. Später exportierbar als Coach-PDF.</p>
    </article>
  `;
}

function renderArchive() {
  renderHistoryStats();
  els.archiveList.innerHTML = state.archive.length
    ? state.archive
        .map((round) => {
          const date = new Date(round.updatedAt || round.createdAt).toLocaleDateString("de-DE");
          const holes = playedHoles(round).length;
          return `
            <article class="archive-card">
              <h3>${date} · ${holes} Loch · Score ${roundScore(round) || 0}</h3>
              <p>${round.course}</p>
              <button type="button" data-load-round="${round.id}">Runde laden</button>
            </article>
          `;
        })
        .join("")
    : `<div class="empty-state">Noch keine gespeicherte Runde. Du kannst auch nach 3, 6 oder 9 Löchern speichern.</div>`;
}

function renderHistoryStats() {
  els.historyViewButtons.forEach((button) => button.classList.toggle("active", button.dataset.historyView === state.historyView));
  if (!state.archive.length) {
    els.historyStats.innerHTML = "";
    return;
  }
  const monthGroups = new Map();
  const yearGroups = new Map();
  state.archive.forEach((round) => {
    const date = new Date(round.updatedAt || round.createdAt);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const monthLabel = date.toLocaleDateString("de-DE", { month: "long", year: "numeric" });
    const yearKey = String(date.getFullYear());
    if (!monthGroups.has(monthKey)) monthGroups.set(monthKey, { label: monthLabel, type: "Monat", rounds: [] });
    if (!yearGroups.has(yearKey)) yearGroups.set(yearKey, { label: yearKey, type: "Jahr", rounds: [] });
    monthGroups.get(monthKey).rounds.push(round);
    yearGroups.get(yearKey).rounds.push(round);
  });
  const groups = state.historyView === "year" ? [...yearGroups.values()] : [...monthGroups.values()];
  els.historyStats.innerHTML = groups
    .map((group) => {
      const avgScore = Math.round(group.rounds.reduce((sum, round) => sum + roundScore(round), 0) / group.rounds.length);
      const avgHoles = Math.round(group.rounds.reduce((sum, round) => sum + playedHoles(round).length, 0) / group.rounds.length);
      const best = Math.min(...group.rounds.map((round) => roundScore(round) || 0).filter(Boolean));
      return `
        <article class="history-card">
          <p class="eyebrow">${group.type} · ${group.label}</p>
          <h3>${group.rounds.length} Runde${group.rounds.length === 1 ? "" : "n"}</h3>
          <strong>Ø ${avgScore} auf Ø ${avgHoles} Loch</strong>
          <div class="stat-bar"><i style="width:${Math.min(100, Math.round((avgHoles / 18) * 100))}%"></i></div>
          <p>Bester Score: ${Number.isFinite(best) ? best : "-"}</p>
        </article>
      `;
    })
    .join("");
}

function renderGlossary() {
  els.glossaryList.innerHTML = Object.entries(GLOSSARY)
    .map(([term, description]) => `<article class="glossary-card" id="glossary-${term.replace(/\s+/g, "-")}"><h3>${term}</h3><p>${description}</p></article>`)
    .join("");
}

function openGlossaryTerm(term) {
  state.activeTab = "settings";
  render();
  requestAnimationFrame(() => {
    const id = `glossary-${term.replace(/\s+/g, "-")}`;
    const card = document.getElementById(id);
    card?.scrollIntoView({ behavior: "smooth", block: "center" });
    card?.classList.add("highlight");
    window.setTimeout(() => card?.classList.remove("highlight"), 1200);
  });
}

function openFeedbackModal() {
  els.feedbackList.innerHTML = FEEDBACK_QUESTIONS.map(
    (question, index) => `
      <label class="feedback-row">
        <span>${question}</span>
        <select data-feedback="${index}">
          <option value="5">5 - sehr gut</option>
          <option value="4">4 - gut</option>
          <option value="3">3 - neutral</option>
          <option value="2">2 - schwierig</option>
          <option value="1">1 - schlecht</option>
        </select>
      </label>
    `,
  ).join("");
  els.feedbackText.value = "";
  els.feedbackModal.hidden = false;
}

function closeFeedbackModal() {
  els.feedbackModal.hidden = true;
}

function openInfoModal(kind) {
  const item = hole();
  const chance = break90Chance();
  const risk = holeRisk(item);
  const content = {
    metrics: {
      eyebrow: "Berechnung",
      title: "Break-Chance & Lochrisiko",
      body: `<p><strong>Break-Chance</strong> ist eine vorsichtige Schätzung aus aktuellem Score, gespielten Löchern, Break-Ziel und Fehlerlast. Je mehr gespeicherte Runden vorhanden sind, desto belastbarer wird sie.</p><p><strong>Lochrisiko</strong> kombiniert Stroke Index, historische Fehler auf diesem Loch und aktuelle Trouble-Schläge. Aktuell: Break-Chance ${chance}%, Lochrisiko ${risk}%.</p>`,
    },
    about: {
      eyebrow: "Über die App",
      title: "CoursePilot",
      body: "<p>CoursePilot hilft Amateur-Golfern, auf bekannten Plätzen smarter zu spielen: weniger Strafschläge, weniger 3-Putts, klarere Entscheidungen und ein datenbasierter Trainingsfokus.</p><p>Die App ist für Spieler gedacht, die Break-Ziele wie Break 90, 95 oder 100 verfolgen und aus jeder Runde lernen wollen.</p><p>Konzept, Umsetzung und Copyright: Stefan mit KI-Entwicklungspartner Codex, 2026. Regelhinweise ersetzen keine Spielleitung oder offiziellen Rules of Golf.</p>",
    },
    tip: {
      eyebrow: "Nächster Schlag",
      title: `Tipp Loch ${item.hole}`,
      body: `<p>${linkGlossary(nextBestDecision(item))}</p><p>Detailinfos findest du direkt im KI-Caddie unter Empfehlung, Warum, Risiko, Datenbasis und Alternative.</p>`,
    },
    caddie: {
      eyebrow: "KI-Caddie",
      title: `Loch ${item.hole}: nächster Plan`,
      body: `<p>${linkGlossary(nextBestDecision(item))}</p><p><strong>Warum:</strong> ${item.si <= 6 ? `Stroke Index ${item.si} macht dieses Loch riskanter.` : "Die beste Chance bleibt eine klare Zielzone ohne Folgefehler."}</p><p>Du findest die ausführliche Auswertung und Trainingspriorität im Menü Training.</p>`,
    },
  }[kind];
  els.infoEyebrow.textContent = content.eyebrow;
  els.infoTitle.textContent = content.title;
  els.infoBody.innerHTML = content.body;
  els.infoModal.hidden = false;
}

function closeInfoModal() {
  els.infoModal.hidden = true;
}

function toggleLanguage() {
  state.language = state.language === "de" ? "en" : "de";
  applyLanguage();
  els.shareOutput.textContent = state.language === "en"
    ? "English is active. Core navigation and scoring labels are translated; course notes keep golf terms where useful."
    : "Deutsch ist aktiv.";
  els.shareOutput.classList.add("active");
}

function shareTo(channel) {
  if (channel === "pdf") { exportPdf(); return; }
  const link = makeShareLink();
  const plainText = `Meine Runde mit CoursePilot: ${link}`;
  if (navigator.share && channel !== "instagram") {
    navigator.share({ title: "CoursePilot Runde", text: plainText, url: link }).catch(() => {});
    return;
  }
  const text = encodeURIComponent(plainText);
  const urls = {
    whatsapp: `https://wa.me/?text=${text}`,
    imessage: `sms:&body=${text}`,
  };
  if (urls[channel]) window.open(urls[channel], "_blank", "noreferrer");
}

function saveFeedbackEntry() {
  const answers = [...els.feedbackList.querySelectorAll("[data-feedback]")].map((select, index) => ({
    question: FEEDBACK_QUESTIONS[index],
    score: Number(select.value),
  }));
  const feedback = {
    roundId: state.round.id,
    at: new Date().toISOString(),
    emotion: els.roundEmotion.value,
    answers,
    text: els.feedbackText.value.trim(),
  };
  const saved = JSON.parse(localStorage.getItem(FEEDBACK_KEY) || "[]");
  saved.unshift(feedback);
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(saved));
  closeFeedbackModal();
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

function render() {
  renderTabs();
  renderScore();
  renderProfile();
  renderHoleStrip();
  renderTrack();
  renderNotes();
  renderAnalysis();
  renderTraining();
  renderCoachReport();
  renderArchive();
  renderGlossary();
  applyLanguage();
}

/* ── Init ── */

/* Sync state.activeTee from saved profile */
state.activeTee = state.profile.tee || "yellow";

renderShotButtons();

els.breakTarget.innerHTML = Array.from({ length: 36 }, (_, index) => {
  const value = index + 70;
  return `<option value="${value}">Break ${value}</option>`;
}).join("");

els.tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    haptic(5);
    state.activeTab = tab.dataset.tab;
    render();
  });
});

els.historyViewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.historyView = button.dataset.historyView;
    haptic(5);
    renderArchive();
  });
});

els.holeStrip.addEventListener("click", (event) => {
  const button = event.target.closest("[data-hole]");
  if (button) setHole(Number(button.dataset.hole), { manual: true, showCaddie: true });
});

els.shotTypeGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-shot-type]");
  if (!button) return;
  state.selectedShotType = button.dataset.shotType;
  haptic(6);
  renderShotButtons();
});

els.toggleHoleMenu.addEventListener("click", () => {
  els.holeStrip.classList.toggle("collapsed");
});

els.toggleProfile.addEventListener("click", () => {
  els.profileFields.classList.toggle("collapsed");
});

els.handicap.addEventListener("input", () => {
  state.profile.handicap = els.handicap.value;
  saveProfile();
  render();
});

els.playerGoal.addEventListener("change", () => {
  state.profile.goal = els.playerGoal.value;
  saveProfile();
  render();
});

if (els.teeSelect) {
  els.teeSelect.addEventListener("change", () => {
    state.activeTee = els.teeSelect.value;
    state.profile.tee = state.activeTee;
    saveProfile();
    render();
  });
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-glossary]");
  if (button) openGlossaryTerm(button.dataset.glossary);
});

els.shotGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-result]");
  if (!button) return;
  if (button.dataset.rule) openRuleModal(button.dataset.rule);
  else addShot(button.dataset.result);
});

els.planHit.addEventListener("click", () => addShot("Exakt umgesetzt"));
els.planMiss.addEventListener("click", () => {
  state.showMissOptions = true;
  haptic(8);
  renderShotButtons();
});

els.puttHit.addEventListener("click", () => addShot("Putt: Exakt", { type: "Putt" }));
els.puttMiss.addEventListener("click", () => {
  state.showPuttMissOptions = true;
  haptic(8);
  renderShotButtons();
});

els.puttGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-putt]");
  if (button) addShot(`Putt: ${button.dataset.putt}`, { type: "Putt" });
});

els.ruleOptions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-rule-option]");
  if (button) chooseRuleOption(Number(button.dataset.ruleOption));
});

els.closeRuleModal.addEventListener("click", closeRuleModal);
els.ruleModal.addEventListener("click", (event) => {
  if (event.target === els.ruleModal) closeRuleModal();
});

els.closeFeedbackModal.addEventListener("click", closeFeedbackModal);
els.feedbackModal.addEventListener("click", (event) => {
  if (event.target === els.feedbackModal) closeFeedbackModal();
});
els.saveFeedback.addEventListener("click", saveFeedbackEntry);
els.languageToggle.addEventListener("click", toggleLanguage);
els.aboutApp.addEventListener("click", () => openInfoModal("about"));
els.openTip.addEventListener("click", () => openInfoModal("tip"));
els.aiCaddie.addEventListener("click", (event) => {
  if (event.target.closest(".metric-pill")) openInfoModal("metrics");
});
els.closeInfoModal.addEventListener("click", closeInfoModal);
els.infoModal.addEventListener("click", (event) => {
  if (event.target === els.infoModal) closeInfoModal();
});

els.shareActions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-share]");
  if (button) shareTo(button.dataset.share);
});

els.finishHole.addEventListener("click", finishHole);
els.undoShot.addEventListener("click", undoShot);
els.scratchHole.addEventListener("click", scratchHole);
els.prevHole.addEventListener("click", () => setHole(state.currentHole - 1, { manual: true, showCaddie: true }));
els.nextHole.addEventListener("click", () => setHole(state.currentHole + 1, { manual: true, showCaddie: true }));

if (els.note) {
  els.note.addEventListener("input", () => {
    hole().note = els.note.value;
    saveActive();
  });
}

els.saveRound.addEventListener("click", saveCurrentRound);
els.shareRound.addEventListener("click", shareRound);
els.resetRound.addEventListener("click", resetRoundInputs);

els.breakTarget.addEventListener("change", () => {
  state.round.breakTarget = Number(els.breakTarget.value);
  state.round.goal = state.round.breakTarget - 1;
  /* Keep playerGoal in sync with breakTarget for backward-compat */
  const goalMap = { 90: "break90", 95: "break95", 100: "break100" };
  const mapped = goalMap[state.round.breakTarget];
  if (mapped) {
    state.profile.goal = mapped;
    els.playerGoal.value = mapped;
    saveProfile();
  }
  saveActive();
  render();
});

els.newRound.addEventListener("click", () => {
  if (playedHoles().length && !confirm("Neue Runde starten? Die aktuelle Runde vorher speichern, falls du sie behalten willst.")) return;
  state.round = newRound();
  state.currentHole = 0;
  saveActive();
  render();
});

els.archiveList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-load-round]");
  if (!button) return;
  const saved = state.archive.find((round) => round.id === button.dataset.loadRound);
  if (!saved) return;
  state.round = normalizeRound(saved);
  state.currentHole = 0;
  state.activeTab = "track";
  saveActive();
  render();
});

render();
