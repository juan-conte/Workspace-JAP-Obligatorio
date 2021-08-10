//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

document.getElementById("check").addEventListener("click",function(){
    let usuario = document.getElementById("InputMail");
    let passwd = document.getElementById("InputPass");
    if(passwd.value != undefined && usuario.value != undefined){
        window.location.href = "index.html"

    }

});