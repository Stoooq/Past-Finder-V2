import board from "./Board.js"
import { checkEnemyCollision } from "../utils/checkCollision.js"
import Sprite from "./Sprite.js"

class Enemy extends Sprite {
    constructor ({ position, velocity, enemies, bullets, imageSrc, scale = 1, columns = 1, rows = 1, row = 0, maxFrames = 1, offset = {x: 0, y: 0} }) {
        super({
            position,
            imageSrc,
            scale,
            columns,
            rows,
            row,
            maxFrames,
            offset
        })
        this.velocity = velocity
        this.enemies = enemies
        this.bullets = bullets
        this.width = 50
        this.height = 50
    }

    update = (mode) => {
        this.draw()
        this.animateFrames()
        this.move(mode)
        checkEnemyCollision(this, this.enemies, this.bullets)
    }

    move = (mode) => {
        this.position.y += this.velocity.y
        if (!board.isSlower) {
            this.velocity.y = mode.map.normal
        }
        if (board.isSlower) {
            this.velocity.y = mode.map.slow
        }
    }
}

export default Enemy