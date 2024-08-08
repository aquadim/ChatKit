<?php
// Прокси скрипт для избавления от душного CORS
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "http://127.0.0.1:7789");
curl_setopt($ch, CURLOPT_POST, 1);

$payload = file_get_contents("php://input");
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type:application/json',
    'TestingDriver:1'
]);

curl_exec($ch);
curl_close($ch);