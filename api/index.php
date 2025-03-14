<?php

require __DIR__ . '/vendor/autoload.php';

use Cloudinary\Api\Upload\UploadApi;
use Cloudinary\Configuration\Configuration;

Configuration::instance('cloudinary://289199581986461:U8LGEe_Le_lEALtasJA1sii9FdI@duerxasjk?secure=true');

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$url = explode('/', $_SERVER['REQUEST_URI']);
$endpoint = mb_strtolower(explode('?', end($url))[0]);
$method = $_SERVER["REQUEST_METHOD"];
$bodyData = json_decode(file_get_contents('php://input'), true);
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
        'kategoriak' => handleKategoriak($method, $getData),
        'kategoriamodositas' => handleKategoriaModositas($method, $bodyData),
        'kategoriafeltoltes' => handleKategoriaFeltoltes($method, $bodyData),
        'kategoriatorles' => handleKategoriaTorles($method, $getData),
        'bufemodositas' => handleBufeModositas($method),
        'bufefeltoltes' => handleBufeFeltoltes($method, $bodyData),
        'userbufe' => handleUserBufe($method, $getData),
        'bejelentkezes' => handleBejelentkezes($method, $getData),
        'felhasznaloadatok' => handleFelhasznaloAdatok($method, $getData),
        'felhasznaloregisztracio' => handleFelhasznaloRegisztracio($method, $bodyData),
        'felhasznaloadatmodositas' => handleFelhasznaloAdatmodositas($method, $bodyData),
        'jelszovaltoztat' => handleJelszoValtoztat($method, $bodyData),
        'iskolafeltoltes' => handleIskolaFeltoltes($method, $bodyData),
        'iskolak' => handleIskolak($method),
        'cimfeltoltes' => handleCimFeltoltes($method, $bodyData),
        'kinalatlekeres' => handleKinalatLekeres($method, $getData),
        'admin_fo' => handleAdminFo($method, $getData),
        'bufe' => handleBufe($method, $bodyData),
        'bufe_rendelesek' => handleBufeRendelesek($method, $getData),
        'bufe_rendelesstatusz' => handleRendelesStatusz($method, $bodyData),
        'termek_felv' => handleTermekFelv($method, $bodyData),
        'termekek' => handleTermekek($method, $getData),
        'termek_valt' => handleTermekValt($method, $bodyData),
        'termek_del' => handleTermekDel($method, $bodyData),
        'rendel' => handleRendel($method, $bodyData),
        'sajatrendelesek' => handleUserRendelesek($method, $getData),
        'kosarba' => handleKosarba($method, $bodyData),
        'rating' => handleRating($method, $bodyData),
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

    if (empty($getData["year"]) || empty($getData["month"]) || empty($getData["place_id"])) {
        return ['valasz' => 'Hiányos bemenet', 'status' => 400];
    }

    // Biztonságosabb paraméterkezelés a SQL injection elkerülése érdekében
    $year = intval($getData["year"]);
    $month = intval($getData["month"]);
    $placeId = intval($getData["place_id"]);

    // SQL injection elleni védelem + pontosabb lekérdezés a legtöbbet eladott termékre
    $query = "SELECT products.*, SUM(orderedproducts.quantity) AS 'vasarolt_mennyiseg'
              FROM orderedproducts
              INNER JOIN orders ON orderedproducts.order_id = orders.id
              INNER JOIN products ON orderedproducts.product_id = products.id
              WHERE YEAR(orders.orderd_at) = ?
              AND MONTH(orders.orderd_at) = ?
              AND orders.place_id = ?
              GROUP BY orderedproducts.product_id
              ORDER BY vasarolt_mennyiseg DESC
              LIMIT 1";

    $params = [$year, $month, $placeId,];

    $response = lekeres($query, "ssi", $params);

    // Ha nincs találat, üres tömböt adjunk vissza
    if (empty($response)) {
        return ['valasz' => []];
    }
    // Tömbbe csomagolás, ha a lekeres függvény nem tömböt ad vissza, hanem egyetlen sort.
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

    $response = lekeres("SELECT MONTH(ratings.date) as 'honap', AVG(ratings.rating) as 'atlagrating' FROM ratings WHERE ratings.place_id = " . $getData["place_id"] . " AND YEAR(ratings.date) = " . $getData["year"] . " GROUP BY YEAR(ratings.date), MONTH(ratings.date) ORDER BY ratings.date");
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

    $response = lekeres("SELECT HOUR(orderd_at) as 'ora', SUM(id) as 'rendeles_szam' FROM orders WHERE orders.place_id=" . $getData["place_id"] . " GROUP BY HOUR(orderd_at) ORDER BY rendeles_szam DESC");
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

    if (empty($bodyData['bufeId']) || empty($bodyData['katName'])) {
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    return ['valasz' => kategoriaFeltolt($bodyData['bufeId'], $bodyData['katName'])];
}

