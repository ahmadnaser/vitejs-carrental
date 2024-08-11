<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include 'dbconfig.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

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

    $idImageDirectory = 'id_uploads/';
    $licenseImageDirectory = 'license_uploads/';

    $id_image_path = null;
    $license_image_path = null;


    if (!empty($_FILES['id_image_path']['name'])) {
        if (!is_dir($idImageDirectory) && !mkdir($idImageDirectory, 0755, true)) {
            echo json_encode(["status" => "error", "message" => "Failed to create directory for ID copy."]);
            exit();
        }

        if (!is_writable($idImageDirectory)) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "ID copy directory is not writable."]);
            exit();
        }

        $fileExt = strtolower(pathinfo($_FILES['id_image_path']['name'], PATHINFO_EXTENSION));
        $newFileName = uniqid('id_') . ".$fileExt";
        $fileDestination = $idImageDirectory . $newFileName;

        if ($_FILES['id_image_path']['error'] !== UPLOAD_ERR_OK) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Error uploading ID image."]);
            exit();
        }

        if (!move_uploaded_file($_FILES['id_image_path']['tmp_name'], $fileDestination)) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to upload ID image."]);
            exit();
        }

        $id_image_path = $fileDestination;
    }

    if (!empty($_FILES['license_image_path']['name'])) {
        if (!is_dir($licenseImageDirectory) && !mkdir($licenseImageDirectory, 0755, true)) {
            echo json_encode(["status" => "error", "message" => "Failed to create directory for license copy."]);
            exit();
        }

        if (!is_writable($licenseImageDirectory)) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "License copy directory is not writable."]);
            exit();
        }

        $fileExt = strtolower(pathinfo($_FILES['license_image_path']['name'], PATHINFO_EXTENSION));
        $newFileName = uniqid('license_') . ".$fileExt";
        $fileDestination = $licenseImageDirectory . $newFileName;

        if ($_FILES['license_image_path']['error'] !== UPLOAD_ERR_OK) {
            echo json_encode(["status" => "error", "message" => "Error uploading license image."]);
            exit();
        }

        if (!move_uploaded_file($_FILES['license_image_path']['tmp_name'], $fileDestination)) {
            echo json_encode(["status" => "error", "message" => "Failed to upload license image."]);
            exit();
        }

        $license_image_path = $fileDestination;
    }

    try {
        $sql = "INSERT INTO Tenants (id_number, tenant_name, address, phone_number, blood_type, birth_date, license_number, license_start_date, license_end_date, id_image_path, license_image_path)
                VALUES (:id_number, :tenant_name, :address, :phone_number, :blood_type, :birth_date, :license_number, :license_start_date, :license_end_date, :id_image_path, :license_image_path)";

        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new Exception("Failed to prepare statement: " . json_encode($conn->errorInfo()));
        }

        $stmt->bindValue(':id_number', $id_number);
        $stmt->bindValue(':tenant_name', $tenant_name);
        $stmt->bindValue(':address', $address);
        $stmt->bindValue(':phone_number', $phone_number);
        $stmt->bindValue(':blood_type', $blood_type);
        $stmt->bindValue(':birth_date', $birth_date);
        $stmt->bindValue(':license_number', $license_number);
        $stmt->bindValue(':license_start_date', $license_start_date);
        $stmt->bindValue(':license_end_date', $license_end_date);
        $stmt->bindValue(':id_image_path', $id_image_path);
        $stmt->bindValue(':license_image_path', $license_image_path);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "New record created successfully"]);
        } else {
            http_response_code(500);
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
