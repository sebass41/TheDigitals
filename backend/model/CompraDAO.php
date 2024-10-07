<?php

require_once "../conexion/conexion.php"; // Incluye el archivo de conexión a la base de datos
require_once "res/Respuesta.php"; // Incluye el archivo que contiene la clase Respuesta

// Configuración para la gestión de errores
ini_set('display_errors', '0'); // Desactiva la visualización de errores en pantalla
ini_set('display_startup_errors', '0'); // Desactiva la visualización de errores de inicio
ini_set('log_errors', 1); // Activa el registro de errores
ini_set('error_log', '../log/php_errors.log'); // Especifica el archivo de registro de errores

// Definición de la clase Compra
class Compra{

    // Función para obtener todas las compras
    function obtener(){
        try{
            $connection = conection(); // Establece la conexión a la base de datos
            $sql = "SELECT * FROM compra"; // Consulta SQL para obtener todas las compras
            $respuesta = $connection->query($sql); // Ejecuta la consulta
            $compras = $respuesta->fetch_all(MYSQLI_ASSOC); // Obtiene los resultados en un array asociativo

            $msj = "Datos obtenidos correctamente"; // Mensaje de éxito
            return new Respuesta(true, $msj, $compras); // Devuelve una instancia de Respuesta con los datos obtenidos
        }catch (Exception $e){
            $msj = "Error: ".$e; // Mensaje de error
            return new Respuesta(false, $msj, []); // Devuelve una instancia de Respuesta con el error
        }
    }

    // Función para insertar una nueva compra
    function insertar($costo, $cantidad, $fecha, $fecha_envio, $id_cliente, $id_producto, $id_envio){
        try{
            $connection = conection(); // Establece la conexión a la base de datos
            // Consulta SQL para insertar una nueva compra
            $sql = "INSERT INTO compra VALUES(0, $costo, $cantidad, $fecha, $fecha_envio, $id_cliente, $id_producto, $id_envio)";
            $respuesta = $connection->query($sql); // Ejecuta la consulta

            $msj = "Se insertó correctamente"; // Mensaje de éxito
            return new Respuesta(true, $msj, $respuesta); // Devuelve una instancia de Respuesta con el resultado de la inserción
        }catch(Exception $e){
            $msj = "Error: ".$e; // Mensaje de error
            return new Respuesta(false, $msj, []); // Devuelve una instancia de Respuesta con el error
        }
    }


    // Función para actualizar una compra existente
    function actualizar($id_compra, $costo, $cantidad, $fecha, $fecha_envio, $id_cliente, $id_producto, $id_envio){
        try{
            $connection = conection(); // Establece la conexión a la base de datos
            // Consulta SQL para actualizar una compra
            $sql = "UPDATE compra SET costo = $costo, 
                                    cantidad = $cantidad, 
                                    fecha = $fecha, 
                                    fecha_envio = $fecha_envio, 
                                    id_cliente = $id_cliente, 
                                    producto = $id_producto, 
                                    id_envio = $id_envio 
                    WHERE id_compra = $id_compra";
            $respuesta = $connection->query($sql); // Ejecuta la consulta
            
            $msj = "Se actualizó correctamente"; // Mensaje de éxito
            return new Respuesta(true, $msj, $respuesta); // Devuelve una instancia de Respuesta con el resultado de la actualización
        }catch(Exception $e){
            $msj = "Error: ".$e; // Mensaje de error
            return new Respuesta(false, $msj, []); // Devuelve una instancia de Respuesta con el error
        }
    }
    
    // Función para eliminar una compra
    function eliminar($id_compra){
        try{
            $connection = conection(); // Establece la conexión a la base de datos
            // Consulta SQL para eliminar una compra
            $sql = "DELETE FROM compra WHERE id_compra = $id_compra";
            $respuesta = $connection->query($sql); // Ejecuta la consulta
    
            $msj = "Se eliminó correctamente"; // Mensaje de éxito
            return new Respuesta(true, $msj, $respuesta); // Devuelve una instancia de Respuesta con el resultado de la eliminación
        }catch(Exception $e){
            $msj = "Error: ".$e; // Mensaje de error
            return new Respuesta(false, $msj, []); // Devuelve una instancia de Respuesta con el error
        }
    }
    
}
?>