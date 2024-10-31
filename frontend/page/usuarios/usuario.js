import CuentaDAO from "../../DAO/CuentaDAO.js";

window.onload = async () => {
    let id = localStorage.getItem("idSesion")
    let datos = await (new CuentaDAO()).obtenerUsuario(id);
    let cuenta = datos.data[0]
    let btnEditar = document.getElementById("btnEditar");
    cargarDatos(cuenta);

    btnEditar.onclick = () => { editarCuenta(cuenta); };
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
        detalle.innerHTML += `<span>${datos[info]}</span> <img src="../../asset/icons/lapiz.png" >`;
        detalle.addEventListener("click", () => {
            let input = document.createElement("input");
            input.type = "text";
            input.value = detalle.innerText;
        })
    })

    // Añadir funcionalidad de edición
    document.querySelectorAll("p img").forEach(icon => {
        icon.addEventListener("click", () => {
            let parent = icon.parentNode;
            let text = parent.innerText.replace("✏️", "").trim();
            let input = document.createElement("input");
            input.type = "text";
            input.value = text;

            input.onblur = () => {
                parent.innerHTML = `<strong>${parent.firstChild.innerText}</strong> ${input.value} <span class="edit-icon">✏️</span>`;
                cargarDatos(datos); // Para restaurar funcionalidad de edición
            };

            parent.innerHTML = '';
            parent.appendChild(input);
            input.focus();
        });
    });
}
