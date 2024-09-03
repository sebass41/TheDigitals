<?php

require_once "../model/ProductoDAO.php";

$funcion = $_GET['fun'];

switch ($funcion){
    case 'crear':
        crear();
        break;
    case 'eliminar':
        eliminar();
        break;
    case 'recuperar':
        recuperar();
        break;
}

function crear(){

}

function eliminar(){

}

function recuperar(){

}


?>