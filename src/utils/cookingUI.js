import { toggleShowHelpButton } from "./helpUI.js";
import { inventoryItems } from "./inventoryItems.js";
import { stopTimer } from "./gameTimer.js";

const cookingInventoryModal = document.getElementById("cooking-modal");

let currentIndex = 0;
let navElements = [];
let cookingListItems = [];

// -----navegación con las flechas -----
const columns = 5;

function enableCookingNavigation() {
  const cookingContainer = document.getElementById("cooking-container");
  const cookingList = document.getElementById("cooking-list");
  cookingListItems = Array.from(cookingList.children);
  const cookButton = document.getElementById("cook-button");
  navElements = [...cookingListItems, cookButton];

  // reset selección
  currentIndex = 0;
  updateCookingSelection();

  document.addEventListener("keydown", handleCookingNavigation);
}

function updateCookingSelection() {
  navElements.forEach((el, idx) => {
    el.classList.toggle("selected", idx === currentIndex);
  });
}

function handleCookingNavigation(event) {
  // Prevenir el comportamiento por defecto para todas las flechas
  if (
    ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Enter"].includes(
      event.key
    )
  ) {
    event.preventDefault();
  }

  const total = navElements.length;
  document.removeEventListener("keydown", handleCookingNavigation);
  let nextIndex = currentIndex;

  switch (event.key) {
    case "ArrowRight":
      if (
        currentIndex < cookingListItems.length &&
        (currentIndex + 1) % columns === 0
      ) {
        nextIndex = cookingListItems.length;
      } else {
        nextIndex = Math.min(currentIndex + 1, total - 1);
      }
      break;

    case "ArrowLeft":
      nextIndex = Math.max(currentIndex - 1, 0);
      break;

    case "ArrowDown":
      if (currentIndex < cookingListItems.length) {
        const row = Math.floor(currentIndex / columns);
        const col = currentIndex % columns;
        const rows = Math.ceil(cookingListItems.length / columns);
        let newRow = (row + 1) % rows;
        let candidate = newRow * columns + col;
        if (candidate >= cookingListItems.length) candidate = newRow * columns;
        nextIndex = candidate;
      }
      break;

    case "ArrowUp":
      if (currentIndex < cookingListItems.length) {
        const row = Math.floor(currentIndex / columns);
        const col = currentIndex % columns;
        const rows = Math.ceil(cookingListItems.length / columns);
        let newRow = (row - 1 + rows) % rows;
        let candidate = newRow * columns + col;
        if (candidate >= cookingListItems.length) candidate = newRow * columns;
        nextIndex = candidate;
      }
      break;

    case "Enter":
      navElements[currentIndex].click();
      break;

    default:
      break;
  }

  currentIndex = nextIndex;
  updateCookingSelection();
  document.addEventListener("keydown", handleCookingNavigation);
}

function disableCookingNavigation() {
  document.removeEventListener("keydown", handleCookingNavigation);
  navElements.forEach((el) => el.classList.remove("selected"));
}

// ----- toggle del modal -----
export function openCookingInventory(inventory, scene) {
  const list = document.getElementById("cooking-list");
  list.innerHTML = "";
  let ingredientsCount = 0;

  for (const key in inventoryItems) {
    const item = inventoryItems[key];
    const cell = document.createElement("div");
    cell.className = "cooking-cell";
    cell.innerHTML = `<img class="lockedItem" src="${item.imgPath}" alt="${item.name}" id="${item.name}_inventory"/>`;
    list.appendChild(cell);
    if (inventory[key]) {
      ingredientsCount++;
      cell.querySelector("img").classList.remove("lockedItem");
    }
  }

  for (let i = 0; i < 2; i++) {
    const cell = document.createElement("div");
    cell.className = "cooking-cell";
    cell.innerHTML = `<img />`;
    list.appendChild(cell);
  }

  // habilitar navegación
  enableCookingNavigation();

  // close button
  const closeBtn = document.getElementById("close-cooking");
  function handleClose() {
    disableCookingNavigation();
    cookingInventoryModal.style.display = "none";
    scene.enableControls();
    toggleShowHelpButton();
    closeBtn.removeEventListener("click", handleClose);
  }
  closeBtn.addEventListener("click", handleClose);

  // cook button
  const cookBtn = document.getElementById("cook-button");
  const cookImg = cookBtn.querySelector("img");

  //IMPORTANTE !!!!!!!!!!!!!
  //MARK: CAMBIAR NUM
  if (ingredientsCount < 1) {
    cookImg.classList.add("lockedItem");
    cookBtn.disabled = true;
  } else {
    cookImg.classList.remove("lockedItem");
    cookBtn.disabled = false;

    cookBtn.addEventListener("click", () => {
      console.log("COCINANDO SANDWICH");
      cookSandwich(inventory);
      disableCookingNavigation();

      scene.disableControls();
      closeBtn.style.display = "none";

      const finalTime = stopTimer();
      console.log("Tiempo final:", finalTime);

      fetch("/api/apis.php?action=saveTime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ time: finalTime }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Respuesta del backend:", data);
        })
        .catch((error) => {
          console.error("Error al enviar el tiempo:", error);
        });

      setTimeout(() => (window.location.href = "/gameOver.php"), 3000);
    });
  }
}

export function toggleCookingInventory(inventory, scene) {
  if (cookingInventoryModal.style.display !== "block") {
    cookingInventoryModal.style.display = "block";
    scene.resetControls("interact");
    scene.disableControls("interact");
    openCookingInventory(inventory, scene);
    toggleShowHelpButton();
  } else {
    disableCookingNavigation();
    scene.enableControls();
    cookingInventoryModal.style.display = "none";
    toggleShowHelpButton();
  }
}

export function cookSandwich(inventory) {
  Object.keys(inventory).forEach((k) => delete inventory[k]);
  inventory["Sandwich"] = {
    name: "Bocata",
    imgPath: "/assets/images/objects/sandwich.png",
  };
}
