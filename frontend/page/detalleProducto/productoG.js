window.onload = () => {
    let producto = JSON.parse(localStorage.getItem('productoSelec'));

    if (producto) {
        document.querySelector('#nombre').textContent = producto.Nombre;
        document.querySelector('.preciotxt').textContent = `$${producto.precio}`;
        document.querySelector('#img img').src = `../../../backend/img/producto/${producto.Id_prod}.${producto.extencion}`;
        console.log(producto.Id_prod)
        document.querySelector('#text-description p').innerHTML = producto.Descripcion;
    } else {
        console.log('No se seleccionó ningún producto');
    }
};


function agregar() {
    let producto = JSON.parse(localStorage.getItem('productoSelec'));

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    let productoExistente = carrito.some(item => item.Id_prod === producto.Id_prod);

    if (!productoExistente) {
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    } else {
        console.log("El producto ya está en el carrito.");
    }
}
