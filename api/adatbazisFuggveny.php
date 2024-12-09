<?php
    function lekeres($muvelet, $tipus = null, $adatok = null){
        $db = new mysqli('localhost', 'root', '', 'bufego');
    
        if($db->connect_errno != 0){
            return $db->connect_error;
        }
    
        if(!is_null($tipus) && !is_null($adatok)){
            if(strlen($tipus) != count($adatok)){
                return 'Nem megfelelő számú adat vagy típús!';
            }
            $stmt = $db->prepare($muvelet);
            $stmt->bind_param($tipus, ...$adatok);
            $stmt->execute();
            $eredmeny = $stmt->get_result();
        }else{
            $eredmeny = $db->query($muvelet);
        }
    
        if($db->errno != 0){
            return $db->error;
        }
    
        if($eredmeny->num_rows == 0){
            return 'Nincsenek találatok!';
        }
    
        $eremdneyek = $eredmeny->fetch_all(MYSQLI_ASSOC);
        return $eremdneyek;
    }

    function valtoztatas($muvelet, $tipus = null, $adatok = null)
    {
        $db = new mysqli('localhost', 'root', '', 'bufego');
    
        if($db->connect_errno != 0){
            return $db->connect_error;
        }
    
        if(!is_null($tipus) && !is_null($adatok)){
            if(strlen($tipus) != count($adatok)){
                return 'Nem megfelelő számú adat vagy típús!';
            }
            $stmt = $db->prepare($muvelet);
            $stmt->bind_param($tipus, ...$adatok);
            $stmt->execute();
        }else{
            $db->query($muvelet);
        }
    
        if($db->errno != 0){
            return $db->error;
        }
    
        if($db->affected_rows == 0){
            return "Sikertelen művelet!";
        }
    
        return "Sikeres művelet!";
    }
?>