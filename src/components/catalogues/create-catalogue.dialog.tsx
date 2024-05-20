import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { CreateCatalogue } from "../../interfaces/catalogue.interface";
import { createCatalogueRequest } from "../../api/catalogues";
import { useAuthHeader } from "react-auth-kit";
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  Switch,
  ThemeProvider,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import "./create-catalogue.dialog.css";
import React from "react";
import { CalendarIcon, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from "dayjs";
import baseTheme from "../darkModeSwitch/darkmodeTheme";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";

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
const formatOptions = ["PDF", "EXCEL", "CSV"];

export default function CreateCatalogueDialog(props: { enviar: DialogData }) {
  const [open, setOpen] = useState<boolean>(false);
  const authHeader = useAuthHeader();
  const [t, i18n] = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  /* const [formDataSteps, setFormDataSteps] = useState({
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
  }); */
  const [formDataSteps, setFormDataSteps] = useState({
    title: '',
    description: '',
    responsibleIdentity: '',
    topic: '',
    territorialScope: '',
    temporaryCoverage: '',
    organism: '',
    language: '',
    keyWords: '',
    minimumVariables: '',
    contactPerson: '',
    masterData: '',
    referenceData: '',
    highValue: '',
    activeAds: '',
    comments: '',
    typeGeo: '',
    genderInfo: '',
    structuredComments: '',
    associatedApplication: '',
    autoAcess: '',
    originComments: '',
    RAT: '',
    dataProtection: '',
    dataStandards: '',
    dataProtectionComments: '',
    dataAnonymize: '',
    dataQuality: 0,
    sharingLevel: '',
    sharedData: '',
    VLCi: '',
    ArcGIS: '',
    Pentaho: '',
    CKAN: '',
    MongoDB: '',
    OpenDataSoft: '',
    temporarySolution: '',
    chargeStateComments: '',
    productData: '',
    productComments: '',
  });
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
  const [format, setFormat] = React.useState<string[]>([]);
  const [lastUpdateAlmacenado, setLastUpdate] = React.useState<Dayjs | null>();
  const [creationDateAlmacenado, setCreationDate] = React.useState<Dayjs | null>();
  const {actualTheme} = useAlternateTheme();

  useEffect(() => {
    setOpen(props.enviar.open);
  }, [props]);

  const handleClose = () => {
    setFormData({});
    /* setFormDataSteps({
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
    }); */
    setFormDataSteps({
      title: '',
      description: '',
      responsibleIdentity: '',
      topic: '',
      territorialScope: '',
      temporaryCoverage: '',
      organism: '',
      language: '',
      keyWords: '',
      minimumVariables: '',
      contactPerson: '',
      masterData: '',
      referenceData: '',
      highValue: '',
      activeAds: '',
      comments: '',
      typeGeo: '',
      genderInfo: '',
      structuredComments: '',
      associatedApplication: '',
      autoAcess: '',
      originComments: '',
      RAT: '',
      dataProtection: '',
      dataStandards: '',
      dataProtectionComments: '',
      dataAnonymize: '',
      dataQuality: 0,
      sharingLevel: '',
      sharedData: '',
      VLCi: '',
      ArcGIS: '',
      Pentaho: '',
      CKAN: '',
      MongoDB: '',
      OpenDataSoft: '',
      temporarySolution: '',
      chargeStateComments: '',
      productData: '',
      productComments: '',
    })
    setStep(1);
    setSensitiveInformation("SI");
    setIsUsing("SI");
    setStructured("SI");
    setGeoreference("SI");
    setPersonalData("SI");
    setActiveAds("SI");
    setMasterData("SI");
    setReferenceData("SI");
    setHighValue("SI");
    setActiveAds("SI");
    setAutoAcess("SI");
    setRAT("SI");
    setDataProtection("SI");
    setDataStandards("SI");
    setDataAnonymize("SI");
    setSharedData("SI");
    setVLCi("SI");
    setArcGIS("SI");
    setPentaho("SI");
    setCKAN("SI");
    setMongoDB("SI");
    setOpenDataSoft("SI");
    setFormat([]);
    setLastUpdate(null);
    setCreationDate(null);
    setOpen(false);
    props.enviar.closeDialog(false);
  };

  const handleFormat = (event: any, newValue: any) => {
    setFormat(newValue);
    console.log(newValue);
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
  };

  const handleNext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Collect form data for the current step
    const currentStepData = new FormData(event.currentTarget);
    if (currentStepData.get("sensitiveInformation") !== "on") {
      currentStepData.set("sensitiveInformation", "NO");
    } else {
      currentStepData.set("sensitiveInformation", "SI");
    }

    if (currentStepData.get("isUsing") !== "on") {
      currentStepData.set("isUsing", "NO");
    } else {
      currentStepData.set("isUsing", "SI");
    }

    if (currentStepData.get("structured") !== "on") {
      currentStepData.set("structured", "NO");
    } else {
      currentStepData.set("structured", "SI");
    }

    if (currentStepData.get("georeference") !== "on") {
      currentStepData.set("georeference", "NO");
    } else {
      currentStepData.set("georeference", "SI");
    }

    if (currentStepData.get("personalData") !== "on") {
      currentStepData.set("personalData", "NO");
    } else {
      currentStepData.set("personalData", "SI");
    }

    if (currentStepData.get("activeAds") !== "on") {
      currentStepData.set("activeAds", "NO");
    } else {
      currentStepData.set("activeAds", "SI");
    }

    if (currentStepData.get("masterData") !== "on") {
      currentStepData.set("masterData", "NO");
    } else {
      currentStepData.set("masterData", "SI");
    }

    if (currentStepData.get("referenceData") !== "on") {
      currentStepData.set("referenceData", "NO");
    } else {
      currentStepData.set("referenceData", "SI");
    }

    if (currentStepData.get("highValue") !== "on") {
      currentStepData.set("highValue", "NO");
    } else {
      currentStepData.set("highValue", "SI");
    }

    if (currentStepData.get("genderInfo") !== "on") {
      currentStepData.set("genderInfo", "NO");
    } else {
      currentStepData.set("genderInfo", "SI");
    }

    if (currentStepData.get("autoAcess") !== "on") {
      currentStepData.set("autoAcess", "NO");
    } else {
      currentStepData.set("autoAcess", "SI");
    }

    if (currentStepData.get("RAT") !== "on") {
      currentStepData.set("RAT", "NO");
    } else {
      currentStepData.set("RAT", "SI");
    }

    if (currentStepData.get("dataProtection") !== "on") {
      currentStepData.set("dataProtection", "NO");
    } else {
      currentStepData.set("dataProtection", "SI");
    }

    if (currentStepData.get("dataStandards") !== "on") {
      currentStepData.set("dataStandards", "NO");
    } else {
      currentStepData.set("dataStandards", "SI");
    }

    if (currentStepData.get("dataAnonymize") !== "on") {
      currentStepData.set("dataAnonymize", "NO");
    } else {
      currentStepData.set("dataAnonymize", "SI");
    }

    if (currentStepData.get("sharedData") !== "on") {
      currentStepData.set("sharedData", "NO");
    } else {
      currentStepData.set("sharedData", "SI");
    }

    if (currentStepData.get("VLCi") !== "on") {
      currentStepData.set("VLCi", "NO");
    } else {
      currentStepData.set("VLCi", "SI");
    }

    if (currentStepData.get("ArcGIS") !== "on") {
      currentStepData.set("ArcGIS", "NO");
    } else {
      currentStepData.set("ArcGIS", "SI");
    }

    if (currentStepData.get("Pentaho") !== "on") {
      currentStepData.set("Pentaho", "NO");
    } else {
      currentStepData.set("Pentaho", "SI");
    }

    if (currentStepData.get("CKAN") !== "on") {
      currentStepData.set("CKAN", "NO");
    } else {
      currentStepData.set("CKAN", "SI");
    }

    if (currentStepData.get("MongoDB") !== "on") {
      currentStepData.set("MongoDB", "NO");
    } else {
      currentStepData.set("MongoDB", "SI");
    }

    if (currentStepData.get("OpenDataSoft") !== "on") {
      currentStepData.set("OpenDataSoft", "NO");
    } else {
      currentStepData.set("OpenDataSoft", "SI");
    }

    if (
      (format !== undefined || format !== null) &&
      (currentStepData.get("format") !== null ||
        currentStepData.get("format") !== undefined)
    ) {
      const formatosDatos = format.toString();
      const formatosDatosMod: string = formatosDatos.replace(/,/g, " / ");
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
    if (
      (creationDateAlmacenado !== undefined && creationDateAlmacenado !== null) &&
      (currentStepData.get("creationDate") !== null ||
        currentStepData.get("creationDate") !== undefined)
    ) {
      const creationDateDatos = creationDateAlmacenado.toString();
      console.log("CreationDateAlmacenado: " + creationDateAlmacenado);
      console.log("CreationDateAlmacenado.ToString(): " + creationDateAlmacenado.toString());
      console.log("creationDateDatos" + creationDateDatos);
      currentStepData.set("creationDate", creationDateDatos);
    }

    if (
      (lastUpdateAlmacenado !== undefined && lastUpdateAlmacenado !== null) &&
      (currentStepData.get("lastUpdate") !== null ||
        currentStepData.get("lastUpdate") !== undefined)
    ) {
      const lastUpdateDatos = lastUpdateAlmacenado.toString();
      currentStepData.set("lastUpdate", lastUpdateDatos);
    }

    const currentStepJson = Object.fromEntries(currentStepData.entries());
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    const mergedFormData = { ...formData, ...currentStepJson };
    console.log(mergedFormData);
    createCatalogue(mergedFormData);
  };

  const handleSwitch = (nameSwitch: any, event: any) => {
    switch (nameSwitch) {

      case "sensitiveInformation":
       setSensitiveInformation(sensitiveInformation === "SI" ? "NO" : "SI");
       console.log(sensitiveInformation); 
       break;
      case "isUsing": setIsUsing(isUsing === "SI" ? "NO" : "SI"); break;
      case "structured": setStructured(structured === "SI" ? "NO" : "SI"); break;
      case "georeference": setGeoreference(georeference === "SI" ? "NO" : "SI"); break;
      case "personalData": setPersonalData(personalData === "SI" ? "NO" : "SI"); break;
      case "activeAds": setActiveAds(activeAds === "SI" ? "NO" : "SI"); break;
      case "masterData": setMasterData(masterData === "SI" ? "NO" : "SI"); break;
      case "referenceData": setReferenceData(referenceData === "SI" ? "NO" : "SI"); break;
      case "highValue": setHighValue(highValue === "SI" ? "NO" : "SI"); break;
      case "genderInfo": setGenderInfo(genderInfo === "SI" ? "NO" : "SI"); break;
      case "autoAcess": setAutoAcess(autoAcess === "SI" ? "NO" : "SI"); break;
      case "RAT": setRAT(RAT === "SI" ? "NO" : "SI"); break;
      case "dataProtection": setDataProtection(dataProtection === "SI" ? "NO" : "SI"); break;
      case "dataStandards": setDataStandards(dataStandards === "SI" ? "NO" : "SI"); break;
      case "dataAnonymize": setDataAnonymize(dataAnonymize === "SI" ? "NO" : "SI"); break;
      case "sharedData": setSharedData(sharedData === "SI" ? "NO" : "SI"); break;
      case "VLCi": setVLCi(VLCi === "SI" ? "NO" : "SI"); break;
      case "ArcGIS": setArcGIS(ArcGIS === "SI" ? "NO" : "SI"); break;
      case "Pentaho": setPentaho(Pentaho === "SI" ? "NO" : "SI"); break;
      case "CKAN": setCKAN(CKAN === "SI" ? "NO" : "SI"); break;
      case "MongoDB": setMongoDB(MongoDB === "SI" ? "NO" : "SI"); break;
      case "OpenDataSoft": setOpenDataSoft(OpenDataSoft === "SI" ? "NO" : "SI"); break;

    }
  };

  const handleChange = (field: string, value: string) => {
    // Update the form data
    setFormDataSteps((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

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
          {t("dialog.addRegister")}
        </DialogTitle>
        <DialogContent
          style={dynamicStyle}
        >
          <div className="dialogContentText">
            <span>{t("dialog.fillInfo")}</span>
            <span>
              <strong>{step}/7</strong>
            </span>
          </div>
          <Box>
          {step === 1 && (  // ESTRUCTURA GENERAL DEL DATASET
            <form onSubmit={handleNext}>
              <div className="verticalForm">
                <div className="horizontalForm">
                <p>
                {t("columnsNames.title")} *
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
                  onChange={(e) =>
                    handleChange("title", e.target.value)
                  }
                />
                </div>
                <div className="horizontalForm">
                  <p>
                  {t("columnsNames.description")} *
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
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                  />
                </div>
                <div className="horizontalForm">
                  <p>
                  {t("columnsNames.responsibleIdentity")} *
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
                    onChange={(e) =>
                      handleChange("responsibleIdentity", e.target.value)
                    }
                  />
                  {/* 
                    <FormControl variant="standard">
                      <Select
                        id="responsibleIdentity"
                        name="responsibleIdentity"
                        margin="dense"
                        defaultValue={formDataSteps.responsibleIdentity}
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
                  Organismo
                  </p>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="organism"
                    name="organism"
                    type="string"
                    variant="standard"
                    value={formDataSteps.organism}
                    onChange={(e) =>
                      handleChange("organism", e.target.value)
                    }
                  />
                </div>
                <div className="horizontalForm">
                  <p>
                  {t("columnsNames.topic")} *
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
                    onChange={(e) =>
                      handleChange("topic", e.target.value)
                    }
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
                        //required
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
                Palabras clave *
                </p>
                <TextField
                  autoFocus
                  //required
                  margin="dense"
                  id="keywords"
                  name="keywords"
                  type="string"
                  variant="standard"
                  value={formDataSteps.keyWords}
                  onChange={(e) =>
                    handleChange("keyWords", e.target.value)
                  }
                />
              </div>
              <div className="horizontalForm">
                <p>
                Campos mínimos *
                </p>
                <TextField
                  autoFocus
                  //required
                  margin="dense"
                  id="minimumVariables"
                  name="minimumVariables"
                  type="string"
                  variant="standard"
                  value={formDataSteps.minimumVariables}
                  onChange={(e) =>
                    handleChange("minimumVariables", e.target.value)
                  }
                />
              </div>
              <div className="horizontalForm">
                <p>
                {t("columnsNames.contactPerson")} *
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
                  onChange={(e) =>
                    handleChange("contactPerson", e.target.value)
                  }
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
                  type="string"
                  variant="standard"
                  value={formDataSteps.masterData}
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
                  type="string"
                  variant="standard"
                  value={formDataSteps.referenceData}
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
                Alto valor *
                </p>
                {/* <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="highValue"
                  name="highValue"
                  type="string"
                  variant="standard"
                  value={formDataSteps.highValue}
                  onChange={handleChange}
                /> */}
                <Switch
                    //required
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
                {t("columnsNames.activeAds")} *
                </p>
                <FormControl variant="standard">
                  <Switch
                    //required
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
                  //required
                  margin="dense"
                  id="comments"
                  name="comments"
                  type="string"
                  variant="standard"
                  value={formDataSteps.comments}
                  onChange={(e) =>
                    handleChange("comments", e.target.value)
                  }
                />
              </div>
              {/*
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
                Información geográfica *
                </p>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="typeGeo"
                  name="typeGeo"
                  type="string"
                  variant="standard"
                  value={formDataSteps.typeGeo}
                  onChange={(e) =>
                    handleChange("typeGeo", e.target.value)
                  }
                />
              </div>
              <div className="horizontalForm">
                <p>
                {t("columnsNames.territorialScope")}
                </p>
                <TextField
                  autoFocus
                  //required
                  margin="dense"
                  id="territorialScope"
                  name="territorialScope"
                  type="string"
                  variant="standard"
                  value={formDataSteps.territorialScope}
                  onChange={(e) =>
                    handleChange("territorialScope", e.target.value)
                  }
                />
              </div>
              <div className="horizontalForm">
                <p>
                {t("columnsNames.temporaryCoverage")}
                </p>
                <TextField
                  autoFocus
                  //required
                  margin="dense"
                  id="temporaryCoverage"
                  name="temporaryCoverage"
                  type="string"
                  variant="standard"
                  value={formDataSteps.temporaryCoverage}
                  onChange={(e) =>
                    handleChange("temporaryCoverage", e.target.value)
                  }
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
                  type="string"
                  variant="standard"
                  value={formDataSteps.genderInfo}
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
                  //required
                  margin="dense"
                  id="structuredComments"
                  name="structuredComments"
                  type="string"
                  variant="standard"
                  value={formDataSteps.structuredComments}
                  onChange={(e) =>
                    handleChange("structuredComments", e.target.value)
                  }
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
                    defaultValue={formDataSteps.accessType}
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
                  type="string"
                  variant="standard"
                  value={formDataSteps.internalRelationship}
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
                  //required
                  margin="dense"
                  id="associatedApplication"
                  name="associatedApplication"
                  type="string"
                  variant="standard"
                  value={formDataSteps.associatedApplication}
                  onChange={(e) =>
                    handleChange("associatedApplication", e.target.value)
                  }
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
                  type="string"
                  variant="standard"
                  value={formDataSteps.autoAcess}
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
                  //required
                  margin="dense"
                  id="originComments"
                  name="originComments"
                  type="string"
                  variant="standard"
                  value={formDataSteps.originComments}
                  onChange={(e) =>
                    handleChange("originComments", e.target.value)
                  }
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
                  type="string"
                  variant="standard"
                  value={formDataSteps.comments}
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
                  type="string"
                  variant="standard"
                  value={formDataSteps.timmingEffect}
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
          {step === 5 && ( // ESTADO DE LA CARGA DEL DATASET EN LAS DIFERENTES PLATAFORMAS
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
                    type="string"
                    variant="standard"
                    value={formDataSteps.RAT}
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
                  Protección de datos *
                  </p>
                  {/* <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="dataProtection"
                    name="dataProtection"
                    type="string"
                    variant="standard"
                    value={formDataSteps.dataProtection}
                    onChange={handleChange}
                  /> */}
                  <Switch
                  //required
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
                    type="string"
                    variant="standard"
                    value={formDataSteps.dataStandards}
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
                  Comentarios sobre la protección de datos
                  </p>
                  <TextField
                    autoFocus
                    //required
                    margin="dense"
                    id="dataProtectionComments"
                    name="dataProtectionComments"
                    type="string"
                    variant="standard"
                    value={formDataSteps.dataProtectionComments}
                    onChange={(e) =>
                      handleChange("dataProtectionComments", e.target.value)
                    }
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
                    type="string"
                    variant="standard"
                    value={formDataSteps.dataAnonymize}
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
                    //required
                    margin="dense"
                    id="dataQuality"
                    name="dataQuality"
                    type="string"
                    variant="standard"
                    value={formDataSteps.dataQuality}
                    onChange={(e) =>
                      handleChange("dataQuality", e.target.value)
                    }
                  />
                </div>
                <div className="horizontalForm">
                  <p>
                  Nivel de compartición *
                  </p>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="sharingLevel"
                    name="sharingLevel"
                    type="string"
                    variant="standard"
                    value={formDataSteps.sharingLevel}
                    onChange={(e) =>
                      handleChange("sharingLevel", e.target.value)
                    }
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
                    type="string"
                    variant="standard"
                    value={formDataSteps.sharedData}
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
          {step === 6 && ( // ESTADO DE LA CARGA DEL DATASET EN LAS DIFERENTES PLATAFORMAS
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
                    type="string"
                    variant="standard"
                    value={formDataSteps.VLCi}
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
                    type="string"
                    variant="standard"
                    value={formDataSteps.ArcGIS}
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
                    type="string"
                    variant="standard"
                    value={formDataSteps.Pentaho}
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
                    type="string"
                    variant="standard"
                    value={formDataSteps.CKAN}
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
                    type="string"
                    variant="standard"
                    value={formDataSteps.MongoDB}
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
                    type="string"
                    variant="standard"
                    value={formDataSteps.OpenDataSoft}
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
                    //required
                    margin="dense"
                    id="temporarySolution"
                    name="temporarySolution"
                    type="string"
                    variant="standard"
                    value={formDataSteps.temporarySolution}
                    onChange={(e) =>
                      handleChange("temporarySolution", e.target.value)
                    }
                  />
                </div>
                <div className="horizontalForm">
                  <p>
                  Comentarios sobre el estado de carga
                  </p>
                  <TextField
                    autoFocus
                    //required
                    margin="dense"
                    id="chargeStateComments"
                    name="chargeStateComments"
                    type="string"
                    variant="standard"
                    value={formDataSteps.chargeStateComments}
                    onChange={(e) =>
                      handleChange("chargeStateComments", e.target.value)
                    }
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
                <p> Producto de datos</p>
                <TextField
                    autoFocus
                    //required
                    margin="dense"
                    id="productData"
                    name="productData"
                    type="string"
                    variant="standard"
                    value={formDataSteps.productData}
                    onChange={(e) =>
                      handleChange("productData", e.target.value)
                    }
                  />
              </div>
              <div className="horizontalForm">
                <p> Comentarios del producto</p>
                <TextField
                    autoFocus
                    //required
                    margin="dense"
                    id="productComments"
                    name="productComments"
                    type="string"
                    variant="standard"
                    value={formDataSteps.productComments}
                    onChange={(e) =>
                      handleChange("productComments", e.target.value)
                    }
                  />
              </div>
              <div className="horizontalForm">
                  <p>Fecha de creación *</p>
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
              <div className="horizontalForm">
                <p>
                {t("columnsNames.lastUpdate")} *
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
              {/* <div className="horizontalForm">
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
                  onChange={(e) =>
                    handleChange("source", e.target.value)
                  }
                />
              </div> */}
              <div className="horizontalForm">
                <p>
                {t("columnsNames.responsibleIdentity")}
                </p>
                <TextField
                  autoFocus
                  //required
                  margin="dense"
                  id="responsibleIdentity"
                  name="responsibleIdentity"
                  type="string"
                  variant="standard"
                  value={formDataSteps.responsibleIdentity}
                  onChange={(e) =>
                    handleChange("responsibleIdentity", e.target.value)
                  }
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
        <DialogActions></DialogActions>
      </Dialog>
    </LocalizationProvider>
    </ThemeProvider>
    </>
  );
}
