<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include 'dbconfig.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST['name'] ?? null;
    $contact_info = $_POST['contact_info'] ?? null;
    $type = $_POST['type'] ?? null;

    $missing_fields = [];

    if (empty($name)) $missing_fields[] = 'name';
    if (empty($contact_info)) $missing_fields[] = 'contact_info';
    if (empty($type)) $missing_fields[] = 'type';

    if (!empty($missing_fields)) {
        $missing_fields_list = implode(', ', $missing_fields);
        echo json_encode(["status" => "error", "message" => "Required fields are missing: $missing_fields_list"]);
        exit();
    }

    try {
        $sql = "INSERT INTO Traders (name, contact_info, type) VALUES (:name, :contact_info, :type)";

        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new Exception("Failed to prepare statement: " . json_encode($conn->errorInfo()));
        }

        $stmt->bindValue(':name', $name);
        $stmt->bindValue(':contact_info', $contact_info);
        $stmt->bindValue(':type', $type);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "New trader record created successfully"]);
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
