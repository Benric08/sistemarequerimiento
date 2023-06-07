import axios from 'axios';
import {GET_ALL_PROVEEDORES, GET_ALL_PROVEEDORES_ORDENS} from './action-types';

const endpoint = 'proveedor'
export const getAllProveedores=()=>{
    return async (dispatch)=>{
        await axios.get(endpoint)
        .then(({data})=>{
            return dispatch({
                type:GET_ALL_PROVEEDORES,
                payload:data
            });
        });
    }
}
export const getAllProveedoresOrdenS=()=>{
    return async (dispatch)=>{
        await axios.get(`${endpoint}/orden_servicio`)
        .then(({data})=>{
            return dispatch({
                type:GET_ALL_PROVEEDORES_ORDENS,
                payload:data
            });
        });
    }
}
