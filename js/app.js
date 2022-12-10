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
let board, turn, winner, tie


/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.getElementById('message')
const resetBtn = document.getElementById('resetGame')
// console.log(messageEl)

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(function(sqr){
  sqr.addEventListener('click', handleClick)
})
resetBtn.addEventListener('click', init)
  
  /*-------------------------------- Functions --------------------------------*/

  function init(){
    board = [null, null, null, null, null, null, null, null, null]
    turn = 1
    winner = false
    tie = false
    render()
  }

  init()
  
  function render(){
    console.log('BAM! Rendered')
    updateMessage()
    updateBoard()
  }
  
  function updateBoard(){
    board.forEach((element, index) => {
      if (element === 1){
        squareEls[index].textContent = 'x'
      }if (element === -1){
        squareEls[index].textContent = 'o'
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
  // console.log(updateMessage())
  
function handleClick(evt){
  // console.log('my click handling worked!')
  const sqIdx = evt.target.id.slice(2)
    if (board[sqIdx] !== null){
      return
    } if (winner === true){
      return
    }
    placePiece(sqIdx)
    checkForTie()
    checkForWinner()
    switchPlayerTurn()
    render()
    // console.log(init)
  }

  function placePiece(idx){
    board.splice(idx, 1, turn)
    // return board
  }

  function checkForTie(){
    if (board.includes(null)){
      tie = false
    } else {
      tie = true
    }
  }
//// loop through winningCombos
// tally current board position (1 or -1) for earch winningCombos
// if either === 3, winner!


  function checkForWinner(){
    for (let i = 0; i < winningCombos.length; i++) {
      if (Math.abs(
      board[winningCombos[i][0]]+
      board[winningCombos[i][1]]+
      board[winningCombos[i][2]]) === 3){
        winner = true
      }
      // console.log(win)
      
      
      // console.log(winner)

      // board[winningCombos[i]]
      // console.log(winningCombos[i])
      // const win = math.abs(board[winningCombos[i]])
      // const win = math.abs(winningCombos[i])
      // win === 3
    }
    // console.log(win)
  }
  
function switchPlayerTurn(){
  if (winner === true){
    return
  } else {
    turn *= -1
  }
}



//! Step by Step directions below. 
//TODO Cross off when complete 


//todo Step 7 - Create Reset functionality

  // 7a) Add a reset button to the HTML document.

  // 7b) Store the new reset button element as a cached element reference in
  //     a constant named `resetBtnEl`.

  // 7c) Attach an event listener to the `resetBtnEl`. On the `'click'` event 
      // it should call the `init` function you created in step 3