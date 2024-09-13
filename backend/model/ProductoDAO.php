<?php

require_once "../conexion/Conexion.php";
require_once "res/Respuesta.php";

ini_set('display_errors', '0');
ini_set('display_startup_errors', '0');

ini_set('log_errors', 1);
ini_set('error_log', '../log/php_errors.log');

class Producto{

    function obtener(){
        try{
            $connection = conection();
            $sql = "SELECT * FROM producto";
            $respuesta = $connection->query($sql);
            $productos = $respuesta->fetch_all(MYSQLI_ASSOC);

            $msj = "Se obtuvieron los productos correctamente";
            return new Respuesta(true, $msj, $productos);
        }catch (Exception $e){
            $msj = "No se pudieron obtener los datos";
            return new Respuesta(false, $msj, []);
        }
    }

    function obtenerProducto($id){
        try{
            $connection = conection();
            $sql = "SELECT * FROM producto WHERE id_Prod = ?";
            $stmt = $connection->prepare($sql);
            $stmt->bind_param('i', $id);
            $stmt->execute();

            $respuesta = $stmt->get_result();
            $producto = $respuesta->fetch_all(MYSQLI_ASSOC);

            $msj = "Producto obtenido correctamente";
            return new Respuesta(true, $msj, $producto);
        }catch (Exception $e){
            $msj = "Error: " . $e;
            return new Respuesta(false, $msj, []);
        }
    }

    function insertar($tipo, $nombre, $descripcion, $categoria, $img, $precio, $idPedido){
        $connection = conection();

        $nomImg = $img['name'];
        $extencion = pathinfo($nomImg, PATHINFO_EXTENSION);
        
        $sql = "INSERT INTO producto VALUES ()";
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