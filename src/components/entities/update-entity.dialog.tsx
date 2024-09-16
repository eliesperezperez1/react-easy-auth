import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { Entity, UpdateEntity } from "../../interfaces/entity.interface";
import { updateEntityRequest } from "../../api/entities";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import baseTheme from "../darkModeSwitch/darkmodeTheme";
import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { RESPONSIBLE_IDENTITY } from "../../utils/enums/responsible-identity.enum";
import { TOPIC } from "../../utils/enums/topic.enum";
export interface UpdateDialogData {
  open: boolean;
  closeDialog: (a: boolean) => void;
  getInfo: () => void;
  entity: Entity;
}

/**
 * Renders a dialog for updating an entity.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.enviar.closeDialog - Function to close the dialog.
 * @param {Function} props.enviar.getInfo - Function to get entity info.
 * @param {Object} props.enviar.entity - The entity to be updated.
 * @param {boolean} props.enviar.open - Flag indicating if the dialog is open.
 * @return {JSX.Element} The rendered dialog component.
 */
export default function UpdateEntityDialog(props: {
  enviar: UpdateDialogData;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const authHeader = useAuthHeader();
  const userData = useAuthUser();
  const [update, setUpdate] = useState<UpdateEntity>({});
  const [t, i18n] = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const {actualTheme} = useAlternateTheme();

  useEffect(() => {
    setUpdate(props.enviar.entity);
    setOpen(props.enviar.open);
  }, [props.enviar.open, props.enviar.entity]);

  /**
   * Handles the close event of the dialog. Resets steps and closes the dialog.
   *
   * @return {void} 
   */
  const handleClose = () => {
    setFormData({});
    setStep(1);
    setOpen(false);
    props.enviar.closeDialog(false);
  };
  
  /**
   * Updates the state with the new value of the input field.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The event triggered by the input field change.
   * @return {void} This function does not return anything.
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdate((prevState) => ({ ...prevState, [name]: value }));
  };

/**
 * Updates the entity with the provided form data.
 *
 * @param {any} formJson - The form data to update the entity with.
 * @return {Promise<void>} A promise that resolves when the entity is updated.
 */
  const updateEntity = (formJson: any) => {
    const prueba = formJson as UpdateEntity;
    setUpdate(prueba);
    updateEntityRequest(props.enviar.entity._id, update, authHeader()).then(
      (response) => response.json()
    );
    props.enviar.getInfo();
    handleClose();
  };

/**
 * Handles the next step in the form submission process. First collects the form data 
 * for the current step, then merges it with the existing form data, and finally updates the step.
 *
 * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
 * @return {void} This function does not return anything.
 */
  const handleNext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Collect form data for the current step
    const currentStepData = new FormData(event.currentTarget);

    //--------------------------------------------------------------------
    const currentStepJson = Object.fromEntries(currentStepData.entries());

    // Merge current step data with existing form data
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    setStep(step + 1);
  };

/**
 * Handles the form submission for the current step. Collects the form data for the current step, 
 * merges it with the existing form data, and updates the entity.
 *
 * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
 * @return {void} This function does not return anything.
 */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const currentStepData = new FormData(event.currentTarget);
    const currentStepJson = Object.fromEntries(currentStepData.entries());
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    const mergedFormData = { ...formData, ...currentStepJson };
    updateEntity(mergedFormData);
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
        sx={{
          backgroundColor: actualTheme==="light" ? "white" : "#252525",
          color: actualTheme==="light" ? "#252525" : "white",
          "& .MuiTextField-root": { m: 1, width: "20ch" },
          "& .MuiFormControl-root": { m: 1, width: "20ch" },
          "&. MuiInputBase-root": { m: 1, width: "20ch", border: "none" },
        }}
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
              <strong>{step}/2</strong>
            </span>
          </div>
          <Box>
            {step === 1 && (
              <form onSubmit={handleNext}>
                <div className="verticalForm">
                  <div className="horizontalForm">
                    <p>{t("columnsNames.responsibleIdentity")}</p>
                    <FormControl variant="standard">
                      <Select
                        id="responsibleIdentity"
                        name="responsibleIdentity"
                        margin="dense"
                        defaultValue={update.responsibleIdentity}
                        //disabled={!isGeneralOrTrans}
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
                    <p>{t("columnsNames.topic")}</p>
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
                    <p>{t("columnsNames.contactPerson")}</p>
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
            {step === 2 && (
              <form onSubmit={handleSubmit}>
                <div className="verticalForm">
                  <div className="horizontalForm">
                    <p>{t("columnsNames.location")}</p>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="location"
                      name="location"
                      type="string"
                      variant="standard"
                      value={update.location}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="horizontalForm">
                    <p>{t("columnsNames.phoneNumber")}</p>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="telephone"
                      name="telephone"
                      type="string"
                      variant="standard"
                      value={update.telephone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="horizontalForm">
                    <p>{t("login.email")}</p>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="email"
                      name="email"
                      type="email"
                      variant="standard"
                      value={update.email}
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
                      {t("dialog.updateEntity")}
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
