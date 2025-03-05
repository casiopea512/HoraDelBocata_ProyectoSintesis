import scenes from './src/scenes/scenes.js';

const config = {
    type: Phaser.CANVAS,
    width: 1600,
    height: 1200,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: scenes,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        pixelArt: true,
    },
    renderer: {
        antialias: false
    }
};

const game = new Phaser.Game(config);