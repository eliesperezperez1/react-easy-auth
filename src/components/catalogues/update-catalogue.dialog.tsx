import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
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
import baseTheme from "../darkModeSwitch/darkmodeTheme";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
  const [sensitiveInformation, setSensitiveInformation] = useState("SI");
  const [isUsing, setIsUsing] = useState("SI");
  const [structured, setStructured] = useState("SI");
  const [georeference, setGeoreference] = useState("SI");
  const [personalData, setPersonalData] = useState("SI");
  const [activeAds, setActiveAds] = useState("SI");
  const [lastUpdateAlmacenado, setLastUpdate] = React.useState<Dayjs | null>();
  const [creationDateAlmacenado, setCreationDate] =
    React.useState<Dayjs | null>();
  const { actualTheme } = useAlternateTheme();

  useEffect(() => {
    setUpdate(props.enviar.catalogue);
    setOpen(props.enviar.open);
   /*  setSensitiveInformation(props.enviar.catalogue.sensitiveInformation);
    setIsUsing(props.enviar.catalogue.isUsing);
    setStructured(props.enviar.catalogue.structured);
    setGeoreference(props.enviar.catalogue.georeference);
    setPersonalData(props.enviar.catalogue.personalData); */
    setActiveAds(props.enviar.catalogue.activeAds);
    //setLastUpdate(props.enviar.catalogue.lastUpdate);
    //setCreationDate(props.enviar.catalogue.creationDate);
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
    console.log(formData);
    setStep(step + 1);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const currentStepData = new FormData(event.currentTarget);
    const currentStepJson = Object.fromEntries(currentStepData.entries());
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    const mergedFormData = { ...formData, ...currentStepJson };
    console.log(mergedFormData);
    updateCatalogue(mergedFormData);
  };

  const handleSwitch = (nameSwitch: any, event: any) => {
    switch (nameSwitch) {
      case "sensitiveInformation":
        if (sensitiveInformation === "SI") {
          setSensitiveInformation("NO");
          setUpdate((prevState) => ({
            ...prevState,
            [sensitiveInformation]: "NO",
          }));
        } else {
          setSensitiveInformation("SI");
          setUpdate((prevState) => ({
            ...prevState,
            [sensitiveInformation]: "SI",
          }));
        }
        break;
      case "isUsing":
        if (isUsing === "SI") {
          setIsUsing("NO");
          setUpdate((prevState) => ({ ...prevState, [isUsing]: "NO" }));
        } else {
          setIsUsing("SI");
          setUpdate((prevState) => ({ ...prevState, [isUsing]: "SI" }));
        }
        break;
      case "structured":
        if (structured === "SI") {
          setStructured("NO");
          setUpdate((prevState) => ({ ...prevState, [structured]: "NO" }));
        } else {
          setStructured("SI");
          setUpdate((prevState) => ({ ...prevState, [structured]: "SI" }));
        }
        break;
      case "georeference":
        if (georeference === "SI") {
          setGeoreference("NO");
          setUpdate((prevState) => ({ ...prevState, [georeference]: "NO" }));
        } else {
          setGeoreference("SI");
          setUpdate((prevState) => ({ ...prevState, [georeference]: "SI" }));
        }
        break;
      case "personalData":
        if (personalData === "SI") {
          setPersonalData("NO");
          setUpdate((prevState) => ({ ...prevState, [personalData]: "NO" }));
        } else {
          setPersonalData("SI");
          setUpdate((prevState) => ({ ...prevState, [personalData]: "SI" }));
        }
        break;
      case "activeAds":
        if (activeAds === "SI") {
          setActiveAds("NO");
          setUpdate((prevState) => ({ ...prevState, [activeAds]: "NO" }));
        } else {
          setActiveAds("SI");
          setUpdate((prevState) => ({ ...prevState, [activeAds]: "SI" }));
        }
        break;
    }
  };

  const handleFormat = (event: any, newValue: any) => {
    setFormat(newValue);
    console.log(newValue);
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
              {t("dialog.updateRegister")}
            </DialogTitle>
            <DialogContent style={dynamicStyle}>
              <div className="dialogContentText">
                <span>{t("dialog.fillInfo")}</span>
                <span>
                  <b>{step}/5</b>
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
                          label={t("columnsNames.title")}
                          type="string"
                          variant="standard"
                          value={update.title}
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
                          value={update.description}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="horizontalForm">
                        <p>{t("columnsNames.language")}</p>
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
                        <p>{t("columnsNames.territorialScope")}</p>
                        <TextField
                          autoFocus
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
                        <p>{t("columnsNames.temporaryCoverage")}</p>
                        <TextField
                          autoFocus
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
                          margin="dense"
                          id="updateFrequency"
                          name="updateFrequency"
                          label={t("columnsNames.updateFrequency")}
                          type="string"
                          variant="standard"
                          value={update.updateFrequency}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="horizontalForm">
                        <p>{t("columnsNames.topic")}</p>
                        <TextField
                          autoFocus
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
                              value={format}
                              onChange={handleFormat}
                              disableCloseOnSelect={true}
                              renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                  <FormControlLabel
                                    control={<Checkbox checked={selected} />}
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
                            defaultValue={update.accessType}
                            onChange={(e) => handleChange}
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
                      <div className="horizontalForm">
                        <p>{t("columnsNames.contactPerson")}</p>
                        <TextField
                          autoFocus
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
                          margin="dense"
                          id="associatedApplication"
                          name="associatedApplication"
                          label="Aplicación asociada"
                          type="string"
                          variant="standard"
                          value={update.associatedApplication}
                          onChange={handleChange}
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
                        <p>Efecto temporal</p>
                        <TextField
                          autoFocus
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
                          value={update.responsibleIdentity}
                          onChange={handleChange}
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
            <DialogActions></DialogActions>
          </Dialog>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}
