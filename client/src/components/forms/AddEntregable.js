import React, { useEffect,useState } from 'react'
import dayjs from 'dayjs';
import axios from 'axios';
import { Button, TextField, Box, Divider, Fab,IconButton, FormGroup, FormControlLabel, Switch  } from '@mui/material';
import { SaveOutlined as SaveIcon,Add as AddIcon ,CenterFocusStrong,PersonSearch as SearchIcon} from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import Slider from "@mui/material/Slider";
import {marks} from '../../utils/estadosEntregable';
import { addEntregable, getEstadoEntregable } from '../../redux/acionsEntregable';

const ubicaciones=['Procompite','Mesa de partes','Gerencia de Desarrollo Economico','Administracion','Logistica','Recuersos Humanos','Contabilidad','Tesoreria']

export default function AddEntregable({detalleOrdenServicio}) {
    console.log('Mira quien soy en el formulario',detalleOrdenServicio);
    const obtenerEstado = useSelector((state)=>state.estadoEntregableActual);
    const getEstado = obtenerEstado.find((estado)=>estado.id_detalle_os===detalleOrdenServicio.id_detalle_os);
    console.log('recuperamos algo o no ',obtenerEstado);
    console.log('recuperamos algo o no 2 ', getEstado?.entregable?.estado_entregables[0]?.valor_estado);
    
    
    const [fecha_entregable,setfecha_entregable] = useState(dayjs(getEstado?.entregable?.estado_entregables[0]?.fecha_entregable)??dayjs(new Date()));
    const [file_entregable, setfile_entregable] = useState(null);
    const [inputs,setInputs] = useState(getEstado?.entregable?.estado_entregables[0]?.observacion??"");
    const [sliderUbicacion,setSliderUbicacion] = useState(getEstado?.entregable?.estado_entregables[0]?.valor_estado??marks[0].value);
    const dispatch = useDispatch();
    console.log('slider ubicacion',sliderUbicacion);

    const _handleSubmit=(event)=>{
        event.preventDefault();
        const formDataEntregable = new FormData();
        formDataEntregable.append('file', file_entregable);
        const entregable= {
            id_detalle_os:detalleOrdenServicio.id_detalle_os,
            fecha_entregable:`${fecha_entregable?.$y}-${fecha_entregable?.$M+1<10?"0"+(fecha_entregable?.$M+1):fecha_entregable?.$M+1}-${fecha_entregable?.$D<10?"0"+fecha_entregable?.$D:fecha_entregable?.$D}`,
            observacion:inputs,
            file_entregable:'',
            ubicacion:sliderUbicacion
        }
        formDataEntregable.append('entregable',JSON.stringify(entregable));
        console.log('veamos que hay en el obejto enviad  del from',entregable);
        dispatch(addEntregable(formDataEntregable));
        
    }
    const _handleChange=(event)=>{
        const { value } = event.target;

        setInputs( value );
    } 
    function preventHorizontalKeyboardNavigation(event) {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
        }
      }
      const _handleFecha = (newValue) => {
        setfecha_entregable(newValue);
    }
      const _handleSlider = (event, newValue) => {
        if (typeof newValue === 'number') {
            setSliderUbicacion(newValue);
          }
      };

    
    const _handleChangeFile = (event) => {
        setfile_entregable(event.target.files[0]);
    }
    
    
    useEffect(()=>{
       
        _handleSlider(getEstado?.entregable?.estado_entregables?.valor_estado)
        
    },[])
    return (
        <div>
            <form onSubmit={_handleSubmit}> 
                <Box
                    sx={{
                        '& .MuiTextField-root': { m: 2 },
                        display:'flex',
                        justifyItems:'space-between',
                        gap:'1%',
                        
                    }}
                >
                    <Box sx={{ width: '25%' }}>
                    <Divider>Registrar Entregable</Divider>
                        
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Fecha Entregable"
                                value={fecha_entregable}
                                onChange={_handleFecha}
                                
                                slotProps={{ textField: { variant: 'outlined' } }}
                            />
                        </LocalizationProvider>
                                           
                        <TextField
                            label='Observacion'
                            name='observacionEntregable'
                            onChange={_handleChange}
                            value={inputs}
                            

                        />
                    
                        <label htmlFor='inputfile_entregable'>

                            <input
                                type='file'
                                id='inputfile_entregable'
                                style={{ display: "none" }}
                                onChange={_handleChangeFile}
                            />
                            <Fab
                                color="secondary"
                                size="small"
                                component="span"
                                aria-label="add"
                                variant="extended"
                            >
                                <AddIcon /> {file_entregable? 'Infome Adjuntado' : 'Adjuntar Informe'}
                            </Fab>
                        </label>
                    </Box>
                    
                    
                        <Box sx={{
                            '& .MuiTextField-root': { m: 2 },
                            display:'flex',
                            width:'50%',
                            justifyItems:'space-between' ,
                            flexDirection: 'column',
                            gap:'5%'
                            }}
                                >
                            <Divider>{`Seleccionar 
                            Ubicación 
                            del Informe`} </Divider>    
                            <Box sx={{}}>
                                <Box sx={{ height: 300 }}>
                                    <Slider
                                        sx={{
                                        '& input[type="range"]': {
                                            WebkitAppearance: "slider-vertical"
                                        }
                                        }}
                                        orientation="vertical"
                                        value={sliderUbicacion}
                                        aria-label="Ubicacion"
                                        valueLabelDisplay="off"
                                        marks={marks}
                                        onChange={_handleSlider}
                                        step={null}
                                        onKeyDown={preventHorizontalKeyboardNavigation}
                                    />
                                </Box> 
                                {/*  */}
                            </Box>
                        </Box>   
                        <Box 
                                sx={{
                                        '& .MuiTextField-root': { m: 1 },
                                        display:'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                        height:'20%',
                                        
                                    }}
                        >   
                            <Box>

                            </Box>
                             <Fab
                                color="secondary"
                                size="medium"
                                component="button"
                                aria-label="add"
                                variant="circular"
                                type='submit'
                                
                            >
                                <SaveIcon /> 
                            </Fab>
                        </Box> 
                        
                    </Box>   
                    
                
                
            </form>
        </div>
    )
}
