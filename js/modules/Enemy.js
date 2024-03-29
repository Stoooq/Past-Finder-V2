import board from "./Board.js"

class Enemy {
    constructor ({ position, velocity}) {
        this.position = position
        this.width = 50
        this.height = 50
        this.velocity = velocity
        this.speed = {
            normal: 0.75,
            fast: 2.5
        }
    }

    update = () => {
        this.draw()
        this.move()
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