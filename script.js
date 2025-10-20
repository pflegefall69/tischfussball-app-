// Datenstrukturen
let tournamentLeader = null;
let players = [];
let teams = [];
let matches = [];
let extras = [];


const learningLinks = [
  { label: "kicker-klaus", url: "https://kicker-klaus.de/?srsltid=AfmBOopLCoc6FaqguC586p0foKIhJP2bZvEcBJlvPTEI0Lgw10VD_pH2" },
  { label: "leonhart", url: "https://original-leonhart.com/" },
  { label: "ullrichsport", url: "https://shop.ullrichsport.com/" },
  { label: "bonzini", url: "https://www.bonzini.com/en/" },
  { label: "tornado", url: "https://tornadofoosball.com/" },
  { label: "garlando/kicker-sven", url: "https://kicker-sven.de/kicker-marken-garlando"},
  { label: "roberto-sport/kicker-sven", url: "https://kicker-sven.de/kicker-marken-roberto-sport"}
];


const app = document.getElementById("app");
function setLeader() {
  const input = document.getElementById("leaderInput");
  const name = input.value.trim();
  if (name) {
    tournamentLeader = name;
    renderPlayerInput();
  }
}

// Trainingsdaten: Schüsse und Diagramme
const trainingsData = {
  "Schusstechnik Training 3er": [
    { 
      name: "Jet", 
      desc: "Auch bekannt als Snake-Shot. Kurbeln, max 360 Grad vor und nach dem Schuss. Der Ball kann auch mit einer Seitwärtsbewegung der ballführenden Miniatur vor dem Schuss in die gewünschte Schussposition befördert werden. Durch kontinuierlichen Kontakt zwischen Griff und Unterarm/Handfläche/Handballen wird Kontrolle über die Kurbelbewegung gewährleistet.", 
      img: "img/jet_shot.png" 
    },
    { 
      name: "Pull Shot", 
      desc: "Ball wird zur Seite gezogen und dann geschossen. Klassischer Power-Schuss von der 3er-Reihe.", 
      img: "img/pull_shot.png" 
    },
    { 
      name: "Push Shot", 
      desc: "Ball wird nach außen gedrückt und dann geschossen. Spiegelseitig zum Pull Shot.", 
      img: "img/push_shot.png" 
    },
    { 
      name: "Pin Shot", 
      desc: "Auch 'Front Pin' genannt. Der Ball wird mit der Figur festgeklemmt und dann schnell nach hinten weggerollt und geschossen.", 
      img: "img/pin_shot.png" 
    },
    { 
      name: "Pull Kick", 
      desc: "Der Ball wird von GM9 zu GM10 gepasst und ohne zu stoppen geschossen.", 
      img: "img/pull_kick.png" 
    },
    { 
      name: "Push Kick", 
      desc: "Der Ball wird von GM11 zu GM10 gepasst und ohne zu stoppen geschossen.", 
      img: "img/push_kick.png" 
    }
  ],
  
  "Passtechnik Training 5er": [
    { 
      name: "Tic-Tac Pass", 
      desc: "Ball wird zwischen Figuren hin und her gespielt, um Lücken zu finden. Anschließend wird ein Pull Kick/Push Kick ausgeführt, welcher bei einer Miniatur der 3er Reihe landen soll.", 
      img: "img/tic_tac_pass.png" 
    },
    { 
      name: "Stick Pass", 
      desc: "Schneller Pass durch eine Lücke, mit minimaler Bewegung. Der Ball wird durch eine Seitwärtsbewegung der Miniatur während des Schusskontaktes angeschnitten.", 
      img: "img/stick_pass.png" 
    }
  ],
  
  "Passtechnik Training 2er": [
    { 
      name: "Bank Pass", 
      desc: "Ball wird über die Bande gespielt, um den Gegner zu überraschen.", 
      img: "img/bank_pass.png" 
    },
    { 
      name: "Wall Pass", 
      desc: "Ball entlang der Bande durch den Gegner gepasst.", 
      img: "img/wall_pass.png" 
    }
  ]
};

// Mögliche Tischpositionen
const positions = ["T1", "T2", "T3", "T4", "T5"];

// Funktion, um eine zufällige Position zu wählen
function randomPosition() {
  return positions[Math.floor(Math.random() * positions.length)];
}

