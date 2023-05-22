import { ADD_REQUERIMIENTO,
    GET_ALL_REQUERIMIENTOS_DETALLE,
    FILTER,ADD_ORDEN_SERVICIO,GETALL_REQUERIMIENTOS,ORDER,REMOVE_REQUERIMIENTO,UPDATE_REQUERIMIENTO } from './action-types';
const initialState = {
    allRequerimientos:[/* {idRequerimiento:1000,
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
            total:2500} */],
    requerimientosByEstado:[],
    ordenesDeServicio:[],
    allRequerimientosDetalle:[]
}

export default function reducer(state=initialState,action){
    const {type,payload}=action;
    console.log('viendo que tiene el payload',payload);
    switch (type) {
        case ADD_REQUERIMIENTO:
            console.log('estoy entrando al reduer addreq');
            return {...state,allRequerimientos:[...state.allRequerimientos,payload],requerimientosByEstado:[...state.allRequerimientos,payload]};
        case UPDATE_REQUERIMIENTO:
            console.log('estoy entrando al reduer updatereq');
            const elementUpdate = state.allRequerimientos.findIndex((requ)=>requ.idRequerimiento===payload.idRequerimiento)
            state.allRequerimientos[elementUpdate]={...state.allRequerimientos[elementUpdate],...payload}
            return {...state,allRequerimientos:[...state.allRequerimientos],requerimientosByEstado:[...state.allRequerimientos]};
        case GETALL_REQUERIMIENTOS:
            console.log('estoy entrando a todos los requeriminetos');
            return {...state,allRequerimientos:payload,requerimientosByEstado:payload};
        case ADD_ORDEN_SERVICIO:
            console.log('estoy entrando agregar orden servicio reducer');
            return {...state,ordenesDeServicio:payload};
        case GET_ALL_REQUERIMIENTOS_DETALLE:
            return {...state,allRequerimientosDetalle:[...state.allRequerimientosDetalle,payload],requerimientosByEstado:[...state.allRequerimientosDetalle,payload]};
        default:
            console.log('estoy entrando al reduer default');
            return {...state};
    }
}