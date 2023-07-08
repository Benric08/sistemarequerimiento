import IconButton from '@mui/material/IconButton';
import React, { useEffect } from "react";
import { PictureAsPdf as PdfIcon } from '@mui/icons-material';
import PdfSubRow from './PdfSubRow';
import { Grid, Typography } from '@mui/material';

export default function RowPdf({ pdfContent, openDialog, getFileName }) {

    const handleShowPdfOS = () => {
        getFileName(`ordenservicio/pdf/${pdfContent.file_orden_servicio}`);
        openDialog();
    }

    useEffect(() => {


    }, []);

    return (
        <Grid item xs={12} sx={{ border: '1px solid #42a5f5', marginBottom: '1%' }}  >
            <Grid container sx={{ backgroundColor: '#42a5f5' }}>
                <Grid item xs={1} sx={{ fontWeight: 'bold', color: 'white', padding: '1%', borderRight: '1px solid #e0e0e0' }}><Typography>Orden Servicio</Typography> </Grid>
                <Grid item xs={3} sx={{ fontWeight: 'bold', color: 'white', padding: '1%', borderRight: '1px solid #e0e0e0' }}><Typography>Proveedor</Typography></Grid>
                <Grid item xs={7} sx={{ fontWeight: 'bold', color: 'white', padding: '1%', borderRight: '1px solid #e0e0e0' }}><Typography>Requerimiento</Typography></Grid>
                <Grid item xs={1} sx={{ fontWeight: 'bold', color: 'white', padding: '1%', }}><Typography>Archivo</Typography> </Grid>
            </Grid>
            <Grid container sx={{ '& > *': { borderBottom: 'unset' }, borderBottom: '1px solid #e0e0e0' }}>
                <Grid item xs={1} sx={{ padding: '1%', borderRight: '1px solid #e0e0e0' }}><Typography>{pdfContent.numero_orden_servicio}</Typography></Grid>
                <Grid item xs={3} sx={{ padding: '1%', borderRight: '1px solid #e0e0e0' }}><Typography>{pdfContent.nombre_completo}</Typography></Grid>
                <Grid item xs={7} sx={{ padding: '1%', borderRight: '1px solid #e0e0e0' }}>
                    <Typography >{pdfContent.descripcion}</Typography>
                </Grid>
                <Grid item xs={1} align='center' sx={{ padding: '1%' }}>
                    {!!pdfContent.file_orden_servicio &&
                        <IconButton size="medium" onClick={handleShowPdfOS}>
                            <PdfIcon fontSize="medium" sx={{ color: 'green' }} />
                        </IconButton>}
                </Grid>
            </Grid>
            <Grid container>

                {/* <Table size="small" aria-label="purchases">
                    <TableHead > */}
                <Grid container sx={{alignItems:'center'}} >
                    <Grid item xs={4} ><Typography align="center" sx={{ fontWeight: 'bold' }}>Entregable</Typography></Grid>
                    <Grid item xs={2} ><Typography align="center" sx={{ fontWeight: 'bold' }}>Informe</Typography></Grid>
                    <Grid item xs={2} ><Typography align="center" sx={{ fontWeight: 'bold' }}>Conformidad</Typography></Grid>
                    <Grid item xs={2} ><Typography align="center" sx={{ fontWeight: 'bold' }}>Recibo Honorarios</Typography></Grid>
                    <Grid item xs={2} ><Typography align="center" sx={{ fontWeight: 'bold' }}>Comprobante de Pago</Typography></Grid>
                </Grid >
                {/* </TableHead>
                    <TableBody> */}
                <Grid container>
                    {
                        pdfContent?.detalle_orden_servicio?.map((docs, index) => {
                            return <PdfSubRow
                                key={index}
                                docs={docs}
                                getFileName={getFileName}
                                openDialog={openDialog}
                            />
                        })
                    }
                </Grid>
                {/* </TableBody>
                </Table> */}

            </Grid>

        </Grid>
    );
}
