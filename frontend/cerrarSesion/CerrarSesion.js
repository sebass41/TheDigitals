import SesionDAO from "../DAO/SesionDAO.js";

function agregarBotonSesion() {

    if (localStorage.getItem("idSesion")!== null){
        console.log("funcionarBotonCerrarSesion");
        document.querySelector('.menu').innerHTML += '<li><button id="cerrarSesion">Cerrar Sesión</button></li>';
        
        let btnSesion = document.querySelector("#cerrarSesion");
        btnSesion.addEventListener('click', async () => {
            localStorage.removeItem("idSesion");
            localStorage.removeItem("admin");
            let sesionDAO = new SesionDAO();
            let result = await sesionDAO.cerrarSesion();
            console.log(result);
            window.location.href = "../principal/index.html";
        });
}else {
    document.querySelector(".menu").innerHTML = '<li><a href="../catalogo/catalogo.html">Hacé tú Pedido</a></li>';
    document.querySelector('.menu').innerHTML += '<li><a href="../login/login.html">Iniciar Sesión</a></li>';
}
}

window.onload = async () => {
    console.log("sesion");
    agregarBotonSesion();
}
