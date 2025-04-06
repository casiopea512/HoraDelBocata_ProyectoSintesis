import BaseScene from "./baseScene.js";

export default class TreeHouse extends BaseScene {
    constructor() {
        super("TreeHouseScene");
    }

    preload() {

        this.load.json("npcDialogs", "/src/utils/dialogs.json");

        this.load.image('TreeHouse_Tiles', "/assets/images/tiles/TreeHouse_Tiles.png");
        this.load.tilemapTiledJSON('mapa', 'assets/maps/treeHouse.json');

        this.load.image('FinnFront', '/assets/images/characters/finnFront.png');
        this.load.image('BmoFront', '/assets/images/characters/BMOFront.png');
        this.load.image('Nest', '/assets/images/objects/nestWithEggs.png');
        this.load.image('NestWithoutEggs', '/assets/images/objects/nestWithoutEggs.png');
        this.load.image('Bird', '/assets/images/objects/bird.png');
        this.load.image('BirdWithoutBird', '/assets/images/objects/birdWithoutBird.png');
        this.load.image('Stove', '/assets/images/objects/stove.png');

        this.load.spritesheet('AssetMovimiento', '/assets/images/characters/assetMovimiento.png', { frameWidth: 17, frameHeight: 17 });
    }

    create() {
        this.createMap();
        this.createControls();
        this.createNPCs();
        this.createPlayer(810,130);
        this.createCollisions();
    }

    update() {
        this.player.update();
    }

    createMap() {
        const map = this.make.tilemap({ key: "mapa" });

        const TreeHouse_Tiles = map.addTilesetImage('TreeHouse_Tiles', 'TreeHouse_Tiles');

        this.layers = {
            suelo: map.createLayer("Suelo", TreeHouse_Tiles, 0, 0).setScale(6),
            paredes: map.createLayer("Paredes", TreeHouse_Tiles, 0, 0).setScale(6),
            objetos: map.createLayer("Objetos", TreeHouse_Tiles, 0, 0).setScale(6)
        };

        this.layers.suelo.setDepth(-1);
        this.layers.paredes.setDepth(0);
        this.layers.objetos.setDepth(0);
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