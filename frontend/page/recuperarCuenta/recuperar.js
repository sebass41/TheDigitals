import CuentaDAO from "../../DAO/CuentaDAO.js"

window.onload = async () => {
    await enviarMail();
}

async function enviarMail(){
    let formelement = document.getElementById("form-recuperacion");
    formelement.onsubmit = async (e) => {
        e.preventDefault();
        let formdata = new FormData(formelement);
        
        let mail = formdata.get('mail');
        let result = await (new CuentaDAO()).enviarMail(mail);
        console.log(result);
        alert(result.msj);
    }
}