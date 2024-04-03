import Bullet from "./Bullet.js"
import { checkPlayerCollision, checkPlayerEnemyCollision, checkPlayerBuffCollision } from "../utils/checkCollision.js"
import board from "./Board.js"
import Sprite from "./Sprite.js"

class Player extends Sprite {
    constructor ({ position, velocity, bullets, enemies, buffs, imageSrc, scale = 1, columns = 1, maxFrames = 1, offset = {x: 0, y: 0}, sprites }) { 
        super({
            position,
            imageSrc,
            scale,
            columns,
            maxFrames,
            offset
        })
        this.velocity = velocity
        this.bullets = bullets
        this.enemies = enemies
        this.buffs = buffs
        this.width = 50
        this.height = 50
        this.playerSpeed = 8
        this.lastKey = undefined
        this.keys = {
            d: {
                pressed: false
            },
            a: {
                pressed: false
            },
        }
        this.isShooting = false
        this.shotClock
        this.health = 100
        this.dead = false
        this.sprites = sprites
        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
        this.engine = new Sprite({
            position: {
                x: this.position.x,
                y: this.position.y
            },
            imageSrc: '../assets/Engines/Main Ship - Engines - Supercharged Engine.png',
            scale: 2,
            columns: 1,
            maxFrames: 1
        })
        this.effect = new Sprite({
            position: {
                x: this.position.x,
                y: this.position.y
            },
            imageSrc: '../assets/Effects/Main Ship - Engines - Supercharged Engine - Powering.png',
            scale: 2,
            columns: 4,
            maxFrames: 4
        })
        this.weapon = new Sprite({
            position: {
                x: this.position.x,
                y: this.position.y
            },
            imageSrc: '../assets/Weapons/Main Ship - Weapons - Rockets.png',
            scale: 2,
            columns: 17,
            maxFrames: 17
        })
        this.animatingWeapon = false
        this.weaponType = 1
    }

    update = (mode, shotDelay) => {
        if (!this.dead) {
            this.animateFrames()
        }
        this.engine.position.x = this.position.x - 24
        this.engine.position.y = this.position.y - 24
        this.engine.draw()
        this.engine.animateFrames()
        this.effect.position.x = this.position.x - 24
        this.effect.position.y = this.position.y - 24
        this.effect.draw()
        this.effect.animateFrames()
        this.weapon.position.x = this.position.x - 24
        this.weapon.position.y = this.position.y - 24
        this.weapon.draw()
        if (this.weapon.framesCurrent === this.weapon.columns - 1) {
            setTimeout(() => {
                this.animatingWeapon = false
                this.weapon.framesCurrent = 0
            })
        }
        if (this.animatingWeapon) {
            this.weapon.animateFrames()
        }

        this.draw()
        this.handling()
        this.moving()
        this.shot(mode, shotDelay)
        checkPlayerCollision(this.position, this.width)
        checkPlayerEnemyCollision(this, this.enemies)
        checkPlayerBuffCollision(this, this.buffs)
    }

    // draw = () => {
    //     board.c.fillStyle = 'red'
    //     board.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    // }

