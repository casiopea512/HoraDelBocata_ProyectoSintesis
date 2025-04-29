<?php
// Número de elementos a mostrar por página
$itemsPerPage = 10;

// Obtener el número de página de la query string
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
if ($page < 1) {
  $page = 1;
}

// Leer el archivo ranking.txt ubicado en api/
$rankingFile = __DIR__ . '/api/ranking.txt';
$rankingData = [];
if (file_exists($rankingFile)) {
  $rankingData = file($rankingFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
}

// Calcular paginación
$totalItems = count($rankingData);
$totalPages = $totalItems > 0 ? ceil($totalItems / $itemsPerPage) : 1;
$startIndex = ($page - 1) * $itemsPerPage;
$rankingPage = array_slice($rankingData, $startIndex, $itemsPerPage);
?>
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ranking | Hora del Bocata</title>
  <link href="ranking.css" rel="stylesheet">
</head>

<body>
  <header>
    <a href="index.html">&#11013;</a>
    <h1>Ranking</h1>
  </header>

  <main>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Usuario</th>
          <th>Tiempo</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($rankingPage as $index => $entry):
          $parts = explode(' - ', $entry);
          $username = isset($parts[0]) ? $parts[0] : 'Desconocido';
          $time = isset($parts[1]) ? $parts[1] : '00:00:00';
        ?>
          <tr>
            <td><?php echo $startIndex + $index + 1; ?></td>
            <td><?php echo htmlspecialchars($username); ?></td>
            <td><?php echo htmlspecialchars($time); ?></td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>

    <div class="pagination">
      <?php if ($page > 1): ?>
        <a href="?page=<?php echo $page - 1; ?>">Anterior</a>
      <?php endif; ?>

      Página <?php echo $page; ?> de <?php echo $totalPages; ?>

      <?php if ($page < $totalPages): ?>
        <a href="?page=<?php echo $page + 1; ?>">Siguiente</a>
      <?php endif; ?>
    </div>
  </main>
</body>

</html>