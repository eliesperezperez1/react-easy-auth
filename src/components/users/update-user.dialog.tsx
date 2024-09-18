import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { User, UpdateUser } from "../../interfaces/user.interface";
import { updateUserRequest } from "../../api/users";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  ThemeProvider,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import baseTheme from "../darkModeSwitch/darkmodeTheme";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { RESPONSIBLE_IDENTITY } from "../../utils/enums/responsible-identity.enum";
import { ROLE } from "../../utils/enums/role.enum";
import { buttonStyle } from "../../utils/functions/table-functions";
import { LANGUAGE_FORM } from "../../utils/enums/language-form.enum";
import { THEMEAPP } from "../../utils/enums/themeApp.enum";
export interface UpdateDialogData {
  open: boolean;
  closeDialog: (a: boolean) => void;
  getInfo: () => void;
  user: User;
}

/**
 * Renders a dialog component for updating a user.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {UpdateDialogData} props.enviar - The data for the update dialog.
 * @return {JSX.Element} The rendered dialog component.
 */
export default function UpdateUserDialog(props: { enviar: UpdateDialogData }) {
  const [open, setOpen] = useState<boolean>(false);
  const authHeader = useAuthHeader();
  const user = useAuthUser();
  const [update, setUpdate] = useState<UpdateUser>({});
  const [t, i18n] = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const { actualTheme } = useAlternateTheme();
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Toggles the visibility of the password.
   *
   * @return {void} This function does not return anything.
   */
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    setUpdate(props.enviar.user);
    setOpen(props.enviar.open);
    setStep(1);
    setUpdate({ ...props.enviar.user, password: "" });
  }, [props.enviar.open, props.enviar.user]);

  /**
   * Closes the dialog and resets the step to 1. Calls the closeDialog function from the props.enviar 
   * object with a false argument.
   *
   * @return {void} This function does not return anything.
   */
  const handleClose = () => {
    setOpen(false);
    setStep(1);
    props.enviar.closeDialog(false);
  };
  /**
   * Handles the change event for an input element.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event triggered by the input element.
   * @return {void} This function does not return anything.
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdate((prevState) => ({ ...prevState, [name]: value }));
  };

/**
 * Updates a user with the provided form data.
 *
 * @param {any} formJson - The form data to update the user with.
 * @return {Promise<void>} A promise that resolves when the user is updated.
 */
  const updateUser = (formJson: any) => {
    const deleted = false;
    const prueba = formJson as UpdateUser;
    setUpdate({
      ...prueba,
      deleted,
    });
    updateUserRequest(props.enviar.user._id, update, authHeader()).then(
      (response) => response.json()
    );
    props.enviar.getInfo();
    handleClose();
  };

