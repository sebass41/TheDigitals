<?php
require_once "../model/SesionDAO.php";

$funcion = $_GET['fun'];

switch ($funcion){
    case 'is':
        iniciarSesion();
        break;
    case 'cerrarSesion':
        cerrarSesion();
        break;
}

function iniciarSesion(){
    $email = $_POST['email'];
    $pass = $_POST['pass'];

    $result = (new Sesion())->iniciarSesion($email, $pass);
    if($result->sucess){
        $usr=[];
        $_SESSION['id'] = $usr['id_usuario'];
        $_SESSION['email'] = $email;
    }
    echo json_encode($result);
}

function cerrarSesion(){

}

?>