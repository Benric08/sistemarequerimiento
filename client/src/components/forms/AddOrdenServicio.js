import React, { useEffect } from 'react'
//import { Dayjs } from 'dayjs';
import { useState } from 'react'
//import DatePicker from 'react-date-picker'
import { Button, TextField, Box, Divider, Fab } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export default function AddOrdenServicio({ requerimiento,ordenServicio, proveedor, onCreate, onUpdate, onClose }) {
    const [inputs, setInputs] = useState({
        numeroOrdenServicio: ordenServicio?.numeroOrdenServicio ?? "",
        numeroCertificacion: ordenServicio?.numeroCertificacion ?? "",
        expedienteSiaf: ordenServicio?.expedienteSiaf ?? "",
        /* fechaOrdenServicio:ordenServicio?.fechaOrdenServicio??new Date(),
        fileOrdenServicio:ordenServicio?.fileOrdenServicio??"", */

    });

    const [inputsProveedor, setInputsProveedor] = useState({
        dni: proveedor?.dni ?? "",
        nombre: proveedor?.nombre ?? "",
        apellido_paterno: proveedor?.apellido_paterno ?? "",
        apellido_materno: proveedor?.apellido_materno ?? "",
        celular: proveedor?.celular ?? "",
    });
    const [fechaOrdenServicio, setFechaOrdenServicio] = useState(ordenServicio?.fechaOrdenServicio ?? null)
    const [fileOrdenServicio, setFileOrdenServicio] = useState(null);
    const cleanInputs=(inputs)=>{
        for (const key in inputs) {
            inputs[key]=""
        }
        return inputs;
    }
    
    useEffect(()=>{
        return ()=>{
            setFileOrdenServicio(null);
            setFechaOrdenServicio(null);
            setInputs(inputs=>cleanInputs(inputs));
            setInputsProveedor(inputsProveedor=> cleanInputs(inputsProveedor));

        }
    },[]);

    console.log('ver el valor de fechaselected',`${fechaOrdenServicio?.$y}-${fechaOrdenServicio?.$M+1<10?"0"+(fechaOrdenServicio?.$M+1):fechaOrdenServicio?.$M+1}-${fechaOrdenServicio?.$D<10?"0"+fechaOrdenServicio?.$D:fechaOrdenServicio?.$D}`);
 
    console.log('vemos que contiene el file', fileOrdenServicio);
    const handleChangeFile = (event) => {
        setFileOrdenServicio(event.target.files[0]);
    }

    const handleChangeProveedor = (event) => {
        const { name, value } = event.target;
        setInputsProveedor({ ...inputsProveedor, [name]: value });
    }
    const handleChange = (event) => {
        const { name, value } = event.target;

        setInputs({ ...inputs, [name]: value });
        //setErrors(validation({...inputs,[name]:value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        /* if (ordenServicio) {
            if (onUpdate)
                onUpdate({

                    ...inputs,
                    idOrdenServicio: ordenServicio.idOrdenServicio
                });

            if (onClose) onClose();

            return;
        } */
        console.log('requerimiento para la orden de servicio',requerimiento)

            const formData = new FormData();
            formData.append('file', fileOrdenServicio);
            const newOrden={
             ...inputs,
            idRequerimiento:requerimiento.idRequerimiento,
  
            precio_unitario:requerimiento.precio_unitario,
            cantidad:requerimiento.cantidad,
            fechaOrdenServicio:`${fechaOrdenServicio?.$y}-${fechaOrdenServicio?.$M+1<10?"0"+(fechaOrdenServicio?.$M+1):fechaOrdenServicio?.$M+1}-${fechaOrdenServicio?.$D<10?"0"+fechaOrdenServicio?.$D:fechaOrdenServicio?.$D}`,
            fileOrdenServicio:'',
            proveedor: inputsProveedor
        }
        formData.append('orden',JSON.stringify(newOrden));
        console.log('mi nuevo orden a ingresar',newOrden);
        console.log('mi nuevo orden a ingresar',formData);
        if (onCreate) onCreate(formData);

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
                <Divider>Proveedor</Divider>
                <Box>
                    <TextField
                        label='DNI'
                        name='dni'
                        onChange={handleChangeProveedor}
                        value={inputsProveedor.dni}
                        inputProps={{ maxLength: 8, pattern: '[0-9]*',inputMode:'numerics' }}
                    />
                    <TextField
                        label='Nombres'
                        name='nombre'
                        onChange={handleChangeProveedor}
                        value={inputsProveedor.nombre}
                    />
                    <TextField
                        label='Apellido Paterno'
                        name='apellido_paterno'
                        onChange={handleChangeProveedor}
                        value={inputsProveedor.apellido_paterno}
                    />
                    <TextField
                        label='Apellido Materno'
                        name='apellido_materno'
                        onChange={handleChangeProveedor}
                        value={inputsProveedor.apellido_materno}
                    />
                    <TextField
                        label='Celular'
                        name='celular'
                        onChange={handleChangeProveedor}
                        value={inputsProveedor.celular}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength:9  }}
                    />
                </Box>
                <Divider>Orden de Servicio</Divider>
                <Box>
                    <TextField
                        label='N° de orden de servicio'
                        name='numeroOrdenServicio'
                        onChange={handleChange}
                        value={inputs.numeroOrdenServicio}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}

                    />
                    <TextField
                        label='N° de certificacion'
                        name='numeroCertificacion'
                        onChange={handleChange}
                        value={inputs.numeroCertificacion}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}

                    />
                    <TextField
                        label='Expediente Siaf'
                        name='expedienteSiaf'
                        onChange={handleChange}
                        value={inputs.expedienteSiaf}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />

                    {/* <label htmlFor='fechaOrdenServicio' >Fecha</label> */}

                    {/* <DatePicker
              id='fechaOrdenServicio'
              name='fechaOrdenServicio'
              onChange={setFechaOrdenServicio}
              value={fechaOrdenServicio}
              
          /> */}

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha Orden Servicio"
                            value={fechaOrdenServicio}
                            onChange={(newValue) => {
                                setFechaOrdenServicio(newValue);
                            }}
                            /*renderInput={(params) => <TextField {...params} />}*/
                            slotProps={{ textField: { variant: 'outlined' } }}
                        />
                    </LocalizationProvider>

                    <label htmlFor='inputFileOrdenServicio'>

                        <input
                            type='file'
                            id='inputFileOrdenServicio'
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
                            <AddIcon /> {fileOrdenServicio? 'Archivo Cargado' : 'Seleccionar archivo'}
                        </Fab>
                    </label>
                </Box>

                <Button
                    type='submit'
                    variant='contained'
                >Guardar</Button>
            </form>
        </div>
    )
}
