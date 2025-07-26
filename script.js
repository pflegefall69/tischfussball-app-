const app = document.getElementById('app');

const players = [];
let teamMatches = [];

function render() {
  app.innerHTML = `
    <input id="playerInput" placeholder="Spieler hinzufügen" />
    <button onclick="addPlayer()">Hinzufügen</button>
    
    <h3>Spieler:</h3>
    <ul>
      ${players.map(p => `<li>${p}</li>`).join('')}
    </ul>

    <button onclick="generateTeamMatches()" ${players.length < 4 ? 'disabled' : ''}>
      2er-Teams zufällig paaren
    </button>

    ${teamMatches.length > 0 ? `
      <h3>Team-Matches:</h3>
      <ul>
        ${teamMatches.map(match => `
          <li>
            [${match.team1.join(' & ')}] vs [${match.team2.join(' & ')}]
          </li>
        `).join('')}
      </ul>
    ` : ''}
  `;
}

function addPlayer() {
  const input = document.getElementById('playerInput');
  const name = input.value.trim();
  if (name) {
    players.push(name);
    input.value = '';
    render();
  }
}

function generateTeamMatches() {
  const shuffled = [...players].sort(() => Math.random() - 0.5);
  teamMatches = [];

  // Nur vollständige Teams bilden (4er-Blöcke)
  for (let i = 0; i + 3 < shuffled.length; i += 4) {
    const team1 = [shuffled[i], shuffled[i + 1]];
    const team2 = [shuffled[i + 2], shuffled[i + 3]];
    teamMatches.push({ team1, team2 });
  }

  render();
}

render();
