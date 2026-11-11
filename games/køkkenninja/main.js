class Game {
    constructor() {
        this.updateCallbacks = []
        this.lastUpdate = 0
        this.delta = 0
        document.addEventListener('DOMContentLoaded', () => {
            requestAnimationFrame(this.update.bind(this))
        })
    }
    registerUpdate(callback, priority) {
        this.updateCallbacks.push([callback, priority])
        this.updateCallbacks.sort((x, y) => {
            if (x[1] < y[1])
                return -1
            if (x[1] > y[1])
                return 1
            return 0
        })
        console.log(this.updateCallbacks)
    }
    update() {
        if (this.lastUpdate)
            this.delta = (Date.now() - this.lastUpdate) / 1000
        this.updateCallbacks.forEach(callback => callback[0]());
        requestAnimationFrame(this.update.bind(this))
        this.lastUpdate = Date.now()
    }
}

window.Game = new Game()