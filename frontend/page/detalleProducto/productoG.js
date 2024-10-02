window.onload = () => {
    let producto = JSON.parse(localStorage.getItem('productoSelec'));

    if (producto) {
        // Reemplazar los datos en el HTML
        document.querySelector('#nombre').textContent = producto.Nombre;
        document.querySelector('.preciotxt').textContent = `$${producto.precio}`;
        document.querySelector('#img img').src = "../../asset/burga/feroz_3.png";
        document.querySelector('#text-description p').innerHTML = producto.Descripcion;
    } else {
        console.log('No se seleccionó ningún producto');
    }
};


function agregar() {
    // Obtener el producto seleccionado desde el localStorage
    let producto = JSON.parse(localStorage.getItem('productoSelec'));

    // Obtener el carrito actual, si existe
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verificar si el producto ya está en el carrito usando 'some'
    let productoExistente = carrito.some(item => item.Id_prod === producto.Id_prod);

    if (!productoExistente) {
        // Si el producto no está en el carrito, agregarlo
        carrito.push(producto);
        // Guardar el carrito actualizado en el localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
    } else {
        console.log("El producto ya está en el carrito.");
    }
}
