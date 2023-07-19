
export default class Square {

    constructor(type, x, y) {
         this.type = type;
         this.coordinates = [x, y];
    }

    setType(type) {
        this.type = type;
    }

    getType() {
        return this.type;
    }

    setCoordinates(x, y) {
        this.coordinates = [x, y];
    }

    getCoordinates() {
        return this.coordinates;
    }
}
