<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'dbconfig.php';

$sql = "SELECT Rentals.rental_id,Vehicles.vehicle_id, Vehicles.make, Vehicles.model, Tenants.tenant_name AS customer,Tenants.id_number AS tenantID,
 Rentals.start_date, Rentals.end_date, Reservations.end_date AS end_date_agreed, Reservations.price_perday ,Reservations.total_amount, DATEDIFF(Rentals.end_date, Rentals.start_date) AS dayNum, Rentals.note AS note ,
  payments.amount AS remainingAmount, payments.payment_date AS timeReturned
        FROM Rentals
        INNER JOIN Reservations ON Rentals.reservation_id = Reservations.reservation_id
        INNER JOIN Vehicles ON Reservations.vehicle_id = Vehicles.vehicle_id
        INNER JOIN Tenants ON Reservations.tenant_id = Tenants.id_number
        LEFT JOIN payments ON Rentals.reservation_id = payments.reservation_id";

try {
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $rentedCars = $stmt->fetchAll();

    echo json_encode($rentedCars);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Error: " . $e->getMessage()]);
}

$conn = null;
?>
