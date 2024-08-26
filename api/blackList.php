<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include 'dbconfig.php';

try {
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $id_number = $_POST['id_number'] ?? null;
        $company = $_POST['company'] ?? null;
        $address = $_POST['address'] ?? null;
        $note = $_POST['note'] ?? null;

        $missing_fields = [];
        if (empty($id_number)) $missing_fields[] = 'id_number';
        if (empty($company)) $missing_fields[] = 'company';
        if (empty($address)) $missing_fields[] = 'address';

        if (!empty($missing_fields)) {
            $missing_fields_list = implode(', ', $missing_fields);
            echo json_encode(["status" => "error", "message" => "Required fields are missing: $missing_fields_list"]);
            exit();
        }

        $sql = "INSERT INTO BlackList (id_number, company, address, note) VALUES (:id_number, :company, :address, :note)";
        $stmt = $conn->prepare($sql);
        
        if (!$stmt) {
            throw new Exception("Failed to prepare statement: " . json_encode($conn->errorInfo()));
        }

        $stmt->bindValue(':id_number', $id_number);
        $stmt->bindValue(':company', $company);
        $stmt->bindValue(':address', $address);
        $stmt->bindValue(':note', $note);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "New blacklist record created successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Error executing query"]);
        }

    } elseif ($_SERVER["REQUEST_METHOD"] == "GET") {
        $stmt = $conn->prepare('SELECT * FROM BlackList');
        $stmt->execute();
        $blacklist = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($blacklist);

    } else {
        echo json_encode(["status" => "error", "message" => "Invalid request method."]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

$conn = null;
?>
