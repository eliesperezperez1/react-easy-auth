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
import { Box, FormControl, InputLabel, MenuItem, Select, Switch, ListItemText, Checkbox, OutlinedInput, FormGroup, Autocomplete, FormControlLabel } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useTranslation } from 'react-i18next';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./create-catalogue.dialog.css";
import React from "react";
import Value from "baseui/select/value";

export interface DialogData {
  open: boolean;
  closeDialog: (a: boolean) => void;
  getInfo: () => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const formatOptions = [
  'PDF',
  'EXCEL',
  'CSV',
];

export default function CreateCatalogueDialog(props: { enviar: DialogData }) {
  const [open, setOpen] = useState<boolean>(false);
  const authHeader = useAuthHeader();
  const [t, i18n] = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [formDataSteps, setFormDataSteps] = useState({
    title: "", description: "", language: "", territorialScope: "", temporaryCoverage: "",
    updateFrequency: "", topic:"", lastUpdate: "", format: "", distribution: "",
    sensitiveInformation: "", isUsing: "", accessType: "", internalRelationship: "", contactPerson: "",
    structured: "", associatedApplication: "", georreference: "", comments: "", timmingEffect: "",
    creationDate: "", personalData: "", source: "", responsibleIdentity: "", activeAds: ""
    }
  );
  const [sensitiveInformation, setSensitiveInformation] = useState("SI");
  const [isUsing, setIsUsing] = useState("SI");
  const [structured, setStructured] = useState("SI");
  const [georeference, setGeoreference] = useState("SI");
  const [personalData, setPersonalData] = useState("SI");
  const [activeAds, setActiveAds] = useState("SI");
  const [format, setFormat] = React.useState<string[]>([]);

  useEffect(() => {
    setOpen(props.enviar.open);
  }, [props]);

  const handleClose = () => {
    setOpen(false);
    props.enviar.closeDialog(false);
    setFormData({});
    setStep(1);
    setSensitiveInformation("SI");
    setIsUsing("SI");
    setStructured("SI");
    setGeoreference("SI");
    setPersonalData("SI");
    setActiveAds("SI");
    setFormat([]);
  };

  const createCatalogue = (formJson: any) => {
    const a = formJson.lastUpdate;
    const b = formJson.creationDate;
    const deletedDate = new Date();
    const deleted = false;
    const lastUpdate = new Date(a);
    const creationDate = new Date(b);
    const prueba = formJson as CreateCatalogue;
    const create: CreateCatalogue = {
      ...prueba,
      deleted,
      deletedDate,
      lastUpdate,
      creationDate,
    };
    createCatalogueRequest(create, authHeader())
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    props.enviar.getInfo();
    handleClose();
  };

  const handleGoBack = () => {
    setStep(step - 1);
  }

  const handleNext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Collect form data for the current step
    const currentStepData = new FormData(event.currentTarget);
    if(currentStepData.get("sensitiveInformation")!=="on"){
      currentStepData.set("sensitiveInformation", "NO");
    } else {
      currentStepData.set("sensitiveInformation", "SI");
    }

    if(currentStepData.get("isUsing")!=="on"){
      currentStepData.set("isUsing", "NO");
    } else {
      currentStepData.set("isUsing", "SI");
    }

    if(currentStepData.get("structured")!=="on"){
      currentStepData.set("structured", "NO");
    } else {
      currentStepData.set("structured", "SI");
    }

    if(currentStepData.get("georeference")!=="on"){
      currentStepData.set("georeference", "NO");
    } else {
      currentStepData.set("georeference", "SI");
    }

    if(currentStepData.get("personalData")!=="on"){
      currentStepData.set("personalData", "NO");
    } else {
      currentStepData.set("personalData", "SI");
    }

    if(currentStepData.get("activeAds")!=="on"){
      currentStepData.set("activeAds", "NO");
    } else {
      currentStepData.set("activeAds", "SI");
    }

    if( (format!==undefined || format !== null) && (currentStepData.get("format")!==null || currentStepData.get("format")!==undefined)){
      const formatosDatos = format.toString();
      const formatosDatosMod: string = formatosDatos.replace(/,/g, " / ");
      currentStepData.set("format", formatosDatosMod);
    }
    //--------------------------------------------------------------------
    const currentStepJson = Object.fromEntries(currentStepData.entries());

    setFormDataSteps((prevData) => ({ ...prevData, ...currentStepJson }));

    // Merge current step data with existing form data
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    console.log(formData);
    setStep(step + 1);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const currentStepData = new FormData(event.currentTarget);
    const currentStepJson = Object.fromEntries(currentStepData.entries());
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    const mergedFormData = { ...formData, ...currentStepJson };
    console.log(mergedFormData);
    createCatalogue(mergedFormData);
  };

