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
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useTranslation } from 'react-i18next';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { display } from "@mui/system";
import "./createCatalogues.css";

export interface DialogData {
  open: boolean;
  closeDialog: (a: boolean) => void;
  getInfo: () => void;
}

export default function CreateCatalogueDialog(props: { enviar: DialogData }) {
  const [open, setOpen] = useState<boolean>(false);
  const authHeader = useAuthHeader();
  const [t, i18n] = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

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

  const handleNext = (event: any) => {
    event.preventDefault();
    // Collect form data for the current step
    const currentStepData = new FormData(event.currentTarget);
    const currentStepJson = Object.fromEntries(currentStepData.entries());

    // Merge current step data with existing form data
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));

    // Move to the next step
    console.log("Step antes de cambiar: " + step);
    setStep(step + 1);
    console.log("Step tras cambiar: " + step);
  };

  const handleSubmit = () => {
    // Submit the entire form data (all steps) to your API or function
    //createCatalogue(formData);
    console.log("CreateCatalogue");
  };

  return (
    <>
      <Dialog
        fullWidth={true}
        //maxWidth={'xs'}
        open={open}
        /*sx={{
          "& .MuiTextField-root": { m: 1, width: "20ch" },
          "& .MuiFormControl-root": { m: 1, width: "20ch" },
          "&. MuiInputBase-root": { m: 1, width: "20ch" },
        }}*/
        onClose={handleClose}
        /*PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            createCatalogue(formJson);
          },
        }}*/
      >
        <DialogTitle>{t("dialog.addRegister")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <div className="dialogContentText">
            <p>{t("dialog.fillInfo")}</p>
            <p><b>{step}/5</b></p>
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
              <TextField
                autoFocus
                required
                margin="dense"
                id="georeference"
                name="georeference"
                label="Georreferenciado"
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker name="creationDate" />
              </LocalizationProvider>
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
          {/*<Button onClick={handleClose}>{t("dialog.cancel")}</Button>
          {step === 5 && (
            <Button onClick={handleSubmit}>{t("dialog.addButton")}</Button>
           )}  
          {step < 5 &&( 
            <Button onClick={handleNext}>Siguiente</Button>
          )}*/}
        </DialogActions>
      </Dialog>
    </>
  );
}
