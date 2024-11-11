<?php

include "./adatbazisFuggveny.php";

$url = explode("/", $_SERVER["REQUEST_URI"]);
switch (end($url)) {
    case 'stat_yearly_income':
        #missing year grouping
        $response = lekeres("SELECT places.name, AVG(orders.price) as 'average_spending' FROM `orders` INNER JOIN places ON orders.place_id = places.id GROUP BY orders.place_id;", "bufego");
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
        break;
    
    default:
        echo json_encode(['valasz' => 'Hibás url'], JSON_UNESCAPED_UNICODE);
        break;
}

?>