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
import { 
  Autocomplete, 
  Box, 
  Checkbox, 
  FormControl, 
  FormControlLabel, 
  FormGroup, 
  InputLabel, 
  MenuItem, 
  Select, 
  Switch,
  ThemeProvider,
  createTheme, } from "@mui/material";

import { useTranslation } from "react-i18next";
import React from "react";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import { grey, red } from "@mui/material/colors";
import { esES } from "@mui/x-data-grid";
import { CalendarIcon, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import 'dayjs/locale/es';
import { debug } from "console";
export interface UpdateDialogData {
  open: boolean;
  closeDialog: (a: boolean) => void;
  getInfo: () => void;
  catalogue: Catalogue;
}
const baseTheme = (actualTheme:any) => createTheme(
  {
    typography: {
      fontFamily: "Montserrat",
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            color: actualTheme === 'light' ? "black" : "white",
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: `
        @font-face {
          font-family: 'Montserrat';
          src: url(https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap);
        }
      `,
      },
      MuiInput: {
        styleOverrides: {
          root: {
            color: actualTheme === 'light' ? "black" : "white",
          },
          
        },
      },
      MuiSelect: {
        defaultProps: {
          variant: 'standard', // Set the default variant (outlined, filled, standard)
        },
        styleOverrides: {
          icon: {
            color: actualTheme === 'light' ? "black" : "white", // Set the color of the dropdown arrow icon
          },
          // Add other styles as needed
        },
      },
      MuiMenuList:{
        styleOverrides:{
          'root':{
            //backgroundColor: actualTheme === 'light' ? "white" : "black", 
            color: actualTheme === 'light' ? "black" : "white",
          },
        },
      },
      MuiMenuItem:{
        styleOverrides:{
          root:{
            //backgroundColor: actualTheme === 'light' ? "white" : "black", 
            color: actualTheme === 'light' ? "black" : "white",
          }
        }
      },
    },
    palette:{
      mode: actualTheme==="light" ? "light" : "dark",
      ...(actualTheme === 'light'
      ? {
          // palette values for light mode
          primary: grey,
          divider: grey[800],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: grey,
          divider: grey[800],
          background: {
            default: grey[800],
            paper: grey[900],
          },
          text: {
            primary: grey[100],
            secondary: grey[800],
          },
        }),
    },
    
  },
  esES
);

