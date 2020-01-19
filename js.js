var myGamePiece;
var myBackground;


function startGame() {
    myGamePiece = new component(window.innerWidth / 10, window.innerWidth / 10, "bubble.png", getRndInteger(50, window.innerWidth - 50), -125, "image");
    myGameArea.start();
    speed = getRndInteger(1.5, 3);
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    stop: function() {
        clearInterval(this.interval);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

var x_com;
var y_com;
var speed;

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 1;
    console.log(this)
    x_com = x;
    y_com = y;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        console.log(this.y);
        this.y += this.speedY;
        this.x += this.speedX
        y_com = this.y;

        if (this.y > window.innerHeight) {
            startGame();
        }

    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRelativeCoords(event) {
    console.log(event.offsetX, event.offsetY);
    console.log(x_com, y_com);
    speed = getRndInteger(1.5, 3);
    if ((Math.abs(event.offsetX - x_com) < window.innerWidth / 10) && (Math.abs(event.offsetY - y_com) < window.innerWidth / 10)) {
        console.log("EQUAL");
        myGamePiece = new component(window.innerWidth / 10, window.innerWidth / 10, "bubble.png", getRndInteger(50, window.innerWidth - 50), -125, "image");
    }

}