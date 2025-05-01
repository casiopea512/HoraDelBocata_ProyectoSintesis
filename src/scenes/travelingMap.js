import BaseScene from "./baseScene.js";

import Location from "../objects/location.js";
import Player from "../objects/player.js";

import { positionsScenesTravelingMap } from "../utils/positionsScenesTravelingMap.js";

export default class TravelingMap extends BaseScene{
    constructor(){
        super("TravelingMapScene");
    }

    preload(){
        this.load.image("MainMap_Tiles", "/assets/images/tiles/MainMap_Tiles.png");
        this.load.image('Hills', "/assets/images/tiles/Hills.png");
        this.load.tilemapTiledJSON('mainMapRework', 'assets/maps/mainMapRework.json');

        for (let location in positionsScenesTravelingMap) {
            const data = positionsScenesTravelingMap[location];
        this.load.image(location, data.imgPath); 
        }

        this.load.spritesheet('AssetMovimiento', '/assets/images/characters/assetMovimiento.png', { frameWidth: 17, frameHeight: 17 });
    }

    create() {
        this.createMap();
        this.scale.resize(1440, 770);
        this.createControls();
        this.createLocations();
        this.createPlayer();
        this.createCollisions();
        this.desiredSize = { width: 1440, height: 770 }; 
    }

    update() {
        this.player.update();
    }

    createMap(){
        const map = this.make.tilemap({ key: "mainMapRework" });

        const tilesetMainMap = map.addTilesetImage("MainMap_Tiles", "MainMap_Tiles");
        const tilesetHills = map.addTilesetImage('Hills', 'Hills');

        this.layers = {
            suelo: map.createLayer("Suelo",tilesetMainMap, 0, 0).setScale(6),
            boundries1: map.createLayer("Boundries1", tilesetHills, 0, 0).setScale(6),
            boundries2: map.createLayer("Boundries2", tilesetHills, 0, 0).setScale(6),
        }
   // Establecer los límites del mundo físico
   const worldWidth = map.widthInPixels * 6;  // multiplicamos por 6 porque es el scale que usas
   const worldHeight = map.heightInPixels * 6;
   this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

        this.layers.suelo.setDepth(0);
        this.layers.boundries1.setDepth(-1);
        this.layers.boundries2.setDepth(-1);

        this.layers.suelo.setCollisionByProperty({ colision: true });
    }

    createLocations(){
        this.locations = [];

        for (let key in positionsScenesTravelingMap) {
            let data = positionsScenesTravelingMap[key];
            this.locations.push(new Location(this, data.x, data.y, key, data.name, data.ingredient));
        }
    }

    createPlayer() {
        const postionToSpawn = Object.values(positionsScenesTravelingMap).find(scene => scene.sceneKey === this.game.config.previousScene).spawnPosition;
        
        let x = 750, y = 450;
        if(postionToSpawn){
            x = postionToSpawn.x;
            y = postionToSpawn.y;
        }

        this.player = new Player(this, x, y, this.cursors);
        this.player.sprite.setCollideWorldBounds(true); // Añade esta línea

    }

    createCollisions(){
        this.locations.forEach(location => {
            this.physics.add.collider(this.player.sprite, location.sprite);
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