<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'dbconfig.php';

$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    if (
        isset($_POST['tenant_id']) && 
        isset($_POST['payment_amount'])  && 
        isset($_POST['payment_date'])
    ) {
        $tenant_id = $_POST['tenant_id'];
        $amount_paid = $_POST['payment_amount'];
        $current_date = $_POST['payment_date'];

        $check_number = isset($_POST['check_number']) ? $_POST['check_number'] : NULL;
        $bank_name = isset($_POST['bank_name']) ? $_POST['bank_name'] : NULL;
        $check_date = isset($_POST['check_date']) ? $_POST['check_date'] : NULL;
        $check_holder = isset($_POST['check_holder']) ? $_POST['check_holder'] : NULL;
        $account_number = isset($_POST['account_number']) ? $_POST['account_number'] : NULL;
       
        $check_image = NULL;
        $target_dir = "check_uploads/";

        if (isset($_FILES['check_image']) && $_FILES['check_image']['error'] == 0) {

            if (!is_dir($target_dir)) {
                $response['status'] = 'error';
                $response['message'] = 'Upload directory does not exist.';
                http_response_code(500);
                echo json_encode($response);
                exit();
            }

            if (!is_writable($target_dir)) {
                $response['status'] = 'error';
                $response['message'] = 'Upload directory is not writable.';
                http_response_code(500);
                echo json_encode($response);
                exit();
            }

            $allowed_extensions = ['jpg', 'jpeg', 'png', 'gif'];
            $file_extension = pathinfo($_FILES['check_image']['name'], PATHINFO_EXTENSION);

            if (!in_array(strtolower($file_extension), $allowed_extensions)) {
                $response['status'] = 'error';
                $response['message'] = 'Invalid file extension. Only JPG, JPEG, PNG, and GIF are allowed.';
                http_response_code(400);
                echo json_encode($response);
                exit();
            }

            $check_image = $target_dir . basename($_FILES['check_image']['name']);

            if (!move_uploaded_file($_FILES['check_image']['tmp_name'], $check_image)) {
                $response['status'] = 'error';
                $response['message'] = 'Failed to upload check image.';
                http_response_code(500);
                echo json_encode($response);
                exit();
            }
        }

        try {
            $conn->beginTransaction();

            $invoiceStmt = $conn->prepare("
            SELECT i.Invoice_id 
            FROM Invoices i
            INNER JOIN reservations r ON i.Invoice_id = r.invoice_id
            WHERE r.tenant_id = :tenant_id 
            ORDER BY i.Invoice_id ASC 
            LIMIT 1
        ");
            $invoiceStmt->bindParam(':tenant_id', $tenant_id);
            $invoiceStmt->execute();
            $invoice = $invoiceStmt->fetch(PDO::FETCH_ASSOC);

            if (!$invoice) {
                throw new Exception('No unpaid or incomplete invoice found for this tenant.');
            }

            $invoice_id = $invoice['Invoice_id'];

            $payment_method = $check_number ? 'Bank Check' : 'Cash';
            $paymentStmt = $conn->prepare("INSERT INTO Payments (amount, payment_date, payment_method, check_id, invoice_id) VALUES (:amount, :payment_date, :payment_method, :check_id, :invoice_id)");
            $paymentStmt->bindParam(':amount', $amount_paid);
            $paymentStmt->bindParam(':payment_date', $current_date);
            $paymentStmt->bindParam(':payment_method', $payment_method);
            $paymentStmt->bindParam(':check_id', $check_number);
            $paymentStmt->bindParam(':invoice_id', $invoice_id);
            $paymentStmt->execute();
            $payment_id = $conn->lastInsertId();

            $updateInvoicesStmt = $conn->prepare("UPDATE Invoices SET amount_paid = amount_paid + :amount_paid WHERE Invoice_id = :Invoice_id");
            $updateInvoicesStmt->bindParam(':amount_paid', $amount_paid);
            $updateInvoicesStmt->bindParam(':Invoice_id', $invoice_id);
            $updateInvoicesStmt->execute();

            $tenantNameStmt = $conn->prepare("SELECT tenant_name FROM tenants WHERE id_number = :tenant_id");
            $tenantNameStmt->bindParam(':tenant_id', $tenant_id);
            $tenantNameStmt->execute();
            $tenant = $tenantNameStmt->fetch(PDO::FETCH_ASSOC);
            $tenant_name = $tenant['tenant_name'];

            $transactionStmt = $conn->prepare("INSERT INTO Transactions (date, description, debit, credit, payment_id) VALUES (:date, :description, :debit, :credit, :payment_id)");
            $transactionStmt->execute([
                ':date' => $current_date,
                ':description' => 'دفعة مالية - ' . $tenant_name,
                ':debit' => 0,
                ':credit' => $amount_paid,
                ':payment_id' => $payment_id
            ]);

            if ($payment_method === 'bank_check') {
                $checkStmt = $conn->prepare("INSERT INTO BankChecks (check_number, account_number, check_holder, bank_name, check_date, check_image) VALUES (:check_number, :account_number, :check_holder, :bank_name, :check_date, :check_image)");
                $checkStmt->bindParam(':check_number', $check_number);
                $checkStmt->bindParam(':account_number', $account_number);
                $checkStmt->bindParam(':check_holder', $check_holder);
                $checkStmt->bindParam(':bank_name', $bank_name);
                $checkStmt->bindParam(':check_date', $check_date);
                $checkStmt->bindParam(':check_image', $check_image);
                $checkStmt->execute();
            }

            $conn->commit();
            http_response_code(200);
            $response['status'] = 'success';
            $response['message'] = 'Payment added and reservation amount updated successfully';
            echo json_encode($response);
        } catch (PDOException $e) {
            $conn->rollBack();
            http_response_code(500);
            $response['status'] = 'error';
            $response['message'] = 'Error: ' . $e->getMessage();
            echo json_encode($response);
        }
    } else {
        http_response_code(400);
        $response['status'] = 'error';
        $response['message'] = 'Missing required fields';
        echo json_encode($response);
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'GET') {
    try {
        if (isset($_GET['check_id'])) {
            $check_id = $_GET['check_id'];
            $stmt = $conn->prepare("SELECT * FROM BankChecks WHERE check_id = :check_id");
            $stmt->bindParam(':check_id', $check_id, PDO::PARAM_INT);
            $stmt->execute();

            $checkDetails = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($checkDetails) {
                http_response_code(200);
                echo json_encode($checkDetails);
            } else {
                http_response_code(404);
                $response['status'] = 'error';
                $response['message'] = 'Check not found';
                echo json_encode($response);
            }
        } else {
            $stmt = $conn->prepare("SELECT * FROM Payments");
            $stmt->execute();

            $payments = $stmt->fetchAll(PDO::FETCH_ASSOC);

            http_response_code(200);
            echo json_encode($payments);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        $response['status'] = 'error';
        $response['message'] = 'Error: ' . $e->getMessage();
        echo json_encode($response);
    }
} else {
    http_response_code(405);
    $response['status'] = 'error';
    $response['message'] = 'Invalid request method';
    echo json_encode($response);
}


$conn = null;
?>
