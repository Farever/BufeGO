<?php
header('Access-Control-Allow-Origin: http://localhost:3000');

$url = explode('/', $_SERVER["PHP_SELF"]);
$endpoint = explode('?', end($url))[0];

include './db.php';
include './felhasznalok.php';

switch ($endpoint) {
    case 'felhasznaloadatok':
            if ($_SERVER["REQUEST_METHOD"] == "GET") {
                if (!empty($_GET['userId'])) {
                    echo json_encode(felhasznaloiAdatokLekerese($_GET['userId']), JSON_UNESCAPED_UNICODE);
                } else {
                    header('bad request', true, 400);
                    echo json_encode(['valasz' => 'Hiányzó adatok!'], JSON_UNESCAPED_UNICODE);
                }
            } else {
                header('bad request', true, 400);
                echo json_encode(['valasz' => 'Hibás metődus!'], JSON_UNESCAPED_UNICODE);
            }
        break;

    case  'felhasznaloregisztracio':
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (!empty($_POST['email']) && !empty($_POST['passcode']) && !empty($_POST['name']) && !empty($_POST['address_id']) && !empty($_POST['phone']) && !empty($_POST['school'])) {
                $adatok = felhasznaloAdatokFeltoltese($_POST['email'], $_POST['passcode'], $_POST['name'], $_POST['address_id'], $_POST['phone'], $_POST['school'], NULL, 0);
                echo json_encode($adatok, JSON_UNESCAPED_UNICODE);
            } else {
                header('bad request', true, 400);
                echo json_encode(['valasz' => 'Hiányzó adatok!'], JSON_UNESCAPED_UNICODE);
            }
        } else {
            header('bad request', true, 400);
            echo json_encode(['valasz' => 'Hibás metődus!'], JSON_UNESCAPED_UNICODE);
        }
        break;

    default:
        break;
}
