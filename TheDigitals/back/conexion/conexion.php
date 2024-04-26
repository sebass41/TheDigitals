<?php

//Función para la conexión a la BD 
function conection (){   
    $host = "localhost"; 
    $usr = "root"; 
    $pass = ""; 
    $bd = "the_digitals";
    $puerto = 3306;
    $mysqli = new mysqli ($host, $usr, $pass, $bd, $puerto); 
    return $mysqli; 
}
?>