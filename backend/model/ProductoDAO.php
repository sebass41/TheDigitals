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

    function insertar($idProducto, $tipo, $nombre, $descripcion, $categoria, $img, $precio, $idPedido){
        $connection = conection();

        $nomImg = $img['name'];
        $extencion = pathinfo($nomImg, PATHINFO_EXTENSION);
        
        $sql = "INSERT INTO producto VALUES ($idProducto, $tipo, $nombre, $descripcion, $categoria, $extencion, $precio, $idPedido)";
        $respuesta = $connection->query($sql);
        
        $id = $connection->insert_id;
        $rutaTemp = $img['tmp_name'];
        move_uploaded_file($rutaTemp, "../img/$id.$extencion");

        if ($respuesta) {
            $msj = "Datos insertados correctamente";
            return new Respuesta(true, $msj, $respuesta);
        }else {
            $msj = "No se pudieron insertar los datos";
            return new Respuesta(false, $msj, []);
        }
    }

    function actualizar($idProducto, $tipo, $nombre, $descripcion, $categoria, $img, $precio, $idPedido){
        $connection = conection();

        $nomImg = $img['name'];
        $extencion = pathinfo($nomImg, PATHINFO_EXTENSION);

        $sql = "UPDATE TABLE producto
        SET Tipo = '$tipo', Nombre = '$nombre', Descripcion = '$descripcion', Categoria = '$categoria', Extencion = '$extencion, Precio = $precio, id_Pedido = $idPedido WHERE id_Prod = $idProducto";
        $respuesta = $connection->query($sql);

        $id = $connection->insert_id;
        $rutaTemp = $img['tmp_name'];
        move_uploaded_file($rutaTemp, "../img/$id.$extencion");

        if ($respuesta) {
            $msj = "Datos actualizados correctamente";
            return new Respuesta(true, $msj, $respuesta);
        }else {
            $msj = "No se pudieron actualizar los datos";
            return new Respuesta(false, $msj, []);
        }
    }

    function eliminar($idProducto){
        $connection = conection();
        $sql = "DELETE FROM compra WHERE id_compra = $idProducto";
        $respuesta = $connection->query($sql);
        
        if ($respuesta) {
            $msj = "Datos eliminados correctamente";
            return new Respuesta(true, $msj, $respuesta);
        }else {
            $msj = "No se pudieron eliminar los datos";
            return new Respuesta(false, $msj, []);
        }
    }
}

?>