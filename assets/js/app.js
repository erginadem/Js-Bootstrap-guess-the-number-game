// ELEMENTS
const inputEl = document.querySelector("#txtNumber");
const btnGuessEl = document.querySelector("#btnGuess");
const btnStartEl = document.querySelector("#btnStart");
const btnRestartEl = document.querySelector("#btnRestart");
const resultEl = document.querySelector("#result");
const randomNumEl = document.querySelector("#randomNum");
const gameInfoEl = document.querySelector("#gameInfo");
const shotEl = document.querySelector("#shot");
let minNumber = 0;
let maxNumber = 15;
let randomNumber;
const rights = 5;
let lifes = rights;

// GAME-INFO BOX
gameInfoEl.innerHTML = `The program will randomly pick a number between ${minNumber} and ${maxNumber}. 
  Your goal is to guess the number. You have ${lifes} lives. 
  The program will tell you if the number is greater or fewer. Good luck!`;

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
  return Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
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
  randomNumber = generateRandomNumber(minNumber, maxNumber);
  btnRestartEl.classList.remove("d-none");
  btnRestartEl.classList.add("d-inline");
  btnStartEl.classList.add("d-none");
  btnGuessEl.classList.remove("d-none");
  inputEl.classList.remove("d-none");
  inputEl.focus();

  shotEl.innerHTML = `Remaining life <i class="fa-solid fa-arrow-right text-danger"></i> ${setShotIcons(
    lifes
  )}`;
  randomNumEl.innerText = randomNumber;
};

// RESTART GAME
const restartGame = () => {
  inputEl.classList.add("d-inline");
  inputEl.classList.remove("d-none");
  btnGuessEl.classList.remove("d-none");
  btnGuessEl.classList.add("d-inline");
  inputEl.value = "";
  inputEl.focus();
  resultEl.classList.remove("d-block");
  resultEl.classList.add("d-none");
  randomNumber = generateRandomNumber(minNumber, maxNumber);
  randomNumEl.innerText = randomNumber;

  //set lifes
  lifes = rights;
  shotEl.innerHTML = `Remaining life <i class="fa-solid fa-arrow-right text-danger"></i> ${setShotIcons(
    lifes
  )}`;
};

// GUESS NUMBER
const guessNumber = () => {
  resultEl.classList.remove("d-none");
  resultEl.classList.add("d-block");
  let guessedNumber = Number(inputEl.value);

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
    inputEl.classList.add("d-none");
    inputEl.classList.remove("d-inline");
    inputEl.value = "";
  } else if (guessedNumber < randomNumber) {
    resultEl.innerHTML = `Please guess a greater number <i class="fa-solid fa-arrow-up text-danger"></i>`;
    inputEl.value = "";
    inputEl.focus();
  } else {
    resultEl.innerHTML = `Please guess a smaller number <i class="fa-solid fa-arrow-down text-danger"></i>`;
    inputEl.value = "";
    inputEl.focus();
  }

  lifes--;

  shotEl.innerHTML = `Remaining life <i class="fa-solid fa-arrow-right text-danger"></i> ${setShotIcons(
    lifes
  )}`;

  if (lifes === 0) {
    resultEl.innerHTML = `GAME OVER`;
    btnGuessEl.classList.add("d-none");
    inputEl.classList.add("d-none");
    inputEl.classList.remove("d-inline");
    return;
  }
};
