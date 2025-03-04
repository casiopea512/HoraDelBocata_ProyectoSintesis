export default class NPC {
    constructor(scene, x, y, texture, name, dialog) {
        this.scene = scene;
        this.sprite = scene.physics.add.staticSprite(x, y, texture)
            .setScale(4)
            .setOrigin(0.5, 0.5);
        this.sprite.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
        this.name = name;
        this.dialog = dialog;
    }

    interact() {
        console.log(`NPC ${this.name}: "${this.dialog}"`);
    }
}