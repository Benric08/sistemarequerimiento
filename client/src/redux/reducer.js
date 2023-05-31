import { ADD_REQUERIMIENTO,
    GET_ALL_REQUERIMIENTOS_DETALLE,
    GET_ALL_PROVEEDORES,
    FILTER,
    ADD_ENTREGABLE,
    ADD_ORDEN_SERVICIO,
    GETALL_REQUERIMIENTOS,ORDER,REMOVE_REQUERIMIENTO,UPDATE_REQUERIMIENTO,
    GET_ALL_PROVEEDORES_ORDENS,
    GET_ESTADO_ALL } from './action-types';
const initialState = {
    allRequerimientos:[],
    requerimientosByEstado:[],
    ordenesDeServicio:[],
    allRequerimientosDetalle:[],
    allProveedores:[],
    allProveedoresOrdenServicio:[],
    estado_entregable:[],
    estadoEntregableActual:[]
}

export default function reducer(state=initialState,action){
    const {type,payload}=action;
    console.log('viendo que tiene el payload',payload);
    switch (type) {
        case ADD_REQUERIMIENTO:
            console.log('estoy entrando al reduer addreq');
            return {...state,allRequerimientosDetalle:[...state.allRequerimientosDetalle,payload],requerimientosByEstado:[...state.allRequerimientos,payload]};
        case UPDATE_REQUERIMIENTO:
            console.log('estoy entrando al reduer updatereq');
            const elementUpdate = state.allRequerimientos.findIndex((requ)=>requ.id_requerimiento===payload.id_requerimiento)
            state.allRequerimientos[elementUpdate]={...state.allRequerimientos[elementUpdate],...payload}
            return {...state,allRequerimientos:[...state.allRequerimientos],requerimientosByEstado:[...state.allRequerimientos]};
        case GETALL_REQUERIMIENTOS:
            console.log('estoy entrando a todos los requeriminetos');
            return {...state,allRequerimientos:payload,requerimientosByEstado:payload};
        case ADD_ORDEN_SERVICIO:
            console.log('estoy entrando agregar orden servicio reducer');
            return {...state,ordenesDeServicio:payload};
        case GET_ALL_REQUERIMIENTOS_DETALLE:
            console.log('veamos lo que tiene el payload de detalleallrequerimientos',payload);
            return {...state,allRequerimientosDetalle:payload};
        case GET_ALL_PROVEEDORES_ORDENS:
            console.log('veamos lo que tiene el payload de detalleallrequerimientos',payload);
            return {...state,allProveedoresOrdenServicio:payload};
        case GET_ALL_PROVEEDORES:
            console.log('veamos lo que tiene el payload de detalleallrequerimientos',payload);
            return {...state,allProveedores:payload};
        case ADD_ENTREGABLE:
            console.log('veamos lo que tiene el payload de detalleallrequerimientos',payload);
            return {...state,estado_entregable:payload};
        case GET_ESTADO_ALL:
            console.log('veamos lo que tiene el payload de destado by iddetalle',payload);
            return {...state,estadoEntregableActual:payload};
        default:
            console.log('estoy entrando al reduer default');
            return {...state};
    }
}