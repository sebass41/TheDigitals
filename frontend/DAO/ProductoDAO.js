export default class ProductoDAO{

    async obtener(){
        let url = "http://localhost/TheDigitals/backend/controller/ProductoController.php?fun=obtener";
        let response = await fetch(url);
        return await response.json();
    }
    
    async insertar(tipo, nombre, descripcion, img, precio){
        let formdata = new FormData();
        formdata.append('tipo', tipo);
        formdata.append('nombre', nombre);
        formdata.append('descripcion', descripcion);
        formdata.append('img', img);
        formdata.append('precio', precio);
        let url = "http://localhost/TheDigitals/backend/controller/ProductoController.php?fun=insertar";
        let config = {
            method: 'POST',
            body: formdata
        }

        let response = await fetch(url, config);
        return response;
    }
    
    async actualizar(id, tipo, nombre, descripcion, categoria, img, precio){
        let formdata = new FormData();
        formdata.append('id', id);
        formdata.append('tipo', tipo);
        formdata.append('nombre', nombre);
        formdata.append('descripcion', descripcion);
        formdata.append('categoria', categoria);
        formdata.append('img', img);
        formdata.append('precio', precio);
        let url = "http://localhost/TheDigitals/TheDigitals/backend/controller/ProductoController.php?fun=actualizar";
        let config ={
            method: 'POST',
            body: formdata
        }
        let response = await fetch(url, config);
    }
    
     async eliminar(id){
        let formdata = new FormData();
        formdata.append('id', id);
        let url = "http://localhost/TheDigitals/TheDigitals/backend/controller/ProductoController.php?fun=eliminar";
        let config ={
            method: 'POST',
            body: formdata
        }
        let response = await fetch(url, config);
    }
}