const boxes= document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");


let curr;
let gameGrid;

const winingPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// function to initialize the game
function initGame(){
    currentPlayer = 'X';
    gameGrid = ["", "", "", "", "", "", "", "", ""]

    // update UI that each boxes is empty and all are clickables 
    boxes.forEach((box, index) => {
        // each box is empty
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing, initialise box with css properties again
        box.classList = `box box${index+1}`;
    });
    
    // UI render
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player- ${currentPlayer}`;
}
initGame();

function swapTurn()
{
    if(currentPlayer==='X')
    {
        currentPlayer='O';
    }else{
        currentPlayer='X';

    }
    gameInfo.innerText = `Current Player- ${currentPlayer}`;

}
function checkGameOver()
{
    let ans="";
   winingPositions.forEach(position => {
        if(gameGrid[position[0]]==gameGrid[position[1]]&&gameGrid[position[0]]==gameGrid[position[2]]&&(gameGrid[position[0]]=='X'||gameGrid[position[0]]=='O'))
        {
            ans=gameGrid[position[0]];
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    if(ans!=="")
    {
       gameInfo.innerText=`Winner is ${ans}`;
       newGameBtn.classList.add("active");
       return;
    }

    let cnt=0;
      gameGrid.forEach((box)=>{
        if(box!=="")
        {
            cnt++;
        }
      })
      if(cnt==9)
      {
        gameInfo.innerText=`Game Tied`;
        newGameBtn.classList.add("active");
      }
}
function handleClick(index){
    if(gameGrid[index] === ""){
        // ui update
        boxes[index].innerText = currentPlayer;
        // grid update
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
         //swap karo turn ko
        swapTurn();
         //check koi jeet toh nahi gaya
        checkGameOver();
    }
} 

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
      handleClick(index);
    })
})

newGameBtn.addEventListener("click",initGame);