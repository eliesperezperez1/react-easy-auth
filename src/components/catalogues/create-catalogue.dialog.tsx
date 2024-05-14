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
  createTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import "./create-catalogue.dialog.css";
import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import { grey } from "@mui/material/colors";
import { esES } from "@mui/x-data-grid/locales";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
  const [sensitiveInformation, setSensitiveInformation] = useState("SI");
  const [isUsing, setIsUsing] = useState("SI");
  const [structured, setStructured] = useState("SI");
  const [georeference, setGeoreference] = useState("SI");
  const [personalData, setPersonalData] = useState("SI");
  const [activeAds, setActiveAds] = useState("SI");
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
                {step === 1 && (
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
                          type="string"
                          variant="standard"
                          value={formDataSteps.title}
                          onChange={(e) =>
                            handleChange("title", e.target.value)
                          }
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
                          type="string"
                          variant="standard"
                          value={formDataSteps.description}
                          onChange={(e) =>
                            handleChange("description", e.target.value)
                          }
                        />
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
                      <div className="horizontalForm">
                        <p>{t("columnsNames.territorialScope")}</p>
                        <TextField
                          autoFocus
                          required
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
                        <p>{t("columnsNames.temporaryCoverage")}</p>
                        <TextField
                          autoFocus
                          required
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
                {step === 2 && (
                  <form onSubmit={handleNext}>
                    <div className="verticalForm">
                      <div className="horizontalForm">
                        <p>{t("columnsNames.updateFrequency")}</p>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="updateFrequency"
                          name="updateFrequency"
                          type="string"
                          variant="standard"
                          value={formDataSteps.updateFrequency}
                          onChange={(e) =>
                            handleChange("updateFrequency", e.target.value)
                          }
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
                          type="string"
                          variant="standard"
                          value={formDataSteps.topic}
                          onChange={(e) =>
                            handleChange("topic", e.target.value)
                          }
                        />
                      </div>
                      <div className="horizontalForm">
                        <p>{t("columnsNames.lastUpdate")}</p>
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
                      <div className="horizontalForm">
                        <p>{t("columnsNames.format")}</p>
                        <FormControl variant="standard">
                          <FormGroup>
                            <Autocomplete
                              multiple
                              id="format"
                              options={["PDF", "EXCEL", "CSV", "JSON"]}
                              sx={{
                                color:
                                  actualTheme === "light" ? "black" : "white",
                              }}
                              value={format}
                              onChange={handleFormat}
                              disableCloseOnSelect={true}
                              renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={selected}
                                        sx={{
                                          color:
                                            actualTheme === "light"
                                              ? "black"
                                              : "white",
                                        }}
                                      />
                                    }
                                    label={option}
                                    sx={{
                                      color:
                                        actualTheme === "light"
                                          ? "black"
                                          : "white",
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
                                    color:
                                      actualTheme === "light"
                                        ? "black"
                                        : "white",
                                  }}
                                />
                              )}
                            />
                          </FormGroup>
                        </FormControl>
                      </div>
                      <div className="horizontalForm">
                        <p>Distribución</p>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="distribution"
                          name="distribution"
                          type="string"
                          variant="standard"
                          value={formDataSteps.distribution}
                          onChange={(e) =>
                            handleChange("distribution", e.target.value)
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
                {step === 3 && (
                  <form onSubmit={handleNext}>
                    <div className="verticalForm">
                      <div className="horizontalFormSwitch">
                        <p>{t("columnsNames.sensitiveInformation")}</p>
                        <FormControl variant="standard">
                          <Switch
                            id="sensitiveInformation"
                            name="sensitiveInformation"
                            value={sensitiveInformation}
                            checked={sensitiveInformation === "SI"}
                            onChange={(event) =>
                              handleSwitch(
                                "sensitiveInformation",
                                event.target.checked
                              )
                            }
                            color="primary" // Opcional: ajusta el color del switch
                          />
                        </FormControl>
                      </div>
                      <div className="horizontalFormSwitch">
                        <p>Se está usando</p>
                        <FormControl variant="standard">
                          <Switch
                            id="isUsing"
                            name="isUsing"
                            value={isUsing}
                            checked={isUsing === "SI"}
                            onChange={(event) =>
                              handleSwitch("isUsing", event.target.checked)
                            }
                            color="primary" // Opcional: ajusta el color del switch
                          />
                        </FormControl>
                      </div>
                      <div className="horizontalForm">
                        <p>{t("columnsNames.accessType")}</p>
                        <FormControl variant="standard">
                          <Select
                            id="accessType"
                            name="accessType"
                            margin="dense"
                            defaultValue={formDataSteps.accessType}
                            onChange={(e) =>
                              handleChange("accessType", e.target.value)
                            }
                            required
                          >
                            <MenuItem value={"Públic/Público"}>
                              Público
                            </MenuItem>
                            <MenuItem value={"Restringit/Restringido"}>
                              Restringido
                            </MenuItem>
                            <MenuItem value={"Privat/Privado"}>
                              Privado
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div className="horizontalForm">
                        <p>Relación interna</p>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="internalRelationship"
                          name="internalRelationship"
                          type="string"
                          variant="standard"
                          value={formDataSteps.internalRelationship}
                          onChange={(e) =>
                            handleChange("internalRelationship", e.target.value)
                          }
                        />
                      </div>
                      <div className="horizontalForm">
                        <p>{t("columnsNames.contactPerson")}</p>

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
                {step === 4 && (
                  <form onSubmit={handleNext}>
                    <div className="verticalForm">
                      <div className="horizontalFormSwitch">
                        <p>Estructurado</p>
                        <FormControl variant="standard">
                          <Switch
                            id="structured"
                            name="structured"
                            value={structured}
                            checked={structured === "SI"}
                            onChange={(event) =>
                              handleSwitch("structured", event.target.checked)
                            }
                            color="primary" // Opcional: ajusta el color del switch
                          />
                        </FormControl>
                      </div>
                      <div className="horizontalForm">
                        <p>Aplicación asociada</p>
                        <TextField
                          autoFocus
                          required
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
                        <p>{t("columnsNames.georreference")}</p>
                        <FormControl variant="standard">
                          <Switch
                            id="georeference"
                            name="georeference"
                            value={georeference}
                            checked={georeference === "SI"}
                            onChange={(event) =>
                              handleSwitch("georeference", event.target.checked)
                            }
                            color="primary" // Opcional: ajusta el color del switch
                          />
                        </FormControl>
                      </div>
                      <div className="horizontalForm">
                        <p>{t("columnsNames.comments")}</p>
                        <TextField
                          autoFocus
                          required
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
                        <p>Efecto temporal</p>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="timmingEffect"
                          name="timmingEffect"
                          type="string"
                          variant="standard"
                          value={formDataSteps.timmingEffect}
                          onChange={(e) =>
                            handleChange("timmingEffect", e.target.value)
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
                {step === 5 && (
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
                          type="string"
                          variant="standard"
                          value={formDataSteps.source}
                          onChange={(e) =>
                            handleChange("source", e.target.value)
                          }
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
                          type="string"
                          variant="standard"
                          value={formDataSteps.responsibleIdentity}
                          onChange={(e) =>
                            handleChange("responsibleIdentity", e.target.value)
                          }
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
            <DialogActions
              sx={{
                backgroundColor: actualTheme === "light" ? "white" : "#252525",
                color: actualTheme === "light" ? "#252525" : "white",
                "& .MuiInputBase-root": { border: "none" },
              }}
            ></DialogActions>
          </Dialog>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}
