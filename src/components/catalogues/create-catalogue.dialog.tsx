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
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { namespaces } from "../../@types/i18n.constants";
export interface DialogData {
  open: boolean;
  closeDialog: (a: boolean) => void;
  getInfo: () => void;
}

export default function CreateCatalogueDialog(props: { enviar: DialogData }) {
  const [open, setOpen] = useState<boolean>(false);
  const authHeader = useAuthHeader();
  const [t, i18n] = useTranslation();

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
    const deletedDateISO = deletedDate.toISOString();
    const deleted = false;
    const lastUpdate = new Date(a);
    const lastUpdateISO = lastUpdate.toISOString();
    const creationDate = new Date(b);
    const creationDateISO = creationDate.toISOString();
    const prueba = formJson as CreateCatalogue;
    const create: CreateCatalogue = {
      ...prueba,
      deleted,
      deletedDate,
      lastUpdate,
      creationDate
     /*  deletedDate: deletedDateISO,
      lastUpdate: lastUpdateISO,
      creationDate: creationDateISO, */
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
        <DialogTitle>{t("dialog.addRegister")}</DialogTitle>
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
                label={t("columnsNames.format")}
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
              <TextField
                autoFocus
                required
                margin="dense"
                id="sensitiveInformation"
                name="sensitiveInformation"
                label={t("columnsNames.sensitiveInformation")}
                type="string"
                variant="standard"
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
                label={t("columnsNames.contactPerson")}
                type="string"
                variant="standard"
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
                label={t("columnsNames.personalData")}
                type="string"
                variant="standard"
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
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("dialog.cancel")}</Button>
          <Button type="submit">{t("dialog.addButton")}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
