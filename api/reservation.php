<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
include 'dbconfig.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); 
    exit();
}

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

        if (strtotime($end_date) < strtotime($start_date)) {
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

        
            $unique_filename = uniqid() . '.' . $file_extension;
            $check_image = $target_dir . $unique_filename;

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
            

            if ($check_number && $check_date &&$check_holder && $bank_name) {
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
            
            $payment_method = $check_number ? 'Bank Check' : 'Cash';
            $paymentStmt = $conn->prepare("INSERT INTO Payments (amount, payment_date, payment_method, check_id,invoice_id) VALUES (:amount, :payment_date, :payment_method, :check_id,:invoice_id)");
            $paymentStmt->bindParam(':amount', $amount_paid);
            $paymentStmt->bindParam(':payment_date', $current_date);
            $paymentStmt->bindParam(':payment_method', $payment_method);
            $paymentStmt->bindParam(':check_id', $check_id);
            $paymentStmt->bindParam(':invoice_id', $invoice_id);
            $paymentStmt->execute();
            $payment_id = $conn->lastInsertId();

            $tenantNameStmt = $conn->prepare("SELECT tenant_name FROM tenants WHERE id_number = :tenant_id");
            $tenantNameStmt->bindParam(':tenant_id', $tenant_id);
            $tenantNameStmt->execute();
            $tenant = $tenantNameStmt->fetch(PDO::FETCH_ASSOC);
            $tenant_name = $tenant['tenant_name'];
            
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

            $transactionStmt = $conn->prepare("INSERT INTO Transactions (date, description, debit, credit,payment_id) VALUES (:date, :description, :debit, :credit,:payment_id)");
            $transactionStmt->execute([
                ':date' => $current_date,
                 ':description' => 'المطلوب مقابل عقد الايجار - ' . $tenant_name,
                ':debit' => $total_amount, 
                ':credit' => 0,
                ':payment_id' => $payment_id
            ]);
            $transaction_id = $conn->lastInsertId();
                     
            $transactionStmt = $conn->prepare("INSERT INTO Transactions (date, description, debit, credit,payment_id) VALUES (:date, :description, :debit, :credit,:payment_id)");
            $transactionStmt->execute([
                ':date' => $current_date,
                ':description' => 'دفعة مالية  - ' . $tenant_name,
                ':debit' => 0,
                ':credit' => $amount_paid,
                ':payment_id' => $payment_id
                
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
        $reservation_id = $_GET['reservation_id'] ?? null;
        $vehicle_id = $_GET['vehicle_id'] ?? null;
    
        try {
            if ($reservation_id) {
                $stmt = $conn->prepare("
                   SELECT 
                        Reservations.*,
                        Invoices.amount_paid,
                        Invoices.total_amount,
                        Invoices.price_perday,
                        SecondDriver.tenant_name AS second_driver_name,
                        Tenants.*,
                        Vehicles.*,
                        DATEDIFF(Reservations.end_date, Reservations.start_date) AS dayNum 
                    FROM 
                        Reservations
                    INNER JOIN 
                        Invoices ON Reservations.invoice_id = Invoices.invoice_id
                    INNER JOIN 
                        Tenants ON Reservations.tenant_id = Tenants.id_number
                    INNER JOIN 
                        Vehicles ON Reservations.vehicle_id = Vehicles.vehicle_id
                    LEFT JOIN
                         Tenants AS SecondDriver ON Reservations.second_driver_id = SecondDriver.id_number
                    WHERE 
                        Reservations.reservation_id = :reservation_id
                ");
                $stmt->bindParam(':reservation_id', $reservation_id, PDO::PARAM_INT);
            } elseif ($vehicle_id) {
                $stmt = $conn->prepare("
                    SELECT 
                        Reservations.*,
                        Invoices.amount_paid,
                        Invoices.total_amount,
                        Invoices.price_perday,
                        SecondDriver.tenant_name AS second_driver_name,
                        Tenants.*,
                        Vehicles.*,
                        DATEDIFF(Reservations.end_date, Reservations.start_date) AS dayNum 
                    FROM 
                        Reservations
                    INNER JOIN 
                        Invoices ON Reservations.invoice_id = Invoices.invoice_id
                    INNER JOIN 
                        Tenants ON Reservations.tenant_id = Tenants.id_number
                    INNER JOIN 
                        Vehicles ON Reservations.vehicle_id = Vehicles.vehicle_id
                    LEFT JOIN
                         Tenants AS SecondDriver ON Reservations.second_driver_id = SecondDriver.id_number
                    WHERE 
                        Reservations.vehicle_id = :vehicle_id
                    ORDER BY 
                        Reservations.reservation_id DESC
                ");
                $stmt->bindParam(':vehicle_id', $vehicle_id, PDO::PARAM_STR);
            } else {
                $stmt = $conn->prepare("
                    SELECT 
                        Reservations.*,
                        Invoices.amount_paid,
                        Invoices.total_amount,
                        Invoices.price_perday
                    FROM 
                        Reservations
                    INNER JOIN 
                        Invoices ON Reservations.invoice_id = Invoices.invoice_id
                    WHERE 
                        Reservations.status = 'pending'
                    ORDER BY 
                        Reservations.reservation_id DESC
                ");
            }
    
            $stmt->execute();
            $reservations = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            echo json_encode($reservations);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }


    }  elseif ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        $data = json_decode(file_get_contents("php://input"), true);
    
        if ($data === null) {
            http_response_code(400);
            echo json_encode(["message" => "Invalid JSON input"]);
            exit;
        }
    
        if (isset($data['reservation_id'])) {
            $reservation_id = $data['reservation_id'];
    
            try {
                $conn->beginTransaction();
    
                $rentalStmt = $conn->prepare("
                    SELECT r.start_date, r.end_date, r.vehicle_id 
                    FROM Reservations r 
                    WHERE r.reservation_id = :reservation_id
                ");
                $rentalStmt->bindParam(':reservation_id', $reservation_id, PDO::PARAM_INT);
                $rentalStmt->execute();
                $rental = $rentalStmt->fetch(PDO::FETCH_ASSOC);
    
                if (!$rental) {
                    throw new Exception('Reservstion not found');
                }
    
                $start_date = $rental['start_date'];
                $end_date = $rental['end_date'];
                $current_vehicle_id = $rental['vehicle_id'];
    
                if (isset($data['end_date']) && count($data) === 2){
                    $new_end_date = $data['end_date'];

                    if (strtotime($new_end_date) < strtotime($start_date)) {
                        http_response_code(400);
                        echo json_encode([
                            "status" => "error",
                            "message" => "End date cannot be earlier than the start date"
                        ]);
                        exit;
                    }
                
    
                    $availabilityStmt = $conn->prepare("
                        SELECT r.reservation_id FROM Reservations r
                        WHERE r.vehicle_id = :vehicle_id
                        AND r.reservation_id != :reservation_id
                        AND (
                            (r.start_date <= :new_end_date AND r.end_date >= :new_end_date)
                            OR 
                            (r.start_date <= :start_date AND r.end_date >= :start_date)
                        )
                    ");
    
                    $availabilityStmt->bindParam(':vehicle_id', $current_vehicle_id, PDO::PARAM_INT);
                    $availabilityStmt->bindParam(':reservation_id', $reservation_id, PDO::PARAM_INT);
                    $availabilityStmt->bindParam(':start_date', $start_date, PDO::PARAM_STR);
                    $availabilityStmt->bindParam(':new_end_date', $new_end_date, PDO::PARAM_STR);
                    $availabilityStmt->execute();
    
                    if ($availabilityStmt->rowCount() > 0) {
                        http_response_code(409);
                        echo json_encode([
                            "status" => "error",
                            "message" => "Car is not available for the selected dates"
                        ]);
                        exit;
                    }
    
                    $updateReservationStmt = $conn->prepare("UPDATE Reservations SET end_date = :new_end_date WHERE reservation_id = :reservation_id");
                    $updateReservationStmt->bindParam(':new_end_date', $new_end_date, PDO::PARAM_STR);
                    $updateReservationStmt->bindParam(':reservation_id', $reservation_id, PDO::PARAM_INT);
                    $updateReservationStmt->execute();
    
                    $invoiceStmt = $conn->prepare("SELECT i.price_perday, r.invoice_id FROM Reservations r INNER JOIN Invoices i ON r.invoice_id = i.Invoice_id WHERE r.reservation_id = :reservation_id");
                    $invoiceStmt->bindParam(':reservation_id', $reservation_id, PDO::PARAM_INT);
                    $invoiceStmt->execute();
                    $invoice = $invoiceStmt->fetch(PDO::FETCH_ASSOC);
    
                    if (!$invoice) {
                        throw new Exception('Invoice not found');
                    }
    
                    $price_perday = $invoice['price_perday'];
                    $invoice_id = $invoice['invoice_id'];
    
                    $dateDiffStmt = $conn->prepare("SELECT DATEDIFF(:new_end_date, :start_date) AS dayNum");
                    $dateDiffStmt->bindParam(':new_end_date', $new_end_date);
                    $dateDiffStmt->bindParam(':start_date', $start_date);
                    $dateDiffStmt->execute();
                    $days = $dateDiffStmt->fetch(PDO::FETCH_ASSOC)['dayNum'];
    
                    $new_total_amount = $price_perday * $days;
    
                    $updateInvoiceStmt = $conn->prepare("UPDATE Invoices SET total_amount = :new_total_amount WHERE Invoice_id = :invoice_id");
                    $updateInvoiceStmt->bindParam(':new_total_amount', $new_total_amount, PDO::PARAM_STR);
                    $updateInvoiceStmt->bindParam(':invoice_id', $invoice_id, PDO::PARAM_INT);
                    $updateInvoiceStmt->execute();
                }
    
                $fieldsToUpdate = [
                    'tenant_id' => 'tenant_id',
                    'vehicle_id' => 'vehicle_id',
                    'start_date' => 'start_date',
                    'end_date' => 'end_date',
                    'price_perday' => 'price_perday',
                    'total_amount' => 'total_amount',
                    'second_driver_id' => 'second_driver_id',
                ];
    
                foreach ($fieldsToUpdate as $key => $field) {
                    if (isset($data[$key])) {
                        if ($key === 'vehicle_id') {
                            $new_vehicle_id = $data['vehicle_id'];
                            $availabilityStmt = $conn->prepare("
                                SELECT r.reservation_id FROM Reservations r
                                WHERE r.vehicle_id = :new_vehicle_id
                                AND r.reservation_id != :reservation_id
                                AND (
                                    (r.start_date <= :end_date AND r.end_date >= :end_date)
                                    OR 
                                    (r.start_date <= :start_date AND r.end_date >= :start_date)
                                )
                            ");
    
                            $availabilityStmt->bindParam(':new_vehicle_id', $new_vehicle_id, PDO::PARAM_INT);
                            $availabilityStmt->bindParam(':reservation_id', $reservation_id, PDO::PARAM_INT);
                            $availabilityStmt->bindParam(':start_date', $start_date, PDO::PARAM_STR);
                            $availabilityStmt->bindParam(':end_date', $end_date, PDO::PARAM_STR);
                            $availabilityStmt->execute();
    
                            $conflictingReservations = $availabilityStmt->fetchAll(PDO::FETCH_ASSOC);
    
                            if (count($conflictingReservations) > 0) {
                                $conflictIds = array_column($conflictingReservations, 'reservation_id');
                                $conflictIdsString = implode(', ', $conflictIds);
                                http_response_code(409);
                                echo json_encode([
                                    "status" => "error",
                                    "message" => "New vehicle is not available for the selected dates. Conflicts with reservation IDs: " . $conflictIdsString
                                ]);
                                exit;
                            }
    
                           
                            $updateStmt = $conn->prepare("UPDATE Reservations SET vehicle_id = :new_vehicle_id WHERE reservation_id = :reservation_id");
                            $updateStmt->bindParam(':new_vehicle_id', $new_vehicle_id);
                            $updateStmt->bindParam(':reservation_id', $reservation_id, PDO::PARAM_INT);
                            $updateStmt->execute();
    
                        } elseif ($key === 'tenant_id') {
                            $new_tenant_id = $data['tenant_id'];
    
                            $updateStmt = $conn->prepare("UPDATE Reservations SET tenant_id = :new_tenant_id WHERE reservation_id = :reservation_id");
                            $updateStmt->bindParam(':new_tenant_id', $new_tenant_id, PDO::PARAM_INT);
                            $updateStmt->bindParam(':reservation_id', $reservation_id, PDO::PARAM_INT);
                            $updateStmt->execute();
    
                        } elseif ($key === 'second_driver_id') {
                            $new_second_driver_id = $data['second_driver_id'];
    
                            $updateStmt = $conn->prepare("UPDATE Reservations SET second_driver_id = :new_second_driver_id WHERE reservation_id = :reservation_id");
                            $updateStmt->bindParam(':new_second_driver_id', $new_second_driver_id, PDO::PARAM_INT);
                            $updateStmt->bindParam(':reservation_id', $reservation_id, PDO::PARAM_INT);
                            $updateStmt->execute();
    
                        } elseif ($key === 'start_date') {
                            $new_start_date = $data['start_date'];
                
                            $updateStmt = $conn->prepare("UPDATE Reservations SET start_date = :new_start_date WHERE reservation_id = :reservation_id");
                            $updateStmt->bindParam(':new_start_date', $new_start_date, PDO::PARAM_STR);
                            $updateStmt->bindParam(':reservation_id', $reservation_id, PDO::PARAM_INT);
                            $updateStmt->execute();
    
                        } elseif ($key === 'end_date') {
                            $new_end_date = $data['end_date'];
    
                            $updateStmt = $conn->prepare("UPDATE Reservations SET end_date = :new_end_date WHERE reservation_id = :reservation_id");
                            $updateStmt->bindParam(':new_end_date', $new_end_date, PDO::PARAM_STR);
                            $updateStmt->bindParam(':reservation_id', $reservation_id, PDO::PARAM_INT);
                            $updateStmt->execute();
    
                        } elseif ($key === 'price_perday' || $key === 'total_amount') {
                            $price_perday = $data['price_perday'] ?? null;
                
                            $invoiceStmt = $conn->prepare("SELECT start_date, end_date FROM Reservations WHERE reservation_id = :reservation_id");
                            $invoiceStmt->bindParam(':reservation_id', $reservation_id, PDO::PARAM_INT);
                            $invoiceStmt->execute();
                            $reservation = $invoiceStmt->fetch(PDO::FETCH_ASSOC);
                
                            if (!$reservation) {
                                throw new Exception('Reservation not found');
                            }
                
                            $start_date = $reservation['start_date'];
                            $end_date = $reservation['end_date'];
                
                            $dateDiffStmt = $conn->prepare("SELECT DATEDIFF(:end_date, :start_date) AS dayNum");
                            $dateDiffStmt->bindParam(':end_date', $end_date);
                            $dateDiffStmt->bindParam(':start_date', $start_date);
                            $dateDiffStmt->execute();
                            $days = $dateDiffStmt->fetch(PDO::FETCH_ASSOC)['dayNum'] + 1;
                
                            if ($price_perday !== null) {
                                $new_total_amount = $price_perday * $days;
                                $updateInvoiceStmt = $conn->prepare("UPDATE Invoices SET price_perday = :price_perday, total_amount = :new_total_amount WHERE invoice_id = (SELECT invoice_id FROM Reservations WHERE reservation_id = :reservation_id)");
                                $updateInvoiceStmt->bindParam(':price_perday', $price_perday, PDO::PARAM_STR);
                                $updateInvoiceStmt->bindParam(':new_total_amount', $new_total_amount, PDO::PARAM_STR);
                                $updateInvoiceStmt->bindParam(':reservation_id', $reservation_id, PDO::PARAM_INT);
                                $updateInvoiceStmt->execute();
                            }
                
                            if (isset($data['total_amount'])) {
                                $new_total_amount = $data['total_amount'];
                                $updateInvoiceStmt = $conn->prepare("UPDATE Invoices SET total_amount = :new_total_amount WHERE invoice_id = (SELECT invoice_id FROM Reservations WHERE reservation_id = :reservation_id)");
                                $updateInvoiceStmt->bindParam(':new_total_amount', $new_total_amount, PDO::PARAM_STR);
                                $updateInvoiceStmt->bindParam(':reservation_id', $reservation_id, PDO::PARAM_INT);
                                $updateInvoiceStmt->execute();
                            }
    
                        } else {
                            $updateStmt = $conn->prepare("UPDATE Reservations SET $field = :value WHERE reservation_id = :reservation_id");
                            $updateStmt->bindParam(':value', $data[$key], PDO::PARAM_STR);
                            $updateStmt->bindParam(':reservation_id', $reservation_id, PDO::PARAM_INT);
                            $updateStmt->execute();
                        }
                    }
                }
    
                $conn->commit();
    
                http_response_code(200);
                echo json_encode([
                    "status" => "success",
                    "message" => "Rental contract updated successfully"
                ]);
            } catch (PDOException $e) {
                $conn->rollBack();
                http_response_code(500);
                echo json_encode([
                    "status" => "error",
                    "message" => 'Error: ' . $e->getMessage()
                ]);
            } catch (Exception $e) {
                $conn->rollBack();
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => $e->getMessage()
                ]);
            }
        } else {
            http_response_code(400);
            echo json_encode([
                "status" => "error",
                "message" => "Missing reservation_id"
            ]);
        }
    
    } elseif ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
       
        $reservation_id = $_GET['reservation_id'] ?? null;
    
        if ($reservation_id) {
            try {
                $conn->beginTransaction();
    
                
                $stmt = $conn->prepare('DELETE FROM Reservations WHERE reservation_id = :reservation_id');
                $stmt->bindParam(':reservation_id', $reservation_id, PDO::PARAM_INT);
                $stmt->execute();
                
                $conn->commit();
    
                http_response_code(200);
                echo json_encode(["status" => "success", "message" => "Rental and associated reservations deleted successfully"]);
            } catch (PDOException $e) {
                $conn->rollBack();
                http_response_code(500);
                echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Reservation ID is required"]);
        }
    } else {
        http_response_code(405);
        $response['status'] = 'error';
        $response['message'] = 'Invalid request method';
        echo json_encode($response);
    }
    
    $conn = null;
    ?>
