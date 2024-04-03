import board from "./Board.js";

class Sprite {
    constructor ({ position, imageSrc, scale = 1, columns = 1, rows = 1, row = 0, maxFrames = 1, offset = {x: 0, y: 0}, framesCurrent = 0 }) {
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.columns = columns
        this.rows = rows
        this.row = row
        this.maxFrames = maxFrames
        this.framesCurrent = framesCurrent
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
    }

    update = () => {
        this.draw()
        this.animateFrames()
    }

    draw = () => {
        board.c.drawImage(this.image, 
            this.framesCurrent * (this.image.width / this.columns), 
            this.row * (this.image.height / this.rows), 
            this.image.width / this.columns, 
            this.image.height / this.rows, 
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width / this.columns) * this.scale, 
            (this.image.height / this.rows) * this.scale)
    }

    animateFrames = () => {
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.maxFrames - 1) {
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
    }
}

export default Sprite