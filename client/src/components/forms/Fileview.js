import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from 'react-pdf';

import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default function Fileview() {
    const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setOpen(true);
  };
  const onNextPage = ()=>{
    setPageNumber(pageNumber+1)
}
const onBackPage = ()=>{
    setPageNumber(pageNumber-1)
    
  }
  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <div>
      <h2>Previsualización del archivo PDF:</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Previsualización del archivo PDF:</DialogTitle>
        <DialogContent>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            
              <Page  pageNumber={pageNumber}/>

          </Document>
          <div>
        <p>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </p>
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={onBackPage}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={onNextPage}
        >
          Next
        </button>
      </div>
        </DialogContent>
        <Button onClick={handleClose}>Confirmar</Button>
        <Button onClick={handleFileChange}>Corregir</Button>

      </Dialog>
    </div>
  );
}