function renderStartPage() {
  app.innerHTML = `
    <h1>Willkommen bei der Tischfussball-app</h1>
    <div style="margin-top: 20px;">
      <button onclick="renderLeaderInput()">Turnierbereich</button>
      <button onclick="openLearn()">Lernbereich</button>
      <button onclick="renderTraining()">Trainingsbereich</button> 
      ${renderLearningButtons()}
    </div>    
  `;
}

// Render the link buttons
function renderLearningButtons() {
  let html = '<div style="margin-top:10px;">';
  learningLinks.forEach(link => {
    html += `<button onclick="window.open('${link.url}', '_blank')">${link.label}</button> `;
  });
  html += '</div>';
  return html;
}
// Function to open the learning page
function openLearn() {
  window.open("learn.html", "_blank");
}

// Render the first input screen
function renderLeaderInput() {
  app.innerHTML = `
    <h2>Turnierleitung eintragen</h2>
    <input id="leaderInput" placeholder="Name der Turnierleitung" />
    <div style="margin-top: 10px;">
      <button onclick="setLeader()">Bestätigen</button>      
    </div>    
  `;

  // Buttons nachladen
  document.getElementById("learningButtonsContainer").innerHTML = renderLearningButtons();
}
function renderPlayerInput() {
  app.innerHTML = `
    <h2>Spieler eintragen</h2>
    <input id="playerInput" placeholder="Spielername" />
    <button onclick="addPlayer()">Hinzufügen</button>
    <ul id="playerList">
      ${players.map(p => `<li>${p}</li>`).join("")}
    </ul>
    <button onclick="startTournament()" ${players.length < 4 ? "disabled" : ""}>Turnier starten</button>
  `;
}
// Trainingsbereich anzeigen
function renderTraining() {
  app.innerHTML = `
    <h2>Trainingsbereich</h2>
    <p>Wähle ein Training:</p>
    <div style="margin-top: 10px;">
      <button onclick="startTraining('Schusstechnik Training 3er')">Schusstechnik Training 3er</button><br/><br/>
      <button onclick="startTraining('Passtechnik Training 5er')">Passtechnik Training 5er</button><br/><br/>
      <button onclick="startTraining('Passtechnik Training 2er')">Passtechnik Training 2er</button><br/><br/>
    </div>
    <button style="margin-top: 20px;" onclick="renderStartPage()">Zurück zur Startseite</button>
  `;
}


// Trainingsbereich anzeigen
function startTraining(name) {
  const exercises = trainingsData[name] || [];

  // Generiere die Liste der Übungen
  let html = `<h2>${name}</h2>`;
  html += `<ul>`;
  exercises.forEach((exercise, i) => {
    html += `
      <li style="margin-bottom: 1rem; cursor: pointer;" onclick="showExercise('${name}', ${i})">
        ${exercise.name}
      </li>
    `;
  });
  html += `</ul>`;
  html += `<div id="exerciseDetails" style="margin-top: 20px;"></div>`;
  html += `<button style="margin-top: 20px;" onclick="renderTraining()">Zurück</button>`;

  app.innerHTML = html;
}

// Einzelne Übung anzeigen
function showExercise(trainingName, index) {
  const exercise = trainingsData[trainingName][index];
  const detailsDiv = document.getElementById("exerciseDetails");
  detailsDiv.innerHTML = `
    <h3>${exercise.name}</h3>
    <p>${exercise.desc}</p>
    ${exercise.img ? `<img src="${exercise.img}" alt="${exercise.name}" style="max-width: 400px; margin-top: 10px;">` : ""}
  `;
}

// Einzelne Übung anzeigen
function showExercise(trainingName, index) {
  const exercise = trainingsData[trainingName][index];
  const detailsDiv = document.getElementById("exerciseDetails");
  detailsDiv.innerHTML = `
    <h3>${exercise.name}</h3>
    <p>${exercise.desc}</p>
    ${exercise.img ? `<img src="${exercise.img}" alt="${exercise.name}" style="max-width: 400px; margin-top: 10px;">` : ""}
  `;
}


// Einzelne Übung anzeigen
function showExercise(trainingName, index) {
  const exercise = trainingsData[trainingName][index];
  const detailsDiv = document.getElementById("exerciseDetails");
  detailsDiv.innerHTML = `
    <h3>${exercise.name}</h3>
    <p>${exercise.desc}</p>
    ${exercise.img ? `<img src="${exercise.img}" alt="${exercise.name}" style="max-width: 400px; margin-top: 10px;">` : ""}
  `;
}


