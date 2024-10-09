import PedidoDAO from "../../DAO/PedidoDAO.js";

window.onload = async () => {
    let pedidos = await (new PedidoDAO()).obtenerInfoPedido();
    console.log(pedidos.data);
}

function mostrarPedido(datos) {
    let idPedidoElement = document.getElementById("idPedido");
    let idNombre
}