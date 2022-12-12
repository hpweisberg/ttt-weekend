/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner, tie;
let scoreBoard = {
  player1Wins: 0,
  player2Wins: 0,
  ties: 0,
};

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.getElementById("message");
const resetBtn = document.getElementById("resetGame");
const player1ScoreEl = document.getElementById("player1");
const player2ScoreEl = document.getElementById("player2");
const tieScoreEl = document.getElementById("tie");
// console.log(messageEl)

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(function (sqr) {
  sqr.addEventListener("click", handleClick);
});
resetBtn.addEventListener("click", init);

/*-------------------------------- Functions --------------------------------*/

function init() {
  board = [null, null, null, null, null, null, null, null, null];
  turn = 1;
  winner = false;
  tie = false;
  messageEl.classList.remove("animate__animated", "animate__tada");
  squareEls.forEach((sq) => sq.classList.remove("winner"));
  render();
}

init();

function render() {
  console.log("BAM! Rendered");
  updateMessage();
  updateBoard();
}

function updateBoard() {
  board.forEach((element, index) => {
    if (element === 1) {
      squareEls[index].textContent = "X";
    }
    if (element === -1) {
      squareEls[index].textContent = "O";
    }
    if (element === null) {
      squareEls[index].textContent = "";
    }
  });
}

function updateMessage() {
  let person = "";
  if (turn === 1) {
    person = "Player 1";
  } else {
    person = "Player 2";
  }
  if (winner === false && tie === false) {
    messageEl.textContent = `It's ${person}'s turn`;
  } else if (winner === false && tie === true) {
    messageEl.textContent = `It's a Tie`;
  } else {
    messageEl.textContent = `Winner Winner Chicken Dinner! ${person} Wins!`;
  }
}

function handleClick(evt) {
  const sqIdx = evt.target.id.slice(2);
  if (board[sqIdx] !== null) {
    return;
  }
  if (winner === true) {
    return;
  }
  placePiece(sqIdx);
  checkForTie();

  checkForWinner();
  incrementScoreBoard();
  updateScoreBoard();
  switchPlayerTurn();
  render();
}

function placePiece(idx) {
  board.splice(idx, 1, turn);
}

function checkForTie() {
  if (board.includes(null)) {
    tie = false;
  } else {
    tie = true;
    scoreBoard.ties++;
  }
}

function checkForWinner() {
  winningCombos.forEach((combo) => {
    // Get player's chosen positions based off of row on board and winning combos
    const row = combo.map((pos) => board[pos]);

    // Calculate winner if all three columns have been chosen by a player
    const isWinner =
      Math.abs(row.reduce((acc, player) => acc + player, 0)) === 3;

    if (isWinner) {
      winner = true;
      celebrate(combo);
      return;
    }
  });
}

function celebrate(chosenWinningCombo) {
  confetti.start(1000);
  messageEl.classList.add("animate__animated", "animate__tada");

  // Strike through winning squared
  chosenWinningCombo.forEach((winningIndex) => {
    const sq = document.querySelector(`#sq${winningIndex}`);
    sq.classList.add("winner");
  });
}

function switchPlayerTurn() {
  if (winner === true) {
    return;
  } else {
    turn *= -1;
  }
}

function incrementScoreBoard() {
  if (winner === false) {
    return;
  }
  if (winner === true && turn === 1) {
    scoreBoard.player1Wins++;
  }
  if (winner === true && turn === -1) {
    scoreBoard.player2Wins++;
  }
}

function updateScoreBoard() {
  player1ScoreEl.textContent = `Player 1: ${scoreBoard.player1Wins}`;
  player2ScoreEl.textContent = `Player 2: ${scoreBoard.player2Wins}`;
  tieScoreEl.textContent = `Ties: ${scoreBoard.ties}`;
}
