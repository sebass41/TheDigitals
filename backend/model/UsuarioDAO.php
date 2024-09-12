<?php

require_once "../conexion/Conexion.php";
require_once "res/Respuesta.php";

ini_set('display_errors', '0');
ini_set('display_startup_errors', '0');

ini_set('log_errors', 1);
ini_set('error_log', '../log/php_errors.log');

class Usuario{

    function obtener(){
        try{
            $connection = conection();
            $sql = "SELECT * FROM usuario;";
            $respuesta = $connection->query($sql);
            $personas = $respuesta->fetch_all(MYSQLI_ASSOC);
            
            $msj = "Usuarios obtenidos correctamente";
            return new Respuesta(true, $msj, $personas);
        }catch(Exception $e){
            $msj = $e->getMessage();
            return new Respuesta(false, $msj, []);
        }
    }

    function registrar($nombre, $apellido, $tel, $calle, $num, $piso, $pass, $mail){
        try{
            $connection = conection();
            $sql = "INSERT INTO usuario (Nombre, Apellido, Tel, Calle, Num, Piso, Contraseña, Mail) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $connection->prepare($sql);
            $stmt->bind_param("ssisiss", $nombre, $apellido, $tel, $apodo, $calle, $num, $piso, $pass, $mail);
            $stmt->execute();

            $msj = "Se ingresó correctamente el Usuario";
            return new Respuesta(true, $msj, $stmt);
        }catch(Exception $e){
            $msj = "Error al ingresar el Usuario:". $e->getMessage();
            return new Respuesta(false, $msj, []);
        }
    }

    function actualizar($id, $nombre, $apellido, $tel, $apodo, $calle, $num, $piso, $pass, $mai){
        try{
            $connection = conection();
            $sql = "UPDATE usuario SET Nombre = ?, ";
            $respuesta = $connection->query($sql);
            return $respuesta;
        }catch (Exception $e){
            $msj = "Error: " . $e;
            return new Respuesta(false, $msj, []);
        }
    }

    function eliminar($id){
        try{
            $connection = conection();
            $sql = "DELETE FROM usuario WHERE id_Usuario  = $id";
            $respuesta = $connection->query($sql);
            
            $msj = "Usuario eliminado correctamente";
            return new Respuesta(true, $msj, $respuesta);
    
        }catch(Exception $e){
            $msj = "Error al eliminar el Usuario:". $e->getMessage();
            return new Respuesta(false, $msj, []);
        }
    }
    

}

?>