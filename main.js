class Game {
    constructor() {
        this.updateCallbacks = []
        this.lastUpdate = 0
        this.delta = 0
        this.mouse = {
            'x':0,
            'y':0,
            'press':false
        }
        document.addEventListener('DOMContentLoaded', () => {
            document.addEventListener('mousemove', (e) => {
                this.mouse['x'] = e.clientX
                this.mouse['y'] = e.clientY
            })
            document.addEventListener('mousedown', (e) => { this.mouse['press'] = true })
            document.addEventListener('mouseup', (e) => { this.mouse['press'] = false })
            requestAnimationFrame(this.update.bind(this))
        })
    }
    registerUpdate(callback, priority) {
        this.updateCallbacks.push([callback, priority])
        this.updateCallbacks = this.updateCallbacks.sort((x, y) => {
            if (x[1] < y[1])
                return -1
            if (x[1] > y[1])
                return 1
            return 0
        })
        // console.log(this.updateCallbacks)
    }
    update() {
        if (this.lastUpdate)
            this.delta = (Date.now() - this.lastUpdate) / 1000
        this.updateCallbacks.forEach(callback => callback[0]());
        requestAnimationFrame(this.update.bind(this))
        this.lastUpdate = Date.now()
    }
}

function shiftPage(toPageId) {
    const allPagesWithShowClass = document.querySelectorAll('.page.show');
    allPagesWithShowClass.forEach(page => page.classList.remove('show'));

    const toPage = document.getElementById(toPageId);
    toPage.classList.add('show');
}

function gameClose() {
    window.close();
}