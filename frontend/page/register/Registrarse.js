import CuentaDAO from "../../DAO/CuentaDAO.js";
window.onload = () => {
    crearCuenta();
}

async function crearCuenta() {
    let formElement = document.querySelector("#formRegister");

        formElement.onsubmit = async (e) => {
            e.preventDefault();
            let formData = new FormData(formElement);
            let nombre = formData.get("nombre");
            let apellido = formData.get("apell");
            let tel = formData.get("tel");
            let calle = formData.get("calle");
            let num = formData.get("num");
            let piso = formData.get("piso");
            let email = formData.get('email');
            let pass = formData.get('pass');
            let passRepeat = formElement.querySelector('#passRepeat').value;
            if(validarDatos(nombre, apellido, tel, email, pass, passRepeat, calle, num)) {
                let result = await new CuentaDAO().crear(nombre, apellido, tel, calle, num, piso, pass, email);

                if (result.success) {
                    window.location.href = "../login/login.html";
                }
                console.log(result.msj);
            }
        }

}

function validarDatos(nombre, apellido, tel, email, pass, passRepeat, calle, num) {
    let valido = true;
    let mensajes = [];

    // Validar nombre y apellido
    if (nombre.trim() === "") {
        mensajes.push("El nombre no puede estar vacío");
        valido = false;
    }
    if (apellido.trim() === "") {
        mensajes.push("El apellido no puede estar vacío");
        valido = false;
    }

    // Validar email
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        mensajes.push("El correo electrónico no es válido");
        valido = false;
    }

    // Validar teléfono
    if (!tel.match(/^\d+$/)) {
        mensajes.push("El teléfono solo debe contener números");
        valido = false;
    }

    // Validar contraseñas
    if (!validarPass(pass)) {
        mensajes.push("La contraseña debe tener al menos 8 caracteres. Además contener al menos una mayúscula y un número");
        valido = false;
    }
    if (pass !== passRepeat) {
        mensajes.push("Las contraseñas no coinciden");
        valido = false;
    }

    // Validar dirección
    if (calle.trim() === "" || num.trim() === "") {
        mensajes.push("La calle y el número son obligatorios");
        valido = false;
    }

    // Mostrar mensajes de error
    if (!valido) {
        mostrarErrores(mensajes);
    }

    return valido;
}

function validarPass(password) {
    if (password.length < 8) {
        return false;
    }
  
    var hasNumber = /\d/.test(password);
  
    var hasUpperCase = /[A-Z]/.test(password);
  
    console.log(password);
    return hasNumber && hasUpperCase;
  }

function mostrarErrores(mensajes) {
    let errorContainer = document.createElement("div");
    errorContainer.classList.add("error-container");
    
    mensajes.forEach(msg => {
        let error = document.createElement("p");
        error.innerText = msg;
        error.classList.add("error-message");
        errorContainer.appendChild(error);
    });

    // Eliminar mensajes anteriores si existen
    let prevErrorContainer = document.querySelector(".error-container");
    if (prevErrorContainer) {
        prevErrorContainer.remove();
    }

    document.querySelector("form").appendChild(errorContainer);
}
