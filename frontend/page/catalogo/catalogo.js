window.onload = ()=>{
    eventoMenu();
}

function eventoMenu(){
    let btnMenu = document.querySelector("#flecha");
    let menuOpciones = document.querySelector("#catalogo");
    btnMenu.onclick = ()=>{
        if(menuOpciones.classList.contains("activado")){
            menuOpciones.classList.remove("activado");
            menuOpciones.classList.add("desactivado");
        }else{
            menuOpciones.classList.remove("desactivado");
            menuOpciones.classList.add("activado");
        }
    }
}