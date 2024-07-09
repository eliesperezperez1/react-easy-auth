import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
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
  Select,
  Switch,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import "./create-catalogue.dialog.css";
import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import { grey } from "@mui/material/colors";
import { esES } from "@mui/x-data-grid/locales";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RESPONSIBLE_IDENTITY } from "../../utils/enums/responsible-identity.enum";
import { ORGANISM } from "../../utils/enums/organism.enum";
import { LANGUAGE_FORM } from "../../utils/enums/language-form.enum";
import { MINIMUM_VALUE } from "../../utils/enums/minimum-value.enum";
import { GEOGRAPHICAL_INFO } from "../../utils/enums/geographical-info.enum";
import { TOPIC } from "../../utils/enums/topic.enum";
import { SHARING_LEVEL } from "../../utils/enums/sharing-level.enum";
import { catalogueMock } from "../../utils/catalogue.mock";
import ButtonsForm, { buttonsFormInfo } from "./buttons-form";
export interface DialogData {
  open: boolean;
  closeDialog: (a: boolean) => void;
  getInfo: () => void;
}

const baseTheme = (actualTheme: any) =>
  createTheme(
    {
      typography: {
        fontFamily: "Montserrat",
      },
      components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              color: actualTheme === "light" ? "black" : "white",
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
              color: actualTheme === "light" ? "black" : "white",
            },
          },
        },
        MuiSelect: {
          defaultProps: {
            variant: "standard", // Set the default variant (outlined, filled, standard)
          },
          styleOverrides: {
            icon: {
              color: actualTheme === "light" ? "black" : "white", // Set the color of the dropdown arrow icon
            },
            // Add other styles as needed
          },
        },
        MuiMenuList: {
          styleOverrides: {
            root: {
              //backgroundColor: actualTheme === 'light' ? "white" : "black",
              color: actualTheme === "light" ? "black" : "white",
            },
          },
        },
        MuiMenuItem: {
          styleOverrides: {
            root: {
              //backgroundColor: actualTheme === 'light' ? "white" : "black",
              color: actualTheme === "light" ? "black" : "white",
            },
          },
        },
      },
      palette: {
        mode: actualTheme === "light" ? "light" : "dark",
        ...(actualTheme === "light"
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

export default function CreateCatalogueDialog(props: { enviar: DialogData }) {
  const [open, setOpen] = useState<boolean>(false);
  const authHeader = useAuthHeader();
  const [t, i18n] = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [formDataSteps, setFormDataSteps] = useState(catalogueMock);
  const [personalData, setPersonalData] = useState(true);
  const [activeAds, setActiveAds] = useState(true);
  const [masterData, setMasterData] = useState(true);
  const [referenceData, setReferenceData] = useState(true);
  const [highValue, setHighValue] = useState(true);
  const [genderInfo, setGenderInfo] = useState(true);
  const [autoAcess, setAutoAcess] = useState(true);
  const [RAT, setRAT] = useState(true);
  const [dataProtection, setDataProtection] = useState(true);
  const [dataStandards, setDataStandards] = useState(true);
  const [dataAnonymize, setDataAnonymize] = useState(true);
  const [sharedData, setSharedData] = useState(true);
  const [VLCi, setVLCi] = useState(true);
  const [ArcGIS, setArcGIS] = useState(true);
  const [Pentaho, setPentaho] = useState(true);
  const [CKAN, setCKAN] = useState(true);
  const [MongoDB, setMongoDB] = useState(true);
  const [OpenDataSoft, setOpenDataSoft] = useState(true);
  const [format, setFormat] = useState<string[]>([]);
  const [lastUpdateAlmacenado, setLastUpdate] = useState<Dayjs>(dayjs("Mon, 01 Jan 2024 00:00:00 GMT"));
  const [creationDateAlmacenado, setCreationDate] = useState<Dayjs>(dayjs("Mon, 01 Jan 2024 00:00:00 GMT"));
  const { actualTheme } = useAlternateTheme();

  useEffect(() => {
    setOpen(props.enviar.open);
  }, [props]);

  const handleClose = () => {
    setFormData({});
    setFormDataSteps({
      _id: "",
      title: "",
      description: "",
      responsibleIdentity: RESPONSIBLE_IDENTITY.accio_cultural,
      topic: TOPIC.ciencia,
      territorialScope: "",
      temporaryCoverage: "",
      organism: ORGANISM.alcaldia,
      language: LANGUAGE_FORM.alt,
      keyWords: [],
      minimumVariables: MINIMUM_VALUE.mo,
      contactPerson: "",
      masterData: false,
      referenceData: false,
      highValue: false,
      activeAds: false, // boolean
      comments: "",
      typeGeo: GEOGRAPHICAL_INFO.barrio,
      genderInfo: false,
      structuredComments: "",
      associatedApplication: "",
      autoAcess: false,
      originComments: "",
      RAT: false,
      dataProtection: false,
      dataStandards: false,
      dataProtectionComments: "",
      dataAnonymize: false,
      dataQuality: 0,
      sharingLevel: SHARING_LEVEL.open,
      sharedData: false,
      VLCi: false,
      ArcGIS: false,
      Pentaho: false,
      CKAN: false,
      MongoDB: false,
      OpenDataSoft: false,
      temporarySolution: "", // ES UNA ENUM PERO NO SABEMOS CUAL
      chargeStateComments: "",
      productData: "",
      productComments: "",
      creationDate: new Date(),
      deleted: false,
      deletedDate: new Date(),
      lastUpdate: new Date(),
      verified: true,
    });
    setStep(1);
    setFormat([]);
    setOpen(false);
    props.enviar.closeDialog(false);
  };

  const handleFormat = (event: any, newValue: any) => {
    setFormat(newValue);
  };

  const buttonsFormProps: buttonsFormInfo = {
    handleClose: () => handleClose(),
    handleGoBack: () => handleGoBack(),
  };

  const createCatalogue = (formJson: any) => {
    const a = formJson.lastUpdate;
    const b = formJson.creationDate;
    const deletedDate = new Date();
    const deleted = false;
    const lastUpdate = new Date(a);
    const creationDate = new Date(b);
    const verified = true;
    const prueba = formJson as CreateCatalogue;
    const create: CreateCatalogue = {
      ...prueba,
      deleted,
      deletedDate,
      lastUpdate,
      creationDate,
      verified,
    };
    createCatalogueRequest(create, authHeader())
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "create catalogue request");
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
      creationDateAlmacenado !== undefined &&
      creationDateAlmacenado !== null &&
      (currentStepData.get("creationDate") !== null ||
        currentStepData.get("creationDate") !== undefined)
    ) {
      const creationDateDatos = creationDateAlmacenado.toString();
      currentStepData.set("creationDate", creationDateDatos);
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
    console.log(
        "masterData:" + masterData,
        "activeAds: " + activeAds,
        "referenceData: " + referenceData,
        "highValue: " + highValue,
        "genderInfo: " + genderInfo,
        "RAT: " + RAT,
        "dataProtection: " + dataProtection,
        "dataStandards: " + dataStandards,
        "dataAnonymize: " + dataAnonymize,
        "sharedData: " + sharedData,
        "VLCi: " + VLCi,
        "ArcGIS: " + ArcGIS,
        "Pentaho: " + Pentaho,
        "CKAN: " + CKAN,
        "MongoDB: " + MongoDB,
        "OpenDataSoft: " + OpenDataSoft,
    );
    // Merge current step data with existing form data
    setFormData((prevData) => ({
      ...prevData,
      ...currentStepJson,
      masterData,
      activeAds,
      referenceData,
      highValue,
      genderInfo,
      autoAcess,
      RAT,
      dataProtection,
      dataStandards,
      dataAnonymize,
      sharedData,
      VLCi,
      ArcGIS,
      Pentaho,
      CKAN,
      MongoDB,
      OpenDataSoft,
    }));
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
      currentStepData.set("creationDate", creationDateDatos);
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

    const currentStepJson = Object.fromEntries(currentStepData.entries());
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    const mergedFormData = { ...formData, ...currentStepJson };
    createCatalogue(mergedFormData);
  };

  const handleChange = (field: string, value: string) => {
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
    "& .MuiInputBaseRoot": { border: "none" },
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
            maxWidth="lg"
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
                    <div className="grid">
                      <div className="row">
                        <div className="horizontalForm">
                          <p>{t("columnsNames.title")} *</p>
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
                          <p>{t("columnsNames.description")} *</p>
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
                          <p>{t("columnsNames.responsibleIdentity")} *</p>
                          <FormControl variant="standard">
                            <Select
                              id="responsibleIdentity"
                              name="responsibleIdentity"
                              margin="dense"
                              defaultValue={formDataSteps.responsibleIdentity}
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
                        <div className="horizontalForm">
                          <p>Organismo</p>
                          <FormControl variant="standard">
                            <Select
                              id="organism"
                              name="organism"
                              margin="dense"
                              defaultValue={formDataSteps.organism}
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
                          <p>{t("columnsNames.topic")} *</p>
                          <FormControl variant="standard">
                            <Select
                              id="topic"
                              name="topic"
                              margin="dense"
                              defaultValue={formDataSteps.topic}
                            >
                              {Object.entries(TOPIC).map(([key, value]) => (
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
                            >
                              {Object.entries(LANGUAGE_FORM).map(
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
                      <div className="row">
                        <div className="horizontalForm">
                          <p>Palabras clave *</p>
                          <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="keyWords"
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
                          <p>Campos mínimos *</p>
                          <FormControl variant="standard">
                            <Select
                              id="minimumVariables"
                              name="minimumVariables"
                              margin="dense"
                              defaultValue={formDataSteps.minimumVariables}
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
                          <p>{t("columnsNames.contactPerson")} *</p>
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
                          <p>Dato maestro</p>
                          <Switch
                            id="masterData"
                            name="masterData"
                            value={masterData}
                            checked={masterData}
                            onChange={(event) =>
                              setMasterData(event.target.checked)
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
                            checked={referenceData}
                            onChange={(event) =>
                              setReferenceData(event.target.checked)
                            }
                            color="primary" // Opcional: ajusta el color del switch
                          />
                        </div>
                        <div className="horizontalFormSwitch">
                          <p>Alto valor *</p>
                          <Switch
                            //required
                            id="highValue"
                            name="highValue"
                            value={highValue}
                            checked={highValue}
                            onChange={(event) =>
                              setHighValue(event.target.checked)
                            }
                            color="primary" // Opcional: ajusta el color del switch
                          />
                        </div>
                        <div className="horizontalFormSwitch">
                          <p>{t("columnsNames.activeAds")} *</p>
                          {/* <FormControl variant="standard"> */}
                            <Switch
                              //required
                              id="activeAds"
                              name="activeAds"
                              value={activeAds}
                              checked={activeAds}
                              onChange={(event) =>
                                setActiveAds(event.target.checked)
                              }
                              color="primary" // Opcional: ajusta el color del switch
                            />
                          {/* </FormControl> */}
                        </div>
                        <div className="horizontalForm">
                          <p>Comentarios generales</p>
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
                        <div className="horizontalForm">
                          <p>Fecha de creación *</p>
                          <DateTimePicker
                            format="DD/MM/YYYY hh:mm:ss a"
                            name="creationDate"
                            value={creationDateAlmacenado}
                            onChange={(e: any) => {
                              setCreationDate(e);
                              handleChangeCreationDate(e);
                            }}
                            slotProps={{
                              textField: {
                                variant: "standard",
                                id: "creationDate",
                              },
                            }}
                          ></DateTimePicker>
                        </div>
                        <div className="horizontalForm">
                          <p>{t("columnsNames.lastUpdate")} *</p>
                          <DateTimePicker
                            format="DD/MM/YYYY hh:mm:ss a"
                            name="lastUpdate"
                            value={lastUpdateAlmacenado}
                            onChange={(e) => handleChangeLastUpdate(e)}
                            slotProps={{
                              textField: {
                                variant: "standard",
                                id: "lastUpdate",
                              },
                            }}
                          ></DateTimePicker>
                        </div>
                      </div>
                    </div>
                    <ButtonsForm info={buttonsFormProps} />
                  </form>
                )}
                {step === 2 && ( // ESTRUCTURA INTERNA DEL DATASET
                  <form onSubmit={handleNext}>
                    <div className="grid">
                      <div className="row">
                        <div className="horizontalForm">
                          <p>Información geográfica *</p>
                          <FormControl variant="standard">
                            <Select
                              id="typeGeo"
                              name="typeGeo"
                              margin="dense"
                              defaultValue={formDataSteps.typeGeo}
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
                          <p>{t("columnsNames.temporaryCoverage")}</p>
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
                          <p>Información de género</p>
                          <Switch
                            id="genderInfo"
                            name="genderInfo"
                            value={genderInfo}
                            checked={genderInfo === true}
                            onChange={(event) =>
                              setGenderInfo(event.target.checked)
                            }
                            color="primary" // Opcional: ajusta el color del switch
                          />
                        </div>
                        <div className="horizontalForm">
                          <p>Comentario de la estructura</p>
                          <TextField
                            autoFocus
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
                      </div>
                    </div>
                    <ButtonsForm info={buttonsFormProps} />
                  </form>
                )}
                {step === 3 && ( // APLICACIÓN DE ORIGEN DE LOS DATOS
                  <form onSubmit={handleNext}>
                    <div className="verticalForm">
                      <div className="horizontalForm">
                        <p>Aplicación de origen</p>
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
                            handleChange(
                              "associatedApplication",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="horizontalFormSwitch">
                        <p>Acceso automatizado</p>
                        <Switch
                          id="autoAcess"
                          name="autoAcess"
                          value={autoAcess}
                          checked={autoAcess}
                          onChange={(event) =>
                            setAutoAcess(event.target.checked)
                          }
                          color="primary" // Opcional: ajusta el color del switch
                        />
                      </div>
                      <div className="horizontalForm">
                        <p>Comentarios del origen</p>
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
                    </div>
                    <ButtonsForm info={buttonsFormProps} />
                  </form>
                )}
                {step === 4 && ( // ESTADO DE LA CARGA DEL DATASET EN LAS DIFERENTES PLATAFORMAS
                  <form onSubmit={handleNext}>
                    <div className="grid">
                      <div className="row">
                        <div className="horizontalFormSwitch">
                          <p>RAT</p>
                          <Switch
                            id="RAT"
                            name="RAT"
                            value={RAT}
                            checked={RAT}
                            onChange={(event) => setRAT(event.target.checked)}
                            color="primary" // Opcional: ajusta el color del switch
                          />
                        </div>
                        <div className="horizontalFormSwitch">
                          <p>Protección de datos *</p>
                          <Switch
                            //required
                            id="dataProtection"
                            name="dataProtection"
                            value={dataProtection}
                            checked={dataProtection}
                            onChange={(event) =>
                              setDataProtection(event.target.checked)
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
                            checked={dataStandards}
                            onChange={(event) =>
                              setDataStandards(event.target.checked)
                            }
                            color="primary" // Opcional: ajusta el color del switch
                          />
                        </div>
                        <div className="horizontalForm">
                          <p>Comentarios sobre la protección de datos</p>
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
                              handleChange(
                                "dataProtectionComments",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="horizontalFormSwitch">
                          <p>Anonimización de datos</p>
                          <Switch
                            id="dataAnonymize"
                            name="dataAnonymize"
                            value={dataAnonymize}
                            checked={dataAnonymize}
                            onChange={(event) =>
                              setDataAnonymize(event.target.checked)
                            }
                            color="primary" // Opcional: ajusta el color del switch
                          />
                        </div>
                        <div className="horizontalForm">
                          <p>Calidad de los datos</p>
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
                          <p>Nivel de compartición *</p>
                          <FormControl variant="standard">
                            <Select
                              id="sharingLevel"
                              name="sharingLevel"
                              margin="dense"
                              defaultValue={formDataSteps.sharingLevel}
                            >
                              {Object.entries(SHARING_LEVEL).map(
                                ([key, value]) => (
                                  <MenuItem key={key} value={value}>
                                    {value}
                                  </MenuItem>
                                )
                              )}
                            </Select>
                          </FormControl>
                        </div>
                        <div className="horizontalFormSwitch">
                          <p>Datos compartidos</p>
                          <Switch
                            id="sharedData"
                            name="sharedData"
                            value={sharedData}
                            checked={sharedData}
                            onChange={(event) =>
                              setSharedData(event.target.checked)
                            }
                            color="primary" // Opcional: ajusta el color del switch
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="horizontalFormSwitch">
                          <p>VLCi</p>
                          <Switch
                            id="VLCi"
                            name="VLCi"
                            value={VLCi}
                            checked={VLCi}
                            onChange={(event) => setVLCi(event.target.checked)}
                            color="primary" // Opcional: ajusta el color del switch
                          />
                        </div>
                        <div className="horizontalFormSwitch">
                          <p>ArcGIS</p>
                          <Switch
                            id="ArcGIS"
                            name="ArcGIS"
                            value={ArcGIS}
                            checked={ArcGIS}
                            onChange={(event) =>
                              setArcGIS(event.target.checked)
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
                            checked={Pentaho}
                            onChange={(event) =>
                              setPentaho(event.target.checked)
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
                            checked={CKAN}
                            onChange={(event) => setCKAN(event.target.checked)}
                            color="primary" // Opcional: ajusta el color del switch
                          />
                        </div>
                        <div className="horizontalFormSwitch">
                          <p>MongoDB</p>
                          <Switch
                            id="MongoDB"
                            name="MongoDB"
                            value={MongoDB}
                            checked={MongoDB}
                            onChange={(event) =>
                              setMongoDB(event.target.checked)
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
                            checked={OpenDataSoft}
                            onChange={(event) =>
                              setOpenDataSoft(event.target.checked)
                            }
                            color="primary" // Opcional: ajusta el color del switch
                          />
                        </div>
                        <div className="horizontalForm">
                          <p>Resolución temporal</p>
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
                          <p>Comentarios sobre el estado de carga</p>
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
                              handleChange(
                                "chargeStateComments",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                      <ButtonsForm info={buttonsFormProps} />
                    </div>
                  </form>
                )}
                {step === 5 && ( // VISUALIZACIONES/APLICACIONES CREADAS A PARTIR DEL DATASET
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
                      <div className="horizontalFormSwitch">
                        <p>{t("columnsNames.personalData")}</p>
                        <FormControl variant="standard">
                          <Switch
                            id="personalData"
                            name="personalData"
                            value={personalData}
                            checked={personalData}
                            onChange={(event) =>
                              setPersonalData(event.target.checked)
                            }
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
          </Dialog>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}
