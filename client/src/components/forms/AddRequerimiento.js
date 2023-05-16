import React from 'react'
import { useState } from 'react'
import validation from '../../utils/validation';
import { Button, TextField } from '@mui/material';

export default function AddRequerimiento({ requerimiento, onCreate, onUpdate, onClose }) {
const [inputs,setInputs] = useState({
    descripcion:"",
    detalle:"",
    precioUnitario:"",
    cantidad:"",
});
const [errors,setErrors] = useState({});    
const handleChange =(event)=>{
    const {name,value} = event.target;
    setInputs({...inputs,[name]:value});
    setErrors(validation({...inputs,[name]:value}));
}
const handleSubmit =(event)=>{
    event.preventDefault();
    if (requerimiento) {
        if (onUpdate)
          onUpdate({
            ...task,
            ...state
          });
  
        if (onClose) onClose();
  
        return;
      }
  
      if (onCreate) onCreate(state);
  
      if (onClose) onClose();
        
}    
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="email">Email:</label>
        <input type="text" name='email' onChange={handleChange} value={inputs.email} className={inputs.email && "warning"}/>
        {errors.email && errors.email.map(err=><span>{err}</span>)}
        <br />
        <label htmlFor="password">Password:</label>
        <input type="text" name='password' onChange={handleChange} value={inputs.password} className={inputs.password && "warning"}/>
        {errors.password && errors.password.map(err=><span>{err}</span>)}
        <br />
        <button>Submit</button> */}
        <TextField 
            name='descripcion'
            onChange={handleChange}
            value={inputs.descripcion}
        />
        <TextField 
            name='detalle'
            onChange={handleChange}
            value={inputs.detalle}
        />
        <TextField 
            name='cantidad'
            onChange={handleChange}
            value={inputs.cantidad}
        />
        <TextField 
            name='precioUnitario'
            onChange={handleChange}
            value={inputs.precioUnitario}
        />

        <Button type='submit'>Guardar</Button> 
      </form>
    </div>
  )
}
