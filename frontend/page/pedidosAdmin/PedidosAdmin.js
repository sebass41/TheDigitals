import PedidoDAO from "../../DAO/PedidoDAO.js";

window.onload = async () => {
    let pedidos = await (new PedidoDAO()).obtener();
    mostrarPedidos(pedidos.data);
    console.log(pedidos.data);
}

async function mostrarPedidos(pedidos){
    let tBodyPedidos = document.querySelector("#tBodyPedidos");
    tBodyPedidos.innerHTML = "";
    pedidos.forEach(pedido => {
        let tr = document.createElement("tr")
        tr.innerHTML+= `
            <td>${pedido.Cliente}</td>
            <td>${pedido.Lugar_Retiro}</td>
            <td>${pedido.Direccion_Entrega}</td>
            <td>${pedido.Producto}</td>
            <td>${pedido.Detalle}</td>
            <td>${pedido.Cantidad}</td>
            <td>${pedido.Estado_Pedido}</td>
            <td><a href="#" onclick="mostrarDetallePedido(${pedido.id})">Ver Detalle</a></td>
        `
        tBodyPedidos.appendChild(tr);
    });
}

function mostrarDetalle(id) {
    
}