import Player from "./modules/Player.js"
import board from "./modules/Board.js"

const bullets = []

let clock = 0

const player = new Player({
    position: {
        x: 500,
        y: 425
    },
    velocity: {
        x: 0,
        y: 0
    },
    bullets
})

const update = () => {
    requestAnimationFrame(update)
    
    
    board.update()
    player.update(clock)
    bullets.forEach(bullet => {
        bullet.update()
    })
    clock += 1
}

update()
