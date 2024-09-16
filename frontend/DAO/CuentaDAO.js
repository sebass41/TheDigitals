export default class CuentaDAO {
    

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

}