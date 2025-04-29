document.addEventListener("DOMContentLoaded", () => {
    let timeValue = '';
    const usernameInput = document.getElementById("username");
    const rankingLink = document.getElementById("rankingLink");

    // Asegurarse de que el enlace aparezca deshabilitado al inicio
    rankingLink.classList.add("disabled");

    fetch('/api/apis.php?action=getTime')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                timeValue = data.time;
                document.getElementById("time").textContent = data.time;
            } else {
                document.getElementById("time").textContent = 'Tiempo no disponible';
            }
        })
        .catch(error => {
            console.error("Error al obtener el tiempo:", error);
            document.getElementById("time").textContent = 'Error al recuperar el tiempo';
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
            time: timeValue
        };

        fetch('/api/apis.php?action=saveRanking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                window.location.href = '/ranking.html';
            } else {
                alert("Error al guardar el ranking: " + data.message);
            }
        })
        .catch(error => {
            console.error("Error al guardar el ranking:", error);
            alert("Error al guardar el ranking");
        });
    });
});