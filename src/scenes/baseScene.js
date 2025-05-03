import NPC from "../objects/NPC.js";
import { npcData } from "../utils/NPCData.js";
import Player from "../objects/player.js";
import { searchObjectInInventory } from "../utils/inventoryUI.js";

export default class BaseScene extends Phaser.Scene{
    constructor(sceneKey) {
        super(sceneKey);
    }

    // este método se ejecuta sólo al inicializar una escena
    init() { 
        if (!this.game.config.previousScene) {
            this.game.config.previousScene = null;
        }

        if (!this.game.config.inventory) {
            this.game.config.inventory = {};
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

            // comprobar si el npc es de la escena, si no lo es continua con la siguiente iteración
            const data = npcData[key];
            if (data.scene !== this.scene.key) continue;
            
            // comprueba si el ingrediente está en el inventario (renderizar el asset correcto)
            const hasIngredient = searchObjectInInventory(
                this.game.config.inventory,
                data.ingredient
            );

            // inicializa la textura que se va a usar
            const initialTextureKey = (
                data.imgToChange && hasIngredient
            ) ? data.imgToChange : data.textureKey;

            // añade al array de assets dinamicos el npc
            if (data.imgToChange) {
                this.dynamicAssets.push(data.textureKey);
            }

            if (data.interlocutorName) {
                this.interlocutorName = data.interlocutorName;
            }

            // instancia el npc
            const npc = new NPC(
                this,
                data.x,
                data.y,
                initialTextureKey,
                data.name,
                npcDialogs.npcs[key],
                data.ingredient,
                data.size,
                data.imgToChange,
                data.interlocutorName
            );
            
            // añade el npc al array de npcs
            this.npcs.push(npc);
        }

        console.log("NPC's creados: ",this.npcs, " y estos assets dinámicos ",this.dynamicAssets);
    }

    createPlayer(x,y) {
        this.player = new Player(this, x, y, this.cursors);
    }
    
}