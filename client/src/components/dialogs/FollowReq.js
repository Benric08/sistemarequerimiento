import React, { useEffect, useState } from 'react'
import AddFollowReq from '../forms/AddFollowReq'
import {Close as CloseIcon} from '@mui/icons-material'
import { AppBar, Box, Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, ListItemText, Slide, Toolbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addEstadoRequerimiento, getEstadoEntregable } from '../../redux/actions';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const FollowReq = ({open, requerimiento,onClose}) => {
  console.log('veamos que tenemos del req que nos envia reccontainer',requerimiento);
  const obtenerEstado = useSelector((state)=>state.estadoRequerimientoActual);
  console.log('recuperamos algo o no ',obtenerEstado);
  const getEstado = obtenerEstado.find((estado)=>estado.id_requerimiento===requerimiento?.id_requerimiento);
  console.log('recuperamos algo o no ',getEstado);
    
  const disptach = useDispatch();

  const _handleCloseDialogFollowReq  = ()=>{
    if(onClose) onClose()
    
  }

  const _handleClickSave=(estadoRequerimiento)=>{
    console.log('que estado estoy por guardar ',estadoRequerimiento);
    const estadoReq={...estadoRequerimiento,id_requerimiento:requerimiento.id_requerimiento};
    console.log('que estoy uniendo',estadoReq);
    disptach(addEstadoRequerimiento(estadoReq));
    _handleCloseDialogFollowReq();
  }

  /* const handleClickButtoonSave = () => {
    const form = document.querySelector("form");
    console.log('veamos si haceomos referencia al form ',form); // selecciona el formulario
    console.log(form.dispatchEvent(new Event('submit')));// envía el evento submit al formulario
  }; */
  
  useEffect(()=>{
    disptach(getEstadoEntregable());
  },[]);
  return (
    <Dialog
        fullScreen 
        open={open} 
        onClose={_handleCloseDialogFollowReq}
        TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={_handleCloseDialogFollowReq}
                  aria-label="Cerrar"
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  Seguimiento del Requerimiento
                </Typography>
                {/* <Button autoFocus color="inherit" onClick={handleClickButtoonSave} type='submit'>
                  Guardar
                </Button> */}
              </Toolbar>
            </AppBar>
            <DialogContent
            sx={{
                '& .MuiTextField-root': { m: 1 },
                
            }}
            > 
              <DialogTitle >
                
                  <ListItemText 
                    primary={`Requerimiento`}
                    secondary={`${requerimiento?.descripcion}` }
                  />  
                  <Divider sx={{color:'blue'}}/>
              </DialogTitle>
              
              <Box sx={{height:'100%', padding:'0% 2%'}}>
                    <AddFollowReq onHandleSubmit={_handleClickSave} estadoRequerimiento={getEstado}/>
              </Box>              
            </DialogContent>
        </Dialog>
  )
}

export default FollowReq;
