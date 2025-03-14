import { inventoryItems } from "./inventoryItems.js";
 
function renderInventory(scene,inventory) {
    const inventoryContainer = document.getElementById("inventory-modal");
    
    toggleInventory(scene,inventoryContainer,inventory);

}

function toggleInventory(scene,inventoryContainer,inventory) {
    if (inventoryContainer.style.display === "none" || !inventoryContainer.style.display) {
        inventoryContainer.style.display = "block";
        scene.resetControls("lookInventory");
        scene.disableControls("lookInventory");
        loadInventory(inventory);
    } else {
        scene.enableControls();
        inventoryContainer.style.display = "none";
    }
}

function loadInventory(inventory) {
    const inventoryList = document.getElementById("inventory-list");
    inventoryList.innerHTML = "";

    for (const keyInventoryItems in inventoryItems){

        let item = inventoryItems[keyInventoryItems];

        let itemElement = document.createElement("div");
        itemElement.classList.add("inventory-cell");
        itemElement.innerHTML = `<img class="lockedItem" src="${item.imgPath}" alt="${item.name}" id="${item.name}"/>`;
        inventoryList.appendChild(itemElement);

        
        for (const keyInventory in inventory){
            if ( keyInventory === keyInventoryItems ){
                console.log("Tengo este item: ",keyInventoryItems);

                const lockedItem = document.getElementById(inventory[keyInventory].name);
                if (lockedItem.classList.contains("lockedItem")) {
                    lockedItem.classList.remove("lockedItem");
                }

            }
        }
    }

    console.log(inventory)
}

function addObjectToInventory(inventory,object){
    if (!inventory[object]) {
        inventory[object] = inventoryItems[object];
    }
}

function searchObjectInInventory(inventory,object){
    if (inventory[object]){
        return true
    } else {
        return false
    }
}

function displayInventoryNotification(ingredient){
    document.getElementById("inventory-notification-text").textContent = "Has conseguido "+ inventoryItems[ingredient].name;
    document.getElementById("inventory-notification").style.display = "block";

    let timer = setTimeout(function (event) {
        document.getElementById("inventory-notification").style.display = "none"
    }, 2000);
}

export {renderInventory, addObjectToInventory, searchObjectInInventory, displayInventoryNotification};