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

    function obtenerUsuario($idUsuario){
        try {
            $connection = conection();
            $sql = "SELECT * FROM usuario WHERE Id_usuario = ?;";
            $stmt = $connection->prepare($sql);
            $stmt->bind_param("i", $idUsuario);
            $stmt->execute();
            $respuesta = $stmt->get_result();
            $persona = $respuesta->fetch_all(MYSQLI_ASSOC);
            
            if ($persona == null){
                $msj = "Usuario no encontrado";
                return new Respuesta(false, $msj, []);
            }
            
            $msj = "Usuario obtenido correctamente";
            return new Respuesta(true, $msj, $persona);
        } catch (Exception $e) {
            $msj = "Error: ". $e->getMessage();
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
            $sql = "UPDATE usuario SET Nombre = ?, Apellido = ?, Tel = ?, Calle = ?, Numero = ?, Piso = ?
                    WHERE Id_usuario = ?;";
            $stmt = $connection->prepare($sql);
            $stmt->bind_param("ssisisi", $nombre, $apellido, $tel, $calle, $num, $piso, $idUsuario);
            if(!$stmt->execute()){
                throw new Exception ("Error: ". $stmt->error);
            }
            if ($stmt->affected_rows === 0) { // Verifica si no se afectó ninguna fila
                throw new Exception("Error: ". $stmt->error);
            }

            $msj = "Se actualizaron los datos correctamente";
            return new Respuesta(true, $msj, $stmt);
        }catch (Exception $e){
            $msj = "Error: " . $e;
            return new Respuesta(false, $msj, []);
        }
    }

    function eliminar($id) {
        try {
            $connection = conection();
            
            // Iniciar transacción para asegurar que todas las operaciones se ejecuten de forma atómica
            $connection->begin_transaction();
    
            // 1. Eliminar registros de la tabla `contiene` relacionados a los pedidos del usuario
            $sql = "DELETE c FROM contiene c 
                    JOIN pedido p ON c.Id_pedido = p.Id_pedido
                    WHERE p.Id_Usuario = ?";
            $stmt = $connection->prepare($sql);
            $stmt->bind_param("i", $id);
            if (!$stmt->execute()) {
                throw new Exception("Error al eliminar productos de los pedidos del usuario: " . $stmt->error);
            }
    
            // 2. Eliminar los pedidos del usuario
            $sql = "DELETE FROM pedido WHERE Id_Usuario = ?";
            $stmt = $connection->prepare($sql);
            $stmt->bind_param("i", $id);
            if (!$stmt->execute()) {
                throw new Exception("Error al eliminar pedidos del usuario: " . $stmt->error);
            }
    
            // 3. Finalmente, eliminar al usuario
            $sql = "DELETE FROM usuario WHERE Id_usuario = ?";
            $stmt = $connection->prepare($sql);
            $stmt->bind_param("i", $id);
            if (!$stmt->execute()) {
                throw new Exception("Error al eliminar el usuario: " . $stmt->error);
            }
    
            // Confirmar la transacción si todo ha ido bien
            $connection->commit();
    
            $msj = "Usuario y toda la información relacionada eliminados correctamente";
            return new Respuesta(true, $msj, []);
        
        } catch (Exception $e) {
            // En caso de error, revertir los cambios
            $connection->rollback();
            $msj = "Error al eliminar el Usuario y su información: " . $e->getMessage();
            return new Respuesta(false, $msj, []);
        }
    }
    
    function editarU($id, $columna, $valor){
        try{
            $connection = conection();
            $sql = "UPDATE usuario SET $columna =? WHERE Id_usuario =?";
            $stmt = $connection->prepare($sql);
            $stmt->bind_param("si", $valor, $id);
            
            if(!$stmt->execute()){
                throw new Exception ("Error: ". $stmt->error);
            }

            $msj = "Se actualizó la información correctamente";
            return new Respuesta(true, $msj, $stmt);
        }catch (Exception $e){
            $msj = "Error: ". $e;
            return new Respuesta(false, $msj, []);
        }
    }

    function enviarCorreoRestablecerPassword($mail) {
        try {
            $connection = conection();
            
            // Generar token de restablecimiento de contraseña
            $token = bin2hex(random_bytes(16));
            
            // Obtener datos del usuario
            $sql = "SELECT * FROM usuario WHERE Mail = ?";
            $stmt = $connection->prepare($sql);
            $stmt->bind_param("s", $mail);
            $stmt->execute();
            $respuesta = $stmt->get_result();
            $usuario = $respuesta->fetch_assoc();
            $idUsuario = $usuario['Id_usuario'];
            
            if (!$usuario) {
                return new Respuesta(false, "Usuario no encontrado", []);
            }
    
            // Guardar el token en la base de datos
            if (!$this->guardarToken($token, $idUsuario)) {
                return new Respuesta(false, "Error al generar el token para restablecer la contraseña", []);
            }
            
            // Configurar el correo
            $host = "localhost/TheDigitals/frontend/page/resetPassword/resetPass.html";
            $url = "$host?get=resetPassword&token=$token";
            $correo = $usuario['Mail'];
            $asunto = "Cambio de contraseña";
            $mensaje = "Hola {$usuario['Nombre']} {$usuario['Apellido']}. El token:$token para cambiar tu contraseña haz clic en el siguiente enlace: $url";
            
            // Enviar el correo
            $request = mail($usuario['Mail'], $asunto, $mensaje, $correo);
            
            if ($request) {
                return new Respuesta(true, "Se envió un correo para restablecer la contraseña", null);
            } else {
                return new Respuesta(false, "Error al enviar el correo para restablecer la contraseña", null);
            }
        } catch (Exception $e) {
            return new Respuesta(false, "Error: " . $e->getMessage(), []);
        }
    }
    function guardarToken($token, $idUsuario) {
        try {
            $connection = conection();
            $sql = "UPDATE usuario SET token = ? WHERE Id_usuario = ?";
            $stmt = $connection->prepare($sql);
            $stmt->bind_param("si", $token, $idUsuario);
            $stmt->execute();
    
            return new Respuesta(true, "Token guardado correctamente", null);
        } catch (Exception $e) {
            return new Respuesta(false, "Error al guardar el token: " . $e->getMessage(), []);
        }
    }
    
    
    function restablecerPassword($pass, $token){
        try {
            $connection = conection();
            $sql = "UPDATE usuario SET contraseña = ? WHERE token = ?";
            $stmt = $connection->prepare($sql);
            $stmt->bind_param("ss", $pass, $token);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                $this->eliminarToken($token);
                return new Respuesta(true, "Contraseña restablecida correctamente", null);
            } else {
                return new Respuesta(false, "Token inválido o contraseña ya restablecida", null);
            }
        }catch (Exception $e) {
            return new Respuesta(false, "Error: ". $e->getMessage(), []);   
        }
    }

    function buscarPorToken($token){
        try{
            $connection = conection();
            $sql = "SELECT * FROM usuario WHERE token =?";
            $stmt = $connection->prepare($sql);
            $stmt->bind_param("s", $token);
            $stmt->execute();
            $respuesta = $stmt->get_result();
            $usuario = $respuesta->fetch_assoc();

            if (!$usuario) {
                return new Respuesta(false, "Token inválido", null);
            }
            return new Respuesta(true, "Token válido", $token);
        }catch (Exception $e){
            return new Respuesta(false, "Error: ". $e->getMessage(), []);
        }
    }

    function eliminarToken($token){
        try{
            $connection = conection();
            $sql = "UPDATE usuario SET token = NULL WHERE token =?";
            $stmt = $connection->prepare($sql);
            $stmt->bind_param("s", $token);
            $stmt->execute();
        }catch (Exception $e){
            return new Respuesta(false, "Error: ". $e->getMessage(), []);
        }
    }
    
}

?>