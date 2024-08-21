<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'dbconfig.php';

$response = array();

function convertArabicNumbers($string) {
    $arabic = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    $western = ['0','1','2','3','4','5','6','7','8','9'];
    return str_replace($arabic, $western, $string);
}

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
        $tenant_id = convertArabicNumbers($_POST['tenant_id']);
        $vehicle_id = convertArabicNumbers($_POST['vehicle_id']);
        $start_date = $_POST['start_timestamp'];
        $end_date = $_POST['end_timestamp'];
        $price_perday = convertArabicNumbers($_POST['price_perday']);
        $total_amount = convertArabicNumbers($_POST['total_amount']);
        $amount_paid = convertArabicNumbers($_POST['amount_paid']);
        $status = 'pending';
        $current_date = date('Y-m-d H:i:s');

        if (strtotime($end_date) <= strtotime($start_date)) {
            http_response_code(400);
            $response['status'] = 'error';
            $response['message'] = 'End date must be greater than start date';
            echo json_encode($response);
            exit;
        }

        $second_driver_id = isset($_POST['secondDriverId']) ? convertArabicNumbers($_POST['secondDriverId']) : NULL;
        $check_number = isset($_POST['check_number']) ? convertArabicNumbers($_POST['check_number']) : NULL;
        $bank_name = isset($_POST['bank_name']) ? $_POST['bank_name'] : NULL;
        $check_date = isset($_POST['check_date']) ? $_POST['check_date'] : NULL;
        $check_holder =isset($_POST['check_holder']) ? $_POST['check_holder'] : NULL;
        $account_number=isset($_POST['account_number']) ? convertArabicNumbers($_POST['account_number']) : NULL;

        $check_image = NULL;
        $target_dir = "check_uploads/";
            
        if (isset($_FILES['check_image']) && $_FILES['check_image']['error'] == 0) {

            if (!is_dir($target_dir)) {
                $response['status'] = 'error';
                $response['message'] = 'Upload directory does not exist.';
                http_response_code(500);
                echo json_encode($response);
                exit();
            }

            if (!is_writable($target_dir)) {
                $response['status'] = 'error';
                $response['message'] = 'Upload directory is not writable.';
                http_response_code(500);
                echo json_encode($response);
                exit();
            }

            $allowed_extensions = ['jpg', 'jpeg', 'png', 'gif'];
            $file_extension = pathinfo($_FILES['check_image']['name'], PATHINFO_EXTENSION);

            if (!in_array(strtolower($file_extension), $allowed_extensions)) {
                $response['status'] = 'error';
                $response['message'] = 'Invalid file extension. Only JPG, JPEG, PNG, and GIF are allowed.';
                http_response_code(400);
                echo json_encode($response);
                exit();
            }

            $check_image = $target_dir . basename($_FILES['check_image']['name']);

            if (!move_uploaded_file($_FILES['check_image']['tmp_name'], $check_image)) {
                $response['status'] = 'error';
                $response['message'] = 'Failed to upload check image.';
                http_response_code(500);
                echo json_encode($response);
                exit();
            }
        }

        try {
            $conn->beginTransaction();

            $blacklistStmt = $conn->prepare("SELECT COUNT(*) FROM BlackList WHERE id_number = :tenant_id");
            $blacklistStmt->bindParam(':tenant_id', $tenant_id);
            $blacklistStmt->execute();
            $blacklistCount = $blacklistStmt->fetchColumn();
            
            if ($blacklistCount > 0) {
                $conn->rollBack();
                http_response_code(403);
                $response['status'] = 'error';
                $response['message'] = 'Tenant is blacklisted';
                echo json_encode($response);
                exit;
            }
            

            $availabilityStmt = $conn->prepare("SELECT * FROM Vehicles v
                WHERE v.vehicle_id = :vehicle_id
                AND NOT EXISTS (
                    SELECT 1 FROM Reservations r
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

            $invoicesStmt = $conn->prepare("INSERT INTO Invoices (price_perday, total_amount, amount_paid) VALUES (:price_perday, :total_amount, :amount_paid)");
            $invoicesStmt->bindParam(':price_perday', $price_perday);
            $invoicesStmt->bindParam(':total_amount', $total_amount);
            $invoicesStmt->bindParam(':amount_paid', $amount_paid);
            $invoicesStmt->execute();
            $invoice_id = $conn->lastInsertId();
            

            if ($payment_method === 'bank_check') {
                $checkStmt = $conn->prepare("INSERT INTO BankChecks (check_number, account_number, check_holder, bank_name, check_date, check_image) VALUES (:check_number, :account_number, :check_holder, :bank_name, :check_date, :check_image)");
                $checkStmt->bindParam(':check_number', $check_number);
                $checkStmt->bindParam(':account_number', $account_number);
                $checkStmt->bindParam(':check_holder', $check_holder);
                $checkStmt->bindParam(':bank_name', $bank_name);
                $checkStmt->bindParam(':check_date', $check_date);
                $checkStmt->bindParam(':check_image', $check_image);
                $checkStmt->execute();
                $check_id = $conn->lastInsertId();
            }else {
                $check_id = null; 
            }
            
            $payment_method = $check_number ? 'bank_check' : 'cash';
            $paymentStmt = $conn->prepare("INSERT INTO Payments (amount, payment_date, payment_method, check_id,invoice_id) VALUES (:amount, :payment_date, :payment_method, :check_id,:invoice_id)");
            $paymentStmt->bindParam(':amount', $amount_paid);
            $paymentStmt->bindParam(':payment_date', $current_date);
            $paymentStmt->bindParam(':payment_method', $payment_method);
            $paymentStmt->bindParam(':check_id', $check_id);
            $paymentStmt->bindParam(':invoice_id', $invoice_id);
            $paymentStmt->execute();
            $payment_id = $conn->lastInsertId();
            
            $transactionStmt = $conn->prepare("INSERT INTO Transactions (date, description, debit, credit,payment_id) VALUES (:date, :description, :debit, :credit,:payment_id)");
            $transactionStmt->execute([
                ':date' => $current_date,
                ':description' => 'المطلوب مقابل عقد الايجار ' ,
                ':debit' => $total_amount, 
                ':credit' => 0,
                ':payment_id' => $payment_id
            ]);
            $transaction_id = $conn->lastInsertId();
         

            $reservationStmt = $conn->prepare("INSERT INTO Reservations (tenant_id, second_driver_id, vehicle_id,invoice_id, start_date, end_date, status) VALUES (:tenant_id, :2nd_driver_id, :vehicle_id,:invoice_id, :start_date, :end_date, :status)");
            $reservationStmt->bindParam(':tenant_id', $tenant_id);
            $reservationStmt->bindParam(':2nd_driver_id', $second_driver_id);
            $reservationStmt->bindParam(':vehicle_id', $vehicle_id);
            $reservationStmt->bindParam(':invoice_id', $invoice_id);
            $reservationStmt->bindParam(':start_date', $start_date);
            $reservationStmt->bindParam(':end_date', $end_date);
            $reservationStmt->bindParam(':status', $status);
            $reservationStmt->execute();
            $reservation_id = $conn->lastInsertId();

            $tenantNameStmt = $conn->prepare("SELECT tenant_name FROM tenants WHERE id_number = :tenant_id");
            $tenantNameStmt->bindParam(':tenant_id', $tenant_id);
            $tenantNameStmt->execute();
            $tenant = $tenantNameStmt->fetch(PDO::FETCH_ASSOC);
            $tenant_name = $tenant['tenant_name'];
            
            $transactionStmt = $conn->prepare("INSERT INTO Transactions (date, description, debit, credit) VALUES (:date, :description, :debit, :credit)");
            $transactionStmt->execute([
                ':date' => $current_date,
                ':description' => 'دفعة مالية  - ' . $tenant_name,
                ':debit' => 0,
                ':credit' => $amount_paid,
                
            ]);
            
            

            $conn->commit();
            http_response_code(200);
            $response['status'] = 'success';
            $response['message'] = 'Reservation, rental, and payment added successfully';
            echo json_encode($response);
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
    } elseif ($_SERVER['REQUEST_METHOD'] == 'GET') {
        try {
            $stmt = $conn->prepare("
            SELECT 
                Reservations.*,
                Invoices.amount_paid,
                Invoices.total_amount,
                Invoices.price_perday
            FROM 
                Reservations
            INNER JOIN 
                Invoices ON Reservations.invoice_id = Invoices.Invoice_id
            ORDER BY 
                Reservations.reservation_id DESC
        ");
        
        
            $stmt->execute();
            $reservations = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($reservations);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    } else {
        http_response_code(405);
        $response['status'] = 'error';
        $response['message'] = 'Invalid request method';
        echo json_encode($response);
    }

    $conn = null;
?>
