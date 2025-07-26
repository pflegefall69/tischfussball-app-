const app = document.getElementById('app');

const players = [];
let pairs = [];

function render() {
  let html = `
    <input id="playerInput" placeholder="Spieler hinzufügen" />
    <button onclick="addPlayer()">Hinzufügen</button>
    
    <h3>Spieler:</h3>
    <ul>
      ${players.map(p => `<li>${p}</li>`).join('')}
    </ul>

    <button onclick="generatePairs()" ${players.length < 2 ? 'disabled' : ''}>
      Zufällige Paarung
    </button>
  `;

  if (pairs.length > 0) {
    html += `
      <h3>Paarungen + Ergebnis:</h3>
      <ul>
        ${pairs.map((pair, index) => `
          <li>
            ${pair.player1} vs ${pair.player2 || 'Freilos'}<br/>
            <input
              type="text"
              placeholder="Ergebnis z. B. 5:3"
              value="${pair.result || ''}"
              oninput="updateResult(${index}, this.value)"
              ${!pair.player2 ? 'disabled' : ''}
            />
          </li>
        `).join('')}
      </ul>
    `;
  }

  app.innerHTML = html;
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

function generatePairs() {
  const shuffled = [...players].sort(() => Math.random() - 0.5);
  pairs = [];

  for (let i = 0; i < shuffled.length; i += 2) {
    pairs.push({
      player1: shuffled[i],
      player2: shuffled[i + 1] || null,
      result: ''
    });
  }

  render();
}

function updateResult(index, value) {
  pairs[index].result = value;
}
