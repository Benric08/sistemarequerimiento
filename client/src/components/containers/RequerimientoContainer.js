import React from 'react';
import { Add as AddIcon } from "@mui/icons-material";
import { Box, List, Button, Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import AddRequerimiento from '../forms/AddRequerimiento';
import Requerimiento from '../requerimiento/Requerimiento';
import { useSelector,useDispatch } from 'react-redux';
import { useState } from 'react';
import {addReq} from '../../redux/actions';
 const RequerimientoContainer = () => {
    const requerimientos = useSelector((state)=>state.allRequerimientos);
    const dispatch=useDispatch();
    console.log('aqui traigo datos del estado global',requerimientos);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [requerimientoSelected, setRequerimientoSelected] = useState();
  
    const _handleCloseDialog = () => {
      setIsOpenDialog(false);
      setRequerimientoSelected(null);
    };
    const _handleClickOpenDialog = () => setIsOpenDialog(true);
  
    const _handleCreateRequerimiento = (newRequerimiento) => {
      console.log('vemos que hay en nuevo requerimiento', newRequerimiento);
      console.log(dispatch(addReq(newRequerimiento)));
    };
  
    const _handleUpdateRequerimiento = (inputRequerimiento) => {
      console.log('actualizando el componente',inputRequerimiento);
    };
  
    const _handleClickDeleted = (requerimientoId) => {
      
    };
  
    const _handleClickEditRequerimientoElement = (requerimiento) => {
      setRequerimientoSelected(requerimiento);
      setIsOpenDialog(true);
    };
  
    const _handleClickNextStatus = (taskId) => {
      
    };

  return (
    <div>

      <Box display="flex" justifyContent="flex-end">
        <Button onClick={_handleClickOpenDialog} startIcon={<AddIcon />}>
          Agregar
        </Button>
      </Box>
      <List>
        {requerimientos.map((requerimiento) => (
          <Requerimiento
            key={requerimiento.idRequerimiento}
            requerimiento={requerimiento}
            onClickStatus={_handleClickNextStatus}
            onDelete={_handleClickDeleted}
            onEdit={_handleClickEditRequerimientoElement}
          />
        ))}
      </List>

      <Dialog open={isOpenDialog} onClose={_handleCloseDialog}>
        <DialogContent
           sx={{
            '& .MuiTextField-root': { m: 1 },
          }}
        > 
          <DialogTitle>Registrar Requerimiento</DialogTitle>
          <DialogContentText>

          </DialogContentText>
          <AddRequerimiento
            requerimiento={requerimientoSelected}
            onCreate={_handleCreateRequerimiento}
            onUpdate={_handleUpdateRequerimiento}
            onClose={_handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    
    </div>
  )
}

export default RequerimientoContainer;