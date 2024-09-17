import ProductoDAO from "../../DAO/ProductoDAO.js";

console.log("ProductoDAO");
window.onload = async () => {
    let productos = localStorage.getItem("productoSelec");
    productos = JSON.parse(productos);
    console.log(productos);
}

function mostrarProducto(producto) {
    
}

