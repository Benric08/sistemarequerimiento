import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

const EnvioExitoso = ({open,onClose}) => {
  
    const handleClose=()=>{
        onClose();
    }
    return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Los datos se guardaron satisfactoriamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default EnvioExitoso
