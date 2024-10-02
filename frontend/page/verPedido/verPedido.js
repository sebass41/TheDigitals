const pedidos = [
    { id: 1, descripcion: 'Pizza Margherita', estado: 'En preparación' },
    { id: 2, descripcion: 'Hamburguesa Clásica', estado: 'Listo' },
    { id: 3, descripcion: 'Tacos al Pastor', estado: 'Entregado' },
    { id: 4, descripcion: 'Ensalada César', estado: 'En preparación' } // Producto de prueba
];

// Seleccionamos el cuerpo de la tabla donde se mostrarán los pedidos
const listaPedidos = document.getElementById('lista-pedidos');

// Función para cargar los pedidos en la tabla
function cargarPedidos() {
    pedidos.forEach(pedido => {
        // Crear una fila
        const fila = document.createElement('tr');

        // Crear celdas para el número de pedido, descripción y estado
        const celdaPedido = document.createElement('td');
        const celdaDescripcion = document.createElement('td');
        const celdaEstado = document.createElement('td');

        // Asignar los valores de los pedidos a las celdas
        celdaPedido.textContent = `Pedido #${pedido.id}`;
        celdaDescripcion.textContent = pedido.descripcion;
        celdaEstado.textContent = pedido.estado;
        celdaEstado.classList.add('estado');

        // Añadir las celdas a la fila
        fila.appendChild(celdaPedido);
        fila.appendChild(celdaDescripcion);
        fila.appendChild(celdaEstado);

        // Añadir la fila a la tabla
        listaPedidos.appendChild(fila);
    });
}

// Cargar los pedidos cuando la página se carga
document.addEventListener('DOMContentLoaded', cargarPedidos);
