let carritoCargado=[]


//Cargar productos en el carrito
function cargarcarritos(cart)
{
    let htmltoappend = ""
    let costo = 0;
    let cantidad = 0;
    
    for(let i = 0; i<cart.length; i ++)
    {
        
        //Solo utilizamos dolares.
        cantidad=parseInt(cart[i].count);
        if(cart[i].currency == "USD")
        {
            costo=cart[i].unitCost;
            htmltoappend += `
            <tr id="item${i}">
              <td><img src="${cart[i].src}" alt="" style="width : 70px"</td>
              <td>${cart[i].name}</td>
              <td>${cart[i].currency}</td>
              <td id="costo${i}">${cart[i].unitCost}</td>
              <td ><input type="number" name="" id="cantidad${i}"  min="1" value="${cart[i].count}" onchange="updatePrice(${i})" style="width :50px"></td>
              <td id="subtotaldinamico${i}">${costo*cantidad}</td>
              <td><button type="button" class="btn btn-danger" onclick="eliminarItem(${i})">Eliminar</button></td>
              
            </tr>
            `;
        }else{
            costo=cart[i].unitCost / 40;
            htmltoappend += `
        <tr id="item${i}">
          <td><img src="${cart[i].src}" alt="" style="width : 70px"</td>
          <td>${cart[i].name}</td>
          <td>USD</td>
          <td id="costo${i}">${cart[i].unitCost / 40}</td>
          <td ><input type="number" name="" id="cantidad${i}"  min="1" value="${cart[i].count}" onchange="updatePrice(${i})" style="width :50px"></td>
          <td id="subtotaldinamico${i}">${costo*cantidad}</td>
          <td><button type="button" class="btn btn-danger" onclick="eliminarItem(${i})">Eliminar</button></td>
        </tr>
        `;
        }
        
       
    }

    document.getElementById("insertCarrito").innerHTML += htmltoappend;
}


//eliminar un item del carrito
function eliminarItem(i){
    
    //borramos el carrito cargado para volverlo a generar (acomodar ids mas que nada)
    for(let j=0; j<carritoCargado.length; j++)
    {

        let item = document.getElementById("item"+j)
        //eliminamos a los hijos, la familia tuti
        item.innerHTML=""
        //lo sacamos a el
        document.getElementById("item"+j).remove();
    }
    //quito del carrito el eliminado
    carritoCargado.splice(i,1);
    //reseteo valores
    cargarcarritos(carritoCargado);
    cargarCostos(carritoCargado);
}
//Actualizar costos (suma de subtotales envios etc)
function cargarCostos(){

    
        let suma = 0;
        for(let i = 0; i<carritoCargado.length; i ++)
        {
        suma += parseFloat(document.getElementById(`subtotaldinamico${i}`).innerText);
        }
        
        document.getElementById("sumProdSub").innerText = "USD "+suma;
        let perc = parseFloat(document.getElementById("tipoenvio").elements["sendtype"].value);
        let costenvio=parseFloat((suma * perc).toFixed(2));
        document.getElementById("costPerc").innerText ="USD "+costenvio;
        let total = parseFloat((suma+costenvio).toFixed(2));
        document.getElementById("fullsum").innerText = "USD "+(total);
        
    

    
}

document.addEventListener("DOMContentLoaded", function(b){
   
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){

            carritoCargado = resultObj.data.articles
            cargarcarritos(carritoCargado);
            cargarCostos(carritoCargado);
        }
    });
});

//Actualizar precios (de costos y de carrito)
function updatePrice(i)
{   
    
    
    

        
        let cantidad = 0;
        let subtotal = 0;
        let costo = 0;
        
        
            if(parseInt(document.getElementById(`cantidad${i}`).value) <= 0)
            {
                document.getElementById(`cantidad${i}`).value = 1;
            }else{
                cantidad =  parseInt(document.getElementById(`cantidad${i}`).value);
                
                costo = parseFloat(document.getElementById(`costo${i}`).innerText);
                
                subtotal = cantidad*costo;
                
                document.getElementById(`subtotaldinamico${i}`).innerText = subtotal;
            }
            
            
        
        cargarCostos();

    
    
}