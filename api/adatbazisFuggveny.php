<?php
    function lekeres($query)
    {
        $db=new mysqli("localhost", "root", "", "bufego");
        if($db->connect_errno == 0)
        {
            $response = $db->query($query);
            if($db->errno == 0)
            {
                if($response->num_rows > 0)
                {
                    $data = $response->fetch_all(MYSQLI_ASSOC);
                    return $data;
                }
                else
                {
                    return "Nincs találat";
                }
            }
            else
            {
                return $db->error;
            }
        }
        else
        {
            return $db->connect_error;
        }
    }

    function valtoztatas($query)
    {
        $db=new mysqli("localhost", "root", "", "bufego");
        if($db->connect_errno == 0)
        {
            $response = $db->query($query);
            if($db->errno == 0)
            {
                if($db->affected_rows > 0)
                {
                    if(!empty($db->insert_id)){
                        return $db->insert_id;
                    } else{
                        return "Sikeres módosítás";
                    }
                }
                else if($db->affected_rows == 0)
                {
                    return "Sikertelen müvelet!";
                }
                else
                {
                    return $db->error;
                }
            }
            else
            {
                return $db->error;
            }
        }
        else
        {
            return $db->connect_error;
        }
    }
?>