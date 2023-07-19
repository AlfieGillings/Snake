
import Board from "./Board.js";

var board;
var lastDirection;
var direction;
var snakeCoordinates;
var score;
var speed = 120;

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

if (window.mobileCheck() == true) {
    document.getElementById("centreControl").hidden = false;
    document.getElementById("upButton").hidden = false;
    document.getElementById("leftButton").hidden = false;
    document.getElementById("downButton").hidden = false;
    document.getElementById("rightButton").hidden = false;
    speed = 175;
}

function newGame() {

    board = new Board();

    direction = [-1, 0];
    lastDirection = [-1, 0];
    snakeCoordinates = [[10, 10]];
    score = 0;

    document.getElementById("gameoverLabel").hidden = true;
    document.getElementById("playButton").hidden = true;
    document.getElementById("finalscoreLabel").hidden = true;

    board.addSquare("snake", 10, 10);
    addFood();

    updateBoard();

}

function addFood() {

    var x = Math.floor(Math.random() * 21);
    var y = Math.floor(Math.random() * 21);

    while (board.getSquare(x, y).getType() == "snake") {
        x = Math.floor(Math.random() * 21);
        y = Math.floor(Math.random() * 21);
    }

    board.addSquare("food", x, y);

}

function advance() {

    if (snakeCoordinates[0][0] + direction[0] < 21 && snakeCoordinates[0][0] + direction[0] >= 0 && snakeCoordinates[0][1] + direction[1] < 21 && snakeCoordinates[0][1] + direction[1] >= 0) {

        var grow = false;

        if (board.getSquare(snakeCoordinates[0][0] + direction[0], snakeCoordinates[0][1] + direction[1]).getType() == "food") {
            grow = true;
        }
        else if (board.getSquare(snakeCoordinates[0][0] + direction[0], snakeCoordinates[0][1] + direction[1]).getType() == "snake") {
            gameOver();
        }

        var moves = snakeCoordinates.slice(0);

        board.moveSquare(snakeCoordinates[0][0], snakeCoordinates[0][1], snakeCoordinates[0][0] + direction[0], snakeCoordinates[0][1] + direction[1]);
        snakeCoordinates[0] = [snakeCoordinates[0][0] + direction[0], snakeCoordinates[0][1] + direction[1]];

        for(let i = 1; i < snakeCoordinates.length; i++) {
            board.moveSquare(moves[i][0], moves[i][1], moves[i - 1][0], moves[i - 1][1]);
            snakeCoordinates[i] = moves[i - 1];
        }

        if (grow == true) {
            board.addSquare("snake", moves[snakeCoordinates.length - 1][0], moves[snakeCoordinates.length - 1][1]);
            snakeCoordinates.push([moves[snakeCoordinates.length - 1][0], moves[snakeCoordinates.length - 1][1]]);
            score = score + 1;
            addFood();
        }

    }
    else {
        gameOver();
    }

}

function updateBoard() {

    for (let i = 0; i < 21; i++) {
        for (let n = 0; n < 21; n++) {
            if (board.getSquare(i, n).getType() == "empty") {
                document.getElementById("square" + i + "_" + n).className = "square";
            }
            else if (board.getSquare(i, n).getType() == "snake") {
                document.getElementById("square" + i + "_" + n).className = "snake square";
            }
            else if (board.getSquare(i, n).getType() == "food") {
                document.getElementById("square" + i + "_" + n).className = "food square";
            }
        }
    }

}

function changeDirection(key) {
    if (key == "w" && lastDirection[0] != 1) {
        direction = [-1, 0];
    }
    else if (key == "a" && lastDirection[1] != 1) {
        direction = [0, -1];
    }
    else if (key == "s" && lastDirection[0] != -1) {
        direction = [1, 0];
    }
    else if (key == "d" && lastDirection[1] != -1) {
        direction = [0, 1];
    }
}

document.addEventListener('keydown', function(event) {
    changeDirection(event.key);
});
document.getElementById("upButton").addEventListener('click', function() {
    changeDirection("w");
});
document.getElementById("leftButton").addEventListener('click', function() {
    changeDirection("a");
});
document.getElementById("downButton").addEventListener('click', function() {
    changeDirection("s");
});
document.getElementById("rightButton").addEventListener('click', function() {
    changeDirection("d");
});

function gameOver() {

    board = new Board();

    document.getElementById("gameoverLabel").hidden = false;
    document.getElementById("playButton").hidden = false;
    document.getElementById("finalscoreLabel").hidden = false;
    document.getElementById("playButton").textContent = "PLAY AGAIN";
    document.getElementById("finalscoreLabel").textContent = "Final Score: " + score;

}

document.getElementById("playButton").addEventListener('click', function() {

    if (document.getElementById("playButton").textContent == "PLAY") {
        setInterval(function() {

            lastDirection = direction.slice(0);
        
            advance();
            updateBoard();
        
        }, speed);
        newGame();
    }
    else {
        newGame();
    }

});
