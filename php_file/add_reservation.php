<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'dbconfig.php';

$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    if (
        isset($_POST['tenant_id']) && 
        isset($_POST['vehicle_id']) && 
        isset($_POST['start_timestamp']) && 
        isset($_POST['end_timestamp']) && 
        isset($_POST['price_perday']) && 
        isset($_POST['total_amount']) && 
        isset($_POST['amount_paid']) 
    ) {
        $tenant_id = $_POST['tenant_id'];
        $vehicle_id = $_POST['vehicle_id'];
        $start_date = $_POST['start_timestamp'];
        $end_date = $_POST['end_timestamp'];
        $price_perday = $_POST['price_perday'];
        $total_amount = $_POST['total_amount'];
        $amount_paid = $_POST['amount_paid'];
        $status = 'confirmed';
        $current_date = date('Y-m-d H:i:s');

        $second_driver_id = isset($_POST['second_driver_id']) ? $_POST['second_driver_id'] : NULL;
        $check_number = isset($_POST['check_number']) ? $_POST['check_number'] : NULL;
        $bank_name = isset($_POST['bank_name']) ? $_POST['bank_name'] : NULL;
        $check_amount = isset($_POST['check_amount']) ? $_POST['check_amount'] : NULL;
        $check_date = isset($_POST['check_date']) ? $_POST['check_date'] : NULL;

        try {
            $conn->beginTransaction();

            $availabilityStmt = $conn->prepare("SELECT * FROM Vehicles v
                WHERE v.vehicle_id = :vehicle_id
                AND NOT EXISTS (
                    SELECT 1 FROM reservations r
                    WHERE r.vehicle_id = v.vehicle_id
                    AND (
                        (r.start_date <= :end_date AND r.end_date >= :start_date)
                    )
                )");
            $availabilityStmt->bindParam(':vehicle_id', $vehicle_id);
            $availabilityStmt->bindParam(':start_date', $start_date);
            $availabilityStmt->bindParam(':end_date', $end_date);
            $availabilityStmt->execute();

            if ($availabilityStmt->rowCount() === 0) {
                $conn->rollBack();
                http_response_code(409);
                $response['status'] = 'error';
                $response['message'] = 'Car is not available for the selected dates';
                echo json_encode($response);
                exit;
            }

            $reservationStmt = $conn->prepare("INSERT INTO reservations (tenant_id, second_driver_id, vehicle_id, start_date, end_date, price_perday, total_amount, amount_paid, status) VALUES (:tenant_id, :second_driver_id, :vehicle_id, :start_date, :end_date, :price_perday, :total_amount, :amount_paid, :status)");
            $reservationStmt->bindParam(':tenant_id', $tenant_id);
            $reservationStmt->bindParam(':second_driver_id', $second_driver_id);
            $reservationStmt->bindParam(':vehicle_id', $vehicle_id);
            $reservationStmt->bindParam(':start_date', $start_date);
            $reservationStmt->bindParam(':end_date', $end_date);
            $reservationStmt->bindParam(':price_perday', $price_perday);
            $reservationStmt->bindParam(':total_amount', $total_amount);
            $reservationStmt->bindParam(':amount_paid', $amount_paid);
            $reservationStmt->bindParam(':status', $status);
            $reservationStmt->execute();
            $reservation_id = $conn->lastInsertId();

            $conn->commit();
            http_response_code(200);
            $response['status'] = 'success';
            $response['message'] = 'Reservation added successfully';
            $response['reservation_id'] = $reservation_id;
        } catch (PDOException $e) {
            $conn->rollBack();
            http_response_code(500);
            $response['status'] = 'error';
            $response['message'] = 'Error: ' . $e->getMessage();
        }
        
    } else {
        http_response_code(400);
        $response['status'] = 'error';
        $response['message'] = 'Missing required fields or invalid format';
    }
} else {
    http_response_code(405);
    $response['status'] = 'error';
    $response['message'] = 'Invalid request method';
}

echo json_encode($response);
?>
