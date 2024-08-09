<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include 'dbconfig.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST['name'] ?? null;
    $type = $_POST['type'] ?? null;
    $location = $_POST['location'] ?? null;
    $contact_info = $_POST['contact_info'] ?? null;
    $garage_info = $_POST['garage_info'] ?? null;

    $missing_fields = [];

    if (empty($name)) $missing_fields[] = 'name';
    if (empty($type)) $missing_fields[] = 'type';
    if (empty($location)) $missing_fields[] = 'location';
    if (empty($contact_info)) $missing_fields[] = 'contact_info';
    if (empty($garage_info)) $missing_fields[] = 'garage_info';

    if (!empty($missing_fields)) {
        $missing_fields_list = implode(', ', $missing_fields);
        echo json_encode(["status" => "error", "message" => "Required fields are missing: $missing_fields_list"]);
        exit();
    }

    try {
        $sql = "INSERT INTO Garages (name, type, location, contact_info, garage_info)
                VALUES (:name, :type, :location, :contact_info, :garage_info)";

        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new Exception("Failed to prepare statement: " . json_encode($conn->errorInfo()));
        }

        $stmt->bindValue(':name', $name);
        $stmt->bindValue(':type', $type);
        $stmt->bindValue(':location', $location);
        $stmt->bindValue(':contact_info', $contact_info);
        $stmt->bindValue(':garage_info', $garage_info);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "New garage record created successfully"]);
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
