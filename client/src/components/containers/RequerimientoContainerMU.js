import React, { useEffect, useMemo, useState } from 'react'
import RequerimientoRow from '../requerimiento/RequerimientoRow';
import AddRequerimiento from '../forms/AddRequerimiento';
import TableContainer from '@mui/material/TableContainer';
import { Alert, Box, Button, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, Snackbar, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import Paper from '@mui/material/Paper';
import { useSelector , useDispatch} from 'react-redux';
import {addReq, updateReq,deleteReque} from '../../redux/actions';
import AddOrdenServicio from '../forms/AddOrdenServicio';
import { addOrdenServicio } from '../../redux/actionsOrdenServicio';
import { getAllRequirementsDetalle} from '../../redux/actionsRequerimientoDetalleOrden';
import { getAllProveedores } from '../../redux/actionsProveedor';
import FollowReq from '../dialogs/FollowReq';
import axios from 'axios';
import PdfViewer from '../dialogs/PdfViewer';
export default  function RequerimientoContainerMU() {
    //const requerimientos = useSelector((state)=>state.allRequerimientos);
    
    const dispatch=useDispatch();
    const requerimientos = useSelector((state)=>state.allRequerimientosDetalle);
    const [nameFile,setNameFile] = useState('');
    const [isOpenDialogFollowReq,setIsOpenDialogFollowReq] = useState(false);
    const [isOpenDialogPdfViewer,setIsOpenDialogPdfViewer] = useState(false);
    const [isLoading,setIsLoading] = useState(true);
    const [isSubmited,setIsSubmited] = useState(false);
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
      console.log('despachando la accion para crear',dispatch(addReq(newRequerimiento)));
      setIsLoading(true);
      setIsSubmited(true);
    };
  
    const _handleUpdateRequerimiento = (inputRequerimiento,id_requerimiento) => {
      console.log('actualizando el requerimiento',inputRequerimiento);
      console.log('con id ',id_requerimiento);
      dispatch(updateReq(inputRequerimiento, id_requerimiento));
      setIsLoading(true);
      setIsSubmited(true);
    };
  
    const _handleCreateOrden=(newOrdenServicio)=>{
      console.log(dispatch(addOrdenServicio(newOrdenServicio)));
      setIsLoading(true);
      setIsSubmited(true);
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
    const _handleClickDeleteRequerimientoElement = (id_requerimiento) => {
      console.log('boton delete en mu',id_requerimiento);
      dispatch(deleteReque(id_requerimiento));
      setIsLoading(true);
      setIsSubmited(true);
    };
    const _handleCloseDialogFollowReq = () =>{
      setIsOpenDialogFollowReq(false)
    }
    const _handleCloseDialogPdfViewer = () =>{
      setIsOpenDialogPdfViewer(false)
    }
    const _handleOpenDialogFollowReq = (estado,requerimiento) =>{
      setIsOpenDialogFollowReq(estado)
      setRequerimientoSelected(requerimiento)
    }

    const _handleShowPDF= (namefile)=>{
      console.log('nombre del archivo',namefile);
      
      setNameFile(`ordenservicio/pdf/${namefile}`);
      setIsOpenDialogPdfViewer(true);
      
    }


    useEffect( ()=>{
      dispatch(getAllRequirementsDetalle());
      setIsLoading(false);
      
      console.log('me monte');
    },[isLoading])

    return (
        <div>
          <Snackbar open={isSubmited} autoHideDuration={4000} onClose={()=>setIsSubmited(false)}
                    anchorOrigin={{vertical:'top',horizontal:'center'}}>
              <Alert severity="success" sx={{ width: '100%' }}>
                {`El requerimiento se guardo correctamente.`}
              </Alert>
          </Snackbar>
          {isLoading && <Box sx={{ display: 'flex' /* , position:'absolute',top:'50%' */}}>
                          <CircularProgress />
                        </Box>}
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
                          key={requerimiento?.id_requerimiento}
                          requerimiento={requerimiento}
                          onAddOrdenServicio={_handleClickAddOrdenServicio}
                          onEdit={_handleClickEditRequerimientoElement}
                          onEditOrden={_handleClickEditOrdenServicioElement}
                          onDelete={_handleClickDeleteRequerimientoElement}
                          onDialogFollowClose={_handleCloseDialogFollowReq}
                          onDialogFollowOpen={_handleOpenDialogFollowReq}
                          onShowPDF={_handleShowPDF}
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
                  proveedor={requerimientoSelected?.orden_servicio?.id_proveedor}
                  onCreate={_handleCreateOrden}
                  onUpdate={_handleUpdateOrden}
                  onClose={_handleCloseDialogAddOrden}
              />
              </DialogContent>
          </Dialog>
          <FollowReq open={isOpenDialogFollowReq} onClose={_handleCloseDialogFollowReq} requerimiento={requerimientoSelected}/>
          <PdfViewer openDialog={isOpenDialogPdfViewer} onClose={_handleCloseDialogPdfViewer} namefile={nameFile}/>
        </div>
      );
}
