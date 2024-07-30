import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { CreateUser } from "../../interfaces/user.interface";
import { registerUser } from "../../api/users";
import {
  Box,
  MenuItem,
  Select,
  ThemeProvider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import "./create-users.dialog.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import baseTheme from "../darkModeSwitch/darkmodeTheme";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import { RESPONSIBLE_IDENTITY } from "../../utils/enums/responsible-identity.enum";
import { LANGUAGE_FORM } from "../../utils/enums/language-form.enum";
import { ROLE } from "../../utils/enums/role.enum";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { buttonStyle } from "../../utils/functions/table-functions";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
export interface DialogData {
  open: boolean;
  closeDialog: (a: boolean) => void;
  getInfo: () => void;
}

/**
 * Renders a dialog for creating a new user. The dialog consists of two steps:
 * Step 1: Collects user information such as name, surname, email, password, and language.
 * Step 2: Collects additional user information such as username, role, and responsible identity.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.enviar.open - A function to open the dialog.
 * @param {Function} props.enviar.closeDialog - A function to close the dialog.
 * @param {Function} props.enviar.getInfo - A function to retrieve user information.
 * @return {JSX.Element} The rendered dialog component.
 */
export default function CreateUserDialog(props: { enviar: DialogData }) {
  const authHeader = useAuthHeader();
  const user = useAuthUser();
  const [open, setOpen] = useState<boolean>(false);
  const [t, i18n] = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [formDataSteps, setFormDataSteps] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    language: "",
    role: "",
    service: RESPONSIBLE_IDENTITY,
    themeApp: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Toggles the visibility of the password.
   *
   * @return {void} This function does not return anything.
   */
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const { actualTheme } = useAlternateTheme();

  const isPasswordValid = formDataSteps.password.length >= 8;

  useEffect(() => {
    setOpen(props.enviar.open);
  });
  
/**
 * Resets the form data, closes the dialog, and calls the closeDialog function.
 *
 * @return {void}
 */
  const handleClose = () => {
    setFormDataSteps({
      name: "",
      surname: "",
      email: "",
      username: "",
      password: "",
      language: "",
      role: "",
      service: RESPONSIBLE_IDENTITY,
      themeApp: "",
    });
    setFormData({});
    setStep(1);
    setOpen(false);
    props.enviar.closeDialog(false);
  };

/**
 * Creates a user with the provided form data.
 *
 * @param {any} formJson - The JSON object containing the user's data.
 * @return {void}
 */
  const createUser = (formJson: any) => {
    const deleted = false;
    const prueba = formJson as CreateUser;
    const create: CreateUser = {
      ...prueba,
      deleted,
    };
    props.enviar.getInfo();
    registerUser(create, authHeader())
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });

    setFormData({});
    setStep(1);
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
    const currentStepJson = Object.fromEntries(currentStepData.entries());

    // Merge current step data with existing form data
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    setStep(step + 1);
  };

  /**
   * Handles the form submission for the current step, merges the current step data with the existing form data,
   * and creates a user with the merged data.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   * @return {void} This function does not return anything.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const currentStepData = new FormData(event.currentTarget);
    const currentStepJson = Object.fromEntries(currentStepData.entries());
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    const mergedFormData = { ...formData, ...currentStepJson };
    createUser(mergedFormData);
  };

  /**
   * Decrements the step value by 1, returning to the previous step in the form.
   *
   * @return {void} This function does not return anything.
   */
  const handleGoBack = () => {
    setStep(step - 1);
  };

  /**
   * Updates the form data steps with the provided field and value.
   *
   * @param {string} field - The name of the field to update.
   * @param {string} value - The new value for the field.
   * @return {void} This function does not return anything.
   */
  const handleChange = (field: string, value: string) => {
    setFormDataSteps((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  /**
   * Renders a list of MenuItem components based on the values of the RESPONSIBLE_IDENTITY enum.
   * Excludes the GENERAL value from the list if the user's role is not SUPER_ADMIN.
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
    return menuItems;
  };

/**
 * Renders a list of MenuItem components based on the values of the ROLE object.
 * Excludes the SUPER_ADMIN value from the list if the user's role is not SUPER_ADMIN.
 *
 * @return {JSX.Element[]} An array of MenuItem components.
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
 * Renders a list of MenuItem components based on the values of the LANGUAGE_FORM object.
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
            style={dynamicStyle}
            fullWidth={true}
            open={open}
            onClose={handleClose}
          >
            <DialogTitle style={dynamicStyle}>
              {t("dialog.addRegister")}
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
                          value={formDataSteps.name}
                          onChange={(e) => handleChange("name", e.target.value)}
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
                          value={formDataSteps.surname}
                          onChange={(e) =>
                            handleChange("surname", e.target.value)
                          }
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
                          aria-invalid={formDataSteps.email.length < 8}
                          value={formDataSteps.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
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
                          helperText="La contraseña debe contener 8-13 caracteres"
                          value={formDataSteps.password}
                          onChange={(e) =>
                            handleChange("password", e.target.value)
                          }
                          sx={{
                            "& .MuiFormHelperText-root": {
                              color: formDataSteps.password.length >= 8 && formDataSteps.password.length <= 13 ? "#00ff00" : "#ff0000"
                            },
                          }}
                          inputProps={{ maxLength: 13 }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
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
                      <Button
                        onClick={handleClose}
                        sx={buttonStyle}
                      >
                        {t("dialog.cancel")}
                      </Button>
                      <Button
                        type="submit"
                        disabled={!isPasswordValid}
                        //sx={buttonStyle}
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
                  <form onSubmit={handleSubmit}>
                    <div className="verticalForm">
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
                          value={formDataSteps.username}
                          onChange={(e) =>
                            handleChange("username", e.target.value)
                          }
                        />
                      </div>
                      <div className="horizontalForm">
                        <p>{t("columnsNames.language")}</p>
                        <Select
                          id="language"
                          name="language"
                          margin="dense"
                          variant="standard"
                          defaultValue={formDataSteps.language}
                          onChange={(event) => {
                            setFormDataSteps({
                              ...formDataSteps,
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
                          margin="dense"
                          variant="standard"
                          defaultValue={formDataSteps.role}
                          onChange={(event) => {
                            setFormDataSteps({
                              ...formDataSteps,
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
                          name="service"
                          margin="dense"
                          variant="standard"
                          defaultValue={formDataSteps.service}
                          onChange={(event) => {
                            setFormDataSteps({
                              ...formDataSteps,
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
                      <Button onClick={handleClose} sx={buttonStyle}>
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
              }}
            ></DialogActions>
          </Dialog>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}
