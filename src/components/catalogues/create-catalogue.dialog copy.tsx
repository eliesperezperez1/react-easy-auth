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
  Box,
  FormControl,
  MenuItem,
  Rating,
  Select,
  Switch,
  ThemeProvider,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import "./create-catalogue.dialog.css";
import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";
import baseTheme from "../darkModeSwitch/darkmodeTheme";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import { DateRangePicker } from "@mui/lab";
import { ORGANISM } from "../../utils/enums/organism.enum";
import { MINIMUM_VALUE } from "../../utils/enums/minimum-value.enum";
import { GEOGRAPHICAL_INFO } from "../../utils/enums/geographical-info.enum";
import { RESPONSIBLE_IDENTITY } from "../../utils/enums/responsible-identity.enum";

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
  const [formDataSteps, setFormDataSteps] = useState({
    title: "",
    description: "",
    responsibleIdentity: "",
    topic: "",
    territorialScope: "",
    temporaryCoverage: "",
    organism: "",
    language: "",
    keyWords: "",
    minimumVariables: "",
    contactPerson: "",
    masterData: "",
    referenceData: "",
    highValue: "",
    activeAds: "",
    comments: "",
    typeGeo: "",
    genderInfo: "",
    structuredComments: "",
    associatedApplication: "",
    autoAcess: "",
    originComments: "",
    RAT: "",
    dataProtection: "",
    dataStandards: "",
    dataProtectionComments: "",
    dataAnonymize: "",
    dataQuality: 0,
    sharingLevel: "",
    sharedData: "",
    VLCi: "",
    ArcGIS: "",
    Pentaho: "",
    CKAN: "",
    MongoDB: "",
    OpenDataSoft: "",
    temporarySolution: "",
    chargeStateComments: "",
    productData: "",
    productComments: "",
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
  const [creationDateAlmacenado, setCreationDate] =
    React.useState<Dayjs | null>();
  const { actualTheme } = useAlternateTheme();

  useEffect(() => {
    setOpen(props.enviar.open);
  }, [props]);

  const handleClose = () => {
    setFormData({});
    setFormDataSteps({
      title: "",
      description: "",
      responsibleIdentity: "",
      topic: "",
      territorialScope: "",
      temporaryCoverage: "",
      organism: "",
      language: "",
      keyWords: "",
      minimumVariables: "",
      contactPerson: "",
      masterData: "",
      referenceData: "",
      highValue: "",
      activeAds: "",
      comments: "",
      typeGeo: "",
      genderInfo: "",
      structuredComments: "",
      associatedApplication: "",
      autoAcess: "",
      originComments: "",
      RAT: "",
      dataProtection: "",
      dataStandards: "",
      dataProtectionComments: "",
      dataAnonymize: "",
      dataQuality: 0,
      sharingLevel: "",
      sharedData: "",
      VLCi: "",
      ArcGIS: "",
      Pentaho: "",
      CKAN: "",
      MongoDB: "",
      OpenDataSoft: "",
      temporarySolution: "",
      chargeStateComments: "",
      productData: "",
      productComments: "",
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
      lastUpdateAlmacenado !== undefined &&
      lastUpdateAlmacenado !== null &&
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
      creationDateAlmacenado !== undefined &&
      creationDateAlmacenado !== null &&
      (currentStepData.get("creationDate") !== null ||
        currentStepData.get("creationDate") !== undefined)
    ) {
      const creationDateDatos = creationDateAlmacenado.toString();
      console.log("CreationDateAlmacenado: " + creationDateAlmacenado);
      console.log(
        "CreationDateAlmacenado.ToString(): " +
          creationDateAlmacenado.toString()
      );
      console.log("creationDateDatos" + creationDateDatos);
      currentStepData.set("creationDate", creationDateDatos);
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
        if (sensitiveInformation === "SI") {
          setSensitiveInformation("NO");
          console.log(sensitiveInformation);
        } else {
          setSensitiveInformation("SI");
          console.log(sensitiveInformation);
        }
        break;
      case "isUsing":
        if (isUsing === "SI") setIsUsing("NO");
        else setIsUsing("SI");
        break;
      case "structured":
        if (structured === "SI") setStructured("NO");
        else setStructured("SI");
        break;
      case "georeference":
        if (georeference === "SI") setGeoreference("NO");
        else setGeoreference("SI");
        break;
      case "personalData":
        if (personalData === "SI") setPersonalData("NO");
        else setPersonalData("SI");
        break;
      case "activeAds":
        if (activeAds === "SI") setActiveAds("NO");
        else setActiveAds("SI");
        break;
      case "masterData":
        if (masterData === "SI") {
          setMasterData("NO");
          setUpdate((prevState) => ({ ...prevState, [masterData]: "NO" }));
        } else {
          setMasterData("SI");
          setUpdate((prevState) => ({ ...prevState, [masterData]: "SI" }));
        }
        break;
      case "referenceData":
        if (referenceData === "SI") {
          setReferenceData("NO");
          setUpdate((prevState) => ({ ...prevState, [referenceData]: "NO" }));
        } else {
          setReferenceData("SI");
          setUpdate((prevState) => ({ ...prevState, [referenceData]: "SI" }));
        }
        break;
      case "highValue":
        if (highValue === "SI") {
          setHighValue("NO");
          setUpdate((prevState) => ({ ...prevState, [highValue]: "NO" }));
        } else {
          setHighValue("SI");
          setUpdate((prevState) => ({ ...prevState, [highValue]: "SI" }));
        }
        break;
      case "genderInfo":
        if (genderInfo === "SI") {
          setGenderInfo("NO");
          setUpdate((prevState) => ({ ...prevState, [genderInfo]: "NO" }));
        } else {
          setGenderInfo("SI");
          setUpdate((prevState) => ({ ...prevState, [genderInfo]: "SI" }));
        }
        break;
      case "autoAcess":
        if (autoAcess === "SI") {
          setAutoAcess("NO");
          setUpdate((prevState) => ({ ...prevState, [autoAcess]: "NO" }));
        } else {
          setAutoAcess("SI");
          setUpdate((prevState) => ({ ...prevState, [autoAcess]: "SI" }));
        }
        break;
      case "RAT":
        if (RAT === "SI") {
          setRAT("NO");
          setUpdate((prevState) => ({ ...prevState, [RAT]: "NO" }));
        } else {
          setRAT("SI");
          setUpdate((prevState) => ({ ...prevState, [RAT]: "SI" }));
        }
        break;
      case "dataProtection":
        if (dataProtection === "SI") {
          setDataProtection("NO");
          setUpdate((prevState) => ({ ...prevState, [dataProtection]: "NO" }));
        } else {
          setDataProtection("SI");
          setUpdate((prevState) => ({ ...prevState, [dataProtection]: "SI" }));
        }
        break;
      case "dataStandards":
        if (dataStandards === "SI") {
          setDataStandards("NO");
          setUpdate((prevState) => ({ ...prevState, [dataStandards]: "NO" }));
        } else {
          setDataStandards("SI");
          setUpdate((prevState) => ({ ...prevState, [dataStandards]: "SI" }));
        }
        break;
      case "dataAnonymize":
        if (dataAnonymize === "SI") {
          setDataAnonymize("NO");
          setUpdate((prevState) => ({ ...prevState, [dataAnonymize]: "NO" }));
        } else {
          setDataAnonymize("SI");
          setUpdate((prevState) => ({ ...prevState, [dataAnonymize]: "SI" }));
        }
        break;
      case "sharedData":
        if (sharedData === "SI") {
          setSharedData("NO");
          setUpdate((prevState) => ({ ...prevState, [sharedData]: "NO" }));
        } else {
          setSharedData("SI");
          setUpdate((prevState) => ({ ...prevState, [sharedData]: "SI" }));
        }
        break;
      case "VLCi":
        if (VLCi === "SI") {
          setVLCi("NO");
          setUpdate((prevState) => ({ ...prevState, [VLCi]: "NO" }));
        } else {
          setVLCi("SI");
          setUpdate((prevState) => ({ ...prevState, [VLCi]: "SI" }));
        }
        break;
      case "ArcGIS":
        if (ArcGIS === "SI") {
          setArcGIS("NO");
          setUpdate((prevState) => ({ ...prevState, [ArcGIS]: "NO" }));
        } else {
          setArcGIS("SI");
          setUpdate((prevState) => ({ ...prevState, [ArcGIS]: "SI" }));
        }
        break;
      case "Pentaho":
        if (Pentaho === "SI") {
          setPentaho("NO");
          setUpdate((prevState) => ({ ...prevState, [Pentaho]: "NO" }));
        } else {
          setPentaho("SI");
          setUpdate((prevState) => ({ ...prevState, [Pentaho]: "SI" }));
        }
        break;
      case "CKAN":
        if (CKAN === "SI") {
          setCKAN("NO");
          setUpdate((prevState) => ({ ...prevState, [CKAN]: "NO" }));
        } else {
          setCKAN("SI");
          setUpdate((prevState) => ({ ...prevState, [CKAN]: "SI" }));
        }
        break;
      case "MongoDB":
        if (MongoDB === "SI") {
          setMongoDB("NO");
          setUpdate((prevState) => ({ ...prevState, [MongoDB]: "NO" }));
        } else {
          setMongoDB("SI");
          setUpdate((prevState) => ({ ...prevState, [MongoDB]: "SI" }));
        }
        break;
      case "OpenDataSoft":
        if (VLCi === "SI") {
          setOpenDataSoft("NO");
          setUpdate((prevState) => ({ ...prevState, [OpenDataSoft]: "NO" }));
        } else {
          setOpenDataSoft("SI");
          setUpdate((prevState) => ({ ...prevState, [OpenDataSoft]: "SI" }));
        }
        break;
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
            <DialogTitle style={dynamicStyle}>
              {t("dialog.addRegister")}
            </DialogTitle>
            <DialogContent style={dynamicStyle}>
              <div className="dialogContentText">
                <span>{t("dialog.fillInfo")}</span>
                <span>
                  <strong>{step}/5</strong>
                </span>
              </div>
              <Box>
                {step === 1 && ( // ESTRUCTURA GENERAL DEL DATASET
                  <form onSubmit={handleNext}>
                    <div className="verticalForm">
                      <div className="horizontalForm">
                        <p>{t("columnsNames.title")}</p>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="title"
                          name="title"
                          label={t("columnsNames.title")}
                          type="string"
                          variant="standard"
                          value={formDataSteps.title}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="horizontalForm">
                        <p>{t("columnsNames.description")}</p>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="description"
                          name="description"
                          label={t("columnsNames.description")}
                          type="string"
                          variant="standard"
                          value={formDataSteps.description}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="horizontalForm">
                        <p>{t("columnsNames.responsibleIdentity")}</p>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="responsibleIdentity"
                          name="responsibleIdentity"
                          label={t("columnsNames.responsibleIdentity")}
                          type="string"
                          variant="standard"
                          value={formDataSteps.responsibleIdentity}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="horizontalForm">
                        <p>{t("columnsNames.topic")}</p>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="topic"
                          name="topic"
                          label={t("columnsNames.topic")}
                          type="string"
                          variant="standard"
                          value={formDataSteps.topic}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="horizontalForm">
                        <p>Organismo</p>
                        <FormControl variant="standard">
                          <Select
                            id="organism"
                            name="organism"
                            margin="dense"
                            defaultValue={formDataSteps.organism}
                            //onChange={(e) => handleChange('language', e.target.value)}
                            required
                          >
                            {Object.entries(ORGANISM).map(([key, value]) => (
                              <MenuItem key={key} value={value}>
                                {value}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      <div className="horizontalForm">
                        <p>{t("columnsNames.language")}</p>

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
                        }}
                      >
                        {t("dialog.cancel")}
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
                        }}
                      >
                        {t("dialog.next")}
                      </Button>
                    </div>
                  </form>
                )}
                {step === 2 && ( // ESTRUCTURA GENERAL DEL DATASET
                  <form onSubmit={handleNext}>
                    <div className="verticalForm">
                      <div className="horizontalForm">
                        <p>Palabras clave</p>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="keywords"
                          name="keywords"
                          label="Palabras clave"
                          type="string"
                          variant="standard"
                          value={formDataSteps.keyWords}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="horizontalForm">
                        <p>Campos mínimos</p>
                        <FormControl variant="standard">
                          <Select
                            id="minimumVariables"
                            name="minimumVariables"
                            margin="dense"
                            defaultValue={formDataSteps.minimumVariables}
                            //onChange={(e) => handleChange('language', e.target.value)}
                            required
                          >
                            {Object.entries(MINIMUM_VALUE).map(
                              ([key, value]) => (
                                <MenuItem key={key} value={value}>
                                  {value}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </FormControl>
                      </div>
                      <div className="horizontalForm">
                        <p>{t("columnsNames.contactPerson")}</p>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="contactPerson"
                          name="contactPerson"
                          label={t("columnsNames.contactPerson")}
                          type="string"
                          variant="standard"
                          value={formDataSteps.contactPerson}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="horizontalFormSwitch">
                        <p>Dato maestro</p>
                        {/* <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="masterData"
                  name="masterData"
                  label="Dato maestro"
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
                          onChange={(event) =>
                            handleSwitch("masterData", event.target.checked)
                          }
                          color="primary" // Opcional: ajusta el color del switch
                        />
                      </div>
                      <div className="horizontalFormSwitch">
                        <p>Dato de referencia</p>
                        <Switch
                          id="referenceData"
                          name="referenceData"
                          value={referenceData}
                          checked={referenceData === "SI"}
                          onChange={(event) =>
                            handleSwitch("referenceData", event.target.checked)
                          }
                          color="primary" // Opcional: ajusta el color del switch
                        />
                      </div>
                      <div className="horizontalFormSwitch">
                        <p>Alto valor</p>
                        <Switch
                          id="highValue"
                          name="highValue"
                          value={highValue}
                          checked={highValue === "SI"}
                          onChange={(event) =>
                            handleSwitch("highValue", event.target.checked)
                          }
                          color="primary" // Opcional: ajusta el color del switch
                        />
                      </div>
                      <div className="horizontalFormSwitch">
                        <p>{t("columnsNames.activeAds")}</p>
                        <FormControl variant="standard">
                          <Switch
                            id="activeAds"
                            name="activeAds"
                            value={activeAds}
                            checked={activeAds === "SI"}
                            onChange={(event) =>
                              handleSwitch("activeAds", event.target.checked)
                            }
                            color="primary" // Opcional: ajusta el color del switch
                          />
                        </FormControl>
                      </div>
                      <div className="horizontalForm">
                        <p>Comentarios generales</p>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="comments"
                          name="comments"
                          label="Comentarios generales"
                          type="string"
                          variant="standard"
                          value={formDataSteps.comments}
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
                        }}
                      >
                        {t("dialog.cancel")}
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
                          }}
                        >
                          {t("dialog.next")}
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
                {step === 3 && ( // ESTRUCTURA INTERNA DEL DATASET
                  <form onSubmit={handleNext}>
                    <div className="verticalForm">
                      <div className="horizontalForm">
                        <p>Información geográfica</p>
                        <FormControl variant="standard">
                          <Select
                            id="typeGeo"
                            name="typeGeo"
                            margin="dense"
                            defaultValue={formDataSteps.typeGeo}
                            //onChange={(e) => handleChange('language', e.target.value)}
                          >
                            {Object.entries(GEOGRAPHICAL_INFO).map(
                              ([key, value]) => (
                                <MenuItem key={key} value={value}>
                                  {value}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </FormControl>
                      </div>
                      <div className="horizontalForm">
                        <p>{t("columnsNames.territorialScope")}</p>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="territorialScope"
                          name="territorialScope"
                          label={t("columnsNames.territorialScope")}
                          type="string"
                          variant="standard"
                          value={formDataSteps.territorialScope}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="horizontalForm">
                        <p>{t("columnsNames.temporaryCoverage")}</p>
                        <DateRangePicker
                          localeText={{ start: "Check-in", end: "Check-out" }}
                          value={formDataSteps.temporaryCoverage}
                          onChange={handleChange}
                          id="temporaryCoverage"
                          name="temporaryCoverage"
                          label={t("columnsNames.temporaryCoverage")}
                        />
                      </div>
                      <div className="horizontalFormSwitch">
                        <p>Información de género</p>
                        <Switch
                          id="genderInfo"
                          name="genderInfo"
                          value={genderInfo}
                          checked={genderInfo === "SI"}
                          onChange={(event) =>
                            handleSwitch("genderInfo", event.target.checked)
                          }
                          color="primary" // Opcional: ajusta el color del switch
                        />
                      </div>
                      <div className="horizontalForm">
                        <p>Comentario de la estructura</p>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="structuredComments"
                          name="structuredComments"
                          label="Comentario de la estructura"
                          type="string"
                          variant="standard"
                          value={formDataSteps.structuredComments}
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
                        }}
                      >
                        {t("dialog.cancel")}
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
                          }}
                        >
                          {t("dialog.next")}
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
                {step === 4 && ( // APLICACIÓN DE ORIGEN DE LOS DATOS
                  <form onSubmit={handleNext}>
                    <div className="verticalForm">
                      <div className="horizontalForm">
                        <p>Aplicación de origen</p>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="associatedApplication"
                          name="associatedApplication"
                          label="Aplicación de origen"
                          type="string"
                          variant="standard"
                          value={formDataSteps.associatedApplication}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="horizontalFormSwitch">
                        <p>Acceso automatizado</p>
                        <Switch
                          id="autoAcess"
                          name="autoAcess"
                          value={autoAcess}
                          checked={autoAcess === "SI"}
                          onChange={(event) =>
                            handleSwitch("autoAcess", event.target.checked)
                          }
                          color="primary" // Opcional: ajusta el color del switch
                        />
                      </div>
                      <div className="horizontalForm">
                        <p>Comentarios del origen</p>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="originComments"
                          name="originComments"
                          label="Comentarios del origen"
                          type="string"
                          variant="standard"
                          value={formDataSteps.originComments}
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
                        }}
                      >
                        {t("dialog.cancel")}
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
                          }}
                        >
                          {t("dialog.next")}
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
                {step === 5 && ( // ESTADO DE LA CARGA DEL DATASET EN LAS DIFERENTES PLATAFORMAS
                  <form onSubmit={handleNext}>
                    <div className="verticalForm">
                      <div className="horizontalFormSwitch">
                        <p>RAT</p>
                        <Switch
                          id="RAT"
                          name="RAT"
                          value={RAT}
                          checked={RAT === "SI"}
                          onChange={(event) =>
                            handleSwitch("RAT", event.target.checked)
                          }
                          color="primary" // Opcional: ajusta el color del switch
                        />
                      </div>
                      <div className="horizontalFormSwitch">
                        <p>Protección de datos</p>
                        <Switch
                          id="dataProtection"
                          name="dataProtection"
                          value={dataProtection}
                          checked={dataProtection === "SI"}
                          onChange={(event) =>
                            handleSwitch("dataProtection", event.target.checked)
                          }
                          color="primary" // Opcional: ajusta el color del switch
                        />
                      </div>
                      <div className="horizontalFormSwitch">
                        <p>Estándares de datos</p>
                        <Switch
                          id="dataStandards"
                          name="dataStandards"
                          value={dataStandards}
                          checked={dataStandards === "SI"}
                          onChange={(event) =>
                            handleSwitch("dataStandards", event.target.checked)
                          }
                          color="primary" // Opcional: ajusta el color del switch
                        />
                      </div>
                      <div className="horizontalForm">
                        <p>Comentarios del origen</p>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="dataProtectionComments"
                          name="dataProtectionComments"
                          label="Comentarios del origen"
                          type="string"
                          variant="standard"
                          value={formDataSteps.dataProtectionComments}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="horizontalFormSwitch">
                        <p>Anonimización de datos</p>
                        <Switch
                          id="dataAnonymize"
                          name="dataAnonymize"
                          value={dataAnonymize}
                          checked={dataAnonymize === "SI"}
                          onChange={(event) =>
                            handleSwitch("dataAnonymize", event.target.checked)
                          }
                          color="primary" // Opcional: ajusta el color del switch
                        />
                      </div>
                      <div className="horizontalForm">
                        <p>Calidad de los datos</p>
                        <Rating
                          name="simple-controlled"
                          value={dataQuality}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                        />
                      </div>
                      <div className="horizontalForm">
                        <p>Nivel de compartición</p>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="sharingLevel"
                          name="sharingLevel"
                          label="Nivel de compartición"
                          type="string"
                          variant="standard"
                          value={formDataSteps.sharingLevel}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="horizontalFormSwitch">
                        <p>Datos compartidos</p>
                        <Switch
                          id="sharedData"
                          name="sharedData"
                          value={sharedData}
                          checked={sharedData === "SI"}
                          onChange={(event) =>
                            handleSwitch("sharedData", event.target.checked)
                          }
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
                        }}
                      >
                        {t("dialog.cancel")}
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
                          }}
                        >
                          {t("dialog.next")}
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
                {step === 6 && ( // ESTADO DE LA CARGA DEL DATASET EN LAS DIFERENTES PLATAFORMAS
                  <form onSubmit={handleNext}>
                    <div className="verticalForm">
                      <div className="horizontalFormSwitch">
                        <p>VLCi</p>
                        <Switch
                          id="VLCi"
                          name="VLCi"
                          value={VLCi}
                          checked={VLCi === "SI"}
                          onChange={(event) =>
                            handleSwitch("VLCi", event.target.checked)
                          }
                          color="primary" // Opcional: ajusta el color del switch
                        />
                      </div>
                      <div className="horizontalFormSwitch">
                        <p>ArcGIS</p>
                        <Switch
                          id="ArcGIS"
                          name="ArcGIS"
                          value={ArcGIS}
                          checked={ArcGIS === "SI"}
                          onChange={(event) =>
                            handleSwitch("ArcGIS", event.target.checked)
                          }
                          color="primary" // Opcional: ajusta el color del switch
                        />
                      </div>
                      <div className="horizontalFormSwitch">
                        <p>Pentaho</p>
                        <Switch
                          id="Pentaho"
                          name="Pentaho"
                          value={Pentaho}
                          checked={Pentaho === "SI"}
                          onChange={(event) =>
                            handleSwitch("Pentaho", event.target.checked)
                          }
                          color="primary" // Opcional: ajusta el color del switch
                        />
                      </div>
                      <div className="horizontalFormSwitch">
                        <p>CKAN</p>
                        <Switch
                          id="CKAN"
                          name="CKAN"
                          value={CKAN}
                          checked={CKAN === "SI"}
                          onChange={(event) =>
                            handleSwitch("CKAN", event.target.checked)
                          }
                          color="primary" // Opcional: ajusta el color del switch
                        />
                      </div>
                      <div className="horizontalFormSwitch">
                        <p>MongoDB</p>
                        <Switch
                          id="MongoDB"
                          name="MongoDB"
                          value={MongoDB}
                          checked={MongoDB === "SI"}
                          onChange={(event) =>
                            handleSwitch("MongoDB", event.target.checked)
                          }
                          color="primary" // Opcional: ajusta el color del switch
                        />
                      </div>
                      <div className="horizontalFormSwitch">
                        <p>OpenDataSoft</p>
                        <Switch
                          id="OpenDataSoft"
                          name="OpenDataSoft"
                          value={OpenDataSoft}
                          checked={OpenDataSoft === "SI"}
                          onChange={(event) =>
                            handleSwitch("OpenDataSoft", event.target.checked)
                          }
                          color="primary" // Opcional: ajusta el color del switch
                        />
                      </div>
                      <div className="horizontalForm">
                        <p>Resolución temporal</p>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="temporarySolution"
                          name="temporarySolution"
                          label="Resolución temporal"
                          type="string"
                          variant="standard"
                          value={formDataSteps.temporarySolution}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="horizontalForm">
                        <p>Comentarios sobre el estado de carga</p>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="chargeStateComments"
                          name="chargeStateComments"
                          label="Comentarios sobre el estado de carga"
                          type="string"
                          variant="standard"
                          value={formDataSteps.chargeStateComments}
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
                        }}
                      >
                        {t("dialog.cancel")}
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
                          }}
                        >
                          {t("dialog.next")}
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
                          onChange={(e) => handleChangeCreationDate(e)}
                          slotProps={{
                            textField: {
                              variant: "standard",
                              id: "creationDate",
                            },
                          }}
                        ></DateTimePicker>
                      </div>
                      <div className="horizontalFormSwitch">
                        <p>{t("columnsNames.personalData")}</p>
                        <FormControl variant="standard">
                          <Switch
                            id="personalData"
                            name="personalData"
                            value={personalData}
                            checked={personalData === "SI"}
                            onChange={(event) =>
                              handleSwitch("personalData", event.target.checked)
                            }
                            color="primary" // Opcional: ajusta el color del switch
                          />
                        </FormControl>
                      </div>
                      <div className="horizontalForm">
                        <p>{t("columnsNames.source")}</p>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="source"
                          name="source"
                          label={t("columnsNames.source")}
                          type="string"
                          variant="standard"
                          value={formDataSteps.source}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="horizontalForm">
                        <p>{t("columnsNames.responsibleIdentity")}</p>
                        <FormControl variant="standard">
                          <Select
                            id="responsibleIdentity"
                            name="responsibleIdentity"
                            margin="dense"
                            defaultValue={formDataSteps.responsibleIdentity}
                            //onChange={(e) => handleChange('language', e.target.value)}
                          >
                            {Object.entries(RESPONSIBLE_IDENTITY).map(
                              ([key, value]) => (
                                <MenuItem key={key} value={value}>
                                  {value}
                                </MenuItem>
                              )
                            )}
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
                        }}
                      >
                        {t("dialog.cancel")}
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
                          }}
                        >
                          {t("dialog.addButton")}
                        </Button>
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
