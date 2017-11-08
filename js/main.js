/* WATS 3020 Browser Game project */
/* Build a tic tac toe game for two players. */


class Player {
  constructor(token){
    this.token = token;
  }
}

// Tic Tac Toe Game Class
class TicTacToe {
    constructor(){
        
        this.player1 = new Player('remove-sign');
        this.player2 = new Player('unchecked');
    
        this.currentPlayer = null;
   
        this.gameStatus = null;
       
        this.winner = null; 
     
        this.moveCount = 0;

     
        this.startPrompt = document.querySelector('#start-prompt');
   
        this.movePrompt = document.querySelector('#move-prompt');
       
        this.currentPlayerToken = document.querySelector('#player-token');
       
        this.gameboard = document.querySelector('#gameboard');
      
        this.winScreen = document.querySelector('#win-screen');
     
        this.winnerToken = document.querySelector('#winner-token');
     
        this.drawScreen = document.querySelector('#draw-screen');
        // Initialize an Array representing the starting state of the game board.
        // This is provided for you. We can access the spaces on the board using
        // (X, Y) coordinates as `this.gameState[x][y]`, which is how the game
        // will check to see if the winner is known.
        this.gameState = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];

        // Array of Win States
        // This is provided for you. Each of these arrays represents the ways
        // a player can win Tic Tac Toe. Each item in the array is another
        // array. Each of those arrays contains a set of (X, Y) coordinates.
        // If a player has claimed the tile at each of the coordinates listed in
        // one of the win states, then they have won the game.
        this.winStates = [
          [[0,0],[0,1],[0,2]],
          [[1,0],[1,1],[1,2]],
          [[2,0],[2,1],[2,2]],
          [[0,0],[1,0],[2,0]],
          [[0,1],[1,1],[2,1]],
          [[0,2],[1,2],[2,2]],
          [[0,0],[1,1],[2,2]],
          [[0,2],[1,1],[2,0]]
        ];
    }

    // This `checkForWinner()` method is provided for you, but you must fill in
    // the event dispatch lines that cause the end game screens to show.
    checkForWinner(){
      console.log('Checking for winner.');
        for (let condition of this.winStates){
            let winningCondition = true;
            for (let position of condition){
                if (this.gameState[position[0]][position[1]] != this.currentPlayer.token) {
                    winningCondition = false;
                }
            }
            if (winningCondition) {
                console.log('We have a winner!');
                console.log(`Condition is: ${condition}`);
                this.gameStatus = 'won';
                this.winner = this.currentPlayer;

                         
                let winEvent = new Event('win');

                document.dispatchEvent(winEvent);

                return true; // Return a value to stop processing the additional move count check.
            }
        }
        this.moveCount++;
        console.log(`Reviewed move ${this.moveCount}.`)
        if (this.moveCount >= 9) {
            console.log(`This game is a draw at ${this.moveCount} moves.`);
            this.gameStatus = 'draw';

            let drawEvent = new Event('draw');
         
            document.dispatchEvent(drawEvent);
        }
    }

    recordMove(event){
      console.log('Recording move.');
        //recording a move in the `this.gameState` property.

        let tileX = event.target.dataset.x;
      
        let tileY = event.target.dataset.y; 
      
        this.gameState[tileX][tileY] = this.currentPlayer.token;
      
        event.target.setAttribute('class',  this.currentPlayerToken.setAttribute('class', `tile played glyphicon glyphicon-${this.currentPlayer.token}`)
    }
    switchPlayer(){
      console.log('Switching player.');
        // switching between players after each move.  
      
        if (this.currentPlayer === this.player1) { 
            this.currentPlayer = this.player2;
        } else {
            this.currenPlayer = this.player1;
        }

            // reflect the current player's token.
        this.currentPlayerToken.setAttribute('class', `glyphicon glyphicon-${this.currentPlayer.token}`);
    }
    setUpTileListeners(){
      console.log('Setting up tile listeners.');
        // event listeners for tiles. 
      
        let tileElements = document.querySelectorAll('.tile');
      
        for (let tile of tileElements){
          tile.addEventListener('click', handleMove);
        }
    }
    showWinScreen(){
      console.log('Now showing win screen.')
    
        this.winScreen.setAttribute('class', 'show');
     
        this.winnerToken.setAttribute('class', `glyphicon ${this.winner.token}`);
    }
    showDrawScreen(){
     
        this.drawScreen.setAttribute('class', 'show');
    }
    setUpBoard(){
        console.log('Setting up gameboard.');
       
        this.gameboard.innerHTML = '';
      
        for (let i=0; i<3; i++){
          
          let newRow = document.createElement('div');
            
          newRow.setAttribute('class', 'row');
       
        for (let j=0; j<3; j++){
       
            let newCol = document.createElement('div');
            
            newCol.setAttribute('class', 'col-xs-3');
             
            let newTile = document.createElement('span');
              
            newTile.setAttribute('class', 'tile glyphicon glyphicon-question-sign');
             
            newTile.dataset.x = i;
             
            newTile.dataset.y = j;
                
            newCol.appendChild(newTile);
               
            newRow.appendChild(newCol);
        }// second `for` loop ends here.   

          
        this.gameboard.appendChild(newRow);
        
     }//first `for` loop ends here.

        this.setUpTileListeners();
      
    }
    initializeMovePrompt(){
        // initializes the `this.movePrompt` element.
        console.log('Initializing move prompt.');

        this.startPrompt.setAttribute('class', 'hidden');
    
        this.movePrompt.setAttribute('class', '');
      
        this.currentPlayer = this.player1;
       
        this.currentPlayerToken.setAttribute('class', `glyphicon glyphicon-${this.currentPlayer.token}`);
    }
    start(){
       
        console.log('Starting game.');
       
        this.setUpBoard();
        
        this.initializeMovePrompt();
    }
} // End of the Tic Tac Toe Class definition.


let game;
console.log('Game code starting.');

document.addEventListener('DOMContentLoaded', function(event){
 
    let startButton = document.querySelector('#start-button');
   
    startButton.addEventListener('click', function(event){
    
    game = new TicTacToe();
      
    game.start();  
    });

  
});// End of the "DOMContentLoaded" event listener here.


document.addEventListener('win', function(event){
  console.log('Detected win event.');
  game.showWinScreen();
});//End of the "win" event listener.

document.addEventListener('draw', function(event){
  console.log('Detected draw event.');
  game.showDrawScreen();
});//End of the "draw" event listener.

// External function for event listeners provided for you.
function handleMove(event){
    console.log('Handling player move.');
    // Record the move for the current player.
    game.recordMove(event);

    // Check to see if the last move was a winning move.
    game.checkForWinner();

    // Rotate players.
    game.switchPlayer();
}
