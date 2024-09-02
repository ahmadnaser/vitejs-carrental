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

$requestMethod = $_SERVER["REQUEST_METHOD"];
$endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : '';

if ($requestMethod === 'POST' && $endpoint === 'add_vehicle') {
    addVehicle();
} elseif ($requestMethod === 'GET' && $endpoint === 'get_available_vehicles') {
    getAvailableVehicles();
} elseif ($requestMethod === 'GET' && $endpoint === 'get_vehicle_by_id') {
    getVehicleById();
} elseif ($requestMethod === 'GET' && $endpoint === 'list_vehicles') {
    listVehicles();
} elseif ($requestMethod === 'PUT' ) {
    updateVehicles();
} elseif ($requestMethod === 'DELETE' ) {
    deleteVehicles();
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid request method or endpoint."]);
}

function addVehicle() {
    global $conn;

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
    $license_start_date = $_POST['license_expiry_date'] ?? null;
    $insurance_start_date = $_POST['insurance_start_date'] ?? null;
    $change_oil_every_km = $_POST['change_oil_every_km'] ?? null;
    $change_oil_every_month = $_POST['change_oil_every_month'] ?? null;
    $active = isset($_POST['active']) ? $_POST['active'] : 0;
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
    if (empty($license_start_date)) $missing_fields[] = 'license_start_date';
    if (empty($insurance_start_date)) $missing_fields[] = 'insurance_start_date';
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

    $insurance_image = uploadImage('insurance_image', 'car_insurance_uploads/', $vehicle_id);
    $license_image = uploadImage('license_image', 'car_license_uploads/', $vehicle_id);

    try {
        $sql = "INSERT INTO Vehicles (vehicle_id, make, model, year, color, status, mileage, last_oil_change_miles, last_oil_change_date, license_expiry_date, insurance_expiry_date, change_oil_every_km, change_oil_every_month, license_image, insurance_image,active,license_start_date,insurance_start_date)
                VALUES (:vehicle_id, :make, :model, :year, :color, :status, :mileage, :last_oil_change_miles, :last_oil_change_date, :license_expiry_date, :insurance_expiry_date, :change_oil_every_km, :change_oil_every_month, :license_image, :insurance_image,:active,:license_start_date,:insurance_start_date)";

        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':vehicle_id', $vehicle_id);
        $stmt->bindValue(':make', $make);
        $stmt->bindValue(':model', $model);
        $stmt->bindValue(':year', (int)$year, PDO::PARAM_INT);
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
        $stmt->bindValue(':active', $active);
        $stmt->bindValue(':insurance_start_date', $insurance_start_date);
        $stmt->bindValue(':license_start_date', $license_start_date);

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["status" => "success", "message" => "New vehicle record created successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Error executing query"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Error: " . $e->getMessage()]);
    }
}

