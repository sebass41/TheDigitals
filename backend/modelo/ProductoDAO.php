<?php

require_once "../conexion/conexion.php";

class Producto{

    function obtener(){
        $connection = conection();
        $sql = "SELECT * FROM producto";
        $respuesta = $connection->query($sql);
        $productos = $respuesta->fetch_all(MYSQLI_ASSOC);
        return $productos;
    }

    function insertar($id_producto, $tipo, $nombre, $descripcion){
        $connection = conection();
        $sql = "INSERT INTO producto VALUES ($id_producto, $tipo, $nombre, $descripcion)";
        $respuesta = $connection->query($sql);
        return $respuesta;
    }
}

?>