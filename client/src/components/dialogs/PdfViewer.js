import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react'
//import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
////import { pdfjs } from 'react-pdf';
//const baseUrl='http://localhost:3001/';
const baseUrl='https://sistemarequerimiento-production.up.railway.app/';
//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const PdfViewer = ({openDialog,onClose,namefile}) => {
   
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }
    
    const onNextPage = ()=>{
      setPageNumber(pageNumber+1)
  }
  const onBackPage = ()=>{
      setPageNumber(pageNumber-1)
      
    }
    const handleClose = () => {
      if (onClose) onClose()
    };

    return (
        <Dialog open={openDialog} onClose={handleClose} fullScreen>
            <DialogTitle>Previsualización del archivo PDF:</DialogTitle>
            <DialogContent>
                {/* <Document file={`${baseUrl}${namefile}`} onLoadSuccess={onDocumentLoadSuccess} externalLinkTarget='_blank'>

                    <Page pageNumber={pageNumber} scale={0.35}/>

                </Document>
                <div>
                    <p>
                        Pag. {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                    </p>
                    <Button
                        type="button"
                        disabled={pageNumber <= 1}
                        onClick={onBackPage}
                    >
                        Previous
                    </Button>
                    <Button
                        type="button"
                        disabled={pageNumber >= numPages}
                        onClick={onNextPage}
                    >
                        Next
                    </Button>
                </div> */}
                <object data={`${baseUrl}${namefile}`} type="application/pdf" width="100%" height="100%"></object>
            </DialogContent>
            <Button onClick={handleClose}>Cerrar</Button>
            

        </Dialog>
    )
}

export default PdfViewer
