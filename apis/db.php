<?php

$db_host = 'localhost';
$db_name = 'notes_app_db';
$db_user = 'root';
$db_pass = '';

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false
];

try{
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=UTF8", $db_user, $db_pass, $options);
}catch(PDOException $e){
    die("Database connection failed: ". $e->getMessage());
}
