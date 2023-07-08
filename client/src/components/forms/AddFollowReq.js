import React, { useState } from 'react'
import dayjs from 'dayjs';
import { marksRequerimiento } from '../../utils/estadosEntregable'
import { Box, Divider, Fab, Slider, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { SaveOutlined as SaveIcon } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { Zoom } from "@mui/material";
const AddFollowReq = ({ onHandleSubmit, estadoRequerimiento }) => {
    console.log('vemos que hay en el estdoReq que llega del dialogo', estadoRequerimiento);
    function preventHorizontalKeyboardNavigation(event) {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
        }
    }

    const [fechaRequerimiento, setFechaRequerimiento] = useState(dayjs(new Date(estadoRequerimiento?.estado_requerimientos[0]?.fecha_estado_requerimiento ?? new Date())));
    const [observacion, setObservacion] = useState(estadoRequerimiento?.estado_requerimientos[0]?.observacion ?? '');
    const [sliderUbicacion, setSliderUbicacion] = useState(estadoRequerimiento?.estado_requerimientos[0]?.valor_estado ?? marksRequerimiento[0].value);
    const _handleChangeObservacion = (event) => {
        const { value } = event.target;

        setObservacion(value);
    }
    const _handleFecha = (newDate) => {
        setFechaRequerimiento(newDate);
    }
    const _handleSlider = (event, newValue) => {
        if (typeof newValue === 'number') {
            setSliderUbicacion(newValue);
        }
    }
    const _handleSubmit = (event) => {
        event.preventDefault();
        const formdata = {
            observacion,
            fechaRequerimiento: fechaRequerimiento.format('YYYY-MM-DD'),
            sliderUbicacion
        }

        console.log('enviado el estado reuqer', formdata);
        if (onHandleSubmit) onHandleSubmit(formdata);
    }
    console.log('observacion', observacion);
    console.log('fechaselected', fechaRequerimiento.format('YYYY-MM-DD'));
    console.log('ubicacionSlider', sliderUbicacion);

    return (
        <form onSubmit={_handleSubmit} >
            <Box
                sx={{
                    '& .MuiTextField-root': { m: 2 },
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    gap: '1%',

                }}
            >
                <Box sx={{ width: '25%' }}>


                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha Entregable"
                            value={fechaRequerimiento}
                            onChange={_handleFecha}

                            slotProps={{ textField: { variant: 'outlined' } }}
                        />
                    </LocalizationProvider>

                    <TextField
                        label='Observacion'
                        name='observacionEntregable'
                        onChange={_handleChangeObservacion}
                        value={observacion}


                    />


                </Box>

                <Divider orientation="vertical" flexItem />
                <Box sx={{
                    '& .MuiTextField-root': { m: 2 },
                    display: 'flex',
                    width: '50%',
                    justifyItems: 'space-between',
                    flexDirection: 'column',
                    gap: '15%'
                }}
                >
                    <Box>
                        <Divider>{`Seleccionar 
                                Ubicación 
                                del Requerimiento`} </Divider>
                    </Box>
                    <Box sx={{ marginTop: '3%' }}>
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
                                marks={marksRequerimiento}
                                onChange={_handleSlider}
                                step={null}
                                onKeyDown={preventHorizontalKeyboardNavigation}
                            />
                        </Box>

                    </Box>
                </Box>
                <Box
                    sx={{
                        '& .MuiTextField-root': { m: 1 },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        height: '20%',

                    }}
                >
                    <Box>

                    </Box>
                    <Tooltip title="Guardar" TransitionComponent={Zoom}>
                        <Fab
                            color="secondary"
                            size="medium"
                            component="button"
                            aria-label="add"
                            variant="circular"
                            type='submit'
                            label='Guardar'

                        >
                            <SaveIcon />
                        </Fab>
                    </Tooltip>
                </Box>

            </Box>




        </form>
    )
}

export default AddFollowReq
