import Player from "./modules/Player.js";
import board from "./modules/Board.js";
import render from "./utils/renderMap.js";
import { changeRadiation, radiationWidth } from "./utils/changeRadiation.js"
import Sprite from "./modules/Sprite.js";

const menu = document.querySelector('.menu')
const infoConatainer = document.querySelector('.info-container')
const easyMode = document.querySelector('.easy')
const mediumMode = document.querySelector('.medium')
const hardMode = document.querySelector('.hard')
const startBtn = document.querySelector('.start-btn')

const bullets = []
const enemies = []
const buffs = []
const smallEnemies = []

let currentMode

let clock = 0;

let isRunning = false

infoConatainer.style.display = 'none'

const modes = {
    easy: {
        player: {
            shotRate: 120,
            shotRateFast: 60
        },
        bullet: {
            multiply: {
                normal: 6,
                slow: 8
            },
            single: {
                normal: 3,
                slow: 5
            }
        },
        map: {
            normal: 1.25,
            slow: 0.5
        },
        radiation: {
            normal: 0.2,
            slow: 0.4
        },
        render: {
            enemy: 80,
            buff: 700,
            smallEnemy: 1200
        }
    },
    medium: {
        player: {
            shotRate: 140,
            shotRateFast: 80
        },
        bullet: {
            multiply: {
                normal: 6,
                slow: 8
            },
            single: {
                normal: 3,
                slow: 5
            }
        },
        map: {
            normal: 1.5,
            slow: 0.75
        },
        radiation: {
            normal: 0.3,
            slow: 0.5
        },
        render: {
            enemy: 70,
            buff: 850,
            smallEnemy: 1000
        }
    },
    hard: {
        player: {
            shotRate: 160,
            shotRateFast: 100
        },
        bullet: {
            multiply: {
                normal: 6,
                slow: 8
            },
            single: {
                normal: 3,
                slow: 5
            }
        },
        map: {
            normal: 1.75,
            slow: 1
        },
        radiation: {
            normal: 0.4,
            slow: 0.6
        },
        render: {
            enemy: 60,
            buff: 1000,
            smallEnemy: 600
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
    enemies,
	bullets,
    buffs,
    smallEnemies,
    imageSrc: './assets/Ship/Main Ship - Base - Full health.png',
    scale: 2,
    columns: 1,
    offset: {
        x: 24,
        y: 24
    },
    sprites: {
        fullHealth: {
            imageSrc: './assets/Ship/Main Ship - Base - Full health.png',
            columns: 1
        },
        slightDamage: {
            imageSrc: './assets/Ship/Main Ship - Base - Slight damage.png',
            columns: 1
        },
        damaged: {
            imageSrc: './assets/Ship/Main Ship - Base - Damaged.png',
            columns: 1
        },
        veryDamaged: {
            imageSrc: './assets/Ship/Main Ship - Base - Very damaged.png',
            columns: 1
        }
    },
});

const update = () => {
    if (isRunning && radiationWidth <= 100) {
        requestAnimationFrame(update);
    
        board.update(currentMode);
        changeRadiation(currentMode, clock)
        render(clock, bullets, enemies, buffs, smallEnemies, currentMode);

        player.update(currentMode, clock);

        bullets.forEach(bullet => {
            bullet.update(currentMode)
        })
        enemies.forEach(enemy => {
            enemy.update(currentMode)
        })
        buffs.forEach(buff => {
            buff.update(currentMode)
        })
        smallEnemies.forEach(smallEnemy => {
            smallEnemy.update(currentMode, clock)
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
