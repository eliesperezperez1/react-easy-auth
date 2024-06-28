import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import {
  Catalogue,
  UpdateCatalogue,
} from "../../interfaces/catalogue.interface";
import { updateCatalogueRequest } from "../../api/catalogues";
import { useAuthHeader } from "react-auth-kit";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Switch,
  ThemeProvider,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import baseTheme from "../darkModeSwitch/darkmodeTheme";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TOPIC } from "../../utils/enums/topic.enum";
import { LANGUAGE_FORM } from "../../utils/enums/language-form.enum";
import { GEOGRAPHICAL_INFO } from "../../utils/enums/geographical-info.enum";
import { SHARING_LEVEL } from "../../utils/enums/sharing-level.enum";
import { RESPONSIBLE_IDENTITY } from "../../utils/enums/responsible-identity.enum";
import { ORGANISM } from "../../utils/enums/organism.enum";
import { MINIMUM_VALUE } from "../../utils/enums/minimum-value.enum";
import ButtonsForm, { buttonsFormInfo } from "./buttons-form";
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
  const [format, setFormat] = React.useState<string[]>([]);
  const [personalData, setPersonalData] = useState(false);
  const [activeAds, setActiveAds] = useState(false);
  const [masterData, setMasterData] = useState(false);
  const [referenceData, setReferenceData] = useState(false);
  const [highValue, setHighValue] = useState(false);
  const [genderInfo, setGenderInfo] = useState(false);
  const [RAT, setRAT] = useState(false);
  const [dataProtection, setDataProtection] = useState(false);
  const [dataStandards, setDataStandards] = useState(false);
  const [dataAnonymize, setDataAnonymize] = useState(false);
  const [sharedData, setSharedData] = useState(false);
  const [VLCi, setVLCi] = useState(false);
  const [ArcGIS, setArcGIS] = useState(false);
  const [Pentaho, setPentaho] = useState(false);
  const [CKAN, setCKAN] = useState(false);
  const [MongoDB, setMongoDB] = useState(false);
  const [OpenDataSoft, setOpenDataSoft] = useState(false);
  const [lastUpdateAlmacenado, setLastUpdate] = useState<Dayjs>();
  const [creationDateAlmacenado, setCreationDate] = useState<Dayjs>();
  const { actualTheme } = useAlternateTheme();

  useEffect(() => {
    console.log(props.enviar.catalogue);
    setUpdate(props.enviar.catalogue);
    setOpen(props.enviar.open);
    setActiveAds(props.enviar.catalogue.activeAds);
    setMasterData(props.enviar.catalogue.masterData);
    setReferenceData(props.enviar.catalogue.referenceData);
    setHighValue(props.enviar.catalogue.highValue);
    setGenderInfo(props.enviar.catalogue.genderInfo);
    setRAT(props.enviar.catalogue.RAT);
    setDataProtection(props.enviar.catalogue.dataProtection);
    setDataStandards(props.enviar.catalogue.dataStandards);
    setDataAnonymize(props.enviar.catalogue.dataAnonymize);
    setSharedData(props.enviar.catalogue.sharedData);
    setVLCi(props.enviar.catalogue.VLCi);
    setArcGIS(props.enviar.catalogue.ArcGIS);
    setPentaho(props.enviar.catalogue.Pentaho);
    setCKAN(props.enviar.catalogue.CKAN);
    setMongoDB(props.enviar.catalogue.MongoDB);
    setOpenDataSoft(props.enviar.catalogue.OpenDataSoft);
    if(update.lastUpdate !== undefined && update.lastUpdate !== null){
      setLastUpdate(dayjs(update.lastUpdate.toString()));
    }
    if(update.creationDate !== undefined && update.creationDate !== null){
      setCreationDate(dayjs(update.creationDate.toString()));
    }
    setStep(1);
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

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setUpdate((prevState) => ({ ...prevState, [name]: checked }));
    switch (name) {
      case "activeAds":
        setActiveAds(checked);
        break;
      case "masterData":
        setMasterData(checked);
        break;
      case "referenceData":
        setReferenceData(checked);
        break;
      case "highValue":
        setHighValue(checked);
        break;
      case "genderInfo":
        setGenderInfo(checked);
        break;
      case "RAT":
        setRAT(checked);
        break;
      case "dataProtection":
        setDataProtection(checked);
        break;
      case "dataStandards":
        setDataStandards(checked);
        break;
      case "dataAnonymize":
        setDataAnonymize(checked);
        break;
      case "sharedData":
        setSharedData(checked);
        break;
      case "VLCi":
        setVLCi(checked);
        break;
      case "ArcGIS":
        setArcGIS(checked);
        break;
      case "Pentaho":
        setPentaho(checked);
        break;
      case "CKAN":
        setCKAN(checked);
        break;
      case "MongoDB":
        setMongoDB(checked);
        break;
      case "OpenDataSoft":
        setOpenDataSoft(checked);
        break;
      default:
        break;
    }
  };

  const buttonsFormProps: buttonsFormInfo = {
    handleClose: () => handleClose(),
    handleGoBack: () => handleGoBack(),
  };

  const updateCatalogue = (formJson: any) => {
    const b = formJson.creationDate;
    const deletedDate = new Date();
    const deleted = false;
    const lastUpdate = new Date();
    const creationDate = new Date(b);
    const prueba = formJson as UpdateCatalogue;
    setUpdate({
      ...prueba,
      deleted,
      deletedDate,
      lastUpdate,
      creationDate,
      verified: true,
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
      const formatosDatosMod = formatosDatos.replace(/,/g, " / ");
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

    if (
      creationDateAlmacenado !== undefined &&
      creationDateAlmacenado !== null &&
      (currentStepData.get("creationDate") !== null ||
        currentStepData.get("creationDate") !== undefined)
    ) {
      const creationDateDatos = creationDateAlmacenado.toString();
      currentStepData.set("creationDate", creationDateDatos);
    }

    const currentStepJson = Object.fromEntries(currentStepData.entries());

    // Merge current step data with existing form data
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    console.log(masterData,
      activeAds,
      referenceData,
      highValue,
      genderInfo,
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
      OpenDataSoft);
    setFormData((prevData) => ({
      ...prevData,
      ...currentStepJson,
      masterData,
      activeAds,
      referenceData,
      highValue,
      genderInfo,
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
    const currentStepJson = Object.fromEntries(currentStepData.entries());
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    const mergedFormData = { ...formData, ...currentStepJson };
    updateCatalogue(mergedFormData);
  };

  const handleFormat = (event: any, newValue: any) => {
    setFormat(newValue);
  };

  const handleValuePicker = (picker: any) => {
    if (picker === "lastUpdate") {
      if (update.lastUpdate !== undefined) {
        const dateObject = new Date(update.lastUpdate);
        const formattedDate = dateObject.toISOString().slice(0, 16);
        return formattedDate;
      }
    } else if (picker === "creationDate") {
      if (update.creationDate !== undefined) {
        const dateObject = new Date(update.creationDate);
        const formattedDate = dateObject.toISOString().slice(0, 16);
        return formattedDate;
      }
    }
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
                            value={update.title}
                            onChange={handleChange}
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
                            value={update.description}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="horizontalForm">
                          <p>{t("columnsNames.responsibleIdentity")} *</p>
                          <FormControl variant="standard">
                            <Select
                              id="responsibleIdentity"
                              name="responsibleIdentity"
                              margin="dense"
                              defaultValue={update.responsibleIdentity}
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
                              defaultValue={update.organism}
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
                              defaultValue={update.topic}
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
                              defaultValue={update.language}
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
                            value={update.keyWords}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="horizontalForm">
                          <p>Campos mínimos *</p>
                          <FormControl variant="standard">
                            <Select
                              id="minimumVariables"
                              name="minimumVariables"
                              margin="dense"
                              defaultValue={update.minimumVariables}
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
                            value={update.contactPerson}
                            onChange={handleChange}
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
                          <FormControl variant="standard">
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
                          </FormControl>
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
                            value={update.comments}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="horizontalForm">
                          <p>Fecha de creación *</p>
                          <DateTimePicker
                            format="DD/MM/YYYY hh:mm:ss a"
                            name="creationDate"
                            defaultValue={creationDateAlmacenado}
                            onChange={(e) => {
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
                              defaultValue={update.typeGeo}
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
                            value={update.temporaryCoverage}
                            onChange={handleChange}
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
                            value={update.structuredComments}
                            onChange={handleChange}
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
                          value={update.associatedApplication}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="horizontalFormSwitch">
                        <p>Acceso automatizado</p>
                        <Switch
                          id="autoAcess"
                          name="autoAcess"
                          value={update.autoAcess}
                          checked={update.autoAcess}
                          onChange={handleChange}
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
                          value={update.originComments}
                          onChange={handleChange}
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
                            value={update.dataProtectionComments}
                            onChange={handleChange}
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
                            value={update.dataQuality}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="horizontalForm">
                          <p>Nivel de compartición *</p>
                          <FormControl variant="standard">
                            <Select
                              id="sharingLevel"
                              name="sharingLevel"
                              margin="dense"
                              defaultValue={update.sharingLevel}
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
                            value={update.temporarySolution}
                            onChange={handleChange}
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
                            value={update.chargeStateComments}
                            onChange={handleChange}
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
                          value={update.productData}
                          onChange={handleChange}
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
                          value={update.productComments}
                          onChange={handleChange}
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
