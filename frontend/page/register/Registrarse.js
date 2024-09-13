import CuentaDAO from "../../DAO/CuentaDAO.js";

window.onload = () => {
    crearCuenta();
}

async function crearCuenta() {
    let formElement = document.querySelector("#formRegister");
    if (formElement) {
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
            try {
                if(validarDatos){
                    let result = await CuentaDAO.crear(nombre, apellido, tel, calle, num, piso, pass, email);
                    let jsonResult = await result.json();

                    if(jsonResult.sucess){
                        window.location.href = "../login/login.html";
                    }
                    console.log(jsonResult);
                }
            } catch (error) {
                console.error("Error al crear la cuenta:", error);
            }
        }
    } else {
        console.error("Formulario no encontrado");
    }
}

function validarDatos(){
    valido = true;

    return valido;
}