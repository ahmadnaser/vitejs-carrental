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

    } elseif ($_SERVER["REQUEST_METHOD"] == "GET") {
        if (isset($_GET['trader_id'])) {
            $trader_id = intval($_GET['trader_id']);

            if ($trader_id <= 0) {
                http_response_code(400);
                echo json_encode(['error' => 'Invalid or missing trader ID']);
                exit;
            }

            $stmt = $conn->prepare('SELECT * FROM Traders WHERE trader_id = :trader_id');
            $stmt->bindParam(':trader_id', $trader_id, PDO::PARAM_INT);
            $stmt->execute();

            $trader = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($trader) {
                echo json_encode($trader);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Trader not found']);
            }
        } else {
            $stmt = $conn->prepare('SELECT * FROM Traders');
            $stmt->execute();
            $traders = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($traders);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid request method."]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

$conn = null;
?>
