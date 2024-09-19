import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { CreateCatalogue } from "../../interfaces/catalogue.interface";
import { createCatalogueRequest } from "../../api/catalogues";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Rating,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import "./create-catalogue.dialog.css";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RESPONSIBLE_IDENTITY } from "../../utils/enums/responsible-identity.enum";
import { ORGANISM } from "../../utils/enums/organism.enum";
import { LANGUAGE_FORM } from "../../utils/enums/language-form.enum";
import { MINIMUM_VALUE } from "../../utils/enums/minimum-value.enum";
import { GEOGRAPHICAL_INFO } from "../../utils/enums/geographical-info.enum";
import { TOPIC } from "../../utils/enums/topic.enum";
import { SHARING_LEVEL } from "../../utils/enums/sharing-level.enum";
import { NO_APPLY } from "../../utils/enums/no-apply.enum";
import { catalogueMock } from "../../utils/catalogue.mock";
import ButtonsForm, { buttonsFormInfo } from "./buttons-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { getDynamicStyle } from "../../utils/functions/table-functions";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import { LocalizationProvider, esES } from "@mui/x-date-pickers";
import { grey } from "@mui/material/colors";
import { UPDATE_FREQUENCY } from "../../utils/enums/update-frequency.enum";
import { FORMAT } from "../../utils/enums/format.enum";
import { THEMEAPP } from "../../utils/enums/themeApp.enum";

export interface DialogData {
  open: boolean;
  closeDialog: (a: boolean) => void;
  getInfo: () => void;
}

/*
 * Renders a dialog for creating a new catalogue.
 *
 * This component is used to create a new catalogue by displaying a dialog with a form for inputting catalogue data.
 * The dialog is controlled by the `enviar` prop, which contains the necessary data and functions to manage the dialog state.
 *
 * @param {Object} props - The component props.
 * @param {DialogData} props.enviar - The dialog data.
 * @param {boolean} props.enviar.open - Whether the dialog is open or not.
 * @param {Function} props.enviar.closeDialog - A function to close the dialog.
 * @param {Function} props.enviar.getInfo - A function to get information.
 * @return {JSX.Element} The rendered dialog component.
 */
