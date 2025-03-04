import BaseScene from "./baseScene.js";

import NPC from "../objects/NPC.js";
import Player from "../objects/player.js";

export default class TravelingMap extends BaseScene{
    constructor(){
        super("TravelingMapScene");
    }

    preload(){

        this.load.image('Hills', "/assets/images/tiles/Hills.png");

        this.load.tilemapTiledJSON('mapa', 'assets/maps/prov_generalMap.json');

        this.load.spritesheet('assetMovimiento', '/assets/images/characters/assetMovimiento.png', { frameWidth: 17, frameHeight: 17 });
    }

    create() {
        this.createMap();
        this.createControls();
        // this.createNPCs();
        this.createPlayer();
        // this.createCollisions();
    }

    update() {
        this.player.update();
    }

    createMap(){
        const map = this.make.tilemap({ key: "mapa" });

        const tilesetHills = map.addTilesetImage('Hills', 'Hills');

        this.layers = {
            floor: map.createLayer("Floor",tilesetHills, 0, 0).setScale(6)
        }

        this.layers.floor.setDepth(0);

        this.layers.floor.setCollisionByProperty({ colision: true });
    }

    createPlayer() {
        this.player = new Player(this, 100, 450, this.cursors);
    }
}