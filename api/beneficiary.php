<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include 'dbconfig.php';

try {
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

        $sql = "INSERT INTO Beneficiaries (name, contact_info, type) VALUES (:name, :contact_info, :type)";
        $stmt = $conn->prepare($sql);
        
        if (!$stmt) {
            throw new Exception("Failed to prepare statement: " . json_encode($conn->errorInfo()));
        }

        $stmt->bindValue(':name', $name);
        $stmt->bindValue(':contact_info', $contact_info);
        $stmt->bindValue(':type', $type);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "New beneficiary record created successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Error executing query"]);
        }

    } elseif ($_SERVER["REQUEST_METHOD"] == "GET") {
        $stmt = $conn->prepare('SELECT * FROM Beneficiaries');
        $stmt->execute();
        $beneficiaries = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($beneficiaries);

    } else {
        echo json_encode(["status" => "error", "message" => "Invalid request method."]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

$conn = null;
?>
