<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'dbconfig.php';

$vehicle_id = isset($_GET['vehicle_id']) ? $_GET['vehicle_id'] : '';

$sql = "SELECT 
            Maintenance.*, 
            Vehicles.make AS make,
            Vehicles.model AS model,
            Vehicles.vehicle_le_id AS vehicle_le_id,  // Assuming this field exists
            Garages.name AS garage_name,
            Traders.name AS trader_name
        FROM Maintenance
        INNER JOIN Vehicles ON Maintenance.vehicle_id = Vehicles.vehicle_id
        LEFT JOIN Garages ON Maintenance.garage_id = Garages.garage_id
        LEFT JOIN Traders ON Maintenance.trader_id = Traders.trader_id";

if ($vehicle_id) {
    $sql .= " WHERE Maintenance.vehicle_id = :vehicle_id";
}

try {
    $stmt = $conn->prepare($sql);
    
    if ($vehicle_id) {
        $stmt->bindParam(':vehicle_id', $vehicle_id, PDO::PARAM_STR);
    }
    
    $stmt->execute();
    $maintenanceRecords = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($maintenanceRecords)) {
        echo json_encode(["message" => "No maintenance records found for the given vehicle ID"]);
    } else {
        echo json_encode($maintenanceRecords);
    }
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Error: " . $e->getMessage()]);
}

$conn = null;
?>
