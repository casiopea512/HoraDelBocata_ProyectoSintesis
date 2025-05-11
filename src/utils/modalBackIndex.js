import { toggleShowHelpButton } from "./helpUI.js";

function keyNavHandler(e) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Enter") return;
    
    const buttons = Array.from(document.querySelectorAll("#buttons-modal .button-modal"));
    if (!buttons.length) return;

    let currentIndex = buttons.findIndex(btn => btn.classList.contains("selected"));

    // Quitar la selección actual
    buttons[currentIndex].classList.remove("selected");

    if (e.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % buttons.length;

    } else if (e.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + buttons.length) % buttons.length;

    } else if (e.key === "Enter") {
        buttons[currentIndex].click();
        return;
    }

    buttons[currentIndex].classList.add("selected");
}

function toggleBackIndexModal(scene) {
    const modal = document.getElementById("back-index-modal");
    if (!modal) {
        console.warn("No se encontró el modal 'back-index-modal'.");
        return;
    }

    // toggle del modal
    if (modal.style.display !== "block") {
        modal.style.display = "block";

        scene.resetControls("backIndex");
        scene.disableControls("backIndex");

        buttonsEvents(scene);

        const buttons = document.querySelectorAll("#buttons-modal .button-modal");
        if (buttons.length > 0) {
            buttons.forEach(btn => btn.classList.remove("selected"));
            buttons[1].classList.add("selected");
        }
        document.addEventListener("keydown", keyNavHandler);

    } else {
        modal.style.display = "none";
        scene.enableControls();

        const buttons = document.querySelectorAll("#buttons-modal .button-modal");
        if (buttons.length > 0) {
            buttons.forEach(btn => btn.classList.remove("selected"));
        }
        document.removeEventListener("keydown", keyNavHandler);
    }

    if (scene.scene.key !== "TravelingMapScene") {
        toggleShowHelpButton();
    }
}

function buttonsEvents (scene){
    const cancelButton = document.getElementById("cancel-back-modal");
    const acceptButton = document.getElementById("accept-back-modal");

    if (cancelButton) {
        cancelButton.addEventListener("click", () => {
            toggleBackIndexModal(scene);
        }, { once: true });
    }

    if (acceptButton) {
        acceptButton.addEventListener("click", () => {
            console.log("Se ha aceptado salir del juego.");
            
            window.location.href = "/";

            
        }, { once: true });
    }
}

export { toggleBackIndexModal };