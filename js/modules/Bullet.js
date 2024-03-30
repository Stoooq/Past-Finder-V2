import board from "./Board.js"
import { checkBulletCollision } from "../utils/checkCollision.js"

class Bullet {
    constructor ({ position, velocity, bullets }) {
        this.position = position
        this.velocity = velocity
        this.bullets = bullets
        this.width = 5
        this.height = 15
        this.speed = {
            normal: 8,
            fast: 6
        }
    }

    update = () => {
        this.draw()
        this.move()
        checkBulletCollision(this, this.bullets)
    }

    draw = () => {
        board.c.fillStyle = 'blue'
        board.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    move = () => {
        this.position.y += this.velocity.y
        if (!board.isFaster) {
            this.velocity.y = -this.speed.normal
        }
        if (board.isFaster) {
            this.velocity.y = -this.speed.fast
        }
    }
}

export default Bullet