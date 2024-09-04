export default class CuentaDAO{

    
    async crear(nombre, apellido, tel, apodo, calle, numero, pass, email){
        let formdata = new FormData();
        formdata.append('nombre', nombre);
        formdata.append('apellido', apellido);
        formdata.append('tel', tel);
        formdata.append('apodo', apodo);
        formdata.append('calle', calle);
        formdata.append('numero', numero);
        formdata.append('pass', pass);
        formdata.append('email', email);
        let url = "http://localhost/TheDigitals/TheDigitals/backend/controller/CuentaController.php?fun=crear";
        let config ={
            method: 'POST',
            body: formdata
        }
        let response = await fetch(url, config);
    }
    
    async eliminar(id){
        let formdata = new FormData();
        formdata.append('id', id);
        let url = "http://localhost/TheDigitals/TheDigitals/backend/controller/CuentaController.php?fun=eliminar";
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