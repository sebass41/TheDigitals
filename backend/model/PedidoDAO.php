<?php

require_once "../conexion/Conexion.php";

Class Pedido{

    function obtener(){
        $connection = conection();
        $sql = "SELECT * FROM pedido";
        $respuesta = $connection->query($sql);
        $pedidos = $respuesta->fetch_all(MYSQLI_ASSOC);
        return $pedidos;
    }

    function insertar($calle, $num, $estado, $fecha, $fechaEnvio, $lugarRetiro, $idUsuario){
        
    }
}

?>