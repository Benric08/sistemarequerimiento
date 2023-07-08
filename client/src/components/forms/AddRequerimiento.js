import React from 'react'
import { useState } from 'react'
import requerimientoValidation from '../../validation/requerimientoValidation';
import { Button, TextField, Box, InputAdornment, MenuItem,  Grid } from '@mui/material';
import { isCorrectForm } from '../../utils/validation';
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

  const [inputs, setInputs] = useState({
    descripcion: requerimiento?.descripcion ?? "",
    detalle: requerimiento?.detalle ?? "",
    unidad_medida: requerimiento?.unidad_medida ?? services[0].value,
    cantidad: requerimiento?.cantidad ?? "",
    precio_unitario: requerimiento?.precio_unitario ?? "",

  });
  const [errors, setErrors] = useState();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
    setErrors(requerimientoValidation({ ...inputs, [name]: value }));
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isCorrectForm(errors)) {
      if (requerimiento) {
        if (onUpdate) {
          onUpdate(inputs, requerimiento.id_requerimiento);
        }
        if (onClose) onClose();
        return;
      }
      console.log('before the oncreate', inputs);
      console.log('before the oncreate', onCreate);
      if (onCreate) onCreate(inputs);

      if (onClose) onClose();
    } else {
      alert(`Algo salio mal!!!`);
    }



  }
  return (
    <div>

      <form onSubmit={handleSubmit}>

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
            error={errors?.descripcion ? true : false}
            helperText={errors?.descripcion}
          />

          <TextField
            label='Detalle'
            name='detalle'
            onChange={handleChange}
            value={inputs.detalle}
            multiline
            rows={3}
            fullWidth
            error={errors?.detalle ? true : false}
            helperText={errors?.detalle}
          />
          <TextField
            label='Unidad de Medida'
            name='unidad_medida'
            onChange={handleChange}
            value={inputs.unidad_medida}
            select
            defaultValue={services[0].value}
            sx={{
              width: "33%"
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
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            sx={{
              width: "20%"
            }}
            error={errors?.cantidad ? true : false}
            helperText={errors?.cantidad}
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
              width: "37%"
            }}
            error={errors?.precio_unitario ? true : false}
            helperText={errors?.precio_unitario}
          />
        </Box>

        <Grid container spacing={1} justifyItems="center" alignContent="center">
          <Grid item xs>
            <Button
              type='submit'
              variant='contained'

            >Guardar</Button>
          </Grid>
          <Grid item xs>
            <Button
              onClick={onClose}
              variant='contained'

            >Cancelar</Button>
          </Grid>
        </Grid>
      </form>

    </div>
  )
}
