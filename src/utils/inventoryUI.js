import { inventoryItems } from "./inventoryItems.js";
 
export function renderInventory(inventory) {
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

    // hardcodeado
    inventory["Bread"] = inventoryItems["Bread"];

    const inventoryList = document.getElementById("inventory-list");

    inventoryList.innerHTML = "";

    for (const key in inventory) {
        const item = inventory[key];

        let itemElement = document.createElement("div");
        itemElement.classList.add("inventory-item");
        itemElement.innerHTML = `<img src="${item.imgPath}" alt="${item.name}"><p>${item.name}</p>`;
        inventoryList.appendChild(itemElement);
    }
}