import {ADD_ORDEN_SERVICIO} from './action-types';

import axios from "axios";

const endpoint = 'http://localhost:3001/orden_servicio';
export const addOrdenServicio=(ordenServicio)=>{
   return async (dispatch) => {
      try {
        await axios.post(endpoint, ordenServicio)
        .then(({ data }) => {
         console.log('vamos a ver data',data);
         return dispatch({
            type: ADD_ORDEN_SERVICIO,
            payload: data,
         });
        });
      } catch (error) {
        console.log(error.message);
      }
   };
}