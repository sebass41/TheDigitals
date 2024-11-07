<?php
session_start(); // Inicia una nueva sesión o reanuda la existente

require_once "../model/PedidoDAO.php"; // Incluye el archivo PedidoDAO.php, que contiene la clase Pedido

$funcion = $_GET['fun']; // Obtiene el parámetro 'fun' de la URL

// Dependiendo del valor de 'fun', se llama a una función específica
switch ($funcion){
    case 'obtenerInfoPedido':
        obtenerInfoPedido();
        break;
    case 'realizar':
        realizar();
        break;
    case 'modEstado':
        modEstado();
        break;
    case 'obtenerPedidos':
        obtenerPedidos();
        break;
    case 'cancelar':
        cancelar();
        break;
    case 'obtenerDetalle':
        obtenerDetalle();
        break;
    case 'obtenerHistorial':
        obtenerHistorial();
        break;
}

// Función para obtener todos los pedidos
function obtenerPedidos(){
    if ($_SESSION['admin'] == 1){ // Verifica si el usuario es administrador
        $result = (new Pedido())->obtenerPedidos(); // Llama al método obtenerPedidos de la clase Pedido
        echo json_encode($result); // Devuelve el resultado en formato JSON
    }
}

// Función para obtener el detalle de un pedido específico
function obtenerDetalle(){
    if ($_SESSION['admin'] == 1){ // Verifica si el usuario es administrador
        $idPedido = $_POST['idPedido']; // Obtiene el ID del pedido desde el formulario
        $result = (new Pedido())->obtenerDetalle($idPedido); // Llama al método obtenerDetalle de la clase Pedido
        echo json_encode($result); // Devuelve el resultado en formato JSON
    }
}

// Función para realizar un nuevo pedido
function realizar(){
    if (isset($_SESSION['id'])){ // Verifica si el usuario ha iniciado sesión
        $calle = $_POST['calle'];
        $num = $_POST['numCasa'];
        $piso = $_POST['piso'];
        $lugarRetiro = $_POST['lugarRetiro'];
        $productos = $_POST['productos'];
        $total = $_POST['total'];
        
        date_default_timezone_set('America/Montevideo'); // Establece la zona horaria
        $fecha = date('Y-m-d H:i:s'); // Obtiene la fecha y hora actual
        $estado = 'en espera'; // Estado inicial del pedido
        $id = $_SESSION['id']; // ID del usuario que realiza el pedido

        // Llama al método hacerPedido de la clase Pedido
        $result = (new Pedido())->hacerPedido($calle, $num, $piso, $estado, $fecha, $lugarRetiro, $total, $id, $productos);
        echo json_encode($result); // Devuelve el resultado en formato JSON
    }else{
        echo json_encode(array('error' => 'Debes iniciar sesión para realizar un pedido')); // Mensaje de error si el usuario no ha iniciado sesión
    }
}

// Función para modificar el estado de un pedido
function modEstado(){
    if ($_SESSION['admin'] == 1){ // Verifica si el usuario es administrador
        $idPedido = $_POST['idPedido']; // Obtiene el ID del pedido desde el formulario
        $estado = $_POST['estado']; // Obtiene el nuevo estado desde el formulario

        // Llama al método cambiarEstado de la clase Pedido
        $result = (new Pedido())->cambiarEstado($idPedido, $estado);
        echo json_encode($result); // Devuelve el resultado en formato JSON
    }
}

// Función para cancelar un pedido (aún no implementada)
function cancelar(){

}

// Función para obtener un pedido específico (aún no implementada)
function obtenerInfoPedido(){
    if (isset($_SESSION['id'])){
        $idUsuario = $_SESSION['id'];

        $result = (new Pedido())->obtenerInfoPedido($idUsuario); // Llama al método obtenerPedido de la clase Pedido
        echo json_encode($result); // Devuelve el resultado en formato JSON
    }
}

// Función para obtener el historial de pedidos de un usuario
function obtenerHistorial(){
    if (isset($_SESSION['id'])){ // Verifica si el usuario ha iniciado sesión
        $idUsuario = $_SESSION['id']; // Obtiene el ID del usuario desde la sesión
    
        // Llama al método obtenerHistorial de la clase Pedido
        $result = (new Pedido())->obtenerHistorial($idUsuario);
        echo json_encode($result); // Devuelve el resultado en formato JSON
    }else{
        echo json_encode(array('error' => 'Debes iniciar sesión para ver tu historial de pedidos')); // Mensaje de error si el usuario no ha iniciado sesión
    }
}
?>