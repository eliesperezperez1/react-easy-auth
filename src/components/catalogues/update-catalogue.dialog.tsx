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
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";
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
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

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

  const handleNext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Collect form data for the current step
    const currentStepData = new FormData(event.currentTarget);
    const currentStepJson = Object.fromEntries(currentStepData.entries());

    // Merge current step data with existing form data
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    console.log(formData);
    setStep(step + 1);
    if(step===1) {
      //const myInputElement = document.getElementById("lastUpdate") as HTMLInputElement;
      //myInputElement.value = lastUpdateFecha;
      //console.log("Last update: " + myInputElement.value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const currentStepData = new FormData(event.currentTarget);
    const currentStepJson = Object.fromEntries(currentStepData.entries());
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    const mergedFormData = {...formData, ...currentStepJson};
    updateCatalogue(mergedFormData);
  };

  const handleValuePicker = (picker: any) => {
    if(picker==="lastUpdate"){
      if(update.lastUpdate !== undefined) {
        const dateObject = new Date(update.lastUpdate);
        const formattedDate = dateObject.toISOString().slice(0, 16);
        return formattedDate;
      }
    }
    else if (picker==="creationDate"){
      if(update.creationDate !== undefined) {
        const dateObject = new Date(update.creationDate);
        const formattedDate = dateObject.toISOString().slice(0, 16);
        return formattedDate;
      }
    }
  }

  return (
    <>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{t("dialog.updateRegister")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <div className="dialogContentText">
            <span>{t("dialog.fillInfo")}</span>
            <span><b>{step}/5</b></span>
          </div>
          </DialogContentText>
          <Box>
          {step === 1 && (
            <form onSubmit={handleNext}>
              <div className="verticalForm">
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
                value={update.description}
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
                value={update.language}
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
                value={update.territorialScope}
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
                value={update.temporaryCoverage}
                onChange={handleChange}
              />
            </div>
            <div className="buttonsForm">
              <Button 
                onClick={handleClose} 
                sx={{
                  height: 37,
                  backgroundColor: "#D9D9D9",
                  color: "#404040",
                  borderColor: "#404040",
                  "&:hover": {
                    borderColor: "#0D0D0D",
                    backgroundColor: "#0D0D0D",
                    color: "#f2f2f2",
                  },
                }}>{t("dialog.cancel")}</Button>
              <Button 
                type="submit"
                sx={{
                  height: 37,
                  backgroundColor: "#D9D9D9",
                  color: "#404040",
                  borderColor: "#404040",
                  "&:hover": {
                    borderColor: "#0D0D0D",
                    backgroundColor: "#0D0D0D",
                    color: "#f2f2f2",
                  },
                }}>{t("dialog.next")}</Button>
            </div>
            </form>
            
          )}
          {step === 2 && (
            <form onSubmit={handleNext}>
            <div className="verticalForm">
              <TextField
                autoFocus
                required
                margin="dense"
                id="updateFrequency"
                name="updateFrequency"
                label={t("columnsNames.updateFrequency")}
                type="string"
                variant="standard"
                value={update.updateFrequency}
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
                value={update.topic}
                onChange={handleChange}
              />
              <TextField
                autoFocus
                required
                id="lastUpdate"
                margin="dense"
                name="lastUpdate"
                type="datetime-local"
                variant="standard"
                value={handleValuePicker("lastUpdate")}
                onChange={handleChange}

                sx= {{
                  backgroundColor: 'none',
                  width: '100%',
                  border: 'none',
                  borderBottom: '1px solid lightgrey',
                  '& input': {
                    backgroundColor: 'none',
                    border: 'none',
                    
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  style:{
                    backgroundColor: 'none',
                    width: '100%',
                    border: 'none',
                    borderBottom: '1px solid lightgrey',
                  }
                }}
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
                value={update.format}
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
                value={update.distribution}
                onChange={handleChange}
              />
            </div>
            <div className="buttonsForm">
              <Button 
                onClick={handleClose} 
                sx={{
                  height: 37,
                  backgroundColor: "#D9D9D9",
                  color: "#404040",
                  borderColor: "#404040",
                  "&:hover": {
                    borderColor: "#0D0D0D",
                    backgroundColor: "#0D0D0D",
                    color: "#f2f2f2",
                  },
                }}>{t("dialog.cancel")}</Button>
              <Button 
                type="submit"
                sx={{
                  height: 37,
                  backgroundColor: "#D9D9D9",
                  color: "#404040",
                  borderColor: "#404040",
                  "&:hover": {
                    borderColor: "#0D0D0D",
                    backgroundColor: "#0D0D0D",
                    color: "#f2f2f2",
                  },
                }}>{t("dialog.next")}</Button>
            </div>
            </form>
          )}
          {step === 3 && (
            <form onSubmit={handleNext}>
            <div className="verticalForm">
              <TextField
                autoFocus
                required
                margin="dense"
                id="sensitiveInformation"
                name="sensitiveInformation"
                label="Información sensible"
                type="string"
                variant="standard"
                value={update.sensitiveInformation}
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
                value={update.isUsing}
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
                value={update.accessType}
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
                value={update.internalRelationship}
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
                value={update.contactPerson}
                onChange={handleChange}
              />
            </div>
            <div className="buttonsForm">
              <Button 
                onClick={handleClose} 
                sx={{
                  height: 37,
                  backgroundColor: "#D9D9D9",
                  color: "#404040",
                  borderColor: "#404040",
                  "&:hover": {
                    borderColor: "#0D0D0D",
                    backgroundColor: "#0D0D0D",
                    color: "#f2f2f2",
                  },
                }}>{t("dialog.cancel")}</Button>
              <Button 
                type="submit"
                sx={{
                  height: 37,
                  backgroundColor: "#D9D9D9",
                  color: "#404040",
                  borderColor: "#404040",
                  "&:hover": {
                    borderColor: "#0D0D0D",
                    backgroundColor: "#0D0D0D",
                    color: "#f2f2f2",
                  },
                }}>{t("dialog.next")}</Button>
            </div>
            </form>
          )}
          {step === 4 && (
            <form onSubmit={handleNext}>
            <div className="verticalForm">
              <FormControl variant="standard">
                <InputLabel>Estructurado</InputLabel>
                <Select
                  id="structured"
                  name="structured"
                  margin="dense"
                  value={update.structured}
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
                value={update.associatedApplication}
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
                value={update.georeference}
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
                value={update.comments}
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
                value={update.timmingEffect}
                onChange={handleChange}
              />
            </div>
            <div className="buttonsForm">
              <Button 
                onClick={handleClose} 
                sx={{
                  height: 37,
                  backgroundColor: "#D9D9D9",
                  color: "#404040",
                  borderColor: "#404040",
                  "&:hover": {
                    borderColor: "#0D0D0D",
                    backgroundColor: "#0D0D0D",
                    color: "#f2f2f2",
                  },
                }}>{t("dialog.cancel")}</Button>
              <Button 
                type="submit"
                sx={{
                  height: 37,
                  backgroundColor: "#D9D9D9",
                  color: "#404040",
                  borderColor: "#404040",
                  "&:hover": {
                    borderColor: "#0D0D0D",
                    backgroundColor: "#0D0D0D",
                    color: "#f2f2f2",
                  },
                }}>{t("dialog.next")}</Button>
            </div>
            </form>
          )}
          {step === 5 && (
            <form onSubmit={handleSubmit}>
            <div className="verticalForm">
            <TextField
                autoFocus
                required
                id="creationDate"
                margin="dense"
                name="creationDate"
                type="datetime-local"
                variant="standard"
                value={handleValuePicker("creationDate")}
                onChange={handleChange}

                sx= {{
                  backgroundColor: 'none',
                  width: '100%',
                  border: 'none',
                  borderBottom: '1px solid lightgrey',
                  '& input': {
                    backgroundColor: 'none',
                    border: 'none',
                    
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  style:{
                    backgroundColor: 'none',
                    width: '100%',
                    border: 'none',
                    borderBottom: '1px solid lightgrey',
                  }
                }}
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
                value={update.personalData}
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
                value={update.source}
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
                value={update.responsibleIdentity}
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
                value={update.activeAds}
                onChange={handleChange}
              />
            </div>
            <div className="buttonsForm">
              <Button 
                onClick={handleClose} 
                sx={{
                  height: 37,
                  backgroundColor: "#D9D9D9",
                  color: "#404040",
                  borderColor: "#404040",
                  "&:hover": {
                    borderColor: "#0D0D0D",
                    backgroundColor: "#0D0D0D",
                    color: "#f2f2f2",
                  },
                }}>{t("dialog.cancel")}</Button>
              <Button 
                type="submit"
                sx={{
                  height: 37,
                  backgroundColor: "#D9D9D9",
                  color: "#404040",
                  borderColor: "#404040",
                  "&:hover": {
                    borderColor: "#0D0D0D",
                    backgroundColor: "#0D0D0D",
                    color: "#f2f2f2",
                  },
                }}>{t("dialog.addButton")}</Button>
            </div>
            </form>
            
              
          )}
          </Box>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </>
  );
}
