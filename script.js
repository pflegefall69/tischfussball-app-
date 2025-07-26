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
      <h3>Paarungen:</h3>
      <ul>
        ${pairs.map(pair => `<li>${pair[0]} vs ${pair[1] || 'Freilos'}</li>`).join('')}
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
    pairs.push([shuffled[i], shuffled[i + 1] || null]);
  }
  render();
}

render();
