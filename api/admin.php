<?php

include "./adatbazisFuggveny.php";

$url = explode("/", $_SERVER["REQUEST_URI"]);
switch (end($url)) {
    case "admin_fo":
        $data = json_decode(file_get_contents("php://input"), true);
        if(isset($data["admin_id"]))
        {
            $response = lekeres("SELECT * FROM places WHERE places.admin_user_id =" . $data["admin_id"], "bufego");
            echo json_encode($response, JSON_UNESCAPED_UNICODE);
        }
        else
        {
            echo json_encode(["valasz" => "Hiányos adat"]);
            header("BAD REQUEST", true, 400);
        }
        break;
    case "bufe":
        $data = json_decode(file_get_contents("php://input"), true);
        if(isset($data["place_id"]))
        {
            $response = lekeres("SELECT * FROM `places` WHERE places.id = 2", "bufego");
            echo json_encode($response, JSON_UNESCAPED_UNICODE);
        }
        else
        {
            echo json_encode(["valasz" => "Hiányos adat"]);
            header("BAD REQUEST", true, 400);
        }
        break;
    case "bufe_rendelesek":
        $data = json_decode(file_get_contents("php://input"), true);
        if(isset($data["place_id"]))
        {
            $response = lekeres("SELECT * FROM orders WHERE orders.place_id =" . $data["place_id"]);
        }
        else
        {
            echo json_encode(["valasz" => "Hiányos adat"]);
            header("BAD REQUEST", true, 400);
        }
        break;
    case "termek_felv":
        $data = json_decode(file_get_contents("php://input"), true);
        
        if(isset($data["place"]) && isset($data["category"]) && isset($data['img']) && isset($data['name']) && isset($data['description']) && isset($data['allergens']) && isset($data['is_avaliable']) && isset($data['price']))
        {
            $response = valtoztatas("INSERT INTO products( place_id,category_id,image,name,description,allergens, is_avaliable, price) VALUES ({$data['place']},{$data['category']},{$data['img']},{$data['name']},{$data['description']},{$data['allergens']},{$data['is_avaliable']},{$data['price']})", "bufego");
            echo json_encode(["valasz" => $response], JSON_UNESCAPED_UNICODE);  
        }
        else
        {
            echo json_encode(["valasz" => "Hiányos adat"]);
            header("BAD REQUEST", true, 400);
        }
        break;
    case "rendel":
        $data = json_decode(file_get_contents("php://input"), true);
        if(isset($data["user_id"]) && isset($data["place_id"]) && isset($data["status"]) && isset($data["price"]) && isset($data["payment_method"]) && isset($data["orderd_at"]), && isset($data["expected_pickup_time"]))
        {
            $response = lekeres("INSERT INTO `orders`(`user_id`, `place_id`, `status`, `price`, `payment_method`, `orderd_at`, `expected_pickup_time`) VALUES ({$data['user_id']},{$data['place_id']},{$data['status']},{$data['price']},{$data['payment_method']},{$data['orderd_at']},{$data['expected_pickup_time']})", "bufego");
            echo json_encode(["valasz" => $response], JSON_UNESCAPED_UNICODE);
        }
        else
        {
            echo json_encode(["valasz" => "Hiányos adat"]);
            header("BAD REQUEST", true, 400);
        }

        break;
    default:
        header("Hibás URL", true, 400);
        echo json_encode(['valasz' => 'Hibás url'], JSON_UNESCAPED_UNICODE);
        break;
}
?>