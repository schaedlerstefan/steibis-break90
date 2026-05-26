const ACTIVE_KEY = "steibis-break90-active";
const ARCHIVE_KEY = "steibis-break90-archive";
const PROFILE_KEY = "steibis-caddie-profile";
const ONBOARDING_KEY = "coursepilot-onboarding-seen";

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
  Score: "Gesamtzahl deiner Schläge auf den gespielten Löchern.",
  Par: "Erwartete Schlagzahl eines Lochs für einen sehr guten Spieler.",
  Bogey: "Ein Schlag über Par. Für Break 90 ist ein kontrolliertes Bogey oft ein gutes Ergebnis.",
  Birdie: "Ein Schlag unter Par.",
  Eagle: "Zwei Schläge unter Par.",
  "Double Bogey": "Zwei Schläge über Par. Meist entsteht es durch einen zweiten Fehler nach dem ersten Fehler.",
  "Break-Ziel": "Der Score, den du unterbieten willst, zum Beispiel Break 90.",
  "Zielkorridor": "Vergleich zwischen deinem aktuellen Score und dem Score, der noch zu deinem Break-Ziel passt.",
  Abschlag: "Startbereich eines Lochs. Die Farbe legt die Länge und Schwierigkeit fest.",
  Tee: "Der erste Schlag auf einem Loch.",
  Transport: "Ein Schlag, der den Ball kontrolliert weiter in Richtung Grün bringt, ohne zwingend die Fahne anzugreifen.",
  Annäherung: "Schlag Richtung Grün oder Fahne, meist mit Eisen, Wedge oder kurzem Schläger.",
  Putt: "Schlag auf dem Grün mit dem Putter.",
  "KI-Caddie": "Automatischer Tipp aus Score, HCP, Lochschwierigkeit, Schlagtyp und bisherigen Fehlern.",
  "Break-Chance": "Schätzung, wie gut dein aktueller Verlauf noch zu deinem Break-Ziel passt.",
  Lochrisiko: "Kombination aus Lochschwierigkeit, Historie und aktuellen Fehlern.",
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
  "Low Point": "Tiefster Punkt des Schwungs. Er entscheidet oft, ob du fett, dünn oder sauber triffst.",
  Zielseite: "Die Seite, auf der der nächste Schlag einfacher bleibt, auch wenn der aktuelle Schlag nicht perfekt ist.",
  "Pre-Shot-Routine": "Kurzer, wiederholbarer Ablauf vor dem Schlag: Ziel wählen, Schlag sehen, ausrichten, ausführen.",
};

const RULE_TITLES = {
  yellow: "Gelbe Zone",
  red: "Rote Zone",
  white: "Aus",
  biotope: "Biotop",
  lost: "Ball weg",
  provisional: "Provisorischer Ball",
  unplayable: "Unspielbar",
  dropzone: "Dropzone",
  preferred: "Besserlegen",
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
  "Aus Rot": ["Rote Zone", "Wasser/rote Pfosten"],
  "Aus Gelb": ["Gelbe Zone", "gelbe Pfosten"],
  "Aus Weiß": ["Aus", "weiße Pfosten"],
  Biotop: ["Biotop", "nicht spielen"],
  "Ball verloren": ["Ball weg", "nicht gefunden"],
  Provisorisch: ["Provisorischer Ball", "Sicherheitsball"],
  Unspielbar: ["Unspielbar", "Ball liegt schlecht"],
  Dropzone: ["Dropzone", "Platzregel"],
  Besserlegen: ["Besserlegen", "Winterregel"],
  Sonstiges: ["Anderer Fehler", "notieren"],
};
const PUTT_LABELS = {
  Exakt: ["Startlinie & Speed", "wie geplant"],
  Rechts: ["Rechts vorbei", "Startlinie"],
  Links: ["Links vorbei", "Startlinie"],
  "Zu kurz": ["Zu kurz", "Speed"],
  "Zu lang": ["Zu lang", "Speed"],
};
const SHOT_TYPES = ["Tee", "Transport", "Annäherung", "Putt"];
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
    nextTip: "Weitere Empfehlungen vom KI-Caddie",
    saveRound: "Runde speichern",
    shareRound: "↗ Teilen",
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
    nextTip: "More AI caddie recommendations",
    saveRound: "Save round",
    shareRound: "↗ Share",
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

const TRAINING_DETAILS = {
  putting: {
    tools: "Putter, 6 Tees, 3 Bälle",
    time: "18 Minuten",
    place: "Putting-Grün",
    drill: "3 Zonen bei 9, 12 und 15 Metern. Ziel ist nicht Lochen, sondern jeder erste Putt bleibt in einer Putterlänge.",
    quality: "Butch Harmon steht für einfache, scoreorientierte Routinen. Der Tipp ist deshalb bewusst messbar und nicht technisch überladen.",
  },
  strike: {
    tools: "Eisen 7, Alignment-Stick oder Handtuch, 20 Bälle",
    time: "22 Minuten",
    place: "Range oder Kurzspielbereich",
    drill: "Lege ein flaches Ziel knapp hinter den Ball. Triff 10 Bälle ohne Bodenkontakt vor dem Ball, danach 10 normale Bälle mit gleicher Routine.",
    quality: "Adam Young arbeitet stark über Kontakt, Low Point und Ballflug. Das passt, wenn fett, getoppt oder Distanzfehler dominieren.",
  },
  direction: {
    tools: "2 Alignment-Sticks, 15 Bälle",
    time: "20 Minuten",
    place: "Range",
    drill: "Markiere eine breite Zielzone. Jeder Ball zählt als gut, wenn er spielbar bleibt. Fahnen oder schmale Ziele werden ignoriert.",
    quality: "Scott Fawcett/DECADE steht für Streuung, Erwartungswerte und Course Management. Der Tipp schützt vor unnötigen Strafschlägen.",
  },
  penalties: {
    tools: "Scorekarte, Stift, 10 Bälle",
    time: "15 Minuten plus nächste Runde",
    place: "Vor der Runde und Tee-Box",
    drill: "Lege vor jedem Risiko-Loch eine No-Go-Seite und einen defensiven Schläger fest. Treffer zählt, wenn der Ball sicher spielbar bleibt.",
    quality: "DECADE-Prinzipien reduzieren große Zahlen. Für Break-Ziele ist der vermiedene Strafschlag oft wertvoller als ein perfekter Schlag.",
  },
  break90: {
    tools: "Scorekarte, Putter, Lieblings-Wedge",
    time: "30 Minuten",
    place: "Kurzspielbereich",
    drill: "10 Minuten Lag-Putts, 10 Minuten einfache Chips, 10 Minuten Routine: Ziel, Schlagbild, Commitment.",
    quality: "Der Ansatz bündelt typische Break-90-Hebel: Ball im Spiel, weniger 3-Putts, weniger Folgefehler.",
  },
};

