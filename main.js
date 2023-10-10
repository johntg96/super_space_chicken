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
  }

  preload(){}
  create(){}
  update(){}
}

const config = {
  type: Phaser.WEBGL,
  width: 500,
  height: 500,
  canvas: gameCanvas,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y:speedDown },
      debug: true
    }
  },
  scene: [gameScene]
}

const game = new Phaser.Game(config)