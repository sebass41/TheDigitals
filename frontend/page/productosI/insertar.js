import ProductoDAO from "../../DAO/ProductoDAO.js";

window.onload = ()=>{
    insertar();
}

async function insertar(){
    let formElement = document.querySelector("#formProducto");
    formElement.onsubmit = async (e) =>{
        e.preventDefault();
        let formData = new FormData(formElement);
        let tipo = formData.get('tipo');
        let nombre = formData.get('nombre');
        let descripcion = formData.get('descripcion');
        let precio = formData.get('precio');
        let img = formData.get('img');

        let result = await ProductoDAO.insertar(tipo, nombre, descripcion, img, precio);
        let jsonResult = await result.json();

        if(jsonResult.sucess){
            alert("Se agregó correctamente");
        }
        console.log(jsonResult);
    }
}