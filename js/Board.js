
import Square from "./Square.js";

export default class Board {

    constructor() {
        this.squares = new Array(21);

        for (let i = 0; i < 21; i++) {
            this.squares[i] = new Array(21);
            for (let n = 0; n < 21; n++) {
                this.squares[i][n] = new Square("empty", i, n);
            }
        }
    }

    addSquare(type, x, y) {
        this.squares[x][y].setType(type);
    }

    moveSquare(x1, y1, x2, y2) {
        this.squares[x1][y1].setCoordinates(x2, y2);
        this.squares[x2][y2].setCoordinates(x1, y1);

        var temp = this.squares[x1][y1];
        this.squares[x1][y1] = this.squares[x2][y2];
        this.squares[x2][y2] = temp;
    }

    getSquare(x, y) {
        return this.squares[x][y];
    }

}
