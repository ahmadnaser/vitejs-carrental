<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'dbconfig.php'; 

$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Get POST parameters directly
    if (
        isset($_POST['tenant_id']) && 
        isset($_POST['vehicle_id']) && 
        isset($_POST['start_date']) && 
        isset($_POST['end_date']) && 
        isset($_POST['price_perday']) && 
        isset($_POST['total_amount']) && 
        isset($_POST['amount_paid'])
    ) {

        $second_driver_id = isset($_POST['2nd_driver_id']) ? $_POST['2nd_driver_id'] : NULL;
        $bank_check_id = isset($_POST['bank_check_id']) ? $_POST['bank_check_id'] : NULL;
        
        $tenant_id = $_POST['tenant_id'];
        $vehicle_id = $_POST['vehicle_id'];
        $start_date = $_POST['start_date'];
        $end_date = $_POST['end_date'];
        $price_perday = $_POST['price_perday'];
        $total_amount = $_POST['total_amount'];
        $amount_paid = $_POST['amount_paid'];
        $status = 'confirmed'; 

        try {
          
            $vehicleCheckStmt = $conn->prepare("SELECT COUNT(*) FROM Vehicles WHERE vehicle_id = :tenant_id");
            $vehicleCheckStmt->bindParam(':vehicle_id', $tenant_id);
            $vehicleCheckStmt->execute();
            $vehicleExists = $vehicleCheckStmt->fetchColumn();
            
            if ($vehicleExists == 0) {
                http_response_code(400);
                throw new PDOException("Vehicle ID does not exist.");
            }

            $tenantCheckStmt = $conn->prepare("SELECT COUNT(*) FROM Tenants WHERE 	id_number  = :vehicle_id");
            $tenantCheckStmt->bindParam(':tenant_id', $vehicle_id);
            $tenantCheckStmt->execute();
            $tenantExists = $tenantCheckStmt->fetchColumn();
            
            if ($tenantExists == 0) {
                http_response_code(400);
                throw new PDOException("Tenant ID does not exist.");
            }

            $stmt = $conn->prepare("INSERT INTO reservations (tenant_id, 2nd_driver_id, vehicle_id, start_date, end_date, price_perday, total_amount, amount_paid, bank_check_id, status) VALUES (:tenant_id, :second_driver_id, :vehicle_id, :start_date, :end_date, :price_perday, :total_amount, :amount_paid, :bank_check_id, :status)");
            
            $stmt->bindParam(':tenant_id', $tenant_id);
            $stmt->bindParam(':second_driver_id', $second_driver_id);
            $stmt->bindParam(':vehicle_id', $vehicle_id);
            $stmt->bindParam(':start_date', $start_date);
            $stmt->bindParam(':end_date', $end_date);
            $stmt->bindParam(':price_perday', $price_perday);
            $stmt->bindParam(':total_amount', $total_amount);
            $stmt->bindParam(':amount_paid', $amount_paid);
            $stmt->bindParam(':bank_check_id', $bank_check_id);
            $stmt->bindParam(':status', $status);
             
            if ($stmt->execute()) {
                http_response_code(200);
             
                $response['status'] = 'success';
                $response['message'] = 'Reservation added successfully';
                $response['reservation_id'] = $conn->lastInsertId();
            } else {
                http_response_code(500);
        
                $response['status'] = 'error';
                $response['message'] = 'Failed to add reservation';
            }
            
        } catch (PDOException $e) {
            http_response_code(500);
            $response['status'] = 'error';
            $response['message'] = 'Error: ' . $e->getMessage(); // Catch any PDO exceptions
        }
        
    } else {
        http_response_code(400);
        $response['status'] = 'error';
        $response['message'] = 'Missing required fields';
    }
} else {
    http_response_code(405);
    $response['status'] = 'error';
    $response['message'] = 'Invalid request method';
}

http_response_code(200);
echo json_encode($response);

?>
