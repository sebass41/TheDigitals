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
        eliminarP();
        break;
}

function obtener(){
    
}

function realizar(){
    if (isset($_SESSION['id'])){
        $calle = $_GET['calle'];
        $num = $_GET['num'];
        $piso = $_GET['piso'];
        $fecha = $_GET['fecha'];
        $lugarRetiro = $_GET['lugarRetiro'];
        $idUsuario = $_SESSION['id'];
    }
}

function modEstado(){

}

function obtenerA(){

}

function eliminarP(){

}



?>