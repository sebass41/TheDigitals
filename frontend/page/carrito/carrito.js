window.onload = () => {
    let productos = localStorage.getItem('carrito');
    mostrarProductos(productos);
}

function mostrarProductos(productos) {
    let containerProd = document.getElementById('containerProd');
    containerProd.innerHTML = '';

    if (productos) {
        productos = JSON.parse(productos);
        productos.forEach(prod => {
            let div = document.createElement('div');
            div.className = 'product';
            div.innerHTML = `
                <div class="producto">    
                    <img src='../../asset/burga/feroz_3.png' alt='Producto'>
                    <h3>${prod.Nombre}</h3>
                    <p>$${prod.precio}</p>
                    <input type='number' value='1' min='1' max='10'>
                    <button onclick='eliminarProducto(${prod.Id_prod})'>Eliminar</button>
                </div>
            `;
            containerProd.appendChild(div);
        });
    } else {
        containerProd.innerHTML = '<p>No hay productos en el carrito</p>';
    }
}

function eliminarProducto(prod) {
    let productos = JSON.parse(localStorage.getItem('carrito'));
    let productosFilter = productos.filter(p => p.Id_prod !== prod);
    localStorage.setItem('carrito', JSON.stringify(productosFilter));
    console.log(prod);
    console.log(productosFilter);
    mostrarProductos(productosFilter); // Pasa el array ya parseado
}