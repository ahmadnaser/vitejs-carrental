<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'dbconfig.php';

$tenantId = isset($_GET['tenant_id']) ? $_GET['tenant_id'] : null;
$startDate = isset($_GET['start_date']) ? $_GET['start_date'] : null;
$endDate = isset($_GET['end_date']) ? $_GET['end_date'] : null;

if ($tenantId === null) {
    http_response_code(400);
    echo json_encode(["message" => "Tenant ID is required"]);
    exit;
}

if ($startDate === null || $endDate === null) {
    http_response_code(400);
    echo json_encode(["message" => "Start date and end date are required"]);
    exit;
}

$sql = "SELECT Rentals.*, Vehicles.*, Tenants.tenant_name AS customer, Tenants.id_number AS tenantID,
 Rentals.start_date, Rentals.end_date, Reservations.end_date AS end_date_agreed, Reservations.price_perday, Reservations.total_amount, Reservations.amount_paid, 
 DATEDIFF(Rentals.end_date, Rentals.start_date) AS dayNum, Rentals.note AS note, payments.payment_date
 FROM Rentals
 INNER JOIN Reservations ON Rentals.reservation_id = Reservations.reservation_id
 INNER JOIN Vehicles ON Reservations.vehicle_id = Vehicles.vehicle_id
 INNER JOIN Tenants ON Reservations.tenant_id = Tenants.id_number
 LEFT JOIN payments ON Rentals.reservation_id = payments.reservation_id
 WHERE Tenants.id_number = :tenantId AND Rentals.start_date >= :startDate AND Rentals.start_date <= :endDate";

try {
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':tenantId', $tenantId, PDO::PARAM_STR);
    $stmt->bindParam(':startDate', $startDate, PDO::PARAM_STR);
    $stmt->bindParam(':endDate', $endDate, PDO::PARAM_STR);
    $stmt->execute();

    $rentedCars = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($rentedCars)) {
        echo json_encode(["message" => "No contracts found"]);
    } else {
        echo json_encode($rentedCars);
    }
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Error: " . $e->getMessage()]);
}

$conn = null;
?>
