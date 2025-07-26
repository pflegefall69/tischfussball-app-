const app = document.getElementById('app');

let players = JSON.parse(localStorage.getItem('players')) || [];
let teams = JSON.parse(localStorage.getItem('teams')) || [];
let matches = JSON.parse(localStorage.getItem('matches')) || [];

function saveState() {
  localStorage.setItem('players', JSON.stringify(players));
  localStorage.setItem('teams', JSON.stringify(teams));
  localStorage.setItem('matches', JSON.stringify(matches));
}

function addPlayer() {
  const input = document.getElementById('playerInput');
  const name = input.value.trim();
  if (name) {
    players.push(name);
    input.value = '';
    buildTeamsAndMatches();
  }
}

function buildTeamsAndMatches() {
  const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
  teams = [];
  matches = [];

  // Teams bilden (2er-Teams)
  for (let i = 0; i + 1 < shuffledPlayers.length; i += 2) {
    teams.push([shuffledPlayers[i], shuffledPlayers[i + 1]]);
  }

  // Matches aus Teams bilden (Team vs Team)
  const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
  for (let i = 0; i + 1 < shuffledTeams.length; i += 2) {
    matches.push({
      team1: shuffledTeams[i],
      team2: shuffledTeams[i + 1],
      result: ''
    });
  }

  saveState();
  render();
}

function updateResult(index, value) {
  matches[index].result = value;
  saveState();
}

function render() {
  let html = `
    <input id="playerInput" placeholder="Spielername" />
    <button onclick="addPlayer()">Spieler hinzufügen</button>

    <h3>Spieler (${players.length}):</h3>
    <ul>
      ${players.map(p => `<li>${p}</li>`).join('')}
    </ul>
  `;

  if (matches.length > 0) {
    html += `
      <h3>Spiele:</h3>
      <ul>
        ${matches.map((match, i) => `
          <li>
            [${match.team1.join(' & ')}] vs [${match.team2.join(' & ')}] <br/>
            Ergebnis: <input type="text" value="${match.result}" placeholder="z.B. 5:3" 
            oninput="updateResult(${i}, this.value)" />
          </li>
        `).join('')}
      </ul>
    `;

    const scores = calculateLeaderboard();

    html += `
      <h3>Rangliste:</h3>
      <ol>
        ${scores.map(player => `<li>${player.name}: ${player.points} Punkte</li>`).join('')}
      </ol>
    `;
  }

  app.innerHTML = html;
}

function calculateLeaderboard() {
  const scoreMap = {};

  // Alle Spieler starten mit 0 Punkten
  players.forEach(name => scoreMap[name] = 0);

  matches.forEach(match => {
    if (!match.result || !match.result.includes(':')) return;

    const [score1, score2] = match.result.split(':').map(s => parseInt(s.trim()));

    if (isNaN(score1) || isNaN(score2)) return;

    if (score1 === score2) {
      // Unentschieden → 0.5 Punkte für alle
      match.team1.forEach(player => scoreMap[player] += 0.5);
      match.team2.forEach(player => scoreMap[player] += 0.5);
    } else if (score1 > score2) {
      // Team 1 gewinnt
      match.team1.forEach(player => scoreMap[player] += 1);
    } else {
      // Team 2 gewinnt
      match.team2.forEach(player => scoreMap[player] += 1);
    }
  });

  // Rückgabe: sortiertes Array [{ name, points }]
  return Object.entries(scoreMap)
    .map(([name, points]) => ({ name, points }))
    .sort((a, b) => b.points - a.points);
}


render();
