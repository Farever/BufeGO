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
            $response = lekeres("SELECT * FROM `places` WHERE places.id = {$data['place_id']}", "bufego");
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
            $response = lekeres("SELECT * FROM orders WHERE orders.place_id =" . $data["place_id"], "bufego");
            echo json_encode($response, JSON_UNESCAPED_UNICODE);  
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
            $response = valtoztatas("INSERT INTO products( place_id,category_id, image, name, description, allergens, is_avaliable, price) VALUES ({$data['place']},{$data['category']},'{$data['img']}','{$data['name']}','{$data['description']}','{$data['allergens']}',{$data['is_avaliable']},{$data['price']})", "bufego");
            echo json_encode(["valasz" => $response], JSON_UNESCAPED_UNICODE);  
        }
        else
        {
            echo json_encode(["valasz" => "Hiányos adat"]);
            header("BAD REQUEST", true, 400);
        }
        break;

    case "termekek" :
        $data = json_decode(file_get_contents("php://input"), true);
        if(isset($data['place_id']))
        {
            $response = lekeres("SELECT `category_id`, `image`, `name`, `description`, `allergens`, `is_avaliable`, `price` FROM `products` WHERE place_id = {$data['place_id']}", "bufego");
            echo json_encode($response, JSON_UNESCAPED_UNICODE);  
        }
        else
        {
            echo json_encode(["valasz" => "Hiányos adat"]);
            header("BAD REQUEST", true, 400);
        }
        break;
    case "termek_valt":
        if($_SERVER["REQUEST_METHOD"] == "POST")
        {
            $data = json_decode(file_get_contents("php://input"), true);
            if(isset($data['id'])&&isset($data['category_id']) && isset($data['image']) && isset($data['name']) && isset($data['description']) && isset($data['allergens']) && isset($data['is_avaliable']) && isset($data['price']))
            {
                $response = valtoztatas("UPDATE `products` SET `category_id`={$data['category_id']},`image`={$data['image']},`name`={$data['name']},`description`={$data['description']},`allergens`={$data['allergens']},`is_avaliable`={$data['is_avaliable']},`price`= {$data['price']} WHERE id = {$data['id']}", "bufego");

                echo json_encode($response, JSON_UNESCAPED_UNICODE);
            }
            else
            {
                echo json_encode(["valasz" => "Hiányos adat"]);
                header("BAD REQUEST", true, 400);
            }
        }
        break;
    case "termek_del":
        if($_SERVER["REQUEST_METHOD"] == "DELETE")
        {
            $data = json_decode(file_get_contents("php://input"), true);
            if(isset($data["id"]))
            {
                $response = valtoztatas("DELETE FROM `products` WHERE id = {$data['id']}", "bufego");
                echo json_encode(["valasz" => $response], JSON_UNESCAPED_UNICODE);
            }
            else
            {
                echo json_encode(["valasz" => "Hiányos adat"]);
                header("BAD REQUEST", true, 400);
            }
        }
        break;
    case "rendel":
        $data = json_decode(file_get_contents("php://input"), true);
        if(isset($data["user_id"]) && isset($data["place_id"]) && isset($data["status"]) && isset($data["price"]) && isset($data["payment_method"]) && isset($data["orderd_at"]) && isset($data["expected_pickup_time"]))
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
    case "user_remdelesek":
        $data = json_decode(file_get_contents("php://input"), true);
        if(isset($data["user_id"]))
        {
            $response = lekeres("SELECT `place_id`, `status`, `price`, `payment_method`, `orderd_at`, `expected_pickup_time` FROM `orders` WHERE orders.user_id = {$data['user_id']}", "bufego");
            echo json_encode($response, JSON_UNESCAPED_UNICODE);  
        }
        else
        {
            echo json_encode(["valasz" => "Hiányos adat"]);
            header("BAD REQUEST", true, 400);
        }
        break;
    case "kosarba":
        $data =json_decode(file_get_contents("php://input"), true);
        if(!empty($data["user_id"]) && !empty(["place_id"]) && !empty($data["quantity"]) && !empty($data["product_id"]))
        {
            $response = adatValtozas("INSERT INTO `cart`( `user_id`, `place_id`, `quantity`, `product_id`) VALUES ('{$data["user_id"]}','{$data["place_id"]}','{$data["quatnity"]}','{$data["product_id"]}')", "bufego");
            echo json_encode($response, JSON_UNESCAPED_UNICODE);  
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