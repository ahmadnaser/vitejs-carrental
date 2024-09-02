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

$requestMethod = $_SERVER["REQUEST_METHOD"];
$endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : '';

if ($requestMethod === 'POST' && $endpoint === 'add_expense_type') {
    addExpenseType();
} elseif ($requestMethod === 'POST' && $endpoint === 'add_expense') {
    addExpense(); 
} elseif ($requestMethod === 'GET' && $endpoint === 'get_expense_type_by_id') {
    getExpenseTypeById();
} elseif ($requestMethod === 'GET' && $endpoint === 'list_expense_types') {
    listExpenseTypes();
} elseif ($requestMethod === 'DELETE') {
    deleteExpenseType();
} elseif ($requestMethod === 'PUT') {
    updateExpenseType();
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid request method or endpoint."]);
}


function addExpenseType() {
    global $conn;

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
            echo json_encode(["status" => "success", "message" => "New expense type record created successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Error executing query"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Error: " . $e->getMessage()]);
    }
    $conn = null;
}
function addExpense() {
    global $conn;

    
    $type_id = $_POST['expense_type_id'] ?? null;
    $amount = $_POST['expenses_amount'] ?? null;
    $date = $_POST['expenses_date'] ?? null;
    $detail = $_POST['detail'] ?? null;
    $check_id = $_POST['check_id'] ?? null;

    $missing_fields = [];
    if (empty($type_id)) $missing_fields[] = 'expense_type_id';
    if (empty($amount)) $missing_fields[] = 'expenses_amount';
    if (empty($date)) $missing_fields[] = 'expenses_date';

    if (!empty($missing_fields)) {
        $missing_fields_list = implode(', ', $missing_fields);
        echo json_encode(["status" => "error", "message" => "Required fields are missing: $missing_fields_list"]);
        exit();
    }

    try {
        $sql = "INSERT INTO Expenses (expense_type_id, expenses_amount, expenses_date, detail, check_id) 
                VALUES (:type_id, :amount, :date, :detail, :check_id)";
                
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new Exception("Failed to prepare statement: " . json_encode($conn->errorInfo()));
        }

        $stmt->bindValue(':type_id', $type_id);
        $stmt->bindValue(':amount', $amount);
        $stmt->bindValue(':date', $date);
        $stmt->bindValue(':detail', $detail);
        $stmt->bindValue(':check_id', $check_id);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "New expense record created successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Error executing query"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Error: " . $e->getMessage()]);
    }
    $conn = null;
}


function getExpenseTypeById() {
    global $conn;

    $expense_type_id = isset($_GET['expense_type_id']) ? intval($_GET['expense_type_id']) : null;

    if ($expense_type_id === null) {
        http_response_code(400);
        echo json_encode(['error' => 'expense_type_id is required']);
        exit();
    }

    try {
        $stmt = $conn->prepare('SELECT * FROM ExpensesType WHERE expense_type_id = :expense_type_id');
        $stmt->bindParam(':expense_type_id', $expense_type_id, PDO::PARAM_INT);
        $stmt->execute();

        $expensesTypes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($expensesTypes);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }

    $conn = null;
}

function listExpenseTypes() {
    global $conn;

    try {
        $stmt = $conn->prepare('SELECT * FROM ExpensesType');
        $stmt->execute();

        $expensesTypes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($expensesTypes);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
    $conn = null;
}

function deleteExpenseType() {
    global $conn;

    $expense_type_id = $_GET['expense_type_id'] ?? null;

    if ($expense_type_id) {
        try {
            $conn->beginTransaction();
            $stmt = $conn->prepare("DELETE FROM ExpensesType WHERE expense_type_id = :expense_type_id");
            $stmt->bindParam(':expense_type_id', $expense_type_id, PDO::PARAM_INT);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $conn->commit();
                http_response_code(200);
                echo json_encode(["status" => "success", "message" => "Expense type record deleted successfully"]);
            } else {
                http_response_code(404);
                echo json_encode(["status" => "error", "message" => "Expense type record not found"]);
            }
        } catch (PDOException $e) {
            $conn->rollBack();
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error: ' . $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Expense type ID is required"]);
    }

    $conn = null;
}

function updateExpenseType() {
    global $conn;

    $data = json_decode(file_get_contents("php://input"), true);

    if ($data === null) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid JSON input"]);
        exit;
    }

    if (isset($data['expense_type_id']) && !empty($data['expense_type_id'])) {
        $expense_type_id = $data['expense_type_id'];

        $type = isset($data['type']) ? $data['type'] : null;
        $type_info = isset($data['type_info']) ? $data['type_info'] : null;

        try {
            $conn->beginTransaction();

            $stmt = $conn->prepare("
                UPDATE ExpensesType SET 
                    type = :type,
                    type_info = :type_info
                WHERE expense_type_id = :expense_type_id
            ");
            $stmt->bindParam(':type', $type);
            $stmt->bindParam(':type_info', $type_info);
            $stmt->bindParam(':expense_type_id', $expense_type_id);
            $stmt->execute();

            $conn->commit();

            http_response_code(200);
            echo json_encode(["status" => "success", "message" => "Expense type record updated successfully"]);
        } catch (PDOException $e) {
            $conn->rollBack();
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error: ' . $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Expense type ID is required for updating the record"]);
    }

    $conn = null;
}
?>
