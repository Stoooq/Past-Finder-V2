import board from "./Board.js"
import { checkBuffCollision } from "../utils/checkCollision.js"

class Buff {
    constructor ({ position, velocity, buffs, bullets}) {
        this.position = position
        this.velocity = velocity
        this.buffs = buffs
        this.bullets = bullets
        this.width = 50
        this.height = 50
        this.speed = {
            normal: 1.25,
            slow: 0.5
        }
    }

    update = () => {
        this.draw()
        this.move()
        checkBuffCollision(this, this.buffs, this.bullets)
    }

    draw = () => {
        board.c.fillStyle = 'gold'
        board.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    move = () => {
        this.position.y += this.velocity.y
        if (!board.isSlower) {
            this.velocity.y = this.speed.normal
        }
        if (board.isSlower) {
            this.velocity.y = this.speed.slow
        }
    }
}

export default Buff