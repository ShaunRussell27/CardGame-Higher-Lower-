let score = 0;
let history = [];
let usedCards = new Set();
let currentCard = getRandomCard();
document.getElementById('current-card').src = getCardImage(currentCard);

function getRandomCard() {
    let card;
    do { card = Math.floor(Math.random() * 52) + 1; }
    while (usedCards.has(card));
    usedCards.add(card);
    return card;
}

function getCardImage(card) {
    return `images/${card}.png`;
}

function guess(choice) {
    let nextCard = getRandomCard();
    let resultText = `Current: ${currentCard}, Next: ${nextCard} → `;
    if ((choice === 'higher' && nextCard > currentCard) || (choice === 'lower' && nextCard < currentCard)) {
        score++;
        resultText += 'You Win!';
    } else {
        resultText += 'You Lose!';
    }
    document.getElementById('result').textContent = resultText;
    document.getElementById('score').textContent = score;
    document.getElementById('history').innerHTML += `<li>${resultText}</li>`;
    currentCard = nextCard;
    document.getElementById('current-card').src = getCardImage(currentCard);
}

function restartGame() {
    score = 0;
    history = [];
    usedCards.clear();
    document.getElementById('score').textContent = score;
    document.getElementById('history').innerHTML = '';
    currentCard = getRandomCard();
    document.getElementById('current-card').src = getCardImage(currentCard);
}

function quitGame() {
    alert('Thanks you for playing!');
    document.getElementById('game').innerHTML = '<h2>Thanks for playing see you soon!!</h2>';
}
 

