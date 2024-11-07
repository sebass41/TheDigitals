window.onload=()=>{
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