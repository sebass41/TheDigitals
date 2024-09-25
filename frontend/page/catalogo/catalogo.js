import ProductoDAO from "../../DAO/ProductoDAO.js";
import SesionDAO from "../../DAO/SesionDAO.js";

window.onload = async () => {
    eventoMenu();
    let btnMenu = document.getElementById("flechaCatalogo");
    btnMenu.onclick = () => {
        ocultar();
    }

    let productos = await (new ProductoDAO()).obtener();
    cargarDato(productos.data);
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
    
    if (localStorage.getItem("idSesion") !== null) {
        document.querySelector("#iniciarSesion").style.display = 'none';
        document.querySelector("#cerrarSesion").style.display = 'inline';
        let btnSesion = document.querySelector("#cerrarSesion");
            btnSesion.addEventListener('click', async () => {
                localStorage.removeItem("idSesion");
                let sesionDAO = new SesionDAO();
                let result = await sesionDAO.cerrarSesion();
                console.log(result);
                location.reload();
            });
    }else{
        document.querySelector("#iniciarSesion").style.display = 'inline';
        document.querySelector("#cerrarSesion").style.display = 'none';
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
    let hamburguesas = productos.filter(producto => producto.tipo === 'hamburguesa');
    let bebidas = productos.filter(producto => producto.tipo === 'bebidas');
    let papas = productos.filter(producto => producto.tipo === 'papas');

    mostrarDatos(panchos, "sPanchos");
    mostrarDatos(hamburguesas, "sHamburguesas");
    mostrarDatos(bebidas, "sBebidas");
    mostrarDatos(papas, "sPapas");
}

function mostrarDatos(productos,idElemento) {
    console.log("Mostrar");
    if (productos.length === 0) {
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML = "<p>No hay productos disponibles</p>";
        return;
    }
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML = "";

    let fila;
    productos.forEach((producto, i) => {
        if (i === 0 || i%4 === 0) {
            fila = document.createElement("div");
            fila.classList.add("fila");
            elemento.appendChild(fila);
        }

        let tipoImg = producto.extencion;
        let rutaImg;
        if (tipoImg !== "png") {
            rutaImg = "../../asset/burga/noImg.jpg";
        }else{
            rutaImg = `../../../backend/img/producto/${producto.Id_prod}.png`
        }
        let card = document.createElement("div");
        card.classList.add("producto");
        card.id = producto.Id_prod;
        card.innerHTML = `
            <img src="${rutaImg}" alt="${producto.Nombre}">
            <h2>${producto.Nombre}</h2>
            <p>$${producto.precio}</p>
            `

            card.onclick = () => selecProd(producto);
            fila.appendChild(card);
})
}

function selecProd(producto) {
    if (localStorage.getItem("idSesion") !== null){
        localStorage.setItem('productoSelec', JSON.stringify(producto));
        window.location.href = "../productoG/producto.html";
    }else{
        alert("Debes iniciar sesión para ver el producto");
    }
}