import board from "../modules/Board.js"

const radiationBar = document.querySelector('.bar')

let clockTime
const delayTime = 10
let radiationWidth = 0

const setRadiation = (rate) => {
    if (radiationWidth < 0) {
        radiationWidth = 0
        return
    }
    if (radiationWidth < 50) {
        radiationBar.style.backgroundColor = 'rgb(86, 170, 21)'
    }
    if (radiationWidth >= 50) {
        radiationBar.style.backgroundColor = 'orange'
    }
    if (radiationWidth >= 90) {
        radiationBar.style.backgroundColor = 'red'
    }
    radiationWidth += rate
}

const changeRadiation = (mode, time) => {
    if ((time - clockTime) < delayTime) return
    clockTime = time
    radiationBar.style.width = radiationWidth + '%'
    if (!board.isSlower) {
        setRadiation(mode.radiation.normal)
    }
    if (board.isSlower) {
        setRadiation(mode.radiation.slow)
    }
}

export { changeRadiation, setRadiation, radiationWidth }