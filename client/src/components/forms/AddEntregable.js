import React, { useEffect,useState } from 'react'
import dayjs from 'dayjs';
import { Button, TextField, Box, Divider, Fab,IconButton, FormGroup, FormControlLabel, Switch  } from '@mui/material';
import { Add as AddIcon ,PersonSearch as SearchIcon} from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import Slider from "@mui/material/Slider";

const ubicaciones=['Procompite','Mesa de partes','Gerencia de Desarrollo Economico','Administracion','Logistica','Recuersos Humanos','Contabilidad','Tesoreria']
const marks = [
    {
      value: 4,
      label: "Procompite"
    },
    {
      value: 17,
      label: "Mesa de partes"
    },
    {
      value: 30,
      label: "Gerencia de Desarrollo Economico"
    },
    {
      value: 43,
      label: "Administracion"
    },
    {
      value: 56,
      label: "Logistica"
    },
    {
      value: 69,
      label: "Recursos Humanos"
    },
    {
      value: 82,
      label: "Contabilidad"
    },
    {
      value: 95,
      label: "Tesoreria"
    }
  ];
export default function AddOrdenServicio({detalleOrdenServicio}) {
    const [fechaEntregable,setFechaEntregable] = useState(dayjs(new Date()));
    const [fileEntregable, setFileEntregable] = useState(null);
    const [inputs,setInputs] = useState("");
    const _handleSubmit=(event)=>{
        event.preventDefault();

    }
    const _handleChange=(event)=>{
        const { name, value } = event.target;

        setInputs({ ...inputs, [name]: value });
    } 
    function preventHorizontalKeyboardNavigation(event) {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
        }
      }
      const _handleSlider = (event) => {
        const{value}=event.target;
        console.log(value);
      };

    
    const _handleChangeFile = (event) => {
        setFileEntregable(event.target.files[0]);
    }
    return (
        <div>
            <form onSubmit={_handleSubmit}>
                <Divider>Registrar Entregable</Divider>
                <Box
                    sx={{
                        '& .MuiTextField-root': { m: 2 },
                        display:'flex'
                    }}
                >
                    <Box sx={{ width: '25%' }}>
                        
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
                            label='Descripcion'
                            name='descripcionEntregable'
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
                                <AddIcon /> {fileEntregable? 'Archivo Cargado' : 'Seleccionar archivo'}
                            </Fab>
                        </label>
                    </Box>
                    
                    <Box sx={{ height: 200 }}>
                        <Slider
                            sx={{
                            '& input[type="range"]': {
                                WebkitAppearance: "slider-vertical"
                            }
                            }}
                            orientation="vertical"
                            defaultValue={4}
                            aria-label="Ubicacion"
                            valueLabelDisplay="off"
                            marks={marks}
                            onChange={_handleSlider}
                            step={null}
                            onKeyDown={preventHorizontalKeyboardNavigation}
                        />
                    </Box>    
                            
                    
                </Box>
                <Box
                    sx={{
                        '& .MuiTextField-root': { m: 1 },
                        margin: 3
                    }}
                >
                    <Button 
                        type='submit'
                        variant='contained'
                    >Guardar</Button>
                </Box>
            </form>
        </div>
    )
}
