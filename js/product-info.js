//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var category = {};

/*var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;*/


document.getElementById("usuario").textContent = sessionStorage.getItem("usuario");


function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showComments(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let comentario = array[i];

        htmlContentToAppend += `
        <a class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                           <img src="img/img_avatar.png" alt="foto de perfil" class="img-thumbnail" style="width: 80px; height: 80px">
                            <p>${comentario.user}</p>
                            <small class="text-muted">${comentario.dateTime}</small>
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                            </div>
                            <p class="mb-2">${comentario.description}</p>`

        let contador=comentario.score;
        for(let j=0; j<5;j++)
        {
            if(j<contador)
            {
               htmlContentToAppend +=` <span class="fa fa-star checked"></span>`
            }else{
               htmlContentToAppend +=`<span class="fa fa-star"></span>`
            }
        }

        htmlContentToAppend += `</div>
        </div>
    </a>`

        document.getElementById("productComments").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            prodinfo = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
        
            productNameHTML.innerHTML = prodinfo.name;
            productDescriptionHTML.innerHTML = prodinfo.description;
            productCostHTML.innerHTML = prodinfo.currency +" "+ prodinfo.cost;
            productSoldCountHTML.innerHTML = prodinfo.soldCount;
            productCategoryHTML.innerHTML = prodinfo.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(prodinfo.images);
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comments = resultObj.data;
            showComments(comments);       
        }
    });

    /* */
});

document.getElementById("send_comment").addEventListener("click",function(){
    let texto = document.getElementById("comment_text").value;
    let score = document.getElementById("rating").value
    let htmlContentToAppend = "";
    let date = new Date();
    var fecha = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'  '+date.getHours()+':'+date.getMinutes()+":"+date.getSeconds();


    htmlContentToAppend += `
        <a  class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                           <img src="img/img_avatar.png" alt="foto de perfil" class="img-thumbnail" style="width: 80px; height: 80px">
                            <p>${sessionStorage.getItem("usuario")}</p>
                            <small class="text-muted">${fecha}</small>
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                            </div>
                            <p class="mb-1">${texto}</p>`;

    
    for(let j=0; j<5;j++)
    {
        if(j<score)
        {
            htmlContentToAppend +=` <span class="fa fa-star checked"></span>`
        }else{
            htmlContentToAppend +=`<span class="fa fa-star"></span>`
        }
    }

    htmlContentToAppend += `</div>
                            </div>
                            </a>`
    document.getElementById("productComments").innerHTML += htmlContentToAppend;

})
