import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Backdrop, CircularProgress, Grid, Typography } from "@mui/material";
import RowPdf from '../pdf/RowPdf';
import PdfViewer from '../dialogs/PdfViewer';
import SearchInput from '../forms/SearchInput';
export default function PdfContainer() {
    const [requerimientoFiles, setRequerimientoFiles] = useState([]);
    const [requerimientoFilesAll, setRequerimientoFilesAll] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [isOpenDialogPdfViewer, setIsOpenDialogPdfViewer] = useState(false);
    const [nameFile, setNameFile] = useState("");
    const getFiles = async () => {
        setLoadingData(true);
        try {
            const { data } = await axios('/orden_servicio/documentospdf')
            setRequerimientoFiles(data[0]);
            setRequerimientoFilesAll(data[0]);
        } catch (error) {
            alert(error.message);
        }
        setLoadingData(false);
    }
    const handleOpen = () => {
        setIsOpenDialogPdfViewer(true)
    }
    const handleCLose = () => {
        setIsOpenDialogPdfViewer(false)
    }
    const getFileName = (newname) => {
        setNameFile(newname);
    }

    const handleSearchProveedor = (searchQuery) => {
        setLoading(true);
        const result = requerimientoFilesAll.filter((name) => {
            const itemName = name.nombre_completo.toLowerCase();
            const searchValue = searchQuery.toLowerCase();
            return itemName.includes(searchValue);
        })
        setRequerimientoFiles(result);
        setLoading(false);
    }

    useEffect(() => {
        getFiles();

    }, [])

    return (
        <>
            <Grid container sx={{ justifyContent: 'flex-end', marginBottom: '2%', alignItems: 'center' }}>
                <Grid item xs={2}>
                    {loading && <CircularProgress color="inherit" size={20} />}

                </Grid>
                <Grid item xs={3}>
                    <SearchInput onSearch={handleSearchProveedor} />
                </Grid>
            </Grid>
            <Grid container sx={{ justifyContent: 'center', alignItems: 'center' }} >
                {
                    <Backdrop
                        sx={{ color: '#FAFAFA', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loadingData}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                }
                {requerimientoFiles.length > 0 && requerimientoFiles.map((req, index) => (
                    <RowPdf key={index} pdfContent={req} openDialog={handleOpen} getFileName={getFileName} />
                ))}
                {requerimientoFiles.length === 0 && <Typography align='center'>No hay Proveedores</Typography>}
            </Grid>
            <PdfViewer openDialog={isOpenDialogPdfViewer} namefile={nameFile} onClose={handleCLose} />
        </>
    );
}
