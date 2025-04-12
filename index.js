document.addEventListener("DOMContentLoaded", () =>{
    const links = document.querySelectorAll('#links a');
    let currentIndex = 0;

    // Añadir la clase hovered al primer link
    links[currentIndex].classList.add('hovered');

    document.addEventListener('keydown', (e) => {
        if(e.key === "ArrowDown") {
            e.preventDefault();
            links[currentIndex].classList.remove('hovered');
            currentIndex = (currentIndex + 1) % links.length;
            links[currentIndex].classList.add('hovered');
        } else if(e.key === "ArrowUp") {
            e.preventDefault();
            links[currentIndex].classList.remove('hovered');
            currentIndex = (currentIndex - 1 + links.length) % links.length;
            links[currentIndex].classList.add('hovered');
        }
        else if(e.key === "Enter") {
            window.location.href = links[currentIndex].href;
        }
    });

    // Actualizar el índice al usar el ratón
    links.forEach((link, index) => {
        link.addEventListener("mouseover", () => {
            links[currentIndex].classList.remove('hovered');
            currentIndex = index;
            links[currentIndex].classList.add('hovered');
        });
    });
});