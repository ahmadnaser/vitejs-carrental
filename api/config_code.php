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

define('ENCRYPTION_KEY', 'your-encryption-key'); 
define('ENCRYPTION_METHOD', 'AES-256-CBC');
define('IV', '1234567890123456');

function encrypt($data) {
    return openssl_encrypt($data, ENCRYPTION_METHOD, ENCRYPTION_KEY, 0, IV);
}

function decrypt($data) {
    return openssl_decrypt($data, ENCRYPTION_METHOD, ENCRYPTION_KEY, 0, IV);
}

function getAllConfig($conn) {
    $sql = "SELECT id, code FROM Config";
    try {
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $configs = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        foreach ($configs as &$config) {
            $config['code'] = decrypt($config['code']);
        }

        echo json_encode($configs);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(["message" => "Error: " . $e->getMessage()]);
    }
}

function updateConfigCode($conn, $oldCode, $newCode) {
    $sql = "SELECT code FROM Config WHERE id = 1";
    try {
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            $decryptedCode = decrypt($result['code']);
            if ($decryptedCode === $oldCode) {
                $encryptedNewCode = encrypt($newCode);

                $updateSql = "UPDATE Config SET code = :code WHERE id = 1";
                $updateStmt = $conn->prepare($updateSql);
                $updateStmt->bindParam(':code', $encryptedNewCode, PDO::PARAM_STR);
                $updateStmt->execute();

                echo json_encode(["message" => "Code updated successfully"]);
            } else {
                http_response_code(400);
                echo json_encode(["message" => "Old code incorrect"]);
            }
        } else {
            http_response_code(404);
            echo json_encode(["message" => "No config found"]);
        }
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(["message" => "Error: " . $e->getMessage()]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    getAllConfig($conn);
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);

    if ($data === null) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid JSON input"]);
        exit;
    }
    $oldCode = $data['oldCode'] ?? null;
    $newCode = $data['newCode'] ?? null;

    if ($oldCode && $newCode) {
        updateConfigCode($conn, $oldCode, $newCode);
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Old code and new code are required"]);
    }
}

$conn = null;
?>
