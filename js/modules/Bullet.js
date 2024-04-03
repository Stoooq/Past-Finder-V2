import board from "./Board.js"
import { checkBulletCollision } from "../utils/checkCollision.js"
import Sprite from "./Sprite.js"

class Bullet extends Sprite {
    constructor ({ position, velocity, width, height, type, bullets, imageSrc, scale = 1, columns = 1, rows = 1, row = 0, maxFrames = 1, offset = {x: 0, y: 0} }) {
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
        this.width = width
        this.height = height
        this.type = type
        this.bullets = bullets
    }

    update = (mode) => {
        this.draw()
        this.animateFrames()
        this.move(mode)
        checkBulletCollision(this, this.bullets)
    }

    // draw = () => {
    //     board.c.fillStyle = 'blue'
    //     board.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    // }

    move = (mode) => {
        this.position.y += this.velocity.y
        if (!board.isSlower) {
            if (this.type === 1) {
                this.velocity.y = -mode.bullet.multiply.normal
            }
            if (this.type === 2) {
                this.velocity.y = -mode.bullet.single.normal
            }
            if (this.type === 3) {
                this.velocity.y = mode.bullet.single.normal
            }
        }
        if (board.isSlower) {
            if (this.type === 1) {
                this.velocity.y = -mode.bullet.multiply.slow
            }
            if (this.type === 2) {
                this.velocity.y = -mode.bullet.single.slow
            }
            if (this.type === 3) {
                this.velocity.y = mode.bullet.single.slow
            }
        }
    }
}

export default Bullet