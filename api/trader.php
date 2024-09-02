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

    } elseif ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        $trader_id = $_GET['trader_id'] ?? null;

        if ($trader_id) {
            try {
                $conn->beginTransaction();
                $stmt = $conn->prepare("DELETE FROM Traders WHERE trader_id = :trader_id");
                $stmt->bindParam(':trader_id', $trader_id, PDO::PARAM_INT);
                $stmt->execute();

                if ($stmt->rowCount() > 0) {
                    $conn->commit();
                    http_response_code(200);
                    echo json_encode(["status" => "success", "message" => "Trader record deleted successfully"]);
                } else {
                    http_response_code(404);
                    echo json_encode(["status" => "error", "message" => "Trader record not found"]);
                }
            } catch (PDOException $e) {
                $conn->rollBack();
                http_response_code(500);
                echo json_encode(['status' => 'error', 'message' => 'Error: ' . $e->getMessage()]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Trader ID is required"]);
        }

    } elseif ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        $data = json_decode(file_get_contents("php://input"), true);

        if ($data === null) {
            http_response_code(400);
            echo json_encode(["message" => "Invalid JSON input"]);
            exit;
        }

        if (isset($data['trader_id']) && !empty($data['trader_id'])) {
            $trader_id = $data['trader_id'];

            $name = isset($data['name']) ? $data['name'] : null;
            $contact_info = isset($data['contact_info']) ? $data['contact_info'] : null;
            $type = isset($data['type']) ? $data['type'] : null;

            try {
                $conn->beginTransaction();

                $traderStmt = $conn->prepare("
                    UPDATE Traders SET 
                        name = :name,
                        contact_info = :contact_info,
                        type = :type
                    WHERE trader_id = :trader_id
                ");
                $traderStmt->bindParam(':name', $name);
                $traderStmt->bindParam(':contact_info', $contact_info);
                $traderStmt->bindParam(':type', $type);
                $traderStmt->bindParam(':trader_id', $trader_id);
                $traderStmt->execute();

                $conn->commit();

                http_response_code(200);
                echo json_encode(["status" => "success", "message" => "Trader record updated successfully"]);
            } catch (PDOException $e) {
                $conn->rollBack();
                http_response_code(500);
                echo json_encode(['status' => 'error', 'message' => 'Error: ' . $e->getMessage()]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Trader ID is required for updating the record"]);
        }
    } else {
        http_response_code(405);
        echo json_encode(["status" => "error", "message" => "Invalid request method"]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Error: ' . $e->getMessage()]);
}

$conn = null;
?>
