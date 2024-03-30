import board from "../modules/Board.js";
import { setRadiation } from "./changeRadiation.js";

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
        if (enemy.position.x < bullet.position.x && enemy.position.x + enemy.width > bullet.position.x + bullet.width && enemy.position.y < bullet.position.y && enemy.position.y + enemy.height > bullet.position.y + bullet.height) {
            enemies.splice(enemies.indexOf(enemy), 1)
            bullets.splice(bullets.indexOf(bullet), 1)
            setRadiation(-1)
        }
    })
    if (enemy.position.y >= board.canvas.height) {
        enemies.splice(enemies.indexOf(enemy), 1)
    }
}

export { checkPlayerCollision, checkBulletCollision, checkEnemyCollision }