import { Button, List, ListItem, ListItemText } from "@mui/material";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Edit as EditIcon, Close as CloseIcon, PictureAsPdf as PdfIcon } from "@mui/icons-material";

import ConfirmDelete from "../dialogs/ConfirmDelete";
export default function RequerimientoRow(props) {
  const { requerimiento, onEdit, onEditOrden, onAddOrdenServicio, onDelete, onDialogFollowOpen, onShowPDF } = props;
  // uselocator para traer todos las ordens por id y nombre de archivo 
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [enableButtons, setEnableButtons] = useState(false);
  const [hiddenIcon, setHiddenIcon] = useState(false);

  const _handleClickEdit = () => {
    if (onEdit) onEdit(requerimiento);
  };
  const _handleClickDelete = () => {
    setOpenDelete(true)

    /* if (onDelete) onDelete(requerimiento.id_requerimiento) */
  }
  const _handleClickAddOrdenServicio = () => {
    if (onAddOrdenServicio) onAddOrdenServicio(requerimiento);
  }
  const _handleShowPdfUploaded = () => {
    // enviar id de la orden de servicio requerimiento.orden_servicio.id_orden_servicio
    //buscar en el use selector por id y obtener el nombre del archivo
    console.log('veamos que nos trae requerimiento', requerimiento);
    const namefile = requerimiento?.orden_servicio?.file_orden_servicio;
    if (onShowPDF) onShowPDF(namefile);

  }
  const _handleOrdenClickEdit = () => {
    if (onEditOrden) onEditOrden(requerimiento);
  }
  const handleCloseDelete = (res) => {
    console.log('contenido del fomrdelete', res);
    if (res === 'confirmDelete') {
      if (onDelete) onDelete(requerimiento.id_requerimiento)
    }
    setOpenDelete(false);
    console.log('muestrame que valor tiene opendelete', openDelete);

  }
  const handleClickOpenFollowReq = () => {
    if (onDialogFollowOpen) onDialogFollowOpen(true, requerimiento);
  }
  useEffect(() => {
    if (requerimiento?.orden_servicio) {
      setHiddenIcon(true)
      setEnableButtons(true)
    }
    //dispatch para obtener todos los ordenes de servicio por id y nombre de archivo

  }, []);

  return (
    <React.Fragment >
      <ConfirmDelete open={openDelete} onClose={handleCloseDelete} />
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} hover>
        <TableCell>
          {
            hiddenIcon && <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}

            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          }
        </TableCell>
        {
          hiddenIcon ?
            <TableCell component="th" scope="row"  >
              {requerimiento.descripcion}
            </TableCell> :
            <TableCell component="th" scope="row" onClick={handleClickOpenFollowReq} >
              {requerimiento.descripcion}
            </TableCell>
        }
        <TableCell align="right">{requerimiento.detalle}</TableCell>
        <TableCell align="right">{requerimiento.cantidad}</TableCell>
        <TableCell align="right">{requerimiento.precio_unitario}</TableCell>
        <TableCell align="right">{requerimiento.total}</TableCell>
        <TableCell align="right">
          <Button onClick={_handleClickAddOrdenServicio} disabled={enableButtons}>
            OS
          </Button>
        </TableCell>
        <TableCell align="right">
          <IconButton size="small" onClick={_handleClickEdit} disabled={enableButtons}>
            <EditIcon fontSize="small" />
          </IconButton>
        </TableCell>
        <TableCell align="right">
          <IconButton size="small" onClick={_handleClickDelete} disabled={enableButtons}>
            <CloseIcon fontSize="small" />

          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <List>
                <ListItem
                  secondaryAction={
                    <>

                      <IconButton size="small" onClick={_handleOrdenClickEdit}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={_handleShowPdfUploaded}>
                        <PdfIcon fontSize="small" />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText
                    primary={`Detalle Orden Servicio N - ${requerimiento?.orden_servicio?.numero_orden_servicio}`}
                    secondary={`Fecha de Notificación: ${requerimiento?.orden_servicio?.fecha_orden_servicio}`}
                  />
                </ListItem>
              </List>


              <Table size="small" aria-label="purchases">
                <TableHead >
                  <TableRow >
                    <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{`Total (S./)`}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Fecha de Vencimiento</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requerimiento?.orden_servicio?.detalle_orden_servicios.length > 0 && requerimiento?.orden_servicio?.detalle_orden_servicios.map((dos) => (
                    <TableRow key={dos.id_detalle_os} >
                      <TableCell component="th" scope="row">
                        {dos.descripcion}
                      </TableCell>
                      <TableCell>{`S/. ${dos.monto_orden_servicio}`}</TableCell>
                      <TableCell align="right">{dos.fecha_vencimiento}</TableCell>
                      <TableCell align="right">
                        {dos.estado}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}