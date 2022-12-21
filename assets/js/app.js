// ELEMENTS
const inputEl = document.querySelector("#txtNumber");
const btnGuessEl = document.querySelector("#btnGuess");
const btnStartEl = document.querySelector("#btnStart");
const btnRestartEl = document.querySelector("#btnRestart");
const resultEl = document.querySelector("#result");
const randomNumEl = document.querySelector("#randomNum");
const gameInfoEl = document.querySelector("#gameInfo");
const shotEl = document.querySelector("#shot");

let maxNumber = 100;
let minNumber = 1;
let randomNumber;
let lifes = 10;
let status = "over";

// GAME-INFO BOX
gameInfoEl.innerHTML = `The program will randomly pick a number between ${minNumber} and ${maxNumber}. Your goal is to guess the number. You have ${lifes} lives. The program will tell you if the number is greater or fewer. Good luck!`;

// SHOT HEART
const setShotIcons = (shot) => {
  let strHeart = "";
  for (let i = 0; i < shot; i++) {
    strHeart += "❤️";
  }
  return strHeart;
};

// GENERATE RANDOM NUMBER
const generateRandomNumber = (minNumber, maxNumber) => {
  return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
};

// KEYPRESS ENTER
inputEl.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    btnGuessEl.click();
  }
});

// START GAME
const startGame = () => {
  status = "on";
  randomNumber = generateRandomNumber(minNumber, maxNumber);
  btnRestartEl.classList.remove("d-none");
  btnRestartEl.classList.add("d-inline");
  btnStartEl.classList.add("d-none");
  btnGuessEl.classList.remove("d-none");
  inputEl.classList.remove("d-none");
  inputEl.focus();

  // need help! when player guesses the incorrect number the heart icon must decrease one by one
  shotEl.innerText = setShotIcons(lifes);

  randomNumEl.innerText = randomNumber;
};

// RESTART GAME
const restartGame = () => {
  btnGuessEl.classList.remove("d-none");
  btnGuessEl.classList.add("d-inline");
  inputEl.value = "";
  inputEl.focus();
  resultEl.classList.remove("d-block");
  resultEl.classList.add("d-none");
  randomNumber = generateRandomNumber(100, 1);
  randomNumEl.innerText = randomNumber;
  lifes = 5;
};

// GUESS NUMBER
const guessNumber = () => {
  resultEl.classList.remove("d-none");
  resultEl.classList.add("d-block");
  let guessedNumber = Number(inputEl.value);
  lifes--;

  if (status === "over" || lifes === 0) {
    resultEl.innerText = "Game over. Please restart the game!";
    inputEl.value = "";
    btnGuessEl.classList.add("d-none");
    return;
  }

  if (
    !guessedNumber ||
    isNaN(guessedNumber) ||
    guessedNumber < minNumber ||
    guessedNumber > maxNumber
  ) {
    return alert("Please enter a valid number.");
  }

  if (guessedNumber === randomNumber) {
    resultEl.innerText = "🎉 Congratulations! You win! 🎉";
    btnGuessEl.classList.add("d-none");
    inputEl.value = "";
    status = "over";
  } else if (guessedNumber < randomNumber) {
    resultEl.innerText = "Please guess a greater number ⬆️";
    inputEl.value = "";
    inputEl.focus();
  } else {
    resultEl.innerText = "Please guess a smaller number ⬇️";
    inputEl.value = "";
    inputEl.focus();
  }
};
