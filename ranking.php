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
  $lines = file($rankingFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

  foreach ($lines as $line) {
    $parts = explode(' - ', $line);
    if (count($parts) === 2) {
      $username = trim($parts[0]);
      $time = trim($parts[1]);
      $seconds = strtotime("1970-01-01 $time UTC"); // Convierte el tiempo en segundos
      $rankingData[] = [
        'username' => $username,
        'time' => $time,
        'seconds' => $seconds
      ];
    }
  }

  // Ordenar ascendentemente por tiempo (en segundos)
  usort($rankingData, function ($a, $b) {
    return $a['seconds'] - $b['seconds'];
  });
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

  <script src="/js/ranking.js"></script>

  <link href="/css/styles.css" rel="stylesheet">
  <link href="/css/ranking.css" rel="stylesheet">
  <link rel="icon" type="image/x-icon" href="/assets/images/objects/sandwich.png">

  <title>Ranking | Hora del Bocata</title>
</head>

<?php
$from = isset($_GET['from']) ? $_GET['from'] : '';
?>

<body data-page="<?php echo $page; ?>" data-from="<?php echo htmlspecialchars($from); ?>">

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
          $username = $entry['username'];
          $time = $entry['time'];
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
        <a href="?page=<?php echo $page - 1; ?>&from=prev">Anterior</a>
      <?php endif; ?>

      <p> Página <?php echo $page; ?> de <?php echo $totalPages; ?></p>

      <?php if ($page < $totalPages): ?>
        <a href="?page=<?php echo $page + 1; ?>&from=next">Siguiente</a>
      <?php endif; ?>
    </div>
  </main>
</body>

</html>