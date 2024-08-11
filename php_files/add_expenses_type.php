<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include 'dbconfig.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $type = $_POST['type'] ?? null;
    $type_info = $_POST['type_info'] ?? null;

    $missing_fields = [];
    if (empty($type)) $missing_fields[] = 'type';

    if (!empty($missing_fields)) {
        $missing_fields_list = implode(', ', $missing_fields);
        echo json_encode(["status" => "error", "message" => "Required fields are missing: $missing_fields_list"]);
        exit();
    }

    try {
        $sql = "INSERT INTO ExpensesType (type, type_info) VALUES (:type, :type_info)";

        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new Exception("Failed to prepare statement: " . json_encode($conn->errorInfo()));
        }

        $stmt->bindValue(':type', $type);
        $stmt->bindValue(':type_info', $type_info);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "New expenses type record created successfully"]);
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
