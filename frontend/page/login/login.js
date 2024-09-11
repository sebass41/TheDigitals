import SesionDAO from "../../DAO/SesionDAO";

window.onload = ()=>{
    login();
}

function login(){
    let formElement = document.querySelector("#formLogin");
    formElement.onsubmit = async (e) =>{
        e.preventDefault();
        let formData = new FormData(formElement);
        let email = formData.get('email');
        let pass = formData.get('pass');
        await SesionDAO.iniciarSesion(email, pass);
    }
}