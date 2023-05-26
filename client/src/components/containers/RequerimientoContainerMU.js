import React, { useEffect, useState } from 'react'
import RequerimientoRow from '../requerimiento/RequerimientoRow';
import AddRequerimiento from '../forms/AddRequerimiento';
import TableContainer from '@mui/material/TableContainer';
import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import Paper from '@mui/material/Paper';
import { useSelector , useDispatch} from 'react-redux';
import {addReq, getAllRequirements, updateReq} from '../../redux/actions';
import AddOrdenServicio from '../forms/AddOrdenServicio';
import { addOrdenServicio } from '../../redux/actionsOrdenServicio';
import { getAllRequirementsDetalle} from '../../redux/actionsRequerimientoDetalleOrden';
import { getAllProveedores } from '../../redux/actionsProveedor';

export default  function RequerimientoContainerMU() {
    //const requerimientos = useSelector((state)=>state.allRequerimientos);
    const requerimientos = useSelector((state)=>state.allRequerimientosDetalle);
    
    
    
    const dispatch=useDispatch();
    console.log('soy el papa de todos traigo todos los reque',requerimientos);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [requerimientoSelected, setRequerimientoSelected] = useState();
    const [isOpenDialogAddOrdenServicio, setIsOpenDialogAddOrdenServicio] = useState(false);
    
    const _handleCloseDialog = () => {
      setIsOpenDialog(false);
      setRequerimientoSelected(null);
    };
    const _handleCloseDialogAddOrden=()=>{
      setIsOpenDialogAddOrdenServicio(false);
      setRequerimientoSelected(null)
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
  
    const _handleCreateOrden=(newOrdenServicio)=>{
      console.log(dispatch(addOrdenServicio(newOrdenServicio)));
    }
    const _handleUpdateOrden=(inputOrdenServicio)=>{
      
    }
    const _handleClickEditRequerimientoElement = (requerimiento) => {
      console.log('boton edit',requerimiento);
      setRequerimientoSelected(requerimiento);
      setIsOpenDialog(true);
    };
    const _handleClickEditOrdenServicioElement = (requerimiento) => {
      console.log('boton edit orden servicio',requerimiento);
      setRequerimientoSelected(requerimiento);
      setIsOpenDialogAddOrdenServicio(true);
      
    };
  
    const _handleClickAddOrdenServicio = (requerimiento) => {
      console.log('boton OS',requerimiento);
      setRequerimientoSelected(requerimiento);
      setIsOpenDialogAddOrdenServicio(true);
    };

    useEffect( ()=>{
      dispatch(getAllRequirementsDetalle());
    },[])

    return (
        <div>
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
                  { requerimientos.length>0 && requerimientos.map((requerimiento) => (
                      <RequerimientoRow
                          key={requerimiento.idRequerimiento}
                          requerimiento={requerimiento}
                          onAddOrdenServicio={_handleClickAddOrdenServicio}
                          onEdit={_handleClickEditRequerimientoElement}
                          onEditOrden={_handleClickEditOrdenServicioElement}
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
          <Dialog open={isOpenDialogAddOrdenServicio} onClose={_handleCloseDialogAddOrden}>
              <DialogContent
              sx={{
                  '& .MuiTextField-root': { m: 1 },
              }}
              > 
              <DialogTitle>Registrar Orden de Servicio</DialogTitle>
              <DialogContentText>

              </DialogContentText>
              <AddOrdenServicio
                  requerimiento={requerimientoSelected}
                  ordenServicio={requerimientoSelected?.orden_servicio}
                  proveedor={requerimientoSelected?.orden_servicio?.idProveedor}
                  onCreate={_handleCreateOrden}
                  onUpdate={_handleUpdateOrden}
                  onClose={_handleCloseDialogAddOrden}
              />
              </DialogContent>
          </Dialog>
        </div>
      );
}
