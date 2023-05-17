import React from 'react'
import { useState } from 'react'
import validation from '../../utils/validation';
import { Button, TextField,Box, InputAdornment, MenuItem } from '@mui/material';
const services = [
  {
    value: 'Servicio',
    label: 'Servicio',
  },
  {
    value: 'Bien',
    label: 'Bien',
  }]
export default function AddRequerimiento({ requerimiento, onCreate, onUpdate, onClose }) {
const [inputs,setInputs] = useState({
  descripcion:"",
  detalle:"",
  unidad_medida:"",
  cantidad:"",
  precio_unitario:"",

});
const [errors,setErrors] = useState({});    
const handleChange =(event)=>{
    const {name,value} = event.target;
    setInputs({...inputs,[name]:value});
    //setErrors(validation({...inputs,[name]:value}));
}
const handleSubmit =(event)=>{
    event.preventDefault();
    if (requerimiento) {
        if (onUpdate)
          onUpdate({
            
          });
  
        if (onClose) onClose();
  
        return;
      }
  
      if (onCreate) onCreate(inputs);
  
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
        <Box
         
        >
          <TextField 
              label='Descripcion'
              name='descripcion'
              onChange={handleChange}
              value={inputs.descripcion}
              multiline
              rows={3}
              fullWidth
          />
          <TextField 
              label='Detalle'
              name='detalle'
              onChange={handleChange}
              value={inputs.detalle}
              multiline
              rows={3}
              fullWidth
              
          />
          <TextField 
              label='Unidad de Medida'
              name='unidad_medida'
              onChange={handleChange}
              value={inputs.unidad_medida}
              select
              defaultValue={services[0].value}
              sx={{
                width:"33%"
              }}
              >
                 {services.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                   {option.label}
                </MenuItem>
          ))}
          </TextField>
          
          <TextField 
              label='Cantidad'
              name='cantidad'
              onChange={handleChange}
              value={inputs.cantidad}
              type='number'
              sx={{
                width:"20%"
              }}
          />
          <TextField 
              label='Precio Unitario'
              name='precio_unitario'
              onChange={handleChange}
              value={inputs.precio_unitario}
              InputProps={{
                startAdornment: <InputAdornment position="start">S/.</InputAdornment>,
              }}
              sx={{
                width:"37%"
              }}
          />
        </Box>

        <Button 
          type='submit'
          variant='contained'
        
        >Guardar</Button> 
      </form>
    </div>
  )
}
