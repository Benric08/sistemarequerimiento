import { ADD_REQUERIMIENTO,FILTER,ORDER,REMOVE_REQUERIMIENTO,UPDATE_REQUERIMIENTO } from './action-types';
const initialState = {
    allRequerimientos:[{idRequerimiento:1000,
        descripcion:'SERVICIO DE ORGANIZACIÓN DOCUMENTARIA PARA LA FASE DE AUTORIZACIÓN',
        detalle:'detallito',
        estado:'Activo',
        unidad_medida:'Servicio',
        precio_unitario:39000,
        cantidad:1,
        total:39000},
        {idRequerimiento:2000,
            descripcion:'CONSULTORIA EN PRIORIZACIÓN DE CADENAS PRODUCTIVAS',
            detalle:'detallito',
            estado:'Activo',
            unidad_medida:'Servicio',
            precio_unitario:2500,
            cantidad:1,
            total:2500}],
    requerimientosByEstado:[]
}

export default function reducer(state=initialState,action){
    const {type,payload}=action;
    console.log('viendo que tiene el payload',payload);
    switch (type) {
        case ADD_REQUERIMIENTO:
            console.log('estoy entrando al reduer addreq');
            return {...state,allRequerimientos:[...state.allRequerimientos,payload],requerimientosByEstado:[...state.allRequerimientos,payload]};
            
        default:
            console.log('estoy entrando al reduer default');
            return {...state};
    }
}