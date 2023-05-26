import React, { useEffect,useState } from 'react'
import dayjs from 'dayjs';
import { Button, TextField, Box, Divider, Fab,IconButton, FormGroup, FormControlLabel, Switch  } from '@mui/material';
import { SaveOutlined as SaveIcon,Add as AddIcon ,CenterFocusStrong,PersonSearch as SearchIcon} from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import Slider from "@mui/material/Slider";
import {marks} from '../../utils/estadosEntregable';
const ubicaciones=['Procompite','Mesa de partes','Gerencia de Desarrollo Economico','Administracion','Logistica','Recuersos Humanos','Contabilidad','Tesoreria']

export default function AddOrdenServicio({detalleOrdenServicio}) {
    const [fechaEntregable,setFechaEntregable] = useState(dayjs(new Date()));
    const [fileEntregable, setFileEntregable] = useState(null);
    const [inputs,setInputs] = useState("");
    const [sliderUbicacion,setSliderUbicacion] = useState(marks[0].value);
    const _handleSubmit=(event)=>{
        event.preventDefault();
        const formDataEntregable = new FormData();
        formDataEntregable.append('file', fileEntregable);
        const entregable= {
            idDetalleOrdenServicio:detalleOrdenServicio.idDetalleOrdenServicio,
            fechaEntregable:`${fechaEntregable?.$y}-${fechaEntregable?.$M+1<10?"0"+(fechaEntregable?.$M+1):fechaEntregable?.$M+1}-${fechaEntregable?.$D<10?"0"+fechaEntregable?.$D:fechaEntregable?.$D}`,
            observacion:inputs,
            fileEntregable:'',
            ubicacion:sliderUbicacion
        }
        formDataEntregable.append('entregable',JSON.stringify(entregable));
        
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
      const _handleSlider = (event) => {
        const{value}=event.target;
        setSliderUbicacion(value);
        console.log('viendo lo que trae el slider',value);
      };

    
    const _handleChangeFile = (event) => {
        setFileEntregable(event.target.files[0]);
    }
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
                                value={fechaEntregable}
                                onChange={(newValue) => {
                                    setFechaEntregable(newValue);
                                }}
                                
                                slotProps={{ textField: { variant: 'outlined' } }}
                            />
                        </LocalizationProvider>
                                           
                        <TextField
                            label='Observacion'
                            name='observacionEntregable'
                            onChange={_handleChange}
                            value={inputs.numeroOrdenServicio}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}

                        />
                    
                        <label htmlFor='inputFileEntregable'>

                            <input
                                type='file'
                                id='inputFileEntregable'
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
                                <AddIcon /> {fileEntregable? 'Infome Adjuntado' : 'Adjuntar Informe'}
                            </Fab>
                        </label>
                    </Box>
                    
                    
                        <Box sx={{
                            '& .MuiTextField-root': { m: 2 },
                            display:'flex',
                            width:'50%',
                            justifyItems:'space-between' ,
                            'flex-direction': 'column',
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
                                        defaultValue={sliderUbicacion}
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
                                        'flex-direction': 'column',
                                        'align-items': 'flex-end',
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
