<?php

function bufeAdatokFeltoles($adminUserId, $bufeName, $desc, $phone, $addressId, $schoolId, $payment = false, $avaliable = false)
{
    $query = "INSERT INTO `places`(`admin_user_id`, `name`, `description`, `phone`, `address_id`, `school_id`, `payment_on_collect_enabled`, `is_avaliable`) 
                            VALUES ('{$adminUserId}','{$bufeName}','{$desc}','{$phone}','{$addressId}','{$schoolId}','{$payment}','$avaliable');";

    $bufe = valtoztatas($query, 'bufego');

    return json_encode(['valasz' => $bufe], JSON_UNESCAPED_UNICODE);
}

function bufeModositas($bufeId, $bufeName, $desc, $phone, $addressId, $schoolId, $payment = false, $avaliable = false)
{
    $query = "UPDATE `places` SET `name`='{$bufeName}',`description`='{$desc}',`phone`='{$phone}',`address_id`='{$addressId}',`school_id`='{$schoolId}',`payment_on_collect_enabled`='{$payment}',`is_avaliable`='{$avaliable}' WHERE `id` = {$bufeId}";

    $bufe = valtoztatas($query, 'bufego');

    return json_encode(['valasz' => $bufe], JSON_UNESCAPED_UNICODE);
}