function getAvailableVehicles() {
    global $conn;

    $start_date = $_GET['start_date'];
    $end_date = $_GET['end_date'];

    try {
        $stmt = $conn->prepare("
            SELECT * FROM Vehicles v
            WHERE v.status = 'available'
            AND v.active = 1
            AND NOT EXISTS (
                SELECT 1 FROM Reservations r
                WHERE r.vehicle_id = v.vehicle_id
                AND (
                    (r.start_date <= :end_date AND r.end_date >= :start_date)
                )
            )
        ");
        $stmt->bindParam(':start_date', $start_date);
        $stmt->bindParam(':end_date', $end_date);
        $stmt->execute();
        $availableCars = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($availableCars);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}

function getVehicleById() {
    global $conn;

    $vehicle_id = isset($_GET['vehicle_id']) ? $_GET['vehicle_id'] : '';

    if ($vehicle_id) {
        try {
            $stmt = $conn->prepare("SELECT * FROM Vehicles WHERE vehicle_id = :vehicle_id");
            $stmt->bindParam(':vehicle_id', $vehicle_id);
            $stmt->execute();
            $car = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($car) {
                echo json_encode($car);
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'Car not found']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Error fetching car: ' . $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(['message' => 'Invalid vehicle ID']);
    }
}

function listVehicles() {
    global $conn;

    try {
        $stmt = $conn->prepare('SELECT * FROM Vehicles');
        $stmt->execute();
        $vehicles = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($vehicles);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}


function uploadImage($inputName, $directory, $vehicle_id) {
    if (!empty($_FILES[$inputName]['name'])) {
        if (!is_dir($directory) && !mkdir($directory, 0755, true)) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to create directory for image."]);
            exit();
        }

        if (!is_writable($directory)) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Image directory is not writable."]);
            exit();
        }

        $fileExt = strtolower(pathinfo($_FILES[$inputName]['name'], PATHINFO_EXTENSION));
        $newFileName = $vehicle_id . '_' . uniqid($inputName . '_') . ".$fileExt";
        $fileDestination = $directory . $newFileName;

        if ($_FILES[$inputName]['error'] !== UPLOAD_ERR_OK) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Error uploading image."]);
            exit();
        }

        if (!move_uploaded_file($_FILES[$inputName]['tmp_name'], $fileDestination)) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to upload image."]);
            exit();
        }

        return $fileDestination;
    }
    return null;
}
function saveBase64Image($base64String, $target_dir, $vehicle_id, $inputName) {
    $allowed_extensions = ['jpg', 'jpeg', 'png', 'gif'];
    
    if (strpos($base64String, ',') === false) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid base64 format"]);
        exit();
    }
    
    list($metadata, $base64Data) = explode(',', $base64String);
    $data = base64_decode($base64Data);
    
    if ($data === false) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid base64 data"]);
        exit();
    }
    
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime_type = finfo_buffer($finfo, $data);
    finfo_close($finfo);
    
    if ($mime_type === false) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Could not determine MIME type"]);
        exit();
    }
    
    $extension = substr(strrchr($mime_type, '/'), 1);
    if (!in_array($extension, $allowed_extensions)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid file extension. Only JPG, JPEG, PNG, and GIF are allowed."]);
        exit();
    }

    
    $newFileName = $vehicle_id . '_' . uniqid($inputName . '_') . ".$extension";
    $filePath = $target_dir . $newFileName;

    if (file_put_contents($filePath, $data) === false) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to save image."]);
        exit();
    }

    return $filePath;
}


