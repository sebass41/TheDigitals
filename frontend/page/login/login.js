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
            guardarSesion(jsonResult.data.Id_usuario, jsonResult.data.Admin);
            alert("Se inició sesión correctamente");
            window.location.href = "http://localhost/TheDigitals/frontend/page/principal/index.html";
        }else{
            alert(jsonResult.msj);
        }
        console.log(jsonResult);
    }
}

function guardarSesion(id, admin){
    localStorage.setItem("idSesion", id);
    localStorage.setItem("admin", admin);
}