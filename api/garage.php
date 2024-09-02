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

} elseif ($_SERVER["REQUEST_METHOD"] == "GET") {
    try {
        if (isset($_GET['garage_id'])) {
            
            $garage_id = intval($_GET['garage_id']);

            if ($garage_id <= 0) {
                http_response_code(400);
                echo json_encode(['error' => 'Invalid or missing garage ID']);
                exit;
            }

            $stmt = $conn->prepare('SELECT * FROM Garages WHERE garage_id = :id');
            $stmt->bindParam(':id', $garage_id, PDO::PARAM_INT);
            $stmt->execute();

            $garage = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($garage) {
                echo json_encode($garage);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Garage not found']);
            }
        } else {
            $stmt = $conn->prepare('SELECT * FROM Garages');
            $stmt->execute();
            $garages = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($garages);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }

    $conn = null;


} elseif ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
   
    $garage_id = $_GET['garage_id'] ?? null;

    if ($garage_id) {
        try {
            $conn->beginTransaction();
            $stmt = $conn->prepare("DELETE FROM Garages WHERE garage_id = :garage_id");
            $stmt->bindParam(':garage_id', $garage_id, PDO::PARAM_INT);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $conn->commit();
                http_response_code(200);
                echo json_encode(["status" => "success", "message" => "Garage record deleted successfully"]);
            } else {
                http_response_code(404);
                echo json_encode(["status" => "error", "message" => "Garage record not found"]);
            }
        } catch (PDOException $e) {
            $conn->rollBack();
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error: ' . $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Garage ID is required"]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);

    if ($data === null) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid JSON input"]);
        exit;
    }

    if (isset($data['garage_id']) && !empty($data['garage_id'])) {
        $garage_id = $data['garage_id'];

        $name = isset($data['name']) ? $data['name'] : null;
        $type = isset($data['type']) ? $data['type'] : null;
        $location = isset($data['location']) ? $data['location'] : null;
        $contact_info = isset($data['contact_info']) ? $data['contact_info'] : null;
        $garage_info = isset($data['garage_info']) ? $data['garage_info'] : null;

        try {
            $conn->beginTransaction();

            $garageStmt = $conn->prepare("
                UPDATE Garages SET 
                    name = :name,
                    type = :type,
                    location = :location,
                    contact_info = :contact_info,
                    garage_info = :garage_info
                WHERE garage_id = :garage_id
            ");
            $garageStmt->bindParam(':name', $name);
            $garageStmt->bindParam(':type', $type);
            $garageStmt->bindParam(':location', $location);
            $garageStmt->bindParam(':contact_info', $contact_info);
            $garageStmt->bindParam(':garage_info', $garage_info);
            $garageStmt->bindParam(':garage_id', $garage_id);
            $garageStmt->execute();

            $conn->commit();

            http_response_code(200);
            $response['status'] = 'success';
            $response['message'] = 'Garage record updated successfully';
        } catch (PDOException $e) {
            $conn->rollBack();
            http_response_code(500);
            $response['status'] = 'error';
            $response['message'] = 'Error: ' . $e->getMessage();
        }
    } else {
        http_response_code(400);
        $response['status'] = 'error';
        $response['message'] = 'Garage ID is required for updating the record';
    }

    echo json_encode($response);
} else {
    http_response_code(405);
    $response['status'] = 'error';
    $response['message'] = 'Invalid request method';
    echo json_encode($response);
}

$conn = null;
?>