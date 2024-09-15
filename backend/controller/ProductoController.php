<?php
session_start();

require_once "../model/ProductoDAO.php";

$funcion = $_GET['fun'];

switch ($funcion){
    case 'obtener':
        obtener();
        break;
    case 'op':
        obtenerProducto();
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
}

function obtener(){
    $productos = (new Producto())->obtener();
    echo json_encode($productos);
}

function obtenerProducto(){
    
}

function insertar(){
    $tipo = $_POST['tipo'];
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $img = $_FILES['img'];
    $precio = $_POST['precio'];

    $insertar = (new Producto())->insertar($tipo, $nombre, $descripcion, $img, $precio);
    echo json_encode($insertar);
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

?>