import ProductoDAO from "../../DAO/ProductoDAO.js";

window.onload = async () => {
    let productos = await (new ProductoDAO()).obtenerMasVendido();
    cargarDato(productos.data);
}

function cargarDato(datos) {
    let table = document.getElementById('tBodyProductos');
    table.innerHTML += '';
    datos.forEach(data => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${data.Nombre}</td>
            <td>${data.total_vendidos}</td>
            `;
        table.appendChild(tr);
    });
}