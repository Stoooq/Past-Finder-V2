import board from "../modules/Board.js"

const checkCollision = (position, width) => {
    if (position.x <= 0) {
        position.x = 0
    }
    if (position.x + width >= board.canvas.width) {
        position.x = board.canvas.width - width
    }
}

export default checkCollision