const COURSE_EXPERTS = [
  {
    name: "Butch Harmon",
    role: "Tee & Course Management",
    advice: "Wähle ein kleines Ziel, richte dich bewusst aus und spiele den Schläger, der den Ball sicher ins Spiel bringt.",
    url: "https://www.golfdigest.com/story/butch-harmon-driving-tips",
  },
  {
    name: "Dan Grieve",
    role: "Short Game",
    advice: "Rund ums Grün zählt Einfachheit: vorher entscheiden, ob der Ball rollen oder fliegen soll, dann den passenden Schlag wählen.",
    url: "https://www.golfmonthly.com/tips/short-game-guru-dan-grieve-answers-your-questions-on-chipping-pitching-bunkers-and-the-dreaded-yips",
  },
  {
    name: "Chris Como",
    role: "Bewegung & Kontakt",
    advice: "Achte auf klare Schlagaufgabe und sauberen Kontakt. Technik ist Mittel zum Zweck, nicht der Gedanke über dem Ball.",
    url: "https://chriscomo.com/",
  },
  {
    name: "Bob Rotella",
    role: "Mental Game",
    advice: "Akzeptiere, dass Golf Fehler enthält. Entscheidend ist Commitment zum nächsten Schlag, nicht Ärger über den letzten.",
    url: "https://www.golfmonthly.com/features/the-game/bob-rotella-how-to-master-the-mental-game-80146",
  },
];

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
  trainingSubtab: "training",
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
  trainingSubtabs: document.querySelectorAll("[data-training-subtab]"),
  trainingSubpanels: document.querySelectorAll("[data-training-panel]"),
  statVisuals: document.querySelector("#statVisuals"),
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
  frontSwingVideo: document.querySelector("#frontSwingVideo"),
  rearSwingVideo: document.querySelector("#rearSwingVideo"),
  geminiApiKey: document.querySelector("#geminiApiKey"),
  analyzeSwing: document.querySelector("#analyzeSwing"),
  swingStatus: document.querySelector("#swingStatus"),
  swingResult: document.querySelector("#swingResult"),
  languageToggle: document.querySelector("#languageToggle"),
  welcomeInfo: document.querySelector("#welcomeInfo"),
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

function resetActiveRound() {
  state.round = newRound();
  state.currentHole = 0;
  state.selectedShotType = "Tee";
  state.showMissOptions = false;
  state.showPuttMissOptions = false;
  state.activeTab = "track";
  saveActive();
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
  els.languageToggle.textContent = state.language === "de" ? "🇩🇪 DE" : "🇬🇧 EN";
  const de = state.language === "de";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  els.newRound.setAttribute("aria-label", t("newRound"));
  els.newRound.setAttribute("title", t("newRound"));
  els.openTip.textContent = t("nextTip");
  els.saveRound.textContent = t("saveRound");
  if (els.shareRound) els.shareRound.textContent = t("shareRound");
  els.resetRound.textContent = t("resetRound");
  els.toggleHoleMenu.textContent = de ? "Loch wechseln" : "Change hole";
  els.finishHole.textContent = de ? "Loch fertig →" : "Finish hole →";
  els.planHit.textContent = de ? "Plan getroffen" : "Plan hit";
  els.planMiss.textContent = de ? "Nicht getroffen" : "Missed plan";
  els.puttHit.textContent = de ? "Putt-Plan getroffen" : "Putt plan hit";
  els.puttMiss.textContent = de ? "Nicht getroffen" : "Missed plan";
  els.scratchHole.textContent = de ? "Loch streichen" : "Pick up hole";
  els.undoShot.textContent = de ? "Letzte Eingabe widerrufen" : "Undo last entry";
  els.aboutApp.textContent = de ? "Über die App" : "About the app";
  els.newRound.textContent = de ? "Neue Runde starten" : "Start new round";
}

function formatToPar(value) {
  if (value === 0) return "E";
  return value > 0 ? `+${value}` : `${value}`;
}

function addShot(result, options = {}) {
  haptic(result === "Exakt umgesetzt" ? 18 : 8);
  if (result === "Exakt umgesetzt") showConfetti();
  const shotType = options.type || state.selectedShotType;
  state.showMissOptions = false;
  state.showPuttMissOptions = false;
  const penalty = Boolean(options.penalty);
  hole().scratched = false;
  hole().shots.push({
    result,
    penalty,
    type: shotType,
    note: options.note || "",
    at: new Date().toISOString(),
    number: hole().shots.length + 1,
  });
  advanceShotType(shotType, hole());
  saveActive();
  render();
}

function shotTypePlan(item = hole()) {
  if (item.par === 3) return ["Tee", "Putt", "Putt"];
  if (item.par === 5) return ["Tee", "Transport", "Annäherung", "Putt", "Putt"];
  return ["Tee", "Annäherung", "Putt", "Putt"];
}

