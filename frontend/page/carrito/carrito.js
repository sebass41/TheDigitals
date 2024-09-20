window.onload = () => {
const Precio = 5.00; // Precio base del producto

function actualizarPrecio() {
    const cantidad = document.getElementById('cantidad').value;
    const total = Precio * cantidad;
    document.getElementById('total').innerText = total.toFixed(2);
}

// Añadir un evento para actualizar el precio cuando cambie la cantidad
document.getElementById('cantidad').addEventListener('input', actualizarPrecio);
}