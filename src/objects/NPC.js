export default class NPC {
    constructor(scene, x, y, textureKey, name, dialog) {
        this.scene = scene;
        this.sprite = scene.physics.add.staticSprite(x, y, textureKey)
            .setScale(4)
            .refreshBody()
            .setOrigin(0.5, 0.5);
        this.sprite.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
        this.name = name;
        this.dialog = dialog;
    }

    interact() {
        console.log(`NPC ${this.name}: "${this.dialog}"`);
        let dialogModalElement = document.getElementById("dialog-modal");
        let dialoginterlocutorNameElement = document.getElementById("dialog-interlocutorName");
        let dialogTextElement = document.getElementById("dialog-text");


        if (dialogModalElement.style.display== "block"){
            this.scene.enableControls();
            dialoginterlocutorNameElement.textContent = "";
            dialogTextElement.textContent = "";
            dialogModalElement.style.display= "none";
        }
        else if (dialogModalElement.style.display== "none"){
            this.scene.resetControls();
            this.scene.disableControls();
            dialoginterlocutorNameElement.textContent = this.name;
            dialogTextElement.textContent = this.dialog;
            dialogModalElement.style.display= "block"
        }
    }
}