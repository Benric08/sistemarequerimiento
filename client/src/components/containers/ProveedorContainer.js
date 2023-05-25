import React, { useEffect, useState } from 'react'

import TableContainer from '@mui/material/TableContainer';
import {  Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

import Paper from '@mui/material/Paper';
import { useSelector , useDispatch} from 'react-redux';
import {  getAllProveedoresOrdenS } from '../../redux/actionsProveedor';
import ProveedorRow from '../proveedor/ProveedorRow';

export default  function ProveedorContainer() {
    const proveedores = useSelector((state)=>state.allProveedoresOrdenServicio);
    const dispatch=useDispatch();
    console.log('vemos el contenido de proveedores', proveedores);
    console.log('vemos el contenido de proveedoresos', proveedores?.orden_servicios);
    console.log('vemos el contenido de proveedoresdos', proveedores?.orden_servicios?.detalle_orden_servicio);
    useEffect( ()=>{
      dispatch(getAllProveedoresOrdenS());
    },[])

    return (
        <>
        
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Proveedor</TableCell>
                <TableCell align="right">DNI</TableCell>
                <TableCell align="right">Celular</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                { proveedores.length>0 && proveedores.map((proveedor) => (
                    <ProveedorRow
                        key={proveedor.idProveedor}
                        proveedor={proveedor}
                    />
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        
        
        </>
      );
}
