export default class CuentaDAO {
    
    constructor(nombre, apellido, tel, calle, numero, piso, pass, email){
        this.nombre = nombre;
        this.apellido = apellido;
        this.tel = tel;
        this.calle = calle;
        this.numero = numero;
        this.piso = piso;
        this.pass = pass;
        this.email = email;
    }

    async crear() {
        let formdata = new FormData();
        formdata.append('nombre', this.nombre);
        formdata.append('apell', this.apellido);
        formdata.append('tel', this.tel);
        formdata.append('calle', this.calle);
        formdata.append('num', this.num);
        formdata.append('piso', this.piso);
        formdata.append('pass', this.pass);
        formdata.append('email', this.email);
    
        let url = "http://localhost/TheDigitals/backend/controller/CuentaController.php?fun=crear";
        let config = {
            method: 'POST',
            body: formdata
        };
    
        try {
            let response = await fetch(url, config);
            return response;
        } catch (error) {
            console.error("Error al crear la cuenta:", error);
            throw error; // Lanza el error para que sea manejado por el código que llama a este método
        }
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