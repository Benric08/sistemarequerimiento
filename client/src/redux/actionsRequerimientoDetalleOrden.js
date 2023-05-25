import { GET_ALL_REQUERIMIENTOS_DETALLE } from "./action-types";
import axios from 'axios';
const endpoint = 'http://localhost:3001/orden_servicio/detalle';
export const getAllRequirementsDetalle = ()=>{
    return async (dispatch)=>{
        try {
            await axios.get(endpoint)
            .then(({data})=>{
                return dispatch({
                    type:GET_ALL_REQUERIMIENTOS_DETALLE,
                    payload: data
                })
            }) 
        } catch (error) {
            
        }
    } 
}

