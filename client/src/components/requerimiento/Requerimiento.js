
import { Chip, IconButton, ListItem, ListItemText } from "@mui/material";
import { Edit as EditIcon, Close as CloseIcon } from "@mui/icons-material";
import { statusConfigByStatus } from "./constants";

const Requerimiento = ({ requerimiento, onEdit, onDelete, onClickStatus }) => {
  console.log('aqui recibo el reque',requerimiento.estado);
  const statusConfig = statusConfigByStatus[requerimiento.estado];
  console.log(statusConfigByStatus);
  const _handleClickEdit = () => {
    if (onEdit) onEdit(requerimiento);
  };

  const _handleClickDelete = () => {
    if (onDelete) onDelete(requerimiento.idRequerimiento);
  };

  const _handleClickStatus = () => {
    if (onClickStatus) onClickStatus(requerimiento.idRequerimiento);
  };

  return (
    <ListItem
      secondaryAction={
        <>
          <Chip
            sx={{
              backgroundColor: statusConfig.color
            }}
            label={statusConfig.label}
            variant="outlined"
            onClick={_handleClickStatus}
          />
          <IconButton size="small" onClick={_handleClickEdit}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={_handleClickDelete}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
    >
      <ListItemText primary={requerimiento.descripcion} secondary={requerimiento.detalle} />
    </ListItem>
  );
};

export default Requerimiento;