<?php

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

}

function modEstado(){

}

function obtenerA(){

}

function eliminarP(){

}



?>