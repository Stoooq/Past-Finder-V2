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
        this.speed = {
            normal: 0.75,
            fast: 2.5
        }
    }

    update = () => {
        this.draw()
        this.move()
        checkEnemyCollision(this, this.enemies, this.bullets)
    }

    draw = () => {
        board.c.fillStyle = 'green'
        board.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    move = () => {
        this.position.y += this.velocity.y
        if (!board.isFaster) {
            this.velocity.y = this.speed.normal
        }
        if (board.isFaster) {
            this.velocity.y = this.speed.fast
        }
    }
}

export default Enemy