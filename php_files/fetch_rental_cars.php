<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'dbconfig.php';

$sql = "SELECT Rentals.rental_id, Vehicles.make, Vehicles.model, Users.name AS customer, Rentals.start_date, Rentals.end_date, Reservations.end_date AS end_date_agreed, Reservations.price_perday , DATEDIFF(Rentals.end_date, Rentals.start_date) AS dayNum, Rentals.total_amount, Rentals.note AS note , Payments.amount AS remainingAmount, Payments.payment_date AS timeReturned, Rentals.payment_status AS payment_status
        FROM Rentals
        INNER JOIN Reservations ON Rentals.reservation_id = Reservations.reservation_id
        INNER JOIN Vehicles ON Reservations.vehicle_id = Vehicles.vehicle_id
        INNER JOIN Users ON Reservations.user_id = Users.user_id
        LEFT JOIN Payments ON Rentals.rental_id = Payments.rental_id";

try {
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $rentedCars = $stmt->fetchAll();

    echo json_encode($rentedCars);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Error: " . $e->getMessage()]);
}

// Close the database connection
$conn = null;
?>
