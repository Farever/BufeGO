<?php

require __DIR__ . '/vendor/autoload.php';

use Cloudinary\Api\Upload\UploadApi;
use Cloudinary\Configuration\Configuration;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$cloudinary_url = $_ENV['CLOUDINARY_URL'];
Configuration::instance($cloudinary_url);

header('Access-Control-Allow-Origin: http://localhost:5173');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');


if(isset($_COOKIE["PHPSESSID"])){
    session_id($_COOKIE["PHPSESSID"]);
    session_start();
}else{
    session_start();
}

$url = explode('/', $_SERVER['REQUEST_URI']);
$endpoint = mb_strtolower(explode('?', end($url))[0]);
$method = $_SERVER["REQUEST_METHOD"];
$bodyData = ($method === "POST" || $method == "PUT" || $method == "DELETE") ? json_decode(file_get_contents('php://input'), true) : null;
$getData = $_GET;

handleEndpoint($endpoint, $method, $bodyData, $getData);

/**
 * Végpont feldolgozása.
 *
 * @param string $endpoint A végpont neve.
 * @param string $method A kérés metódusa (GET vagy POST).
 * @param array|null $bodyData A kérés törzsében kapott adatok (POST esetén).
 * @param array|null $getData A GET paraméterek.
 */
function handleEndpoint(string $endpoint, string $method, ?array $bodyData, ?array $getData): void
{
    if ($method === "OPTIONS") {
        http_response_code(200);
        exit;
    }
    $result = match ($endpoint) {
        'stat_monthly_income' => handleStatMonthlyIncome($method, $getData),
        'legjobbanfogyo' => handleLegjobbanFogyo($method, $getData),
        'currentrating' => handleCurrentRating($method, $getData),
        'getmonthlyrating' => handleGetMonthlyRating($method, $getData),
        'peak_time' => handlePeakTime($method, $getData),
        'eveklekerorders' => handleEvLekerOrders($method, $getData),
        'eveklekerratings' => handleEvLekerRatings($method, $getData),
        'kategoriak' => handleKategoriak($method, $getData),
        'kategoriamodositas' => handleKategoriaModositas($method, $bodyData),
        'kategoriafeltoltes' => handleKategoriaFeltoltes($method, $bodyData),
        'kategoriatorles' => handleKategoriaTorles($method, $getData),
        'kategorianev' => handleKategoriaNev($method, $getData),
        'bufemodositas' => handleBufeModositas($method),
        'bufefeltoltes' => handleBufeFeltoltes($method, $_POST),
        'userbufe' => handleUserBufe($method, $getData),
        'bejelentkezes' => handleBejelentkezes($method, $getData),
        'bejelentkezescookie' => handleBejelentkezesCookie($method, $bodyData),
        'sessdata' => handleGetSessData($method),
        'kijelentkezes' => handleKijelentkezes($method),
        'felhasznaloadatok' => handleFelhasznaloAdatok($method, $getData),
        'felhasznaloregisztracio' => handleFelhasznaloRegisztracio($method, $bodyData),
        'emailmegerosites' => handleEmailMegerosites($method, $getData),
        'felhasznaloadatmodositas' => handleFelhasznaloAdatmodositas($method, $bodyData),
        'felhasznaloinaktivalas' => handleFelhasznaloInaktivalas($method, $getData),
        'jelszovaltoztat' => handleJelszoValtoztat($method, $bodyData),
        'iskolafeltoltes' => handleIskolaFeltoltes($method, $bodyData),
        'iskolak' => handleIskolak($method),
        'cimfeltoltes' => handleCimFeltoltes($method, $bodyData),
        'cimadatok' => handleCimAdatok($method, $getData),
        'cimmodositas' => handleCimModositas($method, $bodyData),
        'kinalatlekeres' => handleKinalatLekeres($method, $getData),
        'admin_fo' => handleAdminFo($method, $getData),
        'bufe' => handleBufe($method, $bodyData),
        'bufe_rendelesek' => handleBufeRendelesek($method, $getData),
        'bufe_rendelesstatusz' => handleRendelesStatusz($method, $bodyData), 
        'termek_felv' => handleTermekFelv($method),
        'termekek' => handleTermekek($method, $getData),
        'termek_valt' => handleTermekValt($method, $bodyData),
        'termek_del' => handleTermekDel($method, $bodyData),
        'rendel' => handleRendel($method, $bodyData),
        'sajatrendelesek' => handleUserRendelesek($method, $getData),
        'kosar' => handleKosar($method, $getData),
        'kosarba' => handleKosarba($method, $bodyData),
        'kosarmod' => handleKosarTargyModosit($method, $bodyData),
        'kosartargytorles' => handleKosarTargyTorles($method, $bodyData),
        'kosartorles' => handleKosarTorles($method, $bodyData),
        'rating' => handleRating($method, $bodyData),
        'ertekelesek' => handleErtekelesek($method, $getData),
        default => ['valasz' => 'Hibás url', 'status' => 400],
    };

    if (isset($result['valasz'])) {
        header('Content-Type: application/json');
        if (isset($result['status'])) {
            http_response_code($result['status']);
        }
        echo json_encode($result, JSON_UNESCAPED_UNICODE);
    }
}

