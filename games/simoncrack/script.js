let mouse_x = 0;
let mouse_y = 0;
let mouse_down = false;
let gravity = 2000
let throw_force = 20;

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
    constructor(x, y, gravity, throw_force) {

        this.thrown = false
        this.dragging = false

        this.start_x = x
        this.start_y = y

        this.mouse_start_x = -1
        this.mouse_start_y = -1

        this.gravity = gravity
        this.throw_force = throw_force;

        this.x = x
        this.y = y
        this.vx = 0
        this.vy = 0

        this.object = document.createElement('img')
        this.object.src = 'ice_cube.png'
        this.object.classList.add('iceCube')

        window.Game.registerUpdate(this.update.bind(this), 1)

        document.body.appendChild(this.object)
    }

    update() {
        if (
            mouse_down && !this.dragging &&
            Distance(this.x + (100 / 2), this.y + (100 / 2), mouse_x, mouse_y) < (100 / 2) // Added half of the image dimensions to make sure we check distrance from center
        ) {
            console.log("Started dragging")
            this.mouse_start_x = mouse_x
            this.mouse_start_y = mouse_y
            this.dragging = true
        }

        if (this.dragging) {
            this.drag()
        }

        if (this.thrown) {
            this.x += this.vx * window.Game.delta
            this.y += this.vy * window.Game.delta
            this.vy += this.gravity * window.Game.delta
        }
        this.object.style = `transform: translate(${this.x}px, ${this.y}px);`
    }

    drag() {
        let distance = Distance(this.mouse_start_x, this.mouse_start_y, mouse_x, mouse_y)

        if (distance == 0) {
            this.x = this.start_x
            this.y = this.start_y
            return
        }

        this.x = this.start_x + (mouse_x - this.mouse_start_x) / distance**0.2
        this.y = this.start_y + (mouse_y - this.mouse_start_y) / distance**0.2

        if (!mouse_down) {
            this.vx = -this.throw_force * ((mouse_x - this.mouse_start_x) / distance**0.2)
            this.vy = -this.throw_force * ((mouse_y - this.mouse_start_y) / distance**0.2)

            this.dragging = false;
            this.thrown = true;
        }
    }
}

new IceCube(500, 600, gravity, throw_force);
new IceCube(1000, 600, gravity, throw_force);
new IceCube(1500, 600, gravity, throw_force);

document.addEventListener("mousemove", (e) => { 
    mouse_x = e.clientX;
    mouse_y = e.clientY;

    console.log(mouse_x, mouse_y)
});

document.addEventListener("mousedown", () => { 
    mouse_down = true;
    console.log("Down");
});

document.addEventListener("mouseup", () => { 
    mouse_down = false;
    console.log("Up");
});