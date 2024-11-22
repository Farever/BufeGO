<?php

include "./adatbazisFuggveny.php";

$url = explode("/", $_SERVER["REQUEST_URI"]);
switch (end($url)) {
    case 'stat_monthly_income':
        if($_SERVER["REQUEST_METHOD"] == "GET")
        {
            $body = file_get_contents("php://input");
            $body = json_decode($body, true);
            if(!empty($body['bufe_name']))
            {
                $response = lekeres("SELECT places.name, YEAR(orders.collected_at) as 'ev', MONTH(orders.collected_at) as 'honap', AVG(orders.price) as 'average_spending' FROM `orders` INNER JOIN places ON orders.place_id = places.id GROUP BY YEAR(orders.collected_at), MONTH(orders.collected_at) HAVING name='".$body['bufe_name']."';");
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
            }
            else
            {
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
    case 'legjobbanfogyo':
        /*SELECT 
    products.name, 
    SUM(orderedproducts.quantity) AS 'vasarolt_mennyiseg',
    WEEK(orders.collected_at)
FROM 
    orderedproducts
INNER JOIN 
    orders ON orderedproducts.order_id = orders.id
INNER JOIN
	products ON orderedproducts.product_id = products.id
WHERE 
    YEAR(orders.collected_at) = 2022
GROUP BY 
    orderedproducts.product_id, WEEK(orders.collected_at)
ORDER BY 
    vasarolt_mennyiseg DESC
LIMIT 4;
*/
    case "currentrating":
        if($_SERVER["REQUEST_METHOD"] == "GET")
        {
            $body = file_get_contents("php://input");
            $body = json_decode($body, true);
            if(!empty($body["place_id"]))
            {
                $response = lekeres("SELECT AVG(ratings.rating) as 'current_rating' FROM `ratings` WHERE ratings.place_id = ".$body["place_id"]." AND ratings.date <= CURDATE();");
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
            }
            else
            {
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
    case 'getmonthlyrating':
        
        if($_SERVER["REQUEST_METHOD"] == "GET")
        {
            $body = file_get_contents("php://input");
            $body = json_decode($body, true);
            if(!empty($body["place_id"]))
            {
                $response = lekeres("SELECT YEAR(ratings.date) as 'ev', MONTH(ratings.date) as 'honap', AVG(ratings.rating) as 'atlagrating' FROM `ratings` WHERE ratings.place_id = ".$body["place_id"]." GROUP BY YEAR(ratings.date), MONTH(ratings.date) ORDER BY `ratings`.`date`");
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
            }
            else
            {
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
    case "peak_time":
        //SELECT HOUR(orderd_at), SUM(id) as 'rendeles_szam' FROM `orders` WHERE orders.place_id=1 GROUP BY HOUR(orderd_at) ORDER BY rendeles_szam DESC;
        if($_SERVER["REQUEST_METHOD"] == "GET")
        {
            $body = file_get_contents("php://input");
            $body = json_decode($body, true);
            if(!empty($body["place_id"]))
            {
                $response = lekeres("SELECT HOUR(orderd_at) as 'ora', SUM(id) as 'rendeles_szam' FROM `orders` WHERE orders.place_id=".$body["place_id"]." GROUP BY HOUR(orderd_at) ORDER BY rendeles_szam DESC");
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
            }
            else
            {
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
    default:
        echo json_encode(['valasz' => 'Hibás url'], JSON_UNESCAPED_UNICODE);
        break;
}

?>