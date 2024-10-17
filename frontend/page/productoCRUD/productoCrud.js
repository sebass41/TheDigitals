import ProductoDAO from "../../DAO/ProductoDAO.js";

window.onload = async () => {
    let productos = await (new ProductoDAO()).obtener();
    console.log(productos.data);
    mostrarProductos(productos.data);
}

async function editarProducto(id) {
    let producto = await obtenerproducto(id);
    let inputNombre = document.getElementById('nombre');
    let inputApellido = document.getElementById('apellido');
    let inputEmail = document.getElementById('email');
    let inputTelefono = document.getElementById('telefono');
    let inputCalle = document.getElementById('calle');
    let inputPiso = document.getElementById('piso');
    let inputNumero = document.getElementById('numero');
    let modalEditar = document.getElementById('modal-editar');
    let formEditar = document.getElementById('form-editar');
    producto = producto.data[0];
    console.log(producto);
    
    // Rellenar los campos del formulario
    inputNombre.value = producto.Nombre;
    inputApellido.value = producto.Apellido;
    inputEmail.value = producto.Mail;
    inputTelefono.value = producto.Tel;
    inputCalle.value = producto.Calle;
    inputPiso.value = producto.Piso;
    inputNumero.value = producto.Numero;

    modalEditar.style.display = 'flex'; // Mostrar modal

    formEditar.addEventListener('submit', async function (e) {
        e.preventDefault();

        let formData = new FormData(formEditar);
        let nombre = formData.get("nombre");
        let apellido = formData.get("apellido");
        let tel = formData.get("tel");
        let calle = formData.get("calle");
        let numero = formData.get("numero");
        let piso = formData.get("piso");


        let result = await (new CuentaDAO()).editar(id, nombre, apellido, tel, calle, numero, piso);
        console.log(result);
        if (result.sucess) {
            modalEditar.style.display = 'none'; // Cerrar modal
            location.reload(); // Recargar la página para mostrar los cambios
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
    console.log(result);
    if (result.sucess) {
        location.reload(); // Recargar la página para mostrar los cambios
    }else {
        console.log(result.msj);
    }
}
function mostrarProductos(productos){
    let tBodyProductos = document.getElementById("tBodyProductos");
    tBodyProductos.innerHTML = "";

    productos.forEach(producto => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${producto.Id_prod}</td>
            <td>${producto.Nombre}</td>
            <td>${producto.tipo}</td>
            <td>${producto.Descripcion}</td>
            <td>${producto.precio}</td>
            <td><img src="../../../backend/img/producto/${producto.Id_prod}.${producto.extencion}"></td>
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

async function obtenerproducto(id){
    let producto = await (new CuentaDAO()).obtenerproducto(id);
    return producto;
}
/*
    let listaClientes = document.getElementById('lista-clientes');
    let modalEditar = document.getElementById('modal-editar');
    let formEditar = document.getElementById('form-editar');

// Campos del formulario de edición
    let inputNombre = document.getElementById('nombre');
    let inputApellido = document.getElementById('apellido');
    let inputEmail = document.getElementById('email');
    let inputTelefono = document.getElementById('telefono');
    let inputCalle = document.getElementById('calle');
    let inputPiso = document.getElementById('piso');
    let inputNumero = document.getElementById('numero');

let producto = null; // Cliente seleccionado para editar

// Función para abrir el modal y editar los datos del cliente
function editarCliente(id) {
    producto = clientes.find(cliente => cliente.id === id);

    // Rellenar los campos del formulario
    inputNombre.value = producto.nombre;
    inputApellido.value = producto.apellido;
    inputEmail.value = producto.email;
    inputTelefono.value = producto.telefono;
    inputCalle.value = producto.direccion.calle;
    inputPiso.value = producto.direccion.piso;
    inputNumero.value = producto.direccion.numero;

    modalEditar.style.display = 'flex'; // Mostrar modal
}

// Función para guardar los cambios
formEditar.addEventListener('submit', function (e) {
    e.preventDefault();

    // Actualizar los datos del cliente
    producto.nombre = inputNombre.value;
    producto.apellido = inputApellido.value;
    producto.email = inputEmail.value;
    producto.telefono = inputTelefono.value;
    producto.direccion.calle = inputCalle.value;
    producto.direccion.piso = inputPiso.value;
    producto.direccion.numero = inputNumero.value;

    cargarClientes(); // Volver a cargar la tabla
    modalEditar.style.display = 'none'; // Cerrar modal
});

// Función para cancelar la edición
document.getElementById('cancelar').addEventListener('click', function () {
    modalEditar.style.display = 'none'; // Cerrar modal
});

// Función para eliminar un cliente
function eliminarCliente(id) {
    clientes = clientes.filter(cliente => cliente.id !== id);
    cargarClientes(); // Volver a cargar la tabla
}

// Cargar los clientes al iniciar la página
cargarClientes();*/
