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

    case 'felhasznaloregisztracio':
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
    case 'felhasznaloadatmodositas':
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (!empty($_POST['email']) && !empty($_POST['userId']) && !empty($_POST['name']) && !empty($_POST['address_id']) && !empty($_POST['phone']) && !empty($_POST['school'])) {
                $adatok = felhasznaloAdatokModositas($_POST['userId'], $_POST['email'], $_POST['name'], $_POST['address_id'], $_POST['phone'], $_POST['school'], NULL, 0);
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
    case 'jelszovaltoztat':
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (!empty($_POST["userId"]) && !empty($_POST["passcode"])) {
                $adatok = jelszoValtoztatas($_POST["userId"], $_POST["passcode"]);
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
    case 'iskolafeltoltes':
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (!empty($_POST['school_name'])) {
                echo json_encode(iskolaFeltoltes($_POST["school_name"]), JSON_UNESCAPED_UNICODE);
            } else {
                header('bad request', true, 400);
                echo json_encode(['valasz' => 'Hiányzó adatok!'], JSON_UNESCAPED_UNICODE);
            }
        } else {
            header('bad request', true, 400);
            echo json_encode(['valasz' => 'Hibás metődus!'], JSON_UNESCAPED_UNICODE);
        }
        break;
    case 'cimfeltoltes':
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (!empty($_POST['zip']) && !empty($_POST['city']) && !empty($_POST['address'])) {
                $adatok = cimFeltoltes($_POST['zip'], $_POST['city'], $_POST['address']);
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
