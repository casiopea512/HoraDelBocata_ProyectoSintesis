import { toggleShowHelpButton } from "./helpUI.js";
import { inventoryItems } from "./inventoryItems.js";

let selectedIndex = 0;
const columns = 7;
const rows = 2;
const totalCells = rows * columns;

let currentCloseHandler = null;

function handleCloseInventory(scene) {
    return function () {
        disableInventoryNavigation();
        console.log("CERRANDO INVENTARIO");
        scene.enableControls();
        document.getElementById("inventory-modal").style.display = 'none';
        if (scene.scene.key !== "TravelingMapScene") {
            toggleShowHelpButton();
        }
    };
}

function renderInventory(scene, inventory) {
    const inventoryContainer = document.getElementById("inventory-modal");
    const buttonCloseInventory = document.getElementById("close-inventory");

    if (buttonCloseInventory) {
        if (currentCloseHandler) {
            buttonCloseInventory.removeEventListener("click", currentCloseHandler);
        }

        currentCloseHandler = handleCloseInventory(scene);
        buttonCloseInventory.addEventListener("click", currentCloseHandler);
    }

    toggleInventory(scene, inventoryContainer, inventory);
}

function toggleInventory(scene, inventoryContainer, inventory) {
    if (inventoryContainer.style.display === "none" || !inventoryContainer.style.display) {
        inventoryContainer.style.display = "block";
        scene.resetControls("lookInventory");
        scene.disableControls("lookInventory");
        loadInventory(inventory);
        enableInventoryNavigation();
    } else {
        scene.enableControls();
        inventoryContainer.style.display = "none";
        disableInventoryNavigation();
    }
    if (scene.scene.key !== "TravelingMapScene") {
        toggleShowHelpButton();
    }
}

function loadInventory(inventory) {
    const inventoryList = document.getElementById("inventory-list");
    inventoryList.innerHTML = "";

    for (const keyInventoryItems in inventoryItems) {
        let item = inventoryItems[keyInventoryItems];
        let itemElement = document.createElement("div");
        itemElement.classList.add("inventory-cell");
        itemElement.innerHTML = `<img class="lockedItem" src="${item.imgPath}" alt="${item.name}" id="${item.name}"/>`;
        inventoryList.appendChild(itemElement);

        for (const keyInventory in inventory) {
            if (keyInventory === keyInventoryItems) {
                console.log("Tengo este item: ", keyInventoryItems);
                const lockedItem = document.getElementById(inventory[keyInventory].name);
                if (lockedItem.classList.contains("lockedItem")) {
                    lockedItem.classList.remove("lockedItem");
                }
            }
        }
    }

    for (let i = inventoryList.children.length; i < totalCells; i++) {
        let itemElement = document.createElement("div");
        itemElement.classList.add("inventory-cell");
        itemElement.innerHTML = `<img />`;
        inventoryList.appendChild(itemElement);
    }

    const allCells = document.querySelectorAll(".inventory-cell");
    if (allCells.length > 0) {
        selectedIndex = 0;
        allCells[selectedIndex].classList.add("selected");

        const selectedImg = allCells[selectedIndex].querySelector("img");
        const selectedItemText = document.getElementById("inventory-selected-item");
        selectedItemText.textContent = selectedImg && selectedImg.id ? selectedImg.id : "";
    }

    console.log(inventory);
}

function addObjectToInventory(inventory, object) {
    if (!inventory[object]) {
        inventory[object] = inventoryItems[object];
    }
}

function searchObjectInInventory(inventory, object) {
    return !!inventory[object];
}

function displayInventoryNotification(ingredient) {
    const notif = document.getElementById("inventory-notification");
    const text = document.getElementById("inventory-notification-text");

    text.textContent = "Has conseguido " + inventoryItems[ingredient].name;
    notif.classList.remove("hide");
    void notif.offsetWidth;
    notif.classList.add("show");

    setTimeout(() => {
        notif.classList.remove("show");
        notif.classList.add("hide");
    }, 2000);

    notif.addEventListener("animationend", (e) => {
        if (e.animationName === "slideOut") {
            notif.classList.remove("hide");
        }
    }, { once: true });
}

function enableInventoryNavigation() {
    const cells = document.querySelectorAll(".inventory-cell");
    if (cells.length === 0) return;

    cells.forEach(cell => cell.classList.remove("selected"));
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

    cells[selectedIndex].classList.remove("selected");

    switch (event.key) {
        case "ArrowRight":
            selectedIndex = currentRow * columns + ((currentCol + 1) % columns);
            if (selectedIndex >= totalItems) selectedIndex = currentRow * columns;
            break;
        case "ArrowLeft":
            selectedIndex = currentRow * columns + ((currentCol - 1 + columns) % columns);
            if (selectedIndex >= totalItems)
                selectedIndex = Math.min(totalItems - 1, currentRow * columns + columns - 1);
            break;
        case "ArrowDown":
            selectedIndex = ((currentRow + 1) % rows) * columns + currentCol;
            if (selectedIndex >= totalItems) selectedIndex = currentCol;
            break;
        case "ArrowUp":
            selectedIndex = ((currentRow - 1 + rows) % rows) * columns + currentCol;
            if (selectedIndex >= totalItems) selectedIndex = currentCol;
            break;
        case "Escape":
            document.getElementById("close-inventory").click();
            return;
    }

    cells[selectedIndex].classList.add("selected");

    const selectedImg = cells[selectedIndex].querySelector("img");
    const selectedItemText = document.getElementById("inventory-selected-item");
    selectedItemText.textContent = selectedImg && selectedImg.id ? selectedImg.id : "";
}

function disableInventoryNavigation() {
    document.removeEventListener("keydown", handleInventoryNavigation);
    const selectedItemText = document.getElementById("inventory-selected-item");
    selectedItemText.textContent = "";
}

export {
    renderInventory,
    addObjectToInventory,
    searchObjectInInventory,
    displayInventoryNotification
};
