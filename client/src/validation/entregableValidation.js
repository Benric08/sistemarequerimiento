import {isEmpty,isNumber,isFilePdf,isFileSizeCorrect, isNumberDocument, isText} from '../utils/validation';
export default function entregableValidation(inputs){
/*     {
        file_entregable
        fecha_entregable
        numero_informe
        observacion   
       
    } */
    
    const errors={};
    if(isNumberDocument(inputs?.numero_informe)) errors.numero_informe='Se admiten numeros y guiones';
    if(isText(inputs?.observacion)) errors.observacion='Solo se admite texto';
    
    if(isFilePdf(inputs?.file_entregable)) errors.file_entregable='El archivo debe ser PDF';
    if(isFileSizeCorrect(inputs?.file_entregable,10)) errors.file_entregable='El archivo debe pesar menos de 10 MB';
    
    return errors
}