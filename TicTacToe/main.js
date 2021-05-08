const xTurn = 'X';
const oTurn = 'O';
const boxElement = document.querySelectorAll('.box');
const board = document.getElementsByClassName('box-container');
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let tempArray = [];
let allMoves = [];
let allMarks = [];
let tempMarkArray = [];
let clickedBoxes = 0;
let maxMoves = 0;
let switchTurn;
let previous = '';

window.onload = home();

function waitForClick(){
    initialize();
    boxElement.forEach(box => {
        box.style.pointerEvents = 'auto';
        box.addEventListener('click', boxClick, {once: true});
    });
}

function home(){
    const startDisplay = document.getElementsByClassName('start-container');
    const mainGame = document.getElementsByClassName('main-container');
    const xStart = document.getElementsByClassName('x-start');
    const oStart = document.getElementsByClassName('o-start');
    const buttonContainer = document.getElementsByClassName('button-main-container');
    
    initialize();
    buttonContainer[0].style.visibility = 'hidden';
    startDisplay[0].style.visibility = 'visible';
    mainGame[0].style.visibility = 'hidden';
    xStart[0].addEventListener('click', () => {
        startDisplay[0].style.visibility = 'hidden';
        mainGame[0].style.visibility = 'visible';
        switchTurn = false;
        waitForClick();
    });
    oStart[0].addEventListener('click', () => {
        startDisplay[0].style.visibility = 'hidden';
        mainGame[0].style.visibility = 'visible';
        switchTurn = true;
        waitForClick();
    });
}

function initialize(){
    previous = '';
    tempArray = []; 
    allMoves = [];
    tempMarkArray = [];
    allMarks = [];
    clickedBoxes = 0;
}

function boxClick(e){
    const box = e.target;
    const currentTurn = switchTurn ? oTurn : xTurn;

    previousTurn(previous);
    placeTurn(box, currentTurn);
    storeMoves(box);
    if(checkWin(currentTurn)){
        displayWinner(currentTurn);
    }else if(isDraw()){
        displayDraw();
    }else{
        changeTurn();
    }   
}

function storeMoves(pressedBox){
    let storeBoxId = [];
    let storeInnerText = [];
    
    if(allMoves.length > 0){  
        tempArray.push(pressedBox.id);
        tempMarkArray.push(pressedBox.innerText);
        for(let i = 0; i <= clickedBoxes; i++){
            for(let j = 0; j <= i; j++){
                storeBoxId += tempArray[j];
                storeInnerText += tempMarkArray[j];
                allMoves[i] = storeBoxId.split('');
                allMarks[i] = storeInnerText.split('');
            }
            storeBoxId = [];
            storeInnerText = [];
        }
    }else{
        tempArray[0] = pressedBox.id;
        tempMarkArray[0] = pressedBox.innerText;
        allMoves[0] = tempArray;
        allMarks[0] = tempMarkArray;
    }
    clickedBoxes++;
    if(clickedBoxes > maxMoves){
        maxMoves = clickedBoxes;
    }
}

function placeTurn(box, currentTurn){
    previous = box;
    box.innerText = currentTurn;
    box.style.backgroundColor = 'var(--green)';
    box.style.color = 'var(--white)';
}

function changeTurn(){
    switchTurn = !switchTurn;
}

function previousTurn(previousBox){
    if(previous != ''){
        previousText = !switchTurn ? oTurn : xTurn;
        previousBox.innerText = previousText;
        previousBox.style.backgroundColor = 'var(--violet)';
        previousBox.style.color = 'var(--green)';
    }
}

function checkWin(currentTurn){
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return boxElement[index].innerText === currentTurn;
        });
    });
}

function isDraw(){
    let emptyBox = 0;

    boxElement.forEach(box => {
        if(box.innerText === ''){
            emptyBox++;
        }
    });
    return emptyBox === 0;
}

function displayDraw(){
    const showWinner = document.getElementsByClassName('display-winner');
    const gameWinner = document.getElementsByClassName('winner');
    const winnerIs = document.getElementsByClassName('winner-is');

    winnerIs[0].innerText = '';
    gameWinner[0].innerText = 'Draw!';
    showWinner[0].style.visibility = 'visible';
    endGame();
}

function displayWinner(currentTurn){
    const winnerIs = document.getElementsByClassName('winner-is');
    const showWinner = document.getElementsByClassName('display-winner');
    const gameWinner = document.getElementsByClassName('winner');

    winnerIs[0].innerText = 'Winner:';
    gameWinner[0].innerText = 'Player ' + currentTurn + '!';
    showWinner[0].style.visibility = 'visible';
    endGame();
}

function endGame(){
    const buttonContainer = document.getElementsByClassName('button-main-container');
    const showWinner = document.getElementsByClassName('display-winner');
    const history = document.getElementsByClassName('history');
    const restart = document.getElementsByClassName('restart');
    const quit = document.getElementsByClassName('quit');
    
    boxElement.forEach(box => {
        box.style.pointerEvents = 'none';
    });
    history[0].addEventListener('click', () => {
        buttonContainer[0].style.visibility = 'visible';
        showWinner[0].style.visibility = 'hidden';
        reviewGame();
    });
    restart[0].addEventListener('click', () => {
        quitAndRestart();
        waitForClick();
    });
    quit[0].addEventListener('click', () => {
        quitAndRestart();
        home();
    });
}

function reviewGame(){
    const historyQuit = document.getElementsByClassName('reset');
    const previous = document.getElementsByClassName('previous');
    const next = document.getElementsByClassName('next');

    historyQuit[0].addEventListener('click', () => {
        quitAndRestart();
        home();
    });
    previous[0].addEventListener('click', () => {       
        previousMove();
    });
    next[0].addEventListener('click', () => {
        nextMove();
    });
}

function previousMove() {
    const previous = document.getElementsByClassName('previous');
    const next = document.getElementsByClassName('next');
    let a = 0;

    clickedBoxes--;
    a = clickedBoxes - 1;
    if(allMoves[a].length === 1){
        previous[0].style.pointerEvents = 'none';
    }else{
        previous[0].style.pointerEvents = 'auto';
        next[0].style.pointerEvents = 'auto';
    }
    moveHistory(clickedBoxes, a);
}

function nextMove() {
    const previous = document.getElementsByClassName('previous');
    const next = document.getElementsByClassName('next');
    let a = 0;
    
    console.log(clickedBoxes);
    a = clickedBoxes;
    if(allMoves[clickedBoxes].length === maxMoves){
        next[0].style.pointerEvents = 'none';
    }else{
        previous[0].style.pointerEvents = 'auto';
        next[0].style.pointerEvents = 'auto';
    }
    moveHistory(clickedBoxes, a);
    clickedBoxes++;
}

function moveHistory(clickedBoxes, a){
    boxElement.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = 'var(--violet)';
        box.style.color = 'var(--green)';
        if(box.id === allMoves[clickedBoxes][a]){
            box.style.backgroundColor = 'var(--green)';
            box.style.color = 'var(--white)';
        }            
    });
    for(let i = 0; i <= a; i++){
        boxElement.forEach(box => {
            if(box.id === allMoves[clickedBoxes][i]){
                 box.innerText = allMarks[clickedBoxes][i];
            }
        });
    }
}

function quitAndRestart(){
    const buttonContainer = document.getElementsByClassName('button-main-container');
    const showWinner = document.getElementsByClassName('display-winner');

    buttonContainer[0].style.visibility = 'hidden';
    showWinner[0].style.visibility = 'hidden';
    boxElement.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = 'var(--violet)';
        box.style.color = 'var(--white)';
    });
}