import Player from "./modules/Player.js";
import board from "./modules/Board.js";
import render from "./utils/renderMap.js";
import { changeRadiation } from "./utils/changeRadiation.js"

const bullets = [];
const enemies = [];

let clock = 0;

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
	requestAnimationFrame(update);

	board.update();
    changeRadiation(clock)
	render(clock, bullets, enemies);
	player.update(clock);
	bullets.forEach((bullet) => {
		bullet.update();
	});
    enemies.forEach((enemy) => {
        enemy.update()
    })
	clock += 1;
};


update();