/**
 * Kezeli a havi bevétel statisztika lekérdezését.
 */
function handleStatMonthlyIncome(string $method, array $getData): ?array
{
    if ($method !== "GET") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($getData['place_id']) || empty($getData["year"])) {
        return ['valasz' => 'Hiányos bemenet', 'status' => 400];
    }

    $response = lekeres("SELECT MONTH(orders.orderd_at) as 'honap', SUM(orders.price) as 'average_income' FROM orders WHERE orders.place_id = " . $getData['place_id'] . " AND YEAR(orders.orderd_at) = " . $getData["year"] . " GROUP BY YEAR(orders.orderd_at), MONTH(orders.orderd_at)");
    return ['valasz' => $response];
}

/**
 * Kezeli a legjobban fogyó termékek lekérdezését.
 */
function handleLegjobbanFogyo(string $method, array $getData): ?array
{
    if ($method !== "GET") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($getData["year"]) || empty($getData["place_id"])) {
        return ['valasz' => 'Hiányos bemenet', 'status' => 400];
    }

    $year = intval($getData["year"]);
    $placeId = intval($getData["place_id"]);

    $query = "SELECT products.*, SUM(orderedproducts.quantity) AS 'vasarolt_mennyiseg'
              FROM orderedproducts
              INNER JOIN orders ON orderedproducts.order_id = orders.id
              INNER JOIN products ON orderedproducts.product_id = products.id
              WHERE YEAR(orders.orderd_at) = ?
              AND orders.place_id = ?
              GROUP BY orderedproducts.product_id
              ORDER BY vasarolt_mennyiseg DESC
              LIMIT 3";

    $params = [$year, $placeId,];

    $response = lekeres($query, "si", $params);

    if (empty($response)) {
        return ['valasz' => []];
    }

    if (!is_array($response)) {
        $response = [$response];
    }

    return ['valasz' => $response];
}

/**
 * Kezeli az aktuális értékelés lekérdezését.
 */
function handleCurrentRating(string $method, array $getData): ?array
{
    if ($method !== "GET") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($getData["place_id"])) {
        return ['valasz' => 'Hiányos bemenet', 'status' => 400];
    }

    $response = lekeres("SELECT AVG(ratings.rating) as 'current_rating' FROM ratings WHERE ratings.place_id = " . $getData["place_id"] . " AND ratings.date <= CURDATE();");
    return ['valasz' => $response];
}

/**
 * Kezeli a havi értékelések lekérdezését.
 */
function handleGetMonthlyRating(string $method, array $getData): ?array
{
    if ($method !== "GET") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($getData["place_id"]) || empty($getData["year"])) {
        return ['valasz' => 'Hiányos bemenet', 'status' => 400];
    }

    $response = lekeres("SELECT MONTH(ratings.date) as 'honap', AVG(ratings.rating) as 'atlagrating' FROM ratings WHERE ratings.place_id = " . $getData["place_id"] . " AND YEAR(ratings.date) = " . $getData["year"] . " GROUP BY YEAR(ratings.date), MONTH(ratings.date), ratings.date ORDER BY ratings.date");
    return ['valasz' => $response];
}

/**
 * Kezeli a csúcsidő lekérdezését.
 */
function handlePeakTime(string $method, array $getData): ?array
{
    if ($method !== "GET") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($getData["place_id"])) {
        return ['valasz' => 'Hiányos bemenet', 'status' => 400];
    }

    $response = lekeres("SELECT HOUR(orderd_at) as 'ora', SUM(id) as 'rendeles_szam' FROM orders WHERE orders.place_id=" . $getData["place_id"] . " GROUP BY HOUR(orderd_at) ORDER BY rendeles_szam DESC LIMIT 1");
    return ['valasz' => $response];
}

function handleEvLekerOrders(string $method, array $getData): ?array
{
    if ($method !== "GET") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($getData["place_id"])) {
        return ['valasz' => 'Hiányos bemenet', 'status' => 400];
    }

    $response = lekeres("SELECT DISTINCT YEAR(orders.orderd_at) as 'ev' FROM orders WHERE orders.place_id = {$getData['place_id']};");
    return ['valasz' => $response];
}

function handleEvLekerRatings(string $method, array $getData): ?array
{
    if ($method !== "GET") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($getData["place_id"])) {
        return ['valasz' => 'Hiányos bemenet', 'status' => 400];
    }

    $response = lekeres("SELECT DISTINCT YEAR(ratings.date) as 'ev' FROM ratings WHERE ratings.place_id = {$getData['place_id']};");
    return ['valasz' => $response];
}

/**
 * Kezeli a kategóriák lekérdezését.
 */
function handleKategoriak(string $method, array $getData): ?array
{
    if ($method !== "GET") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($getData['bufeId'])) {
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    return ['valasz' => kategoriakLekerese($getData['bufeId'])];
}

