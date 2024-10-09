<?php

require_once "../conexion/Conexion.php"; // Incluye el archivo de conexión a la base de datos
require_once "res/Respuesta.php"; // Incluye el archivo que contiene la clase Respuesta

// Configuración para la gestión de errores
ini_set('display_errors', '0'); // Desactiva la visualización de errores en pantalla
ini_set('display_startup_errors', '0'); // Desactiva la visualización de errores de inicio
ini_set('log_errors', 1); // Activa el registro de errores
ini_set('error_log', '../log/php_errors.log'); // Especifica el archivo de registro de errores

class Usuario{

    function obtener() {
        try {
            // Establecer una conexión a la base de datos
            $connection = conection();
    
            // Consulta SQL para obtener todos los usuarios
            $sql = "SELECT * FROM usuario;";
            $respuesta = $connection->query($sql);
            
            // Obtener todos los usuarios como un array asociativo
            $personas = $respuesta->fetch_all(MYSQLI_ASSOC);
            
            // Mensaje de éxito al obtener los usuarios
            $msj = "Usuarios obtenidos correctamente";
            return new Respuesta(true, $msj, $personas);
        } catch (Exception $e) {
            // Manejar excepciones y registrar errores
            $msj = $e->getMessage();
            return new Respuesta(false, $msj, []);
        }
    }
    

    function registrar($nombre, $apellido, $tel, $calle, $num, $piso, $pass, $mail) {
        try {
            $connection = conection();
            $sql = "INSERT INTO usuario (Nombre, Apellido, Tel, Calle, Numero, Piso, Contraseña, Mail) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $connection->prepare($sql);
            $stmt->bind_param("ssisssss", $nombre, $apellido, $tel, $calle, $num, $piso, $pass, $mail);
            $stmt->execute();
            
            $msj = "Se ingresó correctamente el Usuario";
            return new Respuesta(true, $msj, $stmt);
        } catch (mysqli_sql_exception $e) {
            $msj = "Error: " . $e->getMessage();
            return new Respuesta(false, $msj, []);
        }
    }
    

    function actualizar($idUsuario, $nombre, $apellido, $tel, $calle, $num, $piso){
        try{
            $connection = conection();
            $sql = "UPDATE usuario SET Nombre = ?, Apellido = ?, Tel = ?, Calle = ?, Numero = ?
                    WHERE Id_usuario = ?;";
            $stmt = $connection->prepare($sql);
            $stmt->bind_param("ssisisi", $nombre, $apellido, $tel, $calle, $num, $piso, $idUsuario);
            if(!$stmt->execute()){
                throw new Exception ("Error: ". $stmt->error);
                return new Respuesta(false, $msj, []);
            }

            $msj = "Se actualizaron los datos correctamente";
            return new Respuesta(true, $msj, $stmt);
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