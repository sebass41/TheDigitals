<?php

require_once "../conexion/conexion.php";
require_once "res/Respuesta.php";

ini_set('display_errors', '0');
ini_set('display_startup_errors', '0');

ini_set('log_errors', 1);
ini_set('error_log', '../log/php_errors.log');

class Compra{

    function obtener(){
        try{
            $connection = conection();
            $sql = "SELECT * FROM compra";
            $respuesta = $connection->query($sql);
            $compras = $respuesta->fetch_all(MYSQLI_ASSOC);

            $msj = "Datos obtenidos correctamente";
            return new Respuesta(true, $msj, $compras);
        }catch (Exception $e){
            $msj = "Error: ".$e;
            return new Respuesta(false, $msj, []);
        }
    }

    function insertar($costo, $cantidad, $fecha, $fecha_envio, $id_cliente, $id_producto, $id_envio){
        try{
            $connection = conection();
            $sql = "INSERT INTO compra VALUES(0, $costo, $cantidad, $fecha, $fecha_envio, $id_cliente, $id_producto, $id_envio)";
            $respuesta = $connection->query($sql);

            $msj = "Se insertó correctamente";
            return new Respuesta(false, $msj, $respuesta);
        }catch(Exception $e){
            $msj = "Error: ".$e;
            return new Respuesta(false, $msj, []);
        }
    }

    function actualizar($id_compra, $costo, $cantidad, $fecha, $fecha_envio, $id_cliente, $id_producto, $id_envio){
        try{
            $connection = conection();
            $sql = "UPDATE compra SET costo = $costo, 
                                    cantidad = $cantidad, 
                                    fecha = $fecha, 
                                    fecha_envio = $fecha_envio, 
                                    id_cliente = $id_cliente, 
                                    producto = $id_producto 
                                    id_envio = $id_envio 
                    WHERE id_compra = $id_compra";
            $respuesta = $connection->query($sql);
            
            $msj = "Se insertó correctamente";
            return new Respuesta(false, $msj, $respuesta);
        }catch(Exception $e){
            $msj = "Error: ".$e;
            return new Respuesta(false, $msj, []);
        }
    }

    function eliminar($id_compra){
        try{
            $connection = conection();
            $sql = "DELETE FROM compra WHERE id_compra = $id_compra";
            $respuesta = $connection->query($sql);

            $msj = "Se insertó correctamente";
            return new Respuesta(false, $msj, $respuesta);
        }catch(Exception $e){
            $msj = "Error: ".$e;
            return new Respuesta(false, $msj, []);
        }
    }

}

?>