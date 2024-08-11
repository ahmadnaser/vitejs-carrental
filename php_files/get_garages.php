<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'dbconfig.php';

try {
    $stmt = $conn->prepare('SELECT * FROM Garages');
    $stmt->execute();
    $garages = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($garages);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
$conn = null;
?>
