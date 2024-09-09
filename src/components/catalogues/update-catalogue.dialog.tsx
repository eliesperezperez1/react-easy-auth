import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Catalogue,
  UpdateCatalogue,
} from "../../interfaces/catalogue.interface";
import { updateCatalogueRequest } from "../../api/catalogues";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import baseTheme from "../darkModeSwitch/darkmodeTheme";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TOPIC } from "../../utils/enums/topic.enum";
import { LANGUAGE_FORM } from "../../utils/enums/language-form.enum";
import { GEOGRAPHICAL_INFO } from "../../utils/enums/geographical-info.enum";
import { SHARING_LEVEL } from "../../utils/enums/sharing-level.enum";
import { RESPONSIBLE_IDENTITY } from "../../utils/enums/responsible-identity.enum";
import { ORGANISM } from "../../utils/enums/organism.enum";
import { MINIMUM_VALUE } from "../../utils/enums/minimum-value.enum";
import ButtonsForm, { buttonsFormInfo } from "./buttons-form";
import Rating from "@mui/material/Rating";
import CancelIcon from "@mui/icons-material/Cancel";
import { getDynamicStyle } from "../../utils/functions/table-functions";
import { NO_APPLY } from "../../utils/enums/no-apply.enum";
import { UPDATE_FREQUENCY } from "../../utils/enums/update-frequency.enum";
import { FORMAT } from "../../utils/enums/format.enum";

export interface UpdateDialogData {
  open: boolean;
  closeDialog: (a: boolean) => void;
  getInfo: () => void;
  catalogue: Catalogue;
}
/**
 * Renders a dialog for updating a catalogue.
 *
 * @param {object} props - The props object containing the enviar property.
 * @param {object} props.enviar - The enviar object containing the catalogue and open properties.
 * @param {object} props.enviar.catalogue - The catalogue object to be updated.
 * @param {boolean} props.enviar.open - The open state of the dialog.
 * @return {JSX.Element} The rendered UpdateCatalogueDialog component.
 */
