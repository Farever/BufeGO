<?php

include "./adatbazisFuggveny.php";

$url = explode("/", $_SERVER["REQUEST_URI"]);
switch (end($url)) {
    case 'stat_yearly_income':
        $body = file_get_contents("php://input");
        $body = json_decode($body, true);
        $response = lekeres("SELECT places.name, YEAR(orders.collected_at) as 'ev', MONTH(orders.collected_at) as 'honap', AVG(orders.price) as 'average_spending' FROM `orders` INNER JOIN places ON orders.place_id = places.id GROUP BY YEAR(orders.collected_at), MONTH(orders.collected_at) HAVING name='".$body['bufe_name']."';", "bufego");
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
        break;
    case 'legjobbanfogyo':

    default:
        echo json_encode(['valasz' => 'Hibás url'], JSON_UNESCAPED_UNICODE);
        break;
}

?>