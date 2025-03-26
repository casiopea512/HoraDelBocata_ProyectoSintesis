import { inventoryItems } from "./inventoryItems.js";
 
const cookingInventoryModal = document.getElementById("cooking-modal")

//PRINTAR COOKING MODAL
export function openCookingInventory(inventory, scene) {
    const cookingInventoryList = document.getElementById("cooking-list");
    cookingInventoryList.innerHTML = "";
    let allIngredientsCompleted = false;
    let ingredientsCount = 0;

    //recorremos todos los items y los vamos printando en su celda dentro del cooking modal
    for (const keyInventoryItems in inventoryItems){
        let item = inventoryItems[keyInventoryItems];
        let itemElement = document.createElement("div");
        itemElement.classList.add("cooking-cell");
        itemElement.innerHTML = `<img class="lockedItem" src="${item.imgPath}" alt="${item.name}" id="${item.name}_inventory"/>`;
        cookingInventoryList.appendChild(itemElement);
        
        for (const keyInventory in inventory){
            if ( keyInventory === keyInventoryItems ){ //de los items que ya hemos conseguido
                const lockedItem = document.getElementById(inventory[keyInventory].name+"_inventory");
                ingredientsCount +=1; //sumamos a la cuenta
                if (lockedItem.classList.contains("lockedItem")) {
                    lockedItem.classList.remove("lockedItem"); //le quitamos el filtro gris
                }
            }
        }
    }

    //IMPORTANTE !!!!!!!!!!!!!
    //MARK: CAMBIAR NUM
    //Ahora la condición es 1 ingredientes para testear, más tarde hay que cambiarlo
    if (ingredientsCount >= 1){
        allIngredientsCompleted = true;
    }


    //BOTON "X" CERRAR
    let closeCookingButton = document.getElementById("close-cooking");
    closeCookingButton.addEventListener("click", function () {
        cookingInventoryModal.style.display = 'none';
        scene.enableControls();
    });

    //BOTON COCINAR
    let cookButton = document.getElementById("cook-button");
    if (allIngredientsCompleted == false){
        cookButton.classList.add("lockedItem");
        cookButton.disabled = true;
    }
    else if (allIngredientsCompleted == true){
        if (cookButton.classList.contains("lockedItem")) {
            cookButton.classList.remove("lockedItem");
            cookButton.disabled = false;
        }
        cookButton.addEventListener("click", function (){
            cookSandwich(inventory) //cocinamos
            cookButton.disabled = true; //hacemos disabled el boton de cocinar
            cookButton.classList.add("lockedItem"); //ponemos el boton en gris
            document.querySelectorAll("#cooking-list .cooking-cell img").forEach(img => { //ponemos todo el inventario en gris
                img.classList.add("lockedItem");
            });
            console.log("COCINANDO SANDWICH")
            console.log(inventory)
        });
    }
}


//ABIR-CERRAR COOKING MODAL
export function toggleCookingInventory(inventory,scene) {
    if (cookingInventoryModal.style.display === "none" || !cookingInventoryModal.style.display) {
        cookingInventoryModal.style.display = "block";
        scene.resetControls("interact");
        scene.disableControls("interact");
        openCookingInventory(inventory,scene);
    } else {
        scene.enableControls();
        cookingInventoryModal.style.display = "none";
    }
}



//FUNCION DE COCINAR EL BOCATA
export function cookSandwich(inventory){
    Object.keys(inventory).forEach(key => { //vaciamos inventario
        delete inventory[key];
    });
    inventory["Sandwich"] = { name: "Bocata", imgPath: "/assets/images/objects/sandwich.png" };
}

