import { inventoryItems } from "./inventoryItems.js";
 

export function openCookingInventory(inventory, scene) {
    scene.resetControls("interact");
    scene.disableControls("interact");
    console.log("Abriendo COOKING INVENTORY")
    const cookingInventoryList = document.getElementById("cooking-list");
    cookingInventoryList.innerHTML = "";
    let allIngredientsCompleted = false;
    let ingredientsCount = 0;

    for (const keyInventoryItems in inventoryItems){
        let item = inventoryItems[keyInventoryItems];
        let itemElement = document.createElement("div");
        itemElement.classList.add("cooking-cell");
        itemElement.innerHTML = `<img class="lockedItem" src="${item.imgPath}" alt="${item.name}" id="${item.name}_inventory"/>`;
        cookingInventoryList.appendChild(itemElement);
        
        for (const keyInventory in inventory){
            if ( keyInventory === keyInventoryItems ){
                const nombreItem = inventory[keyInventory].name+"_inventory"
                const lockedItem = document.getElementById(nombreItem);
                ingredientsCount +=1;
                if (lockedItem.classList.contains("lockedItem")) {
                    lockedItem.classList.remove("lockedItem");
                }
            }
        }

        let cookingInventory = document.getElementById("cooking-modal")
        cookingInventory.style.display = "block";
    }

    //IMPORTANTE !!!!!!!!!!!!!
    //MARK: CAMBIAR NUM
    //Ahora la condición es 2 ingredientes para testear, más tarde hay que cambiarlo
    if (ingredientsCount >= 2){
        allIngredientsCompleted = true;
    }


    //BOTON "X" CERRAR
    let closeCookingButton = document.getElementById("close-cooking");
    closeCookingButton.addEventListener("click", function () {
        document.getElementById("cooking-modal").style.display = 'none';
        scene.enableControls();
    });

    //BOTON COCINAR
    let cookButton = document.getElementById("cook-button");
    if (allIngredientsCompleted == false){
        cookButton.disabled= true;
    }
    else if (allIngredientsCompleted == true){
        cookButton.disabled= false;
        cookButton.addEventListener("click", function (){
            console.log("INTRODUCIR AQUI FUNCION DE BOCATA COCINAR")
        });
    }
  

}

