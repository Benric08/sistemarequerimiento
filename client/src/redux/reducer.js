import { ADD_REQUERIMIENTO,FILTER,ORDER,REMOVE_REQUERIMIENTO } from './action-types';
const initialState = {
    allRequerimientos:[{idRequerimiento:1,
        descripcion:'ashsagjhgjhagsdfjh',
        detalle:'detallito',
        estado:'Activo',
        unidad_medida:'Servicio',
        precio_unitario:39000,
        cantidad:1,
        total:39000},
        {idRequerimiento:2,
            descripcion:'ashsagjhgjhagsdfjh',
            detalle:'detallito',
            estado:'Activo',
            unidad_medida:'Servicio',
            precio_unitario:3300,
            cantidad:3,
            total:9900}],
    requerimientosByEstado:[]
}

export default function reducer(state=initialState,action){
    const {type,payload}=action;
    switch (type) {
        case ADD_REQUERIMIENTO:
            
            return {...state,allRequerimientos:payload,requerimientosByEstado:payload};
    
        default:
            return {...state};
    }
}