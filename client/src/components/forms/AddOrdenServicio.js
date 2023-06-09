import React, { useEffect } from 'react'
import dayjs from 'dayjs';
import { useState } from 'react'
import { Document, Page } from 'react-pdf';
import { Button, TextField, Box, Divider, Fab,IconButton  } from '@mui/material';
import { Add as AddIcon ,PersonSearch as SearchIcon} from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProveedores } from '../../redux/actionsProveedor';

export default function AddOrdenServicio({ requerimiento,ordenServicio, proveedor,onCreate, onUpdate, onClose }) {
    const dispatch = useDispatch();
    const proveedores =  useSelector((state=>state.allProveedores));
    const [inputs, setInputs] = useState({
        numero_orden_servicio: ordenServicio?.numero_orden_servicio ?? "",
        numero_certificacion: ordenServicio?.numero_certificacion ?? "",
        expediente_siaf: ordenServicio?.expediente_siaf ?? "",
    
        

    });
    const [numPages, setNumPages] = useState(null);
    console.log('Proveedor',proveedores);
    const [inputsProveedor, setInputsProveedor] = useState({
        dni: proveedor?.dni ?? "",
        nombre: proveedor?.nombre ?? "",
        apellido_paterno: proveedor?.apellido_paterno ?? "",
        apellido_materno: proveedor?.apellido_materno ?? "",
        celular: proveedor?.celular ?? "",
    });
    const [fecha_orden_servicio, setFechaOrdenServicio] = useState(dayjs(new Date()));
    const [file_orden_servicio, setFileOrdenServicio] = useState(null);
    const cleanInputs=(inputs)=>{
        for (const key in inputs) {
            inputs[key]=""
        }
        return inputs;
    }
    
    useEffect(()=>{
        dispatch(getAllProveedores());
        return ()=>{
            setFileOrdenServicio(null);
            setFechaOrdenServicio(null);
            setInputs(inputs=>cleanInputs(inputs));
            setInputsProveedor(inputsProveedor=> cleanInputs(inputsProveedor));

        }
    },[]);

    console.log('ver el valor de fechaselected',`${fecha_orden_servicio}`);
 
    console.log('vemos que contiene el file', file_orden_servicio);
    const handleChangeFile = (event) => {
        setFileOrdenServicio(event.target.files[0]);
    }
    const handleChangeDate = (newValue) => {
        setFechaOrdenServicio(newValue);
    }

    const handleChangeProveedor = (event) => {
        const { name, value } = event.target;

        setInputsProveedor({ ...inputsProveedor, [name]: value });
    }
    const handleChange = (event) => {
        const { name, value } = event.target;

        setInputs({ ...inputs, [name]: value });
        
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        /* if (ordenServicio) {
            if (onUpdate)
                onUpdate({

                    ...inputs,
                    id_orden_servicio: ordenServicio.id_orden_servicio
                });

            if (onClose) onClose();

            return;
        } */
        console.log('requerimiento para la orden de servicio',requerimiento)
        console.log('fecha seleccionada',fecha_orden_servicio)

            const formData = new FormData();
            formData.append('file', file_orden_servicio);
            const newOrden={
             ...inputs,
            id_requerimiento:requerimiento.id_requerimiento,
  
            precio_unitario:requerimiento.precio_unitario,
            cantidad:requerimiento.cantidad,
            fecha_orden_servicio:`${fecha_orden_servicio?.$y}-${fecha_orden_servicio?.$M+1<10?"0"+(fecha_orden_servicio?.$M+1):fecha_orden_servicio?.$M+1}-${fecha_orden_servicio?.$D<10?"0"+fecha_orden_servicio?.$D:fecha_orden_servicio?.$D}`,
            file_orden_servicio:'',
            proveedorf: inputsProveedor
        }
        formData.append('orden',JSON.stringify(newOrden));
        console.log('mi nuevo orden a ingresar',newOrden);
        console.log('mi nuevo orden a ingresar',formData);
        if (onCreate) onCreate(formData);

        if (onClose) onClose();

    }
   
    const _handleSearchProvvedor=()=>{
        console.log(proveedores);
        const proveedorEncontrado = proveedores.length>0?proveedores.find(
            (proveedor)=>proveedor.dni===inputsProveedor.dni):null;
        if(proveedorEncontrado) setInputsProveedor(proveedorEncontrado);
    }

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
      };
    return (
        <div>
            <form onSubmit={handleSubmit}>
               
                <Divider>Proveedor</Divider>
                <Box>
                    <Box>
                        <TextField
                            label='DNI'
                            name='dni'
                            onChange={handleChangeProveedor}
                            value={inputsProveedor.dni}
                            inputProps={{ maxLength: 8, pattern: '[0-9]*',inputMode:'numerics' }}
                        />
                        <IconButton onClick={_handleSearchProvvedor}>
                            <SearchIcon/>
                        </IconButton>
                    </Box>
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
                        name='numero_orden_servicio'
                        onChange={handleChange}
                        value={inputs.numero_orden_servicio}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}

                    />
                    <TextField
                        label='N° de certificacion'
                        name='numero_certificacion'
                        onChange={handleChange}
                        value={inputs.numero_certificacion}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}

                    />
                    <TextField
                        label='Expediente Siaf'
                        name='expediente_siaf'
                        onChange={handleChange}
                        value={inputs.expediente_siaf}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />

                    
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha de Notificación"
                            value={fecha_orden_servicio}
                            onChange={handleChangeDate}
                            
                            slotProps={{ textField: { variant: 'outlined' } }}
                        />
                    </LocalizationProvider>

                    <label htmlFor='inputFileOrdenServicio'>

                        <input
                            accept="application/pdf"
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
                            <AddIcon /> {file_orden_servicio? 'Archivo Cargado' : 'Seleccionar archivo'}
                        </Fab>
                    </label>

                    {file_orden_servicio &&
                    
                        
                        <Document file={file_orden_servicio} onLoadSuccess={onDocumentLoadSuccess}>
                           
                            <Page  pageNumber={1} scale={0.2}/>
                           
                        </Document>
                        
                    }
                </Box>

                <Button
                    type='submit'
                    variant='contained'
                >Guardar</Button>
            </form>
        </div>
    )
}
