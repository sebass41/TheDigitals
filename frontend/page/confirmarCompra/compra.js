import PedidoDAO from "../../DAO/PedidoDAO.js";

window.onload = async () => {
    let otrosCampos = document.getElementById('otros');
    otrosCampos.style.display = 'none';
 
    let productos = JSON.parse(localStorage.getItem('carrito'));
    let detalle = JSON.parse(localStorage.getItem('detalle'));
    let total = detalle[0];
    console.log(total);
    mostrarDetalle(productos, total);

    document.getElementById('direccion').addEventListener('change', function() {
        if (this.value === 'Otro') {
            otrosCampos.style.display = 'block';
        } else {
            otrosCampos.style.display = 'none';
        }
    });

    document.getElementById("btnConfirmar").onclick = () => {
        confirmarPedido(productos, total);
    };
}

function mostrarDetalle(productos, total) {
    let containerProd = document.getElementById("detalleProducto");
    let nombreElement = document.getElementById("clienteNombre");
    let totalElement = document.getElementById("total");

    containerProd.innerHTML = "";
    let listaProducto = document.createElement("ul");
    productos.forEach(producto => {
        listaProducto.innerHTML += `<li>${producto.Nombre} - $${producto.precio}</li>`
    });

    nombreElement.innerHTML = `En nombre de: ${localStorage.getItem("nombre")}`;
    totalElement.innerHTML = `$${total}`;

    containerProd.appendChild(listaProducto);
}

async function confirmarPedido(productos, total) {
    let formElement = document.getElementById("formPedido");

    let formData = new FormData(formElement);
    let lugarRetiro = formData.get('lugarRetiro');
    let calle;
    let numCasa;
    let piso;
    if (lugarRetiro == "Domicilio del Cliente"){
        calle = localStorage.getItem('calle');
        numCasa = localStorage.getItem('numCasa');
        piso = localStorage.getItem('piso'); 
    }else {
        calle = formData.get('calle');
        numCasa = formData.get('numCasa');
    }
    let pedidoDAO = new PedidoDAO();
    let result = await pedidoDAO.realizar(piso, calle, numCasa, lugarRetiro, productos, total);
    if (result.sucess) {
        localStorage.removeItem('carrito');
        localStorage.removeItem('detalle');
        window.location = "../estadopedido/estadopedido.html";
    }else{
        console.log(result.msj);
    }
}
