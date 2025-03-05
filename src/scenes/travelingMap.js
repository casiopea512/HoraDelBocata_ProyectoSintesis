import BaseScene from "./baseScene.js";

import Location from "../objects/location.js";
import Player from "../objects/player.js";

export default class TravelingMap extends BaseScene{
    constructor(){
        super("TravelingMapScene");
    }

    preload(){
        this.load.image('Floor_tp', "/assets/images/tiles/Hills.png");
        this.load.tilemapTiledJSON('Mapa_tm', 'assets/maps/prov_generalMap.json');

        this.load.image('TreeHouse', '/assets/images/objects/treeHouse.png');
        this.load.image('Lake', '/assets/images/objects/lake.png');
        this.load.image('Cube', '/assets/images/objects/cube.png');

        this.load.spritesheet('AssetMovimiento', '/assets/images/characters/assetMovimiento.png', { frameWidth: 17, frameHeight: 17 });
    }

    create() {
        this.createMap();
        this.createControls();
        this.createLocations();
        this.createPlayer();
        this.createCollisions();
    }

    update() {
        this.player.update();
    }

    createMap(){
        const map = this.make.tilemap({ key: "Mapa_tm" });

        const tilesetHills = map.addTilesetImage('suelo', 'Floor_tp');

        this.layers = {
            suelo: map.createLayer("suelo",tilesetHills, 0, 0).setScale(6)
        }

        this.layers.suelo.setDepth(0);

        this.layers.suelo.setCollisionByProperty({ colision: true });
    }

    createLocations(){
        this.locations = [
            new Location(this, 400, 300, 'TreeHouse', 'Casa del árbol'),
            new Location(this, 500, 300, 'Lake', 'Lago de la casa del árbol'),
            new Location(this, 600, 300, 'Cube', 'Cubo de prismo')
        ];
    }

    createPlayer() {
        this.player = new Player(this, 100, 450, this.cursors);
    }

    createCollisions(){
        this.locations.forEach(location => {
            this.physics.add.collider(this.player.sprite, location.sprite);
        });

        this.physics.add.collider(this.player.sprite, this.layers.suelo);
    }
}