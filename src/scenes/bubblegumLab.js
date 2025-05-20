import BaseScene from "./baseScene.js";
import {switchSceneByCollision} from "../utils/switchScenes.js";
import { positionsScenesTravelingMap } from "../utils/positionsScenesTravelingMap.js";

export default class BubblegumLab extends BaseScene {
    constructor() {
        super("BubblegumLabScene");
    }

    preload() {
        this.load.json("npcDialogs", "/src/utils/dialogs.json");

        this.load.image('BubblegumLab_Tiles', "/assets/images/tiles/BubblegumLab_Tiles.png");
        this.load.tilemapTiledJSON('mapa', 'assets/maps/bubblegumLab.json');

        this.load.image('ChicleFront', '/assets/images/characters/chicle.png');
        this.load.image('CucumberPot', '/assets/images/objects/cucumberPot.png');
        this.load.image('CucumberPotWithoutCucumber', '/assets/images/objects/cucumberPotWithoutCucumber.png');

        this.load.spritesheet('AssetMovimiento', '/assets/images/characters/assetMovimiento.png', { frameWidth: 17, frameHeight: 17 });
    }

    create() {
        this.createMap();
        this.scale.resize(960, 772);
        this.createControls();
        this.createNPCs();

        const spawnPosition = positionsScenesTravelingMap.BubblegumLab.positionSpawnInScene;
        this.createPlayer(spawnPosition.x, spawnPosition.y);
        
        this.createCollisions();
        this.desiredSize = { width: 960, height: 772 }; 
        this.bindHelpButton();
        this.bindBackIndexButton();
    }

    update() {
        this.player.update();
    }

    createMap() {
        const map = this.make.tilemap({ key: "mapa" });

        const tilesetBubblegum = map.addTilesetImage('BubblegumLab_Tiles', 'BubblegumLab_Tiles');

        this.layers = {
            suelo: map.createLayer("Suelo", tilesetBubblegum, 0, 0).setScale(6),
            paredes: map.createLayer("Paredes", tilesetBubblegum, 0, 0).setScale(6),
            objetos: map.createLayer("Objetos", tilesetBubblegum, 0, 0).setScale(6)
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

        // Callback para el tile de la puerta (id 22 y 23)
        this.layers.paredes.setTileIndexCallback([22,23], () => {
            switchSceneByCollision(this);
        }, this);
    }
}