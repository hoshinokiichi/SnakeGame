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
    snaColor = "white";
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