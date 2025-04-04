import { addObjectToInventory } from "../utils/inventoryUI.js";
import { searchObjectInInventory } from "../utils/inventoryUI.js";
import { displayInventoryNotification } from "../utils/inventoryUI.js";
import { toggleCookingInventory } from "../utils/cookingUI.js";



let displayNotification = false;

export default class NPC {
    constructor(scene, x, y, textureKey, name, dialog, ingredient, size) {
        this.scene = scene;

        const sizeMap = { small: 3, medium: 4, big: 5, xbig: 6, xxbig: 7 };
        this.size = sizeMap[size] ?? sizeMap['medium'];

        this.sprite = scene.physics.add.staticSprite(x, y, textureKey)
            .setScale(this.size)
            .refreshBody()
            .setOrigin(0.5, 0.5);
        this.sprite.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
        this.name = name;
        this.dialog = dialog;
        this.ingredient = ingredient;
    }

    interact() {
        //Interaccion COOKING
        if (this.name=="Stove"){
            toggleCookingInventory(this.scene.game.config.inventory, this.scene)
        }

        //Interaccion DIALOGO
        //MARK: MOVER esto a su propia funcion dialogUI()
        else {
            let dialogModalElement = document.getElementById("dialog-modal");
            let dialoginterlocutorNameElement = document.getElementById("dialog-interlocutorName");
            let dialogTextElement = document.getElementById("dialog-text");
            let dialogTextIndex = dialogTextElement.getAttribute("data-textIndex");

            if (dialogModalElement.style.display== "none"){ //empezar diálogo
                this.scene.resetControls("interact");
                this.scene.disableControls("interact");
                dialoginterlocutorNameElement.textContent = this.name;
                dialogTextElement.textContent = this.dialog.greetings;
                dialogTextElement.setAttribute("data-textIndex","0");
                dialogModalElement.style.display= "block"

            }
            
            else if (dialogModalElement.style.display== "block" && dialogTextIndex=="0"){ //segundo diálogo
                if(searchObjectInInventory(this.scene.game.config.inventory, this.ingredient) == false){
                    dialogTextElement.textContent = this.dialog.dialogues.give_object;
                    addObjectToInventory(this.scene.game.config.inventory, this.ingredient)
                    displayNotification = true;
                }
                else {
                    dialogTextElement.textContent = this.dialog.dialogues.object_given;
                }

                dialoginterlocutorNameElement.textContent = this.name;
                dialogTextElement.setAttribute("data-textIndex","1");
                dialogModalElement.style.display= "block"
            }

            else if (dialogModalElement.style.display== "block" && dialogTextIndex=="1"){ //cerrar diálogo
                this.scene.enableControls();
                dialoginterlocutorNameElement.textContent = "";
                dialogTextElement.textContent = "";
                dialogTextElement.setAttribute("data-textIndex","");
                dialogModalElement.style.display= "none";

                if (displayNotification == true){
                    displayNotification = false
                    displayInventoryNotification(this.ingredient);
                }
            }

        }

        
    }
}