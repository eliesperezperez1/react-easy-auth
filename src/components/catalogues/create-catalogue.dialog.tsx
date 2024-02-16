import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { CreateCatalogue } from "../../interfaces/catalogue.interface";
import { createCatalogueRequest } from "../../api/catalogues";
import { useAuthHeader } from "react-auth-kit";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  DateTimePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
export interface DialogData {
  open: boolean;
  closeDialog: (a: boolean) => void;
  getInfo: () => void;
}

export default function CreateCatalogueDialog(props: { enviar: DialogData }) {
  const [open, setOpen] = useState<boolean>(false);
  const authHeader = useAuthHeader();

  useEffect(() => {
    setOpen(props.enviar.open);
  });

  const handleClose = () => {
    setOpen(false);
    props.enviar.closeDialog(false);
  };

  const createCatalogue = (formJson: any) => {
    const a = formJson.lastUpdate;
    const b = formJson.creationDate;
    const deletedDate = new Date();
    const deleted = false;
    const lastUpdate = new Date(a);
    const creationDate = new Date(b);
    const prueba = formJson as CreateCatalogue;
    console.log(prueba.sensitiveInformation);
    const create: CreateCatalogue = {
      ...prueba,
      deleted,
      deletedDate,
      lastUpdate,
      creationDate,
    };
    console.log(create);
    props.enviar.getInfo();
    handleClose();
    createCatalogueRequest(create, authHeader())
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        sx={{
          "& .MuiTextField-root": { m: 1, width: "20ch" },
          "& .MuiFormControl-root": { m: 1, width: "20ch" },
          "&. MuiInputBase-root": { m: 1, width: "20ch" },
        }}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            createCatalogue(formJson);
          },
        }}
      >
        <DialogTitle>Añadir un conjunto de datos</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Rellena todos los campos para hacer cosas
          </DialogContentText>
          <Box>
            <div>
              <TextField
                autoFocus
                required
                margin="dense"
                id="title"
                name="title"
                label="Título"
                type="string"
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="description"
                name="description"
                label="Descripción"
                type="string"
                variant="standard"
              />
              {/* <FormControl variant="standard">
                <InputLabel>Idioma</InputLabel>
                <Select
                  id="language"
                  name="language"
                  margin="dense"
                  defaultValue={"VAL"}
                  multiple
                  renderValue={(selected) => selected.concat(", ")}
                >
                  <MenuItem value={"VAL"}>VALENCIÀ</MenuItem>
                  <MenuItem value={"ESP"}>CASTELLANO</MenuItem>
                  <MenuItem value={"ENG"}>ENGLISH</MenuItem>
                </Select>
              </FormControl> */}
              <TextField
                autoFocus
                required
                margin="dense"
                id="language"
                name="language"
                label="Idioma"
                type="string"
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="territorialScope"
                name="territorialScope"
                label="Territorial scope"
                type="string"
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="temporaryCoverage"
                name="temporaryCoverage"
                label="Covertura temporal"
                type="string"
                variant="standard"
              />
            </div>
            <div>
              <TextField
                autoFocus
                required
                margin="dense"
                id="updateFrequency"
                name="updateFrequency"
                label="Frecuencia de actualización"
                type="string"
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="topic"
                name="topic"
                label="Tema"
                type="string"
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="lastUpdate"
                name="lastUpdate"
                type="date"
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="format"
                name="format"
                label="Formato"
                type="string"
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="distribution"
                name="distribution"
                label="Distribución"
                type="string"
                variant="standard"
              />
            </div>
            <div>
              <FormControl variant="standard">
                <InputLabel>Información sensible</InputLabel>
                <Select
                  id="sensitiveInformation"
                  name="sensitiveInformation"
                  margin="dense"
                  defaultValue={"SI"}
                >
                  <MenuItem value={"SI"}>SÍ</MenuItem>
                  <MenuItem value={"NO"}>NO</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard">
                <InputLabel>Se utiliza</InputLabel>
                <Select
                  id="isUsing"
                  name="isUsing"
                  margin="dense"
                  defaultValue={"SI"}
                >
                  <MenuItem value={"SI"}>SÍ</MenuItem>
                  <MenuItem value={"NO"}>NO</MenuItem>
                </Select>
              </FormControl>
              <TextField
                autoFocus
                required
                margin="dense"
                id="accessType"
                name="accessType"
                label="Tipo de acceso"
                type="string"
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="internalRelationship"
                name="internalRelationship"
                label="Relación interna"
                type="string"
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="contactPerson"
                name="contactPerson"
                label="Persona de contacto"
                type="string"
                variant="standard"
              />
            </div>
            <div>
              <FormControl variant="standard">
                <InputLabel>Estructurado</InputLabel>
                <Select
                  id="structured"
                  name="structured"
                  margin="dense"
                  defaultValue={"SI"}
                  required
                >
                  <MenuItem value={"SI"}>SÍ</MenuItem>
                  <MenuItem value={"NO"}>NO</MenuItem>
                </Select>
              </FormControl>
              <TextField
                autoFocus
                required
                margin="dense"
                id="associatedApplication"
                name="associatedApplication"
                label="Aplicación asociada"
                type="string"
                variant="standard"
              />
              <FormControl variant="standard">
                <InputLabel>Georreferenciado</InputLabel>
                <Select
                  id="georeference"
                  name="georeference"
                  margin="dense"
                  defaultValue={"SI"}
                  required
                >
                  <MenuItem value={"SI"}>SÍ</MenuItem>
                  <MenuItem value={"NO"}>NO</MenuItem>
                </Select>
              </FormControl>
              <TextField
                autoFocus
                required
                margin="dense"
                id="comments"
                name="comments"
                label="Comentarios"
                type="string"
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="timmingEffect"
                name="timmingEffect"
                label="Efecto temporal"
                type="string"
                variant="standard"
              />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker name="creationDate" />
            </LocalizationProvider>
            <div>
              <TextField
                autoFocus
                required
                margin="dense"
                id="creationDate"
                name="creationDate"
                type="date"
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="personalData"
                name="personalData"
                label="Información personal"
                type="string"
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="source"
                name="source"
                label="Recurso"
                type="string"
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="responsibleIdentity"
                name="responsibleIdentity"
                label="Entidad responsable"
                type="string"
                variant="standard"
              />
              <FormControl variant="standard">
                <InputLabel>Publicidad activa</InputLabel>
                <Select
                  id="activeAds"
                  name="activeAds"
                  margin="dense"
                  defaultValue={"SI"}
                  required
                >
                  <MenuItem value={"SI"}>SÍ</MenuItem>
                  <MenuItem value={"NO"}>NO</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
