import React, { useState } from 'react'
import { Container, Fab, Grid, TextField } from '@mui/material';
import { AttachFile as AttachIcon } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import entregableDocsValidation from '../../validation/entregableDocsValidation';
import axios from 'axios';
import { isCorrectForm } from '../../utils/validation';
import { useSelector } from 'react-redux';
function AddDetealleEntregable({ detalleOrdenServicio }) {
  const obtenerEstado = useSelector((state) => state.estadoEntregableActual);
  const getEstado = obtenerEstado.find((estado) => estado.id_detalle_os === detalleOrdenServicio.id_detalle_os);
  //const ejecucionPresupuestal=getEstado?.ejecucion_presupuestaria[0].ejecucion_presupuestaria??"Comprometido";
  const entregable = getEstado?.entregable?.estado_entregables[0];
  const [inputsForm, setInputsForm] = useState({
    numero_informe_conformidad: "",
    fecha_informe_conformidad: null,
    file_informe_conformidad: null,
    numero_recibo_honorarios: "",
    fecha_recibo_honorarios: null,
    file_recibo_honorarios: null,
    numero_comprobante_pago: "",
    fecha_comprobante_pago: null,
    file_comprobante_pago: null
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputsForm({ ...inputsForm, [name]: value });
    setErrors(entregableDocsValidation({ ...inputsForm, [name]: value }));
  }
  const handleChangeDateIC = (newValue) => {
    setInputsForm({ ...inputsForm, fecha_informe_conformidad: newValue });
    setErrors(entregableDocsValidation({ ...inputsForm, fecha_informe_conformidad: newValue }));
  }
  const handleChangeDateRHE = (newValue) => {
    setInputsForm({ ...inputsForm, fecha_recibo_honorarios: newValue });
    setErrors(entregableDocsValidation({ ...inputsForm, fecha_recibo_honorarios: newValue }));
  }
  const handleChangeDateCP = (newValue) => {
    setInputsForm({ ...inputsForm, fecha_comprobante_pago: newValue });
    setErrors(entregableDocsValidation({ ...inputsForm, fecha_comprobante_pago: newValue }));
  }
  const handleChangeFile = (event) => {
    const { name } = event.target;
    setInputsForm({ ...inputsForm, [name]: event.target.files[0] });
    setErrors(entregableDocsValidation({ ...inputsForm, [name]: event.target.files[0] }));
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('veamos el contenido del form', inputsForm);

    if (isCorrectForm(errors)) {
      const dataForm = new FormData();
      dataForm.append('detalleEntregable', JSON.stringify({
        id_entregable: entregable.id_entregable,
        ...inputsForm,
        fecha_informe_conformidad: inputsForm.fecha_informe_conformidad.format('YYYY-MM-DD'),
        fecha_recibo_honorarios: inputsForm.fecha_recibo_honorarios.format('YYYY-MM-DD'),
        fecha_comprobante_pago: inputsForm.fecha_comprobante_pago.format('YYYY-MM-DD')
      }));
      dataForm.append('IC', inputsForm.file_informe_conformidad);
      dataForm.append('RHE', inputsForm.file_recibo_honorarios);
      dataForm.append('CP', inputsForm.file_comprobante_pago);
      try {
        const { data } = await axios.post('/entregable/pdf', dataForm)
        console.log('luego de insertar datafrom', data);
      } catch (error) {
        console.log('eror', error);
        alert(error);
      }
    } else {
      alert('Complete Correctamente los campos requridos')
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Container>
          <Grid container spacing={1}>

            <Grid item xs={12} sm={3}>
              <TextField
                required
                label='N° Informe de conformidad'
                name='numero_informe_conformidad'
                onChange={handleChange}
                value={inputsForm.numero_informe_conformidad}
                error={errors?.numero_informe_conformidad ? true : false}
                helperText={errors?.numero_informe_conformidad} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha del Documento"
                  value={inputsForm.fecha_informe_conformidad}
                  onChange={handleChangeDateIC}

                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      required: true,
                      error: errors?.fecha_informe_conformidad ? true : false,
                      helperText: errors?.fecha_informe_conformidad
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>

              <label htmlFor='inputFileInformeConformidad'>
                <input
                  type='file'
                  name='file_informe_conformidad'
                  id='inputFileInformeConformidad'
                  style={{ display: "none" }}
                  onChange={handleChangeFile}
                />

                <Fab
                  color="secondary"
                  size="small"
                  component="span"
                  aria-label="add"
                  variant="extended"
                >
                  <AttachIcon /> {inputsForm.file_informe_conformidad ? 'Infome Adjuntado' : 'Adjuntar Informe'}
                </Fab>
                {errors?.file_informe_conformidad ?
                  <p className='MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained Mui-required css-1wc848c-MuiFormHelperText-root'>
                    {errors?.file_informe_conformidad}
                  </p> : ""}
              </label>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                label='N° Recibo por Honorarios'
                name='numero_recibo_honorarios'
                onChange={handleChange}
                value={inputsForm.numero_recibo_honorarios}
                error={errors?.numero_recibo_honorarios ? true : false}
                helperText={errors?.numero_recibo_honorarios} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha del Documento"
                  value={inputsForm.fecha_recibo_honorarios}
                  onChange={handleChangeDateRHE}

                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      required: true,
                      error: errors?.fecha_recibo_honorarios ? true : false,
                      helperText: errors?.fecha_recibo_honorarios
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label htmlFor='inputFileReciboHonorario'>
                <input
                  type='file'
                  name='file_recibo_honorarios'
                  id='inputFileReciboHonorario'
                  style={{ display: "none" }}
                  onChange={handleChangeFile}
                />
                <Fab
                  color="secondary"
                  size="small"
                  component="span"
                  aria-label="add"
                  variant="extended"
                >
                  <AttachIcon /> {inputsForm.file_recibo_honorarios ? 'Recibo Adjuntado' : 'Adjuntar Recibo'}
                </Fab>
                {errors?.file_recibo_honorarios ?
                  <p className='MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained Mui-required css-1wc848c-MuiFormHelperText-root'>
                    {errors?.file_recibo_honorarios}
                  </p> : ""}
              </label>
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                required
                label='N° de CP'
                name='numero_comprobante_pago'
                onChange={handleChange}
                value={inputsForm.numero_comprobante_pago}
                error={errors?.numero_comprobante_pago ? true : false}
                helperText={errors?.numero_comprobante_pago} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha del Documento"
                  value={inputsForm.fecha_comprobante_pago}
                  onChange={handleChangeDateCP}

                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      required: true,
                      error: errors?.fecha_comprobante_pago ? true : false,
                      helperText: errors?.fecha_comprobante_pago
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label htmlFor='inputFileComprobantePago'>
                <input
                  type='file'
                  name='file_comprobante_pago'
                  id="inputFileComprobantePago"
                  style={{ display: "none" }}
                  onChange={handleChangeFile}
                />
                <Fab
                  color="secondary"
                  size="small"
                  component="span"
                  aria-label="add"
                  variant="extended"
                >
                  <AttachIcon /> {inputsForm.file_comprobante_pago ? 'Comprobante Adjuntado' : 'Adjuntar Comprobante'}
                </Fab>
                {errors?.file_comprobante_pago ?
                  <p className='MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained Mui-required css-1wc848c-MuiFormHelperText-root'>
                    {errors?.file_comprobante_pago}
                  </p> : ""}
              </label>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Fab variant='extended' color='primary' type='submmit' >Guardar</Fab>
            </Grid>
          </Grid>
        </Container>
      </form>
    </div>
  )
}

export default AddDetealleEntregable