/**
 * Renders a list of MenuItem components based on the values of the RESPONSIBLE_IDENTITY enum.
 * Excludes the GENERAL value from the list if the user's role is not SUPER_ADMIN.
 * If the update.service value is not included in the RESPONSIBLE_IDENTITY enum, adds a custom MenuItem component.
 *
 * @return {JSX.Element[]} An array of MenuItem components.
 */
  const renderService = () => {
    const menuItems = Object.entries(RESPONSIBLE_IDENTITY).map(
      ([key, value]) => {
        if (
          value === RESPONSIBLE_IDENTITY.GENERAL &&
          user().user.role !== ROLE.SUPER_ADMIN
        ) {
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
      update.service &&
      !Object.values(RESPONSIBLE_IDENTITY).includes(update.service)
    ) {
      menuItems.push(
        <MenuItem key="custom" value={update.service}>
          {update.service}
        </MenuItem>
      );
    }
    return menuItems;
  };

/**
 * Renders a list of role options as MenuItems based on the ROLE object.
 *
 * @return {JSX.Element[]} An array of JSX elements representing the role options.
 */
  const renderRole = () => {
    const menuItems = Object.entries(ROLE).map(([key, value]) => {
      if (value === ROLE.SUPER_ADMIN && user().user.role !== ROLE.SUPER_ADMIN) {
        return null;
      }
      return (
        <MenuItem key={key} value={value}>
          {t("enums.roles." + value)}
        </MenuItem>
      );
    });
    return menuItems;
  };

  
/**
 * Renders a list of language options as MenuItems based on the LANGUAGE_FORM object.
 *
 * @return {JSX.Element[]} An array of JSX elements representing the language options.
 */
    const renderLanguage = () => {
      const menuItems = Object.entries(LANGUAGE_FORM).map(([key, value]) => {
        return (
          <MenuItem key={key} value={key}>
            {t("enums.language." + key)}
          </MenuItem>
        );
      });
      return menuItems;
    };

/**
 * Handles the form submission for the current step, merging the current step data with the existing form data.
 * Then, updates the step.
 *
 * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
 * @return {void} This function does not return anything.
 */
  const handleNext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Collect form data for the current step
    const currentStepData = new FormData(event.currentTarget);
    const currentStepJson = Object.fromEntries(currentStepData.entries());

    // Merge current step data with existing form data
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    setStep(step + 1);
  };

/**
 * Handles the form submission. Collects the form data for the current step, 
 * merges it with the existing form data, and updates the user.
 *
 * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
 * @return {void} This function does not return anything.
 */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const currentStepData = new FormData(event.currentTarget);
    const currentStepJson = Object.fromEntries(currentStepData.entries());
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    const mergedFormData = { ...formData, ...currentStepJson };
    updateUser(mergedFormData);
  };

  /**
   * Decrements the step value by 1, returning to the previous step in the dialog.
   *
   * @return {void} This function does not return anything.
   */
  const handleGoBack = () => {
    setStep(step - 1);
  };

  const dynamicStyle = {
    backgroundColor: actualTheme === THEMEAPP.light ? "white" : "#252525",
    color: actualTheme === THEMEAPP.light ? "#252525" : "white",
    "& .MuiInputBaseRoot": { border: "none" },
  };

  return (
    <>
      <ThemeProvider theme={baseTheme(actualTheme)}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Dialog
            fullWidth={true}
            maxWidth="sm"
            open={open}
            onClose={handleClose}
            style={dynamicStyle}
            sx={{
              "& .MuiTextField-root": { m: 1, width: "20ch" },
              "& .MuiFormControl-root": { m: 1, width: "20ch" },
              "&. MuiInputBase-root": { m: 1, width: "20ch" },
            }}
          >
            <DialogTitle style={dynamicStyle}>
              {t("dialog.updateRegister")}
            </DialogTitle>
            <DialogContent style={dynamicStyle}>
              <div className="dialogContentText">
                <span>{t("dialog.fillInfo")}</span>
                <span>
                  <b>{step}/2</b>
                </span>
              </div>
              <Box>
                {step === 1 && (
                  <form onSubmit={handleNext}>
                    <div className="verticalForm">
                      <div className="horizontalForm">
                        <p>{t("columnsNames.name")}</p>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="name"
                          name="name"
                          type="string"
                          variant="standard"
                          value={update.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="horizontalForm">
                        <p>{t("columnsNames.surname")}</p>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="surname"
                          name="surname"
                          type="string"
                          variant="standard"
                          value={update.surname}
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
                          type="string"
                          variant="standard"
                          value={update.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="horizontalForm">
                        <p>{t("columnsNames.username")}</p>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="username"
                          name="username"
                          type="string"
                          variant="standard"
                          value={update.username}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="horizontalForm">
                        <p>{t("login.password")}</p>
                        <TextField
                          variant="standard"
                          required
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          onChange={handleChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleTogglePassword}
                                  onMouseDown={(e) => e.preventDefault()}
                                >
                                  {showPassword ? (
                                    <VisibilityIcon />
                                  ) : (
                                    <VisibilityOffIcon />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    </div>
                    <div className="buttonsForm">
                      <Button onClick={handleClose} sx={buttonStyle}>
                        {t("dialog.cancel")}
                      </Button>
                      <Button type="submit" sx={buttonStyle}>
                        {t("dialog.next")}
                      </Button>
                    </div>
                  </form>
                )}
                {step === 2 && (
                  <form onSubmit={handleSubmit}>
                    <div className="verticalForm">
                      <div className="horizontalForm">
                        <p>{t("columnsNames.language")}</p>
                        <Select
                          id="language"
                          name="language"
                          margin="dense"
                          variant="standard"
                          defaultValue={update.language}
                          onChange={(event) => {
                            setUpdate({
                              ...update,
                              language: event.target.value as LANGUAGE_FORM,
                            });
                          }}
                        >
                          {renderLanguage()}
                        </Select>
                      </div>
                      <div className="horizontalForm">
                        <p>{t("columnsNames.role")}</p>
                        <Select
                          id="role"
                          name="role"
                          required
                          margin="dense"
                          variant="standard"
                          defaultValue={update.role}
                          onChange={(event) => {
                            setUpdate({
                              ...update,
                              role: event.target.value as ROLE,
                            });
                          }}
                        >
                          {renderRole()}
                        </Select>
                      </div>
                      <div className="horizontalForm">
                        <p>{t("columnsNames.responsibleIdentity")}</p>
                        <Select
                          id="service"
                          required
                          name="service"
                          margin="dense"
                          variant="standard"
                          defaultValue={update.service}
                          disabled={user().user.role !== ROLE.SUPER_ADMIN}
                          onChange={(event) => {
                            setUpdate({
                              ...update,
                              service: event.target
                                .value as RESPONSIBLE_IDENTITY,
                            });
                          }}
                        >
                          {renderService()}
                        </Select>
                      </div>
                    </div>
                    <div className="buttonsForm">
                      <Button
                        onClick={handleClose}
                        sx={buttonStyle}
                      >
                        {t("dialog.cancel")}
                      </Button>
                      <div>
                        <Button
                          onClick={handleGoBack}
                          sx={{ ...buttonStyle, marginRight: "5px" }}
                        >
                          {t("dialog.back")}
                        </Button>
                        <Button type="submit" sx={buttonStyle}>
                          {t("dialog.updateButton")}
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