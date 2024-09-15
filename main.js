import './style.css'
import Phaser from 'phaser'

const sizes = {
  width: 500,
  height: 500
}

const speedDown = 300;

// https://www.codeandweb.com/texturepacker/tutorials/how-to-create-sprite-sheets-for-phaser3

class GameScene extends Phaser.Scene {
  constructor() {
    super("scene-game")
    this.player
    this.cursor
    this.playerSpeed = speedDown + 50
  }

  preload(){
    this.load.image("bg", "/assets/space_bg.jpg")
    // this.load.image("super_space_chicken", "/assets/super_space_chicken_smallest.png")

    this.load.multiatlas("super_space_chicken", "/assets/spritesheets/super_space_chicken.json", "/assets/spritesheets")
  }
  create(){
    this.add.image(0, 0, "bg").setOrigin(0, 0)
    this.player = this.physics.add.sprite(20, sizes.height / 2, "super_space_chicken").setOrigin(0, 0)
    this.player.setImmovable(true)
    this.player.body.allowGravity = false
    this.player.setCollideWorldBounds(true)

    this.cursor = this.input.keyboard.createCursorKeys()

    const frameNames = this.anims.generateFrameNames("super_space_chicken", {
      start: 1, end: 4, zeroPad: 2,
      prefix: 'fly/', suffix: '.png'
    })

    this.anims.create({ key: 'super_space_chicken', frames: frameNames, frameRate: 10, repeat: -1 });
    this.player.anims.play('super_space_chicken');

    
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
  width: 960,
  height: 540,
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