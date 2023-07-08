import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Box, Chip} from '@mui/material'
import esLocale from '@fullcalendar/core/locales/es';

import { useEffect, useState } from 'react';
import axios from 'axios';

function RenderEventContent(eventInfo) {
  return (
    <Chip color='primary' label={`${eventInfo.timeText} ${eventInfo.event.title}`}>

    </Chip>
  )
}
export function Callendar() {
  const [proveedores, setProveedores] = useState(null);
  const getProveedores = async () => {
    const response = await axios.get(`proveedor/detalle_entregable`);
    setProveedores(response.data);
  }
  console.log(proveedores);
  const events = proveedores?.map((pro) => {
    return {
      title: pro.nombre_completo,
      start: pro.fecha_vencimiento
    }
  })

  useEffect(() => {
    getProveedores();


  }, [])
  return (
    <Box sx={{ width: '100%' }}>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={true}
        events={events}
        eventContent={RenderEventContent}
        locale={esLocale}
      />
    </Box >
  )
}