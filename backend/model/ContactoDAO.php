<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    
    $to = "tucorreo@dominio.com"; // Reemplaza con tu dirección de correo
    $subject = "Nuevo mensaje de contacto";
    $body = "Nombre: $name\nCorreo Electrónico: $email\nMensaje:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "El mensaje se ha enviado correctamente.";
    } else {
        echo "Hubo un error al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.";
    }
}
?>
