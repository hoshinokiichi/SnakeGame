/**
 * @function
 * @summary the function to play the background music of the game, and trigger the pause and continue of the music.
 */
function controlBGM() {
    var music = document.getElementById("bgm");
    var currentButton = document.getElementById("currentMusicButton");
    if (music.paused) {
        music.play();
        currentButton.src = "./Resources/Music/pause.svg";
    } else {
        music.pause();
        currentButton.src = "./Resources/Music/play.svg";
    }
}

var sound=document.getElementById("sound");
var span=document.getElementsByTagName('span')[0];
var music=document.getElementById("bgm");

/**
 * @function 
 * @summary the function stored in an object to store the basic music volume changable unit and whole span.
 */
sound.onchange=function() {
    music.volume=this.value/10;
    span.innerHTML=this.value;
}


