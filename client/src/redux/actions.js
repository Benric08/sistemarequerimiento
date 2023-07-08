import {
   ADD_REQUERIMIENTO, REMOVE_REQUERIMIENTO, UPDATE_REQUERIMIENTO,
   GETALL_REQUERIMIENTOS, ADD_ESTADO_REQUERIMIENTO, GET_ESTADO_REQUERIMIENTO
} from './action-types';

import axios from "axios";

const endpoint = 'requerimiento';
export const addReq = (requerimiento) => {
   return async (dispatch) => {
      try {
         await axios.post(endpoint, requerimiento)
            .then(({ data }) => {
               console.log('vamos a ver data', data);
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
export const updateReq = (requerimiento, id_requerimiento) => {
   console.log(`requerimineto que recibe el update del front`, requerimiento);
   console.log(`id que recibe el update del front`, id_requerimiento);

   return async (dispatch) => {
      try {
         await axios.put(endpoint + "/" + id_requerimiento, requerimiento)
            .then(async ({ data }) => {
               return dispatch({
                  type: UPDATE_REQUERIMIENTO,
                  payload: data,
               });
            });
      } catch (error) {
         console.log(error.message);
      }
   };
}
export const getAllRequirements = () => {
   console.log(`Estoy dentro del todosaction`);
   return async (dispatch) => {
      try {
         await axios.get(endpoint)
            .then(({ data }) => {
               return dispatch({
                  type: GETALL_REQUERIMIENTOS,
                  payload: data
               });
            })
      } catch (error) {
         console.log(error.message);
      }
   }
}
export const deleteReque = (id) => {

   return async (dispatch) => {
      await axios.delete(endpoint + "/" + id)
         .then(({ data }) => {
            return dispatch({
               type: REMOVE_REQUERIMIENTO,
               payload: data,
            });
         });
   };
}

export const addEstadoRequerimiento = (estadoRequerimiento) => {
   return async (dispatch) => {
      await axios.post(`${endpoint}/detalle/estado`, estadoRequerimiento)
         .then(({ data }) => {
            return dispatch({
               type: ADD_ESTADO_REQUERIMIENTO,
               payload: data

            })
         })
   }
}

export const getEstadoEntregable = () => {
   return async (dispatch) => {
      await axios.get(`${endpoint}/detalle/estado`)
         .then(({ data }) => {
            return dispatch(
               {
                  type: GET_ESTADO_REQUERIMIENTO,
                  payload: data
               }
            )
         });

   }
}
