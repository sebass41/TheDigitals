<?php

require_once "../conexion/conexion.php"; 

class administrador{ 

    //FUnción para obtener los datos de los administradores
    function obtenerAdministradorModelo(){
        $connection = conection(); 
        $sql = "SELECT * FROM administrador"; 
        $respuesta = $connection->query($sql); 
        $admin = $respuesta->fetch_all(MYSQLI_ASSOC); 
        
        return $admin;
    }


}
?>