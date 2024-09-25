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
        obtener();
        break;
    case 'eliminarP':
        cancelar();
        break;
}

function obtener(){
    
}

function realizar(){
    if (isset($_SESSION['id'])){

        $calle = $_POST['calle'];
        $num = $_POST['num'];
        $piso = $_POST['piso'];
        $lugarRetiro = $_POST['lugarRetiro'];
        $productos = $_POST['productos'];

        date_default_timezone_set('America/Montevideo');
        $fecha = date('Y-m-d H:i:s');
        $estado = 'en espera';
        $id = $_SESSION['id'];
        $total = $_POST['total'];

        $result = (new Pedido())->hacerPedido($calle, $num, $piso, $estado, $fecha, $lugarRetiro,$total, $id, $productos);
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