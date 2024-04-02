const maps = [
    { src: 'map1.png', year: 1908 },
    { src: 'map2.png', year: 1789 },
    { src: 'map3.png', year: 1900 },
    { src: 'map4.png', year: 1914 },
    { src: 'map5.png', year: 1930 },
    { src: 'map6.png', year: 1935 },
    { src: 'map7.png', year: 1938 },
    { src: 'map8.png', year: 1942 },
    { src: 'map9.png', year: 1946 },
    { src: 'map10.png', year: 1965 },
    { src: 'map11.png', year: 1970 },
    { src: 'map12.png', year: 1972 },
    { src: 'map13.png', year: 1989 },
    { src: 'map14.png', year: 1990 },
    { src: 'map15.png', year: 1991 },
    { src: 'map16.png', year: 1992 },
    { src: 'map17.png', year: 1993 },
    { src: 'map18.png', year: 2001 },
    { src: 'map19.png', year: 2010 },
    { src: 'map20.png', year: 2012 },
    { src: 'map21.png', year: 2013 },
    { src: 'map22.png', year: 2015 },
    { src: 'map23.png', year: 2016 },
    { src: 'map24.png', year: 2018 },
    { src: 'map25.png', year: 2021 },
    { src: 'map26.png', year: 2022 },
    { src: 'map27.png', year: 2023 },
];
const mapContainer = document.getElementById('map-container');
const mapImage = document.getElementById('map-image');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-button');
const resultMessage = document.getElementById('result-message');
const scoreDisplay = document.getElementById('score');
const repeatButton = document.getElementById('repeat-button');
const timerCheckbox = document.getElementById('timer-checkbox');
const timerDisplay = document.getElementById('timer');
const difficultySelect = document.getElementById('difficulty-select');
const startGameButton = document.getElementById('start-game-button');

let currentMapIndex;
let correctAnswers = 0;
let totalAttempts = 0;
let mapsAnswered = 0;
let attemptsLeft = 3;
let timerInterval;

function initializeGame() {
  if (mapsAnswered >= 10) {
    resultMessage.textContent = 'You have answered all maps. Your score: ' + correctAnswers + '/10';
    repeatButton.style.display = 'inline';
    return;
  }
currentMapIndex = Math.floor(Math.random() * maps.length);
  const currentMap = maps[currentMapIndex];
  mapImage.src = currentMap.src;
  mapImage.style.width = '350px';
  resultMessage.textContent = '';
  answerInput.value = '';
  attemptsLeft = 3;

  if (timerCheckbox.checked) {
    startTimer();
  }

  submitButton.disabled = false;
  adjustMapWidth();
}

function adjustMapWidth() {
  const screenWidth = window.innerWidth;
  let mapWidth;
  if (screenWidth < 750) {
    mapWidth = '350px';
  } else {
    mapWidth = '750px';
  }
  mapImage.style.width = mapWidth;
}

function checkAnswer() {
  const userAnswer = parseInt(answerInput.value);
  const currentMap = maps[currentMapIndex];
  totalAttempts++;

  if (userAnswer === currentMap.year) {
    resultMessage.textContent = 'Correct!';
    correctAnswers++;
    mapsAnswered++;
  } else {
    attemptsLeft--;
    if (attemptsLeft > 0) {
      resultMessage.textContent = `Incorrect. ${attemptsLeft} attempts left. Try again!`;
      return;
    } else {
      resultMessage.textContent = `Incorrect. The correct answer is ${currentMap.year}. Moving to the next map.`;
      mapsAnswered++;
    }
  }
scoreDisplay.textContent = `Score: ${correctAnswers}/${mapsAnswered}`;

  if (timerCheckbox.checked) {
    clearInterval(timerInterval);
  }

  setTimeout(initializeGame, 2000);
}

function startTimer() {
  const difficulty = difficultySelect.value;
  let duration;

  switch (difficulty) {
    case 'easy':
      duration = 30 * 60 * 1000;
      break;
    case 'medium':
      duration = 10 * 60 * 1000;
      break;
    case 'hard':
      duration = 5 * 60 * 1000;
      break;
    case 'expert':
      duration = 2 * 60 * 1000;
      break;
    default:
      duration = 30 * 60 * 1000;
  }

  let startTime = Date.now();
  timerInterval = setInterval(function () {
    let elapsedTime = Date.now() - startTime;
    let remainingTime = duration - elapsedTime;

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      timerDisplay.textContent = "Time's up!";
    } else {
      let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
      timerDisplay.textContent = `Time: ${minutes}m ${seconds}s`;
    }
  }, 1000);
}

submitButton.addEventListener('click', function () {
  if (!currentMapIndex) return;
  checkAnswer();
});

repeatButton.addEventListener('click', function () {
  initializeGame();
  correctAnswers = 0;
  totalAttempts = 0;
  mapsAnswered = 0;
  scoreDisplay.textContent = `Score: ${correctAnswers}/10`;
});

startGameButton.addEventListener('click', initializeGame);

window.onload = function () {
  initializeGame();
  submitButton.disabled = true;
};

window.addEventListener('resize', adjustMapWidth);
