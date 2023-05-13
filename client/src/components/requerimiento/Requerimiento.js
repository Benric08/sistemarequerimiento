import React from 'react'
import {List,ListItem,IconButton,ListItemText} from '@mui/material'
import CommentIcon from '@mui/icons-material/Comment';
 const Requerimiento = () => {
  return (
    <div>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
  {[1, 2, 3].map((value) => (
    <ListItem
      key={value}
      disableGutters
      secondaryAction={
        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>
      }
    >
      <ListItemText primary={`Line item ${value}`} />
    </ListItem>
  ))}
</List>
    </div>
  )
}

export default Requerimiento;