export default function UpdateCatalogueDialog(props: {
  enviar: UpdateDialogData;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const authHeader = useAuthHeader();
  const userData = useAuthUser();

  const [update, setUpdate] = useState<UpdateCatalogue>({});
  const [t, i18n] = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [format, setFormat] = useState<string[]>([]);
  const [personalData, setPersonalData] = useState(false);
  const [activeAds, setActiveAds] = useState(false);
  const [masterData, setMasterData] = useState(false);
  const [referenceData, setReferenceData] = useState(false);
  const [highValue, setHighValue] = useState(false);
  const [formats, setFormats] = useState<string[]>([]);
  const [genderInfo, setGenderInfo] = useState<NO_APPLY>();
  const [RAT, setRAT] = useState<NO_APPLY>();
  const [dataProtection, setDataProtection] = useState<NO_APPLY>();
  const [dataStandards, setDataStandards] = useState<NO_APPLY>();
  const [dataAnonymize, setDataAnonymize] = useState<NO_APPLY>(NO_APPLY.false);
  const [sharedData, setSharedData] = useState(false);
  const [VLCi, setVLCi] = useState(false);
  const [ArcGIS, setArcGIS] = useState(false);
  const [Pentaho, setPentaho] = useState(false);
  const [CKAN, setCKAN] = useState(false);
  const [MongoDB, setMongoDB] = useState(false);
  const [OpenDataSoft, setOpenDataSoft] = useState(false);
  const [chips, setChips] = useState<string[]>([]);
  const [chipsDataAnonymize, setChipsDataAnonymize] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [inputValueDataAnonymize, setInputValueDataAnonymize] = useState<string>("");
  const [disabledDataAnonymize, setDisabledDataAnonymize] = useState(false);
  const { actualTheme } = useAlternateTheme();

  useEffect(() => {
    setUpdate(props.enviar.catalogue);
    setOpen(props.enviar.open);
    setActiveAds(props.enviar.catalogue.activeAds);
    setStep(1);
    if (props.enviar.catalogue.keyWords !== undefined || props.enviar.catalogue.keyWords !== null) {
      setChips(props.enviar.catalogue.keyWords);
    }
    if (props.enviar.catalogue.dataAnonymize !== undefined || props.enviar.catalogue.dataAnonymize !== null) {
      setChipsDataAnonymize(props.enviar.catalogue.dataAnonymize);
    }
    if(props.enviar.catalogue.dataProtection === NO_APPLY.no_apply){
      setDisabledDataAnonymize(true);
      setDataProtection(NO_APPLY.no_apply);
    }
  }, [props.enviar.open, props.enviar.catalogue]);

  /**
   * Handles the close event of the dialog. Resets steps and closes the dialog.
   *
   * @return {void} No return value.
   */
  const handleClose = () => {
    setOpen(false);
    setStep(1);
    props.enviar.closeDialog(false);
  };

  /**
   * Updates the state with the new value of the input field.
   *
   * @param {ChangeEvent<HTMLInputElement>} event - The event triggered by the input field change.
   * @return {void} This function does not return anything.
   */
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdate((prevState) => ({ ...prevState, [name]: value }));
  };

  const buttonsFormProps: buttonsFormInfo = {
    handleClose: () => handleClose(),
    handleGoBack: () => handleGoBack(),
    step: step,
    isUpdate: true,
  };
  const isGeneralOrTrans =
    userData().user.service === RESPONSIBLE_IDENTITY.GENERAL ||
    userData().user.service === RESPONSIBLE_IDENTITY.transparencia;

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
    if (
      update.responsibleIdentity &&
      !Object.values(RESPONSIBLE_IDENTITY).includes(update.responsibleIdentity)
    ) {
      menuItems.push(
        <MenuItem key="custom" value={update.responsibleIdentity}>
          {update.responsibleIdentity}
        </MenuItem>
      );
    }
    return menuItems;
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
        setUpdate({ ...update, keyWords: [...chips] });
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
        setUpdate({ ...update, dataAnonymize: [...chipsDataAnonymize] });
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
 * Renders a list of MenuItem components based on the values of the ORGANISM enum.
 * If the update.organism value is not included in the enum values, a custom 
 * MenuItem component is added.
 *
 * @return {JSX.Element[]} An array of MenuItem components.
 */
  const renderOrganism = () => {
    const menuItems = Object.entries(ORGANISM).map(([key, value]) => {
      return (
        <MenuItem key={key} value={value}>
          {value}
        </MenuItem>
      );
    });
    if (update.organism && !Object.values(ORGANISM).includes(update.organism)) {
      menuItems.push(
        <MenuItem key="custom" value={update.organism}>
          {update.organism}
        </MenuItem>
      );
    }
    return menuItems;
  };
  
  /**
   * Renders a list of MenuItem components based on the values of the TOPIC enum.
   * If the update.topic value is not included in the enum values, a custom 
   * MenuItem component is added.
   *
   * @return {JSX.Element[]} An array of MenuItem components.
   */
  const renderTopic = () => {
    const menuItems = Object.entries(TOPIC).map(([key, value]) => {
      return (
        <MenuItem key={key} value={value}>
          {value}
        </MenuItem>
      );
    });
    if (update.topic && !Object.values(TOPIC).includes(update.topic)) {
      menuItems.push(
        <MenuItem key="custom" value={update.topic}>
          {update.topic}
        </MenuItem>
      );
    }
    return menuItems;
  };

  /**
   * Updates a catalogue with the provided form data and sends a request to the server to update it.
   *
   * @param {any} formJson - The form data to update the catalogue with.
   * @return {void} This function does not return anything.
   */
  const updateCatalogue = (formJson: any) => {
    //const b = formJson.creationDate;
    const deletedDate = new Date();
    const deleted = false;
    const prueba = formJson as UpdateCatalogue;
    setUpdate({
      ...prueba,
      deleted,
      deletedDate,
      verified: true,
    });
    console.log(update);
    updateCatalogueRequest(
      props.enviar.catalogue._id,
      update,
      authHeader()
    ).then((response) => response.json());
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

  /**
   * Handles the next step in the form submission process. First handles the format field,
   * then updates the form data with the new step data, and finally opens the next step.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   * @return {void} This function does not return anything.
   */
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
    const currentStepJson = Object.fromEntries(currentStepData.entries());
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    setStep(step + 1);
  };

  /**
   * Handles the form submission for the current step. Collects the form data for the 
   * current step, merges it with the existing form data, and updates the catalogue.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   * @return {void} This function does not return anything.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const currentStepData = new FormData(event.currentTarget);
    const currentStepJson = Object.fromEntries(currentStepData.entries());
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    const mergedFormData = { ...formData, ...currentStepJson };
    updateCatalogue(mergedFormData);
  };

  /**
   * Runs when the `dataProtection` state changes.
   * If `dataProtection` is set to "no apply", it:
   * - Sets `dataAnonymize` to "no apply"
   * - Updates `update` with `dataAnonymize` set to "no apply"
   * - Disables the `dataAnonymize` field
   * - Sets the input value of `dataAnonymize` to "NO_APPLY"
   * If `dataProtection` is not set to "no apply", it enables the `dataAnonymize` field.
   *
   * @param {string} dataProtection - The value of the `dataProtection` state.
   */
  useEffect(() => {
    if (dataProtection === NO_APPLY.no_apply) {
      setDataAnonymize(NO_APPLY.no_apply);
      setUpdate({ ...update, dataAnonymize: [NO_APPLY.no_apply] });
      setDisabledDataAnonymize(true); // or setDisabled(dataAnonymize !== NO_APPLY.no_apply)
      setInputValueDataAnonymize("NO_APPLY");
      setChipsDataAnonymize(["NO_APPLY"]);
    } else {
      setDataAnonymize(NO_APPLY.false);
      setChipsDataAnonymize([]);
      setUpdate({ ...update, dataAnonymize: [] });
      setInputValueDataAnonymize("");
      setDisabledDataAnonymize(false); // or setDisabled(dataAnonymize !== NO_APPLY.no_apply)

    }
  }, [dataProtection]);

   /**
   * Handles the change event of the input field for formats. If the input value is a string,
   * it splits the string into an array of strings using the comma as a separator.
   * Then, it sets the `formats` state with the new array of strings.
   * If the `formats` array contains at least one string, it updates the `update` state
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
    if(formats !== undefined && formats !== null && formats.length > 0){
      setUpdate({
        ...update,
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
      setUpdate({
        ...update,
        format: formats.filter((chip) => chip !== chipToDelete),
      });
    }
  };

  /**
   * Handles the change event triggered by a switch (checkbox) component.
   *
   * This function updates the state of the switch and the corresponding field in the update state.
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
        setUpdate({
          ...update,
          VLCi: checked,
        });
        break;
      case "ArcGIS":
        setArcGIS(checked);
        setUpdate({
          ...update,
          ArcGIS: checked,
        });
        break;
      case "Pentaho":
        setPentaho(checked);
        setUpdate({
          ...update,
          Pentaho: checked,
        });
        break;
      case "CKAN":
        setCKAN(checked);
        setUpdate({
          ...update,
          CKAN: checked,
        });
        break;
      case "MongoDB":
        setMongoDB(checked);
        setUpdate({
          ...update,
          MongoDB: checked,
        });
        break;
      case "OpenDataSoft":
        setOpenDataSoft(checked);
        setUpdate({
          ...update,
          OpenDataSoft: checked,
        });
        break;
    }
  }


  const dynamicStyle = getDynamicStyle(actualTheme);
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
              {t("dialog.updateRegister")}
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
                          <p>{t("columnsNames.title")}*</p>
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
                          <p>{t("columnsNames.description")}*</p>
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
                          <p>{t("columnsNames.responsibleIdentity")}*</p>
                          <FormControl variant="standard">
                            <Select
                              id="responsibleIdentity"
                              name="responsibleIdentity"
                              margin="dense"
                              defaultValue={update.responsibleIdentity}
                              disabled={!isGeneralOrTrans}
                              onChange={(event) => {
                                setUpdate({
                                  ...update,
                                  responsibleIdentity: event.target.value as RESPONSIBLE_IDENTITY,
                                });
                              }}
                            >
                              {renderResponsibleIdentity()}
                            </Select>
                          </FormControl>
                        </div>
                        <div className="horizontalForm">
                          <p>{t("columnsNames.organism")}*</p>
                          <FormControl variant="standard">
                            <Select
                              id="organism"
                              name="organism"
                              margin="dense"
                              defaultValue={update.organism}
                              onChange={(event) => {
                                setUpdate({
                                  ...update,
                                  organism: event.target.value as ORGANISM,
                                });
                              }}
                            >
                              {renderOrganism()}
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
                              defaultValue={update.topic}
                              onChange={(event) => {
                                setUpdate({
                                  ...update,
                                  topic: event.target.value as TOPIC,
                                });
                              }}
                            >
                              {renderTopic()}
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
                              onChange={(event) => {
                                setUpdate({
                                  ...update,
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
                          <p>{t("columnsNames.minimumVariables")}*</p>
                          <FormControl variant="standard">
                            <Select
                              id="minimumVariables"
                              name="minimumVariables"
                              margin="dense"
                              defaultValue={update.minimumVariables}
                              onChange={(event) => {
                                setUpdate({
                                  ...update,
                                  minimumVariables: event.target
                                    .value as MINIMUM_VALUE,
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
                            value={update.contactPerson}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="horizontalFormSwitch">
                          <p>{t("columnsNames.masterData")}</p>
                          <Switch
                            id="masterData"
                            name="masterData"
                            value={masterData}
                            checked={masterData}
                            onChange={(event) =>
                              setMasterData(event.target.checked)
                            }
                            color="primary"
                          />
                        </div>
                        <div className="horizontalFormSwitch">
                          <p>{t("columnsNames.referenceData")}</p>
                          <Switch
                            id="referenceData"
                            name="referenceData"
                            value={referenceData}
                            checked={referenceData}
                            onChange={(event) =>
                              setReferenceData(event.target.checked)
                            }
                            color="primary"
                          />
                        </div>
                        <div className="horizontalFormSwitch">
                          <p>{t("columnsNames.highValue")}</p>
                          <Switch
                            //required
                            id="highValue"
                            name="highValue"
                            value={highValue}
                            checked={highValue}
                            onChange={(event) =>
                              setHighValue(event.target.checked)
                            }
                            color="primary"
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
                              color="primary"
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
                            value={update.comments}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <ButtonsForm info={buttonsFormProps} />
                  </form>
                )}
                {step === 2 && (
                  <form onSubmit={handleNext}>
                    <div className="grid">
                      <div className="row">
                        <div className="horizontalForm">
                          <p>{t("columnsNames.typeGeo")}*</p>
                          <FormControl variant="standard">
                            <Select
                              id="typeGeo"
                              name="typeGeo"
                              margin="dense"
                              defaultValue={update.typeGeo}
                              onChange={(event) => {
                                setUpdate({
                                  ...update,
                                  typeGeo: event.target
                                    .value as GEOGRAPHICAL_INFO,
                                });
                              }}
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
                              defaultValue={update.genderInfo}
                              onChange={(event) => {
                                setUpdate({
                                  ...update,
                                  genderInfo: event.target.value as NO_APPLY,
                                });
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
                            value={update.structuredComments}
                            onChange={handleChange}
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
                          value={update.associatedApplication}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="horizontalFormSwitch">
                        <p>{t("columnsNames.autoAcess")}</p>
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
                        <p>{t("columnsNames.originComments")}</p>
                        <TextField
                          autoFocus
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
                            color="primary" // Opcional: ajusta el color del switch
                          />*/}
                          <FormControl variant="standard">
                            <Select
                              id="RAT"
                              name="RAT"
                              margin="dense"
                              defaultValue={update.RAT}
                              onChange={(event) => {
                                setUpdate({
                                  ...update,
                                  RAT: event.target.value as NO_APPLY,
                                });
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
                              defaultValue={update.dataProtection}
                              onChange={(event) => {
                                setUpdate({
                                  ...update,
                                  dataProtection: event.target.value as NO_APPLY,
                                });
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
                              defaultValue={update.dataStandards}
                              onChange={(event) => {
                                setUpdate({
                                  ...update,
                                  dataStandards: event.target.value as NO_APPLY,
                                });
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
                          <p>{t("columnsNames.dataAnonymize")}</p>
                          {/*<Switch
                            id="dataAnonymize"
                            name="dataAnonymize"
                            value={dataAnonymize}
                            checked={dataAnonymize}
                            onChange={(event) =>
                              setDataAnonymize(event.target.checked)
                            }
                            color="primary" // Opcional: ajusta el color del switch
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
                            value={update.dataQuality}
                            precision={1}
                            onChange={(event, newValue) => {
                              setUpdate({ ...update, dataQuality: newValue });
                            }}
                            onChangeActive={(event, newHover) => {
                              setHover(newHover);
                            }}
                          />
                          {update.dataQuality !== null && update.dataQuality !== undefined && (
                            <Typography ml={2}>{labels[hover !== -1 ? hover : update.dataQuality]}</Typography>
                          )}
                        </div>
                        <div className="horizontalForm">
                          <p>{t("columnsNames.sharingLevel")}</p>
                          <FormControl variant="standard">
                            <Select
                              id="sharingLevel"
                              name="sharingLevel"
                              margin="dense"
                              defaultValue={update.sharingLevel}
                              onChange={(event) => {
                                setUpdate({
                                  ...update,
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
                            onChange={(event) => handleSwitchs(event)}
                            color="primary" // Opcional: ajusta el color del switch
                          />
                        </div>
                        <div className="horizontalFormSwitch">
                          <p>ArcGIS</p>
                          <Switch
                            id="ArcGIS"
                            name="ArcGIS"
                            value={ArcGIS}
                            checked={ArcGIS === true}
                            onChange={(event) => handleSwitchs(event)}
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
                            onChange={(event) => handleSwitchs(event)}
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
                            onChange={(event) => handleSwitchs(event)}
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
                            onChange={(event) => handleSwitchs(event)}
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
                            onChange={(event) => handleSwitchs(event)}
                            color="primary" // Opcional: ajusta el color del switch
                          />
                        </div>
                        <div className="horizontalForm">
                          <p>{t("columnsNames.temporarySolution")}</p>
                          {/*<TextField
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
                          */}
                          <FormControl variant="standard">
                            <Select
                              id="temporarySolution"
                              name="temporarySolution"
                              margin="dense"
                              defaultValue={update.temporarySolution}
                              onChange={(event) => {
                                setUpdate({
                                  ...update,
                                  temporarySolution: event.target.value as UPDATE_FREQUENCY,
                                });
                              }}
                            >
                              {Object.entries(UPDATE_FREQUENCY).map(
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
                          <p>{t("columnsNames.chargeStateComments")}</p>
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
                {step === 5 && (
                  <form onSubmit={handleSubmit}>
                    <div className="verticalForm">
                      <div className="horizontalForm">
                        <p>{t("columnsNames.productData")}</p>
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
                        <p>{t("columnsNames.productComments")}</p>
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
