const app = document.getElementById('app');

const players = [];
function render() {
  app.innerHTML = `
    <input id="playerInput" placeholder="Spieler hinzufügen" />
    <button onclick="addPlayer()">Hinzufügen</button>
    <ul>
      ${players.map(p => `<li>${p}</li>`).join('')}
    </ul>
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
render();
