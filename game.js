import Kitchen from './src/scenes/kitchen.js';

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
    scene: [Kitchen], // Se carga la escena principal
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