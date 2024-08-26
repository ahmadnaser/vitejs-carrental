<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include 'dbconfig.php';

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
        $sql = "INSERT INTO Vehicles (vehicle_id, make, model, year, color, status, mileage, last_oil_change_miles, last_oil_change_date, license_expiry_date, insurance_expiry_date, change_oil_every_km, change_oil_every_month, license_image, insurance_image,active)
                VALUES (:vehicle_id, :make, :model, :year, :color, :status, :mileage, :last_oil_change_miles, :last_oil_change_date, :license_expiry_date, :insurance_expiry_date, :change_oil_every_km, :change_oil_every_month, :license_image, :insurance_image,:active)";

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
?>
