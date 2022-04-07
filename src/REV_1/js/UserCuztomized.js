/**
 * @function
 * @summary the function to use red snake color to start a new game.
 */
snaColorR.onclick = function(event) {
    snaColor = "red";
    updateSnake();
}

/**
 * @function
 * @summary the function to use green snake color to start a new game.
 */
snaColorG.onclick = function(event) {
    snaColor = "green";
    updateSnake();
}

/**
 * @function
 * @summary the function to use blue snake color to start a new game.
 */
snaColorB.onclick = function(event) {
    snaColor = "blue";
    updateSnake();
}

/**
 * @function
 * @summary the function to use white snake color to start a new game.
 */
snaColorDefault.onclick = function(event) {
    snaColor = "pruple";
    updateSnake();
}

/**
 * @function
 * @summary the function to use type-in snake color to start a new game.
 */
snakeColorSet.onclick = function(event) {
    if (checkColorHex()) {
        snaColor = document.getElementById("txtSnakeColor").value;
        updateSnake();
    }
}

diffEasy.onclick = function(event) {
    newSpeed = 175;
    mapNum = 0;
    updateSnake();
}

diffMedium.onclick = function(event) {
    newSpeed = 150;
    mapNum = 1;
    updateSnake();
}

diffHard.onclick = function(event) {
    newSpeed = 100;
    mapNum = 2;
    updateSnake();
}