function handleKategoriaNev(string $method, array $getData): ?array
{
    if (empty($getData['id'])) {
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    $katnev = lekeres("SELECT categroy_name FROM `categories` WHERE `id` = ".$getData['id']." LIMIT 1");

    //return $katnev;
    return ['valasz' => $katnev];
}

/**
 * Kezeli a kategória módosítását.
 */
function handleKategoriaModositas(string $method, ?array $bodyData): ?array
{
    if ($method !== "POST") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($bodyData['katId']) || empty($bodyData['katName']) || empty($bodyData['katHely'])) {
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    return ["valasz" => kategoriaModosit($bodyData['katId'], $bodyData['katName'], $bodyData['katHely'])];
}

/**
 * Kezeli a kategória feltöltését.
 */
function handleKategoriaFeltoltes(string $method, ?array $bodyData): ?array
{
    if ($method !== "PUT") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (!isset($bodyData['bufeId']) || !isset($bodyData['katName']) || !isset($bodyData['katHely'])) {
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    return ['valasz' => kategoriaFeltolt($bodyData['bufeId'], $bodyData['katName'], $bodyData['katHely'])];
}

/**
 * Kezeli a kategória törlését.
 */
function handleKategoriaTorles(string $method, ?array $getData): ?array
{
    if ($method !== "DELETE") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($getData['katId'])) {
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    return ['valasz' => kategoriaTorol($getData['katId'])];
}

/**
 * Kezeli a büfé módosítását.
 */
function handleBufeModositas(string $method)
{
    if ($method !== "POST") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($_POST['id']) || empty($_POST['name']) || empty($_POST['desc']) || empty($_POST['phone'])) {
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    $valasz = bufeModositas($_POST['id'], $_POST['name'], $_POST['desc'], $_POST['phone']);

    $imgName = str_replace(' ', '_', $_POST['name']);
    $imgName = preg_replace('/[^A-Za-z0-9. - _]/', '', $imgName);
    $imgName = preg_replace('/  */', '-', $imgName);
    $prev_imgName = lekeres("SELECT image FROM places WHERE `id` = '{$_POST['id']}' LIMIT 1");

    if (isset($_FILES["img"])) {
        $file = $_FILES['img'];
        (new UploadApi())->upload($file["tmp_name"], [
            'public_id' => $imgName,
            'quality_analysis' => true,
            'colors' => true
        ]);

        if($valasz == "Sikertelen művelet!"){
            return ['valasz' => "Kép feltöltése sikeres!"];
        }
    }else
    {
        try {
            (new UploadApi())->rename($prev_imgName[0]["image"], $imgName);
            if($valasz == "Sikertelen művelet!"){
                return ['valasz' => "Sikeres átnevezés!"];
            }
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    return ['valasz' => $valasz];
}

/**
 * Kezeli a büfé feltöltését.
 */
function handleBufeFeltoltes(string $method, ?array $bodyData): ?array
{
    if ($method !== "POST") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($bodyData['adminUserId']) || empty($bodyData['bufeName']) || empty($bodyData['desc']) || empty($bodyData['phone']) || empty($bodyData['addressId']) || empty($bodyData['schoolId'])) {
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    if(isset($_FILES["image"])){
        $imgName = str_replace(' ', '_', $_POST['name']);
        $imgName = preg_replace('/[^A-Za-z0-9. - _]/', '', $imgName);
        $imgName = preg_replace('/  */', '-', $imgName);

        $file = $_FILES['image'];
        (new UploadApi())->upload($file["tmp_name"], [
            'public_id' => $imgName,
            'quality_analysis' => true,
            'colors' => true
        ]);

        return ['valasz' => bufeAdatokFeltoles($bodyData['adminUserId'], $bodyData['bufeName'], $bodyData['desc'], $bodyData['phone'], $bodyData['addressId'], $bodyData['schoolId'], $imgName)];
    }

    return ['valasz' => bufeAdatokFeltoles($bodyData['adminUserId'], $bodyData['bufeName'], $bodyData['desc'], $bodyData['phone'], $bodyData['addressId'], $bodyData['schoolId'])];
}

function handleUserBufe($method, $data)
{
    if ($method !== "GET") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($data['school_Id'])) {

        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    $buffetData = lekeres("SELECT places.id, places.name, places.description, places.image, places.phone, addresses.zip_code, addresses.city, addresses.address, schools.name as 'school' FROM places INNER JOIN addresses ON places.address_id = addresses.id INNER JOIN schools ON schools.id = places.school_id WHERE places.school_id = " . $data['school_Id'] . ";");

    if (is_array($buffetData)) {
        return ['valasz' => $buffetData];
    } else {
        return ['valasz' => $buffetData];
    }
}

function handleBejelentkezes($method, $data): ?array
{
    if ($method !== "GET") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($data['email'])) {

        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    $sql = "SELECT `id`,`passcode`, `name`, is_place_owner, school_id FROM `users` WHERE `email` = '{$data['email']}' AND isActive = 1";
    $userData = lekeres($sql);

    if (is_array($userData)) {
        session_id();
        $_SESSION["user_id"] = $userData[0]["id"];
        $_SESSION["is_admin"] = $userData[0]["is_place_owner"];
        $_SESSION["school_id"] = $userData[0]["school_id"];
        return ['valasz' => $userData];
    } else {
        return ['valasz' => 'Nincs ilyen e-mail cím'];
    }
}


function handleBejelentkezesCookie($method, $bodyData)
{
    if ($method !== "POST") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($bodyData['id']) || empty($bodyData['name'])) {
        
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    setcookie("user_id", $bodyData["id"], time() + (86400 * 30), "/", "localhost", true, false);
    setcookie("user_name", $bodyData["name"], time() + (86400 * 30), "/","localhost", true, false);

    return true;
}

function handleGetSessData($method)
{
    if ($method !== "GET") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if(!isset($_COOKIE["PHPSESSID"]))
    {
        return ['valasz' => 'Nincs bejelentkezve!', 'status' => 400];
    }

    return["valasz" => $_SESSION];
}

function handleKijelentkezes($method)
{
    if ($method !== "GET") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }
    if(!isset($_COOKIE["PHPSESSID"]))
    {
        return ['valasz' => 'Nincs bejelentkezve!', 'status' => 400];
    }
    setcookie("PHPSESSID", "" , 0, "/");
    $_SESSION["user_id"] = 0;
    $_SESSION["is_admin"] = 0;
    session_destroy();

    if(!empty($_SESSION["user_id"]) || !empty($_SESSION["is_admin"]))
    {
        return ['valasz' => 'Valami hiba történt', 'status' => 400];
    }
    
    return ["valasz" => "Kijelentkezve", "status" => 200];
}

/**
 * Kezeli a felhasználói adatok lekérdezését.
 */
function handleFelhasznaloAdatok(string $method, array $getData): ?array
{
    if ($method !== "GET") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($getData['userId'])) {
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    return ['valasz' => felhasznaloiAdatokLekerese($getData['userId'])];
}

/**
 * Kezeli a felhasználó regisztrációját.
 */
function handleFelhasznaloRegisztracio(string $method, ?array $bodyData): ?array
{
    if ($method !== "PUT") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($bodyData['email']) || empty($bodyData['passcode']) || empty($bodyData['name']) || empty($bodyData['address_id']) || empty($bodyData['phone']) || empty($bodyData['school'])) {
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    return ['valasz' => felhasznaloAdatokFeltoltese($bodyData['email'], $bodyData['passcode'], $bodyData['name'], $bodyData['address_id'], $bodyData['phone'], $bodyData['school'], NULL, 0)];
}

function handleEmailMegerosites(string $method, ?array $getData) : ?array{
    if($method !== "GET"){
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    return ["valasz" => felhasznaloEmailValidacio($getData["email"])];
}

/**
 * Kezeli a felhasználói adatok módosítását.
 */
function handleFelhasznaloAdatmodositas(string $method, ?array $bodyData): ?array
{
    if ($method !== "POST") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if ( empty($bodyData['userId']) || empty($bodyData['name']) || empty($bodyData['school'])) {
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    return ['valasz' => felhasznaloAdatokModositas($bodyData['userId'], $bodyData['name'], $bodyData['school'])];
}

function handleFelhasznaloInaktivalas(string $method, ?array $data): ?array
{
    if ($method !== "GET") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if ( empty($data['userId'])) {
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    return ['valasz' => valtoztatas("UPDATE `users` SET `isActive`='0' WHERE `id` = ?", 'i', [$data["userId"]])];
}
/**
 * Kezeli a jelszóváltoztatást.
 */
function handleJelszoValtoztat(string $method, ?array $bodyData): ?array
{
    if ($method !== "POST") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($bodyData["email"]) || empty($bodyData["passcode"])) {
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    return ['valasz' => jelszoValtoztatas($bodyData["email"], $bodyData["passcode"])];
}

/**
 * Kezeli az iskola feltöltését.
 */
function handleIskolaFeltoltes(string $method, ?array $bodyData): ?array
{
    if ($method !== "PUT") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($bodyData['school_name'])) {
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    return ['valasz' => iskolaFeltoltes($bodyData["school_name"])];
}

function handleIskolak($method)
{
    if ($method !== "GET") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    return ['valasz' => lekeres("SELECT * FROM `schools`")];
}

/**
 * Kezeli a cím feltöltését.
 */
function handleCimFeltoltes(string $method, ?array $bodyData): ?array
{
    if ($method !== "PUT") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($bodyData['zip']) || empty($bodyData['city']) || empty($bodyData['address'])) {
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    return ['valasz' => cimFeltoltes($bodyData['zip'], $bodyData['city'], $bodyData['address'])];
}

function handleCimAdatok(string $method, ?array $getData): ?array
{
    if ($method !== "GET") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($getData['Id'])) {
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    return ['valasz' => lekeres("SELECT * FROM `addresses` WHERE `id` = ?", "i", [$getData['Id']])];
}

function handleCimModositas(string $method, ?array $data): ?array
{
    if ($method !== "POST") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($data['Id']) || empty($data['zip']) || empty($data['city']) || empty($data['address'])) {
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    return ['valasz' => valtoztatas("UPDATE `addresses` SET `zip_code`=?,`city`=?,`address`=? WHERE `id` = ?", "issi", [$data['zip'], $data['city'],$data['address'], $data['Id']])];
}

/**
 * Kezeli a kínálat lekérdezését.
 */
function handleKinalatLekeres(string $method, array $getData): ?array
{
    if ($method !== "GET") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($getData['bufeId'])) {
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    $sql = "SELECT * FROM products WHERE place_id = ?;";
    $kinalat = lekeres($sql, 'i', [$getData['bufeId']]);

    return ['valasz' => $kinalat];
}

/**
 * Kezeli az admin főoldal lekérdezését.
 */
function handleAdminFo(string $method, ?array $getData): ?array
{
    if ($method !== "GET") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (!isset($getData["admin_id"])) {
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }

    $response = lekeres("SELECT places.id, places.name, places.description, places.image, places.phone, addresses.zip_code, addresses.city, addresses.address, schools.name as 'school' FROM places INNER JOIN addresses ON places.address_id = addresses.id INNER JOIN schools ON schools.id = places.school_id WHERE places.admin_user_id =" . $getData["admin_id"]);
    return ['valasz' => $response];
}

/**
 * Kezeli a büfé lekérdezését.
 */
function handleBufe(string $method, ?array $bodyData): ?array
{
    if ($method !== "POST") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (!isset($bodyData["place_id"])) {
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }

    $response = lekeres("SELECT * FROM places WHERE places.id = " . $bodyData['place_id']);
    return ['valasz' => $response];
}

/**
 * Kezeli a büfé rendelések lekérdezését.
 */
function handleBufeRendelesek(string $method, ?array $getData): ?array
{
    if ($method !== "GET") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (!isset($getData["place_id"])) {
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }

    $orderadatok = lekeres("SELECT * FROM orders WHERE orders.place_id =" . $getData["place_id"] . " ORDER BY `expected_pickup_time`");
    for ($i = 0; $i < count($orderadatok); $i++) {
        $orderadatok[$i]["products"] = lekeres("SELECT products.id, products.price, products.name, products.category_id, products.description, products.allergens, products.image, products.is_avaliable, orderedproducts.quantity FROM products INNER JOIN orderedproducts ON products.id = orderedproducts.product_id INNER JOIN orders ON orders.id = orderedproducts.order_id WHERE orders.id = {$orderadatok[$i]['id']} ");
        $orderadatok[$i]["user"] = lekeres("SELECT users.id, users.name, users.email, users.push_notification_key FROM users INNER JOIN orders ON orders.user_id = users.id WHERE orders.id ={$orderadatok[$i]['id']}");
    }
    $response = ["rendelesek" => $orderadatok];
    return ['valasz' => $response];
}

function handleRendelesStatusz(string $method, ?array $bodyData): ?array
{
    if ($method !== "POST") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (!isset($bodyData['rendeles_id']) || !isset($bodyData['status'])) {
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }

    $eredmeny = valtoztatas("UPDATE `orders` SET `status`= {$bodyData['status']} WHERE id = {$bodyData['rendeles_id']}");

    return ['valasz' => $eredmeny];
}

/**
 * Kezeli a termék felvitelt.
 */
function handleTermekFelv(string $method): ?array
{
    if ($method !== "POST") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($_POST["place"]) || empty($_POST["category"]) || empty($_POST['name']) || empty($_POST['description']) || empty($_POST['allergens']) || empty($_POST['price'])) {
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }


    $availability = $_POST['is_avaliable'] ? 1 : 0;

    if (isset($_FILES["img"])) {
        $imgName = $_POST["place"]."_product_".str_replace(' ', '_', $_POST["name"]);
        $imgName = preg_replace('/[^A-Za-z0-9. - _]/', '', $imgName);
        $imgName = preg_replace('/  */', '-', $imgName);
        $file = $_FILES['img'];
        (new UploadApi())->upload($file["tmp_name"], [
            'public_id' => $imgName,
            'quality_analysis' => true,
            'colors' => true
        ]);
        $response = valtoztatas("INSERT INTO products( place_id,category_id,image, name, description, allergens, is_avaliable, price, deleted) VALUES ({$_POST['place']},{$_POST['category']},'{$imgName}','{$_POST['name']}','{$_POST['description']}','{$_POST['allergens']}',{$availability},{$_POST['price']}, 0)");
        if($response == "Sikertelen művelet!"){
            return ['valasz' => "Kép feltöltése sikeres!"];
        }
    }else{
        $response = valtoztatas("INSERT INTO products( place_id,category_id, name, description, allergens, is_avaliable, price, deleted) VALUES ({$_POST['place']},{$_POST['category']},'{$_POST['name']}','{$_POST['description']}','{$_POST['allergens']}',{$availability},{$_POST['price']}, 0)");
    }


    return ['valasz' => $response];
}

/**
 * Kezeli a termékek lekérdezését.
 */
function handleTermekek(string $method, ?array $getData): ?array
{
    if ($method !== "GET") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (!isset($getData['place_id'])) {
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }

    $response = lekeres("SELECT id, category_id, image, name, description, allergens, is_avaliable, price FROM products WHERE place_id = " . $getData['place_id'] . " AND deleted=0");
    return ['valasz' => $response];
}

/**
 * Kezeli a termék módosítást.
 */
function handleTermekValt(string $method, ?array $bodyData): ?array
{
    if ($method !== "POST") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (!isset($_POST['id']) || !isset($_POST['category_id']) || !isset($_POST['name']) || !isset($_POST['description']) || !isset($_POST['allergens']) || !isset($_POST['is_avaliable']) || !isset($_POST['price']) || !isset($_POST['place_id'])) {
        return ['valasz' => "Hiányos adat", 'status' => 400];
    }
        
    $imgName = $_POST["place_id"]."_product_".str_replace(' ', '_', $_POST["name"]);
    $imgName = preg_replace('/[^A-Za-z0-9. - _]/', '', $imgName);
    $imgName = preg_replace('/  */', '-', $imgName);
    $prev_imgName = lekeres("SELECT image FROM products WHERE `id` = '{$_POST['id']}' LIMIT 1");

    $response = valtoztatas("UPDATE products SET category_id={$_POST['category_id']},image='{$imgName}',name='{$_POST['name']}',description='{$_POST['description']}',allergens='{$_POST['allergens']}',is_avaliable={$_POST['is_avaliable']},price= {$_POST['price']} WHERE `id` = '{$_POST['id']}' && `deleted` = '0'");

    if (isset($_FILES["image"])) {
        $file = $_FILES['image'];
        (new UploadApi())->upload($file["tmp_name"], [
            'public_id' => $imgName,
            'quality_analysis' => true,
            'colors' => true,
        ]);

        if($response == "Sikertelen művelet!"){
            return ['valasz' => "Kép feltöltése sikeres!"];
        }
    }
    else
    {
        (new UploadApi())->rename($prev_imgName[0]["image"], $imgName);
    }
    

    return ['valasz' => $response];
}

/**
 * Kezeli a termék törlést.
 */
function handleTermekDel(string $method, ?array $bodyData): ?array
{
    if ($method !== "DELETE") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($bodyData["id"])) {
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }

    $response = valtoztatas("UPDATE products SET products.deleted=1 WHERE id={$bodyData["id"]}");
    return ['valasz' => $response];
}

/**
 * Kezeli a rendelést.
 */
function handleRendel(string $method, ?array $bodyData): ?array
{
    if ($method !== "POST") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (!isset($bodyData["user_id"]) || !isset($bodyData["place_id"]) || !isset($bodyData["status"]) || !isset($bodyData["price"]) || !isset($bodyData["payment_method"]) || !isset($bodyData["products"])) {
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }

    $response = valtoztatas("INSERT INTO orders(user_id, place_id, status, price, payment_method, orderd_at, expected_pickup_time) VALUES ({$bodyData['user_id']},{$bodyData['place_id']},{$bodyData['status']},{$bodyData['price']},{$bodyData['payment_method']},CURRENT_TIMESTAMP(),DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 7 MINUTE))");
    foreach($bodyData["products"] as $p)
    {
        valtoztatas("INSERT INTO `orderedproducts`(`order_id`, `quantity`, `product_id`) VALUES ({$response},{$p['quantity']},{$p['id']})");
    }
    
    return ['valasz' => $response];
}

/**
 * Kezeli a felhasználó rendeléseinek lekérdezését.
 */
function handleUserRendelesek(string $method, ?array $getData): ?array
{
    if ($method !== "GET") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (!isset($getData["userId"])) {
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }

    $orderadatok = lekeres("SELECT * FROM orders WHERE orders.user_id =" . $getData['userId'] . " ORDER BY `orderd_at` DESC");
    for ($i = 0; $i < count($orderadatok); $i++) {
        $orderadatok[$i]["products"] = lekeres("SELECT products.id, products.price, products.name, products.category_id, products.description, products.allergens, products.image, products.is_avaliable, orderedproducts.quantity FROM products INNER JOIN orderedproducts ON products.id = orderedproducts.product_id INNER JOIN orders ON orders.id = orderedproducts.order_id WHERE orders.id = {$orderadatok[$i]['id']} ");
        $orderadatok[$i]["place"] = lekeres("SELECT * FROM places INNER JOIN orders ON orders.place_id = places.id WHERE orders.id ={$orderadatok[$i]['id']}");
    }
    $response = ["rendelesek" => $orderadatok];
    return ['valasz' => $response];
}

function handleKosar(string $method, ?array $getData)
{
    if ($method !== "GET") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($getData["user_id"]) || empty($getData["place_id"])) {
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }

    $response = lekeres("SELECT cart.id as 'cid', cart.quantity, products.id, products.name, products.price FROM `cart` INNER JOIN products ON products.id = cart.product_id WHERE cart.user_id = {$getData["user_id"]} AND cart.place_id = {$getData["place_id"]};");
    return ['valasz' => $response];
}



/**
 * Kezeli a kosárba helyezést.
 */
function handleKosarba(string $method, ?array $bodyData): ?array
{
    if ($method !== "POST") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($bodyData["user_id"]) || empty($bodyData["place_id"]) || empty($bodyData["quantity"]) || empty($bodyData["product_id"])) {
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }

    $check = lekeres("SELECT * FROM `cart` WHERE cart.user_id = {$bodyData['user_id']} AND cart.place_id = {$bodyData['place_id']} AND cart.product_id = {$bodyData['product_id']}");
    if(is_array($check))
    {
        $newQuantity = (int)$check[0]["quantity"] + (int)$bodyData["quantity"];
        var_dump($newQuantity);
        $response = valtoztatas("UPDATE `cart` SET `quantity` = {$newQuantity}  WHERE cart.user_id = {$bodyData['user_id']} AND cart.place_id = {$bodyData['place_id']} AND cart.product_id = {$bodyData['product_id']}");
    }
    else
    {
        $response = valtoztatas("INSERT INTO cart( user_id, place_id, quantity, product_id) VALUES ('{$bodyData["user_id"]}','{$bodyData["place_id"]}','{$bodyData["quantity"]}','{$bodyData["product_id"]}')");
    }
    return ['valasz' => $response];
}

function handleKosarTargyModosit(string $method, ?array $bodyData): ?array
{
    if($method !== "POST")
    {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }
    
    if(empty($bodyData['id']) || empty($bodyData["quantity"]))
    {
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }

    $response = valtoztatas("UPDATE `cart` SET `quantity` = {$bodyData["quantity"]}  WHERE cart.id = {$bodyData['id']}");
    return ["valasz" => $response];
}


function handleKosarTargyTorles(string $method, ?array $getData)
{
    if($method !== "DELETE")
    {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }
    
    if(empty($getData['id']))
    {
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }

    $response = valtoztatas("DELETE FROM `cart` WHERE cart.id = {$getData['id']}");
    return ["valasz" => $response];
}

function handleKosarTorles(string $method, ?array $getData)
{
    if($method !== "DELETE")
    {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if(empty($getData["user_id"]) || empty($getData["place_id"])){
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }

    $response = valtoztatas("DELETE FROM `cart` WHERE cart.user_id = {$getData['user_id']} AND cart.place_id = {$getData['place_id']}");
    return ["valasz" => $response];
}

function handleRating(string $method, ?array $bodyData){
    if($method != "POST"){
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if(empty($bodyData["user_id"]) || empty($bodyData["place_id"]) || empty($bodyData["order_id"]) || empty($bodyData["rating"])){
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }

    $response = valtoztatas("INSERT INTO `ratings`(`user_id`, `place_id`,`order_id`, `rating`, `comment`, `date`, `status`) VALUES ('{$bodyData["user_id"]}','{$bodyData["place_id"]}','{$bodyData["order_id"]}','{$bodyData["rating"]}','{$bodyData["comment"]}',NOW(),1)");
    return ['valasz' => $response];
}

function handleErtekelesek(string $method, ?array $getData){
    if($method != "GET"){
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if(empty($getData["placeId"])){
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }

    $resp = lekeres("SELECT *, users.name FROM `ratings` INNER JOIN users ON ratings.user_id = users.id WHERE ratings.place_id = " . $getData["placeId"]);
    return ['valasz' => $resp];
}

//Függvények

//Adatbázis kommunikáció

function lekeres($muvelet, $tipus = null, $adatok = null)
{
    $db = new mysqli('localhost', 'root', '', 'bufego');

    if ($db->connect_errno != 0) {
        return $db->connect_error;
    }

    if (!is_null($tipus) && !is_null($adatok)) {
        if (strlen($tipus) != count($adatok)) {
            return 'Nem megfelelő számú adat vagy típús!';
        }
        $stmt = $db->prepare($muvelet);
        $stmt->bind_param($tipus, ...$adatok);
        $stmt->execute();
        $eredmeny = $stmt->get_result();
    } else {
        $eredmeny = $db->query($muvelet);
    }

    if ($db->errno != 0) {
        return $db->error;
    }

    if ($eredmeny->num_rows == 0) {
        return 'Nincsenek találatok!';
    }

    $eremdneyek = $eredmeny->fetch_all(MYSQLI_ASSOC);
    return $eremdneyek;
}

function valtoztatas($muvelet, $tipus = null, $adatok = null)
{
    $db = new mysqli('localhost', 'root', '', 'bufego');

    if ($db->connect_errno != 0) {
        error_log("MySQL csatlakozási hiba: " . $db->connect_error);
        return "Adatbázis hiba!";
    }

    if (!is_null($tipus) && !is_null($adatok)) {
        if (strlen($tipus) != count($adatok)) {
            return "Nem megfelelő számú adat!";
        }
        $stmt = $db->prepare($muvelet);
        if (!$stmt) {
            error_log("SQL előkészítési hiba: " . $db->error);
            return "SQL hiba!";
        }

        $stmt->bind_param($tipus, ...$adatok);
        if (!$stmt->execute()) {
            error_log("SQL végrehajtási hiba: " . $stmt->error);
            return "Sikertelen SQL végrehajtás!";
        }
    } else {
        if (!$db->query($muvelet)) {
            error_log("SQL lekérdezési hiba: " . $db->error);
            return "SQL hiba!";
        }
    }

    if ($db->affected_rows == 0) {
        return "Sikertelen művelet!";
    }

    if (!empty($db->insert_id)) {
        return $db->insert_id;
    }

    return "Sikeres művelet!";
}



// Büfé adatok

function bufeAdatokFeltoles($adminUserId, $bufeName, $desc, $phone, $addressId, $schoolId, $imgName = null, $payment = false, $avaliable = false)
{
    $query = "INSERT INTO `places`(`admin_user_id`, `name`, `description`, `phone`, `image`, `address_id`, `school_id`, `payment_on_collect_enabled`, `is_avaliable`) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";

    $bufe = valtoztatas($query, "issssiiii", [$adminUserId, $bufeName, $desc, $phone, $imgName, $addressId, $schoolId, $payment, $avaliable]);

    return json_encode(['valasz' => $bufe], JSON_UNESCAPED_UNICODE);
}

function bufeModositas($bufeId, $bufeName, $desc, $phone, $imgName = null, $payment = false, $avaliable = false)
{
    $query = "UPDATE `places` SET `name`=?,`description`=?,`phone`=?,`image`=?,`payment_on_collect_enabled`=?,`is_avaliable`=? WHERE `id` = ?";
    if($imgName == null){
        $query = "UPDATE `places` SET `name`=?,`description`=?,`phone`=?,`payment_on_collect_enabled`=?,`is_avaliable`=? WHERE `id` = ?";
    }

    $bufe = valtoztatas($query, "sssiii", [$bufeName, $desc, $phone, $payment, $avaliable, $bufeId]);

    return $bufe;
}

//Felhasználó adatok

function felhasznaloiAdatokLekerese($userId)
{
    $query = "SELECT * FROM `users` WHERE `id` = {$userId};";
    $adatok = lekeres($query, "bufego");

    if (is_array($adatok)) {
        return $adatok;
    } else {
        return json_encode(['valasz' => $adatok], JSON_UNESCAPED_UNICODE);
    }
}

function felhasznaloAdatokModositas($userId, $name, $school_id)
{
    $query = "UPDATE `users` SET `name`='{$name}',`school_id`='{$school_id}' WHERE `id` = {$userId};";

    $felhasznalo = valtoztatas($query, 'bufego');

    return $felhasznalo;
}

function felhasznaloAdatokFeltoltese($email, $passcode, $name, $address_id, $phone, $school_id, $pushNotificationKey, $isAdmmin)
{
    $query = "INSERT INTO `users`(`id`, `email`, `passcode`, `name`, `address_id`, `phone`, `school_id`, `registered_on`, `last_login`, `push_notification_key`, `is_place_owner`, `isActive`) VALUES (NULL,'{$email}','{$passcode}','{$name}','{$address_id}','{$phone}','{$school_id}', CURRENT_TIMESTAMP,NULL,'{$pushNotificationKey}','{$isAdmmin}', 0);";

    $felhasznalo = valtoztatas($query, 'bufego');

    return $felhasznalo;
}

function felhasznaloEmailValidacio($email){
    $query = "UPDATE `users` SET `isActive`=1 WHERE `email` = ?";
    header("Location: http://localhost/");
    return valtoztatas($query, 'i', [$email]);
}

function jelszoValtoztatas($email, $passcode)
{
    $query = "UPDATE `users` SET `passcode` = '{$passcode}' WHERE `email` = '{$email}';";

    $felhasznalo = valtoztatas($query, 'bufego');

    return $felhasznalo;
}

function cimFeltoltes($zip, $city, $address)
{
    $query = "INSERT INTO `addresses`(`id`, `zip_code`, `city`, `address`) VALUES (NULL,'{$zip}','{$city}','{$address}');";

    $cim = valtoztatas($query, 'bufego');

    return $cim;
}

function iskolaFeltoltes($name)
{
    $query = "INSERT INTO `schools`(`id`, `name`) VALUES (NULL,'{$name}');";

    $iskola = valtoztatas($query, 'bufego');

    return json_encode(['valasz' => $iskola], JSON_UNESCAPED_UNICODE);
}

//Kategóriák

function kategoriakLekerese($bufeId)
{
    $query = "SELECT * FROM `categories` WHERE `place_id` = {$bufeId} ORDER BY category_placement;";

    $kategoriak = lekeres($query, 'bufego');

    if (is_array($kategoriak)) {
        return $kategoriak;
    } else {
        return json_encode(['valasz' => $kategoriak], JSON_UNESCAPED_UNICODE);
    }
}

function kategoriaModosit($katId, $katName, $katHely)
{
    $query = "UPDATE `categories` SET `categroy_name`='{$katName}',`category_placement`={$katHely} WHERE id = {$katId};";

    $kategoriak = valtoztatas($query);

    return json_encode($kategoriak, JSON_UNESCAPED_UNICODE);
}

function kategoriaFeltolt($bufeId, $katName, $katHely)
{
    $query = "INSERT INTO `categories`(`place_id`, `categroy_name`, deleted, category_placement) VALUES (?,?,0,?);";

    $kategoriak = valtoztatas($query, 'isi', [$bufeId, $katName, $katHely]);

    return $kategoriak;
}

function kategoriaTorol($katId)
{
    $check = lekeres("SELECT * FROM categories WHERE id = ?;", "i", [$katId]);
    if (is_array($check)) {
        $query = "UPDATE `categories` SET `deleted`='1' WHERE `id` = ? ";
        $kategoriak = valtoztatas($query, 'i', [$katId]);
        return $kategoriak;
    } else {
        return "Nincs ilyen kategória!";
    }
}
