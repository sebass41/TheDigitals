<?php
require_once "../model/SesionDAO.php"; // Incluye el archivo SesionDAO.php, que contiene la clase Sesion

$funcion = $_GET['fun']; // Obtiene el parámetro 'fun' de la URL

// Dependiendo del valor de 'fun', se llama a una función específica
switch ($funcion){
    case 'is':
        iniciarSesion();
        break;
    case 'cerrarSesion':
        cerrarSesion();
        break;
}

// Función para iniciar sesión
function iniciarSesion(){
    $email = $_POST['email']; // Obtiene el email del formulario
    $pass = $_POST['pass']; // Obtiene la contraseña del formulario

    // Llama al método iniciarSesion de la clase Sesion
    $result = (new Sesion())->iniciarSesion($email, $pass);
    if($result->sucess){ // Si el inicio de sesión es exitoso
        session_start(); // Inicia una nueva sesión
        $_SESSION['id'] = $result->data['Id_usuario']; // Guarda el ID del usuario en la sesión
        $_SESSION['admin'] = $result->data['Admin']; // Guarda el estado de administrador en la sesión
        $_SESSION['email'] = $email; // Guarda el email en la sesión
    }
    echo json_encode($result); // Devuelve el resultado en formato JSON
}

// Función para cerrar sesión
function cerrarSesion(){
    session_start(); // Inicia una nueva sesión o reanuda la existente
    session_unset(); // Elimina todas las variables de sesión
    session_destroy(); // Destruye la sesión

    echo json_encode("Sesión Cerrada"); // Devuelve un mensaje de confirmación en formato JSON
}
?>
