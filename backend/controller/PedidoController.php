<?php
session_start();

require_once "../model/PedidoDAO.php";

$funcion = $_GET['fun'];

switch ($funcion){
    case 'obtener':
        obtener();
        break;
    case 'realizar':
        realizar();
        break;
    case 'modEstado':
        modEstado();
        break;
    case 'obtenerA':
        obtenerA();
        break;
    case 'eliminarP':
        cancelar();
        break;
}

function obtenerA(){
    if ($_SESSION['admin'] == 1){
        $result = (new Pedido())->obtenerPedidos();
        echo json_encode($result);
    }
}

function realizar(){
    $_SESSION['id'] = 243;
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

}

function cancelar(){

}



?>