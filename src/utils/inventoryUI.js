import { inventoryItems } from "./inventoryItems.js";
 
function renderInventory(inventory) {
    const inventoryContainer = document.getElementById("inventory-modal");
    
    toggleInventory(inventoryContainer,inventory);

}

function toggleInventory(inventoryContainer,inventory) {
    if (inventoryContainer.style.display === "none" || !inventoryContainer.style.display) {
        inventoryContainer.style.display = "block";
        loadInventory(inventory);
    } else {
        inventoryContainer.style.display = "none";
    }
}

function loadInventory(inventory) {
    const inventoryList = document.getElementById("inventory-list");

    // inventory["Bread"] = inventoryItems["Bread"];

    for (const key in inventory) {
        const item = inventory[key];

        let itemElement = document.createElement("div");
        itemElement.classList.add("inventory-item");
        itemElement.innerHTML = `<img src="${item.imgPath}" alt="${item.name}"><p>${item.name}</p>`;
        inventoryList.appendChild(itemElement);
    }

    console.log(inventory)
}

function addToInventory(inventory,object){
    if (!inventory[object]) {
        inventory[object] = inventoryItems[object];
    }
}

export {renderInventory, addToInventory};