function nextShotTypeSuggestion(item = hole()) {
  const plan = shotTypePlan(item);
  const nextIndex = Math.min(item.shots.length, plan.length - 1);
  return plan[nextIndex] || "Putt";
}

function advanceShotType(previousType, item = hole()) {
  const nextType = nextShotTypeSuggestion(item);
  state.selectedShotType = nextType;
  if (item.shots.length >= 1 && item.shots.length <= 4) {
    window.setTimeout(() => openShotTypeModal(nextType, previousType, item), 120);
  }
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
  els.ruleTitle.textContent = RULE_TITLES[ruleKey] || info.title;
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
  if (state.currentHole < 17) {
    setHole(state.currentHole + 1, { showCaddie: false });
    if (!maybeOpenMentalMomentum()) openInfoModal("caddie");
  }
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
  resetActiveRound();
  els.shareOutput.textContent = "Runde gespeichert. Die nächste Runde startet wieder an Loch 1.";
  els.shareOutput.classList.add("active");
  renderArchive();
  render();
  openFeedbackModal();
}

function makeShareLink() {
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(state.round))));
  return `${location.origin}${location.pathname}#round=${encoded}`;
}

async function shareRound() {
  shareTo("native");
}

function renderTabs() {
  els.tabs.forEach((tab) => {
    const active = tab.dataset.tab === state.activeTab;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", active);
  });
  Object.entries(els.panels).forEach(([name, panel]) => panel.classList.toggle("active", name === state.activeTab));
}

function renderTrainingTabs() {
  els.trainingSubtabs.forEach((button) => {
    const active = button.dataset.trainingSubtab === state.trainingSubtab;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active);
  });
  els.trainingSubpanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.trainingPanel === state.trainingSubtab);
  });
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
    els.holeScore.innerHTML = `${shots} ${state.language === "en" ? (shots === 1 ? "shot" : "shots") : "Schl."} <span class="score-label score-${label.css}">${label.name}</span>`;
  } else {
    els.holeScore.textContent = state.language === "en" ? "0 shots" : "0 Schläge";
  }

  els.holeRating.textContent = `SI ${item.si} · ${difficultyLabel(item.si)} · CR ${tee.cr.toFixed(1)} / Slope ${tee.slope}`;
  els.holeRating.style.background = difficultyColor(item.si);
  if (els.note) els.note.value = item.note;

  els.shotList.innerHTML = item.scratched
    ? `<div class="shot-row scratch"><strong>-</strong><span>${state.language === "en" ? "Hole picked up" : "Loch gestrichen"} · ${holeScore(item)} ${state.language === "en" ? "shots" : "Schläge"}</span></div>`
    : item.shots.length
    ? (() => {
        const shot = item.shots[item.shots.length - 1];
        return `<div class="shot-row ${shot.penalty ? "penalty" : ""}"><span>${state.language === "en" ? "Last entry" : "Letzte Eingabe"}: ${shot.type || (state.language === "en" ? "Shot" : "Schlag")} · ${shot.result}${shot.note ? ` · ${shot.note}` : ""}${shot.penalty ? ` · +1 ${state.language === "en" ? "penalty stroke" : "Strafschlag"}` : ""}</span></div>`;
      })()
    : `<div class="empty-state compact">${state.language === "en" ? "No entry on this hole yet." : "Noch keine Eingabe auf diesem Loch."}</div>`;

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

function paceWarning(item) {
  const strokes = holeScore(item);
  if (!strokes || item.scratched) return "";
  const putts = item.shots.filter((shot) => shot.type === "Putt").length;
  const transport = item.shots.filter((shot) => shot.type === "Transport").length;
  const approach = item.shots.filter((shot) => shot.type === "Annäherung").length;
  const beforeGreen = transport + approach;
  const targetBeforeGreen = Math.max(1, item.par - 2);
  if (putts === 0 && beforeGreen > targetBeforeGreen) {
    return `Warnung: ${beforeGreen} Transport-/Annäherungsschläge vor dem ersten Putt. Empfehlung: nicht mehr die Fahne jagen, sondern sicher aufs Grün oder in die größte Zone.`;
  }
  if (strokes >= item.par && putts === 0) {
    return `Score-Alarm: Du bist schon bei Par, bevor geputtet wurde. Nächster Schlag: Schaden begrenzen, kein Heldenschlag.`;
  }
  return "";
}

function lastShot(item = hole()) {
  return item.shots[item.shots.length - 1];
}

function expertForContext(item = hole()) {
  const shot = lastShot(item);
  const result = shot?.result || "";
  if (["Fett", "Getoppt", "Zu kurz", "Zu lang"].includes(result)) return COURSE_EXPERTS.find((expert) => expert.name === "Chris Como");
  if (shot?.type === "Putt" || result.startsWith("Putt")) return COURSE_EXPERTS.find((expert) => expert.name === "Bob Rotella");
  if (shot?.type === "Annäherung" || item.par === 3) return COURSE_EXPERTS.find((expert) => expert.name === "Dan Grieve");
  return COURSE_EXPERTS.find((expert) => expert.name === "Butch Harmon");
}

function caddieAttention(item) {
  const shots = holeScore(item);
  const risk = holeRisk(item);
  if (!shots) return `Loch ${item.hole}: Start mit klarer Zielseite. Sicherer Ball im Spiel ist wichtiger als perfekte Länge.`;
  if (item.shots.some((shot) => shot.penalty) || item.scratched) return "Erster Fokus: großen Score stoppen. Nächster Schlag nur in die größte sichere Zone.";
  if (risk > 55) return "Risiko erhöht. Plane den nächsten Schlag so, dass ein Fehler noch spielbar bleibt.";
  return "Einfach halten: Ziel sehen, Schläger wählen, Schlag committen, Ergebnis erfassen.";
}