/**
 * Kezeli a kategória törlését.
 */
function handleKategoriaTorles(string $method, ?array $bodyData): ?array
{
    if ($method !== "DELETE") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($bodyData['katId'])) {
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    return ['valasz' => kategoriaTorol($bodyData['katId'])];
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

    if (isset($_FILES["img"])) {
        $imgName = str_replace(' ', '_', $_POST["name"]);
    }

    $valasz = bufeModositas($_POST['id'], $_POST['name'], $_POST['desc'], $_POST['phone'], $imgName);

    if (isset($_FILES["img"])) {
        $file = $_FILES['img'];
        (new UploadApi())->upload($file["tmp_name"], [
            'public_id' => $imgName,
            'quality_analysis' => true,
            'colors' => true
        ]);

        if($valasz = "Sikertelen művelet!"){
            return ['valasz' => "Kép feltöltése sikeres!"];
        }
    }

    return ['valasz' => $valasz];
}

/**
 * Kezeli a büfé feltöltését.
 */
function handleBufeFeltoltes(string $method, ?array $bodyData): ?array
{
    if ($method !== "PUT") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($bodyData['adminUserId']) || empty($bodyData['bufeName']) || empty($bodyData['desc']) || empty($bodyData['phone']) || empty($bodyData['addressId']) || empty($bodyData['schoolId'])) {
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
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

    $sql = "SELECT `id`,`passcode` FROM `users` WHERE `email` = '{$data['email']}'";
    $userData = lekeres($sql);

    if (is_array($userData)) {
        return ['valasz' => $userData];
    } else {
        return ['valasz' => 'Nincs ilyen e-mail cím'];
    }
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

/**
 * Kezeli a felhasználói adatok módosítását.
 */
function handleFelhasznaloAdatmodositas(string $method, ?array $bodyData): ?array
{
    if ($method !== "POST") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($bodyData['email']) || empty($bodyData['userId']) || empty($bodyData['name']) || empty($bodyData['address_id']) || empty($bodyData['phone']) || empty($bodyData['school'])) {
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    return ['valasz' => felhasznaloAdatokModositas($bodyData['userId'], $bodyData['email'], $bodyData['name'], $bodyData['address_id'], $bodyData['phone'], $bodyData['school'], NULL, 0)];
}

/**
 * Kezeli a jelszóváltoztatást.
 */
function handleJelszoValtoztat(string $method, ?array $bodyData): ?array
{
    if ($method !== "POST") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($bodyData["userId"]) || empty($bodyData["passcode"])) {
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    return ['valasz' => jelszoValtoztatas($bodyData["userId"], $bodyData["passcode"])];
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
function handleTermekFelv(string $method, ?array $bodyData): ?array
{
    if ($method !== "PUT") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (!isset($bodyData["place"]) || !isset($bodyData["category"]) || !isset($bodyData['img']) || !isset($bodyData['name']) || !isset($bodyData['description']) || !isset($bodyData['allergens']) || !isset($bodyData['is_avaliable']) || !isset($bodyData['price'])) {
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }

    $response = valtoztatas("INSERT INTO products( place_id,category_id, image, name, description, allergens, is_avaliable, price) VALUES ({$bodyData['place']},{$bodyData['category']},'{$bodyData['img']}','{$bodyData['name']}','{$bodyData['description']}','{$bodyData['allergens']}',{$bodyData['is_avaliable']},{$bodyData['price']})");
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

    $response = lekeres("SELECT id, category_id, image, name, description, allergens, is_avaliable, price FROM products WHERE place_id = " . $getData['place_id']);
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

    if (!isset($bodyData['id']) || !isset($bodyData['category_id']) || !isset($bodyData['image']) || !isset($bodyData['name']) || !isset($bodyData['description']) || !isset($bodyData['allergens']) || !isset($bodyData['is_avaliable']) || !isset($bodyData['price'])) {
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }

    $response = valtoztatas("UPDATE products SET category_id={$bodyData['category_id']},image={$bodyData['image']},name={$bodyData['name']},description={$bodyData['description']},allergens={$bodyData['allergens']},is_avaliable={$bodyData['is_avaliable']},price= {$bodyData['price']} WHERE id = {$bodyData['id']}");

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

    if (!isset($bodyData["id"])) {
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }

    $response = valtoztatas("DELETE FROM products WHERE id = {$bodyData['id']}");
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

    if (!isset($bodyData["user_id"]) || !isset($bodyData["place_id"]) || !isset($bodyData["status"]) || !isset($bodyData["price"]) || !isset($bodyData["payment_method"]) || !isset($bodyData["orderd_at"]) || !isset($bodyData["expected_pickup_time"]) || !isset($bodyData["products"])) {
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }

    $response = valtoztatas("INSERT INTO orders(user_id, place_id, status, price, payment_method, orderd_at, expected_pickup_time) VALUES ({$bodyData['user_id']},{$bodyData['place_id']},{$bodyData['status']},{$bodyData['price']},{$bodyData['payment_method']},{$bodyData['orderd_at']},{$bodyData['expected_pickup_time']})");

    /*
    foreach($bodyData["products"] as $p)
    {
        valtoztatas("INSERT INTO `orderedproducts`(`order_id`, `quantity`, `product_id`) VALUES ({$p[]},,)");
    }*/

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

    $response = valtoztatas("INSERT INTO cart( user_id, place_id, quantity, product_id) VALUES ('{$bodyData["user_id"]}','{$bodyData["place_id"]}','{$bodyData["quantity"]}','{$bodyData["product_id"]}')");
    return ['valasz' => $response];
}

function handleRating(string $method, ?array $bodyData){
    if($method != "POST"){
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if(empty($bodyData["user_id"]) || empty($bodyData["place_id"]) || empty($bodyData["rating"]) || empty($bodyData["comment"])){
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }

    $response = valtoztatas("INSERT INTO `ratings`(`user_id`, `place_id`, `rating`, `comment`, `date`, `status`) VALUES ('{$bodyData["user_id"]}','{$bodyData["place_id"]}','{$bodyData["rating"]}','{$bodyData["comment"]}',NOW(),1)");
    return ['valasz' => $response];
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
        return $db->connect_error;
    }

    if (!is_null($tipus) && !is_null($adatok)) {
        if (strlen($tipus) != count($adatok)) {
            return 'Nem megfelelő számú adat vagy típús!';
        }
        $stmt = $db->prepare($muvelet);
        $stmt->bind_param($tipus, ...$adatok);
        $stmt->execute();
    } else {
        $db->query($muvelet);
    }

    if ($db->errno != 0) {
        return $db->error;
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

function bufeAdatokFeltoles($adminUserId, $bufeName, $desc, $phone, $addressId, $schoolId, $payment = false, $avaliable = false)
{
    $query = "INSERT INTO `places`(`admin_user_id`, `name`, `description`, `phone`, `address_id`, `school_id`, `payment_on_collect_enabled`, `is_avaliable`) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?);";

    $bufe = valtoztatas($query, "isssiiii", [$adminUserId, $bufeName, $desc, $phone, $addressId, $schoolId, $payment, $avaliable]);

    return json_encode(['valasz' => $bufe], JSON_UNESCAPED_UNICODE);
}

function bufeModositas($bufeId, $bufeName, $desc, $phone, $imgName = null, $payment = false, $avaliable = false)
{
    $query = "UPDATE `places` SET `name`=?,`description`=?,`phone`=?,`image`=?,`payment_on_collect_enabled`=?,`is_avaliable`=? WHERE `id` = ?";

    $bufe = valtoztatas($query, "ssssiii", [$bufeName, $desc, $phone, $imgName, $payment, $avaliable, $bufeId]);

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

function felhasznaloAdatokModositas($userId, $email, $name, $address_id, $phone, $school_id, $pushNotificationKey, $isAdmmin)
{
    $query = "UPDATE `users` SET `email`='{$email}', `name`='{$name}',`address_id`='{$address_id}',`phone`='{$phone}',`school_id`='{$school_id}' WHERE `id` = {$userId};";

    $felhasznalo = valtoztatas($query, 'bufego');

    return $felhasznalo;
}

function felhasznaloAdatokFeltoltese($email, $passcode, $name, $address_id, $phone, $school_id, $pushNotificationKey, $isAdmmin)
{
    $query = "INSERT INTO `users`(`id`, `email`, `passcode`, `name`, `address_id`, `phone`, `school_id`, `registered_on`, `last_login`, `push_notification_key`, `is_place_owner`) VALUES (NULL,'{$email}','{$passcode}','{$name}','{$address_id}','{$phone}','{$school_id}', CURRENT_TIMESTAMP,NULL,'{$pushNotificationKey}','{$isAdmmin}');";

    $felhasznalo = valtoztatas($query, 'bufego');

    return $felhasznalo;
}

function jelszoValtoztatas($userId, $passcode)
{
    $query = "UPDATE `users` SET `passcode` = '{$passcode}' WHERE `id` = {$userId};";

    $felhasznalo = valtoztatas($query, 'bufego');

    return $felhasznalo;
}

function cimFeltoltes($zip, $city, $address)
{
    $query = "INSERT INTO `addresses`(`id`, `zip_code`, `city`, `address`) VALUES (NULL,'{$zip}','{$city}','{$address}');";

    $cim = valtoztatas($query, 'bufego');

    return json_encode(['valasz' => $cim], JSON_UNESCAPED_UNICODE);
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

function kategoriaFeltolt($bufeId, $katName)
{
    $query = "INSERT INTO `categories`(`place_id`, `categroy_name`) VALUES (?,?);";

    $kategoriak = valtoztatas($query, 'is', [$bufeId, $katName]);

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
