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

try {
    $sql = "SELECT * FROM notes ORDER BY date DESC";
    $stmt = $pdo->query($sql);
    $notes = $stmt->fetchAll();

    echo json_encode([
        "result" => true,
        "data" => $notes,
        "message" => "Notes fetched successfully"
    ]);
} catch(PDOException $e) {
    echo json_encode([
        "result" => false,
        "message" => $e->getMessage()
    ]);
}