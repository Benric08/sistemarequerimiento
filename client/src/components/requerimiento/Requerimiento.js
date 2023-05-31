
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
    if (onDelete) onDelete(requerimiento.id_requerimiento);
  };

  const _handleClickStatus = () => {
    if (onClickStatus) onClickStatus(requerimiento.id_requerimiento);
  };

  return (
    <ListItem
      divider={true}
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
    <ListItemText primary={`Precio Unitario: ${requerimiento.precio_unitario}`} secondary={`cantidad: ${requerimiento.cantidad}`}/>
    <ListItemText primary={`Unidad de medida: ${requerimiento.unidad_medida}`} secondary={`Total: ${requerimiento.total}`}/>
    </ListItem>
  );
};

export default Requerimiento;