export default function UpdateCatalogueDialog(props: {
  enviar: UpdateDialogData;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const authHeader = useAuthHeader();
  const [update, setUpdate] = useState<UpdateCatalogue>({});
  const [t, i18n] = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [formDataSteps, setFormDataSteps] = useState({
    title: "",
    description: "",
    language: "",
    territorialScope: "",
    temporaryCoverage: "",
    updateFrequency: "",
    topic: "",
    lastUpdate: "",
    format: "",
    distribution: "",
    sensitiveInformation: "",
    isUsing: "",
    accessType: "",
    internalRelationship: "",
    contactPerson: "",
    structured: "",
    associatedApplication: "",
    georreference: "",
    comments: "",
    timmingEffect: "",
    creationDate: "",
    personalData: "",
    source: "",
    responsibleIdentity: "",
    activeAds: "",
  });
  const [formato, setFormat] = React.useState<string[]>([]);
  const [sensitiveInformation, setSensitiveInformation] = useState("SI");
  const [isUsing, setIsUsing] = useState("SI");
  const [structured, setStructured] = useState("SI");
  const [georeference, setGeoreference] = useState("SI");
  const [personalData, setPersonalData] = useState("SI");
  const [activeAds, setActiveAds] = useState("SI");
  const [lastUpdateAlmacenado, setLastUpdate] = React.useState<Dayjs | null>();
  const [creationDateAlmacenado, setCreationDate] = React.useState<Dayjs | null>();
  const {actualTheme} = useAlternateTheme();
  

  useEffect(() => {
    setUpdate(props.enviar.catalogue);
    setOpen(props.enviar.open);
    setSensitiveInformation(props.enviar.catalogue.sensitiveInformation);
    setIsUsing(props.enviar.catalogue.isUsing);
    setStructured(props.enviar.catalogue.structured);
    setGeoreference(props.enviar.catalogue.georeference);
    setPersonalData(props.enviar.catalogue.personalData);
    setActiveAds(props.enviar.catalogue.activeAds);
    setFormat(props.enviar.catalogue.format.split(" / "));
    console.log("last update: " + props.enviar.catalogue.lastUpdate);
    console.log("creation date: " + props.enviar.catalogue.creationDate);
    setStep(1);
  }, [props.enviar.open, props.enviar.catalogue]);

  const handleClose = () => {
    setFormData({});
    setFormDataSteps({
      title: "",
      description: "",
      language: "",
      territorialScope: "",
      temporaryCoverage: "",
      updateFrequency: "",
      topic: "",
      lastUpdate: "",
      format: "",
      distribution: "",
      sensitiveInformation: "",
      isUsing: "",
      accessType: "",
      internalRelationship: "",
      contactPerson: "",
      structured: "",
      associatedApplication: "",
      georreference: "",
      comments: "",
      timmingEffect: "",
      creationDate: "",
      personalData: "",
      source: "",
      responsibleIdentity: "",
      activeAds: "",
    });
    setStep(1);
    setSensitiveInformation("SI");
    setIsUsing("SI");
    setStructured("SI");
    setGeoreference("SI");
    setPersonalData("SI");
    setActiveAds("SI");
    setFormat([]);
    setLastUpdate(null);
    setCreationDate(null);
    setOpen(false);
    setStep(1);
    props.enviar.closeDialog(false);
  };
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdate((prevState) => ({ ...prevState, [name]: value }));
  };
  /*
  const handleChange = (field: string, value: string) => {
    // Update the form data
    setFormDataSteps((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
*/
  const updateCatalogue = (formJson: any) => {
    const a = formJson.lastUpdate;
    const b = formJson.creationDate;
    const deletedDate = new Date();
    const deleted = false;
    const lastUpdate = new Date(a);
    const creationDate = new Date(b);
    const prueba = formJson as UpdateCatalogue;
    const formatosDatos = formato.toString();
    const format = formatosDatos.replace(/,/g, " / ");
    setUpdate({
      ...prueba,
      format,
      deleted,
      deletedDate,
      lastUpdate,
      creationDate,
    });

    update.format=format;
    
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

    if(step==2 && (formato!==undefined || formato !== null) && (currentStepData.get("format")!==null || currentStepData.get("format")!==undefined)){
      const formatosDatos = formato.toString();
      const formatosDatosMod = formatosDatos.replace(/,/g, " / ");
      currentStepData.set("format", formatosDatosMod);
      console.log("Step 2: " + formatosDatosMod);
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
    
    setFormDataSteps((prevData) => ({ ...prevData, ...currentStepJson }));

    // Merge current step data with existing form data
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    setStep(step + 1);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentStepData = new FormData(event.currentTarget);
    const formatosDatos = formato.toString();
    const formatosDatosMod = formatosDatos.replace(/,/g, " / ");
    currentStepData.set("format", formatosDatosMod);
  
    const currentStepJson = Object.fromEntries(currentStepData.entries());
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    const mergedFormData = {...formData, ...currentStepJson};
    
    
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
    }
  };

  const handleFormat = (event: any, newValue: any) => {
    setFormat([]);
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

  const handleValueDateTime = (picker: any) => {
    if(picker === "lastUpdate" && update.lastUpdate !== undefined){
      const dateObject = new Date(update.lastUpdate);
      const formatDate = dateObject.toISOString();
      const dateObj = dayjs(formatDate);
      return dateObj;
    } else if(picker === "creationDate" && update.creationDate !== undefined){
      const dateObject = new Date(update.creationDate);
      const formatDate = dateObject.toISOString();
      const dateObj = dayjs(formatDate);
      return dateObj;
    }
  }

  const handleChangeLastUpdate = (value: any) => {
    const dayjs = require('dayjs');
    const utc = require('dayjs/plugin/utc');
    const timezone = require('dayjs/plugin/timezone');

    //---------------------------
    dayjs.extend(utc);          
    dayjs.extend(timezone);
    //---------------------------

    const dayjsLocal = dayjs(value);
    const dateIsoString = dayjsLocal.toISOString();

    setLastUpdate(dateIsoString);
    setUpdate((prevState) => ({ ...prevState, ["lastUpdate"]: dateIsoString }));
  };

  const handleChangeCreationDate = (value: any) => {
    const dayjs = require('dayjs');
    const utc = require('dayjs/plugin/utc');
    const timezone = require('dayjs/plugin/timezone');

    //---------------------------
    dayjs.extend(utc);          
    dayjs.extend(timezone);
    //---------------------------

    const dayjsLocal = dayjs(value);
    const dateIsoString = dayjsLocal.toISOString();

    setCreationDate(value);
    setUpdate((prevState) => ({ ...prevState, ["creationDate"]: dateIsoString }));
  };

  return (
    <>
    <ThemeProvider theme={baseTheme(actualTheme)}>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <Dialog
        fullWidth={true}
        open={open}
        //onClose={handleClose}
      >
        <DialogTitle>{t("dialog.updateRegister")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <div className="dialogContentText" style={{color: actualTheme==="light" ? "#252525" : "white"}}>
            <span>{t("dialog.fillInfo")}</span>
            <span><b>{step}/5</b></span>
          </div>
          </DialogContentText>
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
                  type="string"
                  variant="standard"
                  value={update.description}
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
                  margin="dense"
                  id="territorialScope"
                  name="territorialScope"
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
                  margin="dense"
                  id="temporaryCoverage"
                  name="temporaryCoverage"
                  type="string"
                  variant="standard"
                  value={update.temporaryCoverage}
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
                  margin="dense"
                  id="updateFrequency"
                  name="updateFrequency"
                  type="string"
                  variant="standard"
                  value={update.updateFrequency}
                  onChange={handleChange}
                />
              </div>
              <div className="horizontalForm">
                <p>
                {t("columnsNames.topic")}
                </p>
                <TextField
                  autoFocus
                  margin="dense"
                  id="topic"
                  name="topic"
                  type="string"
                  variant="standard"
                  value={update.topic}
                  onChange={handleChange}
                />
              </div>
              <div className="horizontalForm">
                <p>
                {t("columnsNames.lastUpdate")}
                </p>
                
                <FormControl variant="standard">
                  <DateTimePicker 
                    views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                    format="YYYY/MM/DD hh:mm:ss a"
                    name="lastUpdate"
                    value={handleValueDateTime("lastUpdate")}
                    onChange={(e) =>
                      handleChangeLastUpdate(e)
                    }
                    slotProps={{ textField: { variant: "standard", id:"lastUpdate" } }}
                  >

                  </DateTimePicker>
                </FormControl>
                {/*
                <TextField
                  autoFocus
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
                */}
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
                      value={formato}
                      onChange={handleFormat}
                      disableCloseOnSelect={true}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <FormControlLabel
                            control={
                            <Checkbox 
                            checked={selected} 
                            sx={{
                              color: actualTheme === 'light' ? "black" : "white",
                            }}
                            />}
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
              <div className="horizontalForm">
                <p>
                Distribución
                </p>
                <TextField
                  autoFocus
                  margin="dense"
                  id="distribution"
                  name="distribution"
                  type="string"
                  variant="standard"
                  value={update.distribution}
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
                    defaultValue={update.accessType}
                    onChange={(e) => handleChange}
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
                  margin="dense"
                  id="internalRelationship"
                  name="internalRelationship"
                  type="string"
                  variant="standard"
                  value={update.internalRelationship}
                  onChange={handleChange}
                />
              </div>
              <div className="horizontalForm">
                <p>
                {t("columnsNames.contactPerson")}
                </p>
                <TextField
                  autoFocus
                  margin="dense"
                  id="contactPerson"
                  name="contactPerson"
                  type="string"
                  variant="standard"
                  value={update.contactPerson}
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
                  margin="dense"
                  id="associatedApplication"
                  name="associatedApplication"
                  type="string"
                  variant="standard"
                  value={update.associatedApplication}
                  onChange={handleChange}
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
                  margin="dense"
                  id="comments"
                  name="comments"
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
                  margin="dense"
                  id="timmingEffect"
                  name="timmingEffect"
                  type="string"
                  variant="standard"
                  value={update.timmingEffect}
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
          {step === 5 && (
            <form onSubmit={handleSubmit}>
            <div className="verticalForm">
            <div className="horizontalForm">
                <p>
                Fecha de creación
                </p>
                <FormControl variant="standard">
                  <DateTimePicker 
                    views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                    format="YYYY/MM/DD hh:mm:ss a"
                    name="creationDate"
                    value={handleValueDateTime("creationDate")}
                    onChange={(e) =>
                      handleChangeCreationDate(e)
                    }
                    slotProps={{ textField: { variant: "standard", id:"creationDate" } }}
                  >
                    
                  </DateTimePicker>
                </FormControl>
                {/*
                <TextField
                  autoFocus
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
                */}
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
                  margin="dense"
                  id="source"
                  name="source"
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
                  type="string"
                  variant="standard"
                  value={update.responsibleIdentity}
                  onChange={handleChange}
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
        <DialogActions>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
    </ThemeProvider>
    </>
  );
}
