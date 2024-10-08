<?php

require_once "../conexion/Conexion.php"; // Incluye el archivo de conexión a la base de datos
require_once "res/Respuesta.php"; // Incluye el archivo que contiene la clase Respuesta

// Configuración para la gestión de errores
ini_set('display_errors', '0'); // Desactiva la visualización de errores en pantalla
ini_set('display_startup_errors', '0'); // Desactiva la visualización de errores de inicio
ini_set('log_errors', 1); // Activa el registro de errores
ini_set('error_log', '../log/php_errors.log'); // Especifica el archivo de registro de errores

class Producto{

    function obtener() {
        try {
            // Establecer una conexión a la base de datos
            $connection = conection();
    
            // Consulta SQL para obtener todos los productos
            $sql = "SELECT * FROM producto";
            $respuesta = $connection->query($sql);
            
            // Obtener todos los productos como un array asociativo
            $productos = $respuesta->fetch_all(MYSQLI_ASSOC);
    
            // Mensaje de éxito al obtener los productos
            $msj = "Se obtuvieron los productos correctamente";
            return new Respuesta(true, $msj, $productos);
        } catch (Exception $e) {
            // Manejar excepciones y registrar errores
            $msj = "No se pudieron obtener los datos";
            return new Respuesta(false, $msj, []);
        }
    }
    

    function insertar($tipo, $nombre, $descripcion, $img, $precio) {
        try {
            // Establecer una conexión a la base de datos
            $connection = conection();
    
            // Obtener el nombre de la imagen y su extensión
            $nomImg = $img['name'];
            $extencion = pathinfo($nomImg, PATHINFO_EXTENSION);
            
            // Consulta SQL para insertar un nuevo producto
            $sql = "INSERT INTO producto(tipo, Nombre, Descripcion, extencion, precio) VALUES (?, ?, ?, ?, ?)";
            $stmt = $connection->prepare($sql);
            $stmt->bind_param("ssssi", $tipo, $nombre, $descripcion, $extencion, $precio);
            $stmt->execute();
            
            // Obtener el ID del producto recién insertado
            $id = $connection->insert_id;
    
            // Mover la imagen subida a la carpeta de destino
            $rutaTemp = $img['tmp_name'];
            move_uploaded_file($rutaTemp, "../img/producto/$id.$extencion");
    
            // Mensaje de éxito al insertar el producto
            $msj = "Se insertó correctamente";
            return new Respuesta(true, $msj, $stmt);
        } catch (Exception $e) {
            // Manejar excepciones y registrar errores
            $msj = "Error: " . $e->getMessage();
            return new Respuesta(false, $msj, []);
        }
    }
    

function actualizar($idProducto, $tipo, $nombre, $descripcion, $img, $precio) {
    try {
        // Establecer una conexión a la base de datos
        $connection = conection();

        // Obtener el nombre de la imagen y su extensión
        $nomImg = $img['name'];
        $extencion = pathinfo($nomImg, PATHINFO_EXTENSION);
        $rutaTemp = $img['tmp_name'];

        // Consulta SQL para actualizar un producto existente
        $sql = "UPDATE producto SET tipo = ?, Nombre = ?, Descripcion = ?, precio = ? WHERE Id_prod = ?";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("sssii", $tipo, $nombre, $descripcion, $precio, $idProducto);
        
        // Ejecutar la consulta y verificar si hay errores
        if ($stmt->execute()) {
            // Si la consulta se ejecuta correctamente, mover la imagen subida a la carpeta de destino
            $nombreImg = $idProducto . '.' . $extencion;
            move_uploaded_file($rutaTemp, "../img/productos/" . $nombreImg);
        }

        // Mensaje de éxito al actualizar los datos
        $msj = "Se actualizaron los datos correctamente";
        return new Respuesta(true, $msj, $stmt);
    } catch (Exception $e) {
        // Manejar excepciones y registrar errores
        $msj = "Error: " . $e->getMessage();
        return new Respuesta(false, $msj, []);
    }    
}


function eliminar($idProducto) {
    try {
        // Establecer una conexión a la base de datos
        $connection = conection();

        // Consulta SQL para eliminar un producto
        $sql = "DELETE FROM `producto` WHERE Id_prod = ?";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param('i', $idProducto);
        $stmt->execute();

        // Mensaje de éxito al eliminar el producto
        $msj = "Se eliminó el producto correctamente";
        return new Respuesta(true, $msj, $stmt);
    } catch (Exception $e) {
        // Manejar excepciones y registrar errores
        $msj = "Error: " . $e->getMessage();
        return new Respuesta(false, $msj, []);
    }

    function obtenerMasVendido(){
        try{
            $connection = conection();
            $sql = "SELECT p.Nombre, SUM(c.Cantidad) AS total_vendidos
                    FROM contiene c
                    JOIN producto p ON c.Id_producto = p.Id_prod
                    GROUP BY p.Nombre
                    ORDER BY total_vendidos DESC;";
            $stmt = $connection->prepare($sql);
            $stmt->execute();
            $result = $stmt->get_result();
            $masVendido = $result->fetch_all(MYSQLI_ASSOC);

            $msj = "Se obtuvieron los productos más vendidos correctamente";
            return new Respuesta(true, $msj, $masVendido);
        }catch (Exception $e) {
            $msj = "Error: ".$e->getMessage();
            return new Respuesta(false, $msj, []);
        }
    }
}

}

?>