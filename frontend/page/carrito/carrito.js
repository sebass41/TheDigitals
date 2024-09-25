window.onload = () => {
    let productos = localStorage.getItem('carrito');
    productos = JSON.parse(productos);
    mostrarProductos(productos);
    let detalle = obtenerDetalle(productos);
    mostrarDetalle(detalle);
}

function mostrarProductos(productos) {
    let containerProd = document.getElementById('containerProd');
    containerProd.innerHTML = '';

    if (productos) {
        productos.forEach(prod => {
            let div = document.createElement('div');
            div.className = 'product';
            div.innerHTML = `
                <div class="producto">    
                    <img src='../../asset/burga/feroz_3.png' alt='Producto'>
                    <h3>${prod.Nombre}</h3>
                    <p>$${prod.precio}</p>
                    <input type='number' id="${prod.Id_prod}" value='1' min='1' max='10'>
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

    let productosFilter = productos.filter(p => {
        console.log('Producto actual:', p.Id_prod);
        return p.Id_prod !== prod;
    });

    console.log('Productos después de filtrar:', productosFilter);

    localStorage.setItem('carrito', JSON.stringify(productosFilter));
    mostrarProductos(productosFilter);
}

function obtenerDetalle(productos) {
    let cantidad = 0;
    let total = 0;
    productos.forEach(prod => {
        let idP = document.getElementById(prod.Id_prod);
        console.log('Producto actual:', prod);
        console.log('Cantidad actual:', idP.value);
        cantidad += parseInt(idP.value);
        total += prod.precio * idP.value;
    });
    return [total, cantidad]
}

function mostrarDetalle(detalle) {
    let container = document.querySelector('.comprar');
    container.innerHTML = `
        <h2>Confirmar Compra</h2>
        <p>Total: $${detalle[0]}</p>
        <p>Cantidad: ${detalle[1]}</p>
        <button onclick='pagar()'>Pagar</button>
    `;  
}