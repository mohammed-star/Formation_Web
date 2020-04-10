window.onload = function() {
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blocksize = 30;
    var ctx;
    var delay = 100;
    var snakee;
    var applee;
    var widthinblocks = canvasWidth/blocksize;
    var heightinblocks = canvasHeight/blocksize;
    var score;
    init();

    function init() {
        /*on peut effacer 'var' psq on a dja declare 'canvas' comme publice*/
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "30px solid gray";
        canvas.style.margin = "50px auto";
        canvas.style.display= "block";
        canvas.style.backgroundColor ="#ddd";
        /*pour attacher "canvas" avec notre body*/
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new snake([[6, 4], [5, 4], [4, 4],[3,4],[2,4]], "down");
        applee = new Apple([10,10]);
        score=0;
        RefreshCanvas();
    }


    function RefreshCanvas() {
        /*effecer tout*/
        snakee.advance();
        if (snakee.checkCollision()){
            /*game over*/
            Gameover();
        }else {
            if (snakee.isEatingApple(applee)){
                /*le serpant a mange la pomme*/
                score++;
                snakee.ateApple =true;
                do {
                    applee.setNewPosition();

                }while (applee.isOnSnake(snakee))
            }
            /*pourquoi quand j ai utilise "else" il n a marche pas ???*/
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                DrawScore();
                snakee.draw();
                applee.draw();
                timeout=setTimeout(RefreshCanvas, delay);


        }
    }
    function Gameover() {
        /*pourquoi quand je tape pcq espace la vitesse du serpant Obtenir plus*/
        ctx.save();
        ctx.font = "bold 70px sans-serif";
        //ctx.fillStyle = "#000";
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        ctx.strokeStyle="white";
        ctx.lineWidth = 5;
        var centerX= canvasWidth/2;
        var centerY= canvasHeight/2;
        ctx.strokeText("Game Over",centerX,centerY - 180);
        ctx.fillText("Game Over",centerX,centerY - 180);
        ctx.font = "bold 30px sans-serif";
        ctx.strokeText("appuye sur espace pour rejouer",centerX,centerY - 120);
        ctx.fillText("appuye sur espace pour rejouer",centerX,centerY-120);
        ctx.restore();
    }
    function Restart() {
        snakee = new snake([[6, 4], [5, 4], [4, 4],[3,4],[2,4]], "down");
        applee = new Apple([10,10]);
        score=0;
        clearTimeout(timeout);
        RefreshCanvas();
    }
    function DrawScore() {
        ctx.save();
        /*'toString' psq la fonction "filltext" affiche que String*/
        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle="gray";
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        var centerX= canvasWidth/2;
        var centerY= canvasHeight/2;
        ctx.fillText(score.toString(),centerX,  centerY);
        ctx.restore();
    }
    function Drawblock(ctx, position) {
        var x = position[0] * blocksize;
        var y = position[1] * blocksize;
        ctx.fillRect(x, y, blocksize, blocksize);
    }


    function snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.ateApple = false;
        /*cette fonction constructeur va dessiner notre serpant*/
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            /*notre serpanr il va etre un ensemble de petits blocks*/
            for (var i = 0; i < this.body.length; i++) {
                /*cette fonction constructeur va dessiner notre serpant*/
                Drawblock(ctx, this.body[i]);
            }
            ctx.restore();
        };
        this.advance = function () {
            var nextposition = this.body[0].slice();
            /* c le cas de avancer juste right:   nextposition[0] += 1;*/
            switch (this.direction) {
                case "left":
                    nextposition[0] -= 1;
                    break;
                case "right":
                    nextposition[0] += 1;
                    break;
                case "down":
                    nextposition[1] += 1;
                    break;
                case "up":
                    nextposition[1] -= 1;
                    break;
                default:
                    throw("invalide Direction");
            }
            this.body.unshift(nextposition);
            if(!this.ateApple){
                this.body.pop();
            }else {
                this.ateApple=false;
            }
        };

        this.setDirection = function(newDirection) {
            var allowedDirections;
            switch (this.direction) {
                case "left":
                case "right":
                    allowedDirections = ["up", "down"];
                    break;
                case "down":
                case "up":
                    allowedDirections = ["left", "right"];
                    break;
                default:
                    throw("invalide Direction");
            }
            if (allowedDirections.indexOf(newDirection) > -1 ) {
                this.direction = newDirection;
            }
        };
        this.checkCollision = function () {
            var wallCollision = false;
            var snakeCollision = false;
            var head = this.body[0];
            var rest = this.body.slice(1);
            var snakeX = head[0];
            var snakeY = head[1];
            var minX = 0;
            var minY = 0;
            var maxX = widthinblocks-1;
            var maxY = heightinblocks-1;
            var isnotbetweenhorizontalwalls = snakeX<minX || snakeX>maxX;
            var isnotbetweenverticalwalls = snakeY<minY || snakeY>maxY;
            if (isnotbetweenhorizontalwalls || isnotbetweenverticalwalls ){
                wallCollision = true;
            }
            for (var i=0; i < rest.length; i++){
                if (snakeX === rest[i][0] && snakeY === rest[i][1] ){
                    snakeCollision = true;
                }
            }
            return snakeCollision || wallCollision;
        };
        this.isEatingApple= function(appletoeat){
            var head = this.body[0];
            if (head[0] === appletoeat.position[0] && head[1] === appletoeat.position[1])
            {return true;}
            else
            {return false;}
        };
    }
    /*Ajouter la pomme */
    function Apple(position)
    {
        this.position=position;
        this.draw = function()
        {
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            var radius = blocksize/2;
            var x = this.position[0]*blocksize + radius;
            var y = this.position[1]*blocksize + radius;
            ctx.arc(x,y,radius,0,Math.PI*2,true);
            ctx.fill();
            ctx.restore();
        }
        this.setNewPosition= function(){
            /*math.round pour retourner un entier*/
            var newX = Math.round(Math.random( )* (widthinblocks-1));
            var newY = Math.round(Math.random() * (heightinblocks-1));
            this.position = [newX, newY];
        }
        this.isOnSnake = function (snaketocheck) {
            var isOnSnake = false;
            for (var i=0 ; i<snaketocheck.body.length; i++){
                if (snaketocheck.body[i][0]===this.position[0] && snaketocheck.body[i][1]===this.position[1]){
                    isOnSnake=true;
                }
            }
            return isOnSnake;
        }
    }
    document.onkeydown = function handlekeydown(e) {
        var key = e.keyCode;
        var newDirection;
        switch (key) {
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
            case 32:
                Restart();
                return;
                break;
            default:
                throw("invalide Direction");
        }

        snakee.setDirection(newDirection);
    }
}

