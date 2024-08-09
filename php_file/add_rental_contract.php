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
        isset($_POST['amount_paid']) && 
        isset($_POST['car_mileage']) && 
        isset($_POST['note']) 
    ) {
        $tenant_id = $_POST['tenant_id'];
        $vehicle_id = $_POST['vehicle_id'];
        $start_date = $_POST['start_timestamp'];
        $end_date = $_POST['end_timestamp'];
        $price_perday = $_POST['price_perday'];
        $total_amount = $_POST['total_amount'];
        $amount_paid = $_POST['amount_paid'];
        $car_mileage = $_POST['car_mileage'];
        $note = $_POST['note'];
        $status = 'confirmed';
        $current_date = date('Y-m-d H:i:s');

        $car_condition = isset($_POST['car_condition']) ? $_POST['car_condition'] : NULL;
        $car_damage = isset($_POST['car_damage']) ? $_POST['car_damage'] : NULL;
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

            $reservationStmt = $conn->prepare("INSERT INTO reservations (tenant_id, second_driver_id, vehicle_id, start_date, end_date, price_perday, total_amount, amount_paid, status) VALUES (:tenant_id, :2nd_driver_id, :vehicle_id, :start_date, :end_date, :price_perday, :total_amount, :amount_paid, :status)");
            $reservationStmt->bindParam(':tenant_id', $tenant_id);
            $reservationStmt->bindParam(':2nd_driver_id', $second_driver_id);
            $reservationStmt->bindParam(':vehicle_id', $vehicle_id);
            $reservationStmt->bindParam(':start_date', $start_date);
            $reservationStmt->bindParam(':end_date', $end_date);
            $reservationStmt->bindParam(':price_perday', $price_perday);
            $reservationStmt->bindParam(':total_amount', $total_amount);
            $reservationStmt->bindParam(':amount_paid', $amount_paid);
            $reservationStmt->bindParam(':status', $status);
            $reservationStmt->execute();
            $reservation_id = $conn->lastInsertId();

            $rentalStmt = $conn->prepare("INSERT INTO Rentals (reservation_id, start_date, end_date, car_mileage, note, car_condition, car_damage) VALUES (:reservation_id, :start_date, :end_date, :car_mileage, :note, :car_condition, :car_damage)");
            $rentalStmt->bindParam(':reservation_id', $reservation_id);
            $rentalStmt->bindParam(':start_date', $start_date);
            $rentalStmt->bindParam(':end_date', $end_date);
            $rentalStmt->bindParam(':car_mileage', $car_mileage);
            $rentalStmt->bindParam(':note', $note);
            $rentalStmt->bindParam(':car_condition', $car_condition);
            $rentalStmt->bindParam(':car_damage', $car_damage);
            $rentalStmt->execute();
            $rental_id = $conn->lastInsertId();


            $payment_method = $check_number ? 'bank_check' : 'cash';
            $paymentStmt = $conn->prepare("INSERT INTO payments (reservation_id, amount, payment_date, payment_method, check_number) VALUES (:reservation_id, :amount, :payment_date, :payment_method, :check_number)");
            $paymentStmt->bindParam(':reservation_id', $reservation_id);
            $paymentStmt->bindParam(':amount', $amount_paid);
            $paymentStmt->bindParam(':payment_date', $current_date);
            $paymentStmt->bindParam(':payment_method', $payment_method);
            $paymentStmt->bindParam(':check_number', $check_number);
            $paymentStmt->execute();
            $payment_id = $conn->lastInsertId();

            $tenantNameStmt = $conn->prepare("SELECT tenant_name FROM tenants WHERE id_number = :tenant_id");
            $tenantNameStmt->bindParam(':tenant_id', $tenant_id);
            $tenantNameStmt->execute();
            $tenant = $tenantNameStmt->fetch(PDO::FETCH_ASSOC);
            $tenant_name = $tenant['tenant_name'];

        
            $transactionStmt = $conn->prepare("INSERT INTO Transactions (date, description, debit, credit, payment_id) VALUES (:date, :description, :debit, :credit, :payment_id)");
        
            $transactionStmt->execute([
                ':date' => $current_date,
                ':description' => 'Rental Payment - ' . $tenant_name,
                ':debit' => $total_amount, 
                ':credit' => 0,
                ':payment_id' => $payment_id
            ]);

            $transactionStmt->execute([
                ':date' => $current_date,
                ':description' => 'Rental Payment - ' . $tenant_name,
                ':debit' => 0,
                ':credit' => $amount_paid, 
                ':payment_id' => $payment_id
            ]);

            if ($payment_method === 'bank_check') {
                $checkStmt = $conn->prepare("INSERT INTO BankChecks (check_number, amount, bank_name, check_date) VALUES (:check_number, :amount, :bank_name, :check_date)");
                $checkStmt->bindParam(':check_number', $check_number);
                $checkStmt->bindParam(':amount', $check_amount);
                $checkStmt->bindParam(':bank_name', $bank_name);
                $checkStmt->bindParam(':check_date', $check_date);
                $checkStmt->execute();
            }

            $conn->commit();
            http_response_code(200);
            $response['status'] = 'success';
            $response['message'] = 'Reservation, rental, and payment added successfully';
            $response['reservation_id'] = $reservation_id;
            $response['rental_id'] = $rental_id;
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
