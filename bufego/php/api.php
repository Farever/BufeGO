<?php
//PHP telepítés kell!!!
//php -S localhost:8000 command a php mappában

header('Access-Control-Allow-Origin: http://localhost:3000');

$url = explode('/', $_SERVER["PHP_SELF"]);
$endpoint = explode('?', end($url))[0];

include './db.php';
include './kategoriak.php';
include './bufeadatok.php';

switch ($endpoint) {
    case 'test':
        echo $endpoint;
        break;

    case 'kategoriak':
        if ($_SERVER["REQUEST_METHOD"] == "GET") {
            if (!empty($_GET['bufeId'])) {
                echo json_encode(kategoriakLekerese($_GET['bufeId']), JSON_UNESCAPED_UNICODE);
            } else {
                header('bad request', true, 400);
                echo json_encode(['valasz' => 'Hiányzó adatok!'], JSON_UNESCAPED_UNICODE);
            }
        } else {
            header('bad request', true, 400);
            echo json_encode(['valasz' => 'Hibás metődus!'], JSON_UNESCAPED_UNICODE);
        }
        break;

    case 'kategoriamodosit':
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (!empty($_POST['katId'] &&  !empty($_POST['katName']))) {
                echo json_encode(kategoriaModosit($_POST['katId'], $_POST['katName']), JSON_UNESCAPED_UNICODE);
            } else {
                header('bad request', true, 400);
                echo json_encode(['valasz' => 'Hiányzó adatok!'], JSON_UNESCAPED_UNICODE);
            }
        } else {
            header('bad request', true, 400);
            echo json_encode(['valasz' => 'Hibás metődus!'], JSON_UNESCAPED_UNICODE);
        }
        break;

    case 'kategoriafeltolt':
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (!empty($_POST['katId']) && !empty($_POST['bufeId']) && !empty($_POST['katName'])) {
                echo json_encode(kategoriaFeltolt($_POST['katId'], $_POST['bufeId'], $_POST['katName']), JSON_UNESCAPED_UNICODE);
            } else {
                header('bad request', true, 400);
                echo json_encode(['valasz' => 'Hiányzó adatok!'], JSON_UNESCAPED_UNICODE);
            }
        } else {
            header('bad request', true, 400);
            echo json_encode(['valasz' => 'Hibás metődus!'], JSON_UNESCAPED_UNICODE);
        }
        break;

    case 'kategoriaTorol':
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (!empty($_POST['katId'])) {
                echo json_encode(kategoriaTorol($_POST['katId']), JSON_UNESCAPED_UNICODE);
            } else {
                header('bad request', true, 400);
                echo json_encode(['valasz' => 'Hiányzó adatok!'], JSON_UNESCAPED_UNICODE);
            }
        } else {
            header('bad request', true, 400);
            echo json_encode(['valasz' => 'Hibás metődus!'], JSON_UNESCAPED_UNICODE);
        }
        break;

    case 'bufemodositas':
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (!empty($_POST['bufeId']) && !empty($_POST['bufeName']) && !empty($_POST['desc']) && !empty($_POST['phone']) && !empty($_POST['addressId']) && !empty($_POST['schoolId'])) {
                echo json_encode(bufeModositas($_POST['bufeId'], $_POST['bufeName'], $_POST['desc'], $_POST['phone'], $_POST['addressId'], $_POST['schoolId'], $_POST['payment'], $_POST['avaliable']), JSON_UNESCAPED_UNICODE);
            } else {
                header('bad request', true, 400);
                echo json_encode(['valasz' => 'Hiányzó adatok!'], JSON_UNESCAPED_UNICODE);
            }
        } else {
            header('bad request', true, 400);
            echo json_encode(['valasz' => 'Hibás metődus!'], JSON_UNESCAPED_UNICODE);
        }
        break;

    case 'bufefeltoltes':
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (!empty($_POST['adminUserId']) && !empty($_POST['bufeName']) && !empty($_POST['desc']) && !empty($_POST['phone']) && !empty($_POST['addressId']) && !empty($_POST['schoolId'])) {
                echo json_encode(bufeAdatokFeltoles($_POST['adminUserId'], $_POST['bufeName'], $_POST['desc'], $_POST['phone'], $_POST['addressId'], $_POST['schoolId'], $_POST['payment'], $_POST['avaliable']), JSON_UNESCAPED_UNICODE);
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
