import { keyBy } from "lodash";

export const estado = {
  Activo: "Activo",
  Anulado: "Anulado",
};

export const estadoConfigs = [
  {
    estado: estado.Activo,
    label: "activo",
    color: "green"
  },
  {
    estado: estado.Anulado,
    label: "anulado",
    color: "red"
  }
];

export const statusConfigByStatus = keyBy(estadoConfigs, "estado");

/*
  const [status, setStatus] = useState(Status.Todo)

  const configStatus = statusConfigByStatus[status]

  return (
    <Button style={{color: configStatus.color}}>
      {configStatus.label}
    </Button>
  )
*/
