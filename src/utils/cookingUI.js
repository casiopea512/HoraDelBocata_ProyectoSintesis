import { toggleShowHelpButton } from "./helpUI.js";
import { inventoryItems } from "./inventoryItems.js";
import { stopTimer } from "./gameTimer.js";

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

    // CONFIGURAR NAVEGACION CON FLECHAS DENTRO DEL CONTAINER DE COCINA
    const cookingContainer = document.getElementById("cooking-container");

    // Obtener los items internos de "cooking-list"
    const cookingList = document.getElementById("cooking-list");
    const cookingListItems = Array.from(cookingList.children);

    // Obtener los demás elementos directos del contenedor que no sean "cooking-list"
    const otherNavElements = Array.from(cookingContainer.children).filter(child => child.id !== "cooking-list");

    // Crear una lista única en el orden deseado: primero los items de cooking-list, luego los demás
    const navElements = [...cookingListItems, ...otherNavElements];
    console.log(navElements);

    let currentIndex = 0;
    
    function updateSelection(){
        navElements.forEach((element, index) => {
            if (index === currentIndex) {
                element.classList.add("selected");
            } else {
                element.classList.remove("selected");
            }
        });
    }
    updateSelection();
    
    function handleKeyNavigation(event) {
        // Prevenir el comportamiento por defecto para todas las flechas
        if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(event.key)) {
            event.preventDefault();
        }
        const numColumns = 5; // Número de columnas en la grid de cooking-list
        if (event.key === "ArrowRight") {
            // Si estamos en la grid y en la última columna
            if (currentIndex < cookingListItems.length && (currentIndex % numColumns) === numColumns - 1) {
                if (navElements.length > cookingListItems.length) { // Solo si existen elementos extra
                    currentIndex = cookingListItems.length; // salto al primer elemento extra (span)
                }
            } else if (currentIndex < navElements.length - 1) {
                currentIndex++;
            }
            updateSelection();

        } else if (event.key === "ArrowLeft") {
            if (currentIndex > 0) {
                currentIndex--;
                updateSelection();
            }

        } else if (event.key === "ArrowDown") {
            // Solo para los elementos de la grid de cookingList
            if (currentIndex < cookingListItems.length) {
                let currentRow = Math.floor(currentIndex / numColumns);
                let currentCol = currentIndex % numColumns;
                let totalRows = Math.ceil(cookingListItems.length / numColumns);
                let newRow = currentRow + 1;
                if (newRow >= totalRows) { // wrap: de la última fila a la primera
                    newRow = 0;
                }
                let candidateIndex = newRow * numColumns + currentCol;
                // Si la fila destino no tiene ese número de columna, usa el primer elemento de esa fila
                if (candidateIndex >= cookingListItems.length) {
                    candidateIndex = newRow * numColumns;
                }
                currentIndex = candidateIndex;
                updateSelection();
            }

        } else if (event.key === "ArrowUp") {
            if (currentIndex < cookingListItems.length) {
                let currentRow = Math.floor(currentIndex / numColumns);
                let currentCol = currentIndex % numColumns;
                let totalRows = Math.ceil(cookingListItems.length / numColumns);
                let newRow = currentRow - 1;
                if (newRow < 0) { // wrap: de la primera fila a la última
                    newRow = totalRows - 1;
                }
                let candidateIndex = newRow * numColumns + currentCol;
                if (candidateIndex >= cookingListItems.length) {
                    candidateIndex = newRow * numColumns;
                }
                currentIndex = candidateIndex;
                updateSelection();
            }
        }
    }
    document.addEventListener("keydown", handleKeyNavigation);

    //BOTON "X" CERRAR
    let closeCookingButton = document.getElementById("close-cooking");

    const handleCloseCooking = function () {
        document.removeEventListener("keydown", handleKeyNavigation);
        cookingInventoryModal.style.display = 'none';
        scene.enableControls();
        toggleShowHelpButton();

        closeCookingButton.removeEventListener("click", handleCloseCooking);
    };
    closeCookingButton.addEventListener("click", handleCloseCooking);

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

            scene.disableControls();
            document.getElementById("close-cooking").style.display = "none";

            const finalTime = stopTimer();
            console.log("Tiempo final:", finalTime);

            // Enviar el tiempo al backend
            fetch('/api/apis.php?action=saveTime', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ time: finalTime })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Respuesta del backend:", data);
            })
            .catch(error => {
                console.error("Error al enviar el tiempo:", error);
            });

            setTimeout(() => {
                window.location.href = "/gameOver.html";
            }, 3000);
            
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
        toggleShowHelpButton();
    } else {
        let closeCookingButton = document.getElementById("close-cooking");
        scene.enableControls();
        cookingInventoryModal.style.display = "none";
        toggleShowHelpButton();
    }
}



//FUNCION DE COCINAR EL BOCATA
export function cookSandwich(inventory){
    Object.keys(inventory).forEach(key => { //vaciamos inventario
        delete inventory[key];
    });
    inventory["Sandwich"] = { name: "Bocata", imgPath: "/assets/images/objects/sandwich.png" };
}

