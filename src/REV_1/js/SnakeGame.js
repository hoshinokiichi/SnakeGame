/**
 * Created by tjm on 8/18/2017.
 * email:minggis@foxmial.com
 */
 var SnakeGame = function () {

    /**
     * @constructor
     * @summary Represents a block unit in the gaming zone.
     * @param {Number} row - The x position of the block
     * @param {Number} col - The y position of the block
     */
    function SnakeBlock(row,col){
        this.row=row;
        this.col=col;
    }
    /**
     * @function
     * @summary the function to draw a specific block unit
     * @param {Object} graphic - The object of the gaming graphic interface.
     * @param {Number} color - The color to fill the block.
     * @param {Number} size - The size of the block.
     */
    SnakeBlock.prototype.draw = function(graphic,color,size){
        graphic.fillStyle=color;
        graphic.fillRect(size*this.col,size*this.row,size-2,size-2);
    }
    /**
     * @function
     * @summary the function to clear a specific painted block unit with another color
     * @param {Object} graphic - The object of the gaming graphic interface.
     * @param {color} color - The color to fill the block.
     * @param {Number} size - The size of the block.
     */
    SnakeBlock.prototype.clearDraw = function(graphic,color,size){
        graphic.fillStyle=color;
        graphic.fillRect(size*this.col,size*this.row,size,size);
    }
    /**
     * @function
     * @summary the function to check two block units are at same position
     * @param {Object} snakeBlock - The object of the gaming block units.
     * @returns True if the positions are same, false otherwise
     */
    SnakeBlock.prototype.equal = function(snakeBlock){
        if(snakeBlock.row==this.row && snakeBlock.col==this.col){
            return true;
        }else{
            return false;
        }
    }

    /**
     * @constructor
     * @classdesc the main constructor for a new game
     * @param {obeject} gameScenseId - The id for the current game
     * @param {object} gameConfigObj - The combined variables used for a game
     */
    function SnakeGame(gameScenseId, gameConfigObj) {
        // 私有属性
        var gameScense = document.getElementById(gameScenseId);
        var graphic = gameScense.getContext("2d");
        var count = 0;
        var itemCount = 0;
        var itemvalid = true;
        var snake;
        var curFood;
        var curSpeeder; 
        var runId;
        var isMoved = false;//方向改变后，如果没有移动则方向键暂时失效。
        var gameStatus = false;
        var curDirection = 1;
        var map;
        var mapcontrol = gameConfigObj.mapc || 0;
        var mapcolor = "brown"

        var size = gameConfigObj.size || 20;
        var rowCount = gameConfigObj.rowCount || 30;
        var colCount = gameConfigObj.colCount || 30;
        var snakeColor = gameConfigObj.snakeColor || "purple";
        var foodColor = gameConfigObj.foodColor || "yellow";
        var speederColor = gameConfigObj.speederColor || "green";
        var scenseColor = gameConfigObj.scenseColor || "black";
        var directionKey = gameConfigObj.directionKey || [39, 40, 37, 38];
        // var pauseKey = gameConfigObj.pauseKey || 32;
        var levelCount = gameConfigObj.levelCount || 10;
        // var curSpeed = gameConfigObj.curSpeed || 200;
        //公开事件
        var onCountChange = gameConfigObj.onCountChange || null; //带有一个参数
        var onGamePause = gameConfigObj.onGamePause || null; //带有一个参数
        var onGameOver = gameConfigObj.onGameOver || null;

        //判断
        if(gameScense.width != size*rowCount || gameScense.height != size*colCount){
            throw "场景大小不等于行列大小*蛇块大小";
        }
        //特权方法
        this.startGame = startGame;
        this.changeGameStatus = changeGameStatus;

        //注册 dom 键盘事件

        var preFunc = document.onkeydown;
        document.onkeydown = function (e) {
            var key = (e || event).keyCode;
            handleKeyInput(key);
            if (typeof preFunc == "function") {
                preFunc(e);
            }
        }

        //私有方法

        /*初始化蛇身*/
        /**
         * @function
         * @summary the function to store the initial position of a snake in game
         */
        function hitmap(row, col){
            for (var i = 0; i < map.length; i++) {
                if (map[i].row == row && map[i].col == col) {
                    return true;
                }
            }
            return false;
        }
        function initmap(){
            map=[];
            if(mapcontrol == 1){
                map.push(new SnakeBlock(15,5));
                map.push(new SnakeBlock(15,6));
                map.push(new SnakeBlock(15,7));
                map.push(new SnakeBlock(15,8));
                map.push(new SnakeBlock(15,9));
                map.push(new SnakeBlock(15,10));
                map.push(new SnakeBlock(15,11));
                map.push(new SnakeBlock(15,12));
                map.push(new SnakeBlock(15,13));
                map.push(new SnakeBlock(15,14));
                map.push(new SnakeBlock(15,15));
                map.push(new SnakeBlock(15,16));
                map.push(new SnakeBlock(15,17));
                map.push(new SnakeBlock(15,18));
                map.push(new SnakeBlock(15,19));
                map.push(new SnakeBlock(15,20));
                map.push(new SnakeBlock(15,21));
                map.push(new SnakeBlock(15,22));
                map.push(new SnakeBlock(15,23));
                map.push(new SnakeBlock(15,24));
                map.push(new SnakeBlock(15,25));
                map.push(new SnakeBlock(14,15));
                map.push(new SnakeBlock(13,15));
                map.push(new SnakeBlock(12,15));
                map.push(new SnakeBlock(11,15));
                map.push(new SnakeBlock(10,15));
                map.push(new SnakeBlock(9,15));
                map.push(new SnakeBlock(8,15));
                map.push(new SnakeBlock(7,15));
                map.push(new SnakeBlock(6,15));
                map.push(new SnakeBlock(16,15));
                map.push(new SnakeBlock(17,15));
                map.push(new SnakeBlock(18,15));
                map.push(new SnakeBlock(19,15));
                map.push(new SnakeBlock(20,15));
            }
            else if(mapcontrol == 2){
                map.push(new SnakeBlock(4,4));
                map.push(new SnakeBlock(4,5));
                map.push(new SnakeBlock(4,6));
                map.push(new SnakeBlock(5,4));
                map.push(new SnakeBlock(5,5));
                map.push(new SnakeBlock(5,6));
                map.push(new SnakeBlock(6,4));
                map.push(new SnakeBlock(6,5));
                map.push(new SnakeBlock(6,6));

                map.push(new SnakeBlock(4,14));
                map.push(new SnakeBlock(4,15));
                map.push(new SnakeBlock(4,16));
                map.push(new SnakeBlock(5,14));
                map.push(new SnakeBlock(5,15));
                map.push(new SnakeBlock(5,16));
                map.push(new SnakeBlock(6,14));
                map.push(new SnakeBlock(6,15));
                map.push(new SnakeBlock(6,16));

                map.push(new SnakeBlock(4,24));
                map.push(new SnakeBlock(4,25));
                map.push(new SnakeBlock(4,26));
                map.push(new SnakeBlock(5,24));
                map.push(new SnakeBlock(5,25));
                map.push(new SnakeBlock(5,26));
                map.push(new SnakeBlock(6,24));
                map.push(new SnakeBlock(6,25));
                map.push(new SnakeBlock(6,26));

                map.push(new SnakeBlock(14,4));
                map.push(new SnakeBlock(14,5));
                map.push(new SnakeBlock(14,6));
                map.push(new SnakeBlock(15,4));
                map.push(new SnakeBlock(15,5));
                map.push(new SnakeBlock(15,6));
                map.push(new SnakeBlock(16,4));
                map.push(new SnakeBlock(16,5));
                map.push(new SnakeBlock(16,6));

                map.push(new SnakeBlock(14,14));
                map.push(new SnakeBlock(14,15));
                map.push(new SnakeBlock(14,16));
                map.push(new SnakeBlock(15,14));
                map.push(new SnakeBlock(15,15));
                map.push(new SnakeBlock(15,16));
                map.push(new SnakeBlock(16,14));
                map.push(new SnakeBlock(16,15));
                map.push(new SnakeBlock(16,16));

                map.push(new SnakeBlock(14,24));
                map.push(new SnakeBlock(14,25));
                map.push(new SnakeBlock(14,26));
                map.push(new SnakeBlock(15,24));
                map.push(new SnakeBlock(15,25));
                map.push(new SnakeBlock(15,26));
                map.push(new SnakeBlock(16,24));
                map.push(new SnakeBlock(16,25));
                map.push(new SnakeBlock(16,26));

                map.push(new SnakeBlock(24,4));
                map.push(new SnakeBlock(24,5));
                map.push(new SnakeBlock(24,6));
                map.push(new SnakeBlock(25,4));
                map.push(new SnakeBlock(25,5));
                map.push(new SnakeBlock(25,6));
                map.push(new SnakeBlock(26,4));
                map.push(new SnakeBlock(26,5));
                map.push(new SnakeBlock(26,6));

                map.push(new SnakeBlock(24,14));
                map.push(new SnakeBlock(24,15));
                map.push(new SnakeBlock(24,16));
                map.push(new SnakeBlock(25,14));
                map.push(new SnakeBlock(25,15));
                map.push(new SnakeBlock(25,16));
                map.push(new SnakeBlock(26,14));
                map.push(new SnakeBlock(26,15));
                map.push(new SnakeBlock(26,16));

                map.push(new SnakeBlock(24,24));
                map.push(new SnakeBlock(24,25));
                map.push(new SnakeBlock(24,26));
                map.push(new SnakeBlock(25,24));
                map.push(new SnakeBlock(25,25));
                map.push(new SnakeBlock(25,26));
                map.push(new SnakeBlock(26,24));
                map.push(new SnakeBlock(26,25));
                map.push(new SnakeBlock(26,26));
            }

            for(var i=0;i<map.length;i++){
                map[i].draw(graphic, mapcolor ,size);
            }
        }

        function initSnake(){
            snake=[];
            snake.push(new SnakeBlock(17,1));
            snake.push(new SnakeBlock(17,2));
            snake.push(new SnakeBlock(17,3));
            snake.push(new SnakeBlock(17,4));
            snake.push(new SnakeBlock(17,5));
            for(var i=0;i<snake.length;i++){
                snake[i].draw(graphic,snakeColor,size);
            }
        }

        /*绘制场景背景色*/
        /**
         * @function
         * @summary the function to print the initial background of a snakegame
         */
        function initScense(){
            graphic.fillStyle = scenseColor;
            graphic.fillRect(0,0,colCount * size,rowCount * size);
        }

        /*产生食物*/
        /**
         * @function
         * @summary the function to print a common food of a snakegame in a random position
         */
        function genFood(){
            var generated;
            do{
                var foodCol = Math.floor(Math.random() * colCount);
                var foodRow = Math.floor(Math.random() * rowCount);
                generated=false;
                if(hitmap(foodRow, foodCol)) generated = true;
                for (var i = 0; i < snake.length; i++) {
                    if (snake[i].row == foodRow && snake[i].col == foodCol) {
                        generated = true;
                        break;
                    }
                }
            }while(generated);
            curFood = new SnakeBlock(foodRow, foodCol);
            curFood.draw(graphic,foodColor,size);
        }
        /**
         * @function
         * @summary the function to print a speeder food of a snakegame in a random position
         */
        function genSpeeder() {
            var generated;
            do{
                var speederCol = Math.floor(Math.random() * colCount);
                var speederRow = Math.floor(Math.random() * rowCount);
                generated=false;
                if(hitmap(speederRow, speederCol)) generated = true;
                for (var i = 0; i < snake.length; i++) {
                    if (snake[i].row == speederRow && snake[i].col == speederCol) {
                        generated = true;
                        break;
                    }
                }
            }while(generated);
            curSpeeder = new SnakeBlock(speederRow, speederCol);
            curSpeeder.draw(graphic,speederColor,size);
        }

        /*吃食物*/
        /**
         * @function
         * @summary the function to check if a common food of a snakegame is eaten by the snake
         * @param {obeject} snakeHead a block unit with x, yposition stored inside
         * @returns True if a common food of a snakegame is eaten by the snake, false otherwise
         */
        function eatFood(snakeHead){
            if(snakeHead instanceof SnakeBlock) {
                if (snakeHead.equal(curFood)) {
                    return true;
                } else {
                    return false;
                }
            }else {
                return false;
            }
        }

        /*Eat Speeder */
        /**
         * @function
         * @summary the function to check if a speeder food of a snakegame is eaten by the snake
         * @param {obeject} snakeHead a block unit with x, yposition stored inside
         * @returns True if a speeder food of a snakegame is eaten by the snake, false otherwise
         */
        function eatSpeeder(snakeHead){
            if(snakeHead instanceof SnakeBlock) {
                if (snakeHead.equal(curSpeeder)) {
                    return true;
                } else {
                    return false;
                }
            }else {
                return false;
            }
        }

        /*判断游戏是否结束*/
        /**
         * @function
         * @summary the function to check if a snakegame is ended by checking is the boundary is hit by the snake
         * @returns isGameover, a boolean, true if the game is ended, false otherwise
         */
        function gameOver(){
            var isGameOver = false;
            var snakeHead=snake[snake.length-1];//头部
            if(snakeHead.row<0||snakeHead.row>=rowCount||snakeHead.col<0||snakeHead.col>=colCount||hitmap(snakeHead.row, snakeHead.col)){
                isGameOver=true;
            }
            for(var i=0;i<snake.length-3;i++){//头部需要和尾部的snake.lenth-4个进行判断即可
                if(snakeHead.equal(snake[i])){
                    isGameOver=true;
                }
            }
            return isGameOver;
        }

        /*蛇移动*/
        /**
         * @function
         * @summary the main function to control the game. Take keyboard input to update one position shift, check 
         * if any food or speeder is eaten, and if speed is needed to change.
         */
        function snakeMove(){
            var snakeBlock2=snake[snake.length-1];//头部
            var newBlock;
            switch (curDirection){
                case 1:
                    newBlock=new SnakeBlock(snakeBlock2.row,snakeBlock2.col+1);
                    break;
                case 2:
                    newBlock=new SnakeBlock(snakeBlock2.row+1,snakeBlock2.col);
                    break;
                case 3:
                    newBlock=new SnakeBlock(snakeBlock2.row,snakeBlock2.col-1);
                    break;
                case 4:
                    newBlock=new SnakeBlock(snakeBlock2.row-1,snakeBlock2.col);
                    break;
            }
            snake.push(newBlock);
            newBlock.draw(graphic,snakeColor,size);
            if(itemCount >= 50 && !itemvalid){
                genSpeeder();
                itemvalid = true;
            } else{
                itemCount = itemCount + Math.floor(Math.random() * 3);
            }

            if(gameOver()){//游戏是否结束
                gameStatus = false;
            }else {
                if (eatFood(newBlock)) {//是否吃到了食物
                    genFood();
                    count++;
                    changeSpeed();
                    triggerEvent(onCountChange, count);
                } else if (eatSpeeder(newBlock) && itemvalid){
                    itemCount = 0;
                    itemvalid = false;
                    count = count + 10;
                    changeSpeed();
                    triggerEvent(onCountChange, count);
                } else {
                    snake.shift().clearDraw(graphic,scenseColor, size);
                }
                isMoved = 1;//可以更改方向了
            }
        }
        /**
         * @function
         * @summary the function to control the game refresh speed based on current score. 
         */
        function changeSpeed(){
            if(!(count % levelCount)){
                if(curSpeed>150){
                    curSpeed-=50
                }else if(curSpeed<=150&&curSpeed>=100){
                    curSpeed-=15;
                }else{
                    curSpeed-=5;
                }
            }
        }

        /**
         * @function
         * @summary the function to examine if the direction key or pausekey(space bar) is pressed. Change moving direction 
         * based on that.
         * @param {object} key A direction key or a pausekey(space bar)
         */
        function handleKeyInput(key){
            var inputDirection=curDirection;
            switch (key) {
                case directionKey[0]:
                    inputDirection = 1
                    break;
                case directionKey[1]:
                    inputDirection = 2;
                    break;
                case directionKey[2]:
                    inputDirection = 3;
                    break;
                case directionKey[3]:
                    inputDirection = 4;
                    break;
                // case pauseKey:
                //     changeGameStatus();
                //     break;
            }
            if(isMoved || (typeof runId!="number")) {//只有上一次方向移动或者暂停，才能更改方向
                if (inputDirection + 2 == curDirection || inputDirection - 2 == curDirection || inputDirection == curDirection) {
                    //不需要变动方向
                } else {
                    curDirection = inputDirection;
                }
                isMoved=0;
            }
        }

        /**
         * @function
         * @summary the function to initial the game, including basic variable setting and initial background, 
         * snake, food printing.
         */
        function initGame(){
            if(typeof runId == "number"){
                clearTimeout(runId);
            }
            curDirection = 1;
            count = 0;
            curSpeed = gameConfigObj.curSpeed || 175;
            itemvalid = true;
            triggerEvent(onCountChange,count);
            initScense();
            initSnake();
            initmap();
            genFood();
            /*Should do */
            genSpeeder();
        }

        /**
         * @function
         * @summary the function to template the end game, pause game events.
         */
        function triggerEvent(callback,argument){
            if(typeof callback =="function"){
                callback(argument);
            }
        }

        /**
         * @function
         * @summary the function to continue the game or end the game.
         */
        function runGame(){
            if(gameStatus){
                snakeMove();
                runId = setTimeout(arguments.callee,curSpeed);
            }else {
                triggerEvent(onGameOver, count);
                return;
            }
        }

        /**
         * @function
         * @summary the function to pause the game based on the trigger runId.
         */
        function pauseGame() {
            if (typeof runId == "number") {//暂停
                clearTimeout(runId);
                runId = "";
                triggerEvent(onGamePause, 1);//暂停为1
            } else {
                runGame();
                triggerEvent(onGamePause, 0);//开始为0；
            }
        }

        /**
         * @function
         * @summary the function to change the game status pause or continue, based on the trigger runId.
         */
        function changeGameStatus(){
            if(gameStatus) {
                if(typeof runId == "number") {//暂停
                    clearTimeout(runId);
                    runId = "";
                    triggerEvent(onGamePause, 1);//暂停为1
                }else{
                    runGame();
                    triggerEvent(onGamePause, 0);//开始为0；
                }
            }
        }

        /**
         * @function
         * @summary the function to do the initial part of the game, and set gameStatus
         */
        function startGame(){
            initGame();
            gameStatus = true;
            runGame();
            triggerEvent(onGamePause,0);//游戏开始了
        }
    }
    
    return SnakeGame;
}();

