import BaseScene from "./baseScene.js";
import { positionsScenesTravelingMap } from "../utils/positionsScenesTravelingMap.js";

export default class TrompiHouse extends BaseScene {
    constructor() {
        super("TrompiHouseScene");
    }

    preload() {

        this.load.json("npcDialogs", "/src/utils/dialogs.json");

        this.load.image('TrompiHouse_Tiles', "/assets/images/tiles/TrompiHouse_Tiles.png");
        this.load.tilemapTiledJSON('mapa', 'assets/maps/trompiHouse.json');

        this.load.image('TrompiFront', '/assets/images/characters/trompi.png');
        this.load.image('JamonFront', '/assets/images/characters/jamon.png');

        this.load.spritesheet('AssetMovimiento', '/assets/images/characters/assetMovimiento.png', { frameWidth: 17, frameHeight: 17 });
    }

    create() {
        this.createMap();
        this.scale.resize(960, 674);
        this.createControls();
        this.createNPCs();

        const spawnPosition = positionsScenesTravelingMap.TrompiHouse.positionSpawnInScene;
        this.createPlayer(spawnPosition.x, spawnPosition.y);

        this.createCollisions();
        this.desiredSize = { width: 960, height: 674 }; 
        this.bindHelpButton();
        this.bindBackIndexButton();
    }

    update() {
        this.player.update();
    }

    createMap() {
        const map = this.make.tilemap({ key: "mapa" });

        const tilesetTrompiHouse = map.addTilesetImage('TrompiHouse_Tiles', 'TrompiHouse_Tiles');

        this.layers = {
            suelo: map.createLayer("Suelo", tilesetTrompiHouse, 0, 0).setScale(6),
            paredes: map.createLayer("Paredes", tilesetTrompiHouse, 0, 0).setScale(6),
            objetos: map.createLayer("Objetos", tilesetTrompiHouse, 0, 0).setScale(6)
        };

        this.layers.suelo.setDepth(-1);
        this.layers.paredes.setDepth(0);
        this.layers.objetos.setDepth(1);
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