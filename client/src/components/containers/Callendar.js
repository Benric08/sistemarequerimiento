import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Box, Chip, Typography } from '@mui/material'
import esLocale from '@fullcalendar/core/locales/es';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

/* const events = [
  { title: 'Meeting', start: new Date() },
  { title: 'recording', start: new Date("2023-06-24") }
] */
function RenderEventContent(eventInfo) {
    
    
    return (
      <Chip color='primary' label={`${eventInfo.timeText} ${eventInfo.event.title}`}>
        
      </Chip>
      
    )
}


export function Callendar() {
    const [proveedores,setProveedores] = useState(null);
    const getProveedores = async () => { 
        const response= await axios.get(`proveedor/detalle_entregable`);
        setProveedores(response.data);
    }
   console.log(proveedores);
   const events=proveedores?.map((pro)=>{return {
        title: pro.nombre_completo,
        start: pro.fecha_vencimiento
    }})

    useEffect(()=>{
        getProveedores();
        

    },[])  
  return (
    <div>
        <Typography variant="h4" component="h2">
         Agenda de Entregables
        </Typography>
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            weekends={true}
            events={events}
            eventContent={RenderEventContent}
            locale={esLocale}
        />
    </div>
  )
}