import board from "../modules/Board.js";
import { setRadiation } from "./changeRadiation.js";
import { changeScore } from "./changeScore.js";

const checkPlayerCollision = (position, width) => {
    if (position.x <= 0) {
        position.x = 0
    }
    if (position.x + width >= board.canvas.width) {
        position.x = board.canvas.width - width
    }
}

const checkBulletCollision = (bullet, bullets) => {
    if (bullet.position.y < 0) {
        bullets.splice(bullets.indexOf(bullet), 1)
    }
}

const checkEnemyCollision = (enemy, enemies, bullets) => {
    bullets.forEach(bullet => {
        if (((enemy.position.x < bullet.position.x && enemy.position.x + enemy.width > bullet.position.x) || (enemy.position.x > bullet.position.x && enemy.position.x < bullet.position.x + bullet.width)) && ((enemy.position.y < bullet.position.y && enemy.position.y + enemy.height > bullet.position.y) || (enemy.position.y > bullet.position.y && enemy.position.y < bullet.position.y + bullet.height))) {
            enemies.splice(enemies.indexOf(enemy), 1)
            bullet.type === 1 ? bullets.splice(bullets.indexOf(bullet), 1) : ''
            setRadiation(-1)
            changeScore(1)
        }
    })
    if (enemy.position.y >= board.canvas.height) {
        enemies.splice(enemies.indexOf(enemy), 1)
    }
}
const checkBuffCollision = (buff, buffs, bullets) => {
    bullets.forEach(bullet => {
        if (((buff.position.x < bullet.position.x && buff.position.x + buff.width > bullet.position.x) || (buff.position.x > bullet.position.x && buff.position.x < bullet.position.x + bullet.width)) && ((buff.position.y < bullet.position.y && buff.position.y + buff.height > bullet.position.y) || (buff.position.y > bullet.position.y && buff.position.y < bullet.position.y + bullet.height))) {
            buffs.splice(buffs.indexOf(buff), 1)
            bullet.type === 1 ? bullets.splice(bullets.indexOf(bullet), 1) : ''
            setRadiation(-10)
        }
    })
    if (buff.position.y >= board.canvas.height) {
        buffs.splice(buffs.indexOf(buff), 1)
    }
}

const checkPlayerEnemyCollision = (player, enemies) => {
    enemies.forEach(enemy => {
        if (((player.position.x < enemy.position.x && player.position.x + player.width > enemy.position.x) || (player.position.x > enemy.position.x && player.position.x < enemy.position.x + enemy.width)) && ((player.position.y < enemy.position.y && player.position.y + player.height > enemy.position.y) || (player.position.y > enemy.position.y && player.position.y < enemy.position.y + enemy.height))) {
            enemies.splice(enemies.indexOf(enemy), 1)
            player.takeHit()
        }
    })
}

const checkPlayerBuffCollision = (player, buffs) => {
    buffs.forEach(buff => {
        if (((player.position.x < buff.position.x && player.position.x + player.width > buff.position.x) || (player.position.x > buff.position.x && player.position.x < buff.position.x + buff.width)) && ((player.position.y < buff.position.y && player.position.y + player.height > buff.position.y) || (player.position.y > buff.position.y && player.position.y < buff.position.y + buff.height))) {
            buffs.splice(buffs.indexOf(buff), 1)
            if (player.weaponType === 1) {
                player.weaponType = 2
            } else {
                player.weaponType = 1
            }
            player.changeWeapon()
        }
    })
}

export { checkPlayerCollision, checkBulletCollision, checkEnemyCollision, checkBuffCollision, checkPlayerEnemyCollision, checkPlayerBuffCollision }