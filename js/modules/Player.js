import Bullet from "./Bullet.js"
import checkCollision from "../utils/checkPlayerCollision.js"
import board from "./Board.js"

class Player {
    constructor ({ position, velocity, bullets }) {
        this.position = position
        this.width = 50
        this.height = 50
        this.velocity = velocity
        this.playerSpeed = 10
        this.lastKey = undefined
        this.keys = {
            d: {
                pressed: false
            },
            a: {
                pressed: false
            },
        }
        this.isShooting = false
        this.bullets = bullets
        this.shotClock
        this.shotRate = 30
    }

    update = (shotDelay) => {
        this.draw()
        this.handling()
        this.moving()
        this.shot(shotDelay)
        checkCollision(this.position, this.width, this.height)
    }

    draw = () => {
        board.c.fillStyle = 'red'
        board.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    handling = () => {
        window.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'd':
                    this.keys.d.pressed = true
                    this.lastKey = 'd'
                    break
                case 'a':
                    this.keys.a.pressed = true
                    this.lastKey = 'a'
                    break
                case 'w':
                    board.isFaster = true
                    break
                case ' ':
                    this.isShooting = true
                    break
            }
        })

        window.addEventListener('keyup', (e) => {
            switch(e.key) {
                case 'd':
                    this.keys.d.pressed = false
                    break
                case 'a':
                    this.keys.a.pressed = false
                    break
                case 'w':
                    board.isFaster = false
                    break
            }
        })
    }

    moving = () => {
        this.velocity.x = 0
        if (this.keys.d.pressed && this.lastKey === 'd') {
            this.velocity.x = this.playerSpeed
        } else if (this.keys.a.pressed && this.lastKey === 'a') {
            this.velocity.x = -this.playerSpeed
        }
        this.position.x += this.velocity.x
    }

    shot = (shotDelay) => {
        if ((shotDelay - this.shotClock) < this.shotRate) return
        if (this.isShooting) {
            const newBullet = new Bullet({
                position: {
                    x: (this.position.x + this.width / 2),
                    y: this.position.y
                },
                velocity: {
                    x: 0,
                    y: 0
                }
            })
            this.isShooting = false
            this.shotClock = shotDelay
            this.bullets.push(newBullet)
        }
    }
}

export default Player
