document.addEventListener("DOMContentLoaded", () => { 

    button = document.getElementById("linkMenu");

    document.addEventListener("keydown", (e) => {  
        e.preventDefault();
        if (e.key === "Enter") {
            button.click();
        }
    });
});