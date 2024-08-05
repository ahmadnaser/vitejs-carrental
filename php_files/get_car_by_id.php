<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'dbconfig.php';

$vehicle_id = isset($_GET['vehicle_id']) ? $_GET['vehicle_id'] : '';

if ($vehicle_id) {
    try {
        $stmt = $conn->prepare("SELECT * FROM Vehicles WHERE vehicle_id = :vehicle_id");
        $stmt->bindParam(':vehicle_id', $vehicle_id);
        $stmt->execute();
        $car = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($car) {
            echo json_encode($car);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Car not found']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Error fetching car: ' . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid vehicle ID']);
}
?>
