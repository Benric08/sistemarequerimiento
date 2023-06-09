import { Alert, Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'

const ConfirmEjecucionPresupuestaria = ({ open, idDetalleOS, descripcion, estadoEntregable, onClose }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [showProgres, setShowProgres] = useState(false);

  const handleClose = () => {
    onClose();
  };
  const handleCloseShowProgres=()=>{
    setShowProgres(false)
  } 
  const handleOpenShowProgres=()=>{
    setShowProgres(true)
  } 




  const handleConfirm = async () => {
    console.log('recibiendo el id del slider',estadoEntregable);
    await axios.post(`/orden_servicio/detalle_orden_servicio`, {
      id_detalle_os: idDetalleOS,
      level_ep: estadoEntregable === 8 ? 3 : 4
    });
    handleOpenShowProgres();
    handleClose();
    handleCloseShowProgres();
    setShowAlert(true);


  }
  return (
    <>
      <Snackbar open={showAlert} autoHideDuration={4000} onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {`El ${descripcion} ha sido ${estadoEntregable === 8 ? 'devengado' : 'girado'} satisfactoriamente.`}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Estado de Ejecucion Presupuestaria</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Comfirmar si el ${descripcion} ha sido ${estadoEntregable === 8 ? 'devengado' : 'girado'}.`}
          </DialogContentText>
          {/* agregar fecha */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm}>Si</Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ConfirmEjecucionPresupuestaria
