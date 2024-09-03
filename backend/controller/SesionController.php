<?php

require_once "../model/SesionDAO.php";

$funcion = $_GET['fun'];

switch ($funcion){
    case 'iniciarSesion':
        iniciarSesion();
        break;
    case 'cerrarSesion':
        cerrarSesion();
        break;
}

function iniciarSesion(){

}

function cerrarSesion(){

}



?>