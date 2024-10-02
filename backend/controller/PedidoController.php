<?php
session_start();

require_once "../model/PedidoDAO.php";

$funcion = $_GET['fun'];

switch ($funcion){
    case 'obtenerPedido':
        obtenerPedido();
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

function obtenerPedidos(){
    if ($_SESSION['admin'] == 1){
        $result = (new Pedido())->obtenerPedidos();
        echo json_encode($result);
    }
}

function obtenerDetalle(){
    if ($_SESSION['admin'] == 1){
        $idPedido = $_POST['idPedido'];
        $result = (new Pedido())->obtenerDetalle($idPedido);
        echo json_encode($result);
    }
}

function realizar(){
    if (isset($_SESSION['id'])){
        $calle = $_POST['calle'];
        $num = $_POST['numCasa'];
        $piso = $_POST['piso'];
        $lugarRetiro = $_POST['lugarRetiro'];
        $productos = $_POST['productos'];
        $total = $_POST['total'];
        
        date_default_timezone_set('America/Montevideo');
        $fecha = date('Y-m-d H:i:s');
        $estado = 'en espera';
        $id = $_SESSION['id'];
       

        $result = (new Pedido())->hacerPedido($calle, $num, $piso, $estado, $fecha, $lugarRetiro, $total, $id, $productos);
        echo json_encode($result);
    }else{
        echo json_encode(array('error' => 'Debes iniciar sesión para realizar un pedido'));
    }
}

function modEstado(){
    if ($_SESSION['admin'] == 1){
        $idPedido = $_POST['idPedido'];
        $estado = $_POST['estado'];

        $result = (new Pedido())->cambiarEstado($idPedido, $estado);
        echo json_encode($result);
    }
}

function cancelar(){

}

function obtenerPedido(){

}

function obtenerHistorial(){
    if (isset($_SESSION['id'])){
        $idUsuario = $_SESSION['id'];

        $result = (new Pedido())->obtenerHistorial($idUsuario);
        return json_encode($result);
    }
}

?>