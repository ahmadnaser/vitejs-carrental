<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include 'dbconfig.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['email'])) {
        $email = $_GET['email'];
        $sql = "SELECT * FROM Users WHERE email = :email";

        try {
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                echo json_encode($user);
            } else {
                http_response_code(404);
                echo json_encode(["message" => "User not found"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["message" => "Database error: " . $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Email parameter is required"]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);

    if ($data === null) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid JSON input"]);
        exit;
    }

    $current_email = $data['email'] ?? null;
    $new_name = $data['new_name'] ?? null;
    $new_address = $data['new_address'] ?? null;
    $new_password = $data['new_password'] ?? null;
    $current_password = $data['old_password'] ?? null;
    $new_email = $data['new_email'] ?? null;

    $missing_fields = [];
    if (!$current_email) {
        $missing_fields[] = 'current_email';
    }

    if (empty($new_name) && empty($new_address) && empty($new_password) && empty($new_email)) {
        $missing_fields[] = 'new_name, new_address, new_password, or new_email';
    }

    if ($new_password && !$current_password) {
        $missing_fields[] = 'old_password';
    }

    if (empty($missing_fields)) {
        try {
            if ($new_password) {
                $stmt = $conn->prepare("SELECT password FROM Users WHERE email = :email");
                $stmt->bindParam(':email', $current_email, PDO::PARAM_STR);
                $stmt->execute();
                $user = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($user && password_verify($current_password, $user['password'])) {
                    $hashed_new_password = password_hash($new_password, PASSWORD_DEFAULT);
                } else {
                    http_response_code(403);
                    echo json_encode(["message" => "Old password is incorrect"]);
                    exit;
                }
            }

            $sql = "UPDATE Users SET ";
            $params = [];

            if ($new_name) {
                $sql .= "name = :new_name, ";
                $params[':new_name'] = $new_name;
            }
            if ($new_address) {
                $sql .= "address = :new_address, ";
                $params[':new_address'] = $new_address;
            }
            if ($new_password) {
                $sql .= "password = :new_password, ";
                $params[':new_password'] = $hashed_new_password;
            }
            if ($new_email) {
                $sql .= "email = :new_email, ";
                $params[':new_email'] = $new_email;
            }

            $sql = rtrim($sql, ', ');
            $sql .= " WHERE email = :current_email";
            $params[':current_email'] = $current_email;

            $stmt = $conn->prepare($sql);
            foreach ($params as $param => $value) {
                $stmt->bindValue($param, $value);
            }
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                http_response_code(200);
                echo json_encode(["message" => "User information updated successfully"]);
            } else {
                http_response_code(404);
                echo json_encode(["message" => "User not found or no changes made"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["message" => "Database error: " . $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "The following fields are required: " . implode(', ', $missing_fields)]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Invalid request method."]);
}

$conn = null;
?>
