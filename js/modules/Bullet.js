import board from "./Board.js"
import { checkBulletCollision } from "../utils/checkCollision.js"

class Bullet {
    constructor ({ position, velocity, bullets }) {
        this.position = position
        this.velocity = velocity
        this.bullets = bullets
        this.width = 5
        this.height = 15
    }

    update = (mode) => {
        this.draw()
        this.move(mode)
        checkBulletCollision(this, this.bullets)
    }

    draw = () => {
        board.c.fillStyle = 'blue'
        board.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    move = (mode) => {
        this.position.y += this.velocity.y
        if (!board.isSlower) {
            this.velocity.y = -mode.bullet.normal
        }
        if (board.isSlower) {
            this.velocity.y = -mode.bullet.slow
        }
    }
}

export default Bullet