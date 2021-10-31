//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let img_just_loaded=""


function registro(){
    
    
    let nombre1 = document.getElementById("nombre1").value;
    let nombre2 = document.getElementById("nombre2").value;
    let apellido1 = document.getElementById("apellido1").value;
    let apellido2 = document.getElementById("apellido2").value;
    let correo = document.getElementById("correo").value;
    let telefono = document.getElementById("telefono").value;

    if(nombre1 == "" || apellido1 == "" || correo==""){
        alert("Complete todos los campos requeridos");
    }else{
        let datos={
            pnombre: nombre1,
            snombre: nombre2,
            papellido: apellido1,
            sapellido: apellido2,
            email: correo,
            contacto: telefono,
            imagen: img_just_loaded
        };

        localStorage.setItem("my-Profile", JSON.stringify(datos));
        console.log(localStorage.getItem("my-Profile"));

    }
}

function cargardatauser(){
    
    if(localStorage.getItem("my-Profile")!=undefined)
    {
        let datos = JSON.parse(localStorage.getItem("my-Profile"))

        document.getElementById("user_name").innerText = datos.pnombre; 
        document.getElementById("nombre1").value = datos.pnombre;
        document.getElementById("nombre2").value = datos.snombre;
        document.getElementById("apellido1").value = datos.papellido;
        document.getElementById("apellido2").value = datos.sapellido;
        document.getElementById("correo").value = datos.email;
        document.getElementById("telefono").value = datos.contacto;
        console.log(datos.imagen);
        document.getElementById("preview_profile").src = datos.imagen;
    }



}

function preview(){
    let file=document.querySelector("input[type=file]").files[0];
    let image = document.getElementById("preview_profile");

    let reader = new FileReader();
    
    reader.readAsDataURL(file);


    reader.onloadend = ()=>{
        image.src= reader.result;
        img_just_loaded = reader.result; 
    }
    

}
document.addEventListener("DOMContentLoaded", function (e) {
    cargardatauser();
});

document.getElementById("register").addEventListener("click", function(){
    registro();
 });