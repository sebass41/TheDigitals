export default class PedidoDAO{

    async obtenerPedido(){
        let url = "http://localhost/TheDigitals/backend/controller/PedidoController.php?fun=obtenerA";
        let response = await fetch(url);
        
        return response.json();
    }
    
    async realizar(piso, calle, numCasa, lugarRetiro, productos, total){
        let formdata = new FormData();
        formdata.append('piso', piso);
        formdata.append('calle', calle);
        formdata.append('numCasa', numCasa);
        formdata.append('lugarRetiro', lugarRetiro);
        formdata.append('total', total);
        formdata.append('productos', JSON.stringify(productos));
        let url = "http://localhost/TheDigitals/backend/controller/PedidoController.php?fun=realizar";
        let config ={
            method: 'POST',
            body: formdata
        }
        let response = await fetch(url, config);
        return response.json();
    }
    
    async modEstado(estado){
        let formdata = new FormData();
        formdata.append('idPedido', idPedido);
        formdata.append('estado', estado);
        let url = "http://localhost/TheDigitals/backend/controller/PedidoController.php?fun=modEstado";
        let config = {
            method: 'POST',
            body: formdata
        }
        let response = await fetch(url, config);
    }
    
    async obtenerPedidos(){
        let url = "http://localhost/TheDigitals/backend/controller/PedidoController.php?fun=obtenerPedidos";
        let response = await fetch(url);
        
        return response.json();
    }
    
    async obtenerDetallePedido(idPedido){
        let formdata = new FormData();
        formdata.append('idPedido', idPedido);
        let url = "http://localhost/TheDigitals/backend/controller/PedidoController.php?fun=obtenerDetalle";
        let config = {
            method: 'POST',
            body: formdata
        };

        let response = await fetch(url, config);
        return response.json();
    }
    async finalizarPedido(id){
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