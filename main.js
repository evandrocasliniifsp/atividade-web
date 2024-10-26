import './style.css';

const fetchScores = async () => {
  const response = await fetch('http://localhost:3000/score');
  const boardScores = await response.json();
  return boardScores.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.game - b.game;
  });
};

const createScore = async (name, score, game) => {
  console.log(1, name, score, game);
  await fetch('http://localhost:3000/score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, score, game }),
  });
  loadScores();
};

const loadScores = async () => {
  const sortedBoardScores = await fetchScores();
  document.querySelector('#app').innerHTML = `
    <div>
      ${sortedBoardScores.map(boardScore => `
        <p>${boardScore.name} - ${boardScore.score} - ${boardScore.game}</p>
      `).join('')}

      <form id="scoreForm">
        <label for="name">Nome</label>
        <input id="name" type="text" required />

        <label for="score">Pontuação</label>
        <input id="score" type="number" required />

        <label for="game">Jogo</label>
        <input id="game" type="text" required />

        <button type="submit">Salvar</button>
      </form>
    </div>
  `;

  document.getElementById('scoreForm').onsubmit = async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const score = document.getElementById('score').value;
    const game = document.getElementById('game').value;
    await createScore(name, score, game);
  };
};

loadScores();
