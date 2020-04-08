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
    init();

    function init() {
        /*on peut effacer 'var' psq on a dja declare 'canvas' comme publice*/
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        /*pour attacher "canvas" avec notre body*/
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new snake([[6, 4], [5, 4], [4, 4]], "down");
        applee = new Apple([10,10]);
        RefreshCanvas();
    }


    function RefreshCanvas() {
        /*effecer tout*/
        snakee.advance();
        if (snakee.checkCollision()){
            /*game over*/
        }else {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            snakee.draw();
            applee.draw();
            setTimeout(RefreshCanvas, delay);
        }
    }

    function Drawblock(ctx, position) {
        var x = position[0] * blocksize;
        var y = position[1] * blocksize;
        ctx.fillRect(x, y, blocksize, blocksize);
    }


    function snake(body, direction) {
        this.body = body;
        this.direction = direction;
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
            this.body.pop();
        };

        this.setDirection = function (newDirection) {
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
            var x = position[0]*blocksize + radius;
            var y = position[1]*blocksize + radius;
            ctx.arc(x,y,radius,0,Math.PI*2,true);
            ctx.fill();
            ctx.restore();
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
            default:
                throw("invalide Direction");
        }

        snakee.setDirection(newDirection);
    }
}

