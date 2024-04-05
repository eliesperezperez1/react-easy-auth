import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import {
  User,
  UpdateUser,
} from "../../interfaces/user.interface";
import {
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { updateUserRequest } from "../../api/users";
import { useAuthHeader } from "react-auth-kit";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import { grey, red } from "@mui/material/colors";
import { esES } from "@mui/x-data-grid";

const baseTheme = (actualTheme:any) => createTheme(
  {
    typography: {
      fontFamily: "Montserrat",
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            color: actualTheme === 'light' ? "black" : "white",
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
            color: actualTheme === 'light' ? "black" : "white",
          },
          
        },
      },
      MuiSelect: {
        defaultProps: {
          variant: 'standard', // Set the default variant (outlined, filled, standard)
        },
        styleOverrides: {
          icon: {
            color: actualTheme === 'light' ? "black" : "white", // Set the color of the dropdown arrow icon
          },
          // Add other styles as needed
        },
      },
      MuiMenuList:{
        styleOverrides:{
          'root':{
            //backgroundColor: actualTheme === 'light' ? "white" : "black", 
            color: actualTheme === 'light' ? "black" : "white",
          },
        },
      },
      MuiMenuItem:{
        styleOverrides:{
          root:{
            //backgroundColor: actualTheme === 'light' ? "white" : "black", 
            color: actualTheme === 'light' ? "black" : "white",
          }
        }
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

export interface UpdateDialogData {
  open: boolean;
  closeDialog: (a: boolean) => void;
  getInfo: () => void;
  user: User;
}

export default function UpdateUserDialog(props: {
  enviar: UpdateDialogData;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const authHeader = useAuthHeader();
  const [update, setUpdate] = useState<UpdateUser>({});
  const [t, i18n] = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const {actualTheme} = useAlternateTheme();

  useEffect(() => {
    setUpdate(props.enviar.user);
    setOpen(props.enviar.open);
  }, [props.enviar.open, props.enviar.user]);

  const handleClose = () => {
    setOpen(false);
    props.enviar.closeDialog(false);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdate((prevState) => ({ ...prevState, [name]: value }));
  }; 

  const updateUser = (formJson: any) => {
    const deleted = false;
    const prueba = formJson as UpdateUser;
    setUpdate({
      ...prueba,
      deleted,
    });
    updateUserRequest(
      props.enviar.user._id,
      update,
      authHeader()
    ).then((response) => response.json());
    props.enviar.getInfo();
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
    updateUser(mergedFormData);
  };

  const handleGoBack = () => {
    setStep(step - 1);
  }

  return (
    <>
    <ThemeProvider theme={baseTheme(actualTheme)}>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiTextField-root": { m: 1, width: "20ch" },
          "& .MuiFormControl-root": { m: 1, width: "20ch" },
          "&. MuiInputBase-root": { m: 1, width: "20ch" },
        }}
      >
        <DialogTitle>{t("dialog.updateRegister")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <div className="dialogContentText" style={{color: actualTheme==="light" ? "#252525" : "white"}}>
            <span>{t("dialog.fillInfo")}</span>
            <span><b>{step}/5</b></span>
          </div>
          </DialogContentText>
          
          <Box>
          {step === 1 && (
              <form onSubmit={handleNext}>
                <div className="verticalForm">
                  <div className="horizontalForm">
                    <p>
                    {t("columnsNames.name")}
                    </p>
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
                      value={update.surname}
                      onChange={handleChange}
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
                      value={update.email}
                      onChange={handleChange}
                    />
                  </div>
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
                      value={update.username}
                      onChange={handleChange}
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
                      value={update.password}
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
              <form onSubmit={handleSubmit}>
                <div className="verticalForm">
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
                      value={update.language}
                      onChange={handleChange}
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
                      value={update.role}
                      onChange={handleChange}
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
                      type="date"
                      variant="standard"
                      value={update.service}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="horizontalForm">
                    <p>
                    {t("columnsNames.deleted")}
                    </p>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="deleted"
                      name="deleted"
                      type="string"
                      variant="standard"
                      value={update.deleted}
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
                      {t("dialog.updateButton")}
                    </Button>
                  </div>
                  
                </div>
              </form>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
    </>
  );
}
