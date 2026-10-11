<?php
// Kontaktformular: nimmt JSON {name, email, message} vom Portfolio entgegen
// (siehe src/app/layout/main/contact/contact.ts) und schickt es per Mail weiter.

const RECIPIENT = 'info@svenhaase.de';
// Absender muss eine Adresse der eigenen Domain sein, sonst landet die Mail im Spam.
// Die Adresse des Besuchers steht im Reply-To, "Antworten" geht also direkt an ihn.
const SENDER = 'info@svenhaase.de';
const ALLOWED_ORIGINS = [
    'https://svenhaase.de',
    'https://www.svenhaase.de',
    'http://localhost:4200',
    'http://localhost:4300',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, ALLOWED_ORIGINS, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: text/plain; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST, OPTIONS');
    exit('Method not allowed');
}

$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) {
    http_response_code(400);
    exit('Invalid request');
}

// Zeilenumbrueche im Namen entfernen: verhindert eingeschleuste Mail-Header
$name = trim(str_replace(["\r", "\n"], ' ', (string) ($data['name'] ?? '')));
$email = trim((string) ($data['email'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));

// Gleiche Regeln wie im Formular (Name Pflicht, gueltige E-Mail, Nachricht ab 4 Zeichen)
if (
    $name === '' || strlen($name) > 200
    || !filter_var($email, FILTER_VALIDATE_EMAIL)
    || strlen($message) < 4 || strlen($message) > 10000
) {
    http_response_code(400);
    exit('Invalid input');
}

$subject = '=?UTF-8?B?' . base64_encode('Portfolio-Kontakt von ' . $name) . '?=';
$body = "Name: {$name}\nE-Mail: {$email}\n\n{$message}\n";
$headers = implode("\r\n", [
    'From: Portfolio Kontaktformular <' . SENDER . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
]);

if (mail(RECIPIENT, $subject, $body, $headers)) {
    exit('ok');
}

http_response_code(500);
exit('Mail could not be sent');
