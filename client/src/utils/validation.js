export default function validation(inputs){
    const regex = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/i;
    const emailErrors = [];
    const passwordErrors = [];
    const errors = {}
    if (!regex.test(inputs.email)) {
        emailErrors.push("el nombre de usuario tiene que ser un email");
        errors.email=emailErrors;
    }
    if (inputs.email==="") {
        emailErrors.push("el nombre de usuario no puede estar vacío")
        errors.email=emailErrors;
    }
    if (inputs.email.length>35) {
        emailErrors.push("el nombre de usuario no puede tener más de 35 caracteres")
        errors.email=emailErrors;
    }
    
    if (!/^(?=\w*\d)(?=\w*[a-z])\S{6,10}$/.test(inputs.password)) {
        passwordErrors.push("la contraseña tiene que tener al menos un número");
        errors.password=passwordErrors;
    }
    if (inputs.password.length>10 || inputs.password.length<6) {
        passwordErrors.push("la contraseña tiene que tener una longitud entre 6 y 10 caracteres")
        errors.password=passwordErrors;
    }
    
   // if(!errors.email&&!errors.password) {errors.email=""; errors.password="";}
    return errors;
}