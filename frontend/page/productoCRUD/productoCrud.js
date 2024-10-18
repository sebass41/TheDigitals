import ProductoDAO from "../../DAO/ProductoDAO.js";

window.onload = async () => {
    let productos = await (new ProductoDAO()).obtener();
    mostrarProductos(productos.data);
}

async function editarProducto(id) {
    let producto = await obtenerProducto(id);
    let inputId = document.getElementById('id');
    let inputTipo = document.getElementById('tipo');
    let inputNombre = document.getElementById('nombre');
    let inputDescripcion = document.getElementById('descripcion');
    let inputPrecio = document.getElementById('precio');
    let modalEditar = document.getElementById('modal-editar');
    let formEditar = document.getElementById('form-editar');
    producto = producto.data[0];
    console.log(producto);
    
    // Rellenar los campos del formulario
    inputId.value = producto.Id_prod;
    inputTipo.value = producto.tipo;
    inputDescripcion.value = producto.Descripcion;
    inputNombre.value = producto.Nombre;
    inputPrecio.value = producto.precio;

    modalEditar.style.display = 'flex'; // Mostrar modal

    formEditar.addEventListener('submit', async function (e) {
        e.preventDefault();

        let formData = new FormData(formEditar);
        let nombre = formData.get("nombre");
        let tipo = formData.get("tipo");
        let descripcion = formData.get("descripcion");
        let precio = formData.get("precio");

        let result = await (new ProductoDAO()).editar(id, tipo, nombre, descripcion, precio);
        console.log(result);
        if (result.sucess) {
            modalEditar.style.display = 'none'; // Cerrar modal
        }else {
            console.log(result.msj);
        }
    });

    document.getElementById('cancelar').addEventListener('click', function () {
        modalEditar.style.display = 'none'; // Cerrar modal
    });

}

async function eliminarProducto(id) {
    let result = await (new ProductoDAO()).eliminar(id);
    location.reload();
    
}
function mostrarProductos(productos){
    let tBodyProductos = document.getElementById("tBodyProductos");
    tBodyProductos.innerHTML = "";

    productos.forEach(producto => {
        let tr = document.createElement("tr");
        let ext = ["jpg", "png", "jpeg"]
            let tipoImg = producto.extencion;
            let rutaImg = "../../asset/burga/noImg.jpg";

            if (ext.includes(tipoImg)) {
                rutaImg = `../../../backend/img/producto/${producto.Id_prod}.${tipoImg}`;   
            }
        tr.innerHTML = `
            <td>${producto.Id_prod}</td>
            <td>${producto.Nombre}</td>
            <td>${producto.tipo}</td>
            <td>${producto.Descripcion}</td>
            <td>${producto.precio}</td>
            <td><img src="${rutaImg}"></td>
        `;
        let btnEditar = document.createElement("button");
        let btnEliminar = document.createElement("button");
        btnEliminar.innerHTML = "Eliminar";
        btnEditar.innerHTML = "Editar";

        btnEditar.classList.add("editar");
        btnEliminar.classList.add("eliminar");

        btnEditar.onclick = () => {
            editarProducto(producto.Id_prod)
        };
        btnEliminar.onclick = () => {
            eliminarProducto(producto.Id_prod)
        }

        let td = document.createElement("td");
        td.appendChild(btnEliminar);
        td.appendChild(btnEditar);
        tr.appendChild(td);

        tBodyProductos.appendChild(tr);
    });
}

async function obtenerProducto(id){
    let producto = await (new ProductoDAO()).obtenerProducto(id);
    return producto;
}

function filtrarProducto(filtro){
    
}