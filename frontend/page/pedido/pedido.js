// Estados de pedido posibles
const estados = ["En Proceso", "Cocinando", "Terminado", "Enviado", "Llegó a su domicilio"];

// Datos de pedidos (simulados, en un proyecto real se obtendrían de un servidor)
let pedidos = [];

// Lista de pedidos entregados
let pedidosEntregados = [];

// Generar un nuevo ID para el pedido
function generarIdPedido() {
    return pedidos.length ? Math.max(...pedidos.map(p => p.id)) + 1 : 1;
}

// Función para agregar un nuevo pedido con datos aleatorios
function agregarPedido() {
    const nuevoPedido = {
        id: generarIdPedido(),
        estado: 0 // Estado inicial "En Proceso"
    };
    pedidos.push(nuevoPedido); // Agregar el nuevo pedido al array
    renderizarTabla(); // Volver a renderizar la tabla
}

// Función para renderizar la tabla con los pedidos
function renderizarTabla() {
    const tablaPedidos = document.getElementById("tabla-pedidos");
    tablaPedidos.innerHTML = ''; // Limpiar la tabla antes de volver a generar

    pedidos.forEach((pedido) => {
        const fila = document.createElement("tr");

        // Columna del número de pedido
        const colPedido = document.createElement("td");
        colPedido.innerText = `Pedido ${pedido.id}`;
        fila.appendChild(colPedido);

        // Columna del estado actual del pedido
        const colEstado = document.createElement("td");
        colEstado.innerText = estados[pedido.estado];
        fila.appendChild(colEstado);

        // Columna del botón para cambiar el estado
        const colBoton = document.createElement("td");
        const boton = document.createElement("button");
        boton.innerText = "Cambiar Estado";
        boton.addEventListener("click", () => cambiarEstadoPedido(pedido.id));
        colBoton.appendChild(boton);
        fila.appendChild(colBoton);

        // Añadir la fila a la tabla
        tablaPedidos.appendChild(fila);
    });
}

// Función para cambiar el estado de un pedido
function cambiarEstadoPedido(idPedido) {
    const pedido = pedidos.find(p => p.id === idPedido);
    if (pedido) {
        pedido.estado = (pedido.estado + 1) % estados.length; // Cambiar al siguiente estado cíclicamente
        renderizarTabla(); // Volver a renderizar la tabla

        // Si el estado es "Llegó a su domicilio", mostrar un mensaje y eliminar después de 5 segundos
        if (pedido.estado === estados.length - 1) {
            setTimeout(() => {
                eliminarPedido(idPedido);
            }, 5000); // 5000 milisegundos = 5 segundos

            // Mostrar un mensaje en la tabla antes de eliminar
            const tablaPedidos = document.getElementById("tabla-pedidos");
            const fila = document.createElement("tr");
            const colMensaje = document.createElement("td");
            colMensaje.colSpan = 3;
            colMensaje.innerText = `Eliminando Pedido ${pedido.id} en 5 segundos...`;
            fila.appendChild(colMensaje);
            tablaPedidos.appendChild(fila);
        }
    }
}

// Función para eliminar el pedido después de que llegue a su domicilio
function eliminarPedido(idPedido) {
    const pedidoEliminado = pedidos.find(p => p.id === idPedido);
    pedidosEntregados.push(pedidoEliminado); // Agregar el pedido a la lista de entregados
    pedidos = pedidos.filter(pedido => pedido.id !== idPedido); // Filtrar el pedido del array de pedidos
    renderizarTabla(); // Volver a renderizar la tabla sin el pedido eliminado
}

// Mostrar pedidos entregados
document.getElementById("mostrar-entregados").addEventListener("click", () => {
    const listaEntregados = document.getElementById("lista-entregados");
    listaEntregados.innerHTML = ''; // Limpiar la lista antes de agregar nuevos pedidos

    if (pedidosEntregados.length > 0) {
        pedidosEntregados.forEach(pedido => {
            const item = document.createElement("li");
            item.innerText = `Pedido ${pedido.id} - ${estados[pedido.estado]}`;
            listaEntregados.appendChild(item);
        });
        listaEntregados.style.display = 'block'; // Mostrar la lista
    } else {
        listaEntregados.innerHTML = '<li>No hay pedidos entregados</li>';
    }
});

// Añadir evento al botón "Añadir Pedido"
document.getElementById("agregar-pedido").addEventListener("click", agregarPedido);

// Renderizar la tabla al cargar la página
window.onload = renderizarTabla;