    handling = () => {
        window.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'd':
                    this.keys.d.pressed = true
                    this.lastKey = 'd'
                    break
                case 'a':
                    this.keys.a.pressed = true
                    this.lastKey = 'a'
                    break
                case 's':
                    board.isSlower = true
                    this.weaponType === 1 ? this.effect.image.src = '../assets/Effects/Main Ship - Engines - Supercharged Engine - Idle.png' : ''
                    this.weaponType === 2 ? this.effect.image.src = '../assets/Effects/Main Ship - Engines - Big Pulse Engine - Idle.png' : ''
                    break
                case ' ':
                    this.isShooting = true
                    break
            }
        })

        window.addEventListener('keyup', (e) => {
            switch(e.key) {
                case 'd':
                    this.keys.d.pressed = false
                    break
                case 'a':
                    this.keys.a.pressed = false
                    break
                case 's':
                    board.isSlower = false
                    this.weaponType === 1 ? this.effect.image.src = '../assets/Effects/Main Ship - Engines - Supercharged Engine - Powering.png' : ''
                    this.weaponType === 2 ? this.effect.image.src = '../assets/Effects/Main Ship - Engines - Big Pulse Engine - Powering.png' : ''
                    break
                case ' ':
                    this.isShooting = false
                    break
            }
        })
    }

    moving = () => {
        this.velocity.x = 0
        if (this.keys.d.pressed && this.lastKey === 'd') {
            this.velocity.x = this.playerSpeed
        } else if (this.keys.a.pressed && this.lastKey === 'a') {
            this.velocity.x = -this.playerSpeed
        }
        this.position.x += this.velocity.x
    }

    takeHit = () => {
        this.health -= 25
        if (this.health <= 75) {
            this.switchSprite('slightDamage')
        }
        if (this.health <= 50) {
            this.switchSprite('damaged')
        }
        if (this.health <= 25) {
            this.switchSprite('veryDamaged')
        }
        if (this.health <= 0) {
            this.dead = true
        }
    }

    changeWeapon = () => {
        if (this.weaponType === 1) {
            this.engine.image.src = '../assets/Engines/Main Ship - Engines - Supercharged Engine.png'
            this.effect.image.src = '../assets/Effects/Main Ship - Engines - Supercharged Engine - Powering.png'
            this.effect.columns = 4
            this.effect.maxFrames = 4
            this.weapon.image.src = '../assets/Weapons/Main Ship - Weapons - Rockets.png'
            this.weapon.columns = 17
            this.weapon.maxFrames = 17
        }
        if (this.weaponType === 2) {
            this.engine.image.src = '../assets/Engines/Main Ship - Engines - Big Pulse Engine.png'
            this.effect.image.src = '../assets/Effects/Main Ship - Engines - Big Pulse Engine - Powering.png'
            this.effect.columns = 4
            this.effect.maxFrames = 4
            this.weapon.image.src = '../assets/Weapons/Main Ship - Weapons - Big Space Gun.png'
            this.weapon.columns = 12
            this.weapon.maxFrames = 12
        }
    }

    shot = (mode, shotDelay) => {
        if ((shotDelay - this.shotClock) < mode.player.shotRateFast) return
        
        if (this.weaponType === 1) {
            if (this.isShooting) {
                this.shotClock = shotDelay
                const bullets = this.bullets
                let i = 0
                const interval = setInterval(() => {
                    this.animatingWeapon = true
                    let newPositionX = this.position.x
                    let newPositionY = this.position.y
                    i === 0 ? newPositionX = this.position.x + 8 : ''
                    i === 1 ? newPositionX = this.position.x + 34 : ''
                    i === 2 ? newPositionX = this.position.x : ''
                    i === 2 ? newPositionY = this.position.y + 8 : ''
                    i === 3 ? newPositionX = this.position.x + 42 : ''
                    i === 3 ? newPositionY = this.position.y + 8 : ''
                    i === 4 ? newPositionX = this.position.x - 8 : ''
                    i === 4 ? newPositionY = this.position.y + 16 : ''
                    i === 5 ? newPositionX = this.position.x + 50 : ''
                    i === 5 ? newPositionY = this.position.y + 16 : ''
                    const newBullet = new Bullet({
                        position: {
                            x: newPositionX,
                            y: newPositionY
                        },
                        velocity: {
                            x: 0,
                            y: 0
                        },
                        width: 5,
                        height: 15,
                        type: 1,
                        bullets,
                        imageSrc: '../assets/Bullets/Main ship weapon - Projectile - Rocket.png',
                        scale: 2,
                        columns: 3,
                        maxFrames: 3,
                        offset: {
                            x: 28,
                            y: 28
                        }
                    })
                    this.bullets.push(newBullet)
                    i++
                    if (i === 6) {
                        i = 0
                        clearInterval(interval)
                    }
                }, 200)
                this.isShooting = false
            }
        }

        if (this.weaponType === 2) {
            if (this.isShooting) {
                this.shotClock = shotDelay
                const bullets = this.bullets
                this.animatingWeapon = true
                this.isShooting = false
                setTimeout(() => {
                    const newBullet = new Bullet({
                        position: {
                            x: (this.position.x + (this.width / 2) - 2.5),
                            y: this.position.y
                        },
                        velocity: {
                            x: 0,
                            y: 0
                        },
                        width: 25,
                        height: 25,
                        type: 2,
                        bullets,
                        imageSrc: '../assets/Bullets/Main ship weapon - Projectile - Big Space Gun.png',
                        scale: 2,
                        columns: 10,
                        maxFrames: 10,
                        offset: {
                            x: 28,
                            y: 28
                        }
                    })
                    this.bullets.push(newBullet)
                }, 700)
            }
        }
    }

    switchSprite = (sprite) => {
        switch (sprite) {
            case 'fullHealth':
                if (this.image !== this.sprites.fullHealth.image) {
                    this.image = this.sprites.fullHealth.image
                    this.columns = this.sprites.fullHealth.columns
                    this.framesCurrent = 0
                }
                break
            case 'slightDamage':
                if (this.image !== this.sprites.slightDamage.image) {
                    this.image = this.sprites.slightDamage.image
                    this.columns = this.sprites.slightDamage.columns
                    this.framesCurrent = 0
                }
                break
            case 'damaged':
                if (this.image !== this.sprites.damaged.image) {
                    this.image = this.sprites.damaged.image
                    this.columns = this.sprites.damaged.columns
                    this.framesCurrent = 0
                }
                break
            case 'veryDamaged':
                if (this.image !== this.sprites.veryDamaged.image) {
                    this.image = this.sprites.veryDamaged.image
                    this.columns = this.sprites.veryDamaged.columns
                    this.framesCurrent = 0
                }
                break
        }
    }
}

export default Player
