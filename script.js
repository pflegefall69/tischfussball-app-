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
  }

  app.innerHTML = html;
}

render();
