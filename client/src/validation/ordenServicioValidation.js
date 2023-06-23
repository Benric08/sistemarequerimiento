import {isEmpty,isGreaterThanZero,isLengthMax,isLengthMin,isNumber, isText,isFilePdf,isFileSizeCorrect} from '../utils/validation';
export default function ordenServicioValidation(inputs){
    const errors={};
    if(isEmpty(inputs?.dni)) errors.dni='El campo DNI es obligatorio';
    if(isLengthMax(inputs?.dni,8)) errors.dni='No puede ingresar más de 8 carateres';
    if(isLengthMin(inputs?.dni,8)) errors.dni='Debe ingresar al menos 8 caracteres';
    if(isNumber(inputs?.dni)) errors.dni='Solo se admiten caracteres numericos';
    if(isText(inputs?.nombre)) errors.nombre='Solo se permiten letras';
    if(isEmpty(inputs?.nombre)) errors.nombre='El campo Nombre es obligatorio';
    if(isText(inputs?.apellido_paterno)) errors.apellido_paterno='Solo se permiten letras';
    if(isEmpty(inputs?.apellido_paterno)) errors.apellido_paterno='El campo A. Paterno es obligatorio';
    if(isText(inputs?.apellido_materno)) errors.apellido_materno='Solo se permiten letras';
    if(isEmpty(inputs?.apellido_materno)) errors.apellido_materno='El campo A. Materno es obligatorio';
    if(isEmpty(inputs?.celular)) errors.celular='El campo Celular es obligatorio';
    if(isLengthMin(inputs?.celular,9)) errors.celular='Debe ingresar al menos 9 digitos';
    if(isEmpty(inputs?.numero_orden_servicio)) errors.numero_orden_servicio='Este campo es obligatorio';
    if(isNumber(inputs?.numero_orden_servicio)) errors.numero_orden_servicio='Solo se permiten numeros';
    if(isGreaterThanZero(inputs?.numero_orden_servicio)) errors.numero_orden_servicio='Cero no es valido';
    if(isNumber(inputs?.numero_certificacion)) errors.numero_certificacion='Solo se permiten numeros';
    if(isGreaterThanZero(inputs?.numero_certificacion)) errors.numero_certificacion='Cero no es valido';
    if(isNumber(inputs?.expediente_siaf)) errors.expediente_siaf='Solo se permiten numeros';
    if(isGreaterThanZero(inputs?.expediente_siaf)) errors.expediente_siaf='Cero no es valido';
    if(!inputs?.fecha_orden_servicio)errors.fecha_orden_servicio='Debe seleccionar una fecha'
    if(isFilePdf(inputs?.file_orden_servicio)) errors.file_orden_servicio='El archivo debe ser PDF'
    if(isFileSizeCorrect(inputs?.file_orden_servicio,10)) errors.file_orden_servicio='El archivo debe pesar menos de 10 MB'
    return errors
}