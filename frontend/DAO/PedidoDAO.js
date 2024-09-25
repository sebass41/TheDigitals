export default class PedidoDAO{

    async obtener(){
        let url = "http://localhost/TheDigitals/TheDigitals/backend/controller/PedidoController.php?fun=obtener";
        let response = await fetch(url);
    }
    
    async realizar(calle, numCasa, lugarRetiro, productos){
        let formdata = new FormData();
        formdata.append('calle', calle);
        formdata.append('numCasa', numCasa);
        formdata.append('lugarRetiro', lugarRetiro);
        formdata.append('productos', JSON.stringify(productos));
        let url = "http://localhost/TheDigitals/TheDigitals/backend/controller/PedidoController.php?fun=realizar";
        let config ={
            method: 'POST',
            body: formdata
        }
        let response = await fetch(url, config);
        return response.json();
    }
    
    async modEstado(estado){
        let formdata = new FormData();
        formdata.append('estado', estado);
        let url = "http://localhost/TheDigitals/TheDigitals/backend/controller/PedidoController.php?fun=modEstado";
        let config ={
            method: 'POST',
            body: formdata
        }
        let response = await fetch(url, config);
    }
    
    async obtenerA(){
        let url = "http://localhost/TheDigitals/TheDigitals/backend/controller/PedidoController.php?fun=obtenerA";
        let response = await fetch(url);
    }
    
    async eliminarP(id){
        let formdata = new FormData();
        formdata.append('id', id);
        let url = "http://localhost/TheDigitals/TheDigitals/backend/controller/PedidoController.php?fun=eliminarP";
        let config ={
            method: 'POST',
            body: formdata
        }
        let response = await fetch(url, config);
    }    
}