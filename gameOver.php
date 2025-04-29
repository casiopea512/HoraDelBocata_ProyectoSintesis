<?php
// if (!isset($_SERVER['HTTP_REFERER']) || strpos($_SERVER['HTTP_REFERER'], 'localhost') === false) {
if (!isset($_SERVER['HTTP_REFERER']) || strpos($_SERVER['HTTP_REFERER'], 'https://horadelbocata.ieti.site') === false) {
    header('HTTP/1.1 403 Forbidden');
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="gameOver.js"></script>

    <link href="styles.css" rel="stylesheet">
    <link href="gameOver.css" rel="stylesheet">
    
    <title>Game Over</title>
</head>
<body>

    <main>
        <h1>Felicidades! Has hecho a Jake un perro muy feliz</h1>
        <p>Has conseguido crear el bocata supremo en: </p>
        <span id="time"></span>

        <input type="text" id="username" placeholder="Introduce tu usuario" />

        <div id="links">
            <a href="/index.html">Menú Principal</a>
            <a href="/ranking.php" id="rankingLink" class="disabled">Añadir mi tiempo al Ranking</a>
        </div>
    </main>
    
</body>
</html>