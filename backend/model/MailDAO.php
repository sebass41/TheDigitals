<?php
$to = "sebastianiae22@gmail.com";
$subject = "Asunto del correo";
$message = "Este es el cuerpo del mensaje.";
$headers = "From: remitente@example.com";

if(mail($to, $subject, $message, $headers)) {
    echo "Correo enviado exitosamente.";
} else {
    echo "Error al enviar el correo.";
}
?>
