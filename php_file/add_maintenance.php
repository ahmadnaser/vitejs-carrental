<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'dbconfig.php';

$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    if (
        isset($_POST['vehicle_id']) && 
        isset($_POST['maintenance_date']) && 
        isset($_POST['details']) && 
        isset($_POST['cost']) && 
        isset($_POST['amount_paid']) && 
        isset($_POST['trader']) && 
        isset($_POST['spare_parts']) && 
        isset($_POST['spare_parts_price']) && 
        isset($_POST['amount_paid_of_spare_parts']) && 
        isset($_POST['garage_id'])
    ) {
        $vehicle_id = $_POST['vehicle_id'];
        $maintenance_date = $_POST['maintenance_date'];
        $details = $_POST['details'];
        $cost = $_POST['cost'];
        $amount_paid = $_POST['amount_paid'];
        $trader = $_POST['trader'];
        $spare_parts = $_POST['spare_parts'];
        $spare_parts_price = $_POST['spare_parts_price'];
        $amount_paid_of_spare_parts = $_POST['amount_paid_of_spare_parts'];
        $garage_id = $_POST['garage_id'];
        $current_date = date('Y-m-d H:i:s');

        try {
            $conn->beginTransaction();

            $maintenanceStmt = $conn->prepare("INSERT INTO Maintenance (vehicle_id, maintenance_date, details, cost, amount_paid, trader, spare_parts, spare_parts_price, amount_paid_of_spare_parts, garage_id) 
            VALUES (:vehicle_id, :maintenance_date, :details, :cost, :amount_paid, :trader, :spare_parts, :spare_parts_price, :amount_paid_of_spare_parts, :garage_id)");
            $maintenanceStmt->bindParam(':vehicle_id', $vehicle_id);
            $maintenanceStmt->bindParam(':maintenance_date', $maintenance_date);
            $maintenanceStmt->bindParam(':details', $details);
            $maintenanceStmt->bindParam(':cost', $cost);
            $maintenanceStmt->bindParam(':amount_paid', $amount_paid);
            $maintenanceStmt->bindParam(':trader', $trader);
            $maintenanceStmt->bindParam(':spare_parts', $spare_parts);
            $maintenanceStmt->bindParam(':spare_parts_price', $spare_parts_price);
            $maintenanceStmt->bindParam(':amount_paid_of_spare_parts', $amount_paid_of_spare_parts);
            $maintenanceStmt->bindParam(':garage_id', $garage_id);
            $maintenanceStmt->execute();
            $maintenance_id = $conn->lastInsertId();

            $transactionStmt = $conn->prepare("INSERT INTO Transactions (date, description, debit, credit, maintenance_id) 
            VALUES (:date, :description, :debit, :credit, :maintenance_id)");

            $transactionStmt->execute([
                ':date' => $current_date,
                ':description' => 'Maintenance Expense - ' . $trader,
                ':debit' => $cost,
                ':credit' => 0,
                ':maintenance_id' => $maintenance_id
            ]);

            $transactionStmt->execute([
                ':date' => $current_date,
                ':description' => 'Maintenance Payment - ' . $trader,
                ':debit' => 0,
                ':credit' => $amount_paid,
                ':maintenance_id' => $maintenance_id
            ]);

            $conn->commit();
            http_response_code(200);
            $response['status'] = 'success';
            $response['message'] = 'Maintenance record added successfully';
            $response['maintenance_id'] = $maintenance_id;
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
