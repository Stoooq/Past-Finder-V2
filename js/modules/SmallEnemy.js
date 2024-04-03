import board from "./Board.js"
import Sprite from "./Sprite.js"
import Bullet from "./Bullet.js"
import { checkSmallEnemyCollision } from "../utils/checkCollision.js"

class SmallEnemy extends Sprite {
    constructor ({ position, velocity, smallEnemies, bullets, imageSrc, scale = 1, columns = 1, rows = 1, row = 0, maxFrames = 1, offset = {x: 0, y: 0} }) {
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
        this.smallEnemies = smallEnemies
        this.bullets = bullets
        this.width = 25
        this.height = 25
        this.moveRate = 30
        this.shotRate = 0
        this.isShooting = false
    }

    update = (mode, moveDelay) => {
        this.draw()
        this.animateFrames()
        this.move(mode, moveDelay)
        this.shot()
        checkSmallEnemyCollision(this, this.smallEnemies, this.bullets)
    }

    // draw = () => {
    //     board.c.fillStyle = 'green'
    //     board.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    // }

    move = (mode, moveDelay) => {
        this.position.y += this.velocity.y
        if (!board.isSlower) {
            this.velocity.y = mode.map.normal
        }
        if (board.isSlower) {
            this.velocity.y = mode.map.slow
        }
        if (moveDelay % this.moveRate === 0) {
            if (this.velocity.x < 0) {
                this.velocity.x = 50
                this.position.x += this.velocity.x
            } else if (this.position.x > 0) {
                this.velocity.x = -50
                this.position.x += this.velocity.x
            }
        }
    }

    shot = () => {
        if (this.framesCurrent === this.maxFrames - 1) {
            this.framesCurrent = 0
            const bullets = this.bullets
            const newBullet = new Bullet({
                position: {
                    x: (this.position.x + (this.width / 2) - 2.5),
                    y: this.position.y
                },
                velocity: {
                    x: 0,
                    y: 0
                },
                width: 10,
                height: 10,
                type: 3,
                bullets,
                imageSrc: '../assets/Enemies/Slime projectile.png',
                scale: 2,
                columns: 4,
                rows: 8,
                row: 2,
                maxFrames: 1,
                offset: {
                    x: 24,
                    y: 24
                }
            })
            this.bullets.push(newBullet)
            this.isShooting = false
        }
    }
}

export default SmallEnemy