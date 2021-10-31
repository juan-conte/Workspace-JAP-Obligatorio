//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    cargardatauser();
});
let usuario = undefined;
let passwd = undefined;

document.getElementById("check").addEventListener("click",function(){
    //Guardo el nodo del input en una variable, para luego acceder al atributo value
    
    usuario = document.getElementById("InputMail");
    passwd = document.getElementById("InputPass");
    
    if(passwd.value != "" && usuario.value != ""){
        //Si hay algo en los campos, dejo pasar al usuario y me guardo en localStorage sus datos. Esto es para que no vuelva a solicitar un logeo
        sessionStorage.setItem('usuario',usuario.value);
        sessionStorage.setItem('password',passwd.value);
        window.location.href = "index.html";

    }else{
        alert("Debe de ingresar ambos campos");
    }

});

