<?php

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
    $query = "UPDATE `categories` SET `categroy_name` = ? WHERE `categories`.`id` = ?;";

    $kategoriak = valtoztatas($query, 'si', [$katName, $katId]);

    return json_encode(['valasz' => $kategoriak], JSON_UNESCAPED_UNICODE);
}

function kategoriaFeltolt($bufeId, $katName)
{
    $query = "INSERT INTO `categories`(`place_id`, `categroy_name`) VALUES (?,?);";

    $kategoriak = valtoztatas($query, 'iis', [$bufeId, $katName]);

    return json_encode(['valasz' => $kategoriak], JSON_UNESCAPED_UNICODE);
}

function kategoriaTorol($katId)
{
    $check = lekeres("SELECT * FROM categories WHERE id = ?;", "i", [$katId]);
    if (is_array($check)) {
        $query = "UPDATE `categories` SET `deleted`='1' WHERE `id` = ? ";
        $kategoriak = valtoztatas($query, 'i', [$katId]);
        return json_encode(['valasz' => $kategoriak], JSON_UNESCAPED_UNICODE);
    } else {
        return json_encode(['valasz' => "Nincs ilyen kategória!"], JSON_UNESCAPED_UNICODE);
    }
}
