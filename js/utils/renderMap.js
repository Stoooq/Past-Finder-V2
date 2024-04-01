import Enemy from "../modules/Enemy.js";
import Buff from "../modules/Buff.js";

let clockTime
const enemyDelayTime = 100

const render = (time, bullets, enemies, buffs) => {
	if ((time - clockTime) < enemyDelayTime) return
    clockTime = time
    let randomX = Math.floor((Math.floor(Math.random() * (1000)) / 50)) * 50 + 12
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
	// const newBuff = new Buff({
	// 	position: {
	// 		x: randomX,
	// 		y: -50,
	// 	},
	// 	velocity: {
	// 		x: 0,
	// 		y: 0,
	// 	},
    //     buffs,
    //     bullets,
	// });
    // buffs.push(newBuff)
};

export default render;
