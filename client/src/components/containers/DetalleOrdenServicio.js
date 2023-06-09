import { Box, List, ListItem, ListItemText, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import AddEntregable from '../forms/AddEntregable'
import { getEstadoEntregable } from '../../redux/acionsEntregable';
import { useDispatch, useSelector } from 'react-redux';
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 1 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
export default function DetalleOrdenServicio({ordenServicio}) {
    console.log('veamos que hay en el orden de servicio',ordenServicio)
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch();
    const _handleChangeTabs = (event, newValue) => {
      setValue(newValue);
    };

    const detalleOrdenServicioOrdenado = ordenServicio?.detalle_orden_servicios.sort(function (a, b) {
     return a.id_detalle_os-b.id_detalle_os;
    });

    /*****/
   
    
    


    useEffect(()=>{
      
    },[]);
    return (
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
      >
        <Tabs
          orientation="vertical"
          
          value={value}
          onChange={_handleChangeTabs}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {detalleOrdenServicioOrdenado.map((detalleos)=>{
            return <Tab label={`${detalleos.descripcion}` } 
                        key={detalleos.id_detalle_os}
                        sx={{textAlign:'left'}} />
          }) 
          
          }
          
        </Tabs>
          {detalleOrdenServicioOrdenado.map((detalleos,i)=>{
            return <TabPanel value={value} index={i} key={detalleos.id_detalle_os}>
                        <List>
                            <ListItem>
                                <ListItemText 
                                    primary={`Fecha de Vencimiento: ${detalleos.fecha_vencimiento}`}
                                    secondary={`Entregable por S/.${detalleos.monto_orden_servicio}`} 
                                />
                            </ListItem>
                        </List>
                         
                        
                            

                        <AddEntregable detalleOrdenServicio={detalleos} />
                    </TabPanel>  
          })}
        
          
      </Box>
    );
}
