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
        let dialogModalElement = document.getElementById("dialog-modal");
        let dialoginterlocutorNameElement = document.getElementById("dialog-interlocutorName");
        let dialogTextElement = document.getElementById("dialog-text");
        let dialogTextIndex = dialogTextElement.getAttribute("data-textIndex");


        if (dialogModalElement.style.display== "none"){ //empezar diálogo
            this.scene.resetControls();
            this.scene.disableControls();
            dialoginterlocutorNameElement.textContent = this.name;
            dialogTextElement.textContent = this.dialog.greetings;
            dialogTextElement.setAttribute("data-textIndex","0");
            dialogModalElement.style.display= "block"
        }
        else if (dialogModalElement.style.display== "block" && dialogTextIndex=="0"){ //segundo diálogo
            dialoginterlocutorNameElement.textContent = this.name;
            dialogTextElement.textContent = this.dialog.dialogues.give_object;
            dialogTextElement.setAttribute("data-textIndex","1");
            dialogModalElement.style.display= "block"
        }
        else if (dialogModalElement.style.display== "block" && dialogTextIndex=="1"){ //cerrar diálogo
            this.scene.enableControls();
            dialoginterlocutorNameElement.textContent = "";
            dialogTextElement.textContent = "";
            dialogTextElement.setAttribute("data-textIndex","");
            dialogModalElement.style.display= "none";
        }
        
    }
}