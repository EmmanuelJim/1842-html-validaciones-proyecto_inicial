export function valida(input){
    const tipoDeIntput = input.dataset.tipo;
    if(validadores[tipoDeIntput]){
        validadores[tipoDeIntput](input)
    }
    
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeIntput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío."
    },
    email: {
        valueMissing: "El campo email no puede estar vacío.",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacío.",
        patternMismatch: 
        "Al menos 6 caractertes, máximo 12, debe contener una letra minuscula, una letra mayuscula, un numero y no puede contener caracteres especiales."
    },
    nacimiento: {
        valueMissing: "El campo nacimiento no puede estar vacío.",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: "El campo de numero no puede estar vacío.",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 números"
    },
    direccion: {
        valueMissing: "El campo de direccion no puede estar vacío.",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres."
    },
    ciudad: {
        valueMissing: "El campo de ciudad no puede estar vacío.",
        patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres."
    },
    estado: {
        valueMissing: "El campo de estado no puede estar vacío.",
        patternMismatch: "El estado debe contener entre 10 a 40 caracteres."
    },
};

const validadores = {
    nacimiento: input => validarNacimiento(input),

}

function mostrarMensajeDeError(tipoDeIntput, input){
    let mensaje = ""
    tipoDeErrores.forEach(error =>{
        if(input.validity[error]){
            mensaje = mensajesDeError[tipoDeIntput][error];
        }
    })
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad"
    }
    input.setCustomValidity(mensaje)
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear()+ 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return diferenciaFechas <= fechaActual;
}