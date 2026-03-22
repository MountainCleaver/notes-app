<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = [
    'result' => true,
    'data' => [
        ["id" => 1, "name" => "Jorji"],
        ["id" => 2, "name" => "Hapi"],
        ["id" => 3, "name" => "Moka"]
    ]
];

echo json_encode($data);
