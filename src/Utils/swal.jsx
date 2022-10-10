import Swal from "sweetalert2"

export const swal = () =>  Swal.fire({
    title: "Credenciales inválidas",
    text:"Ingrese las credenciales correctas",
    confirmButtonText:"Aceptar",
    confirmButtonColor:"tomato",
    width:"400px",
    timer: 10000,
    timerProgressBar:true,
   })