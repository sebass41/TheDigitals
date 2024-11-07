<?php
require_once "../conexion/Conexion.php"; // Incluye el archivo de conexión a la base de datos
require_once "res/Respuesta.php"; // Incluye el archivo que contiene la clase Respuesta

// Configuración para la gestión de errores
ini_set('display_errors', '0'); // Desactiva la visualización de errores en pantalla
ini_set('display_startup_errors', '0'); // Desactiva la visualización de errores de inicio
ini_set('log_errors', 1); // Activa el registro de errores
ini_set('error_log', '../log/php_errors.log'); // Especifica el archivo de registro de errores

class Sesion {

    function iniciarSesion($email, $pass) {
        try {
            // Establecer una conexión a la base de datos
            $connection = conection();
    
            // Consulta SQL para seleccionar el usuario con el email proporcionado
            $sql = "SELECT * FROM usuario WHERE mail = ?";
            $stmt = $connection->prepare($sql);
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $respuesta = $stmt->get_result();
            $usr = $respuesta->fetch_assoc();
    
            if ($usr) { // Si se encuentra un usuario con el email proporcionado
                $pas = $usr['contraseña'];
                if (password_verify($pass, $pas)) { // Verifica la contraseña
                    $msj = "Inicio de sesión exitoso";
                    return new Respuesta(true, $msj, $usr);
                } else {
                    $msj = "La contraseña ingresada es incorrecta. Por favor, inténtalo de nuevo.";
                    return new Respuesta(false, $msj, []);
                }
            } else {
                $msj = "Asegurate de que el mail esté bien escrito y que esté registrado.";
                return new Respuesta(false, $msj, []);
            }
    
        } catch (Exception $e) {
            // Manejar excepciones y registrar errores
            $msj = "Error: " . $e->getMessage();
            return new Respuesta(false, $msj, []);
        }
    }
    
}
?>
