import origin from "../config/origin.js";

export default class CuentaDAO {

    async obtener(){
        let url = origin + "/backend/controller/CuentaController.php?fun=obtener";
        let response = await fetch(url);

        return await response.json();
    }

    async obtenerUsuario(id){
        let formdata  = new FormData();
        formdata.append('idUsuario', id);

        let url = origin + "/backend/controller/CuentaController.php?fun=obtenerUsuario";
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
    
        let url = origin + "/backend/controller/CuentaController.php?fun=crear";
        let config = {
            method: 'POST',
            body: formdata
        };
    
        let response = await fetch(url, config);
        return await response.json();
       
    }
    
    
    async eliminar(id){
        let formdata = new FormData();
        formdata.append('idUsuario', id);
        let url = origin + "/backend/controller/CuentaController.php?fun=eliminar";
        let config ={
            method: 'POST',
            body: formdata
        }
        let response = await fetch(url, config);
        return await response.json();
    }
    
    async recuperar(email){
        let formdata = new FormData();
        formdata.append('email', email);
        let url = origin + "/TheDigitals/backend/controller/CuentaController.php?fun=recuperar";
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
        let url = origin + "/backend/controller/CuentaController.php?fun=editar";
        let config = {
            method: 'POST',
            body: formdata
        }
        let response = await fetch(url, config);
        return await response.json();
    }

    async editarU(columna, valor){
        let formdata = new FormData();
        formdata.append('columna', columna);
        formdata.append('valor', valor);
        let url = origin + "/backend/controller/CuentaController.php?fun=editarU";
        let config = {
            method: 'POST',
            body: formdata
        }
        let response = await fetch(url, config);
        return await response.json();
    }

    async enviarMail(mail){
        let formdata = new FormData();
        formdata.append('mail', mail);
        let url = origin + "/backend/controller/CuentaController.php?fun=enviarMail";
        let config = {
            method: 'POST',
            body: formdata
        }
        let response = await fetch(url, config);
        
        return await response.json();
    }

    async resetPassword(token, password){
        let formdata = new FormData();
        formdata.append('pass', password);
        formdata.append('token', token);
        let url = origin + "/backend/controller/CuentaController.php?fun=resetPassword";
        let config = {
            method: 'POST',
            body: formdata
        }
        let response = await fetch(url, config);

        return await response.json();
    }

    async buscarToken(token){
        let formdata = new FormData();
        formdata.append('token', token);
        let url = origin + "/backend/controller/CuentaController.php?fun=buscarToken";
        let config = {
            method: 'POST',
            body: formdata
        }
        let response = await fetch(url, config);
        return await response.json();
    }
}