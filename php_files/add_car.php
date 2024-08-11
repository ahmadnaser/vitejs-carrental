<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include 'dbconfig.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $vehicle_id = $_POST['vehicle_id'] ?? null;
    $make = $_POST['make'] ?? null;
    $model = $_POST['model'] ?? null;
    $year = $_POST['year'] ?? null;
    $color = $_POST['color'] ?? null;
    $mileage = $_POST['mileage'] ?? null;
    $last_oil_change_miles = $_POST['last_oil_change_miles'] ?? null;
    $last_oil_change_date = $_POST['last_oil_change_date'] ?? null;
    $license_expiry_date = $_POST['license_expiry_date'] ?? null;
    $insurance_expiry_date = $_POST['insurance_expiry_date'] ?? null;
    $change_oil_every_km = $_POST['change_oil_every_km'] ?? null;
    $change_oil_every_month = $_POST['change_oil_every_month'] ?? null;
    
    $active = isset($_POST['active']) ? $_POST['active'] : false;
    $status = $active ? 'available' : 'maintenance';
    
    $missing_fields = [];

    if (empty($vehicle_id)) $missing_fields[] = 'vehicle_id';
    if (empty($make)) $missing_fields[] = 'make';
    if (empty($model)) $missing_fields[] = 'model';
    if (empty($year)) $missing_fields[] = 'year';
    if (empty($color)) $missing_fields[] = 'color';
    if (empty($last_oil_change_miles)) $missing_fields[] = 'last_oil_change_miles';
    if (empty($last_oil_change_date)) $missing_fields[] = 'last_oil_change_date';
    if (empty($license_expiry_date)) $missing_fields[] = 'license_expiry_date';
    if (empty($insurance_expiry_date)) $missing_fields[] = 'insurance_expiry_date';
    if (empty($change_oil_every_km)) $missing_fields[] = 'change_oil_every_km';
    if (empty($change_oil_every_month)) $missing_fields[] = 'change_oil_every_month';

    if (!empty($missing_fields)) {
        http_response_code(500);
        $missing_fields_list = implode(', ', $missing_fields);
        echo json_encode(["status" => "error", "message" => "Required fields are missing: $missing_fields_list"]);
        exit();
    }

    
    $stmt = $conn->prepare("SELECT COUNT(*) FROM Vehicles WHERE vehicle_id = :vehicle_id");
    $stmt->bindValue(':vehicle_id', $vehicle_id);
    $stmt->execute();
    $count = $stmt->fetchColumn();
    
    if ($count > 0) {
        http_response_code(409);
        echo json_encode(["status" => "error", "message" => "Vehicle ID already exists"]);
        exit();
    }
    
    $licenseImageDirectory = 'license_car_uploads/';
    $insuranceImageDirectory = 'insurance_car_uploads/';
    
    $license_image = null;
    $insurance_image = null;
    
    if (!empty($_FILES['license_image']['name'])) {
        if (!is_dir($licenseImageDirectory) && !mkdir($licenseImageDirectory, 0755, true)) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to create directory for license copy."]);
            exit();
        }
        
        if (!is_writable($licenseImageDirectory)) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "License copy directory is not writable."]);
            exit();
        }
        
        $fileExt = strtolower(pathinfo($_FILES['license_image']['name'], PATHINFO_EXTENSION));
        $newFileName = uniqid('license_') . ".$fileExt";
        $fileDestination = $licenseImageDirectory . $newFileName;
        
        if ($_FILES['license_image']['error'] !== UPLOAD_ERR_OK) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Error uploading license image."]);
            exit();
        }
        
        if (!move_uploaded_file($_FILES['license_image']['tmp_name'], $fileDestination)) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to upload license image."]);
            exit();
        }
        
        $license_image = $fileDestination;
    }
    
    if (!empty($_FILES['insurance_image']['name'])) {
        if (!is_dir($insuranceImageDirectory) && !mkdir($insuranceImageDirectory, 0755, true)) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to create directory for insurance copy."]);
            exit();
        }
        
        if (!is_writable($insuranceImageDirectory)) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Insurance copy directory is not writable."]);
            exit();
        }
        
        $fileExt = strtolower(pathinfo($_FILES['insurance_image']['name'], PATHINFO_EXTENSION));
        $newFileName = uniqid('insurance_') . ".$fileExt";
        $fileDestination = $insuranceImageDirectory . $newFileName;
        
        if ($_FILES['insurance_image']['error'] !== UPLOAD_ERR_OK) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Error uploading insurance image."]);
            exit();
        }
        
        if (!move_uploaded_file($_FILES['insurance_image']['tmp_name'], $fileDestination)) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to upload insurance image."]);
            exit();
        }
        
        $insurance_image = $fileDestination;
    }
    
    try {
        $sql = "INSERT INTO Vehicles (vehicle_id, make, model, year, color, status, mileage, last_oil_change_miles, last_oil_change_date, license_expiry_date, insurance_expiry_date, change_oil_every_km, change_oil_every_month, license_image, insurance_image)
                VALUES (:vehicle_id, :make, :model, :year, :color, :status, :mileage, :last_oil_change_miles, :last_oil_change_date, :license_expiry_date, :insurance_expiry_date, :change_oil_every_km, :change_oil_every_month, :license_image, :insurance_image)";

        $stmt = $conn->prepare($sql);
        if (!$stmt) {
                http_response_code(500);    
                throw new Exception("Failed to prepare statement: " . json_encode($conn->errorInfo()));
                }
                $stmt->bindValue(':vehicle_id', $vehicle_id);
                $stmt->bindValue(':make', $make);
                $stmt->bindValue(':model', $model);
                $stmt->bindValue(':year', (int) $year, PDO::PARAM_INT);
                $stmt->bindValue(':color', $color);
                $stmt->bindValue(':status', $status);
                $stmt->bindValue(':mileage', $mileage);
                $stmt->bindValue(':last_oil_change_miles', $last_oil_change_miles);
                $stmt->bindValue(':last_oil_change_date', $last_oil_change_date);
                $stmt->bindValue(':license_expiry_date', $license_expiry_date);
                $stmt->bindValue(':insurance_expiry_date', $insurance_expiry_date);
                $stmt->bindValue(':change_oil_every_km', $change_oil_every_km);
                $stmt->bindValue(':change_oil_every_month', $change_oil_every_month);
                $stmt->bindValue(':license_image', $license_image);
                $stmt->bindValue(':insurance_image', $insurance_image);
                
                if ($stmt->execute()) {
                    echo json_encode(["status" => "success", "message" => "New vehicle record created successfully"]);
                } else {
                    http_response_code(500);
                    echo json_encode("method");        
                    echo json_encode(["status" => "error", "message" => "Error executing query"]);
                }
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(["status" => "error", "message" => "Error: " . $e->getMessage()]);
            }

    $conn = null;
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
