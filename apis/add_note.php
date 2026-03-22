<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "db.php";

$input = json_decode(file_get_contents("php://input"), true);

$title = $input['title'];
$content = $input['content'];
date_default_timezone_set('Asia/Manila');
$date = date('Y-m-d H:i:s');

try {
    $sql = "INSERT INTO notes (title, content, date) VALUES ('$title', '$content', '$date')";
    $stmt = $pdo->exec($sql);

    $id = $pdo->lastInsertId();
    $get_sql = "SELECT * FROM notes WHERE id = $id";
    $stmt = $pdo->query($get_sql);
    $new_note = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        "result" => true,
        "data" => $new_note,
        "message" => "Note inserted successfully"
    ]);
} catch(PDOException $e) {
    echo json_encode([
        "result" => false,
        "message" => $e->getMessage()
    ]);
}