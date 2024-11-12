import CuentaDAO from "../../DAO/CuentaDAO.js";

window.onload= async ()=>{
    let tokenExiste = await buscarToken();
    console.log(tokenExiste)
    if(!tokenExiste[0]){
        window.location.href = "../login/login.html";
    }
    await resetPassword();
    eyeAnimation();
}

function eyeAnimation(){
    const eye1 = document.getElementById('eye1');
    const eye2 = document.getElementById('eye2');
    const passInput = document.getElementById('pass');
    const passConfirmInput = document.getElementById('passconfirm');
    
    // Mostrar u ocultar la contraseña en el primer campo
    eye1.addEventListener('click', function() {
        if (passInput.type === "password") {
            passInput.type = "text";
            eye1.src = "../../asset/icons/ojoabierto.png";  // Cambiar la imagen a "ojo abierto"
        } else {
            passInput.type = "password";
            eye1.src = "../../asset/icons/ojocerrado.png";  // Cambiar la imagen a "ojo cerrado"
        }
    });
    
    // Mostrar u ocultar la contraseña en el segundo campo
    eye2.addEventListener('click', function() {
        if (passConfirmInput.type === "password") {
            passConfirmInput.type = "text";
            eye2.src = "../../asset/icons/ojoabierto.png";  // Cambiar la imagen a "ojo abierto"
        } else {
            passConfirmInput.type = "password";
            eye2.src = "../../asset/icons/ojocerrado.png";  // Cambiar la imagen a "ojo cerrado"
        }
    });

}

async function buscarToken(){
    let url = new URL(window.location.href);
    let parametros = url.searchParams;
    let token = parametros.get("token");
    
    if(token){
        let existe = await (new CuentaDAO()).buscarToken(token);
        if(existe.sucess){
            return [true, token];
        }else{
            alert("El token no es válido o ha expirado");
            return [false];
            
        }
    }
}

async function resetPassword(){
    let formElement = document.getElementById("form-recuperacion");
    formElement.onsubmit = async (e) =>{
        e.preventDefault();

        let token = await buscarToken();
        let formData = new FormData(formElement);
        let pass = formData.get("password");
        let passConfirm = formData.get("passconfirm");

        if (pass === passConfirm){
            let result = await (new CuentaDAO()).resetPassword(token[1], pass);

            if(result.sucess){
                alert("Contraseña cambiada correctamente");
                window.location.href = "../login/login.html";
            }else{
                alert(result.msj);
            }
        }
        
    }
}
