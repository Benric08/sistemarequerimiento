import { TableCell, TableRow } from '@mui/material'
import React from 'react'

export default function ProveedorSubRow({ordenServicio}) {
  return (
    <TableRow key={ordenServicio.idOrdenServicio}>
        <TableCell component="th" scope="row">
          {ordenServicio.numeroOrdenServicio}
        </TableCell>
        <TableCell align="right">{`${ordenServicio.numeroCertificacion}`}</TableCell>
        <TableCell align="right">{ordenServicio.expedienteSiaf}</TableCell>
        <TableCell align="right">
          {ordenServicio.fechaOrdenServicio}
        </TableCell>
      </TableRow>
  )
}
