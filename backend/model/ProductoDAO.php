<?php

require_once "../conexion/Conexion.php";

class Producto{

    function obtener(){
        $connection = conection();
        $sql = "SELECT * FROM producto";
        $respuesta = $connection->query($sql);
        $productos = $respuesta->fetch_all(MYSQLI_ASSOC);

        if ($respuesta) {
            $msj = "Datos obtenidos correctamente";
            return new Respuesta(true, $msj, $productos);
        }else {
            $msj = "No se pudieron obtener los datos";
            return new Respuesta(false, $msj, []);
        }
        
    }

    function insertar($id_producto, $tipo, $nombre, $descripcion, $categoria, $extencion, $precio, $id_pedido){
        $connection = conection();
        $sql = "INSERT INTO producto VALUES ($id_producto, $tipo, $nombre, $descripcion, $categoria, $extencion, $precio, $id_pedido)";
        $respuesta = $connection->query($sql);
        return $respuesta;
    }

    function actualizar($id_producto, $tipo, $nombre, $descripcion, $categoria, $extencion, $precio, $id_pedido){
        $connection = conection();
        $sql = "UPDATE TABLE producto
        SET Tipo = '$tipo', Nombre = '$nombre', Descripcion = '$descripcion', Categoria = '$categoria', Extencion = '$extencion  ";
    }
}

?>