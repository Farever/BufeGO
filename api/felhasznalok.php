<?php

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
?>