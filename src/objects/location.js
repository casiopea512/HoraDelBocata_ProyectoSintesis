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

    interact() {
        console.log(`Location ${this.name}`);
    }
}