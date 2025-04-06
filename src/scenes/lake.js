import BaseScene from "./baseScene.js";

export default class Lake extends BaseScene {
    constructor() {
        super("LakeScene");
    }

    preload() {

        this.load.json("npcDialogs", "/src/utils/dialogs.json");

        this.load.image('Water', "/assets/images/tiles/Water.png");
        this.load.image('TreesPlants', "/assets/images/objects/Basic_Grass_Biom_things.png");
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
        const tilesetWater = map.addTilesetImage('Water', 'Water');
        const tilesetObjects = map.addTilesetImage('TreesPlants', 'TreesPlants');

        this.layers = {
            suelo: map.createLayer("Suelo", tilesetHills, 0, 0).setScale(6),
            water: map.createLayer("Water", tilesetWater, 0, 0).setScale(6),
            objetos: map.createLayer("Objetos", tilesetObjects, 0, 0).setScale(6)
        };

        this.layers.water.setDepth(-1);
        this.layers.suelo.setDepth(0);
        this.layers.objetos.setDepth(1);

        this.layers.suelo.setCollisionByProperty({ colision: true });
        this.layers.objetos.setCollisionByProperty({ colision: true });
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