function renderAiCaddie(item) {
  const chance = break90Chance();
  const risk = holeRisk(item);
  const recommendation = nextBestDecision(item);
  const warning = paceWarning(item);
  const expert = expertForContext(item);
  els.aiCaddie.innerHTML = `
    <h3>KI-Caddie Loch ${item.hole}</h3>
    <p class="caddie-lead">${linkGlossary(caddieAttention(item))}</p>
    ${warning ? `<div class="caddie-warning">${linkGlossary(warning)}</div>` : ""}
    <div class="metric-row compact">
      <div class="metric-pill"><span>Break-Chance</span><strong>${chance}%</strong><div class="ai-meter"><span style="width: ${chance}%"></span></div></div>
      <div class="metric-pill"><span>Lochrisiko</span><strong>${risk}%</strong><div class="ai-meter"><span style="width: ${risk}%"></span></div></div>
    </div>
    <div class="caddie-compact">
      <div><span>Jetzt</span><p>${linkGlossary(recommendation)}</p></div>
      <div><span>Trainerimpuls · ${expert.name}</span><p>${linkGlossary(expert.advice)}</p></div>
    </div>
    <p class="premium-note">Detailmodus, Vorlesen und Mehr-Runden-Trends: KI-Caddie Pro ab 3 gespeicherten Runden.</p>
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
  if (!els.holePlan) return;
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
    <div class="expert-strip">
      ${COURSE_EXPERTS.map((expert) => `<article><strong>${expert.name}</strong><span>${expert.role}</span><p>${expert.advice}</p></article>`).join("")}
    </div>
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
  renderStatVisuals(counts, { played, score, threePlus, trouble, exactRate, penaltyRate, puttLoad });

  renderTopThree(counts, threePlus);
  renderAiReview(counts, threePlus);

  const pace = played ? targetForPlayed() - score : 0;
  els.courseStrategy.innerHTML = `
    <h3>Course Strategy · Expertenprinzip</h3>
    <p>${linkGlossary(state.language === "en" ? "Steibis is par 70. For Break 90 you have 19 strokes of buffer. Play every hole for bogey, take par only as a bonus on the shorter holes 13, 16 and 17. On Stroke Index 1-6, controlled bogey beats double-bogey risk." : "Steibis ist Par 70. Für Break 90 hast du 19 Schläge Puffer. Spiele jedes Loch auf Bogey, nimm Par nur als Bonus auf den kürzeren Löchern 13, 16 und 17. Auf Stroke Index 1-6 ist ein kontrolliertes Bogey besser als Risiko Richtung Doppelbogey.")}</p>
    <p>${played ? `Aktuell bist du ${pace >= 0 ? `${pace} Schläge im Zielkorridor` : `${Math.abs(pace)} Schläge hinter dem Zielkorridor`}.` : "Starte die Runde, dann wird der Zielkorridor laufend mitgerechnet."}</p>
    <div class="expert-strip compact">
      ${COURSE_EXPERTS.map((expert) => `<article><strong>${expert.name}</strong><span>${expert.role}</span><p>${expert.advice}</p></article>`).join("")}
    </div>
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

function renderStatVisuals(counts, metrics) {
  if (!els.statVisuals) return;
  const target = state.round.breakTarget || 90;
  const played = Math.max(1, metrics.played);
  const projected = metrics.played ? Math.round((metrics.score / played) * 18) : 0;
  const scoreDelta = metrics.played ? projected - (target - 1) : 0;
  const data = [
    ["Plan getroffen", metrics.exactRate, "green"],
    ["Break-Chance", break90Chance(), "blue"],
    ["Lochrisiko", holeRisk(hole()), "red"],
  ];
  els.statVisuals.innerHTML = `
    <article class="stat-hero-card">
      <p class="eyebrow">KI-Caddie Projektion</p>
      <h3>${metrics.played ? `${projected} über 18 Loch` : "Noch keine Projektion"}</h3>
      <p>${metrics.played ? (scoreDelta <= 0 ? `${Math.abs(scoreDelta)} Schlag/Schläge vor Break ${target}.` : `${scoreDelta} Schlag/Schläge hinter Break ${target}.`) : "Starte die Runde, dann entsteht hier die erste Hochrechnung."}</p>
    </article>
    <div class="ring-grid">
      ${data.map(([label, value, tone]) => `
        <article class="ring-card ${tone}" style="--value:${value}">
          <div class="stat-ring"><strong>${value}%</strong></div>
          <span>${label}</span>
        </article>
      `).join("")}
    </div>
    <article class="stat-card-wide">
      <p class="eyebrow">Fehlerprofil</p>
      ${[
        ["Richtung", counts.Rechts + counts.Links],
        ["Kontakt", counts.Fett + counts.Getoppt],
        ["Länge", counts["Zu kurz"] + counts["Zu lang"]],
        ["Penalty", counts.Strafschläge],
        ["Gestrichen", counts.Gestrichen],
        ["3+ Putts", metrics.threePlus],
      ].map(([label, value]) => `<div class="wide-bar"><span>${label}</span><strong>${value}</strong><i style="width:${Math.max(3, Math.min(100, value * 18))}%"></i></div>`).join("")}
    </article>
  `;
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
      <p class="eyebrow">KI-Caddie Analyse</p>
      <h3>${played ? primary.title : "Noch keine Rundendaten"}</h3>
      <p>${linkGlossary(nextAction)}</p>
      <p>${played ? `Datenbasis: ${played} gespielte Löcher · ${counts.Strafschläge} Strafschläge · ${threePlus} Loch/Löcher mit 3+ Putts · HCP-Profil ${hcpText}.` : "Nach der Runde entsteht hier automatisch ein Trainerplan aus Score, HCP, Schlagtyp und Fehlerprofil."}</p>
      <div class="caddie-mini-proof">
        <strong>Warum dieser Fokus?</strong>
        <span>${played ? "Die App priorisiert den größten Score-Hebel, nicht den prominentesten Fehler." : "Ohne Rundendaten startet CoursePilot mit Break-Ziel, HCP und Platzstrategie."}</span>
      </div>
    </article>
  `;

  els.trainingList.insertAdjacentHTML("beforeend", priorities
    .slice(0, 3)
    .map(({ key }, index) => {
      const source = TRAINING_SOURCES[key];
      const detail = TRAINING_DETAILS[key];
      return `
        <article class="training-card training-drill-card">
          <p class="eyebrow">${index === 0 ? "Priorität 1" : `Priorität ${index + 1}`}</p>
          <h3>${source.title}</h3>
          <p>${source.text}</p>
          <div class="drill-meta">
            <span>Ort: ${detail.place}</span>
            <span>Zeit: ${detail.time}</span>
            <span>Utensilien: ${detail.tools}</span>
          </div>
          <details class="drill-details">
            <summary>Details zum Tipp</summary>
            <p><strong>Übung:</strong> ${detail.drill}</p>
            <p><strong>Qualitätssignal:</strong> ${detail.quality}</p>
          </details>
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
        <li>Schlagtypen: Tee ${counts.byType.Tee}, Transport ${counts.byType.Transport}, Annäherung ${counts.byType.Annäherung}, Putt ${counts.byType.Putt}</li>
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
  els.glossaryList.innerHTML = `<p class="setting-help">Tipp: Blau markierte Fachbegriffe in der App sind klickbar und führen direkt hierher.</p>` + Object.entries(GLOSSARY)
    .sort(([a], [b]) => a.localeCompare(b, "de"))
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

function caddieBullets(item = hole()) {
  const risk = holeRisk(item);
  const shots = holeScore(item);
  const hcp = Number(state.profile.handicap);
  const warning = paceWarning(item);
  return [
    `Nächster Schlag: Loch ${item.hole} · Par ${item.par}. Empfehlung wird auf dieses Par, dein Break-Ziel und den aktuellen Schlagtyp bezogen.`,
    warning,
    nextBestDecision(item),
    item.si <= 6 ? `Schweres Loch: Stroke Index ${item.si}. Bogey ist ein gutes Ergebnis.` : "Spiele auf die breite Zielseite und vermeide den Folgefehler.",
    Number.isFinite(hcp) ? `HCP ${hcp}: Risiko und Zielzone konservativ wählen, wenn der Schlag eng wirkt.` : "HCP noch offen: Empfehlung basiert auf Platzdaten und aktuellen Schlägen.",
    shots ? `Aktuell ${shots} Schlag/Schläge auf diesem Loch. Nächster Schlag soll den Schaden begrenzen.` : "Vor dem Schlag: Ziel, Fehlseite und sicherer nächster Schlag klären.",
    risk > 55 ? "Lochrisiko erhöht: Layup, Mitte Grün oder sicherer Schläger bevorzugt." : "Risiko im Rahmen: normaler Plan mit ruhigem Tempo.",
  ].filter(Boolean);
}

function bulletList(items) {
  return `<ul class="caddie-bullets">${items.map((item) => `<li>${linkGlossary(item)}</li>`).join("")}</ul>`;
}

function caddieMore() {
  return `
    <div class="modal-actions">
      <button class="wide-button primary" type="button" data-speak-caddie>Vorlesen</button>
    </div>
    <details class="more-panel">
      <summary>More: Trainer-Logik</summary>
      ${COURSE_EXPERTS.map((expert) => `
        <article>
          <strong>${expert.name} · ${expert.role}</strong>
          <p>${linkGlossary(expert.advice)}</p>
          <a href="${expert.url}" target="_blank" rel="noreferrer">Quelle</a>
        </article>
      `).join("")}
    </details>
  `;
}

function caddieTopics() {
  return [
    ["club", "Schlägerwahl"],
    ["strategy", "Lochstrategie"],
    ["risk", "Risiko vermeiden"],
    ["approach", "Annäherung"],
    ["putt", "Putt & Grün"],
    ["mental", "Mentaler Tipp"],
    ["why", "Warum?"],
  ];
}

function caddieTopicContent(topic, item = hole()) {
  const expert = expertForContext(item);
  const risk = holeRisk(item);
  const shots = holeScore(item);
  const base = {
    club: [
      shots === 0 ? "Nimm den längsten Schläger, der Aus und Strafzone realistisch aus dem Spiel hält." : "Wähle jetzt den Schläger mit der größten Trefferfläche, nicht den mit der maximalen Distanz.",
      risk > 55 ? "Bei erhöhtem Lochrisiko ist ein Layup oder ein voller kontrollierter Schläger besser als ein Grenzschlag." : "Wenn die Zielzone breit ist, darfst du normal spielen. Tempo bei 80 bis 90 Prozent halten.",
    ],
    strategy: [
      state.language === "en" ? HOLE_PLANS_EN[item.hole] : HOLE_PLANS[item.hole],
      item.si <= 6 ? `Stroke Index ${item.si}: Bogey ist ein gutes Ergebnis. Doppelbogey aktiv vermeiden.` : "Nutze die breite Zielseite. Par ist Bonus, Bogey bleibt im Plan.",
    ],
    risk: [
      paceWarning(item) || "Der zweite Fehler ist teurer als der erste. Nach einem schlechten Schlag sofort defensiver werden.",
      "Vermeide kurzseitige Fehlschläge, rote/weiße Zonen und Schläge aus schlechten Lagen mit zu hoher Erwartung.",
    ],
    approach: [
      "Bei Annäherungen zählt die sichere Grünhälfte. Fahne nur angreifen, wenn Fehlschlag kurz und lang spielbar bleibt.",
      "Dan-Grieve-Prinzip: vorher entscheiden, ob der Ball rollen oder fliegen soll, dann den einfachsten Schlag wählen.",
    ],
    putt: [
      "Beim ersten Putt zählt Speed vor Linie. Ziel: zweiter Putt stressfrei.",
      "Bei langen Putts in eine Zone putten, nicht auf Lochkante. 3-Putt-Vermeidung ist direkter Scoregewinn.",
    ],
    mental: [
      "Ein Schlag, ein Auftrag. Nach dem Ergebnis sofort zum nächsten einfachen Schlag wechseln.",
      "Bob-Rotella-Prinzip: Commitment zum aktuellen Schlag ist wichtiger als Ärger über den letzten.",
    ],
    why: [
      `Datenbasis: ${hcpBand()} · Break ${state.round.breakTarget || 90} · ${playedHoles().length} aktuelle Lochdaten · ${state.archive.length} gespeicherte Runden.`,
      `${expert.name} passt hier, weil der aktuelle Kontext zu ${expert.role} gehört.`,
    ],
  };
  return base[topic] || caddieBullets(item);
}

function caddieTopicMenu(item = hole()) {
  return `
    <p><strong>Nächster Schlag: Loch ${item.hole} · Par ${item.par}.</strong> Wähle, was du jetzt brauchst.</p>
    <div class="caddie-topic-grid">
      ${caddieTopics().map(([key, label]) => `<button type="button" data-caddie-topic="${key}">${label}</button>`).join("")}
    </div>
    <div class="caddie-topic-result" id="caddieTopicResult">${bulletList(caddieBullets(item).slice(0, 4))}</div>
    ${caddieMore()}
  `;
}

function renderCaddieTopic(topic) {
  const target = document.querySelector("#caddieTopicResult");
  if (!target) return;
  const label = caddieTopics().find(([key]) => key === topic)?.[1] || "Empfehlung";
  target.innerHTML = `<h3>${label}</h3>${bulletList(caddieTopicContent(topic))}`;
}

function mentalPopupContent(kind) {
  const content = {
    mentalStart: [
      "Rundenstart",
      "Mentaler Start",
      ["Für die ersten drei Löcher zählt nur Rhythmus.", "Vor jedem Schlag: Zielseite wählen, Schlag sehen, committen.", "Bogey ist kein Fehler, wenn der Ball im Spiel bleibt."],
    ],
    mentalGood: [
      "Momentum",
      "Gute Phase stabilisieren",
      ["Nichts erzwingen. Der Plan funktioniert gerade.", "Gleiches Tempo, gleiche Routine, gleiche Zielbreite.", "Par ist Bonus. Kein Extra-Risiko wegen eines guten Laufs."],
    ],
    mentalBad: [
      "Reset",
      "Schaden begrenzen",
      ["Score loslassen, nächsten einfachen Schlag wählen.", "Keine Fahnenjagd aus schlechter Lage.", "Ziel: Doppel-Fehler stoppen und wieder in den Bogey-Plan kommen."],
    ],
  }[kind];
  return content;
}

function openMentalModal(kind) {
  const data = mentalPopupContent(kind);
  if (!data) return false;
  els.infoEyebrow.textContent = data[0];
  els.infoTitle.textContent = data[1];
  els.infoBody.innerHTML = bulletList(data[2]);
  els.infoModal.dataset.kind = kind;
  els.infoModal.hidden = false;
  return true;
}

function maybeOpenMentalMomentum() {
  if (!localStorage.getItem(ONBOARDING_KEY)) return false;
  const holes = playedHoles();
  if (holes.length < 2) return false;
  const lastTwo = holes.slice(-2);
  const bad = lastTwo.every((item) => item.scratched || holeScore(item) - item.par >= 2);
  const good = lastTwo.every((item) => !item.scratched && holeScore(item) <= item.par);
  const key = bad ? `mental-bad-${state.round.id}-${holes.length}` : good ? `mental-good-${state.round.id}-${holes.length}` : "";
  if (!key || sessionStorage.getItem(key)) return false;
  sessionStorage.setItem(key, "1");
  return openMentalModal(bad ? "mentalBad" : "mentalGood");
}

function openShotTypeModal(recommended = state.selectedShotType, previous = "", item = hole()) {
  const de = state.language === "de";
  const plan = shotTypePlan(item);
  const options = [...new Set([recommended, ...SHOT_TYPES])];
  els.infoEyebrow.textContent = de ? "Nächster Schlag" : "Next shot";
  els.infoTitle.textContent = de ? "Schlagtyp bestätigen" : "Confirm shot type";
  els.infoBody.innerHTML = `
    <p>${de ? "Empfehlung für" : "Recommendation for"} <strong>Par ${item.par}</strong>: <strong>${recommended}</strong>${de ? "." : "."}</p>
    <p class="setting-help">${de ? "Planfolge" : "Planned sequence"}: ${plan.join(" → ")}${previous ? ` · ${de ? "letzter Schlag" : "last shot"}: ${previous}` : ""}</p>
    <div class="rule-options next-shot-options">
      ${options.map((type) => `<button class="rule-option ${type === recommended ? "recommended" : ""}" type="button" data-next-shot-type="${type}">${type === recommended ? "✓ " : ""}${type}</button>`).join("")}
    </div>
  `;
  els.infoModal.hidden = false;
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
    welcome: {
      eyebrow: "Willkommen",
      title: "Willkommen bei CoursePilot",
      body: `<p>CoursePilot hilft dir, deine Runde bewusster zu spielen und nach der Runde gezielt besser zu werden.</p><p>Du erfasst nicht nur den Score, sondern auch, ob dein geplanter Schlag funktioniert hat. Daraus erkennt die App Muster: zu viele Putts, verlorene Schläge vom Tee, Probleme bei Annäherungen, Strafschläge oder riskante Entscheidungen.</p><p>Der KI-Caddie gibt dir Empfehlungen auf Basis deiner Einstellungen, deines Handicap Index, des gewählten Abschlags und deines Break-Ziels.</p>${bulletList(["welcher Schlag jetzt sinnvoll ist", "wann Risiko zu hoch wird", "wie du dein Break-Ziel im Blick behältst", "welche Trainingsbereiche nach der Runde Priorität haben"])}<p>Deine Daten bleiben lokal auf diesem Gerät gespeichert. Wichtige Runden kannst du als Link oder PDF sichern.</p><button class="wide-button primary" type="button" data-open-settings>Einstellungen öffnen</button>`,
    },
    tip: {
      eyebrow: state.language === "en" ? "AI caddie" : "KI-Caddie",
      title: state.language === "en" ? `Par ${item.par} recommendation` : `Tipp zum nächsten Schlag · Par ${item.par}`,
      body: caddieTopicMenu(item),
    },
    caddie: {
      eyebrow: state.language === "en" ? "Next-shot tip" : "Tipp zum nächsten Schlag",
      title: state.language === "en" ? `AI caddie recommends · Par ${item.par}` : `Dein KI-Caddie empfiehlt · Par ${item.par}`,
      body: bulletList(caddieBullets(item)) + caddieMore(),
    },
  }[kind];
  if (!content) {
    openMentalModal(kind);
    return;
  }
  els.infoEyebrow.textContent = content.eyebrow;
  els.infoTitle.textContent = content.title;
  els.infoBody.innerHTML = content.body;
  els.infoModal.dataset.kind = kind;
  els.infoModal.hidden = false;
}

function closeInfoModal() {
  if (els.infoModal.dataset.kind === "welcome") localStorage.setItem(ONBOARDING_KEY, "1");
  els.infoModal.hidden = true;
  delete els.infoModal.dataset.kind;
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
  if (navigator.share) {
    navigator.share({ title: "CoursePilot Runde", text: plainText, url: link }).catch(() => {});
    return;
  }
  navigator.clipboard?.writeText(link).then(() => {
    els.shareOutput.textContent = "Link kopiert. Du kannst ihn in WhatsApp, iMessage oder Instagram einfügen.";
    els.shareOutput.classList.add("active");
  }).catch(() => {
    els.shareOutput.textContent = `Link: ${link}`;
    els.shareOutput.classList.add("active");
  });
}

function swingContext() {
  const counts = resultCounts();
  const played = playedHoles().length;
  return {
    handicap: state.profile.handicap || "nicht gesetzt",
    breakTarget: state.round.breakTarget || 90,
    tee: TEE_DATA[state.activeTee]?.label || state.activeTee,
    playedHoles: played,
    score: roundScore(),
    toPar: toPar(),
    shotTypes: counts.byType,
    patterns: {
      rechts: counts.Rechts,
      links: counts.Links,
      fett: counts.Fett,
      getoppt: counts.Getoppt,
      zuKurz: counts["Zu kurz"],
      zuLang: counts["Zu lang"],
      strafschlaege: counts.Strafschläge,
      gestrichen: counts.Gestrichen,
      putts: counts.Putts,
    },
  };
}

function swingPrompt(context) {
  return [
    "Analysiere diese zwei Golf-Schwungvideos für einen Amateurspieler.",
    "Video 1 ist frontal, Video 2 ist von hinten entlang der Ziellinie. Beide sollen auf Hüfthöhe gefilmt sein.",
    "Arbeite wie ein Golfcoach. Gib keine medizinische Diagnose und keine übertriebene Sicherheit vor.",
    "Vergleiche deine Beobachtungen mit den Rundendaten der App.",
    "",
    `Rundendaten: ${JSON.stringify(context)}`,
    "",
    "Antwortformat auf Deutsch:",
    "1. Kurzfazit in maximal 3 Sätzen.",
    "2. Beobachtungen frontal.",
    "3. Beobachtungen von hinten.",
    "4. Zusammenhang zu den CoursePilot-Mustern.",
    "5. Die 3 wichtigsten Trainingsaufgaben.",
    "6. Ein einfacher Drill für die nächste Range-Session.",
    "7. Was im nächsten Video besser gefilmt werden soll.",
  ].join("\n");
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function renderSwingAnalysis(text) {
  const escaped = escapeHtml(text);
  els.swingResult.innerHTML = `<article class="training-card"><p>${escaped.replace(/\n/g, "</p><p>")}</p></article>`;
}

function updateSwingCaptureStatus() {
  const front = els.frontSwingVideo.files?.[0];
  const rear = els.rearSwingVideo.files?.[0];
  if (front && rear) {
    const totalMb = ((front.size + rear.size) / 1024 / 1024).toFixed(1);
    els.swingStatus.textContent = `Bereit für Gemini: frontal und von hinten ausgewählt (${totalMb} MB gesamt).`;
    return;
  }
  if (front || rear) {
    els.swingStatus.textContent = front
      ? "Frontal-Video ist bereit. Bitte noch das Video von hinten aufnehmen oder hochladen."
      : "Video von hinten ist bereit. Bitte noch das Frontal-Video aufnehmen oder hochladen.";
    return;
  }
  els.swingStatus.textContent = "Nutze auf dem Smartphone direkt die Kamera oder wähle vorhandene Videos aus. Für Produktion nutzt die App einen sicheren Backend-Endpunkt.";
}

async function analyzeSwingWithGemini() {
  const front = els.frontSwingVideo.files?.[0];
  const rear = els.rearSwingVideo.files?.[0];
  if (!front || !rear) {
    els.swingStatus.textContent = "Bitte lade ein frontales Video und ein Video von hinten hoch.";
    return;
  }
  const maxBytes = 18 * 1024 * 1024;
  if (front.size > maxBytes || rear.size > maxBytes) {
    els.swingStatus.textContent = "Bitte nutze kurze Clips unter 18 MB pro Video. Ideal sind 1 bis 3 Schwünge.";
    return;
  }

  els.analyzeSwing.disabled = true;
  els.swingStatus.textContent = "Videos werden vorbereitet und an Gemini gesendet...";
  els.swingResult.innerHTML = "";

  try {
    const prompt = swingPrompt(swingContext());
    const payload = {
      prompt,
      videos: [
        { label: "Frontal", mimeType: front.type || "video/mp4", data: await fileToBase64(front) },
        { label: "Von hinten", mimeType: rear.type || "video/mp4", data: await fileToBase64(rear) },
      ],
    };
    const apiKey = els.geminiApiKey.value.trim();
    const result = apiKey ? await callGeminiDirect(payload, apiKey) : await callGeminiBackend(payload);
    els.swingStatus.textContent = apiKey
      ? "Analyse abgeschlossen. Hinweis: Der lokale Testmodus ist nicht für öffentliche Nutzung gedacht."
      : "Analyse abgeschlossen.";
    renderSwingAnalysis(result);
  } catch (error) {
    els.swingStatus.textContent = `Analyse nicht möglich: ${error.message}`;
  } finally {
    els.analyzeSwing.disabled = false;
  }
}

async function callGeminiBackend(payload) {
  const response = await fetch("/api/analyze-swing", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    if (response.status === 404) throw new Error("Backend-Endpunkt fehlt. Für GitHub Pages nutze testweise einen lokalen Gemini API-Key oder deploye die Netlify Function.");
    throw new Error(await response.text());
  }
  const json = await response.json();
  return json.text || "Keine Analyse erhalten.";
}

async function callGeminiDirect(payload, apiKey) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        role: "user",
        parts: [
          { text: payload.prompt },
          ...payload.videos.map((video) => ({ inline_data: { mime_type: video.mimeType, data: video.data } })),
        ],
      }],
      generationConfig: { temperature: 0.2 },
    }),
  });
  const json = await response.json();
  if (!response.ok) throw new Error(json.error?.message || "Gemini API Fehler.");
  return json.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n").trim() || "Keine Analyse erhalten.";
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
  const body = [
    "CoursePilot Feedback",
    `Runde: ${state.round.id}`,
    `Zeit: ${new Date(feedback.at).toLocaleString("de-DE")}`,
    `Emotion: ${feedback.emotion}`,
    "",
    ...answers.map((answer) => `${answer.question}: ${answer.score}/5`),
    "",
    `Freitext: ${feedback.text || "-"}`,
  ].join("\n");
  location.href = `mailto:schaedler.stefan@gmail.com?subject=${encodeURIComponent("CoursePilot Feedback")}&body=${encodeURIComponent(body)}`;
  closeFeedbackModal();
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

