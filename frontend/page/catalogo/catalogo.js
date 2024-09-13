window.onload = () => {
    eventoMenu();
}

function eventoMenu() {
    let btnMenu = document.querySelector("#flecha");

    let menuOpciones = document.querySelector("#catalogo");
    menuOpciones.classList.add("desactivado");

    if (menuOpciones.classList.contains("desactivado")) {
        btnMenu.onclick = () => {
            document.getElementById("flecha").style.display = 'none';
            menuOpciones.classList.remove("desactivado");
            menuOpciones.classList.add("activado");
        }
    }


}

function ocultar() {
    let menuOpciones = document.querySelector("#catalogo");
    menuOpciones.classList.add("desactivado");
    document.getElementById("flecha").style.display = 'block';
    menuOpciones.classList.remove("activado");
    menuOpciones.classList.add("desactivado");
}
