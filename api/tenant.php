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

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $tenant_name = $_POST['tenant_name'] ?? null;
    $id_number = $_POST['id_number'] ?? null;
    $address = $_POST['address'] ?? null;
    $phone_number = $_POST['phone_number'] ?? null;
    $blood_type = $_POST['blood_type'] ?? null;
    $birth_date = $_POST['birth_date'] ?? null;
    $license_number = $_POST['license_number'] ?? null;
    $license_start_date = $_POST['license_start_date'] ?? null;
    $license_end_date = $_POST['license_end_date'] ?? null;

    $missing_fields = [];

    if (empty($tenant_name)) $missing_fields[] = 'tenant_name';
    if (empty($id_number)) $missing_fields[] = 'id_number';
    if (empty($address)) $missing_fields[] = 'address';
    if (empty($phone_number)) $missing_fields[] = 'phone_number';
    if (empty($blood_type)) $missing_fields[] = 'blood_type';
    if (empty($birth_date)) $missing_fields[] = 'birth_date';
    if (empty($license_number)) $missing_fields[] = 'license_number';
    if (empty($license_start_date)) $missing_fields[] = 'license_start_date';
    if (empty($license_end_date)) $missing_fields[] = 'license_end_date';

    if (!empty($missing_fields)) {
        $missing_fields_list = implode(', ', $missing_fields);
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Required fields are missing: $missing_fields_list"]);
        exit();
    }
    $stmt = $conn->prepare("SELECT COUNT(*) FROM Tenants WHERE id_number = :id_number");
    $stmt->bindValue(':id_number', $id_number);
    $stmt->execute();
    $count = $stmt->fetchColumn();

    if ($count > 0) {
        http_response_code(409);
        echo json_encode(["status" => "error", "message" => "ID number already exists"]);
        exit();
    }
    $id_image = null;
    $license_image = null;
    $target_id_dir = "id_uploads/";
    $target_license_dir = "license_uploads/";
    $allowed_extensions = ['jpg', 'jpeg', 'png', 'gif'];

    function generateFileName($prefix, $id_number, $extension) {
        $random_number = rand(100, 999);
        return $prefix . '_' . $id_number . '_' . $random_number . '.' . $extension;
    }

    if (isset($_FILES['id_image']) && $_FILES['id_image']['error'] == 0) {

        if (!is_dir($target_id_dir)) {
            $response['status'] = 'error';
            $response['message'] = 'Upload directory does not exist.';
            http_response_code(500);
            echo json_encode($response);
            exit();
        }

        if (!is_writable($target_id_dir)) {
            $response['status'] = 'error';
            $response['message'] = 'Upload directory is not writable.';
            http_response_code(500);
            echo json_encode($response);
            exit();
        }

        $file_extension = pathinfo($_FILES['id_image']['name'], PATHINFO_EXTENSION);
        if (!in_array(strtolower($file_extension), $allowed_extensions)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Invalid file extension for ID image. Only JPG, JPEG, PNG, and GIF are allowed."]);
            exit();
        }
        $id_image = $target_id_dir . generateFileName('id', $id_number, $file_extension);
        if (!move_uploaded_file($_FILES['id_image']['tmp_name'], $id_image)) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to upload ID image."]);
            exit();
        }
    }

    if (isset($_FILES['license_image']) && $_FILES['license_image']['error'] == 0) {

        if (!is_dir($target_license_dir)) {
            $response['status'] = 'error';
            $response['message'] = 'Upload directory does not exist.';
            http_response_code(500);
            echo json_encode($response);
            exit();
        }

        if (!is_writable($target_license_dir)) {
            $response['status'] = 'error';
            $response['message'] = 'Upload directory is not writable.';
            http_response_code(500);
            echo json_encode($response);
            exit();
        }

        $file_extension = pathinfo($_FILES['license_image']['name'], PATHINFO_EXTENSION);
        if (!in_array(strtolower($file_extension), $allowed_extensions)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Invalid file extension for license image. Only JPG, JPEG, PNG, and GIF are allowed."]);
            exit();
        }
        $license_image = $target_license_dir . generateFileName('license', $id_number, $file_extension);
        if (!move_uploaded_file($_FILES['license_image']['tmp_name'], $license_image)) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to upload license image."]);
            exit();
        }
    }
    try {
        $sql = "INSERT INTO Tenants (id_number, tenant_name, address, phone_number, blood_type, birth_date, license_number, license_start_date, license_end_date, id_image_path, license_image_path)
                VALUES (:id_number, :tenant_name, :address, :phone_number, :blood_type, :birth_date, :license_number, :license_start_date, :license_end_date, :id_image_path, :license_image_path)";
        
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':id_number', $id_number);
        $stmt->bindValue(':tenant_name', $tenant_name);
        $stmt->bindValue(':address', $address);
        $stmt->bindValue(':phone_number', $phone_number);
        $stmt->bindValue(':blood_type', $blood_type);
        $stmt->bindValue(':birth_date', $birth_date);
        $stmt->bindValue(':license_number', $license_number);
        $stmt->bindValue(':license_start_date', $license_start_date);
        $stmt->bindValue(':license_end_date', $license_end_date);
        $stmt->bindValue(':id_image_path', $id_image);
        $stmt->bindValue(':license_image_path', $license_image);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["status" => "success", "message" => "New tenant record created successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Error executing query"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Error: " . $e->getMessage()]);
    }

} elseif ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['id_number'])) {
        $id_number = $_GET['id_number'];

        try {
            $stmt = $conn->prepare('SELECT * FROM Tenants WHERE id_number = :id_number');
            $stmt->bindParam(':id_number', $id_number, PDO::PARAM_STR);
            $stmt->execute();
            $tenant = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($tenant) {
                echo json_encode($tenant);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Tenant not found']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    } elseif (isset($_GET['tenant_id'])) {
        $tenantId = $_GET['tenant_id'];
        $startDate = isset($_GET['start_date']) ? $_GET['start_date'] : null;
        $endDate = isset($_GET['end_date']) ? $_GET['end_date'] : null;
    
        $sqlTransactions = "
            SELECT
                t.*,
                p.*,
                r.reservation_id,
                v.vehicle_id,
                v.make,
                v.model,
                ten.tenant_name AS customer,
                ten.id_number AS tenantID,
                r.start_date,
                r.end_date,
                i.price_perday,
                i.total_amount,
                i.amount_paid,
                DATEDIFF(r.end_date, r.start_date) AS dayNum,
                CASE 
                    WHEN t.credit > 0 AND t.debit = 0 THEN t.credit 
                    ELSE NULL 
                END AS amount,
                CASE 
                    WHEN t.credit > 0 AND t.debit = 0 THEN COALESCE(p.payment_method, 'Bank Check') 
                    ELSE NULL 
                END AS payment_method
            FROM Transactions t
            LEFT JOIN Payments p ON t.payment_id = p.payment_id
            LEFT JOIN Invoices i ON p.invoice_id = i.Invoice_id
            INNER JOIN Reservations r ON i.Invoice_id = r.invoice_id
            LEFT JOIN Vehicles v ON r.vehicle_id = v.vehicle_id
            LEFT JOIN Tenants ten ON r.tenant_id = ten.id_number
            WHERE ten.id_number = :tenantId

        ";
    
        if ($startDate && $endDate) {
            $sqlTransactions .= " AND t.date BETWEEN :startDate AND :endDate";
        }
    
        $sqlTransactions .= " ORDER BY t.date ASC;";
    
        $sqlBillingSummary = "
            SELECT 
                COUNT(i.Invoice_id) AS num_invoices,
                SUM(i.total_amount) AS total_bills,
                SUM(i.amount_paid) AS total_paid,
                (SUM(i.total_amount) - SUM(i.amount_paid)) AS unpaid_due,
                SUM(CASE WHEN p.payment_method = 'bank_check' THEN p.amount ELSE 0 END) AS collections,
                SUM(i.total_amount) AS gross_revenue,
                SUM(i.amount_paid) - SUM(i.total_amount) AS credit_balance
            FROM 
                Invoices i
            LEFT JOIN 
                Payments p ON i.Invoice_id = p.invoice_id
            INNER JOIN 
                Reservations r ON r.invoice_id = i.Invoice_id
            WHERE 
                r.tenant_id = :tenantId
        ";
    
        try {
            $stmtTransactions = $conn->prepare($sqlTransactions);
            $stmtTransactions->bindParam(':tenantId', $tenantId, PDO::PARAM_STR);
    
            if ($startDate && $endDate) {
                $stmtTransactions->bindParam(':startDate', $startDate, PDO::PARAM_STR);
                $stmtTransactions->bindParam(':endDate', $endDate, PDO::PARAM_STR);
            }
    
            $stmtTransactions->execute();
            $accountStatement = $stmtTransactions->fetchAll(PDO::FETCH_ASSOC);
    
            $stmtBillingSummary = $conn->prepare($sqlBillingSummary);
            $stmtBillingSummary->bindParam(':tenantId', $tenantId, PDO::PARAM_STR);
            $stmtBillingSummary->execute();
            $billingSummary = $stmtBillingSummary->fetch(PDO::FETCH_ASSOC);
    
            $response = [
                "accountStatement" => $accountStatement,
                "billingSummary" => $billingSummary
            ];
    
            echo json_encode($response);
    
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["message" => "Error: " . $e->getMessage()]);
        }
    }
    else {
        try {
            $stmt = $conn->prepare('SELECT * FROM Tenants');
            $stmt->execute();
            $tenants = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($tenants);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    
} elseif ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
   
    $tenant_id = $_GET['tenant_id'] ?? null;

    if ($tenant_id) {
        try {
            $stmt = $conn->prepare('SELECT COUNT(*) FROM Reservations WHERE tenant_id = :tenant_id');
            $stmt->bindParam(':tenant_id', $tenant_id, PDO::PARAM_INT);
            $stmt->execute();
            $reservationCount = $stmt->fetchColumn();

            if ($reservationCount > 0) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "Tenant cannot be deleted as they have existing reservations"]);
                exit();
            }

            $stmt = $conn->prepare('SELECT id_image_path, license_image_path FROM Tenants WHERE id_number = :tenant_id');
            $stmt->bindParam(':tenant_id', $tenant_id, PDO::PARAM_INT);
            $stmt->execute();
            $tenant = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($tenant) {
                if (!empty($tenant['id_image_path']) && file_exists($tenant['id_image_path'])) {
                    unlink($tenant['id_image_path']);
                }
                if (!empty($tenant['license_image_path']) && file_exists($tenant['license_image_path'])) {
                    unlink($tenant['license_image_path']);
                }
                $stmt = $conn->prepare('DELETE FROM Tenants WHERE id_number = :tenant_id');
                $stmt->bindParam(':tenant_id', $tenant_id, PDO::PARAM_INT);

                if ($stmt->execute()) {
                    if ($stmt->rowCount() > 0) {
                        http_response_code(200);
                        echo json_encode(["status" => "success", "message" => "Tenant deleted successfully"]);
                    } else {
                        http_response_code(404);
                        echo json_encode(["status" => "error", "message" => "Tenant not found"]);
                    }
                } else {
                    http_response_code(500);
                    echo json_encode(["status" => "error", "message" => "Error executing delete query"]);
                }
            } else {
                http_response_code(404);
                echo json_encode(["status" => "error", "message" => "Tenant not found"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Tenant ID is required"]);
    }

} elseif ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);

    if ($data === null) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid JSON input"]);
        exit;
    }

    if (isset($data['id_number'])) {
        $id_number = $data['id_number'];

        try {
            $conn->beginTransaction();

            $stmt = $conn->prepare("SELECT COUNT(*) FROM Reservations WHERE tenant_id = :id_number");
            $stmt->bindParam(':id_number', $id_number, PDO::PARAM_STR);
            $stmt->execute();
            $reservationCount = $stmt->fetchColumn();

            if ($reservationCount > 0 && isset($data['id_number']) && $data['id_number'] != $id_number) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "Cannot change tenant ID as there are existing reservations."]);
                exit();
            }

            $fieldsToUpdate = [
                'tenant_name' => 'tenant_name',
                'address' => 'address',
                'phone_number' => 'phone_number',
                'blood_type' => 'blood_type',
                'birth_date' => 'birth_date',
                'license_number' => 'license_number',
                'license_start_date' => 'license_start_date',
                'license_end_date' => 'license_end_date'
            ];

            foreach ($fieldsToUpdate as $key => $field) {
                if (isset($data[$key])) {
                    $updateStmt = $conn->prepare("UPDATE Tenants SET $field = :value WHERE id_number = :id_number");
                    $updateStmt->bindParam(':value', $data[$key], PDO::PARAM_STR);
                    $updateStmt->bindParam(':id_number', $id_number, PDO::PARAM_STR);
                    $updateStmt->execute();
                }
            }

            $target_id_dir = "id_uploads/";
            $target_license_dir = "license_uploads/";
            $allowed_extensions = ['jpg', 'jpeg', 'png', 'gif'];

            function generateFileName($prefix, $id_number, $extension) {
                $random_number = rand(100, 999);
                return $prefix . '_' . $id_number . '_' . $random_number . '.' . $extension;
            }

            function saveBase64Image($base64String, $target_dir, $prefix, $id_number) {
                global $allowed_extensions;

                $parts = explode(',', $base64String);
                $data = base64_decode($parts[1]);
                $finfo = finfo_open();
                $mime_type = finfo_buffer($finfo, $data, FILEINFO_MIME_TYPE);
                finfo_close($finfo);

                $extension = explode('/', $mime_type)[1];
                if (!in_array($extension, $allowed_extensions)) {
                    http_response_code(400);
                    echo json_encode(["status" => "error", "message" => "Invalid file extension. Only JPG, JPEG, PNG, and GIF are allowed."]);
                    exit();
                }

                $filePath = $target_dir . generateFileName($prefix, $id_number, $extension);
                if (file_put_contents($filePath, $data)) {
                    return $filePath;
                } else {
                    http_response_code(500);
                    echo json_encode(["status" => "error", "message" => "Failed to save image."]);
                    exit();
                }
            }

            if (isset($data['id_image'])) {
                $stmt = $conn->prepare("SELECT id_image_path FROM Tenants WHERE id_number = :id_number");
                $stmt->bindParam(':id_number', $id_number, PDO::PARAM_STR);
                $stmt->execute();
                $currentIdImage = $stmt->fetchColumn();

                if ($currentIdImage && file_exists($currentIdImage)) {
                    unlink($currentIdImage);
                }

                $id_image_path = saveBase64Image($data['id_image'], $target_id_dir, 'id', $id_number);

                $updateStmt = $conn->prepare("UPDATE Tenants SET id_image_path = :id_image WHERE id_number = :id_number");
                $updateStmt->bindParam(':id_image', $id_image_path, PDO::PARAM_STR);
                $updateStmt->bindParam(':id_number', $id_number, PDO::PARAM_STR);
                $updateStmt->execute();
            }

            if (isset($data['license_image'])) {
                $stmt = $conn->prepare("SELECT license_image_path FROM Tenants WHERE id_number = :id_number");
                $stmt->bindParam(':id_number', $id_number, PDO::PARAM_STR);
                $stmt->execute();
                $currentLicenseImage = $stmt->fetchColumn();

                if ($currentLicenseImage && file_exists($currentLicenseImage)) {
                    unlink($currentLicenseImage);
                }

                $license_image_path = saveBase64Image($data['license_image'], $target_license_dir, 'license', $id_number);

                $updateStmt = $conn->prepare("UPDATE Tenants SET license_image_path = :license_image WHERE id_number = :id_number");
                $updateStmt->bindParam(':license_image', $license_image_path, PDO::PARAM_STR);
                $updateStmt->bindParam(':id_number', $id_number, PDO::PARAM_STR);
                $updateStmt->execute();
            }

            $conn->commit();

            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "message" => "Tenant updated successfully"
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
            "message" => "Missing tenant id"
        ]);
    }

} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

$conn = null;
?>
