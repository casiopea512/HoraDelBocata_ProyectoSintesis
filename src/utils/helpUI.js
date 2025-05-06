const helpContainer = document.getElementById("help-modal");
let currentHelpCloseHandler = null;
let currentEscHandler = null; // Nuevo handler para Escape

function handleCloseHelp(scene) {
    return function () {
        if (currentEscHandler) {
            document.removeEventListener("keydown", currentEscHandler);
            currentEscHandler = null;
        }
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
        
        const escHandler = function(event) {
            if (event.key === "Escape") {
                console.log("CERRANDO EL HELP CON EL ESCAPE");
                document.removeEventListener("keydown", escHandler);
                currentEscHandler = null;
                scene.enableControls();
                helpContainer.style.display = "none";
            }
        };
        currentEscHandler = escHandler;
        document.addEventListener("keydown", escHandler);
    } else {
        if (currentEscHandler) {
            document.removeEventListener("keydown", currentEscHandler);
            currentEscHandler = null;
        }
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
