class Board {
    constructor () {
        this.canvas = document.querySelector('canvas')
        this.c = this.canvas.getContext('2d') 
        this.canvas.width = 1024
        this.canvas.height = 576 
        this.c.msImageSmoothingEnabled = false;
        this.c.mozImageSmoothingEnabled = false;
        this.c.webkitImageSmoothingEnabled = false;
        this.c.imageSmoothingEnabled = false;
        this.src = '../assets/Space Background.png'
        this.image = new Image()
        this.image.src = this.src
        this.positionY = 0
        this.isFaster = false
        this.speed = {
            normal: 0.75,
            fast: 2.5
        }
    }

    update = () => {
        this.c.fillStyle = 'black'
        this.c.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.c.drawImage(this.image, 0, this.positionY, this.canvas.width, this.canvas.height)
        this.c.drawImage(this.image, 0, this.positionY - this.canvas.height, this.canvas.width, this.canvas.height)
        if (!this.isFaster) {
            this.positionY += this.speed.normal
        }
        if (this.isFaster) {
            this.positionY += this.speed.fast
        }
        if (this.positionY > this.canvas.height) this.positionY = 0
    }
}

const board = new Board()


export default board