// Einzelne Übung anzeigen
function showExercise(trainingName, index) {
  const exercise = trainingsData[trainingName][index];
  const detailsDiv = document.getElementById("exerciseDetails");
  detailsDiv.innerHTML = `
    <h3>${exercise.name}</h3>
    <p>${exercise.desc}</p>
    ${exercise.img ? `<img src="${exercise.img}" alt="${exercise.name}" style="max-width: 400px; margin-top: 10px;">` : ""}
  `;
}



function addPlayer() {
  const input = document.getElementById("playerInput");
  const name = input.value.trim();
  if (name) {
    players.push(name);
    renderPlayerInput();
  }
}

function startTournament() {
  const shuffled = [...players].sort(() => Math.random() - 0.5);
  teams = [];
  matches = [];
  extras = [];

  // 2er Teams bilden
  while (shuffled.length >= 2) {
    teams.push([shuffled.pop(), shuffled.pop()]);
  }

  // Matches: jedes Team spielt genau einmal gegen jedes andere Team
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      matches.push({ team1: teams[i], team2: teams[j], result: "" });
    }
  }

  // Übrige Spieler = extras
  extras = shuffled;

  renderTournament();
}

function updateResult(index, value) {
  matches[index].result = value;
  renderTournament();
}

function calculateScores() {
  const scores = {};
  const excluded = new Set([tournamentLeader, ...extras]);
  players.forEach(p => {
    if (!excluded.has(p)) scores[p] = 0;
  });

  matches.forEach(match => {
    if (!match.result || !match.result.includes(":")) return;
    const [s1, s2] = match.result.split(":").map(n => parseInt(n.trim()));
    if (isNaN(s1) || isNaN(s2)) return;

    if (s1 > s2) {
      match.team1.forEach(p => { if (!excluded.has(p)) scores[p] += 1; });
    } else if (s2 > s1) {
      match.team2.forEach(p => { if (!excluded.has(p)) scores[p] += 1; });
    } else {
      match.team1.forEach(p => { if (!excluded.has(p)) scores[p] += 0.5; });
      match.team2.forEach(p => { if (!excluded.has(p)) scores[p] += 0.5; });
    }
  });

  return Object.entries(scores)
    .map(([name, points]) => ({ name, points }))
    .sort((a, b) => b.points - a.points);
}

function renderTournament() {
  let html = `<h2>Turnier gestartet</h2>`;
  html += `<p><strong>Turnierleitung:</strong> ${tournamentLeader}</p>`;

  html += `<h3>Teams:</h3><ul>`;
  teams.forEach(t => {
    html += `<li>${t[0]} & ${t[1]}</li>`;
  });
  html += `</ul>`;

  html += `<h3>Matches:</h3><ul>`;
  matches.forEach((m, i) => {
    html += `<li>${m.team1[0]} & ${m.team1[1]} vs ${m.team2[0]} & ${m.team2[1]}<br/>
      Ergebnis: <input type="text" value="${m.result}" onchange="updateResult(${i}, this.value)" /></li>`;
  });
  html += `</ul>`;

  html += `<h3>Aufgabenverteilung:</h3><ul>`;
  if (extras.length === 1) {
    html += `<li>${extras[0]} ist Schiedsrichter, Helfer und Trinker</li>`;
  } else if (extras.length === 2) {
    html += `<li>${extras[0]} ist Schiedsrichter</li>`;
    html += `<li>${extras[1]} ist Helfer</li>`;
    html += `<li>Turnierleitung (${tournamentLeader}) ist Trinker</li>`;
  } else if (extras.length === 3) {
    html += `<li>${extras[0]} ist Schiedsrichter</li>`;
    html += `<li>${extras[1]} ist Helfer</li>`;
    html += `<li>${extras[2]} ist Trinker</li>`;
  } else if (extras.length === 0) {
    html += `<li>Turnierleitung (${tournamentLeader}) ist Schiedsrichter, Helfer und Trinker</li>`;
  }
  html += `</ul>`;

  const leaderboard = calculateScores();
  html += `<h3>Rangliste:</h3><ol>`;
  leaderboard.forEach(entry => {
    html += `<li>${entry.name}: ${entry.points} Punkte</li>`;
  });
  html += `</ol>`;

  app.innerHTML = html;
}


renderStartPage();





















