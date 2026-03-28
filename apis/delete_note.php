<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods:  DELETE');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "db.php";

$input = json_decode(file_get_contents("php://input"), true);

$delete_id = $input['id'];
$top_row;

try {

    $sql = "DELETE FROM notes WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$delete_id]);
    $deleted_rows = $stmt->rowCount();

    if ($deleted_rows >= 1) {
        $get_one_sql = "SELECT  * FROM notes ORDER BY  id ASC LIMIT 1";
        $get_one_stmt = $pdo->query($get_one_sql);
        $top_row = $get_one_stmt->fetch();
    }

    echo json_encode([
        "result" => true,
        "data" => [
            "affected_rows" => $deleted_rows,
            "top_row" => ($top_row ==  false ? null : $top_row)
        ],
        "message" => "Note sucessfully deleted."
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "result" => false,
        "message" => $e->getMessage()
    ]);
}
