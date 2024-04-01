import Player from "./modules/Player.js";
import board from "./modules/Board.js";
import render from "./utils/renderMap.js";
import { changeRadiation, radiationWidth } from "./utils/changeRadiation.js"

const menu = document.querySelector('.menu')
const infoConatainer = document.querySelector('.info-container')
const easyMode = document.querySelector('.easy')
const mediumMode = document.querySelector('.medium')
const hardMode = document.querySelector('.hard')
const startBtn = document.querySelector('.start-btn')

const bullets = []
const enemies = []
const buffs = []

let currentMode

let clock = 0;

let isRunning = false

infoConatainer.style.display = 'none'

const modes = {
    easy: {
        player: {
            shotRate: 20
        },
        bullet: {
            normal: 6,
            slow: 8
        },
        map: {
            normal: 1.25,
            slow: 0.5
        },
        radiation: {
            normal: 0.2,
            slow: 0.8
        }
    },
    medium: {
        player: {
            shotRate: 20
        },
        bullet: {
            normal: 6,
            slow: 8
        },
        map: {
            normal: 1.25,
            slow: 0.5
        },
        radiation: {
            normal: 0.2,
            slow: 0.8
        }
    },
    hard: {
        player: {
            shotRate: 20
        },
        bullet: {
            normal: 6,
            slow: 8
        },
        map: {
            normal: 1.25,
            slow: 0.5
        },
        radiation: {
            normal: 0.2,
            slow: 0.8
        }
    }
}

const player = new Player({
	position: {
		x: 500,
		y: 475,
	},
	velocity: {
		x: 0,
		y: 0,
	},
	bullets,
});

const update = () => {
    board.speed = {
        normal: currentMode.map.normal,
        slow: currentMode.map.slow
    }
    if (isRunning && radiationWidth <= 100) {
        requestAnimationFrame(update);
    
        board.update();
        changeRadiation(currentMode, clock)
        render(clock, bullets, enemies, buffs);
        player.update(currentMode, clock);
        bullets.forEach(bullet => {
            bullet.update(currentMode);
        });
        enemies.forEach(enemy => {
            enemy.update(currentMode, clock)
        })
        buffs.forEach(buff => {
            buff.update()
        })
        clock += 1
    }
};

const handleMode = (e) => {
    currentMode = e.target.textContent
    easyMode.style.color = 'white'
    mediumMode.style.color = 'white'
    hardMode.style.color = 'white'
    e.target.style.color = 'black'
    currentMode === 'Easy' ? currentMode = modes.easy : ''
    currentMode === 'Medium' ? currentMode = modes.medium : ''
    currentMode === 'Hard' ? currentMode = modes.hard : ''
    console.log(currentMode);
}

const startGame = () => {
    if (currentMode) {
        menu.style.display = 'none'
        infoConatainer.style.display = 'flex'
        isRunning = true
        update();
    }
}

easyMode.addEventListener('click', handleMode)
mediumMode.addEventListener('click', handleMode)
hardMode.addEventListener('click', handleMode)
startBtn.addEventListener('click', startGame)
