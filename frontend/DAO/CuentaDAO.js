export default class CuentaDAO {

    async obtener(){
        let url = "http://localhost/TheDigitals/backend/controller/CuentaController.php?fun=obtener";
        let response = await fetch(url);

        return await response.json();
    }

    async obtenerUsuario(id){
        let formdata  = new FormData();
        formdata.append('idUsuario', id);

        let url = "http://localhost/TheDigitals/backend/controller/CuentaController.php?fun=obtenerUsuario";
        let config = {
            method: 'POST',
            body: formdata
        };
        let response = await fetch(url, config);

        return response.json();
    }

    async crear(nombre, apellido, tel, calle, numero, piso, pass, email) {
        let formdata = new FormData();
        formdata.append('nombre', nombre);
        formdata.append('apell', apellido);
        formdata.append('tel', tel);
        formdata.append('calle', calle);
        formdata.append('num', numero);
        formdata.append('piso', piso);
        formdata.append('pass', pass);
        formdata.append('email', email);
    
        let url = "http://localhost/TheDigitals/backend/controller/CuentaController.php?fun=crear";
        let config = {
            method: 'POST',
            body: formdata
        };
    
        let response = await fetch(url, config);
        return await response.json();
       
    }
    
    
    async eliminar(id){
        let formdata = new FormData();
        formdata.append('id', id);
        let url = "http://localhost/TheDigitals/backend/controller/CuentaController.php?fun=eliminar";
        let config ={
            method: 'POST',
            body: formdata
        }
        let response = await fetch(url, config);
    }
    
    async recuperar(email){
        let formdata = new FormData();
        formdata.append('email', email);
        let url = "http://localhost/TheDigitals/TheDigitals/backend/controller/CuentaController.php?fun=recuperar";
        let config ={
            method: 'POST',
            body: formdata
        }
        let response = await fetch(url, config);
    }

    async editar(idUsuario, nombre, apellido, tel, calle, num, piso){
        let formdata = new FormData();
        formdata.append('idUsuario', idUsuario);
        formdata.append('nombre', nombre);
        formdata.append('apellido', apellido);
        formdata.append('tel', tel);
        formdata.append('calle', calle);
        formdata.append('num', num);
        formdata.append('piso', piso);
        let url = "http://localhost/TheDigitals/backend/controller/CuentaController.php?fun=editar";
        let config = {
            method: 'POST',
            body: formdata
        }
        let response = await fetch(url, config);
        return await response.json();
    }

}