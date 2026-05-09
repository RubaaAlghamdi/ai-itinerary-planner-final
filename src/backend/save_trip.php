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

if (!$data) {
    echo json_encode(["message" => "No data received"]);
    exit;
}

$destination = $data["destination"] ?? "";
$days = intval($data["days"] ?? 0);
$budget = $data["budget"] ?? "";
$plan = $data["plan"] ?? "";

$stmt = $conn->prepare("INSERT INTO saved_trips (destination, days, budget, generated_plan) VALUES (?, ?, ?, ?)");
$stmt->bind_param("siss", $destination, $days, $budget, $plan);

if ($stmt->execute()) {
    echo json_encode(["message" => "Trip saved successfully"]);
} else {
    echo json_encode([
        "message" => "Error saving trip",
        "error" => $stmt->error
    ]);
}

$stmt->close();
$conn->close();

?>