function updateVehicles() {
    global $conn;

    
    $data = json_decode(file_get_contents("php://input"), true);

    if ($data === null) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid JSON input"]);
        exit;
    }

    $vehicle_id = $data['vehicle_id'] ?? null;

    if (empty($vehicle_id)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Vehicle ID is required"]);
        return;
    }

    $make = $data['make'] ?? null;
    $model = $data['model'] ?? null;
    $year = $data['year'] ?? null;
    $color = $data['color'] ?? null;
    $mileage = $data['mileage'] ?? null;
    $last_oil_change_miles = $data['last_oil_change_miles'] ?? null;
    $last_oil_change_date = $data['last_oil_change_date'] ?? null;
    $license_expiry_date = $data['license_expiry_date'] ?? null;
    $insurance_expiry_date = $data['insurance_expiry_date'] ?? null;
    $license_start_date = $data['license_start_date'] ?? null;
    $insurance_start_date = $data['insurance_start_date'] ?? null;
    $change_oil_every_km = $data['change_oil_every_km'] ?? null;
    $change_oil_every_month = $data['change_oil_every_month'] ?? null;
    $active = $data['active'] ?? null;
    $status = ($active === true || $active === 'true') ? 'available' : 'maintenance';

    $allowed_extensions = ['jpg', 'jpeg', 'png', 'gif'];
    $target_insurance_dir = "car_insurance_uploads/";
    $target_license_dir = "car_license_uploads/";

    try {
        $conn->beginTransaction();

        $stmt = $conn->prepare("SELECT COUNT(*) FROM Vehicles WHERE vehicle_id = :vehicle_id");
        $stmt->bindParam(':vehicle_id', $vehicle_id);
        $stmt->execute();
        $count = $stmt->fetchColumn();

        if ($count == 0) {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "Vehicle not found"]);
            $conn->rollBack();
            return;
        }

    
        if (isset($data['insurance_image'])) {
            $stmt = $conn->prepare("SELECT insurance_image FROM Vehicles WHERE vehicle_id = :vehicle_id");
            $stmt->bindParam(':vehicle_id', $vehicle_id);
            $stmt->execute();
            $currentInsuranceImage = $stmt->fetchColumn();

            if ($currentInsuranceImage && file_exists($currentInsuranceImage)) {
                unlink($currentInsuranceImage);
            }

            $insurance_image_path = saveBase64Image($data['insurance_image'], $target_insurance_dir, $vehicle_id, 'insurance');
            $updateStmt = $conn->prepare("UPDATE Vehicles SET insurance_image = :insurance_image WHERE vehicle_id = :vehicle_id");
            $updateStmt->bindParam(':insurance_image', $insurance_image_path);
            $updateStmt->bindParam(':vehicle_id', $vehicle_id);
            $updateStmt->execute();
        }

        if (isset($data['license_image'])) {
            $stmt = $conn->prepare("SELECT license_image FROM Vehicles WHERE vehicle_id = :vehicle_id");
            $stmt->bindParam(':vehicle_id', $vehicle_id);
            $stmt->execute();
            $currentLicenseImage = $stmt->fetchColumn();
            if ($currentLicenseImage && file_exists($currentLicenseImage)) {
                unlink($currentLicenseImage);
            }
            
            $license_image_path = saveBase64Image($data['license_image'], $target_license_dir, $vehicle_id, 'license');
            $updateStmt = $conn->prepare("UPDATE Vehicles SET license_image = :license_image WHERE vehicle_id = :vehicle_id");
            $updateStmt->bindParam(':license_image', $license_image_path);
            $updateStmt->bindParam(':vehicle_id', $vehicle_id);
            $updateStmt->execute();
        }

        $sql = "UPDATE Vehicles SET make = :make, model = :model, year = :year, color = :color, mileage = :mileage, 
                last_oil_change_miles = :last_oil_change_miles, last_oil_change_date = :last_oil_change_date, 
                license_expiry_date = :license_expiry_date, insurance_expiry_date = :insurance_expiry_date,
                license_start_date = :license_start_date, insurance_start_date = :insurance_start_date, 
                change_oil_every_km = :change_oil_every_km, change_oil_every_month = :change_oil_every_month
                WHERE vehicle_id = :vehicle_id";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':vehicle_id', $vehicle_id);
        $stmt->bindParam(':make', $make);
        $stmt->bindParam(':model', $model);
        $stmt->bindParam(':year', $year);
        $stmt->bindParam(':color', $color);
        $stmt->bindParam(':mileage', $mileage);
        $stmt->bindParam(':last_oil_change_miles', $last_oil_change_miles);
        $stmt->bindParam(':last_oil_change_date', $last_oil_change_date);
        $stmt->bindParam(':license_expiry_date', $license_expiry_date);
        $stmt->bindParam(':insurance_expiry_date', $insurance_expiry_date);
        $stmt->bindParam(':license_start_date', $license_start_date);
        $stmt->bindParam(':insurance_start_date', $insurance_start_date);
        $stmt->bindParam(':change_oil_every_km', $change_oil_every_km);
        $stmt->bindParam(':change_oil_every_month', $change_oil_every_month);

        if ($stmt->execute()) {
            $conn->commit();
            http_response_code(200);
            echo json_encode(["status" => "success", "message" => "Vehicle updated successfully"]);
        } else {
            $conn->rollBack();
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to update vehicle"]);
        }
    } catch (PDOException $e) {
        $conn->rollBack();
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}



function deleteVehicles() {
    global $conn;

    $vehicle_id = $_GET['vehicle_id'] ?? null;

    if (empty($vehicle_id)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Vehicle ID is required"]);
        return;
    }

    try {
        $stmt = $conn->prepare("SELECT COUNT(*) FROM Reservations WHERE vehicle_id = :vehicle_id");
        $stmt->bindParam(':vehicle_id', $vehicle_id);
        $stmt->execute();
        $reservationCount = $stmt->fetchColumn();

        if ($reservationCount > 0) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Cannot delete vehicle with existing reservations"]);
            return;
        }

        $stmt = $conn->prepare("SELECT license_image, insurance_image FROM Vehicles WHERE vehicle_id = :vehicle_id");
        $stmt->bindParam(':vehicle_id', $vehicle_id);
        $stmt->execute();
        $vehicle = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($vehicle) {
            if (!empty($vehicle['license_image']) && file_exists($vehicle['license_image'])) {
                unlink($vehicle['license_image']);
            }
            if (!empty($vehicle['insurance_image']) && file_exists($vehicle['insurance_image'])) {
                unlink($vehicle['insurance_image']);
            }

            $stmt = $conn->prepare("DELETE FROM Vehicles WHERE vehicle_id = :vehicle_id");
            $stmt->bindParam(':vehicle_id', $vehicle_id);

            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(["status" => "success", "message" => "Vehicle deleted successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["status" => "error", "message" => "Error executing delete query"]);
            }
        } else {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "Vehicle not found"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}

?>
