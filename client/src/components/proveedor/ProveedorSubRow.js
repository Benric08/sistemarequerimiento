import { AppBar, Button,Dialog, DialogContent,
   DialogTitle, Divider, IconButton, List, ListItemText, Slide, 
   TableCell, TableRow, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import DetalleOrdenServicio from '../containers/DetalleOrdenServicio';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProveedorSubRow({ordenServicio,proveedorNombreCompleto}) {
  const [isOpenDialogDetalleOrden,setIsOpenDialogDetalleOrden] = useState(false)
  const [ordenServicioSelected,setOrdenServicioSelected] = useState();
  const _handleCloseDialogDetalleOrden=()=>{
    setIsOpenDialogDetalleOrden(false)
  }
  const _handleRowOrdenServicio=() => { 
    setOrdenServicioSelected(ordenServicio);
    setIsOpenDialogDetalleOrden(true);
    console.log('que orden de servicio envio',ordenServicioSelected);
  }

  const _handleClickSave=()=>{

  }

  
  return (
    <>
      <TableRow onClick={_handleRowOrdenServicio} hover >
        <TableCell component="th" scope="row">
          {ordenServicio.numeroOrdenServicio}
        </TableCell>
        <TableCell align="right">{`${ordenServicio.numeroCertificacion}`}</TableCell>
        <TableCell align="right">{ordenServicio.expedienteSiaf}</TableCell>
        <TableCell align="right">
          {ordenServicio.fechaOrdenServicio}
        </TableCell>
      </TableRow>
      <Dialog 
        fullScreen 
        open={isOpenDialogDetalleOrden} 
        onClose={_handleCloseDialogDetalleOrden}
        TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={_handleCloseDialogDetalleOrden}
                  aria-label="Cerrar"
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  Detalle Orden De Servicio
                </Typography>
                <Button autoFocus color="inherit" onClick={_handleClickSave}>
                  Guardar
                </Button>
              </Toolbar>
            </AppBar>
            <DialogContent
            sx={{
                '& .MuiTextField-root': { m: 1 },
                width:'100%'
            }}
            > 
            <DialogTitle >
              
                <ListItemText 
                  primary={`Orden de Servicio N°- ${ordenServicioSelected?.numeroOrdenServicio}`}
                  secondary={`Proveedor: ${proveedorNombreCompleto}` }
                />  
                <Divider sx={{color:'blue'}}/>
            </DialogTitle>
            
            <DetalleOrdenServicio
                  
                  ordenServicio={ordenServicioSelected}
                  
              />
              
            </DialogContent>
        </Dialog>
      </>
      
  )
}
