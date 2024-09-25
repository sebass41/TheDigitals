<?php

require_once "../conexion/Conexion.php";
require_once "res/Respuesta.php";

ini_set('display_errors', '0');
ini_set('display_startup_errors', '0');

ini_set('log_errors', 1);
ini_set('error_log', '../log/php_errors.log');

Class Pedido{

    function obtener(){
        
    }

    function hacerPedido($calle, $num, $piso, $estado, $fecha, $lugarRetiro, $total, $idUsuario, $productos){
        try{
            $connection = conection();

            $sqlPedido = "INSERT INTO pedido(Calle, Num_casa, Piso, Estado, Fecha, Lugar_retiro, Total, Id_Usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $connection->prepare($sqlPedido);
            $stmt->bind_param("ssssssii", $calle, $num, $piso, $estado, $fecha, $lugarRetiro, $total, $idUsuario);

            if (!$stmt->execute()) {
                throw new Exception("Error al insertar el pedido: " . $stmt->error);
            }    

            $idPedido = $connection->insert_id;

            $sqlContiene = "INSERT INTO contiene(Id_producto, Id_pedido, Detalle, Costo, Cantidad) VALUES (?, ?, ?, ?, ?)";
            $stmtContiene = $connection->prepare($sqlContiene);

            foreach ($productos as $producto) {
                $idProducto = $producto['id_producto'];
                $detalle = $producto['detalle'];
                $costo = $producto['costo'];
                $cantidad = $producto['cantidad'];
    
                $stmtContiene->bind_param("iisii", $idProducto, $idPedido, $detalle, $costo, $cantidad);
    
                if (!$stmtContiene->execute()) {
                    throw new Exception("Error al insertar el producto con ID $idProducto: " . $stmtContiene->error);
                }
            }
    
            $msj = "Pedido realizado con éxito.";
            return new Respuesta(true, $msj, []);
        }catch (Exception $e){
            $msj = "Error: " . $e;
            return new Respuesta(false, $msj, []);
        }
    }

    function cancelar($idPedido){
       try{
        $connection = conection();

        $sql = "DELETE FROM pedido WHERE Id_Pedido = ?";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("i", $idPedido);
       }catch (Exception $e){
        $msj = "Error: ". $e;
        return new Respuesta(false, $msj, []);
    }
    }
}

?>