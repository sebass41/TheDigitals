import origin from "../config/origin.js";

export default class ProductoDAO{

    async obtener(){
        let url = origin + "/backend/controller/ProductoController.php?fun=obtener";
        let response = await fetch(url);
        return response.json();
    }
    
    async insertar(tipo, nombre, descripcion, img, precio){
        let formdata = new FormData();
        formdata.append('tipo', tipo);
        formdata.append('nombre', nombre);
        formdata.append('descripcion', descripcion);
        formdata.append('img', img);
        formdata.append('precio', precio);
        let url = origin + "/backend/controller/ProductoController.php?fun=insertar";
        let config = {
            method: 'POST',
            body: formdata
        }

        let response = await fetch(url, config);
        return response;
    }
    
    async editar(id, tipo, nombre, descripcion, precio){
        let formdata = new FormData();
        formdata.append('id', id);
        formdata.append('tipo', tipo);
        formdata.append('nombre', nombre);
        formdata.append('descripcion', descripcion);
        formdata.append('precio', precio);
        let url = origin + "/backend/controller/ProductoController.php?fun=editar";
        let config ={
            method: 'POST',
            body: formdata
        }
        let response = await fetch(url, config);
 
        return response.json();
    }
    
     async eliminar(id){
        let formdata = new FormData();
        formdata.append('id', id);
        let url = origin + "/backend/controller/ProductoController.php?fun=eliminar";
        let config ={
            method: 'POST',
            body: formdata
        }
        let response = await fetch(url, config);
        
    }

    async obtenerMasVendido(){
        let url = origin + "/backend/controller/ProductoController.php?fun=masVendidos";
        let response = await fetch(url);

        return response.json();
    }

    async obtenerProducto(id){
        let formdata = new FormData();
        formdata.append('id', id);
        let url = origin + "/backend/controller/ProductoController.php?fun=obtenerProducto"
        let config = {
            method: 'POST',
            body: formdata
        }
        let response = await fetch(url, config);

        return response.json();
    }
}