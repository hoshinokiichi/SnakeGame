var btnStart=document.getElementById("btnStart");
var btnPasue=document.getElementById("btnPause");
var snaColor;
var newSpeed;
var mapNum;

var gameHistory = new Array();
gameHistory.push("Name                                            Score");
gameHistory.push("---------------------------------------------------------");

/**
 * An object for a newly started game with default color
 * @type {SnakeGame}
 */
var gameSnake = new SnakeGame("gameScense",{
    snakeColor:"purple",
    onCountChange:function(count){
        var txtScore=document.getElementById("txtValue");
        txtScore.innerText=count.toString( );
        txtScore=null;
    },
    onGamePause:function(status){
        if(status){
            btnPasue.value = "Start";
        }else {
            btnPasue.value = "Pause"
        }
    },
    onGameOver:function (count) {
        alert("Game over. Your score："+ count);
        pushHistory(count);
    }
});

/**
 * @function
 * @summary the function to start a game if the start game button is pressed and user name is not empty
 */
btnStart.onclick=function(event){
    if(checkUserName()){
        gameSnake.startGame();
        btnStart.blur();
    }
}

/**
 * @function
 * @summary the function to trigger a game state change between pause and continue 
 * if the pause button is pressed
 */
btnPasue.onclick=function(event) {
    gameSnake.changeGameStatus();
    btnStart.blur();
}


/**
 * @function
 * @summary the function to use updated snake color to start a new game.
 */
function updateSnake() {
    gameSnake = new SnakeGame("gameScense",{
        snakeColor: snaColor,
        curSpeed: newSpeed,
        mapc: mapNum,
        onCountChange:function(count){
            var txtScore=document.getElementById("txtValue");
            txtScore.innerText=count.toString( );
            txtScore=null;
        },
        onGamePause:function(status){
            if(status){
                btnPause.value = "Start";
            }else {
                btnPause.value = "Pause"
            }
        },
        onGameOver:function (count) {
            alert("Game over. Your score："+ count);
            pushHistory(count);
        }
    });
}