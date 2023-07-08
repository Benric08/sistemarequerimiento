import {
    Grid,
    IconButton,
     Typography
} from '@mui/material'
import React from 'react'
import { PictureAsPdf as PdfIcon } from '@mui/icons-material';


export default function PdfSubRow({ docs, openDialog, getFileName }) {
    
   
    const handleShowPdfE = () => {
        getFileName(`entregables/pdf/${docs?.entregable?.file_entregable}`);
        openDialog();
    }
    const handleShowPdfIC = () => {
        getFileName(`entregabledocs/pdf/${docs?.entregable?.detalle_entregable?.file_conformidad}`);
        openDialog();
    }
    const handleShowPdfRHE = () => {
        getFileName(`entregabledocs/pdf/${docs?.entregable?.detalle_entregable?.file_recibo}`);
        openDialog();
    }
    const handleShowPdfCP = () => {
        getFileName(`entregabledocs/pdf/${docs?.entregable?.detalle_entregable?.file_comprobante}`);
        openDialog();
    }

   

    return (
        <>
            <Grid container  sx={{borderTop:'1px solid #e0e0e0',}} >
                <Grid item xs={4} sx={{padding: '0.5%'}}>
                    <Typography>{docs?.descripcion}</Typography>
                </Grid>
                <Grid item xs={2} align='center' >
                    {!!docs?.entregable?.file_entregable &&
                        <IconButton size="medium" onClick={handleShowPdfE}>
                            <PdfIcon fontSize="medium" sx={{color:'red'}} />
                        </IconButton>}
                </Grid>
                <Grid item xs={2} align='center' >
                    {!!docs?.entregable?.detalle_entregable?.file_conformidad &&
                        <IconButton size="medium" onClick={handleShowPdfIC}>
                            <PdfIcon fontSize="medium" sx={{color:'blueviolet'}} />
                        </IconButton>}
                </Grid>
                <Grid item xs={2} align='center' >
                    {!!docs?.entregable?.detalle_entregable?.file_recibo &&
                        <IconButton size="medium" onClick={handleShowPdfRHE}>
                            <PdfIcon fontSize="medium" sx={{color:'blueviolet'}} />
                        </IconButton>}
                </Grid>
                <Grid item xs={2} align='center' >
                    {!!docs?.entregable?.detalle_entregable?.file_comprobante &&
                        <IconButton size="medium" onClick={handleShowPdfCP}>
                            <PdfIcon fontSize="medium" sx={{color:'blueviolet'}} />
                        </IconButton>}
                </Grid>
            </Grid>
             
        </>

    )
}
