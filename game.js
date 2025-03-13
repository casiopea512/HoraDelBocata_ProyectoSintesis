import scenes from './src/scenes/scenes.js';

const config = {
    type: Phaser.CANVAS,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: scenes,
    scale: {
        parent: "game",
        width: 1450,
        height: 780,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        pixelArt: true,
    },
    transparent: true,
    renderer: {
        antialias: false
    }
};

const game = new Phaser.Game(config);