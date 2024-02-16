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
import { useTranslation } from "react-i18next";
import { namespaces } from "../../@types/i18n.constants";
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
  const [t, i18n] = useTranslation();

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
        <DialogTitle>{t("dialog.updateRegister")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {t("dialog.fillInfo")}
          </DialogContentText>
          <Box>
            <div>
              <TextField
                autoFocus
                required
                margin="dense"
                id="title"
                name="title"
                label={t("columnsNames.title")}
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
                label={t("columnsNames.description")}
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
                label={t("columnsNames.language")}
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
                label={t("columnsNames.territorialScope")}
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
                label={t("columnsNames.temporaryCoverage")}
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
                label={t("columnsNames.updateFrequency")}
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
                label={t("columnsNames.topic")}
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
                label={t("columnsNames.format")}
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
                label={t("columnsNames.sensitiveInformation")}
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
                label={t("columnsNames.accessType")}
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
                label={t("columnsNames.contactPerson")}
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
                label={t("columnsNames.georreference")}
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
                label={t("columnsNames.comments")}
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
                label={t("columnsNames.personalData")}
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
                label={t("columnsNames.source")}
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
                label={t("columnsNames.responsibleIdentity")}
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
                label={t("columnsNames.activeAds")}
                type="string"
                variant="standard"
                value={update?.activeAds}
                onChange={handleChange}
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("dialog.cancel")}</Button>
          <Button type="submit">{t("dialog.updateButton")}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
