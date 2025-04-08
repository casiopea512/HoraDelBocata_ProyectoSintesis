import BaseScene from "./baseScene.js";

export default class Lake extends BaseScene {
    constructor() {
        super("LakeScene");
    }

    preload() {

        this.load.json("npcDialogs", "/src/utils/dialogs.json");

        this.load.image('Water', "/assets/images/tiles/Water.png");
        this.load.image('Grass', "/assets/images/tiles/Grass.png");
        this.load.image('Hills', "/assets/images/tiles/Hills.png");
        this.load.tilemapTiledJSON('mapa', 'assets/maps/lake.json');

        this.load.image('LobsterWatter', '/assets/images/objects/lobsterWatter.png');
        this.load.image('LobsterWithoutLobster', '/assets/images/objects/lobsterWithoutLobster.png');
        this.load.image('RosemaryThymePot', '/assets/images/objects/rosemaryThymePot.png');

        this.load.spritesheet('AssetMovimiento', '/assets/images/characters/assetMovimiento.png', { frameWidth: 17, frameHeight: 17 });
    }

    create() {
        this.createMap();
        this.createControls();
        this.createNPCs();
        this.createPlayer(100,100);
        this.createCollisions();
    }

    update() {
        this.player.update();
    }

    createMap() {
        const map = this.make.tilemap({ key: "mapa" });

        const tilesetHills = map.addTilesetImage('Hills', 'Hills');
        const tilesetGrass = map.addTilesetImage('Grass', 'Grass');
        const tilesetObjects = map.addTilesetImage('Water', 'Water');

        this.layers = {
            suelo: map.createLayer("Suelo", [tilesetHills,tilesetGrass], 0, 0).setScale(6),
            objetos: map.createLayer("Objetos", tilesetObjects, 0, 0).setScale(6),
            boundaries: map.createLayer("Boundaries", tilesetGrass, 0, 0).setScale(6),
        };

        this.layers.suelo.setDepth(0);
        this.layers.objetos.setDepth(-1);
        this.layers.boundaries.setDepth(-1);
    }

    createCollisions() {
        this.physics.add.collider(this.player.sprite, this.layers.boundaries);
        this.layers.boundaries.setCollisionByExclusion([-1]);
        
        this.npcs.forEach(npc => {
            this.physics.add.collider(this.player.sprite, npc.sprite);
        });
        // añadir la colisión a las capas
        // Object.values(this.layers).forEach(layer => {
        //     this.physics.add.collider(this.player.sprite, layer);
        //     if(layer.layer.name !== 'Suelo'){
        //         layer.setCollisionByExclusion([-1]);
        //     }
        // });
        
        
    }
}