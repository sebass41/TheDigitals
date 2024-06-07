<?php

require_once "../conexion/conexion.php";

class usuario{

    //Obtener los datos de los usuarios
    function obtenerUsuarioModelo(){
        $connection = conection();
        $sql = "SELECT * FROM usuario";
        $respuesta = $connection->query($sql);
        $usuario = $respuesta->fetch_all(MYSQLI_ASSOC);
        return $usuario;
    }

    
}
?>