import PedidoDAO from "../../DAO/PedidoDAO.js";

window.onload = async () => {
    let pedidos = await (new PedidoDAO()).obtenerPedidos();
    mostrarPedidos(pedidos.data);
}

async function mostrarPedidos(pedidos) {
    let tBodyPedidos = document.getElementById("tBodyPedidos");
    tBodyPedidos.innerHTML = "";
    pedidos.forEach(pedido => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${pedido.Cliente}</td>
            <td>${pedido.Lugar_Retiro}</td>
            <td>${pedido.Fecha}</td>
            <td>${pedido.Total}</td>
            <td>${pedido.Estado}</td>
        `
        let btnConfirmar = document.createElement("button");
        btnConfirmar.innerHTML = "Seleccionar";
        btnConfirmar.onclick = () => {
            let estado = "En Proceso";
            cambiarEstado(pedido.idPeido, estado);
            mostrarDetallePedido(pedido.idPedido);
        };
        let td = document.createElement("td");
        td.appendChild(btnConfirmar); 
        tr.appendChild(td);
        tBodyPedidos.appendChild(tr);
    })
}

async function mostrarDetallePedido(id){
    let detalle = await obtenerDetalle(id);
    detalle = detalle.data;
    let tBodyDetalle = document.getElementById("tBodyDetalle");
    tBodyDetalle.innerHTML = "";
    detalle.forEach(pedido => {
        let tr = document.createElement("tr")
        tr.innerHTML+= `
            <td>${pedido.Producto}</td>
            <td>${pedido.Cliente}</td>
            <td>${pedido.Direccion_Entrega}</td>
            <td>${pedido.Detalle}</td>
            <td>${pedido.Cantidad}</td>
        `
        tBodyDetalle.appendChild(tr);

        let btnConfirmar = document.getElementById("btnFinalizar");
        btnConfirmar.onclick = () => {
            let estado = "Finalizado";
            cambiarEstado(pedido.idPedido, estado);
            finalizarPedido(pedido.idPedido);
        };
        let td = document.createElement("td");
        td.appendChild(btnConfirmar);
        tr.appendChild(td);
        tBodyDetalle.appendChild(tr);
    });
}

async function obtenerDetalle(id) {
    let detallePedido = await (new PedidoDAO).obtenerDetallePedido(id);
    return detallePedido;
}

function cambiarEstado(id, estado) {
    let pedido = await (new PedidoDAO).modEstado(id, estado);
    if(pedido.msj === "Pedido modificado con éxito."){
        window.location.reload();
    }else{
        alert(pedido.msj);
    }
}

function finalizarPedido(id){
    let pedido = await (new PedidoDAO).finalizarPedido(id);
    if(pedido.msj === "Pedido finalizado con éxito."){
        alert(pedido.msj);
        window.location.reload();
    }else{
        alert(pedido.msj);
    }
}