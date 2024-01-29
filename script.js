const computerScore = document.querySelector(".score-computer");
const playerScore = document.querySelector(".score-player");
const keys = document.querySelectorAll(".item");
const playingGame = document.querySelector(".play-game");
const resultZone = document.querySelector(".result-zone");
const winText = document.querySelector("#win-text");
const lostText = document.querySelector("#lost-text");
const tieText = document.querySelector("#tie-text");
const subText = document.querySelector(".sub-text");
const playAgainBtn = document.querySelector(".playBtn");
const replayBtn = document.querySelector(".replayBtn");
const userRock = document.querySelector("#user-rock");
const pcRock = document.querySelector("#pc-rock");
const userPaper = document.querySelector("#user-paper");
const pcPaper = document.querySelector("#pc-paper");
const userScissor = document.querySelector("#user-scissor");
const pcScissor = document.querySelector("#pc-scissor");
const userIcon = document.querySelector(".user-side-icon");
const pcIcon = document.querySelector(".pc-side-icon");
const nextBtn = document.querySelector(".nextBtn");
const rulesBtn = document.querySelector(".rulesBtn");
const mainPage = document.querySelector(".main-page");
const winnerDisplay = document.querySelector(".winner-display");
const winnerPlayAgainBtn = document.querySelector(".winnerPlayBtn");
const rulesDisplay = document.querySelector(".rules");
const crossBtn = document.querySelector(".cross");
const keysArray = Array.from(keys);

// Function to get scores from local storage
function updateScoreDisplay() {
  const scoresJSON = localStorage.getItem("scores");
  const updatedScores = scoresJSON
    ? JSON.parse(scoresJSON)
    : { user: 0, computer: 0 };
  computerScore.innerText = updatedScores.computer;
  playerScore.innerText = updatedScores.user;
}
updateScoreDisplay();

console.log(keysArray);

const valueOfKey = (name) => {
  console.log(name);
  let keyVal = 0;
  if (name === "rock") {
    keyVal = 1;
  } else if (name === "paper") {
    keyVal = 2;
  } else if (name === "scissor") {
    keyVal = 3;
  }
  return keyVal;
};

const getRandomNumber = () => {

  const randomDecimal = Math.random();

  const randomNumber = Math.floor(randomDecimal * 3) + 1;

  return randomNumber;
};

const playRockPaperScissors = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) {
    return "tie";
  } else if (
    (userChoice === 1 && computerChoice === 3) ||
    (userChoice === 2 && computerChoice === 1) ||
    (userChoice === 3 && computerChoice === 2)
  ) {
    return "user";
  } else {
    return "comp";
  }
};

const updateScores = (result) => {

  const scoresJSON = localStorage.getItem("scores");
  const scores = scoresJSON ? JSON.parse(scoresJSON) : { user: 0, computer: 0 };

  // Update the scores based on the result
  if (result === "user") {
    scores.user += 1;
  } else if (result === "comp") {
    scores.computer += 1;
  }

  localStorage.setItem("scores", JSON.stringify(scores));

  updateScoreDisplay();
};

const updateResultSides = (userChoice, computerChoice) => {
  // user icon
  if (userChoice === 1) {
    userRock.style.display = "flex";
    userPaper.style.display = "none";
    userScissor.style.display = "none";
  } else if (userChoice === 2) {
    userRock.style.display = "none";
    userPaper.style.display = "flex";
    userScissor.style.display = "none";
  } else if (userChoice === 3) {
    userRock.style.display = "none";
    userPaper.style.display = "none";
    userScissor.style.display = "flex";
  }

  // pc icon
  if (computerChoice === 1) {
    pcRock.style.display = "flex";
    pcPaper.style.display = "none";
    pcScissor.style.display = "none";
  } else if (computerChoice === 2) {
    pcRock.style.display = "none";
    pcPaper.style.display = "flex";
    pcScissor.style.display = "none";
  } else if (computerChoice === 3) {
    pcRock.style.display = "none";
    pcPaper.style.display = "none";
    pcScissor.style.display = "flex";
  }
};

const updateResultZone = (result, userChoice, computerChoice) => {

  playingGame.style.display = "none";
  resultZone.style.display = "flex";

  if (result === "tie") {
    winText.style.display = "none";
    lostText.style.display = "none";
    subText.style.display = "none";
    playAgainBtn.style.display = "none";
    nextBtn.style.display = "none";

    tieText.style.display = "block";
    replayBtn.style.display = "block";

    updateResultSides(userChoice, computerChoice);
    userIcon.classList.remove("green-background");
    pcIcon.classList.remove("green-background");
  } else if (result === "user") {
    lostText.style.display = "none";
    tieText.style.display = "none";
    replayBtn.style.display = "none";

    winText.style.display = "block";
    subText.style.display = "block";
    playAgainBtn.style.display = "block";
    nextBtn.style.display = "inline";

    updateResultSides(userChoice, computerChoice);

    userIcon.classList.add("green-background");
    pcIcon.classList.remove("green-background");
  } else if (result === "comp") {
    winText.style.display = "none";
    tieText.style.display = "none";
    replayBtn.style.display = "none";
    nextBtn.style.display = "none";

    lostText.style.display = "block";
    subText.style.display = "block";
    playAgainBtn.style.display = "block";

    updateResultSides(userChoice, computerChoice);

    userIcon.classList.remove("green-background");
    pcIcon.classList.add("green-background");
  }
};

const keyClickHander = (event) => {
  const target = event.target;

  //The closest parent div with the class "item"
  const parentDiv = target.closest(".item");

  if (parentDiv) {
    const keyClicked = parentDiv.id;
    console.log("keyClicked:", keyClicked);
    const userChoice = valueOfKey(keyClicked);
    console.log("userChoice:", userChoice);

    const computerChoice = getRandomNumber();
    console.log("computerChoice:", computerChoice);

    const result = playRockPaperScissors(userChoice, computerChoice);
    console.log("Result: ", result);

    updateScores(result);

    updateResultZone(result, userChoice, computerChoice);
  }
};

const playAgainHandler = (event) => {

  playingGame.style.display = "flex";
  resultZone.style.display = "none";
  mainPage.style.display = "block";
  winnerDisplay.style.display = "none";
};

const nextPageHandler = () => {

  mainPage.style.display = "none";
  winnerDisplay.style.display = "flex";
  nextBtn.style.display = "none";
};

const showRulesHandler = () => {
  console.log("inisde showRulesHandler ");

  crossBtn.style.display = "flex";
  rulesDisplay.style.display = "flex";
};

const removeRulesHandler = () => {

  crossBtn.style.display = "none";
  rulesDisplay.style.display = "none";
};

keysArray.forEach((key) => key.addEventListener("click", keyClickHander));
replayBtn.addEventListener("click", playAgainHandler);
playAgainBtn.addEventListener("click", playAgainHandler);
nextBtn.addEventListener("click", nextPageHandler);
winnerPlayAgainBtn.addEventListener("click", playAgainHandler);
rulesBtn.addEventListener("click", showRulesHandler);
crossBtn.addEventListener("click", removeRulesHandler);