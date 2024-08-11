<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'dbconfig.php';

try {
    $stmt = $conn->prepare('SELECT * FROM reservations');
    $stmt->execute();
    $reservations = $stmt->fetchAll();
    echo json_encode($reservations);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
$conn = null;
?>
