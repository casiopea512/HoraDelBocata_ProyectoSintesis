import { toggleShowHelpButton } from "./helpUI.js";
import { inventoryItems } from "./inventoryItems.js";
 
function renderInventory(scene,inventory) {
    const inventoryContainer = document.getElementById("inventory-modal");

    // añadir el evento de cerrar el modal y de habilitar las teclas al botón 'cerrar inventario'
    const buttonCloseInventory = document.getElementById('close-inventory');
    if (buttonCloseInventory && buttonCloseInventory.dataset.eventAdded !== "true") {
        buttonCloseInventory.addEventListener("click", function () {
            scene.enableControls();
            document.getElementById("inventory-modal").style.display = 'none';
        });

        buttonCloseInventory.dataset.eventAdded = "true";
    }
    
    toggleInventory(scene,inventoryContainer,inventory);

}

function toggleInventory(scene,inventoryContainer,inventory) {
    if (inventoryContainer.style.display === "none" || !inventoryContainer.style.display) {
        inventoryContainer.style.display = "block";
        toggleShowHelpButton();
        scene.resetControls("lookInventory");
        scene.disableControls("lookInventory");
        loadInventory(inventory);
        enableInventoryNavigation();
    } else {
        scene.enableControls();
        inventoryContainer.style.display = "none";
        disableInventoryNavigation();
        toggleShowHelpButton();
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
    let itemElement = document.createElement("div");
    itemElement.classList.add("inventory-cell");
    itemElement.innerHTML = `<img />`;
    inventoryList.appendChild(itemElement);

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


// Movimiento en el inventario con las flechas
let selectedIndex = 0;
const columns = 7;

function enableInventoryNavigation() {
    const cells = document.querySelectorAll(".inventory-cell");
    if (cells.length === 0) return;

    // Quitar cualquier clase 'selected' previa
    cells.forEach(cell => cell.classList.remove("selected"));

    // Asegurar que al abrir inventario, el primer elemento esté seleccionado
    selectedIndex = 0;
    cells[selectedIndex].classList.add("selected");

    document.addEventListener("keydown", handleInventoryNavigation);
}

function handleInventoryNavigation(event) {
    const cells = document.querySelectorAll(".inventory-cell");
    if (cells.length === 0) return;

    // Quitar clase actual
    cells[selectedIndex].classList.remove("selected");

    if (event.key === "ArrowRight") {
        if ((selectedIndex + 1) < cells.length) selectedIndex++;
    }
    if (event.key === "ArrowLeft") {
        if ((selectedIndex - 1) >= 0) selectedIndex--;
    }
    if (event.key === "ArrowDown") {
        if ((selectedIndex + columns) < cells.length) selectedIndex += columns;
    }
    if (event.key === "ArrowUp") {
        if ((selectedIndex - columns) >= 0) selectedIndex -= columns;
    }

    cells[selectedIndex].classList.add("selected");
}

function disableInventoryNavigation() {
    document.removeEventListener("keydown", handleInventoryNavigation);
}


export {renderInventory, addObjectToInventory, searchObjectInInventory, displayInventoryNotification};