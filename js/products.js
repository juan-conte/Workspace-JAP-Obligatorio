//LISTADO DE PRODUCTOS
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PRECIO= "Precio";
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;



var arraydeproductos = [];
function comienzanIgual(texto, otrotexto){
    return elemento.startsWith(texto)

}



//Esta funcion ordena a los productos segun las diferentes categorias. Para acomodarla a productos, solamente es recesario modificar en donde se marca.
// Utilizando los filtros ya creados para order 
function sortProductos(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount < bCount ){ return -1; }
            if ( aCount > bCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PRECIO){
        result = array.sort(function(a, b) {
            //Aqui en vez de cantidad de articulos, lo filtraremos por precio (por eso accedemos al atributo cost)
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

// Aqui se modifica la insercion DOM, veamos que se utiliza practicamente la misma extructura agregando algunos small para acomodarse a la cantidad de atributos. Luego es simplemente modificar los atributos que tuvieran diferente nombre
//&& (comienzanIgual(document.getElementById("buscador").value,producto.name || document.getElementById("buscador").value == "" )
function showProductsList(lista){

    let htmlContentToAppend = "";
    
    for(let producto of lista){
        var nombre_producto = producto.name.toLowerCase();
        var texto_buscador = document.getElementById("buscador").value.toLowerCase();

        //Filtra segun rango de precio && si coincide con el texto en el buscador (aun no logro que busque en cualquier parte del nombre del producto y no el inicio)
        //search devuelve donde comienza en el string donde lo invoquemos el texto que le entregamos y -1 si no existen coincidencias
        //Por lo que si el buscador no esta vacio. Permitimos que muestre solo aquellos productos que tengan alguna coincidencia con el buscador. (Explicacion de condicion en linea 72)
        if (((minCount == undefined) || (minCount != undefined && parseInt(producto.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(producto.cost) <= maxCount)) &&
            (texto_buscador == "" || nombre_producto.search(texto_buscador)!= -1)){

                htmlContentToAppend += `
                <div class="col-12 col-md-4">
                    <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                        <img class="bd-placeholder-img card-img-top" src="${producto.imgSrc}">
                        <h3 class="m-3">${producto.name}</h3>
                        <div class="card-body">
                            <p class="card-text">${producto.description}</p>
                            <div class="row">
                                <div class="col-6"><small class="text-muted">Precio:` + producto.currency +" "+  producto.cost + ` artículos</small></div>
                                <div class="col-2"></div>
                                <div class="col-4"><small class="text-muted">Vendidos: ` + producto.soldCount + ` artículos</small></div>
                            </div>
                                
                            
                        </div>
                    </a>
                </div>

                `
         
            document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
        }

        
    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        arraydeproductos = productsArray;
    }

    arraydeproductos = sortProductos(currentSortCriteria, arraydeproductos);

    //Muestro las categorías ordenadas
    showProductsList(arraydeproductos);
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(b){
   
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

   document.getElementById("buscador").addEventListener("keyup", (event)=>{
    if(currentSortCriteria==undefined)
    {
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    }else{
        sortAndShowProducts(currentSortCriteria);
    }
   
   })

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByPrice").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PRECIO);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });
});