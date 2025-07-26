const app = document.getElementById('app');

const players = [];
let pairs = [];

function render() {
  app.innerHTML = `
    <input id="playerInput" placeholder="Spieler hinzufügen" />
    <button onclick="addPlayer()">Hinzufügen</button>
    
    <h3>Spieler:</h3>
    <ul>
      ${players.map(p => `<li>${p}</li>`).join('')}
    </ul>

    <button onclick="generatePairs()" ${players.length < 2 ? 'disabled' : ''}>
      Zufällige Paarung
    </button>

    ${pairs.length > 0 ? `
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
    ` : ''}
  `;
}

function addPlayer() {
  const input = document.getElementById('playerInput');
  if (input.value.trim()) {
    players.push(input.value.trim());
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
