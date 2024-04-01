import board from "../modules/Board.js";

const score = document.querySelector('.score-number')

let num = 0

const changeScore = (number) => {
    num += number
    score.textContent = num
}

export { changeScore }