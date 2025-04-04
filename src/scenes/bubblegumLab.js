import BaseScene from "./baseScene.js";

import NPC from "../objects/NPC.js";
import Player from "../objects/player.js";

import { npcData } from "../utils/NPCData.js";

export default class BubblegumLab extends BaseScene {
    constructor() {
        super("BubblegumLabScene");
    }

    preload() {

        this.load.json("npcDialogs", "/src/utils/dialogs.json");

        this.load.image('BubblegumLab_Tiles', "/assets/images/tiles/BubblegumLab_Tiles.png");
        this.load.tilemapTiledJSON('mapa', 'assets/maps/bubblegumLab.json');

        this.load.image('ChicleFront', '/assets/images/characters/chicle.png');
        this.load.image('CucumberPot', '/assets/images/objects/cucumberPot.png');

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

        const tilesetBubblegum = map.addTilesetImage('BubblegumLab_Tiles', 'BubblegumLab_Tiles');

        this.layers = {
            suelo: map.createLayer("Suelo", tilesetBubblegum, 0, 0).setScale(6),
            paredes: map.createLayer("Paredes", tilesetBubblegum, 0, 0).setScale(6),
            objetos: map.createLayer("Objetos", tilesetBubblegum, 0, 0).setScale(6)
        };

        this.layers.suelo.setDepth(-1);
        this.layers.paredes.setDepth(0);
        this.layers.objetos.setDepth(1);
    }

    createNPCs() {
        const npcDialogs = this.cache.json.get("npcDialogs");
        this.npcs = [];

        for (let key in npcData){
            if(npcData[key].scene === this.scene.key){
                let data = npcData[key];
            this.npcs.push(new NPC(this, data.x, data.y,data.textureKey,data.name,npcDialogs.npcs[key], data.ingredient, data.size));
            }
        }
        console.log("NPC's creados: ",this.npcs)
    }

    createPlayer() {
        this.player = new Player(this, 700, 150, this.cursors);
    }

    createCollisions() {
        this.npcs.forEach(npc => {
            this.physics.add.collider(this.player.sprite, npc.sprite);
        });
        // añadir la colisión a las capas
        Object.values(this.layers).forEach(layer => {
            this.physics.add.collider(this.player.sprite, layer);
            if(layer.layer.name !== 'Suelo'){
                layer.setCollisionByExclusion([-1]);
            }
        });
    }
}