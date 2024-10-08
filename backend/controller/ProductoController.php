<?php
session_start();

require_once "../model/ProductoDAO.php";

$funcion = $_GET['fun'];

switch ($funcion){
    case 'obtener':
        obtener();
        break;
    case 'insertar':
        insertar();
        break;
    case 'actualizar':
        actualizar();
        break;
    case 'eliminar':
        eliminar();
        break;
    case 'masVendidos':
        obtenerMasVendidos();
        break;
}

function obtener(){
    $productos = (new Producto())->obtener();
    echo json_encode($productos);
}

function insertar(){
    if (isset($_SESSION['id']) && $_SESSION['admin']){
        $tipo = $_POST['tipo'];
        $nombre = $_POST['nombre'];
        $descripcion = $_POST['descripcion'];
        $img = $_FILES['img'];
        $precio = $_POST['precio'];

        $insertar = (new Producto())->insertar($tipo, $nombre, $descripcion, $img, $precio);
        echo json_encode($insertar);
    }else{
        echo json_encode(new Respuesta(false, "Debes iniciar sesión como administrador", []));
    }
}

function actualizar(){
    $id = $_POST['id'];
    $tipo = $_POST['tipo'];
    $nombre = $_POST['name'];
    $descripcion = $_POST['desc'];
    $categoria = $_POST['cate'];
    $img = $_FILES['img'];
    $precio = $_POST['precio'];
    $idPedido = $_POST['idPedido'];

    $actualizar = (new Producto())->actualizar($id, $tipo, $nombre, $descripcion, $categoria, $img, $precio, $idPedido);
    echo json_encode($actualizar);
}

function eliminar(){
    $id = $_POST['id'];

    $eliminar = (new Producto())->eliminar($id);
    return json_encode($eliminar);
}

function obtenerMasVendidos(){
    $masVendidos = (new Producto())->obtenerMasVendido();
    echo json_encode($masVendidos);
}
?>