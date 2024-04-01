class SmallEnemy {
    constructor ({ position, velocity, enemies, bullets}) {
        this.position = position
        this.velocity = velocity
        this.enemies = enemies
        this.bullets = bullets
        this.width = 25
        this.height = 25
        this.moveRate = 30
        this.moveClock
    }

    update = (mode, moveDelay) => {
        this.draw()
        this.move(mode, moveDelay)
        checkEnemyCollision(this, this.enemies, this.bullets)
    }

    draw = () => {
        board.c.fillStyle = 'green'
        board.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    move = (mode, moveDelay) => {
        this.position.y += this.velocity.y
        if (!board.isSlower) {
            this.velocity.y = mode.map.normal
        }
        if (board.isSlower) {
            this.velocity.y = mode.map.slow
        }
        if ((moveDelay - this.moveClock) < this.moveRate) return
        this.moveClock = moveDelay
        if (this.velocity.x < 0) {
            this.velocity.x = 25
            this.position.x += this.velocity.x
        } else if (this.position.x > 0) {
            this.velocity.x = -25
            this.position.x += this.velocity.x
        }
    }
}