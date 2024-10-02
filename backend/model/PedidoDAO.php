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

    function hacerPedido($calle, $num, $piso, $estado, $fecha, $lugarRetiro, $total, $idUsuario, $productosJson){
        try{
            $connection = conection();

            $sqlPedido = "INSERT INTO pedido(Calle, Num_casa, Piso, Estado, Fecha, Lugar_retiro, Total, Id_Usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $connection->prepare($sqlPedido);
            $stmt->bind_param("ssssssii",$calle, $num, $piso, $estado, $fecha, $lugarRetiro, $total, $idUsuario);

            if (!$stmt->execute()) {
                throw new Exception("Error al insertar el pedido: " . $stmt->error);
            }    

            $idPedido = $connection->insert_id;

            $sqlContiene = "INSERT INTO contiene(Id_producto, Id_pedido, Detalle, Costo, Cantidad) VALUES (?, ?, ?, ?, ?)";
            $stmtContiene = $connection->prepare($sqlContiene);

            $productos = json_decode($productosJson);
            if (empty($productos)) {
                throw new Exception("El array de productos está vacío.");
            }
            
            foreach ($productos as $producto) {
                if (!isset($producto->Id_prod, $producto->Detalle, $producto->precio, $producto->Cantidad)) {
                    throw new Exception("Faltan datos en uno de los productos: " . json_encode($producto));
                }

                $idProducto = $producto->Id_prod;
                $detalle = $producto->Detalle;
                $cantidad = $producto->Cantidad;
                $costo = $producto->precio * $cantidad;
    
                $stmtContiene->bind_param("iisii", $idProducto, $idPedido, $detalle, $costo, $cantidad);
    
                if (!$stmtContiene->execute()) {
                    throw new Exception("Error al insertar el producto con ID $idProducto: " . $stmtContiene->error);
                }
                
            }
    
            $msj = "Pedido realizado con éxito";        
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

    function obtenerPedidos(){
        try{
            $connection = conection();
            $sql = "SELECT 
                        CONCAT(u.Nombre, ' ', u.Apellido) AS Cliente, 
                        p.Lugar_retiro AS Lugar_Retiro, p.Estado,
                        p.Fecha, p.Total, p.Id_pedido AS idPedido
                    FROM pedido p 
                    JOIN usuario u ON p.Id_Usuario = u.Id_usuario
                    WHERE p.Estado <> 'Finalizado'";
            $result = $connection->query($sql);
            $pedidos = $result->fetch_all(MYSQLI_ASSOC);

            $msj = "Pedidos obtenidos correctamente";
            return new Respuesta(true, $msj, $pedidos);
        }catch (Exception $e){
            $msj = "Error: ". $e;
            return new Respuesta(false, $msj, []);
        }
    }
    
    function obtenerDetalle($id){
        try{
            $connection = conection();
            $sql = "SELECT 
                    CONCAT(u.Nombre, ' ', u.Apellido) AS Cliente,
                    p.Id_pedido AS id,
                    CONCAT(p.Calle, ' ', p.Num_casa) AS Direccion_Entrega,
                    prod.Nombre AS Producto,
                    c.Detalle,
                    c.Cantidad
                    FROM pedido p
                    JOIN usuario u ON p.Id_Usuario = u.Id_usuario
                    JOIN contiene c ON p.Id_pedido = c.Id_pedido
                    JOIN producto prod ON c.Id_producto = prod.Id_prod
                    WHERE p.Id_pedido = ?";
            $stmt = $connection->prepare($sql);
            $stmt->bind_param("i", $id);
            $stmt->execute();

            $result = $stmt->get_result();
            $pedidos = $result->fetch_all(MYSQLI_ASSOC);

            $msj = "Pedidos obtenidos correctamente";
            return new Respuesta(true, $msj, $pedidos);

        }catch (Exception $e){
            $msj = "Error: ". $e;
            return new Respuesta(false, $msj, []);
        }
    }

    function cambiarEstado($id, $estado){
        try{
            $connection = conection();
            $sql = "UPDATE pedido SET Estado = ? WHERE Id_Pedido = ?";
            $stmt = $connection->prepare($sql);
            $stmt->bind_param("si", $estado, $id);
            $stmt->execute();

            $msj = "Estado cambiado correctamente";
            return new Respuesta(true, $msj, []);
        }catch (Exception $e){
            $msj = "Error: ". $e;
            return new Respuesta(false, $msj, []);
        }
    }

    function obtenerHistorial($id){
        try{
            $connection = conection();
            $sql = "SELECT 
                        p.Id_pedido, 
                        p.Fecha, 
                        p.Estado, 
                        pr.Nombre AS nombre_producto, 
                        c.Cantidad, 
                        pr.precio, 
                        c.Costo,
                        p.Total
                    FROM pedido p
                    JOIN contiene c ON p.Id_pedido = c.Id_pedido
                    JOIN producto pr ON c.Id_producto = pr.Id_prod
                    WHERE p.Id_Usuario = ?
                    ORDER BY p.Fecha DESC";
            $stmt = $connection->prepare($sql);
            $stmt->bind_param("i", $id);
            $stmt->execute();
            
            $result = $stmt->get_result();
            $pedidos = $result->fetch_all(MYSQLI_ASSOC);

            $msj = "Historial obtenido correctamente";
            return new Respuesta(true, $msj, $pedidos);
        }catch (Exception $e){
            $msj = "Error: ". $e;
            return new Respuesta(false, $msj, []);
        }
    }

}

?>