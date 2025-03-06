//set all variables
let score = 0;
let dealerscore=0;
let rounds = 0;
let history = [];
let usedCards = new Set();
let currentCard,dealerCard;



//  setup the game
document.getElementById('score').textContent = score;
document.getElementById('dealer-score').textContent = dealerscore;
document.getElementById('rounds').textContent = rounds;



//call function
displayAllCards();

// Get a random card that has not been used yet
function getRandomCard() {
        let card;
        do {
            card = Math.floor(Math.random() * 52) + 1;
        } while (usedCards.has(card)); // Ensure card unique
        usedCards.add(card);
            return card;
}

// Get the image for a given card number (1 to 52)
function getCardImage(card) {
     return `images/${card}.png`; // Ensure correct for images
}

// The logic of the game
function guess(choice) {
    if (rounds >= 5) {
        alert("Game over! You cannot play more than 5 rounds.");
        return;
    }
  
    
    //change the cards after round
    let currentCard = getRandomCard();
    let dealerCard= getRandomCard();

    
    let resultText = `Your hand: ${cardToString(currentCard)}, Dealers hand: ${cardToString(dealerCard)} → `;

    let currentCardColor = getCardColor(currentCard);
    let dealerCardColor = getCardColor(dealerCard);
    let currentValue = getCardValue(currentCard);
    let dealerValue = getCardValue(dealerCard);


    if (currentValue === dealerValue) {
        if (currentCardColor === dealerCardColor) {
            resultText += "It's a Draw! Round is not counted.";
        } else {
            resultText += (currentCardColor === 'black') ? "You won by having a black card" : "Dealer won by having a black card";
            if (currentCardColor === 'black') score++;
            if (dealerCardColor === 'black') dealerscore++;
        }
    } else {
        if ((choice === 'higher' && dealerValue > currentValue) || (choice === 'lower' && dealerValue < currentValue)) {
            score++;
            resultText += 'You Won!';
        } else {
            dealerscore++;
            resultText += 'Dealer won!';
            
        }
    }

    // Update the score and history
    //document.getElementById('rounds').textContent = ++rounds;
    document.getElementById('score').textContent = score;
    document.getElementById('dealer-score').textContent = dealerscore;
    if (!(currentValue === dealerValue && currentCardColor === dealerCardColor)) {
        document.getElementById('rounds').textContent = ++rounds;
    }

    document.getElementById('history').innerHTML += `<li>${resultText}</li>`;
    document.getElementById('result').textContent = resultText;

    // Update the current card
    document.getElementById('current-card').src = getCardImage(currentCard);

    if (rounds === 5) {
        if(score>dealerscore){
            document.getElementById('result').textContent = `Game Over you won by a Final Score of : ${score}`;
        }else if(score<dealerscore){
            document.getElementById('result').textContent = 'Game Over Dealer won by a final score of: ' + dealerscore;
        }
    }
}

// Determine the color of the card
function getCardColor(card) {
    const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
    const suit = suits[Math.floor((card - 1) / 13)];
    return (suit === 'Clubs' || suit === 'Spades') ? 'black' : 'red';
}

// Get the value of the card
function getCardValue(card) {
    const ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
    let rank = ranks[(card - 1) % 13];
    if (rank === 'Ace') {
        return (getCardColor(card) === 'black') ? 14 : 1; // Black Aces high, Red Aces low
    }
    return (card - 1) % 13 + 1;
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
    dealerscore =0;
    rounds = 0;
    history = [];
    usedCards.clear();
    document.getElementById('score').textContent = score;
    document.getElementById('dealer-score').textContent = score;
    document.getElementById('rounds').textContent = rounds;
    document.getElementById('history').innerHTML = '';
    currentCard = getRandomCard();
    document.getElementById('current-card').src = getCardImage(currentCard);
    document.getElementById('result').textContent = '';
}

// Quit game
function quitGame() {
     alert('Thanks for playing!');
    //document.getElementById('game').innerHTML = '<h2>Thanks you for playing! Goodbye</h2>';
    document.getElementById('game').innerHTML = `
        <h2>Thanks you for playing! Goodbye</h2>
        <button class="btn" onclick="location.reload()">Or Play Again</button>
    `;
}

// Display all cards at the bottom of the page for context
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
