import board from "../modules/Board.js"

const radiationBar = document.querySelector('.bar')

let clockTime
const delayTime = 10
let radiationWidth = 0
const radiationRate = {
    normal: 0.2,
    fast: 0.8
}

const changeRadiation = (time) => {
    if ((time - clockTime) < delayTime) return
    clockTime = time
    radiationBar.style.width = radiationWidth + '%'
    if (!board.isFaster) {
        radiationWidth += radiationRate.normal
    }
    if (board.isFaster) {
        radiationWidth += radiationRate.fast
    }
}

export default changeRadiation