window.onload = () => {
    let producto = JSON.parse(localStorage.getItem('productoSelec'));

    if (producto) {
        // Reemplazar los datos en el HTML
        document.getElementById('nombre').textContent = producto.Nombre;
        document.querySelector('.preciotxt').textContent = `$${producto.precio}`;
        document.querySelector('#img img').src = "../../asset/burga/feroz_3.png";
        document.querySelector('.text-description p').innerHTML = producto.Descripcion; // Actualiza la descripción
    } else {
        console.log('No se seleccionó ningún producto');
    }
};

function selecProd(producto) {
    if (localStorage.getItem("idSesion") !== null){
        localStorage.setItem('productoSelec', JSON.stringify(producto));
        if (producto.tipo === "hamburguesa"){
            window.location.href = "../productoH/producto.html";
        }else {
            console.log("otro");
        }
    }else{
        alert("Debes iniciar sesión para ver el producto");
    }
}