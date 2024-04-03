import Enemy from "../modules/Enemy.js";
import Buff from "../modules/Buff.js";
import SmallEnemy from "../modules/SmallEnemy.js";

const render = (time, bullets, enemies, buffs, smallEnemies, mode) => {
    let randomX = Math.floor((Math.floor(Math.random() * (1000)) / 50)) * 50 + 12
    if (time === 1500) {
        mode.render.enemy = Math.floor(mode.render.enemy * 0.9)
        mode.render.buff = Math.floor(mode.render.buff * 0.9)
        mode.render.smallEnemy = Math.floor(mode.render.smallEnemy * 0.95)
        mode.map.normal += 0.5
        mode.map.slow += 0.5
        mode.bullet.multiply.normal += 0.5
        mode.bullet.multiply.slow += 0.5
        mode.bullet.single.normal += 0.5
        mode.bullet.single.slow += 0.5
    }
    if (time === 3000) {
        mode.render.enemy = Math.floor(mode.render.enemy * 0.8)
        mode.render.buff = Math.floor(mode.render.buff * 0.9)
        mode.render.smallEnemy = Math.floor(mode.render.smallEnemy * 0.9)
        mode.map.normal += 0.5
        mode.map.slow += 0.5
        mode.bullet.multiply.normal += 0.5
        mode.bullet.multiply.slow += 0.5
        mode.bullet.single.normal += 0.5
        mode.bullet.single.slow += 0.5
    }
    if (time !== 0){
        if (time % mode.render.enemy === 0) {
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
        if (time % mode.render.buff === 0) {
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
        randomX = Math.floor((Math.floor(Math.random() * (1000)) / 50)) * 50 + 12
        if (time % mode.render.smallEnemy === 0) {
            const newSmallEnemy = new SmallEnemy({
                position: {
                    x: randomX,
                    y: -50,
                },
                velocity: {
                    x: 0,
                    y: 0,
                },
                smallEnemies,
                bullets,
                imageSrc: '../assets/Enemies/Slime red.png',
                scale: 1.5,
                columns: 10,
                rows: 9,
                maxFrames: 10,
                offset: {
                    x: 36,
                    y: 36
                }
            });
            smallEnemies.push(newSmallEnemy)
        }
    }
};

export default render;
