import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Edit as EditIcon, Close as CloseIcon } from "@mui/icons-material";
export default function RequerimientoRow(props) {
    const { requerimiento,onEdit,onAddOrdenServicio } = props;
    const [open, setOpen] = React.useState(false);
    const _handleClickEdit = () => {
        if (onEdit) onEdit(requerimiento);
    };
    const _handleClickAddOrdenServicio =()=>{
        if(onAddOrdenServicio) onAddOrdenServicio(requerimiento.idRequerimiento);
    }
    return (
      <React.Fragment >
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {requerimiento.descripcion}
          </TableCell>
          <TableCell align="right">{requerimiento.detalle}</TableCell>
          <TableCell align="right">{requerimiento.cantidad}</TableCell>
          <TableCell align="right">{requerimiento.precio_unitario}</TableCell>
          <TableCell align="right">{requerimiento.total}</TableCell>
          <TableCell align="right">
            <Button onClick={_handleClickAddOrdenServicio}>
                OS
            </Button>
          </TableCell>
          <TableCell align="right">
            <IconButton size="small" onClick={_handleClickEdit}>
                <EditIcon fontSize="small" />
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Detalle Orden Servicio
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Fecha vencimiento</TableCell>
                      <TableCell>Entregable</TableCell>
                      <TableCell align="right">Total</TableCell>
                      <TableCell align="right">Estado</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {requerimiento.detalleOrdenServicio>0&&requerimiento.detalleOrdenServicio.map((dos) => (
                      <TableRow key={dos.idDetalleOrdenServicio}>
                        <TableCell component="th" scope="row">
                          {dos.fecha_vencimiento}
                        </TableCell>
                        <TableCell>{dos.descripcion}</TableCell>
                        <TableCell align="right">{dos.total}</TableCell>
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