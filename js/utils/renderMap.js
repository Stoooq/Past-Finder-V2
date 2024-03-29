import Enemy from "../modules/Enemy.js";

let clockTime
const delayTime = 100

const render = (time, enemies) => {
	if ((time - clockTime) < delayTime) return
    clockTime = time
    let randomX = Math.floor((Math.floor(Math.random() * (1000)) / 50)) * 50 + 12
	const newEnemy = new Enemy({
		position: {
			x: randomX,
			y: 100,
		},
		velocity: {
			x: 0,
			y: 0,
		}
	});
    enemies.push(newEnemy)
};

export default render;
