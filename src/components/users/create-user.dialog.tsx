import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { CreateUser } from "../../interfaces/user.interface";
import { registerUser } from "../../api/users";
import { useAuthHeader } from "react-auth-kit";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./create-users.dialog.css";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import { grey } from "@mui/material/colors";
import { esES } from "@mui/x-data-grid";

const baseTheme = (actualTheme:any) => createTheme(
  {
    typography: {
      fontFamily: "Montserrat",
    },
    components: {
      MuiTextField: {

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
            color: actualTheme === 'light' ? "black" : "white",
          },
        },
      },
    },
    palette:{
      mode: actualTheme==="light" ? "light" : "dark",
      ...(actualTheme === 'light'
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
            paper: grey[800],
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }),
    },
    
  },
  esES
);

export interface DialogData {
  open: boolean;
  closeDialog: (a: boolean) => void;
  getInfo: () => void;
}

export default function CreateUserDialog(props: { enviar: DialogData }) {
  const [open, setOpen] = useState<boolean>(false);
  const authHeader = useAuthHeader();
  const [t, i18n] = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [formDataSteps, setFormDataSteps] = useState({
    name: "", surname:"", email: "", username: "", 
    password: "", language: "", role: "", responsibleIdentity: "" 
    }
  );
  const {actualTheme} = useAlternateTheme();

  useEffect(() => {
    setOpen(props.enviar.open);
  });

  const handleClose = () => {
    setFormDataSteps({
      name: "", 
      surname:"",
      email: "", 
      username: "", 
      password: "", 
      language: "", 
      role: "", 
      responsibleIdentity: "",
    });
    setFormData({});
    setStep(1);
    setOpen(false);
    props.enviar.closeDialog(false);
  };

  const createUser = (formJson: any) => {
    const a = formJson.lastUpdate;
    const b = formJson.creationDate;
    const deleted = false;
    const prueba = formJson as CreateUser;
    const create: CreateUser = {
      ...prueba,
      deleted,
    };
    console.log(create);
    props.enviar.getInfo();
    registerUser(create)
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
    console.log(formData);
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
  }

  const handleChange = (field: string, value: string) => {
    // Update the form data
    setFormDataSteps((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  return (
    <>
    <ThemeProvider theme={baseTheme(actualTheme)}>
      <Dialog 
        fullWidth={true} 
        open={open} 
        onClose={handleClose}
        sx={{
          backgroundColor: actualTheme==="light" ? "white" : "#252525",
          color: actualTheme==="light" ? "#252525" : "white",
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: actualTheme==="light" ? "white" : "#252525",
            color: actualTheme==="light" ? "#252525" : "white",
          }}
        >
          {t("dialog.addRegister")}
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: actualTheme==="light" ? "white" : "#252525",
            color: actualTheme==="light" ? "#252525" : "white",
          }}
        >
          <div className="dialogContentText">
            <span>{t("dialog.fillInfo")}</span>
            <span>
              <b>{step}/2</b>
            </span>
            </div>
          <Box
            sx={{
              backgroundColor: actualTheme==="light" ? "white" : "#252525",
              color: actualTheme==="light" ? "#252525" : "white",
            }}
          >
            {step === 1 && (
              <form onSubmit={handleNext}>
                <div className="verticalForm">
                  <div className="horizontalForm">
                    <p>
                    {t("columnsNames.name")}
                    </p>
                    <TextField
                      /* sx={{
                        input: {
                          color: actualTheme==="light" ? "#252525" : "white",
                        },
                      }} */
                      autoFocus
                      required
                      margin="dense"
                      id="name"
                      name="name"
                      type="string"
                      variant="standard"
                      value={formDataSteps.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                  </div>
                  <div className="horizontalForm">
                    <p>
                    {t("columnsNames.surname")}
                    </p>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="surname"
                      name="surname"
                      type="string"
                      variant="standard"
                      value={formDataSteps.surname}
                      onChange={(e) => handleChange('surname', e.target.value)}
                    />
                  </div>
                  
                  <div className="horizontalForm">
                    <p>
                    {t("login.email")}
                    </p>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="email"
                      name="email"
                      type="string"
                      variant="standard"
                      value={formDataSteps.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                  </div>
                  <div className="horizontalForm">
                    <p>
                    {t("login.password")}
                    </p>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="password"
                      name="password"
                      type="string"
                      variant="standard"
                      value={formDataSteps.password}
                      onChange={(e) => handleChange('password', e.target.value)}
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
                    <p>
                    {t("columnsNames.username")}
                    </p>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="username"
                      name="username"
                      type="string"
                      variant="standard"
                      value={formDataSteps.username}
                      onChange={(e) => handleChange('username', e.target.value)}
                    />
                  </div>
                  <div className="horizontalForm">
                    <p>
                    {t("columnsNames.language")}
                    </p>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="language"
                      name="language"
                      type="string"
                      variant="standard"
                      value={formDataSteps.language}
                      onChange={(e) => handleChange('language', e.target.value)}
                    />
                  </div>
                  <div className="horizontalForm">
                    <p>
                    {t("columnsNames.role")}
                    </p>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="role"
                      name="role"
                      type="string"
                      variant="standard"
                      value={formDataSteps.role}
                      onChange={(e) => handleChange('role', e.target.value)}
                    />
                  </div>
                  <div className="horizontalForm">
                    <p>
                    {t("columnsNames.responsibleIdentity")}
                    </p>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="service"
                      name="service"
                      type="string"
                      variant="standard"
                      value={formDataSteps.responsibleIdentity}
                      onChange={(e) => handleChange('responsibleIdentity', e.target.value)}
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
            backgroundColor: actualTheme==="light" ? "white" : "#252525",
            color: actualTheme==="light" ? "#252525" : "white",
          }}
        ></DialogActions>
      </Dialog>
    </ThemeProvider>
    </>
  );
}
