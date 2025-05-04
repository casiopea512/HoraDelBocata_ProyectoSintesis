import { toggleShowHelpButton } from "./helpUI.js";
import { inventoryItems } from "./inventoryItems.js";
import { stopTimer } from "./gameTimer.js";

const cookingInventoryModal = document.getElementById("cooking-modal");

// Variables para navegación
let cookingNavElements = [];
let cookingSelectedIndex = 0;
const cookingColumns = 5; // columnas en cooking-list
let cookingHandleNavigation;

// Función para abrir el modal de cocina
export function openCookingInventory(inventory, scene) {
  const cookingList = document.getElementById("cooking-list");
  cookingList.innerHTML = "";
  let ingredientsCount = 0;

  // Renderizar ingredientes en cooking-list
  for (const key in inventoryItems) {
    const item = inventoryItems[key];
    const div = document.createElement("div");
    div.classList.add("cooking-cell");
    div.innerHTML = `<img class=\"lockedItem\" src=\"${item.imgPath}\" alt=\"${item.name}\" id=\"${item.name}_inventory\"/>`;
    cookingList.appendChild(div);

    if (inventory[key]) {
      ingredientsCount++;
      const img = document.getElementById(`${inventory[key].name}_inventory`);
      img.classList.remove("lockedItem");
    }
  }

  // Añadir celdas vacías si faltan
  for (let i = 0; i < 2; i++) {
    const div = document.createElement("div");
    div.classList.add("cooking-cell");
    div.innerHTML = `<img />`;
    cookingList.appendChild(div);
  }

  // Determinar si está habilitado el boton Cook
  const allIngredientsCompleted = ingredientsCount >= 1; // ajustar criterio
  const cookButton = document.getElementById("cook-button");
  const cookImg = cookButton.querySelector("img");
  if (allIngredientsCompleted) {
    cookImg.classList.remove("lockedItem");
    cookButton.disabled = false;
  } else {
    cookImg.classList.add("lockedItem");
    cookButton.disabled = true;
  }

  // Construir lista de navegación: celdas de cooking-list + cook-button
  const cookingContainer = document.getElementById("cooking-container");
  const listItems = Array.from(cookingList.children);
  const other = [cookButton];
  cookingNavElements = [...listItems, ...other];

  // Inicializar selección y navegación
  cookingSelectedIndex = 0;
  updateCookingSelection();
  enableCookingNavigation(scene);

  // Configurar botón de cerrar
  const closeBtn = document.getElementById("close-cooking");
  const handleClose = () => {
    disableCookingNavigation();
    cookingInventoryModal.style.display = "none";
    scene.enableControls();
    toggleShowHelpButton();
    closeBtn.removeEventListener("click", handleClose);
  };
  closeBtn.addEventListener("click", handleClose);

  // Configurar acción Cook
  cookButton.addEventListener("click", () => {
    cookSandwich(inventory);
    cookButton.disabled = true;
    cookImg.classList.add("lockedItem");
    document
      .querySelectorAll("#cooking-list .cooking-cell img")
      .forEach((img) => {
        img.classList.add("lockedItem");
      });
    scene.disableControls();
    closeBtn.style.display = "none";
    const finalTime = stopTimer();
    // enviar al backend...
    fetch("/api/apis.php?action=saveTime", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ time: finalTime }),
    });
    setTimeout(() => (window.location.href = "/gameOver.php"), 3000);
  });
}

// Toggle del modal de cocina
export function toggleCookingInventory(inventory, scene) {
  if (
    !cookingInventoryModal.style.display ||
    cookingInventoryModal.style.display === "none"
  ) {
    cookingInventoryModal.style.display = "block";
    scene.resetControls("interact");
    scene.disableControls("interact");
    openCookingInventory(inventory, scene);
    toggleShowHelpButton();
  } else {
    disableCookingNavigation();
    cookingInventoryModal.style.display = "none";
    scene.enableControls();
    toggleShowHelpButton();
  }
}

// Función para cocinar y vaciar inventario
export function cookSandwich(inventory) {
  Object.keys(inventory).forEach((key) => delete inventory[key]);
  inventory["Sandwich"] = {
    name: "Bocata",
    imgPath: "/assets/images/objects/sandwich.png",
  };
}

// -----------------------------------
// Helpers de navegación simplificada

function updateCookingSelection() {
  cookingNavElements.forEach((el, idx) => {
    el.classList.toggle("selected", idx === cookingSelectedIndex);
  });
  // Mostrar nombre en span
  const span = document.getElementById("inventory-selected-item");
  const img = cookingNavElements[cookingSelectedIndex].querySelector("img");
  span.textContent = img?.id.replace("_inventory", "") || "";
}

function enableCookingNavigation(scene) {
  cookingHandleNavigation = (e) => {
    const total = cookingNavElements.length;
    const row = Math.floor(cookingSelectedIndex / cookingColumns);
    const col = cookingSelectedIndex % cookingColumns;
    cookingNavElements[cookingSelectedIndex].classList.remove("selected");
    switch (e.key) {
      case "ArrowRight":
        cookingSelectedIndex = (cookingSelectedIndex + 1) % total;
        break;
      case "ArrowLeft":
        cookingSelectedIndex = (cookingSelectedIndex - 1 + total) % total;
        break;
      case "ArrowDown": {
        let next = (row + 1) * cookingColumns + col;
        if (next >= total) next = col;
        cookingSelectedIndex = next;
        break;
      }
      case "ArrowUp": {
        let prevRowCount = Math.ceil(total / cookingColumns);
        let prev =
          ((row - 1 + prevRowCount) % prevRowCount) * cookingColumns + col;
        if (prev >= total) prev = col;
        cookingSelectedIndex = prev;
        break;
      }
      case "Enter":
        cookingNavElements[cookingSelectedIndex].click();
        break;
      default:
        return;
    }
    updateCookingSelection();
    e.preventDefault();
  };
  document.addEventListener("keydown", cookingHandleNavigation);
}

function disableCookingNavigation() {
  document.removeEventListener("keydown", cookingHandleNavigation);
  const span = document.getElementById("inventory-selected-item");
  if (span) span.textContent = "";
}
