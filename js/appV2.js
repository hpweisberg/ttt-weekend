/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
]

/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner, tie, line, player1, player2


/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.getElementById('message')
const resetBtn = document.getElementById('resetGame')
const startBtn = document.querySelector('startBtn')
const player1NameBox = document.getElementById('player1Name')
const player2NameBox = document.getElementById('player2Name')
// console.log(messageEl)

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(function(sqr){
  sqr.addEventListener('click', handleClick)
})
resetBtn.addEventListener('click', init)

startBtn.addEventListener('click', function(evt){
  const overlay = document.getElementById('overlay')
  choosePlayerNames()
  overlay.style.display = 'none'
})
  
  /*-------------------------------- Functions --------------------------------*/

  const choosePlayerNames = (evt) => {
    // player1 = player1Name.value.trim(){}
    if (player1NameBox.value.trim()){
      player1.textContent = player1NameBox.value
    } else if (player1NameBox.value === ('')){
      player1 = 'Player 1'
    }
    if (player2NameBox.value.trim()){
      player1.textContent = player2NameBox.value
    } else if (player2NameBox.value === ('')){
      player2 = 'Player 2'
    }
  }

  function init(){
    board = [null, null, null, null, null, null, null, null, null]
    turn = 1
    winner = false
    tie = false
    choosePlayerNames()
    render()
  }

  choosePlayerNames()
  
  function render(){
    console.log('BAM! Rendered')
    updateMessage()
    updateBoard()
  }
  
  function updateBoard(){
    board.forEach((element, index) => {
      if (element === 1){
        squareEls[index].textContent = 'X'
      }if (element === -1){
        squareEls[index].textContent = 'O'
      }if (element === null){
        squareEls[index].textContent = ''
      }
    });
  }
  
  function updateMessage(){
    let person = ''
      if(turn === 1){
        person = 'Player 1'
      } else {
        person = 'Player 2'
      }
    if (winner === false && tie === false){
      messageEl.textContent = `It's ${person}'s turn`
    } else if(winner === false && tie === true){
      messageEl.textContent = `It's a Tie`
    } else {
      messageEl.textContent = `Winner Winner Chicken Dinner! ${person} Wins!`
    }
  }
  
function handleClick(evt){
  const sqIdx = evt.target.id.slice(2)
    if (board[sqIdx] !== null){
      return
    } if (winner === true){
      return
    }
    placePiece(sqIdx)
    checkForTie()
    checkForWinner()
    winLine()
    switchPlayerTurn()
    render()
  }

  function placePiece(idx){
    board.splice(idx, 1, turn)
  }

  function checkForTie(){
    if (board.includes(null)){
      tie = false
    } else {
      tie = true
    }
  }

  function checkForWinner(){
    for (let i = 0; i < winningCombos.length; i++) {
      if (Math.abs(
      board[winningCombos[i][0]]+
      board[winningCombos[i][1]]+
      board[winningCombos[i][2]]) === 3){
        winner = true
      }
    }
  }
  
function switchPlayerTurn(){
  if (winner === true){
    return
  } else {
    turn *= -1
  }
}

function winLine(){
  if (winner === true){
    console.log('line')
  }
}