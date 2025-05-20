import BaseScene from "./baseScene.js";
import { positionsScenesTravelingMap } from "../utils/positionsScenesTravelingMap.js";

export default class Lake extends BaseScene {
    constructor() {
        super("LakeScene");
    }

    preload() {

        this.load.json("npcDialogs", "/src/utils/dialogs.json");

        this.load.image('Water', "/assets/images/tiles/Water.png");
        this.load.image('Grass', "/assets/images/tiles/Grass.png");
        this.load.image('Hills', "/assets/images/tiles/Hills.png");
        this.load.image('Lake_Tiles', "/assets/images/tiles/Lake_Tiles.png");
        this.load.tilemapTiledJSON('mapa', 'assets/maps/lake.json');

        this.load.image('LobsterWatter', '/assets/images/objects/lobsterWatter.png');
        this.load.image('LobsterWithoutLobster', '/assets/images/objects/lobsterWithoutLobster.png');
        this.load.image('RosemaryThymePot', '/assets/images/objects/rosemaryThymePot.png');

        this.load.spritesheet('AssetMovimiento', '/assets/images/characters/assetMovimiento.png', { frameWidth: 17, frameHeight: 17 });
    }

    create() {
        this.createMap();
        this.scale.resize(1346, 866);
        this.createControls();
        this.createNPCs();

        const spawnPosition = positionsScenesTravelingMap.Lake.positionSpawnInScene;
        this.createPlayer(spawnPosition.x, spawnPosition.y);

        this.createCollisions();
        this.desiredSize = { width: 1346, height: 866 }; 
        this.bindHelpButton();
        this.bindBackIndexButton();
    }

    update() {
        this.player.update();
    }

    createMap() {
        const map = this.make.tilemap({ key: "mapa" });

        const tilesetHills = map.addTilesetImage('Hills', 'Hills');
        const tilesetGrass = map.addTilesetImage('Grass', 'Grass');
        const lake_Tiles = map.addTilesetImage('Lake_Tiles', 'Lake_Tiles');
        const tilesetWatter = map.addTilesetImage('Water', 'Water');

        this.layers = {
            suelo: map.createLayer("Suelo", [tilesetHills,tilesetGrass], 0, 0).setScale(6),
            water: map.createLayer("Water", tilesetWatter, 0, 0).setScale(6),
            objetos: map.createLayer("Objetos", lake_Tiles, 0, 0).setScale(6),
            boundaries: map.createLayer("Boundaries", tilesetGrass, 0, 0).setScale(6),
        };

        this.layers.objetos.setDepth(1);
        this.layers.suelo.setDepth(0);
        this.layers.water.setDepth(-1);
        this.layers.boundaries.setDepth(-1);
    }

    createCollisions() {
        this.npcs.forEach(npc => {
            this.physics.add.collider(this.player.sprite, npc.sprite);
        });

        // añadir la colisión a las capas
        Object.values(this.layers).forEach(layer => {
            if(layer.layer.name !== 'Suelo' &&  layer.layer.name !== 'Water'){
                this.physics.add.collider(this.player.sprite, layer);
                layer.setCollisionByExclusion([-1]);
            }
        });
    }
}