export default function CreateCatalogueDialog(props: { enviar: DialogData }) {
  const [open, setOpen] = useState<boolean>(false);
  const authHeader = useAuthHeader();
  const userData = useAuthUser();
  const [t, i18n] = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [formDataSteps, setFormDataSteps] = useState(catalogueMock);
  const [personalData, setPersonalData] = useState(true);
  const [activeAds, setActiveAds] = useState(true);
  const [masterData, setMasterData] = useState(true);
  const [referenceData, setReferenceData] = useState(true);
  const [highValue, setHighValue] = useState(true);
  const [formats, setFormats] = useState<string[]>([]);
  const [genderInfo, setGenderInfo] = useState<NO_APPLY>();
  const [autoAcess, setAutoAcess] = useState(true);
  const [RAT, setRAT] = useState<NO_APPLY>(); // NO SE GUARDA
  const [dataProtection, setDataProtection] = useState<NO_APPLY>();
  const [dataStandards, setDataStandards] = useState<NO_APPLY>(); // NO SE GUARDA
  const [dataAnonymize, setDataAnonymize] = useState<NO_APPLY>(NO_APPLY.false);
  const [sharedData, setSharedData] = useState(true);
  const [VLCi, setVLCi] = useState(true);
  const [ArcGIS, setArcGIS] = useState(true);
  const [Pentaho, setPentaho] = useState(true);
  const [CKAN, setCKAN] = useState(true);
  const [MongoDB, setMongoDB] = useState(true);
  const [OpenDataSoft, setOpenDataSoft] = useState(true);
  const [chips, setChips] = useState<string[]>([]);
  const [chipsDataAnonymize, setChipsDataAnonymize] = useState<string[]>([]);
  const [chipsFormats, setChipsFormats] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [inputValueDataAnonymize, setInputValueDataAnonymize] = useState<string>("");
  const [dataQuality, setDataQuality] = useState(0);
  const [disabledDataAnonymize, setDisabledDataAnonymize] = useState(false);
  const { actualTheme } = useAlternateTheme();
  const dynamicStyle = getDynamicStyle(actualTheme);
/**
 * Returns a custom Material-UI theme based on the given theme mode.
 *
 * @param {any} actualTheme - The theme mode, either "light" or "dark".
 * @return {Theme} The custom Material-UI theme.
 */
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
                color: actualTheme === THEMEAPP.light ? "black" : "white",
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
                color: actualTheme === THEMEAPP.light ? "black" : "white",
              },
            },
          },
          MuiSelect: {
            defaultProps: {
              variant: "standard",
            },
            styleOverrides: {
              icon: {
                color: actualTheme === THEMEAPP.light ? "black" : "white",
              },
            },
          },
          MuiMenuList: {
            styleOverrides: {
              root: {
                color: actualTheme === THEMEAPP.light ? "black" : "white",
              },
            },
          },
          MuiMenuItem: {
            styleOverrides: {
              root: {
                color: actualTheme === THEMEAPP.light ? "black" : "white",
              },
            },
          },
        },
        palette: {
          mode: actualTheme === THEMEAPP.light ? THEMEAPP.light : THEMEAPP.dark,
          ...(actualTheme === THEMEAPP.light
            ? {
                primary: grey,
                divider: grey[800],
                text: {
                  primary: grey[900],
                  secondary: grey[800],
                },
              }
            : {
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

  useEffect(() => {
    setOpen(props.enviar.open);
  }, [props]);

  /**
   * Renders a list of MenuItem components based on the values of the RESPONSIBLE_IDENTITY enum.
   * Excludes the GENERAL value from the list.
   *
   * @return {JSX.Element[]} An array of MenuItem components.
   */
  const renderResponsibleIdentity = () => {
    const menuItems = Object.entries(RESPONSIBLE_IDENTITY).map(
      ([key, value]) => {
        if (value === RESPONSIBLE_IDENTITY.GENERAL) {
          return null;
        }
        return (
          <MenuItem key={key} value={value}>
            {value}
          </MenuItem>
        );
      }
    );
    return menuItems;
  };

  /**
   * Handles the close event of the dialog. Resets form data, steps, format, and closes the dialog.
   *
   * @return {void} No return value.
   */
  const handleClose = () => {
    setFormData({});
    setFormDataSteps(catalogueMock);
    setStep(1);
    setFormats([]);
    setOpen(false);
    props.enviar.closeDialog(false);
  };

  const buttonsFormProps: buttonsFormInfo = {
    handleClose: () => handleClose(),
    handleGoBack: () => handleGoBack(),
    step: step,
    isUpdate: false,
  };
  
  /**
   * Handles the change event of the input field for keywords. If the input value ends with a semicolon,
   * it creates a new chip by removing the semicolon and trimming any whitespace, and adds it to the list of chips.
   * If the chip is not already in the list, it updates the form data steps with the new list of chips.
   * Finally, it clears the input value.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event triggered by the input field.
   * @return {void} This function does not return anything.
   */
  const handleChangeKeyWords = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.endsWith(";")) {
      const newChip = value.slice(0, -1).trim();
      if (newChip) {
        setChips((prevChips) => {
          if (!prevChips.includes(newChip)) {
            return [...prevChips, newChip];
          } else {
            return prevChips;
          }
        });
        setFormDataSteps({ ...formDataSteps, keyWords: [...chips] });
      }
      setInputValue("");
    } else {
      setInputValue(value);
    }
  };

/**
 * Removes a chip from the list of chips by filtering out the chip to delete.
 *
 * @param {string} chipToDelete - The chip to be removed from the list of chips.
 * @return {void} This function does not return anything.
 */
  const handleDeleteKeyWords = (chipToDelete: string) => {
    setChips((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  /**
   * Handles the change event of the input field for dataAnonymize. If the input value ends with a semicolon,
   * it creates a new chip by removing the semicolon and trimming any whitespace, and adds it to the list of chips.
   * If the chip is not already in the list, it updates the form data steps with the new list of chips.
   * Finally, it clears the input value.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event triggered by the input field.
   * @return {void} This function does not return anything.
   */
  const handleChangeDataAnonymize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.endsWith(";")) {
      const newChip = value.slice(0, -1).trim();
      if (newChip) {
        setChipsDataAnonymize((prevChips) => {
          if (!prevChips.includes(newChip)) {
            return [...prevChips, newChip];
          } else {
            return prevChips;
          }
        });
        setFormDataSteps({ ...formDataSteps, dataAnonymize: [...chipsDataAnonymize] });
      }
      setInputValueDataAnonymize("");
    } else {
      setInputValueDataAnonymize(value);
    }
    
  };

/**
 * Removes a chip from the list of chips by filtering out the chip to delete.
 *
 * @param {string} chipToDelete - The chip to be removed from the list of chips.
 * @return {void} This function does not return anything.
 */
  const handleDeleteDataAnonymize = (chipToDelete: string) => {
    setChipsDataAnonymize((chipsDataAnonymize) => chipsDataAnonymize.filter((chip) => chip !== chipToDelete));
  };

/**
 * Creates a new catalogue with the given form data and sends a request to the server to create it.
 *
 * @param {any} formJson - The form data to create the catalogue with.
 * @return {void} This function does not return anything.
 */
  const createCatalogue = (formJson: any) => {
    const deletedDate = new Date();
    const deleted = false;
    const prueba = formJson as CreateCatalogue;
    const create: CreateCatalogue = {
      ...prueba,
      minimumVariables : formDataSteps.minimumVariables === undefined ? MINIMUM_VALUE.no_apply : formDataSteps.minimumVariables,
      genderInfo: genderInfo === undefined ? NO_APPLY.no_apply : genderInfo,
      RAT: RAT === undefined ? NO_APPLY.no_apply : RAT,
      dataProtection: dataProtection === undefined ? NO_APPLY.no_apply : dataProtection,
      dataStandards: dataStandards === undefined ? NO_APPLY.no_apply : dataStandards,
      dataQuality,
      deleted,
      deletedDate,
    };
    createCatalogueRequest(create, authHeader())
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "create catalogue request");
      });
    props.enviar.getInfo();
    
    handleClose();
  };

