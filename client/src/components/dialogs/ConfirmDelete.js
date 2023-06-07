import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

const ConfirmDelete = ({open,onClose}) => {
    

    const handleClose = (event) => {
        console.log('veamos lo que devuelve open',open);
        onClose(event.target.name)
    };
    const handleConfirm = (event) => {
        onClose(event.target.name)
    };
  return (
   
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmar"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta Seguro de Eliminar el Requerimiento
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} name='noDelete'>No</Button>
          <Button onClick={handleConfirm} name ='confirmDelete' autoFocus>
            Si
          </Button>
        </DialogActions>
      </Dialog>
    
  )
}

export default ConfirmDelete
