<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

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


function updateConfigCode($conn, $newCode) {
    $encryptedCode = encrypt($newCode);
    $id = 1; 

    $sql = "UPDATE Config SET code = :code WHERE id = :id";
    try {
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':code', $encryptedCode, PDO::PARAM_STR);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        echo json_encode(["message" => "Code updated successfully"]);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(["message" => "Error: " . $e->getMessage()]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    getAllConfig($conn);
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    parse_str(file_get_contents("php://input"), $put_vars);
    $newCode = $put_vars['newCode'] ?? null;

    if ($newCode) {
        updateConfigCode($conn, $newCode);
    } else {
        http_response_code(400);
        echo json_encode(["message" => "New code is required"]);
    }
}

$conn = null;
?>
