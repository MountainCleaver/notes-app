<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "db.php";

$note_id =$_GET["note_id"];


try {
    $sql = "SELECT * FROM notes WHERE id = $note_id";
    $stmt = $pdo->query($sql);
    $notes = $stmt->fetch();

    echo json_encode([
        "result" => true,
        "data" => $notes,
        "message" => "Note fetched successfully"
    ]);
} catch(PDOException $e) {
    echo json_encode([
        "result" => false,
        "message" => $e->getMessage()
    ]);
}