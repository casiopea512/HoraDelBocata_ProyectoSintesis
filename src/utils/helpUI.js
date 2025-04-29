
const helpContainer = document.getElementById("help-modal");

function renderHelp(scene) {
    const buttonCloseHelp = document.getElementById('close-help');
    function handleCloseHelp() {
        scene.enableControls();
        helpContainer.style.display = 'none';
        buttonCloseHelp.removeEventListener("click", handleCloseHelp);
    }
    
    buttonCloseHelp.addEventListener("click", handleCloseHelp);
    
    toggleHelp(scene,helpContainer);

}

function toggleHelp(scene,helpContainer) {
    if (helpContainer.style.display === "none" || !helpContainer.style.display) {
        helpContainer.style.display = "block";
        scene.resetControls("lookHelp");
        scene.disableControls("lookHelp");
    } else {
        scene.enableControls();
        helpContainer.style.display = "none";
    }
}


function toggleShowHelpButton(){
    let buttonOpenHelp = document.getElementById("open-help");
    //const computedStyle = window.getComputedStyle(buttonOpenHelp);
    console.log(buttonOpenHelp.style.display);
    
    if (buttonOpenHelp.style.display === "none") {
        buttonOpenHelp.style.display = "block";
    } else {
        buttonOpenHelp.style.display = "none";
    }
}

export {renderHelp, toggleShowHelpButton};