// Datos simulados de clientes con ejemplos
let clientes = [
    {
        id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan.perez@example.com', telefono: '123456789',
        direccion: { calle: 'Calle Falsa', piso: '3', numero: '456' }
    },
    {
        id: 2, nombre: 'Ana', apellido: 'Gómez', email: 'ana.gomez@example.com', telefono: '987654321',
        direccion: { calle: 'Avenida Siempre Viva', piso: '2', numero: '123' }
    },
    {
        id: 3, nombre: 'Carlos', apellido: 'Rodríguez', email: 'carlos.rodriguez@example.com', telefono: '555123456',
        direccion: { calle: 'Calle Luna', piso: '4', numero: '789' }
    }
];

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
cargarClientes();
