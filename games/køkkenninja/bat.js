const bat = document.querySelector('#bat')
let x = 0
let y = 0
const damping = .05
const offset = [-130, -150]

window.Game.registerUpdate(() => {
    x += (window.Game.mouse['x'] - x) * damping
    y += (window.Game.mouse['y'] - y) * damping
    bat.style = `transform: translate(${x + offset[0]}px, ${y + offset[1]}px);`
    console.log('dsa')
})