import board from "./Board.js"
import { checkBuffCollision } from "../utils/checkCollision.js"
import Sprite from "./Sprite.js"

class Buff extends Sprite {
    constructor ({ position, velocity, buffs, bullets, imageSrc, scale = 1, columns = 1, maxFrames = 1, offset = {x: 0, y: 0} }) {
        super({
            position,
            imageSrc,
            scale,
            columns,
            maxFrames,
            offset
        })
        // this.position = position
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

    update = (mode) => {
        this.draw()
        this.animateFrames()
        this.move(mode)
        checkBuffCollision(this, this.buffs, this.bullets)
    }

    // draw = () => {
    //     board.c.fillStyle = 'gold'
    //     board.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    // }

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

export default Buff