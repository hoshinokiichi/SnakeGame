/**
 * @function
 * @summary the function to show the stored history using an alert popout
 */
function displayHistory() {
    alert(gameHistory.join("\n"));
}

/**
 * @function
 * @summary the function to store the user's score in a history array
 * @param {Number} count - The user's score
 */
function pushHistory(count) {
    var playerName = document.getElementById("txtUserName").value;
    var playerScore = count;

    const toWrite = playerName + "                                         " + playerScore;
    gameHistory.push(toWrite);
}