function render() {
  renderTabs();
  renderTrainingTabs();
  renderScore();
  renderProfile();
  renderHoleStrip();
  renderShotButtons();
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

els.trainingSubtabs.forEach((button) => {
  button.addEventListener("click", () => {
    state.trainingSubtab = button.dataset.trainingSubtab;
    haptic(5);
    renderTrainingTabs();
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
  if (event.target.closest("button")) haptic(4);
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
els.analyzeSwing.addEventListener("click", analyzeSwingWithGemini);
els.frontSwingVideo.addEventListener("change", updateSwingCaptureStatus);
els.rearSwingVideo.addEventListener("change", updateSwingCaptureStatus);
els.languageToggle.addEventListener("click", toggleLanguage);
els.welcomeInfo.addEventListener("click", () => openInfoModal("welcome"));
els.aboutApp.addEventListener("click", () => openInfoModal("about"));
els.openTip.addEventListener("click", () => openInfoModal("tip"));
els.aiCaddie.addEventListener("click", (event) => {
  if (event.target.closest(".metric-pill")) openInfoModal("metrics");
});
els.closeInfoModal.addEventListener("click", closeInfoModal);
els.infoModal.addEventListener("click", (event) => {
  if (event.target === els.infoModal) closeInfoModal();
});

els.infoBody.addEventListener("click", (event) => {
  const topic = event.target.closest("[data-caddie-topic]");
  if (topic) {
    haptic(6);
    renderCaddieTopic(topic.dataset.caddieTopic);
    return;
  }
  const settings = event.target.closest("[data-open-settings]");
  if (settings) {
    localStorage.setItem(ONBOARDING_KEY, "1");
    state.activeTab = "settings";
    closeInfoModal();
    render();
    return;
  }
  const speak = event.target.closest("[data-speak-caddie]");
  if (speak) {
    const text = [...els.infoBody.querySelectorAll(".caddie-bullets li")].map((item) => item.textContent.trim()).join(". ");
    if ("speechSynthesis" in window && text) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = state.language === "en" ? "en-GB" : "de-DE";
      window.speechSynthesis.speak(utterance);
    } else {
      els.shareOutput.textContent = "Vorlesen wird von diesem Browser nicht unterstützt.";
      els.shareOutput.classList.add("active");
    }
    return;
  }
  const button = event.target.closest("[data-next-shot-type]");
  if (!button) return;
  state.selectedShotType = button.dataset.nextShotType;
  haptic(8);
  closeInfoModal();
  renderShotButtons();
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
  resetActiveRound();
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

if (!localStorage.getItem(ONBOARDING_KEY)) {
  window.setTimeout(() => openInfoModal("welcome"), 250);
} else if (!playedHoles().length && !sessionStorage.getItem(`mental-start-${state.round.id}`)) {
  sessionStorage.setItem(`mental-start-${state.round.id}`, "1");
  window.setTimeout(() => openMentalModal("mentalStart"), 350);
}
