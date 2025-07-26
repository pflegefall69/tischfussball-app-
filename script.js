const app = document.getElementById('app');

const players = [];
let matches = [];

function render() {
  app.innerHTML = `
    <input id="playerInput" placeholder="Spieler hinzufügen" />
    <button onclick="addPlayer()">Hinzufügen</button>

    <h3>Spieler:</h3>
    <ul>
      ${players.map(p => `<li>${p}</li>`).join('')}
    </ul>

    <button onclick="generateMatches()" ${players.length < 4 ? 'disabled' : ''}>
      Matches generieren
    </button>

    ${matches.length > 0 ? `
      <h3>Matches:</h3>
      <ul>
        ${matches.map((match, i) => `
          <li>
            Runde ${match.round}: 
            [${match.team1.join(' & ')}] vs [${match.team2.join(' & ')}] <br/>
            Ergebnis: 
            <input 
              type="text" 
              placeholder="z. B. 5:3"
              value="${match.result}" 
              oninput="updateResult(${i}, this.value)" 
            />
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

function generateMatches() {
  const shuffled = [...players].sort(() => Math.random() - 0.5);
  matches = [];
  let round = 1;

  for (let i = 0; i + 3 < shuffled.length; i += 4) {
    matches.push({
      round: round++,
      team1: [shuffled[i], shuffled[i + 1]],
      team2: [shuffled[i + 2], shuffled[i + 3]],
      result: ''
    });
  }

  render();
}

function updateResult(index, value) {
  matches[index].result = value;
}
