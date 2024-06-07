<?php

require_once "../conexion/conexion.php";

class cliente{

    function obtener(){
        $conncection = conection();
        $sql = "SELECT * FROM cliente;";
        $respuesta = $conncection->query($sql);
        $clientes = $respuesta->fetch_all(MYSQLI_ASSOC);
        return $clientes;
    }


}

?>