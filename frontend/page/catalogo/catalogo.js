import ProductoDAO from "../../DAO/ProductoDAO.js";

window.onload = async () => {
    eventoMenu();
    productos = await (new ProductoDAO()).obtener();

}

function eventoMenu() {
    let btnMenu = document.querySelector("#flecha");

    let menuOpciones = document.querySelector("#catalogo");
    menuOpciones.classList.add("desactivado");

    if (menuOpciones.classList.contains("desactivado")) {
        btnMenu.onclick = () => {
            document.getElementById("flecha").style.display = 'none';
            menuOpciones.classList.remove("desactivado");
            menuOpciones.classList.add("activado");
        }
    }


}

function ocultar() {
    let menuOpciones = document.querySelector("#catalogo");
    menuOpciones.classList.add("desactivado");
    document.getElementById("flecha").style.display = 'block';
    menuOpciones.classList.remove("activado");
    menuOpciones.classList.add("desactivado");
}

function cargarDato(productos) {
    let panchos = productos.filter(producto => producto.tipo === 'panchos');
    let hamburguesas = productos.filter(producto => producto.tipo === 'hamburguesas');
    let bebidas = productos.filter(producto => producto.tipo === 'bebidas');
    let papas = productos.filter(producto => producto.tipo === 'papas');

    mostrarDatos(panchos, "sPanchos");
    mostrarDatos(hamburguesas, "sHamburguesas");
    mostrarDatos(bebidas, "sBebidas");
    mostrarDatos(papas, "sPapas");
}

function mostrarDatos(productos,idElemento) {
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML = "";

    productos.forEach(producto => {
        let card = document.createElement("div");
})
}