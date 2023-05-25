
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
import ProveedorSubRow from './ProveedorSubRow';

export default function ProveedorRow(props) {
    const { proveedor} = props;
    console.log('vemos lo que tiene el proveedor del hijo row',proveedor);
    const [open, setOpen] = useState(false);
    const [hiddenIcon, setHiddenIcon] = useState(false);
    
    
    useEffect(()=>{
      if(proveedor?.orden_servicios){
        setHiddenIcon(true)
      }
      
    },[]);

    return (
      <React.Fragment >
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            {
               <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() => setOpen(!open)}
                              
                            >
                              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
            }
          </TableCell>
          <TableCell component="th" scope="row">
            {proveedor.nombreCompleto}
          </TableCell>
          <TableCell align="right">{proveedor.dni}</TableCell>
          <TableCell align="right">{proveedor.celular}</TableCell>
          
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                
                
                
                <Table size="small" aria-label="purchases">
                  <TableHead >
                    <TableRow >
                      <TableCell sx={{ fontWeight: 'bold' }}>Orden Servicio</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>Certificacion</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>Expediente Siaf</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>Fecha de Orden</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      proveedor?.orden_servicios?.map((detalleOS)=>{
                        return <ProveedorSubRow 
                                      key={detalleOS.idOrdenServicio} 
                                      ordenServicio={detalleOS}
                                />
                      })
                    }
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
