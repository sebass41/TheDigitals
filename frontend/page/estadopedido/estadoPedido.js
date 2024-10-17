import PedidoDAO from "../../DAO/PedidoDAO.js";

window.onload = async () => {
    let pedidos = await (new PedidoDAO()).obtenerInfoPedido();
    console.log(pedidos.data[0]);
    mostrarPedido(pedidos.data[0]);
}

function mostrarPedido(datos) {
    if (datos!== undefined){
        let idPedidoElement = document.getElementById("idPedido");
        let idNombreElement = document.getElementById("nombre");
        let productosElement = document.getElementById("productos");
        let fechaElement = document.getElementById("fecha");
        let estadoElement = document.getElementById("estado");
        
        idPedidoElement.innerHTML = datos.Id_pedido;
        idNombreElement.innerHTML = datos.nombre_usuario;
        productosElement.innerHTML = datos.productos;
        fechaElement.innerHTML = datos.Fecha;
        estadoElement.innerHTML = datos.Estado;

    }else {
        alert("No se encuentran pedidos pendientes");
        window.location.href = "../principal/";
    }
}