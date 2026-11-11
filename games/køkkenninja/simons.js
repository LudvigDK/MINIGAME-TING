class Simon {
    static gravity = 9.82
    static drag = 4

    constructor(size, startX, velocityX, velocityY, worth) {
        this.object = document.createElement('img')
        this.object.src = 'simon op.png'
        this.object.classList.add('simon')

        this.vx = velocityX
        this.vy = velocityY
        this.x = startX
        this.y = 0
        this.s = size

        this.object.dataset.worth = worth

        window.Game.registerUpdate(this.update.bind(this), 1)

        document.body.appendChild(this.object)
    }
    update() {
        this.x += this.vx
        this.y += this.vy
        this.vy -= Simon.drag * window.Game.delta
        this.vy -= Simon.gravity * window.Game.delta
        this.object.style = `transform: translate(${this.x}px, ${-this.y}px);`
        if (Math.abs(this.vy) < 2)
            this.object.src = 'simon ligeud.png'
        else if (this.vy > 0)
            this.object.src = 'simon op.png'
        else
            this.object.src = 'simon ned.png'
    }
}


setInterval(() => {
    new Simon(10, Math.random() * 100 - 50, Math.random() * 4 - 2, Math.random() * 4 + 8, 3)
}, 250);