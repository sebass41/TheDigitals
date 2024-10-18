document.addEventListener('DOMContentLoaded', () => {
    let menu = document.querySelector('.menu');

    if (localStorage.getItem('admin') == true){
        mostrarMenuAdmin(menu);
    }else{
        mostrarMenu(menu);
    }
});

function mostrarMenu(menu) {
    if (localStorage.getItem('idSesion') !== null){
        menu.innerHTML += `<li><a href="../catalogo/catalogo.html">Hacé tú pedido</a></li>`;
        menu.innerHTML += `<li><a href="../carrito/carrito.html">Carrito</a></li>`;
        menu.innerHTML += `<li><a href="../estadopedido/estadopedido.html">Estado del pedido</a></li>`;
        menu.innerHTML += `<li><a href="../Historialpedido/historialpedido.html">Pedidos realizados</a></li>`;
        menu.innerHTML += `<li><a href="../contacto/contacto.html">Contacto</a></li>`;    
        menu.innerHTML += `<li><a href="../usuarios/usuarios.html">Perfil</a></li>`;    
    }else {
        menu.innerHTML = "";
    }
}

function mostrarMenuAdmin(menu) {
    if (localStorage.getItem('idSesion') !== null){
        menu.innerHTML += `<li><a href="../productosI/insertar.html">Insertar Productos</a></li>`;
        menu.innerHTML += `<li><a href="../pedidosAdmin/pedidosadmin.html">Gestionar Pedidos</a></li>`;
        menu.innerHTML += `<li><a href="../masVendido/masVendido.html">Productos más vendidos</a></li>`;
        menu.innerHTML += `<li><a href="../productoCRUD/productoCrud.html">Gestionar Productos</a></li>`;
        menu.innerHTML += `<li><a href="../Gcliente/Gcliente.html">Gestionar Usuarios</a></li>`;    
    }
}

function cerrarSesion() {
    console.log("ola");
}