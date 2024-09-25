window.onload = function () {
    let productosCarrito = obtenerProductosCarrito();
    mostrarProductosCarrito(productosCarrito, 'productos');
}

function obtenerProductosCarrito() {
    // Obtener los productos del carrito desde el localStorage
    let productos = JSON.parse(localStorage.getItem('carrito')) || [];
    return productos;
}

function mostrarProductosCarrito(productos, idElemento) {
    let elemento = document.getElementById(idElemento);
    
    if (productos.length === 0) {
        elemento.innerHTML = "<p>No hay productos en el carrito</p>";
        return;
    }

    elemento.innerHTML = "";

    productos.forEach(producto => {
        let card = document.createElement("div");
        card.classList.add("producto");

        let rutaImg = producto.extencion !== "png" 
            ? "../../asset/burga/noImg.jpg"
            : `../../../backend/img/producto/${producto.Id_prod}.png`;

        card.innerHTML = `
            <img src="${rutaImg}" alt="${producto.Nombre}">
            <p>${producto.descripcion}</p>
            <input type="number" value="${producto.cantidad}" min="1" class="cantidad" data-id="${producto.Id_prod}">
            <p>$<span class="precio">${producto.precio}</span></p>
            <p>Total: $<span class="total">${(producto.precio * producto.cantidad).toFixed(2)}</span></p>
        `;

        elemento.appendChild(card);
    });

    actualizarTotales();
    agregarListeners();
}

function agregarListeners() {
    let inputsCantidad = document.querySelectorAll('.cantidad');
    
    inputsCantidad.forEach(input => {
        input.addEventListener('input', function () {
            let idProd = this.dataset.id;
            let nuevaCantidad = parseInt(this.value);
            actualizarProductoCarrito(idProd, nuevaCantidad);
        });
    });
}

function actualizarProductoCarrito(idProd, nuevaCantidad) {
    let productosCarrito = obtenerProductosCarrito();

    productosCarrito.forEach(producto => {
        if (producto.Id_prod === idProd) {
            producto.cantidad = nuevaCantidad;
        }
    });

    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
    mostrarProductosCarrito(productosCarrito, 'productos');
}

function actualizarTotales() {
    let productos = document.querySelectorAll('.producto');
    productos.forEach(producto => {
        let cantidad = producto.querySelector('.cantidad').value;
        let precio = producto.querySelector('.precio').textContent;
        let total = producto.querySelector('.total');
        total.textContent = (cantidad * precio).toFixed(2);
    });
}
