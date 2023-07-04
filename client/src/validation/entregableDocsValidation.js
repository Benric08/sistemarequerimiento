import {isEmpty,isNumber,isFilePdf,isFileSizeCorrect} from '../utils/validation';
export default function entregableValidation(inputs){
/*     {
        
        "numero_informe_conformidad": "123",
        "fecha_informe_conformidad": "2023-07-03",
        "file_informe_conformidad": "IC-1688393549529.pdf",
        "numero_recibo_honorarios": "1233",
        "fecha_recibo_honorarios": "2023-07-04",
        "file_recibo_honorarios": "RHE-1688393549546.pdf",
        "numero_comprobante_pago": "12334",
        "fecha_comprobante_pago": "2023-07-05",
        "file_comprobante_pago": "CP-1688393549551.pdf",
       
    } */
    const errors={};
    if(isEmpty(inputs?.numero_informe_conformidad)) errors.numero_informe_conformidad='El campo es obligatorio';
    if(isNumber(inputs?.numero_informe_conformidad)) errors.numero_informe_conformidad='Solo se admiten caracteres numericos';
    if(isEmpty(inputs?.numero_recibo_honorarios)) errors.numero_recibo_honorarios='El campo es obligatorio';
    if(isNumber(inputs?.numero_recibo_honorarios)) errors.numero_recibo_honorarios='Solo se admiten caracteres numericos';
    if(isEmpty(inputs?.numero_comprobante_pago)) errors.numero_comprobante_pago='El campo es obligatorio';
    if(isNumber(inputs?.numero_comprobante_pago)) errors.numero_comprobante_pago='Solo se admiten caracteres numericos';
    if(!inputs?.fecha_informe_conformidad)errors.fecha_informe_conformidad='Debe seleccionar una fecha'
    if(!inputs?.fecha_recibo_honorarios)errors.fecha_recibo_honorarios='Debe seleccionar una fecha'
    if(!inputs?.fecha_comprobante_pago)errors.fecha_comprobante_pago='Debe seleccionar una fecha'
    if(isFilePdf(inputs?.file_informe_conformidad)) errors.file_informe_conformidad='El archivo debe ser PDF'
    if(isFilePdf(inputs?.file_recibo_honorarios)) errors.file_recibo_honorarios='El archivo debe ser PDF'
    if(isFilePdf(inputs?.file_comprobante_pago)) errors.file_comprobante_pago='El archivo debe ser PDF'
    if(isFileSizeCorrect(inputs?.file_informe_conformidad,10)) errors.file_informe_conformidad='El archivo debe pesar menos de 10 MB'
    if(isFileSizeCorrect(inputs?.file_recibo_honorarios,1)) errors.file_recibo_honorarios='El archivo debe pesar menos de 10 MB'
    if(isFileSizeCorrect(inputs?.file_comprobante_pago,1)) errors.file_comprobante_pago='El archivo debe pesar menos de 10 MB'
    return errors
}