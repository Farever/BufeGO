<?php
header('Access-Control-Allow-Origin: http://localhost:5173');

$url = explode('/', $_SERVER['REQUEST_URI']);
$endpoint = end($url);

$bodyData = null;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $bodyData = json_decode(file_get_contents('php://input'), true);
}

include './adatbazisFuggveny.php';
include './felhasznalok.php';
include './kategoriak.php';
include './bufeadatok.php';

switch (mb_strtolower(explode('?', $endpoint)[0])) {
    case 'stat_monthly_income':
        if ($_SERVER["REQUEST_METHOD"] == "GET") {

            if (!empty($_GET['place_id'])) {

                $response = lekeres("SELECT YEAR(orders.collected_at) as 'ev', MONTH(orders.collected_at) as 'honap', SUM(orders.price) as 'average_spending' FROM orders WHERE orders.place_id = " . $_GET['place_id'] . " GROUP BY YEAR(orders.collected_at), MONTH(orders.collected_at)");
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(["valasz" => "Hiányos bemenet"], JSON_UNESCAPED_UNICODE);
                header("bad request", 400, true);
            }
        } else {
            echo json_encode(["valasz" => "Hibás metódus"], JSON_UNESCAPED_UNICODE);
            header("bad request", 400, true);
        }
        break;
    case 'legjobbanfogyo':
        if ($_SERVER["REQUEST_METHOD"] == "GET") {
            if (!empty($_GET["year"]) && !empty($_GET["week"]) && !empty($_GET["place_id"])) {
                $response = lekeres("SELECT products.name, SUM(orderedproducts.quantity) AS 'vasarolt_mennyiseg', orders.collected_at FROM orderedproducts INNER JOIN orders ON orderedproducts.order_id = orders.id INNER JOIN products ON orderedproducts.product_id = products.id WHERE YEAR(orders.collected_at) = " . $_GET["year"] . " AND WEEK(orders.collected_at) = " . $_GET["week"] . " AND orders.place_id = {$_GET['place_id']} GROUP BY orderedproducts.product_id, WEEK(orders.collected_at) ORDER BY vasarolt_mennyiseg;", "bufego");
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(["valasz" => "Hiányos bemenet"], JSON_UNESCAPED_UNICODE);
                header("bad request", 400, true);
            }
        } else {
            echo json_encode(["valasz" => "Hibás metódus"], JSON_UNESCAPED_UNICODE);
            header("bad request", 400, true);
        }
        break;
    case "currentrating":
        if ($_SERVER["REQUEST_METHOD"] == "GET") {

            if (!empty($_GET["place_id"])) {
                $response = lekeres("SELECT AVG(ratings.rating) as 'current_rating' FROM ratings WHERE ratings.place_id = " . $_GET["place_id"] . " AND ratings.date <= CURDATE();");
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(["valasz" => "Hiányos bemenet"], JSON_UNESCAPED_UNICODE);
                header("bad request", 400, true);
            }
        } else {
            echo json_encode(["valasz" => "Hibás metódus"], JSON_UNESCAPED_UNICODE);
            header("bad request", 400, true);
        }
        break;
    case 'getmonthlyrating':

        if ($_SERVER["REQUEST_METHOD"] == "GET") {

            if (!empty($_GET["place_id"])) {
                $response = lekeres("SELECT YEAR(ratings.date) as 'ev', MONTH(ratings.date) as 'honap', AVG(ratings.rating) as 'atlagrating' FROM ratings WHERE ratings.place_id = " . $_GET["place_id"] . " GROUP BY YEAR(ratings.date), MONTH(ratings.date) ORDER BY ratings.date");
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(["valasz" => "Hiányos bemenet"], JSON_UNESCAPED_UNICODE);
                header("bad request", 400, true);
            }
        } else {
            echo json_encode(["valasz" => "Hibás metódus"], JSON_UNESCAPED_UNICODE);
            header("bad request", 400, true);
        }
        break;
    case "peak_time":

        if ($_SERVER["REQUEST_METHOD"] == "GET") {

            if (!empty($_GET["place_id"])) {
                $response = lekeres("SELECT HOUR(orderd_at) as 'ora', SUM(id) as 'rendeles_szam' FROM orders WHERE orders.place_id=" . $_GET["place_id"] . " GROUP BY HOUR(orderd_at) ORDER BY rendeles_szam DESC");
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(["valasz" => "Hiányos bemenet"], JSON_UNESCAPED_UNICODE);
                header("bad request", 400, true);
            }
        } else {
            echo json_encode(["valasz" => "Hibás metódus"], JSON_UNESCAPED_UNICODE);
            header("bad request", 400, true);
        }
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

    case 'kategoriamodositas':
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (!empty($bodyData['katId'] && !empty($bodyData['katName']))) {
                echo json_encode(kategoriaModosit($bodyData['katId'], $bodyData['katName']), JSON_UNESCAPED_UNICODE);
            } else {
                header('bad request', true, 400);
                echo json_encode(['valasz' => 'Hiányzó adatok!'], JSON_UNESCAPED_UNICODE);
            }
        } else {
            header('bad request', true, 400);
            echo json_encode(['valasz' => 'Hibás metődus!'], JSON_UNESCAPED_UNICODE);
        }
        break;

    case 'kategoriafeltoltes':
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (!empty($bodyData['bufeId']) && !empty($bodyData['katName'])) {
                echo json_encode(kategoriaFeltolt($bodyData['bufeId'], $bodyData['katName']), JSON_UNESCAPED_UNICODE);
            } else {
                header('bad request', true, 400);
                echo json_encode(['valasz' => 'Hiányzó adatok!'], JSON_UNESCAPED_UNICODE);
            }
        } else {
            header('bad request', true, 400);
            echo json_encode(['valasz' => 'Hibás metődus!'], JSON_UNESCAPED_UNICODE);
        }
        break;

    case 'kategoriatorles':
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (!empty($bodyData['katId'])) {
                echo json_encode(kategoriaTorol($bodyData['katId']), JSON_UNESCAPED_UNICODE);
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
            if (!empty($bodyData['bufeId']) && !empty($bodyData['bufeName']) && !empty($bodyData['desc']) && !empty($bodyData['phone']) && !empty($bodyData['addressId']) && !empty($bodyData['schoolId'])) {
                echo json_encode(bufeModositas($bodyData['bufeId'], $bodyData['bufeName'], $bodyData['desc'], $bodyData['phone'], $bodyData['addressId'], $bodyData['schoolId'], $bodyData['payment'], $bodyData['avaliable']), JSON_UNESCAPED_UNICODE);
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
            if (!empty($bodyData['adminUserId']) && !empty($bodyData['bufeName']) && !empty($bodyData['desc']) && !empty($bodyData['phone']) && !empty($bodyData['addressId']) && !empty($bodyData['schoolId'])) {
                echo json_encode(bufeAdatokFeltoles($bodyData['adminUserId'], $bodyData['bufeName'], $bodyData['desc'], $bodyData['phone'], $bodyData['addressId'], $bodyData['schoolId'], $bodyData['payment'], $bodyData['avaliable']), JSON_UNESCAPED_UNICODE);
            } else {
                header('bad request', true, 400);
                echo json_encode(['valasz' => 'Hiányzó adatok!'], JSON_UNESCAPED_UNICODE);
            }
        } else {
            header('bad request', true, 400);
            echo json_encode(['valasz' => 'Hibás metődus!'], JSON_UNESCAPED_UNICODE);
        }
        break;

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
            if (!empty($bodyData['email']) && !empty($bodyData['passcode']) && !empty($bodyData['name']) && !empty($bodyData['address_id']) && !empty($bodyData['phone']) && !empty($bodyData['school'])) {
                $adatok = felhasznaloAdatokFeltoltese($bodyData['email'], $bodyData['passcode'], $bodyData['name'], $bodyData['address_id'], $bodyData['phone'], $bodyData['school'], NULL, 0);
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
            if (!empty($bodyData['email']) && !empty($bodyData['userId']) && !empty($bodyData['name']) && !empty($bodyData['address_id']) && !empty($bodyData['phone']) && !empty($bodyData['school'])) {
                $adatok = felhasznaloAdatokModositas($bodyData['userId'], $bodyData['email'], $bodyData['name'], $bodyData['address_id'], $bodyData['phone'], $bodyData['school'], NULL, 0);
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
            if (!empty($bodyData["userId"]) && !empty($bodyData["passcode"])) {
                $adatok = jelszoValtoztatas($bodyData["userId"], $bodyData["passcode"]);
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
            if (!empty($bodyData['school_name'])) {
                echo json_encode(iskolaFeltoltes($bodyData["school_name"]), JSON_UNESCAPED_UNICODE);
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
            if (!empty($bodyData['zip']) && !empty($bodyData['city']) && !empty($bodyData['address'])) {
                $adatok = cimFeltoltes($bodyData['zip'], $bodyData['city'], $bodyData['address']);
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
    case 'kinalatlekeres':
        if ($_SERVER["REQUEST_METHOD"] == "GET") {
            if (!empty($_GET['bufeId'])) {
                $sql = "SELECT * FROM products WHERE place_id = ?;";
                $kinalat = lekeres($sql, 'i', [$_GET['bufeId']]);

                echo json_encode($kinalat);
            } else {
                header('bad request', true, 400);
                echo json_encode(['valasz' => 'Hiányzó adatok!'], JSON_UNESCAPED_UNICODE);
            }
        } else {
            header('bad request', true, 400);
            echo json_encode(['valasz' => 'Hibás metődus!'], JSON_UNESCAPED_UNICODE);
        }
        break;

    case "admin_fo":

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (isset($bodyData["admin_id"])) {
                $response = lekeres("SELECT * FROM places WHERE places.admin_user_id =" . $bodyData["admin_id"]);
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(["valasz" => "Hiányos adat"]);
                header("BAD REQUEST", true, 400);
            }
        } else {
            echo json_encode(["valasz" => "Hibás metódus"], JSON_UNESCAPED_UNICODE);
            header("bad request", 400, true);
        }

        break;
    case "bufe":
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (isset($bodyData["place_id"])) {
                $response = lekeres("SELECT * FROM places WHERE places.id = {$bodyData['place_id']}");
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(["valasz" => "Hiányos adat"]);
                header("BAD REQUEST", true, 400);
            }
        } else {
            echo json_encode(["valasz" => "Hibás metódus"], JSON_UNESCAPED_UNICODE);
            header("bad request", 400, true);
        }

        break;
    case "bufe_rendelesek":
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (isset($bodyData["place_id"])) {
                $response = lekeres("SELECT * FROM orders WHERE orders.place_id =" . $bodyData["place_id"]);
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(["valasz" => "Hiányos adat"]);
                header("BAD REQUEST", true, 400);
            }
        } else {
            echo json_encode(["valasz" => "Hibás metódus"], JSON_UNESCAPED_UNICODE);
            header("bad request", 400, true);
        }

        break;
    case "termek_felv":
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (isset($bodyData["place"]) && isset($bodyData["category"]) && isset($bodyData['img']) && isset($bodyData['name']) && isset($bodyData['description']) && isset($bodyData['allergens']) && isset($bodyData['is_avaliable']) && isset($bodyData['price'])) {
                $response = valtoztatas("INSERT INTO products( place_id,category_id, image, name, description, allergens, is_avaliable, price) VALUES ({$bodyData['place']},{$bodyData['category']},'{$bodyData['img']}','{$bodyData['name']}','{$bodyData['description']}','{$bodyData['allergens']}',{$bodyData['is_avaliable']},{$bodyData['price']})");
                echo json_encode(["valasz" => $response], JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(["valasz" => "Hiányos adat"]);
                header("BAD REQUEST", true, 400);
            }
        } else {
            echo json_encode(["valasz" => "Hibás metódus"], JSON_UNESCAPED_UNICODE);
            header("bad request", 400, true);
        }

        break;

    case "termekek":
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (isset($bodyData['place_id'])) {
                $response = lekeres("SELECT category_id, image, name, description, allergens, is_avaliable, price FROM products WHERE place_id = {$bodyData['place_id']}");
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(["valasz" => "Hiányos adat"]);
                header("BAD REQUEST", true, 400);
            }
        } else {
            echo json_encode(["valasz" => "Hibás metódus"], JSON_UNESCAPED_UNICODE);
            header("bad request", 400, true);
        }

        break;
    case "termek_valt":
        if ($_SERVER["REQUEST_METHOD"] == "POST") {

            if (isset($bodyData['id']) && isset($bodyData['category_id']) && isset($bodyData['image']) && isset($bodyData['name']) && isset($bodyData['description']) && isset($bodyData['allergens']) && isset($bodyData['is_avaliable']) && isset($bodyData['price'])) {
                $response = valtoztatas("UPDATE products SET category_id={$bodyData['category_id']},image={$bodyData['image']},name={$bodyData['name']},description={$bodyData['description']},allergens={$bodyData['allergens']},is_avaliable={$bodyData['is_avaliable']},price= {$bodyData['price']} WHERE id = {$bodyData['id']}");

                echo json_encode($response, JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(["valasz" => "Hiányos adat"]);
                header("BAD REQUEST", true, 400);
            }
        } else {
            echo json_encode(["valasz" => "Hibás metódus"], JSON_UNESCAPED_UNICODE);
            header("bad request", 400, true);
        }
        break;
    case "termek_del":
        if ($_SERVER["REQUEST_METHOD"] == "DELETE") {

            if (isset($bodyData["id"])) {
                $response = valtoztatas("DELETE FROM products WHERE id = {$bodyData['id']}");
                echo json_encode(["valasz" => $response], JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(["valasz" => "Hiányos adat"]);
                header("BAD REQUEST", true, 400);
            }
        } else {
            echo json_encode(["valasz" => "Hibás metódus"], JSON_UNESCAPED_UNICODE);
            header("bad request", 400, true);
        }
        break;
    case "rendel":
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (isset($bodyData["user_id"]) && isset($bodyData["place_id"]) && isset($bodyData["status"]) && isset($bodyData["price"]) && isset($bodyData["payment_method"]) && isset($bodyData["orderd_at"]) && isset($bodyData["expected_pickup_time"])) {
                $response = valtoztatas("INSERT INTO orders(user_id, place_id, status, price, payment_method, orderd_at, expected_pickup_time) VALUES ({$bodyData['user_id']},{$bodyData['place_id']},{$bodyData['status']},{$bodyData['price']},{$bodyData['payment_method']},{$bodyData['orderd_at']},{$bodyData['expected_pickup_time']})");
                echo json_encode(["valasz" => $response], JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(["valasz" => "Hiányos adat"]);
                header("BAD REQUEST", true, 400);
            }
        } else {
            echo json_encode(["valasz" => "Hibás metódus"], JSON_UNESCAPED_UNICODE);
            header("bad request", 400, true);
        }

        break;
    case "user_remdelesek":
        if ($_SERVER["REQUEST_METHOD"] == "POST") {

            if (isset($bodyData["user_id"])) {
                $response = lekeres("SELECT place_id, status, price, payment_method, orderd_at, expected_pickup_time FROM orders WHERE orders.user_id = {$bodyData['user_id']}");
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(["valasz" => "Hiányos adat"]);
                header("BAD REQUEST", true, 400);
            }
        } else {
            echo json_encode(["valasz" => "Hibás metódus"], JSON_UNESCAPED_UNICODE);
            header("bad request", 400, true);
        }
        break;
    case "kosarba":
        if ($_SERVER["REQUEST_METHOD"] == "POST") {

            if (!empty($bodyData["user_id"]) && !empty(["place_id"]) && !empty($bodyData["quantity"]) && !empty($bodyData["product_id"])) {
                $response = valtoztatas("INSERT INTO cart( user_id, place_id, quantity, product_id) VALUES ('{$bodyData["user_id"]}','{$bodyData["place_id"]}','{$bodyData["quatnity"]}','{$bodyData["product_id"]}')");
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(["valasz" => "Hiányos adat"]);
                header("BAD REQUEST", true, 400);
            }
        } else {
            echo json_encode(["valasz" => "Hibás metódus"], JSON_UNESCAPED_UNICODE);
            header("bad request", 400, true);
        }
        break;


    default:
        echo json_encode(['valasz' => 'Hibás url'], JSON_UNESCAPED_UNICODE);
        break;
}