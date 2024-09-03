export default class SesionoDAO{

    async iniciarSesion(usuario, pass){
        let formdata = new FormData();
        formdata.append('usuario', usuario);
        formdata.append('pass', pass);
        let url = "http://localhost/TheDigitals/TheDigitals/backend/controller/SesionController.php?fun=iniciarSesion";
        let config ={
            method: 'POST',
            body: formdata
        }
        let response = await fetch(url, config);

    }
    
    async cerrarSesion(){

        let url = "http://localhost/TheDigitals/TheDigitals/backend/controller/SesionController.php?fun=cerrarSesion";
        let response = await fetch(url);
    }
    
}