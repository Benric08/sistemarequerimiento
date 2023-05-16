import React from 'react';
import { Add as AddIcon } from "@mui/icons-material";
import { Box, List, Button, Dialog } from "@mui/material";
import AddRequerimiento from '../forms/AddRequerimiento';
import Requerimiento from '../requerimiento/Requerimiento';
import { useSelector } from 'react-redux';
import { useState } from 'react';
 const RequerimientoContainer = () => {
    const requerimientos = useSelector((state)=>state.allRequerimientos);
    console.log('aqui traigo datos del estado global',requerimientos);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [requerimientoSelected, setRequerimientoSelected] = useState();
  
    const _handleCloseDialog = () => {
      setIsOpenDialog(false);
      setRequerimientoSelected(null);
    };
    const _handleClickOpenDialog = () => setIsOpenDialog(true);
  
    const _handleCreateRequerimiento = (newTask) => {
      
    };
  
    const _handleUpdateRequerimiento = (inputTask) => {
      
    };
  
    const _handleClickDeleted = (taskId) => {
      
    };
  
    const _handleClickEditRequerimientoElement = (task) => {
      setRequerimientoSelected(task);
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
        <AddRequerimiento
          requerimiento={requerimientoSelected}
          onCreate={_handleCreateRequerimiento}
          onUpdate={_handleUpdateRequerimiento}
          onClose={_handleCloseDialog}
        />
      </Dialog>
    
    </div>
  )
}

export default RequerimientoContainer;