import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import {
  Catalogue,
  UpdateCatalogue,
} from "../../interfaces/catalogue.interface";
import { updateCatalogueRequest } from "../../api/catalogues";
import { useAuthHeader } from "react-auth-kit";
import { Box } from "@mui/material";

export interface UpdateDialogData {
  open: boolean;
  closeDialog: (a: boolean) => void;
  getInfo: () => void;
  catalogue: Catalogue;
}

export default function UpdateCatalogueDialog(props: {
  enviar: UpdateDialogData;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const authHeader = useAuthHeader();
  const [update, setUpdate] = useState<UpdateCatalogue>({});

  useEffect(() => {
    setUpdate(props.enviar.catalogue);
    setOpen(props.enviar.open);
  }, [props.enviar.open, props.enviar.catalogue]);

  const handleClose = () => {
    setOpen(false);
    props.enviar.closeDialog(false);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdate((prevState) => ({ ...prevState, [name]: value }));
  };

  const updateCatalogue = (formJson: any) => {
    const a = formJson.lastUpdate;
    const b = formJson.creationDate;
    const deletedDate = new Date();
    const deleted = false;
    const lastUpdate = new Date(a);
    const creationDate = new Date(b);
    const prueba = formJson as UpdateCatalogue;
    setUpdate({
      ...prueba,
      deleted,
      deletedDate,
      lastUpdate,
      creationDate,
    });
    updateCatalogueRequest(
      props.enviar.catalogue._id,
      update,
      authHeader()
    ).then((response) => response.json());
    props.enviar.getInfo();
    handleClose();
  };

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        sx={{
          "& .MuiTextField-root": { m: 1, width: "20ch" },
        }}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            updateCatalogue(formJson);
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
                value={update.title}
                onChange={handleChange}
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
                value={update?.description}
                onChange={handleChange}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="language"
                name="language"
                label="Idioma"
                type="string"
                variant="standard"
                value={update?.language}
                onChange={handleChange}
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
                value={update?.territorialScope}
                onChange={handleChange}
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
                value={update?.temporaryCoverage}
                onChange={handleChange}
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
                value={update?.updateFrequency}
                onChange={handleChange}
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
                value={update?.topic}
                onChange={handleChange}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="lastUpdate"
                name="lastUpdate"
                type="string"
                variant="standard"
                value={update?.lastUpdate}
                onChange={handleChange}
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
                value={update?.format}
                onChange={handleChange}
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
                value={update?.distribution}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                autoFocus
                required
                margin="dense"
                id="sensitiveInformation"
                name="sensitiveInformation"
                label="Información sensible"
                type="string"
                variant="standard"
                value={update?.sensitiveInformation}
                onChange={handleChange}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="isUsing"
                name="isUsing"
                label="Se utiliza"
                type="string"
                variant="standard"
                value={update?.isUsing}
                onChange={handleChange}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="accessType"
                name="accessType"
                label="Tipo de acceso"
                type="string"
                variant="standard"
                value={update?.accessType}
                onChange={handleChange}
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
                value={update?.internalRelationship}
                onChange={handleChange}
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
                value={update?.contactPerson}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                autoFocus
                required
                margin="dense"
                id="structured"
                name="structured"
                label="Estructurado"
                type="string"
                variant="standard"
                value={update?.structured}
                onChange={handleChange}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="associatedApplication"
                name="associatedApplication"
                label="Aplicación asociada"
                type="string"
                variant="standard"
                value={update?.associatedApplication}
                onChange={handleChange}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="georeference"
                name="georeference"
                label="Georreferenciado"
                type="string"
                variant="standard"
                value={update?.georeference}
                onChange={handleChange}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="comments"
                name="comments"
                label="Comentarios"
                type="string"
                variant="standard"
                value={update?.comments}
                onChange={handleChange}
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
                value={update?.timmingEffect}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                autoFocus
                required
                margin="dense"
                id="creationDate"
                name="creationDate"
                type="string"
                variant="standard"
                value={update?.creationDate}
                onChange={handleChange}
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
                value={update?.personalData}
                onChange={handleChange}
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
                value={update?.source}
                onChange={handleChange}
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
                value={update?.responsibleIdentity}
                onChange={handleChange}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="activeAds"
                name="activeAds"
                label="Publicidad activa"
                type="string"
                variant="standard"
                value={update?.activeAds}
                onChange={handleChange}
              />
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
