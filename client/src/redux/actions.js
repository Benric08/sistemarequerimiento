import {ADD_REQUERIMIENTO,REMOVE_REQUERIMIENTO,ORDER,FILTER} from './action-types';

import axios from "axios";

const endpoint = 'http://localhost:3001/requerimientos';
export const addReq=(requerimiento)=>{
   return async (dispatch) => {
      try {
        await axios.post(endpoint, requerimiento)
        .then(({ data }) => {
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
