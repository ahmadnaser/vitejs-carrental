<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include 'dbconfig.php';

$requestMethod = $_SERVER["REQUEST_METHOD"];
$endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : '';

if ($requestMethod === 'POST' && $endpoint === 'add_expense') {
    addExpense();
} elseif ($requestMethod === 'POST' && $endpoint === 'add_expense_type') {
    addExpenseType();
} elseif ($requestMethod === 'GET' && $endpoint === 'get_expense_type_by_id') {
    getExpenseTypeById();
} elseif ($requestMethod === 'GET' && $endpoint === 'list_expense_types') {
    listExpenseTypes();
} elseif ($requestMethod === 'GET' && $endpoint === 'list_expenses') {
    listExpenses();
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid request method or endpoint."]);
}

function addExpense() {
    global $conn;

    $expenses_amount = $_POST['amount'] ?? null;
    $expense_type_id = $_POST['expense_type_id'] ?? null;
    $expenses_date = $_POST['expense_date'] ?? null;
    $detail = $_POST['details'] ?? null;

    $missing_fields = [];

    if (empty($expense_type_id)) $missing_fields[] = 'expense_type_id';
    if (empty($expenses_amount)) $missing_fields[] = 'expenses_amount';
    if (empty($expenses_date)) $missing_fields[] = 'expenses_date';
 
    if (!empty($missing_fields)) {
        http_response_code(500);
        $missing_fields_list = implode(', ', $missing_fields);
        echo json_encode(["status" => "error", "message" => "Required fields are missing: $missing_fields_list"]);
        exit();
    }

    try {
        $sql = "INSERT INTO Expenses (expenses_amount,expense_type_id, expenses_date, detail)
                VALUES (:expenses_amount,:expense_type_id, :expenses_date, :detail)";

        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new Exception("Failed to prepare statement: " . json_encode($conn->errorInfo()));
        }

        $stmt->bindValue(':expenses_amount', $expenses_amount);
        $stmt->bindValue(':expense_type_id', $expense_type_id);
        $stmt->bindValue(':expenses_date', $expenses_date);
        $stmt->bindValue(':detail', $detail);

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

function listExpenses() {
    global $conn;

    try {
        $startDate = isset($_GET['start_date']) ? $_GET['start_date'] : null;
        $endDate = isset($_GET['end_date']) ? $_GET['end_date'] : null;

        $sql = '
            SELECT Expenses.*, ExpensesType.type as expense_type_name 
            FROM Expenses 
            LEFT JOIN ExpensesType ON Expenses.expense_type_id = ExpensesType.expense_type_id 
            WHERE 1=1';
        
        if ($startDate) {
            $sql .= ' AND expenses_date >= :startDate';
        }
        if ($endDate) {
            $sql .= ' AND expenses_date <= :endDate';
        }

        $stmt = $conn->prepare($sql);

        if ($startDate) {
            $stmt->bindParam(':startDate', $startDate);
        }
        if ($endDate) {
            $stmt->bindParam(':endDate', $endDate);
        }

        $stmt->execute();
        $expenses = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($expenses);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }

    $conn = null;
}
?>
