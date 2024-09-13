export default class SesionDAO{

    static async iniciarSesion(email, pass){
        let formdata = new FormData();
        formdata.append('email', email);
        formdata.append('pass', pass);
        let url = "http://localhost/obligatorio/TheDigitals/backend/controller/SesionController.php?fun=is";
        let config ={
            method: 'POST',
            body: formdata
        }
        let response = await fetch(url, config);
        return response;
    }
    
    static async cerrarSesion(){
        let url = "http://localhost/TheDigitals/TheDigitals/backend/controller/SesionController.php?fun=cerrarSesion";
        let response = await fetch(url);
    }
    
}