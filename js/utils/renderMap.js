import Enemy from "../modules/Enemy.js";
import Buff from "../modules/Buff.js";

let enemyDelayTime = 100
let buffDelayTime = 150

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
            });
            buffs.push(newBuff)
        }
    }
    enemyDelayTime = 100
    buffDelayTime = 150
};

export default render;
