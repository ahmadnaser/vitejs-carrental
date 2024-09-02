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

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $vehicle_id = isset($_GET['vehicle_id']) ? $_GET['vehicle_id'] : '';
    $garage_id = isset($_GET['garage_id']) ? $_GET['garage_id'] : '';
    $trader_id = isset($_GET['trader_id']) ? $_GET['trader_id'] : '';
    $start_date = isset($_GET['start_date']) ? $_GET['start_date'] : '';
    $end_date = isset($_GET['end_date']) ? $_GET['end_date'] : '';
    $maintenance_id = isset($_GET['maintenance_id']) ? $_GET['maintenance_id'] : '';

    $sql = "SELECT 
                Maintenance.*,
                Vehicles.make AS make,
                Vehicles.model AS model,
                Vehicles.vehicle_id AS vehicle_id,  
                Garages.name AS garage_name,
                Traders.name AS trader_name,
                COALESCE(garageExpenses.expenses_amount, 0) AS garage_expenses_amount,
                COALESCE(sparePartsExpenses.expenses_amount, 0) AS spare_parts_expenses_amount,
                (COALESCE(garageExpenses.expenses_amount, 0) + COALESCE(sparePartsExpenses.expenses_amount, 0)) AS total_expenses
            FROM 
                Maintenance
            INNER JOIN 
                Vehicles ON Maintenance.vehicle_id = Vehicles.vehicle_id
            LEFT JOIN 
                Garages ON Maintenance.garage_id = Garages.garage_id
            LEFT JOIN 
                Traders ON Maintenance.trader_id = Traders.trader_id
            LEFT JOIN 
                Expenses AS garageExpenses ON Maintenance.garage_expensese_id = garageExpenses.expenses_id
            LEFT JOIN 
                Expenses AS sparePartsExpenses ON Maintenance.spare_part_expensese_id = sparePartsExpenses.expenses_id
            LEFT JOIN 
                ExpensesType AS garageExpensesType ON garageExpenses.expense_type_id = garageExpensesType.expense_type_id
            LEFT JOIN 
                ExpensesType AS sparePartsExpensesType ON sparePartsExpenses.expense_type_id = sparePartsExpensesType.expense_type_id
            WHERE 
                1=1";

    if ($maintenance_id) {
        $sql .= " AND Maintenance.maintenance_id = :maintenance_id";
    } else {
        if ($vehicle_id) {
            $sql .= " AND Maintenance.vehicle_id = :vehicle_id";
        }

        if ($garage_id) {
            $sql .= " AND Maintenance.garage_id = :garage_id";
        }

        if ($trader_id) {
            $sql .= " AND Maintenance.trader_id = :trader_id";
        }

        if ($start_date) {
            $sql .= " AND Maintenance.maintenance_date >= :start_date";
        }

        if ($end_date) {
            $sql .= " AND Maintenance.maintenance_date <= :end_date";
        }
    }

    $sql .= " ORDER BY Maintenance.maintenance_id DESC";

    try {
        $stmt = $conn->prepare($sql);

        if ($maintenance_id) {
            $stmt->bindParam(':maintenance_id', $maintenance_id, PDO::PARAM_INT);
        } else {
            if ($vehicle_id) {
                $stmt->bindParam(':vehicle_id', $vehicle_id, PDO::PARAM_STR);
            }

            if ($garage_id) {
                $stmt->bindParam(':garage_id', $garage_id, PDO::PARAM_STR);
            }

            if ($trader_id) {
                $stmt->bindParam(':trader_id', $trader_id, PDO::PARAM_STR);
            }

            if ($start_date) {
                $stmt->bindParam(':start_date', $start_date, PDO::PARAM_STR);
            }

            if ($end_date) {
                $stmt->bindParam(':end_date', $end_date, PDO::PARAM_STR);
            }
        }

        $stmt->execute();
        $maintenanceRecords = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (empty($maintenanceRecords)) {
            echo json_encode(["message" => "No maintenance records found for the given criteria"]);
        } else {
            echo json_encode($maintenanceRecords);
        }
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(["message" => "Error: " . $e->getMessage()]);
    }

} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (
        isset($_POST['vehicle_id']) && 
        isset($_POST['maintenance_date']) && 
        isset($_POST['details']) && 
        isset($_POST['cost']) && 
        isset($_POST['amount_paid']) && 
        isset($_POST['trader_id']) && 
        isset($_POST['trader_name']) &&
        isset($_POST['spare_parts']) && 
        isset($_POST['spare_parts_price']) && 
        isset($_POST['amount_paid_of_spare_parts']) && 
        isset($_POST['garage_id']) &&
        isset($_POST['garage_name']) 
        ) {
            $vehicle_id = $_POST['vehicle_id'];
            $maintenance_date = $_POST['maintenance_date'];
            $details = $_POST['details'];
            $cost = $_POST['cost'];
            $amount_paid = $_POST['amount_paid'];
            $trader_id = $_POST['trader_id'];
            $trader_name = $_POST['trader_name'];
            $spare_parts = $_POST['spare_parts'];
            $spare_parts_price = $_POST['spare_parts_price'];
            $amount_paid_of_spare_parts = $_POST['amount_paid_of_spare_parts'];
            $garage_id = $_POST['garage_id'];
            $garage_name = $_POST['garage_name'];
            $current_date = date('Y-m-d H:i:s');
            
            $check_number = isset($_POST['check_number']) ? convertArabicNumbers($_POST['check_number']) : NULL;
            $car_mileage = isset($_POST['car_mileage']) ? $_POST['car_mileage'] : NULL;
            $bank_name = isset($_POST['bank_name']) ? $_POST['bank_name'] : NULL;
            $check_date = isset($_POST['check_date']) ? $_POST['check_date'] : NULL;
            $check_holder = isset($_POST['check_holder']) ? $_POST['check_holder'] : NULL;
            $account_number = isset($_POST['account_number']) ? convertArabicNumbers($_POST['account_number']) : NULL;
            
            $check_number2 = isset($_POST['check_number2']) ? convertArabicNumbers($_POST['check_number2']) : NULL;
            $bank_name2 = isset($_POST['bank_name2']) ? $_POST['bank_name2'] : NULL;
            $check_date2 = isset($_POST['check_date2']) ? $_POST['check_date2'] : NULL;
            $check_holder2 = isset($_POST['check_holder2']) ? $_POST['check_holder2'] : NULL;
            $account_number2 = isset($_POST['account_number2']) ? convertArabicNumbers($_POST['account_number2']) : NULL;
            
            $car_mileage = isset($_POST['car_mileage']) ? $_POST['car_mileage'] : NULL;
            
            $check_image = NULL;
            $check_image2 = NULL;
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
            if (isset($_FILES['check_image2']) && $_FILES['check_image2']['error'] == 0) {
                
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
                $file_extension = pathinfo($_FILES['check_image2']['name'], PATHINFO_EXTENSION);
                
                if (!in_array(strtolower($file_extension), $allowed_extensions)) {
                    $response['status'] = 'error';
                    $response['message'] = 'Invalid file extension. Only JPG, JPEG, PNG, and GIF are allowed.';
                    http_response_code(400);
                    echo json_encode($response);
                    exit();
                }
                
                $check_image2= $target_dir . basename($_FILES['check_image2']['name']);
                
                if (!move_uploaded_file($_FILES['check_image2']['tmp_name'], $check_image2)) {
                    $response['status'] = 'error';
                    $response['message'] = 'Failed to upload check image.';
                    http_response_code(500);
                    echo json_encode($response);
                    exit();
                }
            }
            
            try {
                $conn->beginTransaction();
                
                if (!empty($check_number)) {
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
                
                
                if (!empty($check_number2)) {
                    $checkStmt = $conn->prepare("INSERT INTO BankChecks (check_number, account_number, check_holder, bank_name, check_date, check_image) VALUES (:check_number, :account_number, :check_holder, :bank_name, :check_date, :check_image)");
                    $checkStmt->bindParam(':check_number', $check_number2);
                    $checkStmt->bindParam(':account_number', $account_number2);
                    $checkStmt->bindParam(':check_holder', $check_holder2);
                    $checkStmt->bindParam(':bank_name', $bank_name2);
                    $checkStmt->bindParam(':check_date', $check_date2);
                    $checkStmt->bindParam(':check_image', $check_image2);
                    $checkStmt->execute();
                    $check_id2 = $conn->lastInsertId();
                }else {
                    $check_id2 = null; 
                }
                
                
                $expensesStmt = $conn->prepare("INSERT INTO Expenses (expenses_amount, expenses_date, detail, check_id) VALUES (:expenses_amount, :expenses_date, :detail, :check_id)");
                $expensesStmt->bindParam(':expenses_amount', $amount_paid);
                $expensesStmt->bindParam(':expenses_date', $current_date);
                $expensesStmt->bindParam(':detail', $details);
                $expensesStmt->bindParam(':check_id', $check_id);
                $expensesStmt->execute();
                $expenses_id = $conn->lastInsertId();
                
                $expensesStmt2 = $conn->prepare("INSERT INTO Expenses (expenses_amount, expenses_date, detail, check_id) VALUES (:expenses_amount, :expenses_date, :detail, :check_id)");
                $expensesStmt2->bindParam(':expenses_amount', $amount_paid_of_spare_parts);
                $expensesStmt2->bindParam(':expenses_date', $current_date);
                $expensesStmt2->bindParam(':detail', $spare_parts);
                $expensesStmt2->bindParam(':check_id', $check_id2);
                $expensesStmt2->execute();
                $expenses_id2 = $conn->lastInsertId();
                
                $maintenanceStmt = $conn->prepare("
                INSERT INTO Maintenance 
                (vehicle_id, maintenance_date, details, cost, trader_id, spare_parts, spare_parts_price, car_mileage, garage_id, garage_expensese_id, spare_part_expensese_id) 
                VALUES 
                (:vehicle_id, :maintenance_date, :details, :cost, :trader_id, :spare_parts, :spare_parts_price, :car_mileage, :garage_id, :garage_expensese_id, :spare_part_expensese_id)
                ");
                $maintenanceStmt->bindParam(':vehicle_id', $vehicle_id);
                $maintenanceStmt->bindParam(':maintenance_date', $maintenance_date);
                $maintenanceStmt->bindParam(':details', $details);
                $maintenanceStmt->bindParam(':cost', $cost);
                $maintenanceStmt->bindParam(':trader_id', $trader_id);
                $maintenanceStmt->bindParam(':spare_parts', $spare_parts);
                $maintenanceStmt->bindParam(':spare_parts_price', $spare_parts_price);
                $maintenanceStmt->bindParam(':car_mileage', $car_mileage);
                $maintenanceStmt->bindParam(':garage_id', $garage_id);
                $maintenanceStmt->bindParam(':garage_expensese_id', $expenses_id);
                $maintenanceStmt->bindParam(':spare_part_expensese_id', $expenses_id2);
                $maintenanceStmt->execute();
                echo json_encode("message");
                
            $maintenance_id = $conn->lastInsertId();

            $transactionStmt = $conn->prepare("
                INSERT INTO Transactions (date, description, debit, credit, expensese_id) 
                VALUES (:date, :description, :debit, :credit, :expensese_id)
            ");

            $transactionStmt->execute([
                ':date' => $current_date,
                ':description' => 'مصروف صيانة - ' . $garage_name,
                ':debit' => $cost,
                ':credit' => 0,
                ':expensese_id' => $expenses_id
            ]);

            $transactionStmt->execute([
                ':date' => $current_date,
                ':description' => 'دفع مصروف صيانة - ' . $garage_name,
                ':debit' => 0,
                ':credit' => $amount_paid,
                ':expensese_id' => $expenses_id
            ]);

            $transactionStmt->execute([
                ':date' => $current_date,
                ':description' => 'مصروف قطع غيار - ' . $trader_id,
                ':debit' => $spare_parts_price,
                ':credit' => 0,
                ':expensese_id' => $expenses_id2
            ]);

            $transactionStmt->execute([
                ':date' => $current_date,
                ':description' => 'دفع مصروف قطع غيار - ' . $trader_id,
                ':debit' => 0,
                ':credit' => $amount_paid_of_spare_parts,
                ':expensese_id' => $expenses_id2
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

} elseif ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
   
    $maintenance_id = $_GET['maintenance_id'] ?? null;

    if ($maintenance_id) {
        try {
            $conn->beginTransaction();
            $stmt = $conn->prepare("DELETE FROM Maintenance WHERE maintenance_id = :maintenance_id");
            $stmt->bindParam(':maintenance_id', $maintenance_id, PDO::PARAM_INT);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $conn->commit();
                http_response_code(200);
                echo json_encode(["status" => "success", "message" => "Maintenance record deleted successfully"]);
            } else {
                http_response_code(404);
                echo json_encode(["status" => "error", "message" => "Maintenance record not found"]);
            }
        } catch (PDOException $e) {
            $conn->rollBack();
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error: ' . $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Maintenance ID is required"]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);

    if ($data === null) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid JSON input"]);
        exit;
    }
    if (isset($data['maintenance_id']) && !empty($data['maintenance_id'])) {
        $maintenance_id = $data['maintenance_id'];

        $vehicle_id = isset($data['vehicle_id']) ? $data['vehicle_id'] : null;
        $maintenance_date = isset($data['maintenance_date']) ? $data['maintenance_date'] : null;
        $details = isset($data['details']) ? $data['details'] : null;
        $cost = isset($data['cost']) ? $data['cost'] : null;
        $trader_id = isset($data['trader_id']) ? $data['trader_id'] : null;
        $trader_name = isset($data['trader_name']) ? $data['trader_name'] : null;
        $spare_parts = isset($data['spare_parts']) ? $data['spare_parts'] : null;
        $spare_parts_price = isset($data['spare_parts_price']) ? $data['spare_parts_price'] : null;
        $garage_id = isset($data['garage_id']) ? $data['garage_id'] : null;
        $garage_name = isset($data['garage_name']) ? $data['garage_name'] : null;
        $car_mileage = isset($data['car_mileage']) ? $data['car_mileage'] : null;

        try {
            $conn->beginTransaction();

            $maintenanceStmt = $conn->prepare("
                UPDATE Maintenance SET 
                    vehicle_id = :vehicle_id,
                    maintenance_date = :maintenance_date,
                    details = :details,
                    cost = :cost,
                    trader_id = :trader_id,
                    spare_parts = :spare_parts,
                    spare_parts_price = :spare_parts_price,
                    garage_id = :garage_id,
                    car_mileage = :car_mileage
                WHERE maintenance_id = :maintenance_id
            ");
            $maintenanceStmt->bindParam(':vehicle_id', $vehicle_id);
            $maintenanceStmt->bindParam(':maintenance_date', $maintenance_date);
            $maintenanceStmt->bindParam(':details', $details);
            $maintenanceStmt->bindParam(':cost', $cost);
            $maintenanceStmt->bindParam(':trader_id', $trader_id);
            $maintenanceStmt->bindParam(':spare_parts', $spare_parts);
            $maintenanceStmt->bindParam(':spare_parts_price', $spare_parts_price);
            $maintenanceStmt->bindParam(':garage_id', $garage_id);
            $maintenanceStmt->bindParam(':car_mileage', $car_mileage);
            $maintenanceStmt->bindParam(':maintenance_id', $maintenance_id);
            $maintenanceStmt->execute();

            $conn->commit();

            http_response_code(200);
            $response['status'] = 'success';
            $response['message'] = 'Maintenance record updated successfully';
        } catch (PDOException $e) {
            $conn->rollBack();
            http_response_code(500);
            $response['status'] = 'error';
            $response['message'] = 'Error: ' . $e->getMessage();
        }
    } else {
        http_response_code(400);
        $response['status'] = 'error';
        $response['message'] = 'Maintenance ID is required for updating the record';
    }

    echo json_encode($response);
} else {
    http_response_code(405);
    $response['status'] = 'error';
    $response['message'] = 'Invalid request method';
    echo json_encode($response);
}

$conn = null;
?>