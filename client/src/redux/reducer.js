import { ADD_REQUERIMIENTO,
    GET_ALL_REQUERIMIENTOS_DETALLE,
    GET_ALL_PROVEEDORES,
    FILTER,
    ADD_ENTREGABLE,
    ADD_ORDEN_SERVICIO,
    GETALL_REQUERIMIENTOS,ORDER,REMOVE_REQUERIMIENTO,UPDATE_REQUERIMIENTO,
    GET_ALL_PROVEEDORES_ORDENS,
    GET_ESTADO_ALL, 
    ADD_ESTADO_REQUERIMIENTO,
    GET_ESTADO_REQUERIMIENTO} from './action-types';
const initialState = {
    allRequerimientos:[],
    requerimientosByEstado:[],
    ordenesDeServicio:[],
    allRequerimientosDetalle:[],
    allProveedores:[],
    allProveedoresOrdenServicio:[],
    estado_entregable:[],
    estadoEntregableActual:[],
    estadoRequerimientoActual:[]
}

export default function reducer(state=initialState,action){
    const {type,payload}=action;
    
    switch (type) {
        case ADD_REQUERIMIENTO:
            console.log('estoy entrando al reduer addreq',payload);
            return {...state,allRequerimientosDetalle:[payload,...state.allRequerimientosDetalle]};
        case UPDATE_REQUERIMIENTO:
            console.log('estoy entrando al reduer updatereq',payload);
            const elementUpdate = state.allRequerimientosDetalle.findIndex((requ)=>requ.id_requerimiento===payload.id_requerimiento)
            console.log('veamos que recupero con el findindex',elementUpdate);
            console.log('veamos que estaba',state.allRequerimientosDetalle[elementUpdate]);
            state.allRequerimientosDetalle[elementUpdate]={...state.allRequerimientosDetalle[elementUpdate],...payload}
            console.log('veamos si lo cambie',state.allRequerimientosDetalle[elementUpdate]);
            return {...state,allRequerimientosDetalle:state.allRequerimientosDetalle};
        case GETALL_REQUERIMIENTOS:
            console.log('estoy entrando a todos los requeriminetos');
            return {...state,allRequerimientos:payload,requerimientosByEstado:payload};
        case ADD_ORDEN_SERVICIO:
            console.log('estoy entrando agregar orden servicio reducer',payload);
            const osindex = state.allRequerimientosDetalle.findIndex((requ)=>requ.id_requerimiento===payload.id_requerimiento)
            console.log('veamos que recupero con el findindex',osindex);
            console.log('veamos que estaba',state.allRequerimientosDetalle[osindex]);
            state.allRequerimientosDetalle.splice(osindex,1,{...state.allRequerimientosDetalle[osindex],...payload});
            console.log('veamos si lo cambie',state.allRequerimientosDetalle[osindex]);
            return {...state,allRequerimientosDetalle:state.allRequerimientosDetalle};
        case GET_ALL_REQUERIMIENTOS_DETALLE:
            console.log('veamos lo que tiene el payload de detalleallrequerimientos',payload);
            return {...state,allRequerimientosDetalle:payload};
        case GET_ALL_PROVEEDORES_ORDENS:
            console.log('veamos lo que tiene el payload de ',payload);
            return {...state,allProveedoresOrdenServicio:payload};
        case GET_ALL_PROVEEDORES:
            console.log('veamos lo que tiene el payload de detalleallrequerimientos',payload);
            return {...state,allProveedores:payload};
        case ADD_ENTREGABLE:
            console.log('veamos lo que tiene el payload de daddEntregable',payload);
            return {...state,estadoEntregableActual:payload};
        case GET_ESTADO_ALL:
            console.log('veamos lo que tiene el payload de destado by iddetalle',payload);
            return {...state,estadoEntregableActual:payload};
        case ADD_ESTADO_REQUERIMIENTO:
            console.log('veamos lo que tiene el payload de daddEntregable',payload);
            return {...state,estadoRequerimientoActual:payload};
        case GET_ESTADO_REQUERIMIENTO:
            console.log('veamos lo que tiene el payload de destado by iddetalle',payload);
            return {...state,estadoRequerimientoActual:payload};
        default:
            console.log('estoy entrando al reduer default');
            return {...state};
    }
}