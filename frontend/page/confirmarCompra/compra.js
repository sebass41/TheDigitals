import PedidoDAO from "../../DAO/pedidoDAO.js";

window.onload = async () => {
    let otrosCampos = document.getElementById('otros');
    otrosCampos.style.display = 'none';
 
    let productos = JSON.parse(localStorage.getItem('carrito'));
    let detalle = JSON.parse(localStorage.getItem('detalle'));
    let total = detalle[0];
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
    let calle = formData.get('calle');
    let numCasa = formData.get('numCasa');

    let pedidoDAO = new PedidoDAO();
    let result = await pedidoDAO.realizar(calle, numCasa, lugarRetiro, productos, total);
    if (result.sucess) {
        localStorage.removeItem('carrito');
        localStorage.removeItem('detalle');
        alert(result.msj);
    }else{
        alert(result.msj);
    }
}
