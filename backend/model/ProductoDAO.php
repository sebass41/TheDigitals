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

    function insertar($tipo, $nombre, $descripcion, $img, $precio){
        try{
            $connection = conection();

            $nomImg = $img['name'];
            $extencion = pathinfo($nomImg, PATHINFO_EXTENSION);
            
            $sql = "INSERT INTO producto(tipo, Nombre, Descripcion, extencion, precio) VALUES (?, ?, ?, ?, ?)";
            $stmt = $connection->prepare($sql);
            $stmt->bind_param("ssssi", $tipo, $nombre, $descripcion, $extencion, $precio);
            $stmt->execute();
            
            $id = $connection->insert_id;
            $rutaTemp = $img['tmp_name'];
            move_uploaded_file($rutaTemp, "../img/producto/$id.$extencion");

            $msj = "Se insertó correctamente";
            return new Respuesta(true, $msj, $stmt);
        }catch(Exception $e){
            $msj = "Error: " . $e->getMessage();
            return new Respuesta(false, $msj, []);
        }
    }

    function actualizar($idProducto, $tipo, $nombre, $descripcion, $img, $precio){
        try{
            $connection = conection();

            $nomImg = $img['name'];
            $extencion = pathinfo($nomImg, PATHINFO_EXTENSION);
            $rutaTemp = $img['tmp_name'];

            $sql = "UPDATE producto SET tipo = ?, Nombre = ?, Descripcion = ?, precio = ? WHERE Id_prod = ?";
            $stmt = $connection->prepare($sql);
            $stmt->bind_param("sssii", $tipo, $nombre, $descripcion, $precio, $idProducto);
            
            if ($stmt->execute()) {
                $nombreImg = $idProducto . '.' . $extencion;
                move_uploaded_file($rutaTemp, "../img/productos" . $nombreImg);
            }

            $msj = "Se actualizaron los datos correctamente";
            return new Respuesta(true, $msj, $stmt);
        }catch (Exception $e) {
            $msj = "Error: ".$e->getMessage();
            return new Respuesta(false, $msj, []);
        }    
    }

    function eliminar($idProducto){
        try{
            $connection = conection();
            $sql = "DELETE FROM `producto` WHERE Id_prod = ?";
            $stmt = $connection->prepare($sql);
            $stmt->bind_param('i', $idProducto);
            $stmt->execute();

            $msj = "Se eliminó el producto correctamente";
            return new Respuesta(true, $msj, $stmt);
        }catch (Exception $e) {
            $msj = "Error:".$e->getMessage();
            return new Respuesta(false, $msj, []);
        }
            
    }
}

?>