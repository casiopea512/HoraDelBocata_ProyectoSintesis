document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/apis.php?action=getTime')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById("time").textContent = data.time;
            } else {
                document.getElementById("time").textContent = 'Tiempo no disponible';
            }
        })
        .catch(error => {
            console.error("Error al obtener el tiempo:", error);
            document.getElementById("time").textContent = 'Error al recuperar el tiempo';
        });
}); 