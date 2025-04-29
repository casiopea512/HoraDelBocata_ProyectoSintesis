document.addEventListener("DOMContentLoaded", () => {
  let timeValue = "";
  const usernameInput = document.getElementById("username");
  const rankingLink = document.getElementById("rankingLink");

  // Asegurarse de que el enlace aparezca deshabilitado al inicio
  rankingLink.classList.add("disabled");

  fetch("/api/apis.php?action=getTime")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        timeValue = data.time;
        document.getElementById("time").textContent = data.time;
      } else {
        document.getElementById("time").textContent = "Tiempo no disponible";
      }
    })
    .catch((error) => {
      console.error("Error al obtener el tiempo:", error);
      document.getElementById("time").textContent =
        "Error al recuperar el tiempo";
    });

  usernameInput.addEventListener("input", () => {
    if (usernameInput.value.trim() !== "") {
      rankingLink.classList.remove("disabled");
    } else {
      rankingLink.classList.add("disabled");
    }
  });

  rankingLink.addEventListener("click", (e) => {
    e.preventDefault();
    if (usernameInput.value.trim() === "") {
      return;
    }
    const payload = {
      username: usernameInput.value.trim(),
      time: timeValue,
    };

    fetch("/api/apis.php?action=saveRanking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = "/ranking.php";
        } else {
          alert("Error al guardar el ranking: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error al guardar el ranking:", error);
        alert("Error al guardar el ranking");
      });
  });

  //Movimiento con las flechas
  const focusables = [
    document.getElementById("username"),
    document.querySelector('#links a[href="/index.html"]'),
    document.getElementById("rankingLink"),
  ];

  let currentFocus = 0;
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

    if (focusables[currentFocus].tagName === "INPUT") {
        focusables[currentFocus].focus();
      }
  }
});