/**
 * Decrements the step value by 1, returning to the previous step in the dialog.
 *
 * @return {void} This function does not return anything.
 */
  const handleGoBack = () => {
    setStep(step - 1);
  };

  const isGeneralOrTrans =
    userData().user.service === RESPONSIBLE_IDENTITY.GENERAL ||
    userData().user.service === RESPONSIBLE_IDENTITY.transparencia;

  /**
   * Handles the next step in the form submission process. First handles the format field,
   * then updates the form data with the new step data, and finally opens the next step.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   * @return {void} This function does not return anything.
   */
  const handleNext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentStepData = new FormData(event.currentTarget);

    if (
      (formats !== undefined || formats !== null) &&
      (currentStepData.get("format") !== null ||
        currentStepData.get("format") !== undefined)
    ) {
      const formatosDatos = formats.toString();
      const formatosDatosMod: string = formatosDatos.replace(/,/g, " / ");
      currentStepData.set("format", formatosDatosMod);
    }

    //--------------------------------------------------------------------
    const currentStepJson = Object.fromEntries(currentStepData.entries());
    setFormDataSteps((prevData) => ({ ...prevData, ...currentStepJson }));
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
    console.log(formData);
  };

/**
 * Handles the form submission for the current step. Collects the form data for the 
 * current step, merges it with the existing form data, and creates the catalogue.
 *
 * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
 * @return {void} This function does not return anything.
 */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const currentStepData = new FormData(event.currentTarget);
    const currentStepJson = Object.fromEntries(currentStepData.entries());
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    const mergedFormData = { ...formData, ...currentStepJson };
    createCatalogue(mergedFormData);
  };

  /**
   * Updates the form data steps and sets the data quality based on the field and value provided.
   *
   * @param {string} field - The name of the field to update.
   * @param {any} value - The new value for the field.
   * @return {void} This function does not return anything.
   */
  const handleChange = (field: string, value: any) => {
    if(field==="dataQuality"){
      setDataQuality(value);
      console.log("dataQuality:" + value);
    } 
    setFormDataSteps((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  /**
   * Runs when the `dataProtection` state changes.
   * If `dataProtection` is set to "no apply", it:
   * - Sets `dataAnonymize` to "no apply"
   * - Updates `formDataSteps` with `dataAnonymize` set to "no apply"
   * - Disables the `dataAnonymize` field
   * - Sets the input value of `dataAnonymize` to "NO_APPLY"
   * If `dataProtection` is not set to "no apply", it enables the `dataAnonymize` field.
   *
   * @param {string} dataProtection - The value of the `dataProtection` state.
   */
  useEffect(() => {
    if (dataProtection === NO_APPLY.no_apply) {
      setDataAnonymize(NO_APPLY.no_apply);
      setFormDataSteps({ ...formDataSteps, dataAnonymize: [NO_APPLY.no_apply] });
      setDisabledDataAnonymize(true); // or setDisabled(dataAnonymize !== NO_APPLY.no_apply)
      setInputValueDataAnonymize("NO_APPLY");
      setChipsDataAnonymize(["NO_APPLY"]);
    } else {
      setDataAnonymize(NO_APPLY.false);
      setChipsDataAnonymize([]);
      setFormDataSteps({ ...formDataSteps, dataAnonymize: [] });
      setInputValueDataAnonymize("");
      setDisabledDataAnonymize(false); // or setDisabled(dataAnonymize !== NO_APPLY.no_apply)

    }
  }, [dataProtection]);

  /**
   * Handles the change event of the input field for formats. If the input value is a string,
   * it splits the string into an array of strings using the comma as a separator.
   * Then, it sets the `formats` state with the new array of strings.
   * If the `formats` array contains at least one string, it updates the `formDataSteps` state
   * with the new array of strings.
   *
   * @param {SelectChangeEvent<typeof formats>} event - The change event triggered by the input field.
   * @return {void} This function does not return anything.
   */
  const handleChangeFormats = (event: SelectChangeEvent<typeof formats>) => {
    const { target: { value }, } = event;
    
    setFormats(
      typeof value === 'string' ? value.split(',') : value,
    );
    console.log("Hay " + formats.length + " formatos");
    if(formats !== undefined && formats !== null && formats.length > 0){
      setFormDataSteps({
        ...formDataSteps,
        format: formats,
      });
    }
  };

/**
 * Removes a chip from the list of chips by filtering out the chip to delete.
 *
 * @param {string} chipToDelete - The chip to be removed from the list of chips.
 * @return {void} This function does not return anything.
 */
  const handleDeleteFormats = (chipToDelete: string) => {
    setFormats((chips) => chips.filter((chip) => chip !== chipToDelete));
    if(formats !== undefined && formats !== null && formats.length > 0){
      console.log("Formatos antes eliminar: " + formDataSteps.format);
      setFormDataSteps({
        ...formDataSteps,
        format: formats.filter((chip) => chip !== chipToDelete),
      });
      console.log("Formatos después eliminar: " + formDataSteps.format);
    }
  };

  /**
   * Handles the change event triggered by a switch (checkbox) component.
   *
   * This function updates the state of the switch and the corresponding field in the formDataSteps state.
   * The function is used to manage the state of the switches in the catalogue creation form.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event triggered by the switch component.
   * @return {void} This function does not return anything.
   */
  const handleSwitchs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const checked = event.target.checked;
    switch(name){
      case "VLCi":
        setVLCi(checked);
        setFormDataSteps({
          ...formDataSteps,
          VLCi: checked,
        });
        break;
      case "ArcGIS":
        setArcGIS(checked);
        setFormDataSteps({
          ...formDataSteps,
          ArcGIS: checked,
        });
        break;
      case "Pentaho":
        setPentaho(checked);
        setFormDataSteps({
          ...formDataSteps,
          Pentaho: checked,
        });
        break;
      case "CKAN":
        setCKAN(checked);
        setFormDataSteps({
          ...formDataSteps,
          CKAN: checked,
        });
        break;
      case "MongoDB":
        setMongoDB(checked);
        setFormDataSteps({
          ...formDataSteps,
          MongoDB: checked,
        });
        break;
      case "OpenDataSoft":
        setOpenDataSoft(checked);
        setFormDataSteps({
          ...formDataSteps,
          OpenDataSoft: checked,
        });
        break;
    }
  }

  //const labels = ['Poor', 'Fair', 'Average', 'Good', 'Excellent'];
  const labels = ['', '', '', '', ''];
  const [hover, setHover] = useState(-1);


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
                {step === 1 && (
                  <form onSubmit={handleNext}>
                    <div className="grid">
                      <div className="row">
                        <div className="horizontalForm">
                          <p>{t("columnsNames.title")}*</p>
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
                          <p>{t("columnsNames.description")}*</p>
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
                          <p>{t("columnsNames.responsibleIdentity")}*</p>
                          <FormControl variant="standard">
                            <Select
                              id="responsibleIdentity"
                              name="responsibleIdentity"
                              margin="dense"
                              defaultValue={userData().user.service}
                              disabled={!isGeneralOrTrans}
                              onChange={(event) => {
                                setFormDataSteps({
                                  ...formDataSteps,
                                  responsibleIdentity: event.target
                                    .value as RESPONSIBLE_IDENTITY,
                                });
                              }}
                            >
                              {renderResponsibleIdentity()}
                            </Select>
                          </FormControl>
                        </div>
                        <div className="horizontalForm">
                          <p>{t("columnsNames.organism")}</p>
                          <FormControl variant="standard">
                            <Select
                              id="organism"
                              name="organism"
                              margin="dense"
                              defaultValue={formDataSteps.organism}
                              onChange={(event) => {
                                setFormDataSteps({
                                  ...formDataSteps,
                                  organism: event.target.value as ORGANISM,
                                });
                              }}
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
                          <p>{t("columnsNames.topic")}*</p>
                          <FormControl variant="standard">
                            <Select
                              id="topic"
                              name="topic"
                              margin="dense"
                              defaultValue={formDataSteps.topic}
                              onChange={(event) => {
                                setFormDataSteps({
                                  ...formDataSteps,
                                  topic: event.target.value as TOPIC,
                                });
                              }}
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
                              onChange={(event) => {
                                setFormDataSteps({
                                  ...formDataSteps,
                                  language: event.target.value as LANGUAGE_FORM,
                                });
                              }}
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
                          <p>{t("columnsNames.keyWords")}*</p>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column-reverse",
                            }}
                          >
                            <TextField
                              autoFocus
                              margin="dense"
                              id="keyWords"
                              name="keyWords"
                              type="string"
                              variant="standard"
                              value={inputValue}
                              onChange={handleChangeKeyWords}
                            />
                            <Box
                              sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
                            >
                              {chips.map((chip, index) => (
                                <Chip
                                  key={index}
                                  label={chip}
                                  onDelete={() => handleDeleteKeyWords(chip)}
                                  deleteIcon={<CancelIcon />}
                                />
                              ))}
                            </Box>
                          </Box>
                        </div>
                        <div className="horizontalForm">
                          <p>{t("columnsNames.minimumVariables")}</p>
                          <FormControl variant="standard">
                            <Select
                              id="minimumVariables"
                              name="minimumVariables"
                              margin="dense"
                              defaultValue={formDataSteps.minimumVariables}
                              onChange={(event) => {
                                setFormDataSteps({
                                  ...formDataSteps,
                                  minimumVariables: event.target.value as MINIMUM_VALUE,
                                });
                              }}
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
                          <p>{t("columnsNames.contactPerson")}*</p>
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
                          <p>{t("columnsNames.masterData")}*</p>
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
                          <p>{t("columnsNames.referenceData")}*</p>
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
                          <p>{t("columnsNames.highValue")}*</p>
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
                          <p>{t("columnsNames.activeAds")}*</p>
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
                          <p>{t("columnsNames.comments")}</p>
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
                          <p>{t("columnsNames.typeGeo")}</p>
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
                        <div className="horizontalForm">
                          <p>{t("columnsNames.format")}</p>
                          <FormControl variant="standard">
                            
                            <Select
                              labelId="demo-multiple-chip-label"
                              id="demo-multiple-chip"
                              multiple
                              value={formats}
                              onChange={handleChangeFormats}
                              renderValue={(selected) => (selected as string[]).join(', ')}
                            >
                              {Object.entries(FORMAT).map(([key, value]) => (
                                <MenuItem key={key} value={value}>
                                  <Checkbox checked={formats.indexOf(value) > -1} />
                                  <ListItemText primary={value} />
                                </MenuItem>
                              ))}
                            </Select>
                            
                          </FormControl>
                        </div>
                        <div className="horizontalFormSwitch">
                          <p>{t("columnsNames.genderInfo")}</p>
                          {/*<Switch
                            id="genderInfo"
                            name="genderInfo"
                            value={genderInfo}
                            checked={genderInfo === true}
                            onChange={(event) =>
                              setGenderInfo(event.target.checked)
                            }
                            color="primary" // Opcional: ajusta el color del switch
                          />*/}
                          <FormControl variant="standard">
                            <Select
                              id="genderInfo"
                              name="genderInfo"
                              margin="dense"
                              defaultValue={formDataSteps.genderInfo}
                              onChange={(event) => {
                                setGenderInfo(event.target.value as NO_APPLY);
                                console.log(event.target.value);
                              }}
                            >
                              {Object.entries(NO_APPLY).map(
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
                          <p>{t("columnsNames.structuredComments")}</p>
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
                {step === 3 && (
                  <form onSubmit={handleNext}>
                    <div className="verticalForm">
                      <div className="horizontalForm">
                        <p>{t("columnsNames.associatedApplication")}</p>
                        <TextField
                          autoFocus
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
                        <p>{t("columnsNames.autoAcess")}</p>
                        <Switch
                          id="autoAcess"
                          name="autoAcess"
                          value={autoAcess}
                          checked={autoAcess === true}
                          onChange={(event) =>
                            setAutoAcess(event.target.checked)
                          }
                          color="primary"
                        />
                      </div>
                      <div className="horizontalForm">
                        <p>{t("columnsNames.originComments")}</p>
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
                {step === 4 && (
                  <form onSubmit={handleNext}>
                    <div className="grid">
                      <div className="row">
                        <div className="horizontalFormSwitch">
                          <p>RAT</p>
                          {/*<Switch
                            id="RAT"
                            name="RAT"
                            value={RAT}
                            checked={RAT}
                            onChange={(event) => setRAT(event.target.checked)}
                            color="primary"
                          />*/}
                          <FormControl variant="standard">
                            <Select
                              id="RAT"
                              name="RAT"
                              margin="dense"
                              defaultValue={formDataSteps.RAT}
                              onChange={(event) => {
                                setRAT(event.target.value as NO_APPLY);
                              }}
                            >
                              {Object.entries(NO_APPLY).map(
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
                          <p>{t("columnsNames.dataProtection")}</p>
                          <FormControl variant="standard">
                            <Select
                              id="dataProtection"
                              name="dataProtection"
                              margin="dense"
                              defaultValue={formDataSteps.dataProtection}
                              onChange={(event) => {
                                setDataProtection(event.target.value as NO_APPLY);
                              }}
                            >
                              {Object.entries(NO_APPLY).map(
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
                          <p>{t("columnsNames.dataStandards")}</p>
                          <FormControl variant="standard">
                            <Select
                              id="dataStandards"
                              name="dataStandards"
                              margin="dense"
                              defaultValue={formDataSteps.dataStandards}
                              onChange={(event) => {
                                setDataStandards(event.target.value as NO_APPLY);
                              }}
                            >
                              {Object.entries(NO_APPLY).map(
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
                          <p>{t("columnsNames.dataProtectionComments")}</p>
                          <TextField
                            autoFocus
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
                          <p>{t("columnsNames.dataAnonymize")}</p>
                          {/*<Switch
                            id="dataAnonymize"
                            name="dataAnonymize"
                            value={dataAnonymize}
                            checked={dataAnonymize}
                            onChange={(event) =>
                              setDataAnonymize(event.target.checked)
                            }
                            color="primary"
                          />
                          */}
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column-reverse",
                            }}
                            
                          >
                            <TextField
                              autoFocus
                              margin="dense"
                              id="dataAnonymize"
                              name="dataAnonymize"
                              type="string"
                              variant="standard"
                              value={inputValueDataAnonymize}
                              onChange={handleChangeDataAnonymize}
                              disabled={disabledDataAnonymize}
                            />
                            <Box
                              sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
                            >
                              {chipsDataAnonymize.map((chip, index) => (
                                <Chip
                                  key={index}
                                  label={chip}
                                  onDelete={() => handleDeleteDataAnonymize(chip)}
                                  deleteIcon={<CancelIcon />}
                                  disabled={disabledDataAnonymize}
                                />
                              ))}
                            </Box>
                          </Box>
                        </div>
                        <div className="horizontalFormStars">
                          <p>{t("columnsNames.dataQuality")}</p>
                          <Rating
                            value={formDataSteps.dataQuality}
                            precision={1}
                            onChange={(e, value) =>
                              handleChange("dataQuality", value)
                            }
                            onChangeActive={(event, newHover) => {
                              setHover(newHover);
                            }}
                          />
                          {formDataSteps.dataQuality !== null && (
                            <Typography ml={2}>{labels[hover !== -1 ? hover : formDataSteps.dataQuality]}</Typography>
                          )}
                        </div>
                        <div className="horizontalForm">
                          <p>{t("columnsNames.sharingLevel")}</p>
                          <FormControl variant="standard">
                            <Select
                              id="sharingLevel"
                              name="sharingLevel"
                              margin="dense"
                              defaultValue={formDataSteps.sharingLevel}
                              onChange={(event) => {
                                setFormDataSteps({
                                  ...formDataSteps,
                                  sharingLevel: event.target
                                    .value as SHARING_LEVEL,
                                });
                              }}
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
                          <p>{t("columnsNames.sharedData")}</p>
                          <Switch
                            id="sharedData"
                            name="sharedData"
                            value={sharedData}
                            checked={sharedData}
                            onChange={(event) =>
                              setSharedData(event.target.checked)
                            }
                            color="primary"
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
                            onChange={(event) => 
                              handleSwitchs(event)
                            }
                            color="primary"
                          />
                        </div>
                        <div className="horizontalFormSwitch">
                          <p>ArcGIS</p>
                          <Switch
                            id="ArcGIS"
                            name="ArcGIS"
                            value={ArcGIS}
                            checked={ArcGIS === true}
                            onChange={(event) =>
                              handleSwitchs(event)
                            }
                            color="primary"
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
                              handleSwitchs(event)
                            }
                            color="primary"
                          />
                        </div>
                        <div className="horizontalFormSwitch">
                          <p>CKAN</p>
                          <Switch
                            id="CKAN"
                            name="CKAN"
                            value={CKAN}
                            checked={CKAN}
                            onChange={(event) => 
                              handleSwitchs(event)
                            }
                            color="primary"
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
                              handleSwitchs(event)
                            }
                            color="primary"
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
                              handleSwitchs(event)
                            }
                            color="primary"
                          />
                        </div>
                        <div className="horizontalForm">
                          <p>{t("columnsNames.temporarySolution")}</p>
                          {/*
                          <TextField
                            autoFocus
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
                          */}
                          <FormControl variant="standard">
                            <Select
                              id="temporarySolution"
                              name="temporarySolution"
                              margin="dense"
                              defaultValue={formDataSteps.temporarySolution}
                              onChange={(event) => {
                                setFormDataSteps({
                                  ...formDataSteps,
                                  temporarySolution: event.target.value as UPDATE_FREQUENCY,
                                });
                              }}
                            >
                              {Object.entries(UPDATE_FREQUENCY).map(([key, value]) => (
                                <MenuItem key={key} value={value}>
                                  {value}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                        <div className="horizontalForm">
                          <p>{t("columnsNames.chargeStateComments")}</p>
                          <TextField
                            autoFocus
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
                {step === 5 && (
                  <form onSubmit={handleSubmit}>
                    <div className="verticalForm">
                      <div className="horizontalForm">
                        <p>{t("columnsNames.productData")}</p>
                        <TextField
                          autoFocus
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
                        <p>{t("columnsNames.productComments")}</p>
                        <TextField
                          autoFocus
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
                            color="primary"
                          />
                        </FormControl>
                      </div>
                    </div>
                    <ButtonsForm info={buttonsFormProps} />
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


