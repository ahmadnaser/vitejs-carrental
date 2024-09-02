<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
include 'dbconfig.php';

$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}


function convertArabicNumbers($string) {
    $arabic = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    $western = ['0','1','2','3','4','5','6','7','8','9'];
    return str_replace($arabic, $western, $string);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $requiredFields = [
        'tenant_id' => 'Tenant ID',
        'vehicle_id' => 'Vehicle ID',
        'start_timestamp' => 'Start Date',
        'end_timestamp' => 'End Date',
        'price_perday' => 'Price Per Day',
        'total_amount' => 'Total Amount',
        'amount_paid' => 'Amount Paid',
        'car_mileage' => 'Car Mileage',
        'note' => 'Note'
    ];

    $missingFields = [];

    foreach ($requiredFields as $field => $name) {
        if (!isset($_POST[$field]) || empty($_POST[$field])) {
            $missingFields[] = $name;
        }
    }

    if (!empty($missingFields)) {
        http_response_code(400);
        $response['status'] = 'error';
        $response['message'] = 'Missing required fields: ' . implode(', ', $missingFields);
        echo json_encode($response);
        exit;
    }

    $tenant_id = convertArabicNumbers($_POST['tenant_id']);
    $vehicle_id = convertArabicNumbers($_POST['vehicle_id']);
    $start_date = $_POST['start_timestamp'];
    $end_date = $_POST['end_timestamp'];
    $price_perday = convertArabicNumbers($_POST['price_perday']);
    $total_amount = convertArabicNumbers($_POST['total_amount']);
    $amount_paid = convertArabicNumbers($_POST['amount_paid']);
    $car_mileage = convertArabicNumbers($_POST['car_mileage']);
    $note = $_POST['note'];
    $status = 'confirmed';
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

    $car_condition = isset($_POST['car_condition']) ? $_POST['car_condition'] : NULL;
    $car_damage = isset($_POST['car_damage']) ? $_POST['car_damage'] : NULL;
    $second_driver_id = isset($_POST['secondDriverId']) ? convertArabicNumbers($_POST['secondDriverId']) : NULL;
    $reservation_id = isset($_POST['reservation_id']) ? $_POST['reservation_id'] : NULL;

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

        if ($reservation_id) {
            $reservationStmt = $conn->prepare("SELECT * FROM Reservations WHERE reservation_id = :reservation_id");
            $reservationStmt->bindParam(':reservation_id', $reservation_id);
            $reservationStmt->execute();
            $reservation = $reservationStmt->fetch(PDO::FETCH_ASSOC);

            if (!$reservation) {
                $conn->rollBack();
                http_response_code(404);
                $response['status'] = 'error';
                $response['message'] = 'Reservation not found';
                echo json_encode($response);
                exit;
            }

            $updateReservationStatusStmt = $conn->prepare("UPDATE Reservations SET status = 'confirmed' WHERE reservation_id = :reservation_id");
            $updateReservationStatusStmt->bindParam(':reservation_id', $reservation_id);
            $updateReservationStatusStmt->execute();

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

            $vehicle_id = $reservation['vehicle_id'];
            $updateVehicleMileageStmt = $conn->prepare("UPDATE Vehicles SET mileage = :car_mileage WHERE vehicle_id = :vehicle_id");
            $updateVehicleMileageStmt->bindParam(':car_mileage', $car_mileage);
            $updateVehicleMileageStmt->bindParam(':vehicle_id', $vehicle_id);
            $updateVehicleMileageStmt->execute();

        } else {
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

            $reservationStmt = $conn->prepare("INSERT INTO Reservations (tenant_id, second_driver_id, vehicle_id, invoice_id, start_date, end_date, status) VALUES (:tenant_id, :2nd_driver_id, :vehicle_id, :invoice_id, :start_date, :end_date, :status)");
            $reservationStmt->bindParam(':tenant_id', $tenant_id);
            $reservationStmt->bindParam(':2nd_driver_id', $second_driver_id);
            $reservationStmt->bindParam(':vehicle_id', $vehicle_id);
            $reservationStmt->bindParam(':invoice_id', $invoice_id);
            $reservationStmt->bindParam(':start_date', $start_date);
            $reservationStmt->bindParam(':end_date', $end_date);
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

            $updateVehicleMileageStmt = $conn->prepare("UPDATE Vehicles SET mileage = :car_mileage WHERE vehicle_id = :vehicle_id");
            $updateVehicleMileageStmt->bindParam(':car_mileage', $car_mileage);
            $updateVehicleMileageStmt->bindParam(':vehicle_id', $vehicle_id);
            $updateVehicleMileageStmt->execute();

            $tenantNameStmt = $conn->prepare("SELECT tenant_name FROM Tenants WHERE id_number = :tenant_id");
            $tenantNameStmt->bindParam(':tenant_id', $tenant_id);
            $tenantNameStmt->execute();
            $tenant = $tenantNameStmt->fetch(PDO::FETCH_ASSOC);
            $tenant_name = $tenant['tenant_name'];

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

        }

        $conn->commit();
        http_response_code(200);
        $response['status'] = 'success';
        $response['message'] = 'Rental created successfully';
        echo json_encode($response);
    } catch (PDOException $e) {
        $conn->rollBack();
        http_response_code(500);
        $response['status'] = 'error';
        $response['message'] = 'Error: ' . $e->getMessage();
        echo json_encode($response);
    }

} elseif ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['tenant_id']) || isset($_GET['rental_id'])) {
        $tenantId = isset($_GET['tenant_id']) ? convertArabicNumbers($_GET['tenant_id']) : null;
        $rentalId = isset($_GET['rental_id']) ? convertArabicNumbers($_GET['rental_id']) : null;
        $startDate = isset($_GET['start_date']) ? $_GET['start_date'] : null;
        $endDate = isset($_GET['end_date']) ? $_GET['end_date'] : null;

        if ($tenantId === null && $rentalId === null) {
            http_response_code(400);
            echo json_encode(["message" => "Tenant ID or Rental ID is required"]);
            exit;
        }

        $sql = "
        SELECT 
            Rentals.*,
            Vehicles.*, 
            Tenants.*,
            Tenants.tenant_name AS customer,
            Tenants.id_number AS tenantID,
            Reservations.end_date AS end_date_agreed, 
            Reservations.second_driver_id,
            SecondDriver.tenant_name AS second_driver_name,
            Invoices.price_perday, 
            Vehicles.mileage,
            Invoices.total_amount, 
            Invoices.amount_paid, 
            DATEDIFF(Rentals.end_date, Rentals.start_date) AS dayNum, 
            Rentals.note AS note,
            GROUP_CONCAT(CONCAT(Payments.amount, ' on ', Payments.payment_date) ORDER BY Payments.payment_date DESC SEPARATOR '; ') AS payment_details
        FROM Rentals
        INNER JOIN Reservations ON Rentals.reservation_id = Reservations.reservation_id
        INNER JOIN Invoices ON Invoices.Invoice_id = Reservations.Invoice_id
        INNER JOIN Vehicles ON Reservations.vehicle_id = Vehicles.vehicle_id
        INNER JOIN Tenants ON Reservations.tenant_id = Tenants.id_number
        LEFT JOIN Tenants AS SecondDriver ON Reservations.second_driver_id = SecondDriver.id_number 
        LEFT JOIN Payments ON Invoices.Invoice_id = Payments.invoice_id
        WHERE 1 = 1

    ";

        if ($tenantId !== null) {
            $sql .= " AND Tenants.id_number = :tenantId";
        }

        if ($rentalId !== null) {
            $sql .= " AND Rentals.rental_id = :rentalId";
        }

        if (!empty($startDate) && !empty($endDate)) {
            $sql .= " AND Rentals.start_date >= :startDate AND Rentals.start_date <= :endDate";
        }

        $sql .= "
        GROUP BY 
            Rentals.rental_id,
            Vehicles.vehicle_id, 
            Vehicles.make, 
            Vehicles.model, 
            Tenants.tenant_name, 
            Tenants.id_number,
            Rentals.start_date, 
            Rentals.end_date, 
            Reservations.end_date, 
            Invoices.price_perday, 
            Invoices.total_amount, 
            Invoices.amount_paid, 
            Rentals.note
        ORDER BY Rentals.rental_id DESC
    ";

        try {
            $stmt = $conn->prepare($sql);
            
            if ($tenantId !== null) {
                $stmt->bindParam(':tenantId', $tenantId, PDO::PARAM_STR);
            }

            if ($rentalId !== null) {
                $stmt->bindParam(':rentalId', $rentalId, PDO::PARAM_STR);
            }

            if (!empty($startDate) && !empty($endDate)) {
                $stmt->bindParam(':startDate', $startDate, PDO::PARAM_STR);
                $stmt->bindParam(':endDate', $endDate, PDO::PARAM_STR);
            }

            $stmt->execute();

            $rentedCars = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (empty($rentedCars)) {
                echo json_encode(["message" => "No contracts found"]);
            } else {
                echo json_encode($rentedCars);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["message" => "Error: " . $e->getMessage()]);
        }

    } else {
        $sql = "
        SELECT 
            Rentals.*,
            Vehicles.vehicle_id,
            Vehicles.make,
            Vehicles.year,
            Vehicles.model,
            Vehicles.mileage,
            Tenants.tenant_name AS customer,
            Tenants.id_number AS tenantID,
            Tenants.address,
            Tenants.phone_number,
            Reservations.end_date AS end_date_agreed,
            Invoices.price_perday,
            Invoices.total_amount,
            Invoices.amount_paid,
            DATEDIFF(Rentals.end_date, Rentals.start_date) AS dayNum,
            CONCAT(Payments.amount, ' on ', Payments.payment_date) AS payment_details
        FROM Rentals
        INNER JOIN Reservations ON Rentals.reservation_id = Reservations.reservation_id
        INNER JOIN Invoices ON Invoices.Invoice_id = Reservations.Invoice_id
        INNER JOIN Vehicles ON Reservations.vehicle_id = Vehicles.vehicle_id
        INNER JOIN Tenants ON Reservations.tenant_id = Tenants.id_number
        LEFT JOIN Payments ON Invoices.Invoice_id = Payments.invoice_id
        ORDER BY Rentals.rental_id DESC
    ";
    
    
    
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute();

            $rentedCars = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($rentedCars);
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode(["message" => "Error: " . $e->getMessage()]);
        }
    }

} elseif ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);

    if ($data === null) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid JSON input"]);
        exit;
    }

    if (isset($data['rental_id'])) {
        $rental_id = $data['rental_id'];

        try {
            $conn->beginTransaction();

            $rentalStmt = $conn->prepare("
                SELECT r.start_date, r.end_date, r.reservation_id, rs.vehicle_id 
                FROM Rentals r 
                INNER JOIN Reservations rs ON r.reservation_id = rs.reservation_id 
                WHERE r.rental_id = :rental_id
            ");
            $rentalStmt->bindParam(':rental_id', $rental_id, PDO::PARAM_INT);
            $rentalStmt->execute();
            $rental = $rentalStmt->fetch(PDO::FETCH_ASSOC);

            if (!$rental) {
                throw new Exception('Rental not found');
            }

            $start_date = $rental['start_date'];
            $end_date = $rental['end_date'];
            $reservation_id = $rental['reservation_id'];
            $current_vehicle_id = $rental['vehicle_id'];

            if (isset($data['return_date']) && isset($data['car_mileage'])) {
                $return_date = $data['return_date'];
                $car_mileage = $data['car_mileage'];

                $updateRentalReturnStmt = $conn->prepare("
                    UPDATE Rentals 
                    SET has_return = 1, return_date = :return_date ,car_mileage = :car_mileage
                    WHERE rental_id = :rental_id
                ");
                $updateRentalReturnStmt->bindParam(':return_date', $return_date);
                $updateVehicleMileageStmt->bindParam(':car_mileage', $car_mileage);
                $updateRentalReturnStmt->bindParam(':rental_id', $rental_id, PDO::PARAM_INT);
                $updateRentalReturnStmt->execute();

                $updateVehicleMileageStmt = $conn->prepare("
                    UPDATE Vehicles 
                    SET mileage = :car_mileage 
                    WHERE vehicle_id = :vehicle_id
                ");
                $updateVehicleMileageStmt->bindParam(':car_mileage', $car_mileage);
                $updateVehicleMileageStmt->bindParam(':vehicle_id', $current_vehicle_id);
                $updateVehicleMileageStmt->execute();

                $conn->commit();

                http_response_code(200);
                echo json_encode([
                    "status" => "success",
                    "message" => "Car return processed successfully"
                ]);
                exit;
            }

            if (isset($data['end_date']) && count($data) === 2) {
                $new_end_date = $data['end_date'];

                if (strtotime($new_end_date) <= strtotime($start_date)) {
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

                $updateRentalStmt = $conn->prepare("UPDATE Rentals SET end_date = :new_end_date WHERE rental_id = :rental_id");
                $updateRentalStmt->bindParam(':new_end_date', $new_end_date, PDO::PARAM_STR);
                $updateRentalStmt->bindParam(':rental_id', $rental_id, PDO::PARAM_INT);
                $updateRentalStmt->execute();

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
            "message" => "Missing rental_id"
        ]);
    }
}
 elseif ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
   
    $rental_id = $_GET['rental_id'] ?? null;

    if ($rental_id) {
        try {
            $conn->beginTransaction();

            $stmt = $conn->prepare('SELECT reservation_id FROM Rentals WHERE rental_id = :rental_id');
            $stmt->bindParam(':rental_id', $rental_id, PDO::PARAM_INT);
            $stmt->execute();
            $reservation_id = $stmt->fetchColumn();

            if ($reservation_id) {
                $stmt = $conn->prepare('DELETE FROM Rentals WHERE rental_id = :rental_id');
                $stmt->bindParam(':rental_id', $rental_id, PDO::PARAM_INT);
                $stmt->execute();

                $stmt = $conn->prepare('DELETE FROM Reservations WHERE reservation_id = :reservation_id');
                $stmt->bindParam(':reservation_id', $reservation_id, PDO::PARAM_INT);
                $stmt->execute();
            } else {
                http_response_code(404);
                echo json_encode(["status" => "error", "message" => "Rental not found"]);
                $conn->rollBack();
                exit();
            }
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
        echo json_encode(["status" => "error", "message" => "Rental ID is required"]);
    }
} else {
    http_response_code(405);
    $response['status'] = 'error';
    $response['message'] = 'Invalid request method';
    echo json_encode($response);
}

$conn = null;
?>