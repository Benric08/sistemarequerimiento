import {ADD_REQUERIMIENTO,REMOVE_REQUERIMIENTO,UPDATE_REQUERIMIENTO,ORDER,FILTER} from './action-types';

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
export const updateReq=(id)=>{
    
   return async (dispatch) => {
      await axios.put(endpoint+"/"+id, requerimiento)
      .then(({ data }) => {
         return dispatch({
            type: UPDATE_REQUERIMIENTO,
            payload: data,
      });
      });
   };
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
