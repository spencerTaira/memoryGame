"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);
const cardClick = handleCardClick();
createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    // missing code here ...
    const card = document.createElement('div')
    card.classList.add(`${color}`, 'card');
    card.addEventListener('click', cardClick)
    gameBoard.appendChild(card);
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  // ... you need to write this ...
  card.style.backgroundColor = card.classList[0];
  return card;
}

/** Flip a card face-down. */

function unFlipCard(card1, card2, count) {
  // ... you need to write this ...
  card1.style.backgroundColor = 'white';
  card2.style.backgroundColor = 'white';
  count = 0;
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick() {
  // ... you need to write this ...
  let score = 0;
  let count = 0;
  let firstPick = '';
  let newPick = '';
  return (e) => {
    if (count === 2 && firstPick.style.backgroundColor === 'white' && newPick.style.backgroundColor === 'white') {
      count = 0;
    } else if (count === 2) return;
    if (e.target === firstPick) return;
    if (count === 0) {
      firstPick = flipCard(e.target);
      count++;
    } else {
      newPick = flipCard(e.target);
      count++;
      if (firstPick.style.backgroundColor === newPick.style.backgroundColor) {
        firstPick.removeEventListener('click', cardClick);
        newPick.removeEventListener('click', cardClick);
        count = 0;
        score++;
      } else {
        setTimeout(unFlipCard, 1250, firstPick, newPick);
      }
    }
  }
}

// function checkCards(card1, card2) {
//   if (card1.style.backgroundColor === card2.style.backgroundColor) {
//     card1.removeEventListener('click', cardClick);
//     card2.removeEventListener('click', cardClick);
//   } else {
//     unFlipCard(card1, card2);
//   }
// }

// function handleCardClick() {
//   // ... you need to write this ...
//   let count = 0;
//   let firstPick = '';
//   return (e) => {
//     console.log(count);
//     if (count === 2) return;
//     if (e.target === firstPick) return;
//     if (count === 0) {
//       firstPick = flipCard(e.target);
//       count++;
//     } else if (firstPick.style.backgroundColor === flipCard(e.target).style.backgroundColor) {
//       firstPick.removeEventListener('click', cardClick);
//       e.target.removeEventListener('click', cardClick);
//       console.log('match');
//       count = 0;
//     } else {
//       console.log('no match');
//       count++;
//       setTimeout(unFlipCard, 1250, firstPick, e.target, count);
//     }
//   }
// }