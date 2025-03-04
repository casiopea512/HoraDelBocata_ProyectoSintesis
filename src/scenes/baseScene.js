export default class BaseScene extends Phaser.Scene{
    constructor(sceneKey) {
        super(sceneKey);
    }

    createControls() {
        this.cursors = this.input.keyboard.addKeys({
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D,
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'interact': Phaser.Input.Keyboard.KeyCodes.E,
            'showMap' : Phaser.Input.Keyboard.KeyCodes.M
        });
    }
}