<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'dbconfig.php';

$id_number = isset($_GET['id_number']) ? $_GET['id_number'] : '';

if ($id_number) {
    try {
        $stmt = $conn->prepare('SELECT * FROM Tenants WHERE id_number = :id_number');
        $stmt->bindParam(':id_number', $id_number, PDO::PARAM_STR);
        $stmt->execute();
        $tenant = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($tenant) {
            echo json_encode($tenant);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Tenant not found']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid or missing id_number parameter']);
}

$conn = null;
?>
