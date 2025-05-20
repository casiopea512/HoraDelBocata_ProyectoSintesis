import BaseScene from "./baseScene.js";
import {switchSceneByCollision} from "../utils/switchScenes.js";
import { positionsScenesTravelingMap } from "../utils/positionsScenesTravelingMap.js";

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
        this.scale.resize(960, 578);
        this.createControls();
        this.createNPCs();

        const spawnPosition = positionsScenesTravelingMap.MarcelineHouse.positionSpawnInScene;
        this.createPlayer(spawnPosition.x, spawnPosition.y);

        this.createCollisions();
        this.desiredSize = { width: 960, height: 578 }; 
        this.bindHelpButton();
        this.bindBackIndexButton();
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

        // Callback para el tile de la puerta (id 22)
        this.layers.paredes.setTileIndexCallback(22, () => {
            switchSceneByCollision(this);
        }, this);
    }
}