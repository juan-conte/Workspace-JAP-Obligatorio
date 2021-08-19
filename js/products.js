//LISTADO DE PRODUCTOS
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PRECIO= "Precio";
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;


var arraydeproductos = [];
//Esta funcion ordena a los productos segun las diferentes categorias. Para acomodarla a productos, solamente es recesario modificar en donde se marca
function sortProductos(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PRECIO){
        result = array.sort(function(a, b) {
            //Aqui en vez de cantidad de articulos, lo filtraremos por precio (por eso accedemos al atributo cost)
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

// Aqui se modifica la insercion DOM, veamos que se utiliza practicamente la misma extructura agregando algunos small para acomodarse a la cantidad de atributos. Luego es simplemente modificar los atributos que tuvieran diferente nombre

function showProductsList(lista){

    let htmlContentToAppend = "";
    for(let producto of lista){
        if (((minCount == undefined) || (minCount != undefined && parseInt(producto.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(producto.cost) <= maxCount))){

                htmlContentToAppend += `
                <a href="product-info.html" class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ producto.name +`</h4>
                                <small class="text-muted">Precio:` + producto.currency +" "+  producto.cost + ` artículos</small>
                                <small class="text-muted">Vendidos: ` + producto.soldCount + ` artículos</small>
                            </div>
                            <p class="mb-1">` + producto.description + `</p>
                        </div>
                    </div>
                </a>
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
   
    getJSONData("https://japdevdep.github.io/ecommerce-api/product/all.json").then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

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