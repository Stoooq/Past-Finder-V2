import Enemy from "../modules/Enemy.js";
import Buff from "../modules/Buff.js";

let enemyDelayTime = 60
let buffDelayTime = 1000

const render = (time, bullets, enemies, buffs) => {
    let randomX = Math.floor((Math.floor(Math.random() * (1000)) / 50)) * 50 + 12
    if (time !== 0){
        if (time % enemyDelayTime === 0) {
            const newEnemy = new Enemy({
                position: {
                    x: randomX,
                    y: -50,
                },
                velocity: {
                    x: 0,
                    y: 0,
                },
                enemies,
                bullets,
                imageSrc: '../assets/Enemies/Slime green.png',
                scale: 2.5,
                columns: 10,
                rows: 9,
                maxFrames: 4,
                offset: {
                    x: 36,
                    y: 36
                }
            });
            enemies.push(newEnemy)
        }
        randomX = Math.floor((Math.floor(Math.random() * (1000)) / 50)) * 50 + 12
        if (time % buffDelayTime === 0) {
            const newBuff = new Buff({
                position: {
                    x: randomX,
                    y: -50,
                },
                velocity: {
                    x: 0,
                    y: 0,
                },
                buffs,
                bullets,
                imageSrc: '../assets/Asteroid/Asteroid 01 - Base.png',
                scale: 1.5,
                columns: 1,
                maxFrames: 1,
                offset: {
                    x: 48,
                    y: 48
                }
            });
            buffs.push(newBuff)
        }
    }
    enemyDelayTime = 60
    buffDelayTime = 1000
};

export default render;
