<?php

include './db.php';

function kategoriakLekerese($bufeId)
{
    $query = "SELECT * FROM `categories` WHERE `place_id` = {$bufeId};";

    $kategoriak = lekeres($query, 'bufego');

    if (is_array($kategoriak)) {
        return $kategoriak;
    } else {
        return json_encode(['valasz' => $kategoriak], JSON_UNESCAPED_UNICODE);
    }
}

function kategoriaModosit($katId, $katName)
{
    $query = "UPDATE `categories` SET `categroy_name` = '{$katName}' WHERE `categories`.`id` = {$katId};";

    $kategoriak = valtoztatas($query, 'bufego');

    return json_encode(['valasz' => $kategoriak], JSON_UNESCAPED_UNICODE);
}

function kategoriaFeltolt($katId, $bufeId, $katName)
{
    $query = "INSERT INTO `categories`(`id`, `place_id`, `categroy_name`) VALUES ('{$katId}','{$bufeId}','{$katName}');";

    $kategoriak = valtoztatas($query, 'bufego');

    return json_encode(['valasz' => $kategoriak], JSON_UNESCAPED_UNICODE);
}

function kategoriaTorol($katId)
{
    $check = lekeres("SELECT * FROM categories WHERE id = {$katId};", "bufego");
    if (is_array($check)) {
        $query = "DELETE FROM `categories` WHERE `id` = $katId;";
        $kategoriak = valtoztatas($query, 'bufego');
        return json_encode(['valasz' => $kategoriak], JSON_UNESCAPED_UNICODE);
    } else {
        return json_encode(['valasz' => "Nincs ilyen kategória!"], JSON_UNESCAPED_UNICODE);
    }
}
