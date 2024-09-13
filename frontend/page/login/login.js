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

        let result = await SesionDAO.iniciarSesion(email, pass);
        let jsonResult = await result.json();
        console.log(jsonResult);
    }
}