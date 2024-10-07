import PedidoDAO from "../../DAO/PedidoDAO.js";

window.onload = async () => {
    let pedidos = await (new PedidoDAO()).historialPedidos();
    mostrarPedidos(pedidos.data);
    console.log(pedidos.data);
}

function mostrarPedidos(pedidos) {
    let tBodyHistorial = document.getElementById("tBodyHistorial");
    tBodyHistorial.innerHTML = "";
    pedidos.forEach(pedido => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${pedido.Id_pedido}</td>
            <td>${pedido.Fecha}</td>
            <td>${pedido.Estado}</td>
            <td>${pedido.nombre_producto}</td>
            <td>${pedido.Cantidad}</td>
            <td>${pedido.precio}</td>
            <td>${pedido.Costo}</td>
            <td>${pedido.Total}</td>
        `;
        tBodyHistorial.appendChild(tr);
    });
}