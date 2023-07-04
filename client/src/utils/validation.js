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
let regex=''
export function isCorrectForm(errors){
    return Object.keys(errors).length<1;
}
export  function isEmpty(text){
    if(text==="") return true;
    else return false;
}
export  function isLengthMax(text,max){
    if(text.length>max) return true;
    else return false;
}
export  function isLengthMin(text,min){
    if(text.length<min) return true;
    else return false;
}
export  function isNumber(text){
    regex=/^([0-9])*$/;
    if(!regex.test(text)) return true;
    else return false;
}
export  function isNumberDocument(text){
    regex=/^[0-9\-]+$/;
    if(!regex.test(text)) return true;
    else return false;
}
export  function isGreaterThanZero(text){
    if(parseInt(text)===0) return true;
    else return false;
}
export  function isNumberMax(text,max){
    if(parseInt(text)>max) return true;
    else return false;
}
export  function isMoney(text){
    regex=/^(\d{1,3},)*\d{1,3}(\.\d+)?$/;
    if(!regex.test(text)) return true;
    else return false;
}
export  function isDecimal(text){
    regex=/^(\d+)?(\.\d+)?$/;
    if(!regex.test(text)) return true;
    else return false;
}
export  function isText(text){
    regex=/^[a-zA-Z\s]+$/;
    if(!regex.test(text)) return true;
    else return false;
}
export  function isFilePdf(file){
    if(!file) return
    const name=file?.name;
    const extensionFile = name?.split('.').pop().toLowerCase();
    if(extensionFile!=='pdf') return true;
    else return false;
}
export  function isFileSizeCorrect(file,size){
    if(!file) return
    if(file?.size>size*1024*1024) return true;
    else return false;
}

