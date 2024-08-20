const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6]
];

// creating a function for initializing the game
function initGame() {
    currentPlayer = "X";            // starting position x hai
    gameGrid = ["", "", "", "", "", "", "", "", ""];        // purri grid khaali hai

    // UI pe empty bhi karna padega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        // inititalise box with css properties again
        box.classList = `box box-${index+1}`;

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

// event listner lagane hai har box me
boxes.forEach((box, index)=>{
    box.addEventListener("click", () =>{
        handleClick(index);
    })
});

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;         // this makes changes in UI
        gameGrid[index] = currentPlayer;                // inner logic ko specify karra hai gameGrid ka
        boxes[index].style.pointerEvents = "none";      // cursor pointer will be removed after filling the box
        // swaping the turn
        swapTurn();

        //checking if any player won or not
        checkGameOver();
    }
}

function swapTurn(){
    if(currentPlayer ==="X")currentPlayer = "O";
    else currentPlayer = "X";

    // UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

newGameBtn.addEventListener("click", initGame);     // new game btn pe click karte hi init game function run ho jayega

function checkGameOver(){
    let answer = "";

    winningPositions.forEach((position)=>{
        // all three values should be non-empty and should be of same type
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        &&(gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            
            // check if winner is X
            if(gameGrid[position[0]] === "X") answer = "X";
            else answer = "O";

            //disabling pointer events
            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            });

            // now we know X/O is a winner we have to mark green 
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        } 
    });

    // it means we have a winner
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        // return;
    }

    // let's check whether there is a tie ??
    let fillCount = 0;
    
    gameGrid.forEach((box) =>{
        if(box !== "") fillCount++;
    });

    // board is filled, it means game is tie
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !"
        newGameBtn.classList.add("active");
    }
}
