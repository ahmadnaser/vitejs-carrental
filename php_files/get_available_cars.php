<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'dbconfig.php';

if (isset($_GET['start_date']) && isset($_GET['end_date'])) {
    $start_date = $_GET['start_date'];
    $end_date = $_GET['end_date'];

    try {
        $stmt = $conn->prepare("
            SELECT * FROM Vehicles v
            WHERE v.status = 'available'
            AND NOT EXISTS (
                SELECT 1 FROM reservations r
                WHERE r.vehicle_id = v.vehicle_id
                AND (
                    (r.start_date <= :end_date AND r.end_date >= :start_date)
                )
            )
        ");
        $stmt->bindParam(':start_date', $start_date);
        $stmt->bindParam(':end_date', $end_date);
        $stmt->execute();
        $availableCars = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($availableCars);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required parameters: start_date and end_date']);
}

$conn = null;
?>
