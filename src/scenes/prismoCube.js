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

        this.load.image('PrismoCube_Tiles', "/assets/images/tiles/PrismoCube_Tiles.png");
        this.load.tilemapTiledJSON('mapa', 'assets/maps/prismoCube.json');

        this.load.image('PrismoFront', '/assets/images/characters/prismo.png');

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

        const tilesetPrismo = map.addTilesetImage('PrismoCube_Tiles', 'PrismoCube_Tiles');

        this.layers = {
            suelo: map.createLayer("Suelo", tilesetPrismo, 0, 0).setScale(6),
            paredes: map.createLayer("Paredes", tilesetPrismo, 0, 0).setScale(6),
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
            this.npcs.push(new NPC(this, data.x, data.y,data.textureKey,data.name,npcDialogs.npcs[key], data.ingredient, data.size));
            }
        }
        console.log("NPC's creados: ",this.npcs)
    }

    createPlayer() {
        this.player = new Player(this, 900, 300, this.cursors);
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