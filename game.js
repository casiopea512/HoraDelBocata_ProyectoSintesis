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
        width: 1440,
        height: 870,
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.NONE,
        pixelArt: true,
    },
    transparent: true,
    renderer: {
        antialias: false
    }
};

const game = new Phaser.Game(config);