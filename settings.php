<?php
    include "./adatbazisFuggveny.php";

    $url = explode("/", $_SERVER["REQUEST_URI"]);
    switch (end($url)) 
    {
        case "changeschool":
            if($_SERVER["REQUEST_METHOD"] == "PUT")
            {
                $body = file_get_contents("php://input");
                $body = json_decode($body, true);
                if(!empty($body["school_name"]) && !empty($body["user_id"]))
                {
                    //UPDATE users JOIN schools ON users.school_id = schools.id SET users.school_id = (SELECT id FROM schools WHERE name = "vero" LIMIT 1) WHERE users.id = 3;
                    $response = lekeres("UPDATE users INNER JOIN schools ON users.school_id = schools.id SET users.school_id = (SELECT id FROM schools WHERE name = '".$body["school_name"]."' LIMIT 1) WHERE users.id = ".$body["user_id"].";");
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
        case "deactivate_acc":
            if($_SERVER["REQUEST_METHOD"] == "PUT")
            {
                $body = file_get_contents("php://input");
                $body = json_decode($body, true);
                if(!empty($body["user_id"]))
                {
                    //have to check the current status
                    $response = valtoztatas("UPDATE users SET users.isActive = 0 WHERE users.id = ".$body["user_id"]." && users.isActive = 1;");
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
        case "reactivate_acc":
            if($_SERVER["REQUEST_METHOD"] == "PUT")
            {
                $body = file_get_contents("php://input");
                $body = json_decode($body, true);
                if(!empty($body["user_id"]))
                {
                    //
                    $response = valtoztatas("UPDATE users SET users.isActive = 1 WHERE users.id = ".$body["user_id"]." && users.isActive = 0;");
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