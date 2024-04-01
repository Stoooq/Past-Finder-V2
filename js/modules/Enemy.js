import board from "./Board.js"
import { checkEnemyCollision } from "../utils/checkCollision.js"

class Enemy {
    constructor ({ position, velocity, enemies, bullets}) {
        this.position = position
        this.velocity = velocity
        this.enemies = enemies
        this.bullets = bullets
        this.width = 50
        this.height = 50
    }

    update = (mode) => {
        this.draw()
        this.move(mode)
        checkEnemyCollision(this, this.enemies, this.bullets)
    }

    draw = () => {
        board.c.fillStyle = 'green'
        board.c.fillRect(this.position.x, this.position.y, this.width, this.height)
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