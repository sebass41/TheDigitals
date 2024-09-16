<?php
require_once "../conexion/Conexion.php";
require_once "res/Respuesta.php";

ini_set('display_errors', '0');
ini_set('display_startup_errors', '0');
ini_set('log_errors', 1);
ini_set('error_log', '../log/php_errors.log');

class Sesion {

    function iniciarSesion($email, $pass) {
        try {
            $connection = conection();
            $sql = "SELECT * FROM usuario WHERE mail = ?";
            $stmt = $connection->prepare($sql);
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $respuesta = $stmt->get_result();
            $usr = $respuesta->fetch_assoc();

            if ($usr) { // Si devuelve un usuario
                $pas = $usr['contraseña'];
                if (password_verify($pass, $pas)) { // Verifica la contraseña
                    $msj = "Inicio de sesión exitoso";
                    return new Respuesta(true, $msj, $usr);
                } else {
                    $msj = "Contraseña incorrecta";
                    return new Respuesta(false, $msj, []);
                }
            } else {
                $msj = "Usuario no encontrado";
                return new Respuesta(false, $msj, []);
            }

        } catch (Exception $e) {
            $msj = "Error: " . $e->getMessage();
            return new Respuesta(false, $msj, []);
        }
    }
}
?>
