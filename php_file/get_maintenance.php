<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'dbconfig.php';

$sql = "SELECT 
            Maintenance.*, 
            Vehicles.make AS make,
            Vehicles.model AS model,
            Garages.name AS garage_name,
            Traders.name AS trader_name
        FROM Maintenance
        INNER JOIN Vehicles ON Maintenance.vehicle_id = Vehicles.vehicle_id
        LEFT JOIN Garages ON Maintenance.garage_id = Garages.garage_id
        LEFT JOIN Traders ON Maintenance.trader_id = Traders.trader_id";


try {
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $maintenanceRecords = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($maintenanceRecords);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Error: " . $e->getMessage()]);
}

$conn = null;
?>
