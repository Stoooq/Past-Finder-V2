import Enemy from "../modules/Enemy.js";

let clockTime
const delayTime = 100

const render = (time, bullets, enemies) => {
	if ((time - clockTime) < delayTime) return
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
};

export default render;
