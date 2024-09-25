import SesionDAO from "../../DAO/SesionDAO.js";

window.onload = ()=>{
    login();
}

async function login(){
    let formElement = document.querySelector("#formLogin");
    formElement.onsubmit = async (e) =>{
        e.preventDefault();
        let formData = new FormData(formElement);
        let email = formData.get('email');
        let pass = formData.get('pass');

        let sesionDAO = new SesionDAO();

        let result = await sesionDAO.iniciarSesion(email, pass);
        let jsonResult = await result.json();

        if(jsonResult.sucess){
            let datos = jsonResult.data;
            guardarSesion(datos.Id_usuario, datos.Admin, datos.Nombre, datos.Apellido);
            alert("Se inició sesión correctamente");
            window.location.href = "http://localhost/TheDigitals/frontend/page/principal/index.html";
        }else{
            alert(jsonResult.msj);
        }
        console.log(jsonResult);
    }
}

function guardarSesion(id, admin, nombre, apellido){
    localStorage.setItem("idSesion", id);
    localStorage.setItem("admin", admin);
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("apellido", apellido);
}