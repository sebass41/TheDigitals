import CuentaDAO from "../../DAO/CuentaDAO";

window.onload = ()=>{
    insertar();
}

function insertar(){
    let formElement = document.querySelector("#formRegister");
    formElement.onsubmit = async (e) =>{
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
        await CuentaDAO.crear(nombre, apellido, tel, calle, num, piso, pass, email);
    }
}