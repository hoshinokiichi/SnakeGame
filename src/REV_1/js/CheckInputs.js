/**
 * @function
 * @summary the function to examine if the input length for the Hex number is correct.
 * @returns True if the length is correct, false if it is not.
 */
function checkColorHex() {
    color_HEX = document.getElementById("txtSnakeColor");
    if(color_HEX.value.length!=7){
        alert("The color type is wrong!!!");
        return false;
    }else {
        return true;
    }
}

/**
 * @function
 * @summary the function to examine if the user name length for the username input is not empty.
 * @returns True if the length is correct, false if it is not.
 */
function checkUserName(){
    var txtUserName = document.getElementById("txtUserName");
    if(txtUserName.value.length==0){
        alert("The username is empty!!!");
        return false;
    }else {
        return true;
    }
}