class SimonCrackGame extends Game {
    constructor() {
        super();
        this.ice_cubes_hit = 0;
    }
}

window.Game = new Game()

class IceCube {
    constructor(x, y) {

        this.thrown = false

        this.x = x
        this.y = y
        this.xv = 0
        this.yv = 0
    }

    update() {

    }
}