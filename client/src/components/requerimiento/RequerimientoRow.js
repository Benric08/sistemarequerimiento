import { Button, List, ListItem, ListItemText } from "@mui/material";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Edit as EditIcon, Close as CloseIcon, PictureAsPdf as PdfIcon } from "@mui/icons-material";
import { blueGrey } from "@mui/material/colors";
export default function RequerimientoRow(props) {
    const { requerimiento,onEdit,onEditOrden,onAddOrdenServicio,onDelete} = props;
    
    const [open, setOpen] = useState(false);
    const [enableButtonOS, setEnableButtonOS] = useState(false);
    const [hiddenIcon, setHiddenIcon] = useState(false);
    
    const _handleClickEdit = () => {
        if (onEdit) onEdit(requerimiento);
    };
    const _handleClickDelete = () => {
        if (onDelete) onDelete(requerimiento)
    }
    const _handleClickAddOrdenServicio =()=>{
        if(onAddOrdenServicio) onAddOrdenServicio(requerimiento);
    }
    const _handleShowPdfUploaded=()=>{}
    const _handleOrdenClickEdit=()=>{
        if (onEditOrden) onEditOrden(requerimiento);
    }
    useEffect(()=>{
      if(requerimiento?.orden_servicio){
        setHiddenIcon(true)
        setEnableButtonOS(true)
      }
      
    },[]);

    return (
      <React.Fragment >
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
          <TableCell component="th" scope="row">
            {requerimiento.descripcion}
          </TableCell>
          <TableCell align="right">{requerimiento.detalle}</TableCell>
          <TableCell align="right">{requerimiento.cantidad}</TableCell>
          <TableCell align="right">{requerimiento.precio_unitario}</TableCell>
          <TableCell align="right">{requerimiento.total}</TableCell>
          <TableCell align="right">
            <Button onClick={_handleClickAddOrdenServicio} disabled={enableButtonOS}>
                OS
            </Button>
          </TableCell>
          <TableCell align="right">
            <IconButton size="small" onClick={_handleClickEdit}>
                <EditIcon fontSize="small" />
            </IconButton>
          </TableCell>
          <TableCell align="right">
            <IconButton size="small" onClick={_handleClickDelete}>
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
                      primary={`Detalle Orden Servicio N-${requerimiento?.orden_servicio?.numeroOrdenServicio}`} 
                      secondary={`fecha ${requerimiento?.orden_servicio?.fechaOrdenServicio}`}
                    />
                  </ListItem>
                </List>
                
                
                <Table size="small" aria-label="purchases">
                  <TableHead >
                    <TableRow >
                      <TableCell sx={{ fontWeight: 'bold' }}>Descripcion</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>{`Total (S./)`}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>Fecha de Vencimiento</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {requerimiento?.orden_servicio?.detalle_orden_servicios.length>0&&requerimiento?.orden_servicio?.detalle_orden_servicios.map((dos) => (
                      <TableRow key={dos.idDetalleOrdenServicio}>
                        <TableCell component="th" scope="row">
                          {dos.descripcion}
                        </TableCell>
                        <TableCell>{`S/. ${dos.montoOrdenServicio}`}</TableCell>
                        <TableCell align="right">{dos.fechaVencimiento}</TableCell>
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