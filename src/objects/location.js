import { positionsScenesTravelingMap } from "../utils/positionsScenesTravelingMap.js";

export default class Location{
    constructor (scene,x, y, textureKey, name){
        this.scene = scene;
        this.sprite = scene.physics.add.staticSprite(x, y, textureKey)
            .setScale(4)
            .refreshBody()
            .setOrigin(0.5, 0.5);
        this.sprite.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
        this.name = name;
        this.key = textureKey;
    }

    interact(player, touchingLocation) {

        const locationData = positionsScenesTravelingMap[touchingLocation.key];

        if(locationData && locationData.targetPosition){
            player.sprite.setPosition(locationData.targetPosition.x, locationData.targetPosition.y);
        }

        else if (locationData && locationData.sceneKey) {
            this.scene.scene.stop();
            this.scene.cache.tilemap.remove('mapa');
            this.scene.scene.start(locationData.sceneKey);
        }
    }
}