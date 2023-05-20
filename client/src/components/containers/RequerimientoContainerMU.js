import React, { useState } from 'react'
import RequerimientoRow from '../requerimiento/RequerimientoRow';
import AddRequerimiento from '../forms/AddRequerimiento';
import TableContainer from '@mui/material/TableContainer';
import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import Paper from '@mui/material/Paper';
import { useSelector , useDispatch} from 'react-redux';
import {addReq, getAllRequirements, updateReq} from '../../redux/actions';

export default function RequerimientoContainerMU() {
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
      console.log('actualizando el requerimiento',inputRequerimiento);
      console.log(dispatch(updateReq(inputRequerimiento)));
    };
  
    
  
    const _handleClickEditRequerimientoElement = (requerimiento) => {
      console.log('boton edit',requerimiento);
      setRequerimientoSelected(requerimiento);
      setIsOpenDialog(true);
    };
  
    const _handleClickAddOrdenServicio = () => {
        
    };
    return (
        <>
        <Box display="flex" justifyContent="flex-end">
            <Button onClick={_handleClickOpenDialog} startIcon={<AddIcon />}>
            Agregar
            </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Descripcion</TableCell>
                <TableCell align="right">Detalle</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Precio Unitario</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                { requerimientos.length > 0 && requerimientos.map((requerimiento) => (
                    <RequerimientoRow
                        key={requerimiento.idRequerimiento}
                        requerimiento={requerimiento}
                        onAddOrdenServicio={_handleClickAddOrdenServicio}
                        onEdit={_handleClickEditRequerimientoElement}
                    />
                ))}
            </TableBody>
          </Table>
        </TableContainer>

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
        </>
      );
}
