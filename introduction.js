document.addEventListener("DOMContentLoaded", () => {
  const focusables = [
    ...Array.from(document.getElementsByTagName("li")),
    ...Array.from(document.getElementsByTagName("a")),
  ];
  let currentFocus = 0;

  updateSelected();

  document.addEventListener("keydown", (e) => {
    const keys = ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Enter"];
    if (!keys.includes(e.key)) return;

    if (e.key === "Enter") {
      const currentElement = focusables[currentFocus];
      if (currentElement.tagName === "A") {
        currentElement.click();
      }
      return;
    } else {
      e.preventDefault();

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        currentFocus = (currentFocus + 1) % focusables.length;
        updateSelected();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        currentFocus =
          (currentFocus - 1 + focusables.length) % focusables.length;
        updateSelected();
      }
    }
  });

  focusables.forEach((focusable, index) => {
    focusable.addEventListener("mouseover", () => {
      focusables[currentFocus].classList.remove("selected");
      currentFocus = index;
      focusables[currentFocus].classList.add("selected");
      updateCarousel();
    });
  });

  function updateSelected() {
    focusables.forEach((element) => element.classList.remove("selected"));
    focusables[currentFocus].classList.add("selected");
    updateCarousel();
  }

  function updateCarousel() {
    const listItems = document.querySelectorAll("main section:nth-of-type(2) ul li");
    const carouselVideos = document.querySelectorAll("#carousel .carousel-slide video");
    const carouselImages = document.querySelectorAll("#carousel2 .carousel-slide img");

    // Buscamos el li seleccionado de los comandos
    const selectedLi = document.querySelector("main section:nth-of-type(2) ul li.selected");
    if (selectedLi) {
      const index = Array.from(listItems).indexOf(selectedLi);

      // Actualizar el primer carrusel (videos)
      carouselVideos.forEach((video, i) => {
        if (i === index) {
          video.style.display = "block";
          video.currentTime = 0;
          video.play();
        } else {
          video.style.display = "none";
          video.pause();
          video.currentTime = 0;
        }
      });
      
      // Actualizar el segundo carrusel (imágenes)
      carouselImages.forEach((img, i) => {
        img.style.display = (i === index) ? "block" : "none";
      });
      
      console.log("Mostrando video:", carouselVideos[index].id, " y la imagen:", carouselImages[index].id);
    }
  }
});