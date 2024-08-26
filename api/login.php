<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

include 'dbconfig.php';
require 'vendor/autoload.php';

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

$secret_key = "Mypass";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $email = $data['email'] ?? null;
    $password = $data['password'] ?? null;

    if (empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode(["message" => "Email and password are required."]);
        exit();
    }

    try {
        $stmt = $conn->prepare('SELECT * FROM Users WHERE email = :email');
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) { 
            $issued_at = time();
            $expiration_time = $issued_at + (60 * 60); 
            $payload = [
                "iss" => "admin.com",
                "iat" => $issued_at,
                "exp" => $expiration_time,
                "user_id" => $user['user_id'],
                "role" => $user['role']
            ];

            $jwt = JWT::encode($payload, $secret_key, 'HS256');

            http_response_code(200);
            echo json_encode([
                "message" => "Login successful.",
                "jwt" => $jwt,
                "role" => $user['role']
            ]);
        } else {
            http_response_code(401);
            echo json_encode(["message" => "Login failed. Incorrect email or password."]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["message" => "Error: " . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Invalid request method."]);
}

$conn = null;
