<?php

require_once "../conexion/Conexion.php";

Class Contiene{

    function obtener(){
        $connection = conection();
        $sql = "SELECT * FROM contiene";
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

    function insertar($idProducto, $idPedido, $detalle, $costo, $cantidad){
        $connection = conection();
        $sql = "INSERT INTO contiene VALUES ($idProducto, $idPedido, $detalle, $costo, $cantidad)";
        $respuesta = $connection->query($sql);

        if ($respuesta) {
            $msj = "Datos insertados correctamente";
            return new Respuesta(true, $msj, $respuesta);
        }else {
            $msj = "No se pudieron insertar los datos";
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