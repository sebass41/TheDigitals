<?php

require_once "../conexion/conexion.php"; 

class compra{

    //Obtener los datos de las compras
    function obtenerCompraModelo(){
        $connection = conection();
        $as = 1;
        $sql = "SELECT * FROM compra";
        $respuesta = $connection->query($sql);
        $compra = $respuesta->fetch_all(MYSQLI_ASSOC);
        return $compra; 

    }

    
}
?>