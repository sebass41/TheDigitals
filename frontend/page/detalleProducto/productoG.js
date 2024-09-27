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


function agregar(){
    let producto = JSON.parse(localStorage.getItem('productoSelec'));
    console.log(producto);

    let carrito = localStorage.getItem('carrito');
    if (carrito === null) {
        carrito = [];
    } else {
        carrito = JSON.parse(carrito);
    }

    if (carrito.some(productoCarrito => productoCarrito.Id_prod === producto.Id_prod)) {
        alert('Este producto ya está en el carrito');
        return;
    } else {
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert(`Producto agregado: ${JSON.stringify(carrito)}`);
    }
}