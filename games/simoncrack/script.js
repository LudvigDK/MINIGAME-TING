class SimonCrackGame extends Game {
    constructor(gravity, ice_cube_force) {
        super();
        this.ice_cubes_hit = 0;
        this.gravity = gravity;
        this.ice_cube_force = ice_cube_force;
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