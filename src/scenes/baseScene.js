import NPC from "../objects/NPC.js";
import { npcData } from "../utils/NPCData.js";
import Player from "../objects/player.js";
import { renderHelp } from "../utils/helpUI.js";

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
            'showMap' : Phaser.Input.Keyboard.KeyCodes.M,
            'lookInventory' : Phaser.Input.Keyboard.KeyCodes.I,
            'lookHelp' : Phaser.Input.Keyboard.KeyCodes.H,
        });
    }

    disableControls(controlException) {
        for (let key in this.cursors) {
            if (key !== controlException) {
                this.cursors[key].enabled = false;
            }
        }
    }

    enableControls() {
        for (let key in this.cursors) {
            this.cursors[key].enabled = true;
        }
    }

    resetControls(controlException){ //hace que todas las teclas cuenten como NO presionadas
        for (let key in this.cursors) {
            if (key !== controlException) {
                this.cursors[key].reset(); 
            }
        }
    }
    
    createNPCs() {
        const npcDialogs = this.cache.json.get("npcDialogs");
        this.npcs = [];
        this.dynamicAssets = [];

        for (let key in npcData){
            if(npcData[key].scene === this.scene.key){
                let data = npcData[key];
                this.npcs.push(new NPC(this, data.x, data.y,data.textureKey,data.name,npcDialogs.npcs[key], data.ingredient, data.size, data.imgToChange ? data.imgToChange : undefined));

                if(npcData[key].imgToChange){
                    this.dynamicAssets.push(data.textureKey);
                }
            }
        }

        console.log("NPC's creados: ",this.npcs, " y estos assets dinámicos ",this.dynamicAssets);
    }

    createPlayer(x,y) {
        this.player = new Player(this, x, y, this.cursors);
    }
    
}