<?php
// if (!isset($_SERVER['HTTP_REFERER']) || strpos($_SERVER['HTTP_REFERER'], 'localhost') === false) {
if (!isset($_SERVER['HTTP_REFERER']) || strpos($_SERVER['HTTP_REFERER'], 'https://horadelbocata.ieti.site') === false) {
    header('HTTP/1.1 403 Forbidden');
    include 'errors/error403.html';
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="/js/gameOver.js"></script>

    <link href="/css/styles.css" rel="stylesheet">
    <link href="/css/gameOver.css" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="/assets/images/objects/sandwich.png">
    
    <title>Final del Juego | Hora del bocata</title>
</head>
<body>

    <main>
        <h1>¡Felicidades!</h1>
        <h2>Has hecho a Jake un perro muy feliz</h2>
        <p>Has conseguido crear el bocata supremo en: </p>
        <span id="time"></span>

        <input type="text" id="username" placeholder="Introduce tu usuario" />

        <div id="links">
            <a href="/index.html">Menú<br>Principal</a>
            <a href="/ranking.php" id="rankingLink" class="disabled">Añadir mi tiempo<br>al Ranking</a>
        </div>
    </main>
    

    <!-- Música de fondo -->
    <audio id="bg-music" src="./assets/sounds/ending_song.mp3" loop></audio>
    <!-- Controles de audio -->
    <button id="mute-button"></button>
    
</body>
</html>