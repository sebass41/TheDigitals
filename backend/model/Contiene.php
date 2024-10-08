<?php

require_once "../conexion/Conexion.php"; // Incluye el archivo de conexión a la base de datos
require_once "res/Respuesta.php"; // Incluye el archivo que contiene la clase Respuesta

// Configuración para la gestión de errores
ini_set('display_errors', '0'); // Desactiva la visualización de errores en pantalla
ini_set('display_startup_errors', '0'); // Desactiva la visualización de errores de inicio
ini_set('log_errors', 1); // Activa el registro de errores
ini_set('error_log', '../log/php_errors.log'); // Especifica el archivo de registro de errores

// Definición de la clase Contiene
class Contiene{

    // Función para obtener todos los registros de la tabla 'contiene'
    function obtener(){
        $connection = conection(); // Establece la conexión a la base de datos
        $sql = "SELECT * FROM contiene"; // Consulta SQL para obtener todos los registros de la tabla 'contiene'
        $respuesta = $connection->query($sql); // Ejecuta la consulta
        $pedidos = $respuesta->fetch_all(MYSQLI_ASSOC); // Obtiene los resultados en un array asociativo
        
        if ($respuesta) {
            $msj = "Datos obtenidos correctamente"; // Mensaje de éxito
            return new Respuesta(true, $msj, $pedidos); // Devuelve una instancia de Respuesta con los datos obtenidos
        } else {
            $msj = "No se pudieron obtener los datos"; // Mensaje de error
            return new Respuesta(false, $msj, []); // Devuelve una instancia de Respuesta con el error
        }
    }

    // Función para insertar un nuevo registro en la tabla 'contiene'
    function insertar($id, $idProducto, $idPedido, $detalle, $costo, $cantidad){
        $connection = conection(); // Establece la conexión a la base de datos
        // Consulta SQL para insertar un nuevo registro en la tabla 'contiene'
        $sql = "INSERT INTO contiene VALUES ($id, $idProducto, $idPedido, '$detalle', $costo, $cantidad)";
        $respuesta = $connection->query($sql); // Ejecuta la consulta

        if ($respuesta) {
            $msj = "Datos insertados correctamente"; // Mensaje de éxito
            return new Respuesta(true, $msj, $respuesta); // Devuelve una instancia de Respuesta con el resultado de la inserción
        } else {
            $msj = "No se pudieron insertar los datos"; // Mensaje de error
            return new Respuesta(false, $msj, []); // Devuelve una instancia de Respuesta con el error
        }
    }

    // Función para actualizar un registro existente en la tabla 'contiene'
    function actualizar($id, $idProducto, $idPedido, $detalle, $costo, $cantidad){
        $connection = conection(); // Establece la conexión a la base de datos
        // Consulta SQL para actualizar un registro en la tabla 'contiene'
        $sql = "UPDATE contiene SET id_producto = $idProducto, id_pedido = $idPedido, detalle = '$detalle', costo = $costo, cantidad = $cantidad WHERE id = $id";
        $respuesta = $connection->query($sql); // Ejecuta la consulta

        if ($respuesta) {
            $msj = "Datos actualizados correctamente"; // Mensaje de éxito
            return new Respuesta(true, $msj, $respuesta); // Devuelve una instancia de Respuesta con el resultado de la actualización
        } else {
            $msj = "No se pudieron actualizar los datos"; // Mensaje de error
            return new Respuesta(false, $msj, []); // Devuelve una instancia de Respuesta con el error
        }
    }


    // Función para eliminar un registro de la tabla 'compra'
    function eliminar($idPedido){
        $connection = conection(); // Establece la conexión a la base de datos
        // Consulta SQL para eliminar un registro de la tabla 'compra'
        $sql = "DELETE FROM compra WHERE id_compra = $idPedido";
        $respuesta = $connection->query($sql); // Ejecuta la consulta
        
        if ($respuesta) {
            $msj = "Datos eliminados correctamente"; // Mensaje de éxito
            return new Respuesta(true, $msj, $respuesta); // Devuelve una instancia de Respuesta con el resultado de la eliminación
        } else {
            $msj = "No se pudieron eliminar los datos"; // Mensaje de error
            return new Respuesta(false, $msj, []); // Devuelve una instancia de Respuesta con el error
        }
    }

}

?>