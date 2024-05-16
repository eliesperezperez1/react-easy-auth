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
import { Autocomplete, 
  Box, 
  Checkbox, 
  FormControl, 
  FormControlLabel, 
  FormGroup, 
  InputLabel, 
  MenuItem, 
  Select, 
  Switch,
  ThemeProvider, } from "@mui/material";
import { useTranslation } from "react-i18next";
import baseTheme from "../darkModeSwitch/darkmodeTheme";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import React from "react";
import { CalendarIcon, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from "dayjs";
import { getEntitiesRequest } from "../../api/entities";
import { Entity } from "../../interfaces/entity.interface";
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
  const [entities, setEntities] = useState<Entity[]>([]);
  const [entitiesName, setEntitiesName] = useState<string[]>([]);
  const [deletedEntities, setDeletedEntities] = useState<Entity[]>([]);
  const [update, setUpdate] = useState<UpdateCatalogue>({});
  const [t, i18n] = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [format, setFormat] = React.useState<string[]>([]);
  const [sensitiveInformation, setSensitiveInformation] = useState("SI");
  const [isUsing, setIsUsing] = useState("SI");
  const [structured, setStructured] = useState("SI");
  const [georeference, setGeoreference] = useState("SI");
  const [personalData, setPersonalData] = useState("SI");
  const [activeAds, setActiveAds] = useState("SI");
  const [masterData, setMasterData] = useState("SI");
  const [referenceData, setReferenceData] = useState("SI");
  const [highValue, setHighValue] = useState("SI");
  const [genderInfo, setGenderInfo] = useState("SI");
  const [autoAcess, setAutoAcess] = useState("SI");
  const [RAT, setRAT] = useState("SI");
  const [dataProtection, setDataProtection] = useState("SI");
  const [dataStandards, setDataStandards] = useState("SI");
  const [dataAnonymize, setDataAnonymize] = useState("SI");
  const [sharedData, setSharedData] = useState("SI");
  const [VLCi, setVLCi] = useState("SI");
  const [ArcGIS, setArcGIS] = useState("SI");
  const [Pentaho, setPentaho] = useState("SI");
  const [CKAN, setCKAN] = useState("SI");
  const [MongoDB, setMongoDB] = useState("SI");
  const [OpenDataSoft, setOpenDataSoft] = useState("SI");
  const [deleted, setDeleted] = useState("SI");
  const [lastUpdateAlmacenado, setLastUpdate] = React.useState<Dayjs | null>();
  const [creationDateAlmacenado, setCreationDate] = React.useState<Dayjs | null>();
  const {actualTheme} = useAlternateTheme();

  useEffect(() => {
    setUpdate(props.enviar.catalogue);
    setOpen(props.enviar.open);
    /*
    setSensitiveInformation(props.enviar.catalogue.sensitiveInformation);
    setIsUsing(props.enviar.catalogue.isUsing);
    setStructured(props.enviar.catalogue.structured);
    setGeoreference(props.enviar.catalogue.georeference);
    setPersonalData(props.enviar.catalogue.personalData);
    */
    setActiveAds(props.enviar.catalogue.activeAds);
    //setLastUpdate(props.enviar.catalogue.lastUpdate);
    //setCreationDate(props.enviar.catalogue.creationDate);
    setStep(1);
    getAndSetEntities();
  }, [props.enviar.open, props.enviar.catalogue]);

  const handleClose = () => {
    setOpen(false);
    setStep(1);
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
      const formatosDatosMod = formatosDatos.replace(/,/g, " / ");
      currentStepData.set("format", formatosDatosMod);
    }

    if (
      (lastUpdateAlmacenado !== undefined && lastUpdateAlmacenado !== null) &&
      (currentStepData.get("lastUpdate") !== null ||
        currentStepData.get("lastUpdate") !== undefined)
    ) {
      const lastUpdateDatos = lastUpdateAlmacenado.toString();
      currentStepData.set("lastUpdate", lastUpdateDatos);
    }

    if (
      (creationDateAlmacenado !== undefined && creationDateAlmacenado !== null) &&
      (currentStepData.get("creationDate") !== null ||
        currentStepData.get("creationDate") !== undefined)
    ) {
      const creationDateDatos = creationDateAlmacenado.toString();
      currentStepData.set("creationDate", creationDateDatos);
    }

    const currentStepJson = Object.fromEntries(currentStepData.entries());

    // Merge current step data with existing form data
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    console.log(formData);
    setStep(step + 1);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const currentStepData = new FormData(event.currentTarget);
    const currentStepJson = Object.fromEntries(currentStepData.entries());
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    const mergedFormData = {...formData, ...currentStepJson};
    console.log(mergedFormData);
    updateCatalogue(mergedFormData);
  };

  const handleSwitch = (nameSwitch: any, event: any) => {
    switch(nameSwitch){
      case "sensitiveInformation":
        if(sensitiveInformation==="SI") {
          setSensitiveInformation("NO"); 
          setUpdate((prevState) => ({ ...prevState, [sensitiveInformation]: "NO" }));
        }
        else {
          setSensitiveInformation("SI");
          setUpdate((prevState) => ({ ...prevState, [sensitiveInformation]: "SI" }));
        }
        break;
      case "isUsing":
        if(isUsing==="SI") {
          setIsUsing("NO");
          setUpdate((prevState) => ({ ...prevState, [isUsing]: "NO" }));
        }
        else {
          setIsUsing("SI");
          setUpdate((prevState) => ({ ...prevState, [isUsing]: "SI" }));
        }
        break;
      case "structured":
        if(structured==="SI") {
          setStructured("NO");
          setUpdate((prevState) => ({ ...prevState, [structured]: "NO" }));
        }
        else {
          setStructured("SI");
          setUpdate((prevState) => ({ ...prevState, [structured]: "SI" }));
        }
        break;
      case "georeference":
        if(georeference==="SI") {
          setGeoreference("NO");
          setUpdate((prevState) => ({ ...prevState, [georeference]: "NO" }));
        }
        else {
          setGeoreference("SI");
          setUpdate((prevState) => ({ ...prevState, [georeference]: "SI" }));
        }
        break;
      case "personalData":
        if(personalData==="SI") {
          setPersonalData("NO");
          setUpdate((prevState) => ({ ...prevState, [personalData]: "NO" }));
        }
        else {
          setPersonalData("SI");
          setUpdate((prevState) => ({ ...prevState, [personalData]: "SI" }));
        }
        break;
      case "activeAds":
        if(activeAds==="SI") {
          setActiveAds("NO");
          setUpdate((prevState) => ({ ...prevState, [activeAds]: "NO" }));
        }
        else {
          setActiveAds("SI");
          setUpdate((prevState) => ({ ...prevState, [activeAds]: "SI" }));
        }
        break;
      case "masterData":
        if(masterData==="SI") {
          setMasterData("NO");
          setUpdate((prevState) => ({ ...prevState, [masterData]: "NO" }));
        }
        else {
          setMasterData("SI");
          setUpdate((prevState) => ({ ...prevState, [masterData]: "SI" }));
        }
        break;
      case "referenceData":
        if(referenceData==="SI") {
          setReferenceData("NO");
          setUpdate((prevState) => ({ ...prevState, [referenceData]: "NO" }));
        }
        else {
          setReferenceData("SI");
          setUpdate((prevState) => ({ ...prevState, [referenceData]: "SI" }));
        }
        break;
      case "highValue":
        if(highValue==="SI") {
          setHighValue("NO");
          setUpdate((prevState) => ({ ...prevState, [highValue]: "NO" }));
        }
        else {
          setHighValue("SI");
          setUpdate((prevState) => ({ ...prevState, [highValue]: "SI" }));
        }
        break;
      case "genderInfo":
        if(genderInfo==="SI") {
          setGenderInfo("NO");
          setUpdate((prevState) => ({ ...prevState, [genderInfo]: "NO" }));
        }
        else {
          setGenderInfo("SI");
          setUpdate((prevState) => ({ ...prevState, [genderInfo]: "SI" }));
        }
        break;
      case "autoAcess":
        if(autoAcess==="SI") {
          setAutoAcess("NO");
          setUpdate((prevState) => ({ ...prevState, [autoAcess]: "NO" }));
        }
        else {
          setAutoAcess("SI");
          setUpdate((prevState) => ({ ...prevState, [autoAcess]: "SI" }));
        }
      break;
      case "RAT":
      if(RAT==="SI") {
        setRAT("NO");
        setUpdate((prevState) => ({ ...prevState, [RAT]: "NO" }));
      }
      else {
        setRAT("SI");
        setUpdate((prevState) => ({ ...prevState, [RAT]: "SI" }));
      }
      break;
      case "dataProtection":
      if(dataProtection==="SI") {
        setDataProtection("NO");
        setUpdate((prevState) => ({ ...prevState, [dataProtection]: "NO" }));
      }
      else {
        setDataProtection("SI");
        setUpdate((prevState) => ({ ...prevState, [dataProtection]: "SI" }));
      }
      break;
      case "dataStandards":
        if(dataStandards==="SI") {
          setDataStandards("NO");
          setUpdate((prevState) => ({ ...prevState, [dataStandards]: "NO" }));
        }
        else {
          setDataStandards("SI");
          setUpdate((prevState) => ({ ...prevState, [dataStandards]: "SI" }));
        }
        break;
      case "dataAnonymize":
        if(dataAnonymize==="SI") {
          setDataAnonymize("NO");
          setUpdate((prevState) => ({ ...prevState, [dataAnonymize]: "NO" }));
        }
        else {
          setDataAnonymize("SI");
          setUpdate((prevState) => ({ ...prevState, [dataAnonymize]: "SI" }));
        }
        break;
      case "sharedData":
        if(sharedData==="SI") {
          setSharedData("NO");
          setUpdate((prevState) => ({ ...prevState, [sharedData]: "NO" }));
        }
        else {
          setSharedData("SI");
          setUpdate((prevState) => ({ ...prevState, [sharedData]: "SI" }));
        }
        break;
      case "VLCi":
        if(VLCi==="SI") {
          setVLCi("NO");
          setUpdate((prevState) => ({ ...prevState, [VLCi]: "NO" }));
        }
        else {
          setVLCi("SI");
          setUpdate((prevState) => ({ ...prevState, [VLCi]: "SI" }));
        }
        break;
        
      case "ArcGIS":
        if(ArcGIS==="SI") {
          setArcGIS("NO");
          setUpdate((prevState) => ({ ...prevState, [ArcGIS]: "NO" }));
        }
        else {
          setArcGIS("SI");
          setUpdate((prevState) => ({ ...prevState, [ArcGIS]: "SI" }));
        }
        break;
        
      case "Pentaho":
        if(Pentaho==="SI") {
          setPentaho("NO");
          setUpdate((prevState) => ({ ...prevState, [Pentaho]: "NO" }));
        }
        else {
          setPentaho("SI");
          setUpdate((prevState) => ({ ...prevState, [Pentaho]: "SI" }));
        }
        break;
        
      case "CKAN":
        if(CKAN==="SI") {
          setCKAN("NO");
          setUpdate((prevState) => ({ ...prevState, [CKAN]: "NO" }));
        }
        else {
          setCKAN("SI");
          setUpdate((prevState) => ({ ...prevState, [CKAN]: "SI" }));
        }
        break;
        
      case "MongoDB":
        if(MongoDB==="SI") {
          setMongoDB("NO");
          setUpdate((prevState) => ({ ...prevState, [MongoDB]: "NO" }));
        }
        else {
          setMongoDB("SI");
          setUpdate((prevState) => ({ ...prevState, [MongoDB]: "SI" }));
        }
        break;
        
      case "OpenDataSoft":
        if(VLCi==="SI") {
          setOpenDataSoft("NO");
          setUpdate((prevState) => ({ ...prevState, [OpenDataSoft]: "NO" }));
        }
        else {
          setOpenDataSoft("SI");
          setUpdate((prevState) => ({ ...prevState, [OpenDataSoft]: "SI" }));
        }
        break;

    }
  };

  const handleFormat = (event: any, newValue: any) => {
    setFormat(newValue);
    console.log(newValue);
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

  const handleChangeLastUpdate = (value: any) => {
    setLastUpdate(value);
  };

  const handleChangeCreationDate = (value: any) => {
    setCreationDate(value);
  };

  const dynamicStyle = {
    backgroundColor: actualTheme === "light" ? "white" : "#252525",
    color: actualTheme === "light" ? "#252525" : "white",
    "& .MuiInputBase-root": { border: "none" },
  };

  function getAndSetEntities() {
    getEntitiesRequest(authHeader())
      .then((response) => response.json())
      .then((data) => {
        let notDeleted = data.filter((d: Entity) => d.deleted !== true).responsibleIdentityES;
        let deleted = data.filter((d: Entity) => d.deleted === true);
        //setEntities(notDeleted);
        setEntitiesName(notDeleted);
        setDeletedEntities(deleted);
        
      })
      .catch((error) => {
        console.error('Error fetching entities:', error);
      });
  }

  return (
    <>
    
    <ThemeProvider theme={baseTheme(actualTheme)}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        style={dynamicStyle}
      >
        <DialogTitle 
        style={dynamicStyle}
        >
          {t("dialog.updateRegister")}
        </DialogTitle>
        <DialogContent
          style={dynamicStyle}
        >
          <div className="dialogContentText">
            <span>{t("dialog.fillInfo")}</span>
            <span><b>{step}/7</b></span>
          </div>
          <Box>
          {step === 1 && (  // ESTRUCTURA GENERAL DEL DATASET
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
                  label={t("columnsNames.title")}
                  type="string"
                  variant="standard"
                  value={update.title}
                  onChange={handleChange}
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
                    label={t("columnsNames.description")}
                    type="string"
                    variant="standard"
                    value={update.description}
                    onChange={handleChange}
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
                    label={t("columnsNames.responsibleIdentity")}
                    type="string"
                    variant="standard"
                    value={update.responsibleIdentity}
                    onChange={handleChange}
                  />
                  {/* 
                    <FormControl variant="standard">
                      <Select
                        id="responsibleIdentity"
                        name="responsibleIdentity"
                        margin="dense"
                        defaultValue={update.responsibleIdentity}
                        //onChange={(e) => handleChange('language', e.target.value)}
                        //required
                      >
                        {entitiesName.map((entityName, index) => (
                          <MenuItem key={index} value={entityName}>
                            {entityName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    */}
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
                    label={t("columnsNames.topic")}
                    type="string"
                    variant="standard"
                    value={update.topic}
                    onChange={handleChange}
                  />
                </div>
                <div className="horizontalForm">
                  <p>
                  Organismo
                  </p>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="organism"
                    name="organism"
                    label="organismo"
                    type="string"
                    variant="standard"
                    value={update.organism}
                    onChange={handleChange}
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
                        defaultValue={update.language}
                        //onChange={(e) => handleChange('language', e.target.value)}
                        required
                      >
                        <MenuItem value={"es"}>ES</MenuItem>
                        <MenuItem value={"val"}>VAL</MenuItem>
                      </Select>
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
          {step === 2 && ( // ESTRUCTURA GENERAL DEL DATASET
            <form onSubmit={handleNext}>
            <div className="verticalForm">
              <div className="horizontalForm">
                <p>
                Palabras clave
                </p>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="keywords"
                  name="keywords"
                  label="Palabras clave"
                  type="string"
                  variant="standard"
                  value={update.keyWords}
                  onChange={handleChange}
                />
              </div>
              <div className="horizontalForm">
                <p>
                Campos mínimos
                </p>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="minimumVariables"
                  name="minimumVariables"
                  label="Campos mínimos"
                  type="string"
                  variant="standard"
                  value={update.minimumVariables}
                  onChange={handleChange}
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
                  label={t("columnsNames.contactPerson")}
                  type="string"
                  variant="standard"
                  value={update.contactPerson}
                  onChange={handleChange}
                />
              </div>
              <div className="horizontalFormSwitch">
                <p>
                Dato maestro
                </p>
                {/* <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="masterData"
                  name="masterData"
                  label="Dato maestro"
                  type="string"
                  variant="standard"
                  value={update.masterData}
                  onChange={handleChange}
                /> */}
                <Switch
                    id="masterData"
                    name="masterData"
                    value={masterData}
                    checked={masterData === "SI"}
                    onChange={(event) => handleSwitch("masterData", event.target.checked)} 
                    color="primary" // Opcional: ajusta el color del switch
                  />  
              </div>
              <div className="horizontalFormSwitch">
                <p>
                Dato de referencia
                </p>
                {/* <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="referenceData"
                  name="referenceData"
                  label="Dato de referencia"
                  type="string"
                  variant="standard"
                  value={update.referenceData}
                  onChange={handleChange}
                /> */}
                <Switch
                    id="referenceData"
                    name="referenceData"
                    value={referenceData}
                    checked={referenceData === "SI"}
                    onChange={(event) => handleSwitch("referenceData", event.target.checked)} 
                    color="primary" // Opcional: ajusta el color del switch
                  />  
              </div>
              <div className="horizontalFormSwitch">
                <p>
                Alto valor
                </p>
                {/* <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="highValue"
                  name="highValue"
                  label="Dato maestro"
                  type="string"
                  variant="standard"
                  value={update.highValue}
                  onChange={handleChange}
                /> */}
                <Switch
                    id="highValue"
                    name="highValue"
                    value={highValue}
                    checked={highValue === "SI"}
                    onChange={(event) => handleSwitch("highValue", event.target.checked)} 
                    color="primary" // Opcional: ajusta el color del switch
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
              <div className="horizontalForm">
                <p>
                Comentarios generales
                </p>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="comments"
                  name="comments"
                  label="Comentarios generales"
                  type="string"
                  variant="standard"
                  value={update.comments}
                  onChange={handleChange}
                />
              </div>
              {/*
              <div className="horizontalForm">
                <p>
                {t("columnsNames.lastUpdate")}
                </p>
                <DateTimePicker 
                  format="DD/MM/YYYY hh:mm:ss a"
                  name="lastUpdate"
                  value={lastUpdateAlmacenado}
                  onChange={(e) =>
                    handleChangeLastUpdate(e)
                  }
                  slotProps={{ textField: { variant: "standard", id:"lastUpdate" } }}
                >
                </DateTimePicker>
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
                            sx={{
                              color: actualTheme === 'light' ? "black" : "white",
                            }}
                          />
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="format"
                          variant="standard"
                          placeholder="Select formats"
                          sx={{
                            color: actualTheme === 'light' ? "black" : "white",
                          }}
                        />
                      )}
                    />
                  </FormGroup>
                </FormControl>
              </div>
              */}
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
                  }}>{t("dialog.next")}
                </Button>
              </div>
            </div>
            </form>
          )}
          {step === 3 && ( // ESTRUCTURA INTERNA DEL DATASET
            <form onSubmit={handleNext}>
            <div className="verticalForm">
              <div className="horizontalForm">
                <p>
                Información geográfica
                </p>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="typeGeo"
                  name="typeGeo"
                  label="Información geográfica"
                  type="string"
                  variant="standard"
                  value={update.typeGeo}
                  onChange={handleChange}
                />
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
                  label={t("columnsNames.territorialScope")}
                  type="string"
                  variant="standard"
                  value={update.territorialScope}
                  onChange={handleChange}
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
                  label={t("columnsNames.temporaryCoverage")}
                  type="string"
                  variant="standard"
                  value={update.temporaryCoverage}
                  onChange={handleChange}
                />
              </div>
              <div className="horizontalFormSwitch">
                <p>
                Información de género
                </p>
                {/* <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="genderInfo"
                  name="genderInfo"
                  label="Información de género"
                  type="string"
                  variant="standard"
                  value={update.genderInfo}
                  onChange={handleChange}
                /> */}
                <Switch
                    id="genderInfo"
                    name="genderInfo"
                    value={genderInfo}
                    checked={genderInfo === "SI"}
                    onChange={(event) => handleSwitch("genderInfo", event.target.checked)} 
                    color="primary" // Opcional: ajusta el color del switch
                  />
              </div>
              <div className="horizontalForm">
                <p>
                Comentario de la estructura
                </p>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="structuredComments"
                  name="structuredComments"
                  label="Comentario de la estructura"
                  type="string"
                  variant="standard"
                  value={update.structuredComments}
                  onChange={handleChange}
                />
              </div>
              {/*
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
                    defaultValue={update.accessType}
                    onChange={(e) => handleChange}
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
                  label="Relación interna"
                  type="string"
                  variant="standard"
                  value={update.internalRelationship}
                  onChange={handleChange}
                />
              </div>
              */}
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
                  }}>{t("dialog.next")}
                </Button>
              </div>
            </div>
            </form>
          )}
          {step === 4 && ( // APLICACIÓN DE ORIGEN DE LOS DATOS
            <form onSubmit={handleNext}>
            <div className="verticalForm">
              <div className="horizontalForm">
                <p>
                Aplicación de origen
                </p>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="associatedApplication"
                  name="associatedApplication"
                  label="Aplicación de origen"
                  type="string"
                  variant="standard"
                  value={update.associatedApplication}
                  onChange={handleChange}
                />
              </div>
              <div className="horizontalFormSwitch">
                <p>
                Acceso automatizado
                </p>
                {/* <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="autoAcess"
                  name="autoAcess"
                  label="Acceso automatizado"
                  type="string"
                  variant="standard"
                  value={update.autoAcess}
                  onChange={handleChange}
                /> */}
                <Switch
                    id="autoAcess"
                    name="autoAcess"
                    value={autoAcess}
                    checked={autoAcess === "SI"}
                    onChange={(event) => handleSwitch("autoAcess", event.target.checked)} 
                    color="primary" // Opcional: ajusta el color del switch
                  />
              </div>
              <div className="horizontalForm">
                <p>
                Comentarios del origen
                </p>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="originComments"
                  name="originComments"
                  label="Comentarios del origen"
                  type="string"
                  variant="standard"
                  value={update.originComments}
                  onChange={handleChange}
                />
              </div>
              {/*
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
                  label={t("columnsNames.comments")}
                  type="string"
                  variant="standard"
                  value={update.comments}
                  onChange={handleChange}
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
                  label="Efecto temporal"
                  type="string"
                  variant="standard"
                  value={update.timmingEffect}
                  onChange={handleChange}
                />
              </div>
              */}
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
                  }}>{t("dialog.next")}
                </Button>
              </div>
            </div>
            </form>
          )}
          {step===5 && ( // ESTADO DE LA CARGA DEL DATASET EN LAS DIFERENTES PLATAFORMAS
            <form onSubmit={handleNext}>
              <div className="verticalForm">
                <div className="horizontalFormSwitch">
                  <p>
                  RAT
                  </p>
                  {/* <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="RAT"
                    name="RAT"
                    label="RAT"
                    type="string"
                    variant="standard"
                    value={update.RAT}
                    onChange={handleChange}
                  /> */}
                  <Switch
                    id="RAT"
                    name="RAT"
                    value={RAT}
                    checked={RAT === "SI"}
                    onChange={(event) => handleSwitch("RAT", event.target.checked)} 
                    color="primary" // Opcional: ajusta el color del switch
                  />
                </div>
                <div className="horizontalFormSwitch">
                  <p>
                  Protección de datos
                  </p>
                  {/* <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="dataProtection"
                    name="dataProtection"
                    label="Protección de datos"
                    type="string"
                    variant="standard"
                    value={update.dataProtection}
                    onChange={handleChange}
                  /> */}
                  <Switch
                  id="dataProtection"
                  name="dataProtection"
                  value={dataProtection}
                  checked={dataProtection === "SI"}
                  onChange={(event) => handleSwitch("dataProtection", event.target.checked)} 
                  color="primary" // Opcional: ajusta el color del switch
                />
                </div>
                <div className="horizontalFormSwitch">
                  <p>
                  Estándares de datos
                  </p>
                  {/* <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="dataStandards"
                    name="dataStandards"
                    label="Estándares de datos"
                    type="string"
                    variant="standard"
                    value={update.dataStandards}
                    onChange={handleChange}
                  /> */}
                  <Switch
                  id="dataStandards"
                  name="dataStandards"
                  value={dataStandards}
                  checked={dataStandards === "SI"}
                  onChange={(event) => handleSwitch("dataStandards", event.target.checked)} 
                  color="primary" // Opcional: ajusta el color del switch
                />
                </div>
                <div className="horizontalForm">
                  <p>
                  Comentarios del origen
                  </p>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="dataProtectionComments"
                    name="dataProtectionComments"
                    label="Comentarios del origen"
                    type="string"
                    variant="standard"
                    value={update.dataProtectionComments}
                    onChange={handleChange}
                  />
                </div>
                <div className="horizontalFormSwitch">
                  <p>
                  Anonimización de datos
                  </p>
                  {/* <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="dataAnonymize"
                    name="dataAnonymize"
                    label="Anonimización de datos"
                    type="string"
                    variant="standard"
                    value={update.dataAnonymize}
                    onChange={handleChange}
                  /> */}
                  <Switch
                  id="dataAnonymize"
                  name="dataAnonymize"
                  value={dataAnonymize}
                  checked={dataAnonymize === "SI"}
                  onChange={(event) => handleSwitch("dataAnonymize", event.target.checked)} 
                  color="primary" // Opcional: ajusta el color del switch
                />
                </div>
                <div className="horizontalForm">
                  <p>
                  Calidad de los datos
                  </p>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="dataQuality"
                    name="dataQuality"
                    label="Calidad de los datos"
                    type="string"
                    variant="standard"
                    value={update.dataQuality}
                    onChange={handleChange}
                  />
                </div>
                <div className="horizontalForm">
                  <p>
                  Nivel de compartición
                  </p>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="sharingLevel"
                    name="sharingLevel"
                    label="Nivel de compartición"
                    type="string"
                    variant="standard"
                    value={update.sharingLevel}
                    onChange={handleChange}
                  />
                </div>
                <div className="horizontalFormSwitch">
                  <p>
                  Datos compartidos
                  </p>
                  {/* <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="sharedData"
                    name="sharedData"
                    label="Datos compartidos"
                    type="string"
                    variant="standard"
                    value={update.sharedData}
                    onChange={handleChange}
                  /> */}
                  <Switch
                  id="sharedData"
                  name="sharedData"
                  value={sharedData}
                  checked={sharedData === "SI"}
                  onChange={(event) => handleSwitch("sharedData", event.target.checked)} 
                  color="primary" // Opcional: ajusta el color del switch
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
                  }}>{t("dialog.next")}
                </Button>
              </div>
            </div>
            </form>
          )}
          {step===6 && ( // ESTADO DE LA CARGA DEL DATASET EN LAS DIFERENTES PLATAFORMAS
            <form onSubmit={handleNext}>
              <div className="verticalForm">
                <div className="horizontalFormSwitch">
                  <p>
                  VLCi
                  </p>
                  {/* <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="VLCi"
                    name="VLCi"
                    label="VLCi"
                    type="string"
                    variant="standard"
                    value={update.VLCi}
                    onChange={handleChange}
                  /> */}
                  <Switch
                  id="VLCi"
                  name="VLCi"
                  value={VLCi}
                  checked={VLCi === "SI"}
                  onChange={(event) => handleSwitch("VLCi", event.target.checked)} 
                  color="primary" // Opcional: ajusta el color del switch
                />
                </div>
                <div className="horizontalFormSwitch">
                  <p>
                  ArcGIS
                  </p>
                  {/* <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="ArcGIS"
                    name="ArcGIS"
                    label="ArcGIS"
                    type="string"
                    variant="standard"
                    value={update.ArcGIS}
                    onChange={handleChange}
                  /> */}
                  <Switch
                  id="ArcGIS"
                  name="ArcGIS"
                  value={ArcGIS}
                  checked={ArcGIS === "SI"}
                  onChange={(event) => handleSwitch("ArcGIS", event.target.checked)} 
                  color="primary" // Opcional: ajusta el color del switch
                />
                </div>
                <div className="horizontalFormSwitch">
                  <p>
                  Pentaho
                  </p>
                  {/* <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="Pentaho"
                    name="Pentaho"
                    label="Pentaho"
                    type="string"
                    variant="standard"
                    value={update.Pentaho}
                    onChange={handleChange}
                  /> */}
                  <Switch
                  id="Pentaho"
                  name="Pentaho"
                  value={Pentaho}
                  checked={Pentaho === "SI"}
                  onChange={(event) => handleSwitch("Pentaho", event.target.checked)} 
                  color="primary" // Opcional: ajusta el color del switch
                />
                </div>
                <div className="horizontalFormSwitch">
                  <p>
                  CKAN
                  </p>
                  {/* <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="CKAN"
                    name="CKAN"
                    label="CKAN"
                    type="string"
                    variant="standard"
                    value={update.CKAN}
                    onChange={handleChange}
                  /> */}
                  <Switch
                  id="CKAN"
                  name="CKAN"
                  value={CKAN}
                  checked={CKAN === "SI"}
                  onChange={(event) => handleSwitch("CKAN", event.target.checked)} 
                  color="primary" // Opcional: ajusta el color del switch
                />
                </div>
                <div className="horizontalFormSwitch">
                  <p>
                  MongoDB
                  </p>
                  {/* <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="MongoDB"
                    name="MongoDB"
                    label="MongoDB"
                    type="string"
                    variant="standard"
                    value={update.MongoDB}
                    onChange={handleChange}
                  /> */}
                  <Switch
                  id="MongoDB"
                  name="MongoDB"
                  value={MongoDB}
                  checked={MongoDB === "SI"}
                  onChange={(event) => handleSwitch("MongoDB", event.target.checked)} 
                  color="primary" // Opcional: ajusta el color del switch
                />
                </div>
                <div className="horizontalFormSwitch">
                  <p>
                  OpenDataSoft
                  </p>
                  {/* <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="OpenDataSoft"
                    name="OpenDataSoft"
                    label="OpenDataSoft"
                    type="string"
                    variant="standard"
                    value={update.OpenDataSoft}
                    onChange={handleChange}
                  /> */}
                  <Switch
                  id="OpenDataSoft"
                  name="OpenDataSoft"
                  value={OpenDataSoft}
                  checked={OpenDataSoft === "SI"}
                  onChange={(event) => handleSwitch("OpenDataSoft", event.target.checked)} 
                  color="primary" // Opcional: ajusta el color del switch
                />
                </div>
                <div className="horizontalForm">
                  <p>
                  Resolución temporal
                  </p>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="temporarySolution"
                    name="temporarySolution"
                    label="Resolución temporal"
                    type="string"
                    variant="standard"
                    value={update.temporarySolution}
                    onChange={handleChange}
                  />
                </div>
                <div className="horizontalForm">
                  <p>
                  Comentarios sobre el estado de carga
                  </p>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="chargeStateComments"
                    name="chargeStateComments"
                    label="Comentarios sobre el estado de carga"
                    type="string"
                    variant="standard"
                    value={update.chargeStateComments}
                    onChange={handleChange}
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
                  }}>{t("dialog.next")}
                </Button>
              </div>
            </div>
            </form>
          )}
          {step === 7 && ( // VISUALIZACIONES/APLICACIONES CREADAS A PARTIR DEL DATASET
            <form onSubmit={handleSubmit}>
            <div className="verticalForm">
            <div className="horizontalForm">
                <p>Fecha de creación</p>
                <DateTimePicker 
                  format="DD/MM/YYYY hh:mm:ss a"
                  name="creationDate"
                  value={creationDateAlmacenado}
                  onChange={(e) =>
                    handleChangeCreationDate(e)
                  }
                  slotProps={{ textField: { variant: "standard", id:"creationDate" } }}
                >

                </DateTimePicker>
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
                  label={t("columnsNames.source")}
                  type="string"
                  variant="standard"
                  value={update.source}
                  onChange={handleChange}
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
                  label={t("columnsNames.responsibleIdentity")}
                  type="string"
                  variant="standard"
                  value={update.responsibleIdentity}
                  onChange={handleChange}
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
                  }}>{t("dialog.addButton")}</Button>
              </div>
            </div>
            </form>
            
              
          )}
          </Box>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
    </ThemeProvider>
    </>
  );
}
