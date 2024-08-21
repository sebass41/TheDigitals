<?php

require_once "../conexion/conexion.php";
require_once "res/Respuesta.php";

ini_set('display_errors', '0');
ini_set('display_startup_errors', '0');

ini_set('log_errors', 1);
ini_set('error_log', '../log/php_errors.log');

class Compra{

    function obtener(){
        $connection = conection();
        $sql = "SELECT * FROM compra";
        $respuesta = $connection->query($sql);
        $compras = $respuesta->fetch_all(MYSQLI_ASSOC);
        return $compras;
    }

    function insertar($costo, $cantidad, $fecha, $fecha_envio, $id_cliente, $id_producto, $id_envio){
        $connection = conection();
        $sql = "INSERT INTO compra VALUES(0, $costo, $cantidad, $fecha, $fecha_envio, $id_cliente, $id_producto, $id_envio)";
        $respuesta = $connection->query($sql );
        return $respuesta;
    }

    function actualizar($id_compra, $costo, $cantidad, $fecha, $fecha_envio, $id_cliente, $id_producto, $id_envio){
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
        return $respuesta;
    }

    function eliminar($id_compra){
        $connection = conection();
        $sql = "DELETE FROM compra WHERE id_compra = $id_compra";
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