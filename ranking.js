document.addEventListener("DOMContentLoaded", () => {
  // Convertir la colección HTML de enlaces en un array
  const focusables = Array.from(document.getElementsByTagName("a"));

  const page = parseInt(document.body.getAttribute("data-page"), 10);
  const from = document.body.getAttribute("data-from");

  let currentFocus;

  // Lógica de inicialización de enfoque
  if (isNaN(page) || page === 1 || focusables.length < 3) {
    currentFocus = 1;
  } else if (from === "next") {
    currentFocus = 2;
  } else if (from === "prev") {
    currentFocus = 1;
  } else {
    currentFocus = 1;
  }
  updateSelected();

  document.addEventListener("keydown", (event) => {
    const keys = ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Enter"];
    if (!keys.includes(event.key)) return;

    // Enter: ejecutar acción del elemento actual
    if (event.key === "Enter") {
      const currentElement = focusables[currentFocus];

      // si es un link
      if (currentElement.tagName === "A") {
        event.preventDefault();
        // Si no está deshabilitado, simula clic
        if (!currentElement.classList.contains("disabled")) {
          currentElement.click();
        }
      }
      return;
    }

    event.preventDefault();

    focusables[currentFocus].classList.remove("selected");

    if (focusables[currentFocus].tagName === "INPUT") {
      focusables[currentFocus].blur();
    }

    if (event.key === "ArrowUp") {
      // Mover al primer elemento
      if (currentFocus !== 0) {
        currentFocus = 0;
      } else {
        currentFocus = focusables.length - 1;
      }
    } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      currentFocus = (currentFocus + 1) % focusables.length;
    } else if (event.key === "ArrowLeft") {
      currentFocus = (currentFocus - 1 + focusables.length) % focusables.length;
    }

    updateSelected();
  });

  function updateSelected() {
    focusables.forEach((el) => el.classList.remove("selected"));
    focusables[currentFocus].classList.add("selected");
  }
});
