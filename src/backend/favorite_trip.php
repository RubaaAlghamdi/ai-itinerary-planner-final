<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$password = "";
$database = "ai_itinerary_planner";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    echo json_encode(["message" => "Database connection failed"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$id = intval($data["id"] ?? 0);
$is_favorite = intval($data["is_favorite"] ?? 0);

if ($id <= 0) {
    echo json_encode(["message" => "Invalid trip ID"]);
    exit;
}

$stmt = $conn->prepare("UPDATE saved_trips SET is_favorite = ? WHERE id = ?");
$stmt->bind_param("ii", $is_favorite, $id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Favorite updated successfully"]);
} else {
    echo json_encode(["message" => "Error updating favorite"]);
}

$stmt->close();
$conn->close();

?>
