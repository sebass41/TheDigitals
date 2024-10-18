<?php
session_start(); // Inicia una nueva sesión o reanuda la existente

require_once "../model/ProductoDAO.php"; // Incluye el archivo ProductoDAO.php, que contiene la clase Producto

$funcion = $_GET['fun']; // Obtiene el parámetro 'fun' de la URL

// Dependiendo del valor de 'fun', se llama a una función específica
switch ($funcion){
    case 'obtener':
        obtener();
        break;
    case 'insertar':
        insertar();
        break;
    case 'editar':
        editar();
        break;
    case 'eliminar':
        eliminar();
        break;
    case 'masVendidos':
        obtenerMasVendidos();
        break;
    case 'obtenerProducto':
        obtenerProducto();
        break;
}

// Función para obtener todos los productos
function obtener(){
    $productos = (new Producto())->obtener(); // Llama al método obtener de la clase Producto
    echo json_encode($productos); // Devuelve el resultado en formato JSON
}

// Función para insertar un nuevo producto
function insertar(){
    if (isset($_SESSION['id']) && $_SESSION['admin']){ // Verifica si el usuario ha iniciado sesión y es administrador
        $tipo = $_POST['tipo'];
        $nombre = $_POST['nombre'];
        $descripcion = $_POST['descripcion'];
        $img = $_FILES['img'];
        $precio = $_POST['precio'];

        // Llama al método insertar de la clase Producto
        $insertar = (new Producto())->insertar($tipo, $nombre, $descripcion, $img, $precio);
        echo json_encode($insertar); // Devuelve el resultado en formato JSON
    }else{
        echo json_encode(new Respuesta(false, "Debes iniciar sesión como administrador", [])); // Mensaje de error si el usuario no es administrador
    }
}

// Función para actualizar un producto existente
function editar(){
    $_SESSION['admin'] = 1;
    if ($_SESSION['admin'] == 1){
        $id = $_POST['id'];
        $tipo = $_POST['tipo'];
        $nombre = $_POST['nombre'];
        $descripcion = $_POST['descripcion'];
        $precio = $_POST['precio'];
        
        // Llama al método actualizar de la clase Producto
        $actualizar = (new Producto())->editar($id, $tipo, $nombre, $descripcion, $precio);
        echo json_encode($actualizar); // Devuelve el resultado en formato JSON
    }
}

// Función para eliminar un producto
function eliminar(){
    $id = $_POST['id']; // Obtiene el ID del producto desde el formulario

    // Llama al método eliminar de la clase Producto
    $eliminar = (new Producto())->eliminar($id);
    return json_encode($eliminar); // Devuelve el resultado en formato JSON
}


function obtenerMasVendidos(){
    $masVendidos = (new Producto())->obtenerMasVendido();
    echo json_encode($masVendidos);
}

function obtenerProducto(){
    $id = $_POST['id']; // Obtiene el ID del producto desde el formulario
    $result = (new Producto())->obtenerProducto($id);

    echo json_encode($result); // Devuelve el resultado en formato JSON
}
?>

