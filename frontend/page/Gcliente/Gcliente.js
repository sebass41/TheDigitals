import CuentaDAO from "../../DAO/CuentaDAO.js";

window.onload = async () => {
    let usuarios = await (new CuentaDAO()).obtener();
    console.log(usuarios.data);
    mostrarUsuarios(usuarios.data);

    // Evento para botón de editar
    let btnEditar = document.querySelector(".editar");
    btnEditar.addEventListener("click", () => {
        console.log("Editar")
        clienteActual = clientes.find(cliente => cliente.id === id);

        // Rellenar los campos del formulario
        inputNombre.value = clienteActual.nombre;
        inputApellido.value = clienteActual.apellido;
        inputEmail.value = clienteActual.email;
        inputTelefono.value = clienteActual.telefono;
        inputCalle.value = clienteActual.direccion.calle;
        inputPiso.value = clienteActual.direccion.piso;
        inputNumero.value = clienteActual.direccion.numero;
    
        modalEditar.style.display = 'flex'; // Mostrar modal
    })
}

function mostrarUsuarios(usuarios){
    let tbodyUsuarios = document.getElementById("tBodyUsuarios");
    tbodyUsuarios.innerHTML = "";

    usuarios.forEach(usuario => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${usuario.Nombre}</td>
            <td>${usuario.Apellido}</td>
            <td>${usuario.Mail}</td>
            <td>${usuario.Tel}</td>
            <td>${usuario.Calle}</td>
            <td>${usuario.Numero}</td>
            <td>${usuario.Piso}</td>
            <td id="tdAcciones">
                <button class="editar">Editar</button>
                <button class="eliminar" onclick="eliminarUsuario(${usuario.Id})">Eliminar</button>
            </td>
        `;
        tbodyUsuarios.appendChild(tr);
    });
}


/*
const listaClientes = document.getElementById('lista-clientes');
const modalEditar = document.getElementById('modal-editar');
const formEditar = document.getElementById('form-editar');

// Campos del formulario de edición
const inputNombre = document.getElementById('nombre');
const inputApellido = document.getElementById('apellido');
const inputEmail = document.getElementById('email');
const inputTelefono = document.getElementById('telefono');
const inputCalle = document.getElementById('calle');
const inputPiso = document.getElementById('piso');
const inputNumero = document.getElementById('numero');

let clienteActual = null; // Cliente seleccionado para editar

// Función para cargar los clientes en la tabla
function cargarClientes() {
    listaClientes.innerHTML = ''; // Limpiar la tabla

    clientes.forEach(cliente => {
        const fila = document.createElement('tr');
        
        fila.innerHTML = `
            <td>${cliente.nombre}</td>
            <td>${cliente.apellido}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.direccion.calle}, Piso: ${cliente.direccion.piso}, Nro: ${cliente.direccion.numero}</td>
            <td id="tdAcciones">
                <button class="editar" onclick="editarCliente(${cliente.id})">Editar</button>
                <button class="eliminar" onclick="eliminarCliente(${cliente.id})">Eliminar</button>
            </td>
        `;
        listaClientes.appendChild(fila);
    });
}

// Función para abrir el modal y editar los datos del cliente
function editarCliente(id) {
    clienteActual = clientes.find(cliente => cliente.id === id);

    // Rellenar los campos del formulario
    inputNombre.value = clienteActual.nombre;
    inputApellido.value = clienteActual.apellido;
    inputEmail.value = clienteActual.email;
    inputTelefono.value = clienteActual.telefono;
    inputCalle.value = clienteActual.direccion.calle;
    inputPiso.value = clienteActual.direccion.piso;
    inputNumero.value = clienteActual.direccion.numero;

    modalEditar.style.display = 'flex'; // Mostrar modal
}

// Función para guardar los cambios
formEditar.addEventListener('submit', function (e) {
    e.preventDefault();

    // Actualizar los datos del cliente
    clienteActual.nombre = inputNombre.value;
    clienteActual.apellido = inputApellido.value;
    clienteActual.email = inputEmail.value;
    clienteActual.telefono = inputTelefono.value;
    clienteActual.direccion.calle = inputCalle.value;
    clienteActual.direccion.piso = inputPiso.value;
    clienteActual.direccion.numero = inputNumero.value;

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
