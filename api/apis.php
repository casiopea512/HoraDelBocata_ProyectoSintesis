<?php
header('Content-Type: application/json');

$action = isset($_GET['action']) ? $_GET['action'] : '';
$file = 'time.txt';

if ($action === 'saveTime') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!isset($input['time'])) {
        echo json_encode(['success' => false, 'message' => 'No se ha enviado el tiempo']);
        exit;
    }
    $time = $input['time'];

    if (file_put_contents($file, $time) !== false) {
        echo json_encode(['success' => true, 'message' => 'Tiempo guardado', 'time' => $time]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al guardar el tiempo']);
    }
    exit;
} elseif ($action === 'getTime') {
    if (file_exists($file)) {
        $time = intval(file_get_contents($file));
        $hours = floor($time / 3600);
        $minutes = floor(($time % 3600) / 60);
        $seconds = $time % 60;
        $formattedTime = sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds);
        echo json_encode(['success' => true, 'time' => $formattedTime]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Tiempo no establecido']);
    }
    exit;
} elseif ($action === 'saveRanking') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!isset($input['username']) || !isset($input['time'])) {
        echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
        exit;
    }
    $username = $input['username'];
    $time = $input['time'];

    
    $rankingLine = $username . " - " . $time . "\n";
    if (file_put_contents('ranking.txt', $rankingLine, FILE_APPEND) !== false) {
        echo json_encode(['success' => true, 'message' => 'Ranking guardado']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al guardar el ranking']);
    }
    exit;
} else {
    echo json_encode(['success' => false, 'message' => 'Acción no válida']);
    exit;
}
?>