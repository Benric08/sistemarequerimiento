import {ADD_REQUERIMIENTO,REMOVE_REQUERIMIENTO,UPDATE_REQUERIMIENTO,ORDER,FILTER, GETALL_REQUERIMIENTOS} from './action-types';

import axios from "axios";

const endpoint = 'http://localhost:3001/requerimiento';
export const addReq=(requerimiento)=>{
   return async (dispatch) => {
      try {
        await axios.post(endpoint, requerimiento)
        .then(({ data }) => {
         console.log('vamos a ver data',data);
         return dispatch({
            type: ADD_REQUERIMIENTO,
            payload: data,
         });
        });
      } catch (error) {
        console.log(error.message);
      }
   };
}
export const updateReq=(requerimiento)=>{
   console.log(`requerimineto que recibe el update del front ${requerimiento}`);
    const {idRequerimiento} = requerimiento;
   return async (dispatch) => {
      await axios.put(endpoint+"/"+idRequerimiento, requerimiento)
      .then(async( {data} ) => {
         console.log(`vemos que devuelve data del put  de update` , data);
         let reqUpdated={};
         if(data[0]) {
            reqUpdated = await axios.get(endpoint+"/"+idRequerimiento)
            .then(({data})=>data);
            
         }
         return dispatch({
            type: UPDATE_REQUERIMIENTO,
            payload: reqUpdated,
      }); 
      });
   };
}
export const getAllRequirements=()=>{
   console.log(`Estoy dentro del todosaction`);
   return async (dispatch) =>{
      await axios.get(endpoint)
      .then(({data})=>{
         return dispatch({
            type: GETALL_REQUERIMIENTOS,
            payload: data
         })
      })
   }
}
export const removeReq=(id)=>{
    
   return async (dispatch) => {
      await axios.delete(endpoint+"/"+id)
      .then(({ data }) => {
         return dispatch({
            type: REMOVE_REQUERIMIENTO,
            payload: data,
      });
      });
   };
}
