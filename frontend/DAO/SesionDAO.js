export default class SesionDAO{

    async iniciarSesion(email, pass){
        let formdata = new FormData();
        formdata.append('email', email);
        formdata.append('pass', pass);
        let url = "http://localhost/TheDigitals/TheDigitals/backend/controller/SesionController.php?fun=iniciarSesion";
        let config ={
            method: 'POST',
            body: formdata
        }
        let response = await fetch(url, config);
        console.log(response);
    }
    
    async cerrarSesion(){
        let url = "http://localhost/TheDigitals/TheDigitals/backend/controller/SesionController.php?fun=cerrarSesion";
        let response = await fetch(url);
    }
    
}