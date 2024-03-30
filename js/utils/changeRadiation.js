import board from "../modules/Board.js"

const radiationBar = document.querySelector('.bar')

let clockTime
const delayTime = 10
let radiationWidth = 0
const radiationRate = {
    normal: 0.2,
    fast: 0.8
}

const setRadiation = (rate) => {
    if (radiationWidth < 0) {
        radiationWidth = 0
        return
    }
    radiationWidth += rate
}

const changeRadiation = (time) => {
    if ((time - clockTime) < delayTime) return
    clockTime = time
    radiationBar.style.width = radiationWidth + '%'
    if (!board.isFaster) {
        setRadiation(radiationRate.normal)
    }
    if (board.isFaster) {
        setRadiation(radiationRate.fast)
    }
}

export { changeRadiation, setRadiation }