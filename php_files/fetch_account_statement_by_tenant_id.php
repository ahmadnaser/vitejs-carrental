<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'dbconfig.php';

$tenantId = isset($_GET['tenant_id']) ? $_GET['tenant_id'] : null;
$startDate = isset($_GET['start_date']) ? $_GET['start_date'] : null;
$endDate = isset($_GET['end_date']) ? $_GET['end_date'] : null;

if ($tenantId === null) {
    http_response_code(400);
    echo json_encode(["message" => "Tenant ID is required"]);
    exit;
}

if ($startDate === null || $endDate === null) {
    http_response_code(400);
    echo json_encode(["message" => "Start date and end date are required"]);
    exit;
}

$sql = "
        SELECT
            t.*,
            p.*,
            r.reservation_id,
            v.vehicle_id,
            v.make,
            v.model,
            ten.tenant_name AS customer,
            ten.id_number AS tenantID,
            r.start_date,
            r.end_date,
            r.price_perday,
            r.total_amount,
            r.amount_paid,
            DATEDIFF(r.end_date, r.start_date) AS dayNum
        FROM Transactions t
        LEFT JOIN Payments p ON t.payment_id = p.payment_id
        LEFT JOIN Reservations r ON p.reservation_id = r.reservation_id
        LEFT JOIN Vehicles v ON r.vehicle_id = v.vehicle_id
        LEFT JOIN Tenants ten ON r.tenant_id = ten.id_number
        WHERE ten.id_number = :tenantId
          AND t.date BETWEEN :startDate AND :endDate
    ";
try {
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':tenantId', $tenantId, PDO::PARAM_STR);
    $stmt->bindParam(':startDate', $startDate, PDO::PARAM_STR);
    $stmt->bindParam(':endDate', $endDate, PDO::PARAM_STR);
    $stmt->execute();

    $accountStatement = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($accountStatement)) {
        echo json_encode(["message" => "No contracts found"]);
    } else {
        echo json_encode($accountStatement);
    }
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Error: " . $e->getMessage()]);
}

$conn = null;
?>
