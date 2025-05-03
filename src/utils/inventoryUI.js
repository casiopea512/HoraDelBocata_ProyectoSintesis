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

    const totalItems = cells.length;
    const rows = Math.ceil(totalItems / columns);
    const currentRow = Math.floor(selectedIndex / columns);
    const currentCol = selectedIndex % columns;

    // Quitar clase actual
    cells[selectedIndex].classList.remove("selected");

    switch (event.key) {
        case "ArrowRight": {
            let nextCol = (currentCol + 1) % columns;
            let nextIndex = currentRow * columns + nextCol;
            if (nextIndex >= totalItems) nextIndex = currentRow * columns;
            selectedIndex = nextIndex;
            break;
        }

        case "ArrowLeft": {
            let nextCol = (currentCol - 1 + columns) % columns;
            let nextIndex = currentRow * columns + nextCol;
            if (nextIndex >= totalItems) {
                // Si no hay celda en esa columna, ir a la última columna válida de esta fila
                nextIndex = Math.min(totalItems - 1, currentRow * columns + columns - 1);
            }
            selectedIndex = nextIndex;
            break;
        }

        case "ArrowDown": {
            let nextRow = (currentRow + 1) % rows;
            let nextIndex = nextRow * columns + currentCol;
            if (nextIndex >= totalItems) nextIndex = currentCol;
            selectedIndex = nextIndex;
            break;
        }

        case "ArrowUp": {
            let nextRow = (currentRow - 1 + rows) % rows;
            let nextIndex = nextRow * columns + currentCol;
            if (nextIndex >= totalItems) nextIndex = currentCol;
            selectedIndex = nextIndex;
            break;
        }
    }

    cells[selectedIndex].classList.add("selected");
}

function disableInventoryNavigation() {
    document.removeEventListener("keydown", handleInventoryNavigation);
}


export {renderInventory, addObjectToInventory, searchObjectInInventory, displayInventoryNotification};