'use strict';

//selecting Elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const diceEL = document.querySelector('.dice');
const rollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

let currentScore;
let activePlayer;
let scores;
let isPlaying;

const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  isPlaying = true;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  diceEL.classList.add('hidden');
  activePlayer = 0;
  scores = [0, 0];
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

const random = Math.trunc(Math.random() * 6 + 1);

// rolling Dice function
rollDice.addEventListener('click', function () {
  if (isPlaying) {
    const random = Math.trunc(Math.random() * 6 + 1);
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${random}.png`;

    // switch players if we get a 1
    if (random !== 1) {
      // add dice to current score
      currentScore += random;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch players
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  //add current score to active players score
  if (isPlaying) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEL.classList.add('hidden');

      isPlaying = false;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
