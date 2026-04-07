<?php
/**
 * Telegram Kontakt-Bridge für Sven
 * Empfängt JSON-Daten von Angular und sendet sie per Telegram Bot API
 */

// 1. CORS-Header (Erlaubt den Zugriff von deiner Angular-App)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// OPTIONS-Request für den Browser-Check abfangen (Preflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

// 2. Konfiguration
$botToken = "8580018482:AAHg8fQr9fieDLHkOXutVaqv4fkCog5MhAU"; 
$chatId   = "915152212"; // Deine ID aus der initChat.js

// 3. JSON-Input von Angular einlesen
$jsonInput = file_get_contents('php://input');
$data = json_decode($jsonInput, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Keine Daten empfangen"]);
    exit;
}

// 4. Daten aufbereiten (Säuberung von HTML-Tags)
$name    = strip_tags($data['name'] ?? 'Unbekannt');
$email   = strip_tags($data['email'] ?? 'Keine E-Mail');
$message = strip_tags($data['message'] ?? 'Keine Nachricht');

// Nachrichtentext für Telegram formatieren (Markdown)
$text = "📩 *Neue Nachricht über svenhaase.de*\n\n";
$text .= "*Name:* $name\n";
$text .= "*E-Mail:* $email\n\n";
$text .= "*Nachricht:*\n$message";

// 5. Telegram API Aufruf via cURL
$url = "https://api.telegram.org/bot$botToken/sendMessage";
$postData = [
    'chat_id' => $chatId,
    'text' => $text,
    'parse_mode' => 'Markdown'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10); // Timeout nach 10 Sekunden

$response = curl_exec($ch);
$curlError = curl_error($ch);
curl_close($ch);

// 6. Rückmeldung an Angular
if ($response) {
    $resArray = json_decode($response, true);
    if (isset($resArray['ok']) && $resArray['ok']) {
        http_response_code(200);
        echo json_encode(["status" => "success", "info" => "Nachricht an Telegram gesendet"]);
    } else {
        http_response_code(500);
        $errorDesc = $resArray['description'] ?? 'Unbekannter API Fehler';
        echo json_encode(["status" => "error", "message" => $errorDesc]);
    }
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "cURL Fehler: $curlError"]);
}
?>