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
const clickSqr = document.querySelectorAll('sqr')
// console.log(messageEl)

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(function(sqr){
  sqr.addEventListener('click', handleClick)
})
  
  /*-------------------------------- Functions --------------------------------*/
  
  function init(){
    board = [1, -1, null, null, null, null, null, null, null]
    turn = 1
    winner = false
    tie = false
  }
  
  function render(){
    console.log('BAM! Rendered')
    init()
    updateMessage()
    updateBoard()
    
  }
  
  function updateBoard(){
    board.forEach((element, index) => {
      if (element === 1){
        squareEls[index].textContent = 'x'
      }if (element === -1){
        squareEls[index].textContent = 'o'
      }
    });
  }
  
  function updateMessage(){
    if (winner === false && tie === false){
      `It's ${turn}'s turn`
    } if(winner === false && tie === true){
      `It's a Tie`
    } else {
      `Winner Winner Chicken Dinner! ${turn} Wins!`
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
    // console.dir(updateBoard(placePiece(sqIdx)))
    updateBoard()
    checkForTie()
    checkForWinner()
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
      
      
      console.log(winner)

      // board[winningCombos[i]]
      // console.log(winningCombos[i])
      // const win = math.abs(board[winningCombos[i]])
      // const win = math.abs(winningCombos[i])
      // win === 3
    }
    // console.log(win)
  }
  
  render()


//! Step by Step directions below. 
//TODO Cross off when complete 


//todo 6.3 - `checkForWinner`

  //// 6.3a) Create a function called `checkForWinner`

  // 6.3b) Determine if a player has won using one of the two options below.

  ////       Option 1) Loop through each of the winning combination arrays 
  ////       defined in the `winningCombos` array. 
  //        
  //      Total up the three board 
  //       positions using the three indexes in the current combo. Convert 
  //       the total to an absolute value (convert any negative total to 
  //       positive). If the total equals 3, we have a winner, and can set 
  //       `winner` to true.

  //       Option 2) For each one of the winning combinations you wrote in 
  //       step 5, find the total of each winning combination. Convert the 
  //       total to an absolute value (convert any negative total to 
  //       positive). If the total equals 3, we have a winner, and can set 
  //       `winner` to true.


//todo 6.4 - `switchPlayerTurn`

  // 6.4a) Create a function called `switchPlayerTurn`.

  // 6.4b) If `winner` is true, return out of the function - we don’t need 
  //       to switch the turn anymore!

  // 6.4c) If `winner` is false, change the turn by multiplying `turn` by 
  //       `-1` (this flips a `1` to `-1`, and vice-versa).


//todo 6.5 - Tying it all together

  // 6.5a) In our `handleClick` function, call `placePiece`, `checkForTie`, 
  //       `checkForWinner`, and `switchPlayerTurn`. Don’t forget that 
  //       `placePiece` needs `sqIdx` as an argument! 

  // 6.5b) Finally, now that all the state has been updated we need to 
  //       render that updated state to the user by calling the `render` 
  //       function that we wrote earlier.

//todo Step 7 - Create Reset functionality

  // 7a) Add a reset button to the HTML document.

  // 7b) Store the new reset button element as a cached element reference in
  //     a constant named `resetBtnEl`.

  // 7c) Attach an event listener to the `resetBtnEl`. On the `'click'` event 
      // it should call the `init` function you created in step 3