<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "db.php";

$input = json_decode(file_get_contents("php://input"), true);

$id = $input['id'];
$title = $input['title'];
$content = $input['content'];
date_default_timezone_set('Asia/Manila');
$date = date('Y-m-d H:i:s');

try {
    $sql = "UPDATE notes 
                SET 
                    title = ?,
                    content = ?,
                    date = ?
                WHERE 
                    id  = ?
                ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$title, $content, $date, $id]);

    $edited_sql = "SELECT * FROM notes WHERE id = ?";   
    $stmt = $pdo->prepare($edited_sql);
    $stmt->execute([$id]);
    $edited_note = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        "result" => true,
        "data" => $edited_note,
        "message" => "Note updated successfully"
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "result" => false,
        "message" => $e->getMessage()
    ]);
}
