import CuentaDAO from "../../DAO/CuentaDAO.js";

window.onload = async () => {
    let id = localStorage.getItem("idSesion")
    let datos = await (new CuentaDAO()).obtenerUsuario(id);
    let cuenta = datos.data[0];
    cargarDatos(cuenta);
};

function cargarDatos(datos) {
    let headerPerfil = document.querySelector(".profile-header");
    let detallePerfil = document.querySelectorAll(".infoEdit");

    headerPerfil.innerHTML = `
        <img src="../../asset/isotipo/feroz-cara.png" alt="Foto de perfil" class="profile-pic">
        <h1 id="nombreUsuario">${datos.Nombre} ${datos.Apellido}</h1>
        <p>${datos.Mail}</p>
    `;

    detallePerfil.forEach(detalle => {
        let info = detalle.id;
        let content = document.createElement("span");
        let imgEdit = document.createElement("img");

        detalle.innerHTML = `<strong>${info}: </strong>`
        content.innerText = datos[info];

        imgEdit.src = "../../asset/icons/lapiz.png";
        imgEdit.classList.add("edit-icon");
        imgEdit.onclick = () => {editarDato(imgEdit, datos, info);};

        content.appendChild(imgEdit);
        detalle.appendChild(content);
    })
    
}

function editarDato(element, datos, info){
    let parent = element.parentNode;
    let text = parent.innerText;
    let input = document.createElement("input");
    input.type = "text";
    input.value = text;

    input.onblur = () => {
        datos[info] = input.value; // Actualiza el dato en el objeto `datos`
        parent.innerHTML = `${input.value} <img src="../../asset/icons/lapiz.png" class="edit-icon">`;
        parent.querySelector(".edit-icon").onclick = () => editarDato(parent.querySelector(".edit-icon"), datos, info); // Restaura funcionalidad de edición
    };

    parent.innerHTML = '';
    parent.appendChild(input);
    input.focus();

}
