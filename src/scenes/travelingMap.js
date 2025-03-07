import BaseScene from "./baseScene.js";

import Location from "../objects/location.js";
import Player from "../objects/player.js";

import { positionsScenesTravelingMap } from "../utils/positionsScenesTravelingMap.js";

export default class TravelingMap extends BaseScene{
    constructor(){
        super("TravelingMapScene");
    }

    preload(){
        this.load.image('Floor_tp', "/assets/images/tiles/Hills.png");
        this.load.tilemapTiledJSON('Mapa_tm', 'assets/maps/prov_generalMap.json');

        // this.load.image('TreeHouse', '/assets/images/objects/treeHouse.png');
        // this.load.image('Lake', '/assets/images/objects/lake.png');
        // this.load.image('Cube', '/assets/images/objects/cube.png');
        // this.load.image('MountainTp_toPrismo', '/assets/images/objects/mountainTP.png');
        // this.load.image('MountainTp_toOo', '/assets/images/objects/mountainTP.png');

        for (let location in positionsScenesTravelingMap) {
            const data = positionsScenesTravelingMap[location];  // Obtener el objeto completo
        this.load.image(location, data.imgPath); 
        }

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
        // this.locations = [
        //     new Location(this, 650, 250, 'TreeHouse', 'Casa del árbol'),
        //     new Location(this, 750, 250, 'Lake', 'Lago de la casa del árbol'),
        //     new Location(this, 1300, 650, 'Cube', 'Cubo de prismo'),
        //     new Location(this, 1300, 100, 'MountainTp_toPrismo', 'Montaña tp a prismo'),
        //     new Location(this, 1120, 650, 'MountainTp_toOo', 'Montaña de tp a Oo')
        // ];

        this.locations = [];

        for (let key in positionsScenesTravelingMap) {
            let data = positionsScenesTravelingMap[key];
            this.locations.push(new Location(this, data.x, data.y, key, data.name));
        }
    }

    createPlayer() {
        this.player = new Player(this, 1200, 100, this.cursors);
    }

    createCollisions(){
        this.locations.forEach(location => {
            this.physics.add.collider(this.player.sprite, location.sprite);
        });

        this.physics.add.collider(this.player.sprite, this.layers.suelo);
    }
}