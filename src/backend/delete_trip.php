<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
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

$data = json_decode(file_get_contents("php://input"), true);

$id = intval($data["id"] ?? 0);

if ($id <= 0) {
    echo json_encode(["message" => "Invalid trip ID"]);
    exit;
}

$stmt = $conn->prepare("DELETE FROM saved_trips WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Trip deleted successfully"]);
} else {
    echo json_encode(["message" => "Error deleting trip"]);
}

$stmt->close();
$conn->close();

?>