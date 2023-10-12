import './style.css'
import Phaser from 'phaser'

const sizes = {
  width: 500,
  height: 500
}

const speedDown = 300;

class GameScene extends Phaser.Scene {
  constructor() {
    super("scene-game")
    this.player
    this.cursor
    this.playerSpeed = speedDown + 50
  }

  preload(){
    this.load.image("bg", "/assets/space_bg.jpg")
    this.load.image("super_space_chicken", "/assets/super_space_chicken_smallest.png")
  }
  create(){
    this.add.image(0, 0, "bg").setOrigin(0, 0)
    this.player = this.physics.add.image(20, sizes.height / 2, "super_space_chicken").setOrigin(0, 0)
    this.player.setImmovable(true)
    this.player.body.allowGravity = false
    this.player.setCollideWorldBounds(true)

    this.cursor = this.input.keyboard.createCursorKeys()
  }
  update(){
    const {up, down} = this.cursor;

    if (up.isDown) {
      this.player.setVelocityY(-this.playerSpeed);
    } else if (down.isDown) {
      this.player.setVelocityY(this.playerSpeed);
    } else {
      this.player.setVelocityY(0);
    }
  }
}

const config = {
  type: Phaser.WEBGL,
  width: 1280,
  height: 720,
  canvas: gameCanvas,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y:speedDown },
      debug: true
    }
  },
  scene: [GameScene]
}

const game = new Phaser.Game(config)