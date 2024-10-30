import CuentaDAO from "../../DAO/CuentaDAO.js";

window.onload = async () => {
    let id = localStorage.getItem("idSesion")
    let datos = await (new CuentaDAO()).obtenerUsuario(id);
    let cuenta = datos.data[0]
    cargarDatos(cuenta);
};

function cargarDatos(datos){
    let headerPerfil = document.querySelector(".profile-header");
    let detallePerfil = document.querySelector(".profile-details");

    headerPerfil.innerHTML = `
        <img src="../../asset/isotipo/feroz-cara.png" alt="Foto de perfil" class="profile-pic">
        <h1 id="nombreUsuario">${datos.Nombre} ${datos.Apellido}</h1>
        <p>Correo electrónico: ${datos.Mail}</p>
    `;

    detallePerfil.innerHTML = `
        <h2>Detalles del Perfil</h2>
        <p><strong>Nombre:</strong> ${datos.Nombre}</p>
        <p><strong>Correo Electrónico:</strong> ${datos.Mail}</p>
        <p><strong>Dirección:</strong> ${datos.Calle}, ${datos.Numero}</p>
        <p><strong>Teléfono:</strong> ${datos.Tel}</p>
    `;
}