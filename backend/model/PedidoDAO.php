<?php

require_once "../conexion/Conexion.php";
require_once "res/Respuesta.php";

ini_set('display_errors', '0');
ini_set('display_startup_errors', '0');

ini_set('log_errors', 1);
ini_set('error_log', '../log/php_errors.log');

Class Pedido{

    function obtener(){
        $connection = conection();
        $sql = "SELECT * FROM pedido";
        $respuesta = $connection->query($sql);
        $pedidos = $respuesta->fetch_all(MYSQLI_ASSOC);
        
        if ($respuesta) {
            $msj = "Datos obtenidos correctamente";
            return new Respuesta(true, $msj, $pedidos);
        }else {
            $msj = "No se pudieron obtener los datos";
            return new Respuesta(false, $msj, []);
        }
    }

    function hacerPedido($calle, $num, $piso, $estado, $fecha, $lugarRetiro, $idUsuario){
        try{
            $connection = conection();
            $sql = "INSERT INTO pedido(Calle, Num_casa, Estado, Fecha, Lugar_retiro, Id_Usuario) VALUES (?, ?, ?, ?, ?, ?)";
            


        }catch (Exception $e){
            $msj = "Error: " . $e;
            return new Respuesta(false, $msj, []);
            }
    }

    function eliminar($idPedido){
        $connection = conection();
        $sql = "DELETE FROM compra WHERE id_compra = $idPedido";
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