  const handleSwitch = (nameSwitch: any, event: any) => {
    switch(nameSwitch){
      case "sensitiveInformation":
        if(sensitiveInformation==="SI") {setSensitiveInformation("NO"); console.log(sensitiveInformation);}
        else {setSensitiveInformation("SI");console.log(sensitiveInformation);}
        break;
      case "isUsing":
        if(isUsing==="SI") setIsUsing("NO");
        else setIsUsing("SI");
        break;
      case "structured":
        if(structured==="SI") setStructured("NO");
        else setStructured("SI");
        break;
      case "georeference":
        if(georeference==="SI") setGeoreference("NO");
        else setGeoreference("SI");
        break;
      case "personalData":
        if(personalData==="SI") setPersonalData("NO");
        else setPersonalData("SI");
        break;
      case "activeAds":
        if(activeAds==="SI") setActiveAds("NO");
        else setActiveAds("SI");
        break;
    }
  };

  const handleFormat = (event: any, newValue: any) => {
    setFormat(newValue);
    console.log(newValue);
  };
  const handleChange = (field: string, value: string) => {
    // Update the form data
    setFormDataSteps((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiInputBase-root": { border: "none" },
        }}
      >
        <DialogTitle>{t("dialog.addRegister")}</DialogTitle>
        <DialogContent>
          <div className="dialogContentText">
            <span>{t("dialog.fillInfo")}</span>
            <span>
              <strong>{step}/5</strong>
            </span>
          </div>
          <Box>
          {step === 1 && (
            <form onSubmit={handleNext}>
              <div className="verticalForm">
                <div className="horizontalForm">
                <p>
                {t("columnsNames.title")}
                </p>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="title"
                    name="title"
                    type="string"
                    variant="standard"
                    value={formDataSteps.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                  />
                </div>
                <div className="horizontalForm">
                <p>
                {t("columnsNames.description")}
                </p>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="description"
                    name="description"
                    type="string"
                    variant="standard"
                    value={formDataSteps.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                  />
                </div>
                <div className="horizontalForm">
                <p>
                {t("columnsNames.language")}
                </p>
                  <FormControl variant="standard">
                    <Select
                      id="language"
                      name="language"
                      margin="dense"
                      defaultValue={formDataSteps.language}
                      //onChange={(e) => handleChange('language', e.target.value)}
                      required
                    >
                      <MenuItem value={"es"}>ES</MenuItem>
                      <MenuItem value={"val"}>VAL</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="horizontalForm">
                <p>
                {t("columnsNames.territorialScope")}
                </p>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="territorialScope"
                    name="territorialScope"
                    type="string"
                    variant="standard"
                    value={formDataSteps.territorialScope}
                    onChange={(e) => handleChange('territorialScope', e.target.value)}
                  />
                </div>
                <div className="horizontalForm">
                <p>
                {t("columnsNames.temporaryCoverage")}
                </p>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="temporaryCoverage"
                    name="temporaryCoverage"
                    type="string"
                    variant="standard"
                    value={formDataSteps.temporaryCoverage}
                    onChange={(e) => handleChange('temporaryCoverage', e.target.value)}
                  />
                </div>
              
              
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
              <div className="horizontalForm">
                <p>
                {t("columnsNames.updateFrequency")}
                </p>
              <TextField
                autoFocus
                required
                margin="dense"
                id="updateFrequency"
                name="updateFrequency"
                type="string"
                variant="standard"
                value={formDataSteps.updateFrequency}
                onChange={(e) => handleChange('updateFrequency', e.target.value)}
              />
              </div>
              <div className="horizontalForm">
                <p>
                {t("columnsNames.topic")}
                </p>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="topic"
                  name="topic"
                  type="string"
                  variant="standard"
                  value={formDataSteps.topic}
                  onChange={(e) => handleChange('topic', e.target.value)}
                />
              </div>
              <div className="horizontalForm">
                <p>
                {t("columnsNames.lastUpdate")}
                </p>
                <TextField
                  autoFocus
                  required
                  id="lastUpdate"
                  margin="dense"
                  name="lastUpdate"
                  type="datetime-local"
                  variant="standard"
                  value={formDataSteps.lastUpdate}
                  onChange={(e) => handleChange('lastUpdate', e.target.value)}

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
              </div>
              <div className="horizontalForm">
                <p>
                {t("columnsNames.format")}
                </p>
                <FormControl variant="standard">
                  <FormGroup>
                    <Autocomplete
                      multiple
                      id="format"
                      options={['PDF', 'EXCEL', 'CSV', 'JSON']}
                      value={format}
                      onChange={handleFormat}
                      disableCloseOnSelect={true}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <FormControlLabel
                            control={<Checkbox checked={selected} />}
                            label={option}
                          />
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="format"
                          variant="standard"
                          placeholder="Select formats"
                        />
                      )}
                    />
                  </FormGroup>
                </FormControl>
              </div>
              <div className="horizontalForm">
                <p>
                Distribución
                </p>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="distribution"
                  name="distribution"
                  type="string"
                  variant="standard"
                  value={formDataSteps.distribution}
                  onChange={(e) => handleChange('distribution', e.target.value)}
                />
              </div>
              
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
                }}>{t("dialog.cancel")}
              </Button>
              <div>
                <Button
                  onClick={handleGoBack}
                  sx={{
                    height: 37,
                    backgroundColor: "#D9D9D9",
                    color: "#404040",
                    borderColor: "#404040",
                    marginRight: 1,
                    "&:hover": {
                      borderColor: "#0D0D0D",
                      backgroundColor: "#0D0D0D",
                      color: "#f2f2f2",
                    },
                  }}
                >
                  Atrás
                </Button>

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
                  }}>{t("dialog.next")}
                </Button>
              </div>
            </div>
            </form>
          )}
          {step === 3 && (
            <form onSubmit={handleNext}>
            <div className="verticalForm">
              <div className="horizontalFormSwitch">
                <p>
                {t("columnsNames.sensitiveInformation")}
                </p>
                <FormControl variant="standard">
                    <Switch
                    id="sensitiveInformation"
                    name="sensitiveInformation"
                    value={sensitiveInformation}
                    checked={sensitiveInformation === "SI"}
                    onChange={(event) => handleSwitch("sensitiveInformation", event.target.checked)} 
                    color="primary" // Opcional: ajusta el color del switch
                  />  
                </FormControl>
              </div>
              <div className="horizontalFormSwitch">
                <p>
                  Se está usando
                </p>
                <FormControl variant="standard">
                  <Switch
                    id="isUsing"
                    name="isUsing"
                    value={isUsing}
                    checked={isUsing === "SI"}
                    onChange={(event) => handleSwitch("isUsing", event.target.checked)} 
                    color="primary" // Opcional: ajusta el color del switch
                  />  
                </FormControl>
              </div>
              <div className="horizontalForm">
                <p>
                {t("columnsNames.accessType")}
                </p>
                <FormControl variant="standard">
                  <Select
                    id="accessType"
                    name="accessType"
                    margin="dense"
                    defaultValue={formDataSteps.accessType}
                    onChange={(e) => handleChange('accessType', e.target.value)}
                    required
                  >
                    <MenuItem value={"Públic/Público"}>Público</MenuItem>
                    <MenuItem value={"Restringit/Restringido"}>Restringido</MenuItem>
                    <MenuItem value={"Privat/Privado"}>Privado</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="horizontalForm">
                <p>
                Relación interna
                </p>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="internalRelationship"
                  name="internalRelationship"
                  type="string"
                  variant="standard"
                  value={formDataSteps.internalRelationship}
                  onChange={(e) => handleChange('internalRelationship', e.target.value)}
                />
              </div>
              <div className="horizontalForm">
                <p>
                {t("columnsNames.contactPerson")}
                </p>
                
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="contactPerson"
                  name="contactPerson"
                  type="string"
                  variant="standard"
                  value={formDataSteps.contactPerson}
                  onChange={(e) => handleChange('contactPerson', e.target.value)}
                />
              </div>
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
                <div>
                  <Button
                    onClick={handleGoBack}
                    sx={{
                      height: 37,
                      backgroundColor: "#D9D9D9",
                      color: "#404040",
                      borderColor: "#404040",
                      marginRight: 1,
                      "&:hover": {
                        borderColor: "#0D0D0D",
                        backgroundColor: "#0D0D0D",
                        color: "#f2f2f2",
                      },
                    }}
                  >
                    Atrás
                  </Button>
      
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
            </div>
            </form>
          )}
          {step === 4 && (
            <form onSubmit={handleNext}>
            <div className="verticalForm">
              <div className="horizontalFormSwitch">
                <p>
                Estructurado
                </p>
                <FormControl variant="standard">
                  <Switch
                    id="structured"
                    name="structured"
                    value={structured}
                    checked={structured === "SI"}
                    onChange={(event) => handleSwitch("structured", event.target.checked)} 
                    color="primary" // Opcional: ajusta el color del switch
                  />  
                </FormControl>
              </div>
              <div className="horizontalForm">
                <p>
                Aplicación asociada
                </p>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="associatedApplication"
                  name="associatedApplication"
                  type="string"
                  variant="standard"
                  value={formDataSteps.associatedApplication}
                  onChange={(e) => handleChange('associatedApplication', e.target.value)}
                />
              </div>
              <div className="horizontalFormSwitch">
                <p>
                {t("columnsNames.georreference")}
                </p>
                <FormControl variant="standard">
                  <Switch
                    id="georeference"
                    name="georeference"
                    value={georeference}
                    checked={georeference === "SI"}
                    onChange={(event) => handleSwitch("georeference", event.target.checked)} 
                    color="primary" // Opcional: ajusta el color del switch
                  />  
                </FormControl>

              </div>
              <div className="horizontalForm">
                <p>
                {t("columnsNames.comments")}
                </p>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="comments"
                  name="comments"
                  type="string"
                  variant="standard"
                  value={formDataSteps.comments}
                  onChange={(e) => handleChange('comments', e.target.value)}
                />
              </div>
              <div className="horizontalForm">
                <p>
                Efecto temporal
                </p>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="timmingEffect"
                  name="timmingEffect"
                  type="string"
                  variant="standard"
                  value={formDataSteps.timmingEffect}
                  onChange={(e) => handleChange('timmingEffect', e.target.value)}
                />
              </div>
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
                <div>
                  <Button
                    onClick={handleGoBack}
                    sx={{
                      height: 37,
                      backgroundColor: "#D9D9D9",
                      color: "#404040",
                      borderColor: "#404040",
                      marginRight: 1,
                      "&:hover": {
                        borderColor: "#0D0D0D",
                        backgroundColor: "#0D0D0D",
                        color: "#f2f2f2",
                      },
                    }}
                  >
                    Atrás
                  </Button>
    
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
            </div>
            </form>
          )}
          {step === 5 && (
            <form onSubmit={handleSubmit}>
            <div className="verticalForm">
              <div className="horizontalForm">
                <p>
                Fecha de creación
                </p>
                <TextField
                  autoFocus
                  required
                  id="creationDate"
                  margin="dense"
                  name="creationDate"
                  type="datetime-local"
                  variant="standard"
                  value={formDataSteps.creationDate}
                  onChange={(e) => handleChange('creationDate', e.target.value)}

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
              </div>
              <div className="horizontalFormSwitch">
                <p>
                {t("columnsNames.personalData")}
                </p>
                <FormControl variant="standard">
                  <Switch
                    id="personalData"
                    name="personalData"
                    value={personalData}
                    checked={personalData === "SI"}
                    onChange={(event) => handleSwitch("personalData", event.target.checked)} 
                    color="primary" // Opcional: ajusta el color del switch
                  />  
                </FormControl>
              </div>
              <div className="horizontalForm">
                <p>
                {t("columnsNames.source")}
                </p>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="source"
                  name="source"
                  type="string"
                  variant="standard"
                  value={formDataSteps.source}
                  onChange={(e) => handleChange('source', e.target.value)}
                />
              </div>
              <div className="horizontalForm">
                <p>
                {t("columnsNames.responsibleIdentity")}
                </p>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="responsibleIdentity"
                  name="responsibleIdentity"
                  type="string"
                  variant="standard"
                  value={formDataSteps.responsibleIdentity}
                  onChange={(e) => handleChange('responsibleIdentity', e.target.value)}
                />
              </div>
              <div className="horizontalFormSwitch">
                <p>
                {t("columnsNames.activeAds")}
                </p>
                <FormControl variant="standard">
                  <Switch
                    id="activeAds"
                    name="activeAds"
                    value={activeAds}
                    checked={activeAds === "SI"}
                    onChange={(event) => handleSwitch("activeAds", event.target.checked)} 
                    color="primary" // Opcional: ajusta el color del switch
                  />  
                </FormControl>
              </div>
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

              <div>
                <Button
                  onClick={handleGoBack}
                  sx={{
                    height: 37,
                    backgroundColor: "#D9D9D9",
                    color: "#404040",
                    borderColor: "#404040",
                    marginRight: 1,
                    "&:hover": {
                      borderColor: "#0D0D0D",
                      backgroundColor: "#0D0D0D",
                      color: "#f2f2f2",
                    },
                  }}
                >
                  Atrás
                </Button>
  
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
            </div>
            </form>
            
              
          )}
          </Box>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
}
