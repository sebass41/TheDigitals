import CuentaDAO from "../../DAO/CuentaDAO.js";

window.onload = async () => {
    let usuarios = await (new CuentaDAO()).obtener();
    console.log(usuarios.data);
    mostrarUsuarios(usuarios.data);

    // Evento para botón de editar
    
}

async function editarUsuario(id) {
    let usuario = await obtenerUsuario(id);
    let inputNombre = document.getElementById('nombre');
    let inputApellido = document.getElementById('apellido');
    let inputEmail = document.getElementById('email');
    let inputTelefono = document.getElementById('telefono');
    let inputCalle = document.getElementById('calle');
    let inputPiso = document.getElementById('piso');
    let inputNumero = document.getElementById('numero');
    let modalEditar = document.getElementById('modal-editar');
    let formEditar = document.getElementById('form-editar');
    usuario = usuario.data[0];
    console.log(usuario);
    
    // Rellenar los campos del formulario
    inputNombre.value = usuario.Nombre;
    inputApellido.value = usuario.Apellido;
    inputEmail.value = usuario.Mail;
    inputTelefono.value = usuario.Tel;
    inputCalle.value = usuario.Calle;
    inputPiso.value = usuario.Piso;
    inputNumero.value = usuario.Numero;

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
        //console.log(nombre + " " + apellido);


        let result = await (new CuentaDAO()).editar(id, nombre, apellido, tel, calle, numero, piso);
        console.log(result);
        if (result.sucess) {
            modalEditar.style.display = 'none'; // Cerrar modal
            //mostrarUsuarios(obtenerUsuario());
        }else {
            console.log(result.msj);
        }
    });
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
        `;
        let btnEditar = document.createElement("button");
        let btnEliminar = document.createElement("button");
        btnEliminar.innerHTML = "Eliminar";
        btnEditar.innerHTML = "Editar";

        btnEditar.classList.add("editar");
        btnEliminar.classList.add("eliminar");

        btnEditar.onclick = () => {
            btnEditar.id = usuario.Id_usuario;
            editarUsuario(usuario.Id_usuario)
        };
        btnEliminar.onclick = () => {

        }

        let td = document.createElement("td");
        td.appendChild(btnEliminar);
        td.appendChild(btnEditar);
        tr.appendChild(td);

        tbodyUsuarios.appendChild(tr);
    });
}

async function obtenerUsuario(id){
    let usuario = await (new CuentaDAO()).obtenerUsuario(id);
    return usuario;
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

let usuario = null; // Cliente seleccionado para editar

// Función para abrir el modal y editar los datos del cliente
function editarCliente(id) {
    usuario = clientes.find(cliente => cliente.id === id);

    // Rellenar los campos del formulario
    inputNombre.value = usuario.nombre;
    inputApellido.value = usuario.apellido;
    inputEmail.value = usuario.email;
    inputTelefono.value = usuario.telefono;
    inputCalle.value = usuario.direccion.calle;
    inputPiso.value = usuario.direccion.piso;
    inputNumero.value = usuario.direccion.numero;

    modalEditar.style.display = 'flex'; // Mostrar modal
}

// Función para guardar los cambios
formEditar.addEventListener('submit', function (e) {
    e.preventDefault();

    // Actualizar los datos del cliente
    usuario.nombre = inputNombre.value;
    usuario.apellido = inputApellido.value;
    usuario.email = inputEmail.value;
    usuario.telefono = inputTelefono.value;
    usuario.direccion.calle = inputCalle.value;
    usuario.direccion.piso = inputPiso.value;
    usuario.direccion.numero = inputNumero.value;

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
