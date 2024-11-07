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
        let img = formData.get('img');
        let precio = formData.get('precio');
        let result = await new ProductoDAO().insertar(tipo, nombre, descripcion, img, precio);
        let jsonResult = await result.json();

        console.log(precio)

        if(jsonResult.sucess && precio > 0){
            alert(jsonResult.msj);
            formElement.reset();
        }
        else{
            alert("El precio debe ser mayor a 1");
        }
        console.log(jsonResult);
    }
}



