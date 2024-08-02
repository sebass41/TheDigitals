<?php

require_once "../conexion/Conexion.php";

class Persona{

    function obtener(){
        $connection = conection();
        $sql = "SELECT * FROM usuario;";
        $respuesta = $connection->query($sql);
        $personas = $respuesta->fetch_all(MYSQLI_ASSOC);
        return $personas;
    }

    function insertar($nombre, $apellido, $tel, $apodo, $calle, $numero, $pass, $mail, $admin){
        $connection = conection();
        $sql = "INSERT FROM usuario VALUES (0, $nombre, $apellido, $tel, $apodo, $calle, $numero, $pass, $mail, $admin)";
        $respuesta = $connection->query($sql);
        return $respuesta;
    }

    function modificar($id, $nombre, $apellido, $tel, $apodo, $calle, $numero, $pass, $mail){
        $connection = conection();
        $sql = "UPDATE usuario SET nombre = $nombre, apellido = $apellido, tel = $tel, apodo = $apodo, calle = $calle, numero = $numero, mail = $mail =  WHERE id_Usuario = $id";
        $respuesta = $connection->query($sql);
        return $respuesta;
    }

    function eliminar($id){
        $connection = conection();
        $sql = "DELETE FROM usuario WHERE id_Usuario  = $id";
        $respuesta = $connection->query($sql);
        return $respuesta;
    }

    

}

?>