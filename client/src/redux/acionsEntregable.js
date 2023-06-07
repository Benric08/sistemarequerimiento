import {ADD_ENTREGABLE,GET_ESTADO_ALL} from './action-types';

import axios from "axios";

const endpoint = 'entregable';
export const addEntregable=(entregable)=>{
   return async (dispatch) => {
      try {
        await axios.post(endpoint, entregable)
        .then(({ data }) => {
         console.log('vamos a ver data deberia ser un array',data);
         return dispatch({
            type: ADD_ENTREGABLE,
            payload: data,
         });
        });
      } catch (error) {
        console.log(error.message);
      }
   };
}
export const getEstadoEntregable =  ()=>{
   return async (dispatch)=>{
      await axios.get(`${endpoint}/estado`)
      .then(({data})=>{return dispatch(
         {
            type:GET_ESTADO_ALL,
            payload: data
         }
      )});

   }
}