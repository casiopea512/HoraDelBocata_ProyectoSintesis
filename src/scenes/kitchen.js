import BaseScene from "./baseScene.js";

import NPC from "../objects/NPC.js";
import Player from "../objects/player.js";

export default class Kitchen extends BaseScene {
    constructor() {
        super("KitchenScene");
    }

    preload() {
        this.load.image('Grass', "/assets/images/tiles/Grass.png");
        this.load.image('Water', "/assets/images/tiles/Water.png");
        this.load.image('TreesPlants', "/assets/images/objects/Basic_Grass_Biom_things.png");
        this.load.image('Hills', "/assets/images/tiles/Hills.png");
        this.load.tilemapTiledJSON('mapa', 'assets/maps/mapa1.json');

        this.load.image('finFront', '/assets/images/characters/finFront.png');
        this.load.image('bmoFront', '/assets/images/characters/BMOFront.png');

        this.load.spritesheet('assetMovimiento', '/assets/images/characters/assetMovimiento.png', { frameWidth: 17, frameHeight: 17 });
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
        this.npcs = [
            new NPC(this, 400, 300, 'finFront', 'Fin', "¡Hola, soy Fin!"),
            new NPC(this, 500, 300, 'bmoFront', 'BMO', "BMO dice: ¡Hola, amigo!")
        ];
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