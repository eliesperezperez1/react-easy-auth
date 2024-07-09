import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { CreateUser } from "../../interfaces/user.interface";
import { registerUser } from "../../api/users";
import { Box, MenuItem, Select, ThemeProvider } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./create-users.dialog.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import baseTheme from "../darkModeSwitch/darkmodeTheme";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import { RESPONSIBLE_IDENTITY } from "../../utils/enums/responsible-identity.enum";
import { LANGUAGE_FORM } from "../../utils/enums/language-form.enum";
import { ROLE } from "../../utils/enums/role.enum";
import { useAuthHeader } from "react-auth-kit";

export interface DialogData {
  open: boolean;
  closeDialog: (a: boolean) => void;
  getInfo: () => void;
}

export default function CreateUserDialog(props: { enviar: DialogData }) {
  const authHeader = useAuthHeader();
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
    service: "",
    themeApp: "",
  });
  const { actualTheme } = useAlternateTheme();

  useEffect(() => {
    setOpen(props.enviar.open);
  });

  const handleClose = () => {
    setFormDataSteps({
      name: "",
      surname: "",
      email: "",
      username: "",
      password: "",
      language: "",
      role: "",
      service: "",
      themeApp: "",
    });
    setFormData({});
    setStep(1);
    setOpen(false);
    props.enviar.closeDialog(false);
  };

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

  const handleNext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Collect form data for the current step
    const currentStepData = new FormData(event.currentTarget);
    const currentStepJson = Object.fromEntries(currentStepData.entries());

    // Merge current step data with existing form data
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    setStep(step + 1);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const currentStepData = new FormData(event.currentTarget);
    const currentStepJson = Object.fromEntries(currentStepData.entries());
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    const mergedFormData = { ...formData, ...currentStepJson };
    createUser(mergedFormData);
  };

  const handleGoBack = () => {
    setStep(step - 1);
  };

  const handleChange = (field: string, value: string) => {
    setFormDataSteps((prevData) => ({
      ...prevData,
      [field]: value,
    }));
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
                          autoFocus
                          required
                          margin="dense"
                          id="password"
                          name="password"
                          type="password"
                          variant="standard"
                          value={formDataSteps.password}
                          onChange={(e) =>
                            handleChange("password", e.target.value)
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
                          defaultValue={formDataSteps.language}
                        >
                          {Object.entries(LANGUAGE_FORM).map(([key, value]) => (
                            <MenuItem key={key} value={key}>
                              {value}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                      <div className="horizontalForm">
                        <p>{t("columnsNames.role")}</p>
                        <Select
                          id="role"
                          name="role"
                          margin="dense"
                          defaultValue={formDataSteps.role}
                        >
                          {Object.entries(ROLE).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                              {value}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                      <div className="horizontalForm">
                        <p>{t("columnsNames.responsibleIdentity")}</p>
                        <Select
                          id="service"
                          name="service"
                          margin="dense"
                          defaultValue={formDataSteps.service}
                        >
                          {Object.entries(RESPONSIBLE_IDENTITY).map(
                            ([key, value]) => (
                              <MenuItem key={key} value={value}>
                                {value}
                              </MenuItem>
                            )
                          )}
                        </Select>
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
              }}
            ></DialogActions>
          </Dialog>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}
