//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});
let usuario = undefined;
let passwd = undefined;

document.getElementById("check").addEventListener("click",function(){
    usuario = document.getElementById("InputMail");
    passwd = document.getElementById("InputPass");
    
    if(passwd.value != "" && usuario.value != ""){

        sessionStorage.setItem('usuario',usuario.value);
        sessionStorage.setItem('password',passwd.value);
        window.location.href = "index.html";

    }else{
        alert("Debe de ingresar ambos campos");
    }

});