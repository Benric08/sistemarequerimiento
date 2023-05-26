import { Box, List, ListItem, ListItemText, Tab, Tabs, Typography } from '@mui/material';
import React from 'react'
import AddEntregable from '../forms/AddEntregable'
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

    const _handleChangeTabs = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={_handleChangeTabs}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {ordenServicio?.detalle_orden_servicios.map((detalleos)=>{
            return <Tab label={`${detalleos.descripcion}` } key={detalleos.idDetalleOrdenServicio} />
          })}
          
        </Tabs>
          {ordenServicio?.detalle_orden_servicios.map((detalleos,i)=>{
            return <TabPanel value={value} index={i} key={detalleos.idDetalleOrdenServicio}>
                        <List>
                            <ListItem>
                                <ListItemText 
                                    primary={`Fecha de Vencimiento: ${detalleos.fechaVencimiento}`}
                                    secondary={`Entregable por S/.${detalleos.montoOrdenServicio}`} 
                                />
                            </ListItem>
                        </List>
                         
                        
                            

                        <AddEntregable detalleOS={detalleos}/>
                    </TabPanel>  
          })}
        
          
      </Box>
    );
}
