export default class BaseScene extends Phaser.Scene{
    constructor(sceneKey) {
        super(sceneKey);
    }

    // este método se ejecuta solo al inicializar una escena
    init() { 
        if (!this.game.config.previousScene) {
            this.game.config.previousScene = null;
        }
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

    disableControls() {
        for (let key in this.cursors) {
            if (key !== "interact") {
                this.cursors[key].enabled = false;
            }
        }
    }

    enableControls() {
        for (let key in this.cursors) {
            this.cursors[key].enabled = true;
        }
    }

    resetControls(){ //hace que todas las teclas cuenten como NO presionadas
        for (let key in this.cursors) {
            if (key !== "interact") {
                this.cursors[key].reset(); 
            }
        }
    }
    
    
}