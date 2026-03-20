let games = [];
let genreAsc = true;
let scoreAsc = true;

const form = document.getElementById('add-game-form');
const container = document.getElementById('game-container');
const sortGenreBtn = document.getElementById('sort-genre');
const sortScoreBtn = document.getElementById('sort-score');

form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const genre = document.getElementById('genre').value;
    const score = parseFloat(document.getElementById('score').value);
    games.push({ name, genre, score });
    form.reset();
    renderGames();
});

function renderGames() {
    container.innerHTML = '';
    games.forEach((game, index) => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <h3>${game.name}</h3>
            <p><strong>Genre:</strong> ${game.genre}</p>
            <p>
                <strong>Score:</strong>
                <input type="number" min="0" max="10" value="${game.score}" id="score-${index}">
            </p>
            <button class="delete-btn" onclick="deleteGame(${index})">Verwijderen</button>
        `;
        container.appendChild(card);
    });
}

function deleteGame(index) {
    games.splice(index, 1);
    renderGames();
}

sortGenreBtn.addEventListener('click', () => {
    games.sort((a,b) => genreAsc ? a.genre.localeCompare(b.genre) : b.genre.localeCompare(a.genre));
    genreAsc = !genreAsc;
    sortGenreBtn.textContent = `Sorteer op genre ${genreAsc ? '▲' : '▼'}`;
    renderGames();
});

sortScoreBtn.addEventListener('click', () => {
    games.sort((a,b) => scoreAsc ? a.score - b.score : b.score - a.score);
    scoreAsc = !scoreAsc;
    sortScoreBtn.textContent = `Sorteer op score ${scoreAsc ? '▲' : '▼'}`;
    renderGames();
});