let mouse_x = 0;
let mouse_y = 0;
let mouse_down = false;
let gravity = 2000
let throw_force = 15;
let current_icecube = undefined;

class SimonCrackGame extends Game {
    constructor() {
        super();
        this.ice_cubes_hit = 0;
    }
}

window.Game = new Game()

class IceCube {
    constructor(x, y, gravity, throw_force) {
        console.log("Constructor running")

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
        this.object.src = 'ice_cube_3.png'
        this.object.style.width = "100px";
        this.object.classList.add('iceCube')
        this.object.style.transform = `translate(${this.x}px, ${this.y}px)`

        this.update_index = window.Game.registerUpdate(this.update.bind(this), 1)
        console.log(this.update_index)

        console.log("Adding object")
        document.body.appendChild(this.object)
    }

    update() {
        if (this.x > 800 && this.y < 455) {
            this.object.style.zIndex = "0";
        } else {
            this.object.style.zIndex = "101";
        }

        if (this.x > 900 && this.x < 1200 && this.y > 440 && this.y < 455) {
            this.object.remove();
            window.Game.ice_cubes_hit += 1;
            window.Game.removeUpdate(this.update_index);
            spawnIceCube();
            return
        }

        if (this.x > 2000 || this.y > 1500) {
            this.object.remove();
            window.Game.removeUpdate(this.update_index);
            spawnIceCube();
            return
        }

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
        if (this.thrown) {
            this.object.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.x / 2}deg)`
        } else {
            this.object.style.transform = `translate(${this.x}px, ${this.y}px) rotate(0deg)`
        }
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

class Simon {
    constructor(x, y) {

        this.x = x
        this.y = y
        this.vx = 0
        this.vy = 0

        this.time = 0

        this.object_bg = document.createElement('img')
        this.object_bg.src = 'man.png'
        this.object_bg.style.width = "600px";
        this.object_bg.style.zIndex = "-100";
        this.object_bg.style.position = "absolute";

        this.object_fg = document.createElement('img')
        this.object_fg.src = 'pants.png'
        this.object_fg.style.width = "600px";
        this.object_fg.style.zIndex = "100";
        this.object_fg.style.position = "absolute";

        window.Game.registerUpdate(this.update.bind(this), 0)

        document.body.appendChild(this.object_bg)
        document.body.appendChild(this.object_fg)
    }

    update() {
        this.time += window.Game.delta;

        this.object_bg.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${Math.sin(this.time * 5) / 2}deg)`
        this.object_fg.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${Math.sin(this.time * 5) / 2}deg)`
    }
}

function spawnIceCube() {
    new IceCube(200, 300, gravity, throw_force);
}

new Simon(800, 0);

document.addEventListener("mousemove", (e) => { 
    mouse_x = e.clientX;
    mouse_y = e.clientY;
});

document.addEventListener("mousedown", () => { 
    mouse_down = true;
});

document.addEventListener("mouseup", () => { 
    mouse_down = false;
});

spawnIceCube()