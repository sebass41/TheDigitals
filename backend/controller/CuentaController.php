<?php
session_start();

require_once "../model/UsuarioDAO.php";

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
    $nombre = $_POST['nombre'];
    $apell = $_POST['apell'];
    $tel = $_POST['tel'];
    $calle = $_POST['calle'];
    $num = $_POST['num'];
    $piso = $_POST['piso'];
    $pass = $_POST['pass'];
    $email = $_POST['email'];

    $result = (new Usuario())->registrar($nombre, $apell, $tel, $calle, $num, $piso, $pass, $email);
    echo json_encode($result);
}

function eliminar(){

}

function recuperar(){

}


?>