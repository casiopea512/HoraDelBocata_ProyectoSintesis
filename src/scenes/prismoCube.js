import BaseScene from "./baseScene.js";

import NPC from "../objects/NPC.js";
import Player from "../objects/player.js";

import { npcData } from "../utils/NPCData.js";

export default class PrismoCube extends BaseScene {
    constructor() {
        super("PrismoCubeScene");
    }

    preload() {

        this.load.json("npcDialogs", "/src/utils/dialogs.json");

        this.load.image('Wooden_House_Walls_Tilset', "/assets/images/tiles/Wooden_House_Walls_Tilset.png");
        this.load.tilemapTiledJSON('mapa', 'assets/maps/prismoCube.json');

        this.load.image('FinnFront', '/assets/images/characters/finFront.png');
        this.load.image('BmoFront', '/assets/images/characters/BMOFront.png');

        this.load.spritesheet('AssetMovimiento', '/assets/images/characters/assetMovimiento.png', { frameWidth: 17, frameHeight: 17 });
    }

    create() {
        this.createMap();
        this.createControls();
        this.createNPCs();
        this.createPlayer();
        this.createCollisions();
    }

    update() {
        this.player.update();
    }

    createMap() {
        const map = this.make.tilemap({ key: "mapa" });

        const tilesetHouse = map.addTilesetImage('Wooden_House_Walls_Tilset', 'Wooden_House_Walls_Tilset');

        this.layers = {
            suelo: map.createLayer("Suelo", tilesetHouse, 0, 0).setScale(6),
            paredes: map.createLayer("Paredes", tilesetHouse, 0, 0).setScale(6),
        };

        this.layers.suelo.setDepth(-1);
        this.layers.paredes.setDepth(0);

        this.layers.suelo.setCollisionByProperty({ colision: true });
    }

    createNPCs() {
        const npcDialogs = this.cache.json.get("npcDialogs");
        this.npcs = [];

        for (let key in npcData){
            if(npcData[key].scene === this.scene.key){
                let data = npcData[key];
            this.npcs.push(new NPC(this, data.x, data.y,data.textureKey,data.name,npcDialogs.npcs[key]));
            }
        }
        console.log("NPC's creados: ",this.npcs)
    }

    createPlayer() {
        this.player = new Player(this, 100, 450, this.cursors);
    }

    createCollisions() {
        this.npcs.forEach(npc => {
            this.physics.add.collider(this.player.sprite, npc.sprite);
        });
        this.physics.add.collider(this.player.sprite, this.layers.suelo);
    }
}