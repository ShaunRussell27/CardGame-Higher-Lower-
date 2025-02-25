//set variables
let score = 0;
let rounds = 0;
let history = [];
let usedCards = new Set();
let currentCard = getRandomCard();

 // Initial setup
document.getElementById('current-card').src = getCardImage(currentCard);
document.getElementById('score').textContent = score;
document.getElementById('rounds').textContent = rounds;

displayAllCards();

// Get a random card that has not been used yet
function getRandomCard() {
        let card;
        do {
            card = Math.floor(Math.random() * 52) + 1;
        } while (usedCards.has(card)); // Ensure unique cards in one game
        usedCards.add(card);
            return card;
}

// Get the image for a given card number (1 to 52)
function getCardImage(card) {
     return `images/${card}.png`; // Ensure this path is correct for your images
}

// The logic for guessing higher or lower
function guess(choice) {
    if (rounds >= 5) {
        alert("Game over! You cannot play more than 5 rounds.");
        return;
    }

    let nextCard = getRandomCard();
    let resultText = `Current: ${cardToString(currentCard)}, Next: ${cardToString(nextCard)} → `;

    if (currentCard === nextCard) {
        resultText += 'It\'s a Draw!';
    } else if ((choice === 'higher' && nextCard > currentCard) || (choice === 'lower' && nextCard < currentCard)) {
        score++;
        resultText += 'You Win!';
    } else {
        resultText += 'You Lose!';
    }

    // Update the score and history
    document.getElementById('score').textContent = score;
    document.getElementById('rounds').textContent = ++rounds;
    document.getElementById('history').innerHTML += `<li>${resultText}</li>`;
    document.getElementById('result').textContent = resultText;

    // Update the current card
    currentCard = nextCard;
    document.getElementById('current-card').src = getCardImage(currentCard);

    if (rounds === 5) {
        document.getElementById('result').textContent = `Game Over! Final Score: ${score}`;
    }
}

        // Convert card number to string for easier display
function cardToString(card) {
    const ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
    const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
    let rank = ranks[(card - 1) % 13];
    let suit = suits[Math.floor((card - 1) / 13)];
    return `${rank} of ${suit}`;
}

// Restart the game
function restartGame() {
    score = 0;
    rounds = 0;
    history = [];
    usedCards.clear();
    document.getElementById('score').textContent = score;
    document.getElementById('rounds').textContent = rounds;
    document.getElementById('history').innerHTML = '';
    currentCard = getRandomCard();
    document.getElementById('current-card').src = getCardImage(currentCard);
    document.getElementById('result').textContent = '';
}

        // Quit the game
        function quitGame() {
            alert('Thanks for playing!');
            document.getElementById('game').innerHTML = '<h2>Thanks for playing! See you soon!!</h2>';
        }
        // Display all cards at the bottom of the page
function displayAllCards() {
    let allCardsContainer = document.getElementById('all-cards');
        for (let card = 1; card <= 52; card++) {
             let cardDiv = document.createElement('div');
             cardDiv.classList.add('card');

         let cardImage = document.createElement('img');
         cardImage.src = getCardImage(card);
         cardDiv.appendChild(cardImage);
         //displays in blocks f three
         let cardName = document.createElement('p');
         cardName.textContent = cardToString(card);
         cardDiv.appendChild(cardName);

          allCardsContainer.appendChild(cardDiv);
     }
    }
