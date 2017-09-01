//*********   BUTTON NEW GAME  ***********
//get NG's button element
var newGameBtn = document.getElementById('js-newGameButton');

//set listener to NG button 
newGameBtn.addEventListener('click', newGame);


//*********   BUTTONS rock, paper & scissors  ***********

//get RPS's (rock, papaer & scissors) buttons elements
var pickRock        = document.getElementById('js-playerPick_rock'),
    pickPaper       = document.getElementById('js-playerPick_paper'),
    pickScissors    = document.getElementById('js-playerPick_scissors');

//**** set listeners to RPS buttons    
//human player pick ROCK
pickRock.addEventListener('click', function () { playerPick('rock'); });  
//human player pick PAPER
pickPaper.addEventListener('click', function() { playerPick('paper'); });  
//human player pick SCISSORS
pickScissors.addEventListener('click', function() { playerPick('scissors'); });  


//********** Game' Logic ************************

//start's status
var gameState = 'notStarted',
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

// game's elements display
var newGameElem = document.getElementById('js-newGameElement'),
    pickElem    = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements() {
    switch(gameState) {
        case 'started':
                newGameElem.style.display = 'none';
                pickElem.style.display = 'block';
                resultsElem.style.display = 'block';
            break;
        case 'ended':
                newGameBtn.innerHTML = 'Try again';
                /* falls through */
        case 'notStarted':
                /* falls through */
        default:        
                newGameElem.style.display = 'block';
                pickElem.style.display = 'none';
                resultsElem.style.display = 'none';
    }
}


setGameElements();

//game start
var playerPointsElem    = document.getElementById('js-playerPoints'),
    playerNameElem      = document.getElementById('js-playerName'),
    computerPointsElem  = document.getElementById('js-computerPoints'); 

function newGame() {
    player.name = prompt('Please enter your name','player name');
    if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();

        playerNameElem.innerHTML = player.name;
        //setGamePoints();
    }
}    

//player choice
function playerPick(playerPick) {
    console.log(playerPick);

    var computerPick = getComputerPick();

    //display human choice
    playerPickElem.innerHTML = playerPick;   
    //display computer choice
    computerPickElem.innerHTML = computerPick;  

    checkRoundWinner(playerPick, computerPick);
    setGamePoints();

    if (player.score === 10) {
        endGame('player');
    } else if (computer.score === 10) {
        endGame('computer');
    }
}


//computer random choice
function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random() * 3)];
}

//add player and copmuter choice on page
var playerPickElem      = document.getElementById('js-playerPick'),
    computerPickElem    = document.getElementById('js-computerPick'),
    playerResultElem    = document.getElementById('js-playerResult'),
    computerResultElem  = document.getElementById('js-computerResult');


function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = ''; 

    var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone';                 //remis
    } else if (
            (computerPick == 'rock' && playerPick == 'scissors') ||
            (computerPick == 'paper' && playerPick == 'rock') ||
            (computerPick == 'scissors' && playerPick == 'paper')) {
    
        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = 'Win!';
        player.score++;
        console.log(player.score);
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = 'Win!';
        computer.score++;
    }
}

//set game points
function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

//end of game
function endGame(winner) {

    //check who wins   
    if (winner == 'player') {
        document.getElementById('js-winnerInfo').innerHTML = '<b>' + player.name.toUpperCase() + '</b> YOU WIN!';
    } else if (winner == 'computer') {
        document.getElementById('js-winnerInfo').innerHTML = '<b>Sorry ' + player.name.toUpperCase() + '!</b> YOU LOSE!';
    }

    //set game result in modal
    document.getElementById('js-playerPointsModal').textContent = player.score;
    document.getElementById('js-playerNameModal').textContent = player.name;
    document.getElementById('js-computerPointsModal').textContent = computer.score;

    //call modal
    $('#resultModal').modal('show');
    
    //reset counters and set game status as ended
    player.score = computer.score = 0;
    setGamePoints();
    
    
    gameState = 'ended';
    setGameElements();
}