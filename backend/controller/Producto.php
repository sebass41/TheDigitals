<?php

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
}

function obtener(){
    $producto = (new Producto())->obtener();
    echo json_encode($producto);
}

function insertar(){
    $id = $_POST['id'];
    $tipo = $_POST['tipo'];
    $nombre = $_POST['name'];
    $descripcion = $_POST['desc'];
    $categoria = $_POST['cate'];
    $img = $_FILES['img'];
    $precio = $_POST['precio'];
    $idPedido = $_POST['idPedido'];

    $insertar = (new Producto())->insertar($id, $tipo, $nombre, $descripcion, $categoria, $img, $precio, $idPedido);
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