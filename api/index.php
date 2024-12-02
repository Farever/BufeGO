<?php
header('Access-Control-Allow-Origin: http://localhost:3000');

$url = explode('/', $_SERVER['REQUEST_URI']);
$endpoint = end($url);

$bodyData = json_decode(file_get_contents('php://input'), true);

include './adatbazisFuggveny.php';
include './felhasznalok.php';
include './kategoriak.php';
include './bufeadatok.php';

switch (mb_strtolower(explode('?', $endpoint)[0])) {
    case 'stat_monthly_income':
        if ($_SERVER["REQUEST_METHOD"] == "GET") {
            $body = file_get_contents("php://input");
            $body = json_decode($body, true);
            if (!empty($body['place_id'])) {
                //SELECT YEAR(orders.collected_at) as 'ev', MONTH(orders.collected_at) as 'honap', SUM(orders.price) as 'average_spending' FROM `orders` WHERE orders.place_id = ".$body['place_id']." GROUP BY YEAR(orders.collected_at), MONTH(orders.collected_at);
                $response = lekeres("SELECT YEAR(orders.collected_at) as 'ev', MONTH(orders.collected_at) as 'honap', SUM(orders.price) as 'average_spending' FROM `orders` WHERE orders.place_id = " . $body['place_id'] . " GROUP BY YEAR(orders.collected_at), MONTH(orders.collected_at)");
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
        if ($_SERVER["REQUEST_METHOD"] == "GET") 
        {
            $body = file_get_contents("php://input");
            $body = json_decode($body, true);
            if (!empty($body["year"]) && !empty($body["week"])) 
            {
                $response = lekeres("SELECT products.name, SUM(orderedproducts.quantity) AS 'vasarolt_mennyiseg', WEEK(orders.collected_at) FROM orderedproducts INNER JOIN orders ON orderedproducts.order_id = orders.id INNER JOIN products ON orderedproducts.product_id = products.id WHERE YEAR(orders.collected_at) = ".$body["year"]." AND WEEK(orders.collected_at) = ".$body["week"]." GROUP BY orderedproducts.product_id, WEEK(orders.collected_at) ORDER BY vasarolt_mennyiseg DESC LIMIT 4", "bufego");
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
            } 
            else {
                echo json_encode(["valasz" => "Hiányos bemenet"], JSON_UNESCAPED_UNICODE);
                header("bad request", 400, true);
            }
        } 
        else 
        {
            echo json_encode(["valasz" => "Hibás metódus"], JSON_UNESCAPED_UNICODE);
            header("bad request", 400, true);
        }
        break;
    case "currentrating":
        if ($_SERVER["REQUEST_METHOD"] == "GET") {
            $body = file_get_contents("php://input");
            $body = json_decode($body, true);
            if (!empty($body["place_id"])) {
                $response = lekeres("SELECT AVG(ratings.rating) as 'current_rating' FROM `ratings` WHERE ratings.place_id = " . $body["place_id"] . " AND ratings.date <= CURDATE();");
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
            $body = file_get_contents("php://input");
            $body = json_decode($body, true);
            if (!empty($body["place_id"])) {
                $response = lekeres("SELECT YEAR(ratings.date) as 'ev', MONTH(ratings.date) as 'honap', AVG(ratings.rating) as 'atlagrating' FROM `ratings` WHERE ratings.place_id = " . $body["place_id"] . " GROUP BY YEAR(ratings.date), MONTH(ratings.date) ORDER BY `ratings`.`date`");
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
        //SELECT HOUR(orderd_at), SUM(id) as 'rendeles_szam' FROM `orders` WHERE orders.place_id=1 GROUP BY HOUR(orderd_at) ORDER BY rendeles_szam DESC;
        if ($_SERVER["REQUEST_METHOD"] == "GET") {
            $body = file_get_contents("php://input");
            $body = json_decode($body, true);
            if (!empty($body["place_id"])) {
                $response = lekeres("SELECT HOUR(orderd_at) as 'ora', SUM(id) as 'rendeles_szam' FROM `orders` WHERE orders.place_id=" . $body["place_id"] . " GROUP BY HOUR(orderd_at) ORDER BY rendeles_szam DESC");
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

    case 'kategoriafeltoltes':
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

    case 'kategoriatorles':
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
    case 'kinalatlekeres':
        if($_SERVER["REQUEST_METHOD"] == "GET"){
            if(!empty($_GET['bufeId'])){
                $sql = "SELECT * FROM `products` WHERE `place_id` = ?;";
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
    

    default:
        echo json_encode(['valasz' => 'Hibás url'], JSON_UNESCAPED_UNICODE);
        break;
}
