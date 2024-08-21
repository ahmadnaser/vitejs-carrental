<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include 'dbconfig.php';

try {
    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        $start_date = isset($_GET['start_date']) ? $_GET['start_date'] : '';
        $end_date = isset($_GET['end_date']) ? $_GET['end_date'] : '';

        $sql = "
            SELECT 
                t.description,
                t.date,
                CASE 
                    WHEN t.payment_id IS NOT NULL THEN t.debit
                    ELSE 0 
                END AS required_of_him,
                CASE 
                    WHEN t.expensese_id IS NOT NULL THEN t.debit
                    ELSE 0 
                END AS required_of_me,
                CASE 
                    WHEN t.payment_id IS NOT NULL AND t.debit = 0 THEN t.credit
                    ELSE 0 
                END AS payment_amount,
                CASE 
                    WHEN t.expensese_id IS NOT NULL AND t.debit = 0 THEN t.credit
                    ELSE 0 
                END AS expense_amount
            FROM 
                Transactions t
            LEFT JOIN 
                Payments p ON t.payment_id = p.payment_id
            LEFT JOIN 
                Expenses e ON t.expensese_id = e.expenses_id
        ";

        if (!empty($start_date) && !empty($end_date)) {
            $sql .= " WHERE t.date BETWEEN :start_date AND :end_date ";
        }

        $sql .= " ORDER BY t.transaction_id";

        $stmt = $conn->prepare($sql);

        if (!empty($start_date) && !empty($end_date)) {
            $stmt->bindParam(':start_date', $start_date);
            $stmt->bindParam(':end_date', $end_date);
        }

        $stmt->execute();
        $totals = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($totals) {
            http_response_code(200);
            echo json_encode($totals);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'No data found']);
        }
    } else {
        http_response_code(405);
        echo json_encode(['message' => 'Invalid request method']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Error: ' . $e->getMessage()]);
}

$conn = null;
?>
