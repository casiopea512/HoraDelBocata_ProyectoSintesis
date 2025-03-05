import BaseScene from "./baseScene.js";

import NPC from "../objects/NPC.js";
import Player from "../objects/player.js";

export default class TravelingMap extends BaseScene{
    constructor(){
        super("TravelingMapScene");
    }

    preload(){

        this.load.image('floor_tp', "/assets/images/tiles/Hills.png");

        this.load.tilemapTiledJSON('Mapa_tm', 'assets/maps/prov_generalMap.json');

        this.load.spritesheet('assetMovimiento', '/assets/images/characters/assetMovimiento.png', { frameWidth: 17, frameHeight: 17 });
    }

    create() {
        this.createMap();
        this.createControls();
        // this.createNPCs();
        this.createPlayer();
        this.createCollisions();
    }

    update() {
        this.player.update();
    }

    createMap(){
        const map = this.make.tilemap({ key: "Mapa_tm" });

        const tilesetHills = map.addTilesetImage('suelo', 'floor_tp');

        this.layers = {
            suelo: map.createLayer("suelo",tilesetHills, 0, 0).setScale(6)
        }

        this.layers.suelo.setDepth(0);

        this.layers.suelo.setCollisionByProperty({ colision: true });
    }

    createPlayer() {
        this.player = new Player(this, 100, 450, this.cursors);
    }

    createCollisions(){
        this.physics.add.collider(this.player.sprite, this.layers.suelo);
    }
}