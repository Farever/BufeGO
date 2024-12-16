<?php
header('Access-Control-Allow-Origin: http://localhost:5173');

$url = explode('/', $_SERVER['REQUEST_URI']);
$endpoint = mb_strtolower(explode('?', end($url))[0]);
$method = $_SERVER["REQUEST_METHOD"];
$bodyData = ($method === "POST") ? json_decode(file_get_contents('php://input'), true) : null;
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
    $result = match ($endpoint) {
        'stat_monthly_income' => handleStatMonthlyIncome($method, $getData),
        'legjobbanfogyo' => handleLegjobbanFogyo($method, $getData),
        'currentrating' => handleCurrentRating($method, $getData),
        'getmonthlyrating' => handleGetMonthlyRating($method, $getData),
        'peak_time' => handlePeakTime($method, $getData),
        'kategoriak' => handleKategoriak($method, $getData),
        'kategoriamodositas' => handleKategoriaModositas($method, $bodyData),
        'kategoriafeltoltes' => handleKategoriaFeltoltes($method, $bodyData),
        'kategoriatorles' => handleKategoriaTorles($method, $bodyData),
        'bufemodositas' => handleBufeModositas($method, $bodyData),
        'bufefeltoltes' => handleBufeFeltoltes($method, $bodyData),
        'felhasznaloadatok' => handleFelhasznaloAdatok($method, $getData),
        'felhasznaloregisztracio' => handleFelhasznaloRegisztracio($method, $bodyData),
        'felhasznaloadatmodositas' => handleFelhasznaloAdatmodositas($method, $bodyData),
        'jelszovaltoztat' => handleJelszoValtoztat($method, $bodyData),
        'iskolafeltoltes' => handleIskolaFeltoltes($method, $bodyData),
        'iskolak' => handleIskolak($method),
        'cimfeltoltes' => handleCimFeltoltes($method, $bodyData),
        'kinalatlekeres' => handleKinalatLekeres($method, $getData),
        'admin_fo' => handleAdminFo($method, $bodyData),
        'bufe' => handleBufe($method, $bodyData),
        'bufe_rendelesek' => handleBufeRendelesek($method, $bodyData),
        'termek_felv' => handleTermekFelv($method, $bodyData),
        'termekek' => handleTermekek($method, $bodyData),
        'termek_valt' => handleTermekValt($method, $bodyData),
        'termek_del' => handleTermekDel($method, $bodyData),
        'rendel' => handleRendel($method, $bodyData),
        'user_remdelesek' => handleUserRendelesek($method, $bodyData),
        'kosarba' => handleKosarba($method, $bodyData),
        default => ['valasz' => 'Hibás url', 'status' => 400],
    };

    if (isset($result['valasz'])) {
        header('Content-Type: application/json');
        if(isset($result['status'])) {
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

    if (empty($getData['place_id'])) {
        return ['valasz' => 'Hiányos bemenet', 'status' => 400];
    }

    $response = lekeres("SELECT YEAR(orders.collected_at) as 'ev', MONTH(orders.collected_at) as 'honap', SUM(orders.price) as 'average_spending' FROM orders WHERE orders.place_id = " . $getData['place_id'] . " GROUP BY YEAR(orders.collected_at), MONTH(orders.collected_at)");
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

    if (empty($getData["year"]) || empty($getData["week"]) || empty($getData["place_id"])) {
        return ['valasz' => 'Hiányos bemenet', 'status' => 400];
    }

    $response = lekeres("SELECT products.name, SUM(orderedproducts.quantity) AS 'vasarolt_mennyiseg', orders.collected_at FROM orderedproducts INNER JOIN orders ON orderedproducts.order_id = orders.id INNER JOIN products ON orderedproducts.product_id = products.id WHERE YEAR(orders.collected_at) = " . $getData["year"] . " AND WEEK(orders.collected_at) = " . $getData["week"] . " AND orders.place_id = " . $getData['place_id'] . " GROUP BY orderedproducts.product_id, WEEK(orders.collected_at) ORDER BY vasarolt_mennyiseg;", "bufego");
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

    if (empty($getData["place_id"])) {
        return ['valasz' => 'Hiányos bemenet', 'status' => 400];
    }

    $response = lekeres("SELECT YEAR(ratings.date) as 'ev', MONTH(ratings.date) as 'honap', AVG(ratings.rating) as 'atlagrating' FROM ratings WHERE ratings.place_id = " . $getData["place_id"] . " GROUP BY YEAR(ratings.date), MONTH(ratings.date) ORDER BY ratings.date");
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

    if (empty($bodyData['katId']) || empty($bodyData['katName'])) {
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    return ['valasz' => kategoriaModosit($bodyData['katId'], $bodyData['katName'])];
}

/**
 * Kezeli a kategória feltöltését.
 */
function handleKategoriaFeltoltes(string $method, ?array $bodyData): ?array
{
    if ($method !== "POST") {
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
    if ($method !== "POST") {
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
function handleBufeModositas(string $method, ?array $bodyData): ?array
{
    if ($method !== "POST") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($bodyData['bufeId']) || empty($bodyData['bufeName']) || empty($bodyData['desc']) || empty($bodyData['phone']) || empty($bodyData['addressId']) || empty($bodyData['schoolId'])) {
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    return ['valasz' => bufeModositas($bodyData['bufeId'], $bodyData['bufeName'], $bodyData['desc'], $bodyData['phone'], $bodyData['addressId'], $bodyData['schoolId'], $bodyData['payment'], $bodyData['avaliable'])];
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

    return ['valasz' => bufeAdatokFeltoles($bodyData['adminUserId'], $bodyData['bufeName'], $bodyData['desc'], $bodyData['phone'], $bodyData['addressId'], $bodyData['schoolId'], $bodyData['payment'], $bodyData['avaliable'])];
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
    if ($method !== "POST") {
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
    if ($method !== "POST") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (empty($bodyData['school_name'])) {
        return ['valasz' => 'Hiányzó adatok!', 'status' => 400];
    }

    return ['valasz' => iskolaFeltoltes($bodyData["school_name"])];
}

function handleIskolak($method){
    if ($method !== "GET") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    return ['valasz' => lekeres("SELECT `name` FROM `schools`")];
}

/**
 * Kezeli a cím feltöltését.
 */
function handleCimFeltoltes(string $method, ?array $bodyData): ?array
{
    if ($method !== "POST") {
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
function handleAdminFo(string $method, ?array $bodyData): ?array
{
    if ($method !== "POST") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (!isset($bodyData["admin_id"])) {
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }

    $response = lekeres("SELECT * FROM places WHERE places.admin_user_id =" . $bodyData["admin_id"]);
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
function handleBufeRendelesek(string $method, ?array $bodyData): ?array
{
    if ($method !== "POST") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (!isset($bodyData["place_id"])) {
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }

    $response = lekeres("SELECT * FROM orders WHERE orders.place_id =" . $bodyData["place_id"]);
    return ['valasz' => $response];
}

/**
 * Kezeli a termék felvitelt.
 */
function handleTermekFelv(string $method, ?array $bodyData): ?array
{
    if ($method !== "POST") {
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
function handleTermekek(string $method, ?array $bodyData): ?array
{
    if ($method !== "POST") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (!isset($bodyData['place_id'])) {
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }

    $response = lekeres("SELECT category_id, image, name, description, allergens, is_avaliable, price FROM products WHERE place_id = " . $bodyData['place_id']);
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

    if (!isset($bodyData["user_id"]) || !isset($bodyData["place_id"]) || !isset($bodyData["status"]) || !isset($bodyData["price"]) || !isset($bodyData["payment_method"]) || !isset($bodyData["orderd_at"]) || !isset($bodyData["expected_pickup_time"])) {
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }

    $response = valtoztatas("INSERT INTO orders(user_id, place_id, status, price, payment_method, orderd_at, expected_pickup_time) VALUES ({$bodyData['user_id']},{$bodyData['place_id']},{$bodyData['status']},{$bodyData['price']},{$bodyData['payment_method']},{$bodyData['orderd_at']},{$bodyData['expected_pickup_time']})");
    return ['valasz' => $response];
}

/**
 * Kezeli a felhasználó rendeléseinek lekérdezését.
 */
function handleUserRendelesek(string $method, ?array $bodyData): ?array
{
    if ($method !== "POST") {
        return ['valasz' => 'Hibás metódus', 'status' => 400];
    }

    if (!isset($bodyData["user_id"])) {
        return ['valasz' => 'Hiányos adat', 'status' => 400];
    }

    $response = lekeres("SELECT place_id, status, price, payment_method, orderd_at, expected_pickup_time FROM orders WHERE orders.user_id = " . $bodyData['user_id']);
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

//Függvények

//Adatbázis kommunikáció

function lekeres($muvelet, $tipus = null, $adatok = null){
    $db = new mysqli('localhost', 'root', '', 'bufego');

    if($db->connect_errno != 0){
        return $db->connect_error;
    }

    if(!is_null($tipus) && !is_null($adatok)){
        if(strlen($tipus) != count($adatok)){
            return 'Nem megfelelő számú adat vagy típús!';
        }
        $stmt = $db->prepare($muvelet);
        $stmt->bind_param($tipus, ...$adatok);
        $stmt->execute();
        $eredmeny = $stmt->get_result();
    }else{
        $eredmeny = $db->query($muvelet);
    }

    if($db->errno != 0){
        return $db->error;
    }

    if($eredmeny->num_rows == 0){
        return 'Nincsenek találatok!';
    }

    $eremdneyek = $eredmeny->fetch_all(MYSQLI_ASSOC);
    return $eremdneyek;
}

function valtoztatas($muvelet, $tipus = null, $adatok = null)
{
    $db = new mysqli('localhost', 'root', '', 'bufego');

    if($db->connect_errno != 0){
        return $db->connect_error;
    }

    if(!is_null($tipus) && !is_null($adatok)){
        if(strlen($tipus) != count($adatok)){
            return 'Nem megfelelő számú adat vagy típús!';
        }
        $stmt = $db->prepare($muvelet);
        $stmt->bind_param($tipus, ...$adatok);
        $stmt->execute();
    }else{
        $db->query($muvelet);
    }

    if($db->errno != 0){
        return $db->error;
    }

    if($db->affected_rows == 0){
        return "Sikertelen művelet!";
    }

    return "Sikeres művelet!";
}

// Büfé adatok

function bufeAdatokFeltoles($adminUserId, $bufeName, $desc, $phone, $addressId, $schoolId, $payment = false, $avaliable = false)
{
    $query = "INSERT INTO `places`(`admin_user_id`, `name`, `description`, `phone`, `address_id`, `school_id`, `payment_on_collect_enabled`, `is_avaliable`) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?);";

    $bufe = valtoztatas($query, "isssiiii", [$adminUserId,$bufeName,$desc,$phone,$addressId,$schoolId, $payment,$avaliable]);

    return json_encode(['valasz' => $bufe], JSON_UNESCAPED_UNICODE);
}

function bufeModositas($bufeId, $bufeName, $desc, $phone, $addressId, $schoolId, $payment = false, $avaliable = false)
{
    $query = "UPDATE `places` SET `name`=?,`description`=?,`phone`=?,`address_id`=?,`school_id`=?,`payment_on_collect_enabled`=?',`is_avaliable`=? WHERE `id` = ?";

    $bufe = valtoztatas($query, "sssiiiii", [$bufeName, $desc, $phone, $addressId, $schoolId, $payment, $avaliable, $bufeId]);

    return json_encode(['valasz' => $bufe], JSON_UNESCAPED_UNICODE);
}

//Felhasználó adatok

function felhasznaloiAdatokLekerese($userId){
    $query = "SELECT * FROM `users` WHERE `id` = {$userId};";
    $adatok = lekeres($query, "bufego");

    if (is_array($adatok)) {
        return $adatok;
    } else {
        return json_encode(['valasz' => $adatok], JSON_UNESCAPED_UNICODE);
    }
}

function felhasznaloAdatokModositas($userId,$email, $name, $address_id, $phone, $school_id, $pushNotificationKey, $isAdmmin){
    $query = "UPDATE `users` SET `email`='{$email}', `name`='{$name}',`address_id`='{$address_id}',`phone`='{$phone}',`school_id`='{$school_id}' WHERE `id` = {$userId};";

    $felhasznalo = valtoztatas($query, 'bufego');

    return json_encode(['valasz' => $felhasznalo], JSON_UNESCAPED_UNICODE);
}

function felhasznaloAdatokFeltoltese($email, $passcode, $name, $address_id, $phone, $school_id, $pushNotificationKey, $isAdmmin){
    $query = "INSERT INTO `users`(`id`, `email`, `passcode`, `name`, `address_id`, `phone`, `school_id`, `registered_on`, `last_login`, `push_notification_key`, `is_place_owner`) VALUES (NULL,'{$email}','{$passcode}','{$name}','{$address_id}','{$phone}','{$school_id}', CURRENT_TIMESTAMP,NULL,'{$pushNotificationKey}','{$isAdmmin}');";

    $felhasznalo = valtoztatas($query, 'bufego');

    return json_encode(['valasz' => $felhasznalo], JSON_UNESCAPED_UNICODE);
}

function jelszoValtoztatas($userId, $passcode){
    $query = "UPDATE `users` SET `passcode` = '{$passcode}' WHERE `id` = {$userId};";

    $felhasznalo = valtoztatas($query, 'bufego');

    return json_encode(['valasz' => $felhasznalo], JSON_UNESCAPED_UNICODE);
}

function cimFeltoltes($zip, $city, $address){
    $query = "INSERT INTO `addresses`(`id`, `zip_code`, `city`, `address`) VALUES (NULL,'{$zip}','{$city}','{$address}');";

    $cim = valtoztatas($query, 'bufego');

    return json_encode(['valasz' => $cim], JSON_UNESCAPED_UNICODE);
}

function iskolaFeltoltes($name){
    $query = "INSERT INTO `schools`(`id`, `name`) VALUES (NULL,'{$name}');";

    $iskola = valtoztatas($query, 'bufego');

    return json_encode(['valasz' => $iskola], JSON_UNESCAPED_UNICODE);
}

//Kategóriák

function kategoriakLekerese($bufeId)
{
    $query = "SELECT * FROM `categories` WHERE `place_id` = {$bufeId};";

    $kategoriak = lekeres($query, 'bufego');

    if (is_array($kategoriak)) {
        return $kategoriak;
    } else {
        return json_encode(['valasz' => $kategoriak], JSON_UNESCAPED_UNICODE);
    }
}

function kategoriaModosit($katId, $katName)
{
    $query = "UPDATE `categories` SET `categroy_name` = ? WHERE `categories`.`id` = ?;";

    $kategoriak = valtoztatas($query, 'si', [$katName, $katId]);

    return json_encode(['valasz' => $kategoriak], JSON_UNESCAPED_UNICODE);
}

function kategoriaFeltolt($bufeId, $katName)
{
    $query = "INSERT INTO `categories`(`place_id`, `categroy_name`) VALUES (?,?);";

    $kategoriak = valtoztatas($query, 'iis', [$bufeId, $katName]);

    return json_encode(['valasz' => $kategoriak], JSON_UNESCAPED_UNICODE);
}

function kategoriaTorol($katId)
{
    $check = lekeres("SELECT * FROM categories WHERE id = ?;", "i", [$katId]);
    if (is_array($check)) {
        $query = "UPDATE `categories` SET `deleted`='1' WHERE `id` = ? ";
        $kategoriak = valtoztatas($query, 'i', [$katId]);
        return json_encode(['valasz' => $kategoriak], JSON_UNESCAPED_UNICODE);
    } else {
        return json_encode(['valasz' => "Nincs ilyen kategória!"], JSON_UNESCAPED_UNICODE);
    }
}