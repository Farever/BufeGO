<?php
    function lekeres($query, $database)
    {
        $db= new mysqli("localhost", "root", "", $database);
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

    function valtoztatas($queryIn, $database)
    {
        $db= new mysqli("localhost", "root", "", $database);
        if($db->connect_errno == 0)
        {
            $db -> query("SET FOREIGN_KEY_CHECKS=0;");
            $db->query($queryIn);
            if($db->errno == 0)
            {
                if($db->affected_rows > 0)
                {
                    return "Sikeres módosítás!";
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
            $db -> query("SET FOREIGN_KEY_CHECKS=1;");
        }
        else
        {
            return $db->connect_error;
        }
    }

    function beszuras($query, $database){
        $db= new mysqli("localhost", "root", "", $database);
        if($db->connect_errno == 0)
        {
            $db -> query("SET FOREIGN_KEY_CHECKS=0;");
            $db->query($query);
            if($db->errno == 0)
            {
                if($db->affected_rows > 0)
                {
                    return $db->insert_id;
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
            $db -> query("SET FOREIGN_KEY_CHECKS=1;");
        }
        else
        {
            return $db->connect_error;
        }
    }
?>