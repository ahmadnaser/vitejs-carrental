<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include 'dbconfig.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'] ?? null;
    $email = $_POST['email'] ?? null;
    $password = $_POST['password'] ?? null;  
    $phone = $_POST['phone'] ?? null;
    $address = $_POST['address'] ?? null;
    $role = $_POST['role'] ?? 'customer'; 

    $missing_fields = [];

    if (empty($name)) $missing_fields[] = 'name';
    if (empty($email)) $missing_fields[] = 'email';
    if (empty($password)) $missing_fields[] = 'password'; 

    if (!empty($missing_fields)) {
        $missing_fields_list = implode(', ', $missing_fields);
        echo json_encode(["status" => "error", "message" => "Required fields are missing: $missing_fields_list"]);
        exit();
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    try {
        $sql = "INSERT INTO Users (name, email, password, phone, address, role)
                VALUES (:name, :email, :password, :phone, :address, :role)";

        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new Exception("Failed to prepare statement: " . json_encode($conn->errorInfo()));
        }

        $stmt->bindValue(':name', $name);
        $stmt->bindValue(':email', $email);
        $stmt->bindValue(':password', $hashed_password);  
        $stmt->bindValue(':phone', $phone);
        $stmt->bindValue(':address', $address);
        $stmt->bindValue(':role', $role);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "User registered successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Error executing query"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Error: " . $e->getMessage()]);
    }

    $conn = null;
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
