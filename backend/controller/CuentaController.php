<?php
session_start(); // Inicia una sesión

require_once "../model/UsuarioDAO.php"; // Incluye el archivo que contiene la clase UsuarioDAO

$funcion = $_GET['fun']; // Obtiene el parámetro 'fun' de la URL

switch ($funcion){
    case 'crear':
        crear(); // Llama a la función crear si 'fun' es 'crear'
        break;
    case 'eliminar':
        eliminar(); // Llama a la función eliminar si 'fun' es 'eliminar'
        break;
    case 'recuperar':
        recuperar(); // Llama a la función recuperar si 'fun' es 'recuperar'
        break;
    case 'editar':
        editar(); // Llama a la función editar si 'fun' es 'editar'
        break;
    case 'obtener':
        obtener(); // Llama a la función obtener si 'fun' es 'obtener'
        break;
}

function crear(){
    $nombre = $_POST['nombre']; // Obtiene el valor de 'nombre' del formulario
    $apell = $_POST['apell']; // Obtiene el valor de 'apell' del formulario
    $tel = $_POST['tel']; // Obtiene el valor de 'tel' del formulario
    $calle = $_POST['calle']; // Obtiene el valor de 'calle' del formulario
    $num = $_POST['num']; // Obtiene el valor de 'num' del formulario
    $piso = $_POST['piso']; // Obtiene el valor de 'piso' del formulario
    $pass = $_POST['pass']; // Obtiene el valor de 'pass' del formulario
    $email = $_POST['email']; // Obtiene el valor de 'email' del formulario

    $pass = password_hash($pass, PASSWORD_DEFAULT); // Encripta la contraseña

    $result = (new Usuario())->registrar($nombre, $apell, $tel, $calle, $num, $piso, $pass, $email); // Llama al método registrar de la clase Usuario
    echo json_encode($result); // Devuelve el resultado en formato JSON
}

function eliminar(){
    $idUsuario = $_POST['idUsuario'];

    $result = (new Usuario())->eliminar($idUsuario); // Llama al método eliminar de la clase Usuario
    echo json_encode($result); // Devuelve el resultado en formato JSON
}

function recuperar(){
    // Función recuperar aún no implementada
}

function editar(){
    if (isset($_SESSION['id'])){
        $idUsuario = $_SESSION['id'];
        $nombre = $_POST['nombre']; // Obtiene el valor de 'nombre' del formulario
        $apell = $_POST['apellido']; // Obtiene el valor de 'apell' del formulario
        $tel = $_POST['tel']; // Obtiene el valor de 'tel' del formulario
        $calle = $_POST['calle']; // Obtiene el valor de 'calle' del formulario
        $num = $_POST['num']; // Obtiene el valor de 'num' del formulario
        $piso = $_POST['piso']; // Obtiene el valor de 'piso' del formulario

        $result = (new Usuario())->actualizar($idUsuario, $nombre, $apell, $tel, $calle, $num, $piso); // Llama al método actualizar de la clase Usuario
        echo json_encode($result); // Devuelve el resultado en formato JSON
    }
}

function obtener(){
    if (isset($_SESSION['id'])){
        $result = (new Usuario())->obtener();
        echo json_encode($result); // Devuelve el resultado en formato JSON
    }
}
?>
