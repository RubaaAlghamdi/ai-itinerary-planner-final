<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$password = "Aa118685658";
$database = "ai_itinerary_planner";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    echo json_encode(["message" => "Database connection failed"]);
    exit;
}

$sql = "SELECT * FROM saved_trips ORDER BY created_at DESC";
$result = $conn->query($sql);

$trips = [];

while ($row = $result->fetch_assoc()) {
    $trips[] = $row;
}

echo json_encode($trips);

$conn->close();

?>