<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'dbconfig.php';

try {
    $stmt = $conn->prepare('SELECT * FROM Vehicles');
    $stmt->execute();
    $tenants = $stmt->fetchAll();
    echo json_encode($tenants);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
$conn = null;
?>
