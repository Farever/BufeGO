<?php

function bufeAdatokFeltoles($adminUserId, $bufeName, $desc, $phone, $addressId, $schoolId, $payment = false, $avaliable = false)
{
    $query = "INSERT INTO `places`(`admin_user_id`, `name`, `description`, `phone`, `address_id`, `school_id`, `payment_on_collect_enabled`, `is_avaliable`) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?);";

    $bufe = valtoztatas($query, "isssiiii", [$adminUserId,$bufeName,$desc,$phone,$addressId,$schoolId, $payment,$avaliable]);

    return json_encode(['valasz' => $bufe], JSON_UNESCAPED_UNICODE);
}

function bufeModositas($bufeId, $bufeName, $desc, $phone, $addressId, $schoolId, $payment = false, $avaliable = false)
{
    $query = "UPDATE `places` SET `name`=?,`description`=?,`phone`=?,`address_id`=?,`school_id`=?,`payment_on_collect_enabled`=?',`is_avaliable`=? WHERE `id` = ?";

    $bufe = valtoztatas($query, "sssiiiii", [$bufeName, $desc, $phone, $addressId, $schoolId, $payment, $avaliable, $bufeId]);

    return json_encode(['valasz' => $bufe], JSON_UNESCAPED_UNICODE);
}

?>
