import BaseScene from "./baseScene.js";

import NPC from "../objects/NPC.js";
import Player from "../objects/player.js";

import { npcData } from "../utils/NPCData.js";

export default class TestMap extends BaseScene {
    constructor() {
        super("TestMapScene");
    }

    preload() {

        this.load.json("npcDialogs", "/src/utils/dialogs.json");

        this.load.image('Grass', "/assets/images/tiles/Grass.png");
        this.load.image('Water', "/assets/images/tiles/Water.png");
        this.load.image('TreesPlants', "/assets/images/objects/Basic_Grass_Biom_things.png");
        this.load.image('Hills', "/assets/images/tiles/Hills.png");
        this.load.tilemapTiledJSON('mapa', 'assets/maps/mapa1.json');

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

        const tilesetGrass = map.addTilesetImage('Grass', 'Grass');
        const tilesetHills = map.addTilesetImage('Hills', 'Hills');
        const tilesetWater = map.addTilesetImage('Water', 'Water');
        const tilesetObjects = map.addTilesetImage('TreesPlants', 'TreesPlants');

        this.layers = {
            suelo: map.createLayer("Suelo", [tilesetGrass, tilesetHills], 0, 0).setScale(6),
            water: map.createLayer("Water", tilesetWater, 0, 0).setScale(6),
            objetos: map.createLayer("Objetos", tilesetObjects, 0, 0).setScale(6)
        };

        this.layers.water.setDepth(-1);
        this.layers.suelo.setDepth(0);
        this.layers.objetos.setDepth(1);

        this.layers.suelo.setCollisionByProperty({ colision: true });
        this.layers.objetos.setCollisionByProperty({ colision: true });
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
        this.physics.add.collider(this.player.sprite, this.layers.objetos);
        this.layers.objetos.setCollisionBetween(9,11)
    }
}