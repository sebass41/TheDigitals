import PedidoDAO from "../../DAO/PedidoDAO.js";

window.onload = async () => {
    let pedidos = await (new PedidoDAO()).obtenerPedidos();
    mostrarPedidos(pedidos.data);
    let btnFinalizar = document.querySelector(".btnFinalizar");
    
    btnFinalizar.onclick = async () => {
        let id = document.querySelector(".btnFinalizar").id;
        let estado = "Finalizado";
        cambiarEstado(id, estado);
        window.location.reload();
    }
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
        `;
        let btnConfirmar = document.createElement("button");
        btnConfirmar.innerHTML = "Seleccionar";
        btnConfirmar.onclick = () => {
            let btnFinalizar = document.querySelector(".btnFinalizar");
            btnFinalizar.disabled = false;
            btnFinalizar.id = pedido.idPedido;
            let estado = "En Proceso";
            cambiarEstado(pedido.idPedido, estado);
            mostrarDetallePedido(pedido.idPedido);
        };
        let td = document.createElement("td");
        td.appendChild(btnConfirmar); 
        tr.appendChild(td);
        tBodyPedidos.appendChild(tr);
    });
}

async function mostrarDetallePedido(id){
    let detalle = await obtenerDetalle(id);
    detalle = detalle.data;
    let tBodyDetalle = document.getElementById("tBodyDetalle");
    tBodyDetalle.innerHTML = "";
    detalle.forEach(pedido => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${pedido.Producto}</td>
            <td>${pedido.Cliente}</td>
            <td>${pedido.Direccion_Entrega}</td>
            <td>${pedido.Detalle}</td>
            <td>${pedido.Cantidad}</td>
        `;
        tBodyDetalle.appendChild(tr);

    });
}

async function obtenerDetalle(id) {
    let detallePedido = await (new PedidoDAO()).obtenerDetallePedido(id);
    return detallePedido;
}

async function cambiarEstado(id, estado) {
    let pedido = await (new PedidoDAO()).modEstado(id, estado);
    if(pedido.sucess){
        console.log(pedido.msj);
    }else{
        alert(pedido.msj);
    }
}

async function finalizarPedido(){
    console.log("entró")
    let id = document.querySelector(".btnFinalizar").id;
    let pedido = await (new PedidoDAO()).finalizarPedido(id);
    if(pedido.sucess){
        //window.location.reload();
        console.log(pedido)
    }else{
        alert(pedido.msj);
    }
}
