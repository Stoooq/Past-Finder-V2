import board from "./Board.js"

class Bullet {
    constructor ({ position, velocity }) {
        this.position = position
        this.width = 5
        this.height = 15
        this.velocity = velocity
    }

    update = () => {
        this.draw()
        this.move()
    }

    draw = () => {
        board.c.fillStyle = 'blue'
        board.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    move = () => {
        this.position.y += this.velocity.y
        this.velocity.y = -8
    }
}

export default Bullet