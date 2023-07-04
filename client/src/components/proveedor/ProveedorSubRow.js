import { AppBar, Box, Button,Dialog, DialogContent,
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

  

  
  return (
    <>
      <TableRow onClick={_handleRowOrdenServicio} hover >
        <TableCell component="th" scope="row">
          {ordenServicio.numero_orden_servicio}
        </TableCell>
        <TableCell align="right">{`${ordenServicio.numero_certificacion}`}</TableCell>
        <TableCell align="right">{ordenServicio.expediente_siaf}</TableCell>
        <TableCell align="right">
          {ordenServicio.fecha_orden_servicio}
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
                
              </Toolbar>
            </AppBar>
            <DialogContent
            sx={{
                '& .MuiTextField-root': { m: 1 }
            }}
            > 
              <DialogTitle >
                
                  <ListItemText 
                    primary={`Orden de Servicio N°- ${ordenServicioSelected?.numero_orden_servicio}`}
                    secondary={`Proveedor: ${proveedorNombreCompleto}` }
                  />  
                  <Divider sx={{color:'blue'}}/>
              </DialogTitle>
              
              <Box sx={{height:'100%', padding:'0% 2%'}}>
                <DetalleOrdenServicio
                      
                      ordenServicio={ordenServicioSelected}
                      
                />
              </Box>              
            </DialogContent>
        </Dialog>
      </>
      
  )
}
