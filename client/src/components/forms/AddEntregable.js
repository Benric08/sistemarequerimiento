import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { TextField, Box, Divider, Fab, Grid } from '@mui/material';
import { SaveOutlined as SaveIcon, AttachFile as AttachIcon } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import Slider from "@mui/material/Slider";
import { marks } from '../../utils/estadosEntregable';
import { addEntregable } from '../../redux/acionsEntregable';
import ConfirmEjecucionPresupuestaria from '../dialogs/ConfirmEjecucionPresupuestaria';
import EnvioExitoso from '../dialogs/EnvioExitoso';
import entregableValidation from '../../validation/entregableValidation';
import { isCorrectForm } from '../../utils/validation';
export default function AddEntregable({ detalleOrdenServicio }) {
    const obtenerEstado = useSelector((state) => state.estadoEntregableActual);
    const getEstado = obtenerEstado.find((estado) => estado.id_detalle_os === detalleOrdenServicio.id_detalle_os);
    const siseAePresupuestal = getEstado?.ejecucion_presupuestaria.length > 0 ? getEstado?.ejecucion_presupuestaria.length - 1 : 0;
    const ePresupuestal = getEstado?.ejecucion_presupuestaria[siseAePresupuestal]?.ejecucion_presupuestaria ?? "Comprometido";
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [open, setOpen] = useState(false);
    const [activeSlider, setActiveSlider] = useState(false);
    const [ejecucionPresupuestal, setEjecucionPresupuestal] = useState(0)
    const [fecha_entregable, setfecha_entregable] = useState(dayjs(getEstado?.entregable?.estado_entregables[0]?.fecha_entregable) ?? dayjs(new Date()));
    const [file_entregable, setfile_entregable] = useState(null);
    const [errors, setErrors] = useState({});
    const [inputs, setInputs] = useState({
        observacion: getEstado?.entregable?.estado_entregables[0]?.observacion ?? "",
        numero_informe: getEstado?.entregable?.numero_informe ?? ""
    });

    const [sliderUbicacion, setSliderUbicacion] = useState(getEstado?.entregable?.estado_entregables[0]?.valor_estado ?? marks[0].value);
    const dispatch = useDispatch();
    /* console.log('slider ubicacion', sliderUbicacion);
    console.log('tamanio del array', siseAePresupuestal);
    console.log('ejecucion presupuestal', ePresupuestal); */

    const _handleSubmit = (event) => {
        event.preventDefault();
        if (isCorrectForm(errors)) {
            const formDataEntregable = new FormData();
            formDataEntregable.append('file', file_entregable);
            const entregable = {
                id_detalle_os: detalleOrdenServicio.id_detalle_os,
                fecha_entregable: fecha_entregable.format('YYYY-MM-DD'),
                ...inputs,
                file_entregable: '',
                ubicacion: sliderUbicacion
            }
            formDataEntregable.append('entregable', JSON.stringify(entregable));
            console.log('enviando el entregable', entregable);
            dispatch(addEntregable(formDataEntregable));
            //dispatch(getEstadoEntregable());
            setIsSubmitted(true);
        } else {
            alert("complete todos los campos");
        }
    }
    const _handleChange = (event) => {
        const { value, name } = event.target;

        setInputs({ ...inputs, [name]: value });
        setErrors(entregableValidation({ ...inputs, [name]: value, fecha_entregable, file_entregable }));
    }
    function preventHorizontalKeyboardNavigation(event) {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
        }
    }
    const _handleFecha = (newValue) => {
        setfecha_entregable(newValue);
        setErrors(entregableValidation({ ...inputs, fecha_entregable, file_entregable }));
    }
    const _handleSlider = (event, newValue) => {
        if (typeof newValue === 'number') {
            setSliderUbicacion(newValue);
        }
        if (newValue === marks[7].value) {
            if (ePresupuestal !== "Devengado") {
                setEjecucionPresupuestal(8);
                setOpen(true);
            }
            console.log('generar deve');
        }
        if (newValue === marks[8].value) {
            if (ePresupuestal === "Devengado") {
                setEjecucionPresupuestal(9);
                setOpen(true);
            } else if (ePresupuestal === "Girado") {
                setActiveSlider(true);

            } else {
                setSliderUbicacion(marks[6].value);
                //setEjecucionPresupuestal(8);
                alert("aun no se ha devengado");
            }
            console.log('generar gira');
        }
    };


    const _handleChangeFile = (event) => {
        setfile_entregable(event.target.files[0]);
        setErrors(entregableValidation({ ...inputs, fecha_entregable, file_entregable:event.target.files[0] }));
    }

    const handleClose = () => {
        setOpen(false);
    }
    useEffect(() => {
        if (ePresupuestal === "Girado") {
            setActiveSlider(true);
        }
        _handleSlider(getEstado?.entregable?.estado_entregables?.valor_estado)

    }, [])
    return (
        <div>
            <ConfirmEjecucionPresupuestaria
                open={open}
                idDetalleOS={detalleOrdenServicio.id_detalle_os}
                descripcion={detalleOrdenServicio.descripcion}
                estadoEntregable={ejecucionPresupuestal}
                onClose={handleClose}
            />

            <form onSubmit={_handleSubmit}>

                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Divider>Registro del Entregable</Divider>
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Fecha Entregable"
                                        value={fecha_entregable}
                                        onChange={_handleFecha}

                                        slotProps={{ textField: { variant: 'outlined' } }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label='N° de Informe'
                                    name='numero_informe'
                                    onChange={_handleChange}
                                    value={inputs.numero_informe}
                                    error={errors?.numero_informe ? true : false}
                                    helperText={errors?.numero_informe}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label='Observacion'
                                    name='observacion'
                                    onChange={_handleChange}
                                    value={inputs.observacion}
                                    error={errors?.observacion ? true : false}
                                    helperText={errors?.observacion}

                                />
                            </Grid>
                            <Grid item xs={12}>
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
                                        <AttachIcon /> {file_entregable ? 'Infome Adjuntado' : 'Adjuntar Informe'}
                                    </Fab>
                                    {errors?.file_entregable ?
                                        <p className='MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained Mui-required css-1wc848c-MuiFormHelperText-root'>
                                            {errors?.file_entregable}
                                        </p> : ""}
                                </label>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Divider>{`Seleccionar 
                            Ubicación 
                            del Informe`} </Divider>

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
                                disabled={activeSlider}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Fab
                            color="primary"
                            size="medium"
                            component="button"
                            aria-label="add"
                            variant="circular"
                            type='submit'

                        >
                            <SaveIcon />
                        </Fab>
                    </Grid>
                </Grid>




            </form>
            <EnvioExitoso open={isSubmitted} onClose={() => setIsSubmitted(false)} />

        </div>
    )
}
