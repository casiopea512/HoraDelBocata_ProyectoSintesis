const helpContainer = document.getElementById("help-modal");
let currentHelpCloseHandler = null;

function handleCloseHelp(scene) {
    return function () {
        scene.enableControls();
        helpContainer.style.display = 'none';
    };
}

function renderHelp(scene) {
    const buttonCloseHelp = document.getElementById('close-help');

    if (buttonCloseHelp && helpContainer) {
        // Elimina el listener anterior si existe
        if (currentHelpCloseHandler) {
            buttonCloseHelp.removeEventListener("click", currentHelpCloseHandler);
        }

        // Crea nuevo handler ligado a esta escena
        currentHelpCloseHandler = handleCloseHelp(scene);
        buttonCloseHelp.addEventListener("click", currentHelpCloseHandler);
    }

    toggleHelp(scene, helpContainer);
}

function toggleHelp(scene, helpContainer) {
    if (helpContainer.style.display === "none" || !helpContainer.style.display) {
        helpContainer.style.display = "block";
        scene.resetControls("lookHelp");
        scene.disableControls("lookHelp");
    } else {
        scene.enableControls();
        helpContainer.style.display = "none";
    }
}

function toggleShowHelpButton() {
    let buttonOpenHelp = document.getElementById("open-help");
    let currentDisplay = window.getComputedStyle(buttonOpenHelp).display;
    buttonOpenHelp.style.display = (currentDisplay === "none") ? "block" : "none";
}

export { renderHelp, toggleShowHelpButton };
