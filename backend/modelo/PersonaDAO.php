<?php

require_once "../conexion/conexion.php";

class Persona{

    function obtener(){
        $connection = conection();
        $sql = "SELECT * FROM persona;";
        $respuesta = $connection->query($sql);
        $personas = $respuesta->fetch_all(MYSQLI_ASSOC);
        return $personas;
    }

    function insertar($nombre, $apellido, $tel, $apodo, $calle, $numero){
        $connection = conection();
        $sql = "INSERT FROM persona VALUES (0, $nombre, $apellido, $tel, $apodo, $calle, $numero)";
        $respuesta = $connection->query($sql);
        return $respuesta;
    }

    function modificar($id_persona, $nombre, $apellido, $tel, $apodo, $calle, $numero){
        $connection = conection();
        $sql = "UPDATE persona SET nombre = $nombre, apellido = $apellido, tel = $tel, apodo = $apodo, calle = $calle, numero = $numero WHERE id_Persona = $id_persona";
        $respuesta = $connection->query($sql);
        return $respuesta;
    }

    function eliminar($id_persona){
        $connection = conection();
        $sql = "DELETE FROM persona WHERE id_Persona  = $id_persona";
        $respuesta = $connection->query($sql);
        return $respuesta;
    }

    

}

?>