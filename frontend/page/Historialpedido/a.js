import PedidoDAO from "../../DAO/PedidoDAO.js";
window.onload = async ()=>{
    
    let productos = await obtener();
    await mostrar(productos);
    console.log(productos);
}



function mostrar(productos){
    let tBodyProductos = document.querySelector("#tBodyProductos");
    tBodyProductos.innerHTML = "";
    productos.forEach(producto => {
        let tr = document.createElement("tr")
        tr.innerHTML+= `
        
            <td>${producto.title}</td>
            <td><a href="${producto.permalink}" target="_blank">Link del Producto</a></td>
            <td><img src="${producto.thumbnail}"></td>
            <td>${producto.price}</td>
            
        `;
        let btn = document.createElement("button")
        btn.onclick = ()=>{guardar(producto)};
        let td = document.createElement("td");
        td.appendChild(btn);
        tr.appendChild(td);
        tBodyProductos.appendChild(tr);
    });
}
