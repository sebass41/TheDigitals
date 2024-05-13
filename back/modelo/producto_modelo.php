<?php

require_once "../conexion/conexion.php";

class producto{

    //Obtener los datos de los productos
    function obtenerProductoModelo(){
        $connection = conection();
        $sql = "SELECT * FROM producto";
        $respuesta = $connection->query($sql);
        $producto = $respuesta->fetch_all(MYSQLI_ASSOC);
        return $producto;
    }

    
}
?>