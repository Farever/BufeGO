<?php
    //PHP telepítés kell!!!
    //php -S localhost:8000 command a php mappában

    header('Access-Control-Allow-Origin: http://localhost:3000');
    include './db.php';

    $url = explode('/',$_SERVER["PHP_SELF"]);

    switch(end($url)){
        case 'test':
            echo "Test";
            break;
        default:
            break;
    }

?>