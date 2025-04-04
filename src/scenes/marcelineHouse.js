import BaseScene from "./baseScene.js";

import NPC from "../objects/NPC.js";
import Player from "../objects/player.js";

import { npcData } from "../utils/NPCData.js";

export default class MarcelineHouse extends BaseScene {
    constructor() {
        super("MarcelineHouseScene");
    }

    preload() {

        this.load.json("npcDialogs", "/src/utils/dialogs.json");

        this.load.image('MarcelineHouse_Tiles', "/assets/images/tiles/MarcelineHouse_Tiles.png");
        this.load.tilemapTiledJSON('mapa', 'assets/maps/marcelineHouse.json');

        this.load.image('MarcelineFront', '/assets/images/characters/marceline.png');
        this.load.image('FridgeMarceline', '/assets/images/objects/fridge.png');

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

        const MarcelineHouse_Tiles = map.addTilesetImage('MarcelineHouse_Tiles', 'MarcelineHouse_Tiles');

        this.layers = {
            suelo: map.createLayer("Suelo", MarcelineHouse_Tiles, 0, 0).setScale(6),
            paredes: map.createLayer("Paredes", MarcelineHouse_Tiles, 0, 0).setScale(6),
            objetos: map.createLayer("Objetos", MarcelineHouse_Tiles, 0, 0).setScale(6)
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