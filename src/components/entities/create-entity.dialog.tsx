import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { CreateEntity } from "../../interfaces/entity.interface";
import { createEntityRequest } from "../../api/entities";
import { useAuthHeader } from "react-auth-kit";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useTranslation } from "react-i18next";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./create-entity.dialog.css";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import { grey } from "@mui/material/colors";
import { esES } from "@mui/x-data-grid";

export interface DialogData {
  open: boolean;
  closeDialog: (a: boolean) => void;
  getInfo: () => void;
}

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

export default function CreateEntityDialog(props: { enviar: DialogData }) {
  const [open, setOpen] = useState<boolean>(false);
  const authHeader = useAuthHeader();
  const [t, i18n] = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [formDataSteps, setFormDataSteps] = useState({
    responsibleIdentity: "", topic:"", contactPerson: "", location: "", 
    telephone: "", email: "" 
    }
  );
  const {actualTheme} = useAlternateTheme();
  //const [creationDate, setCreationDate] = useState(getCurrentDateTime());

  useEffect(() => {
    setOpen(props.enviar.open);
  });

  const handleClose = () => {
    setFormData({});
    setStep(1);
    setOpen(false);
    props.enviar.closeDialog(false);
  };

  const createEntity = (formJson: any) => {
    const prueba = formJson as CreateEntity;
    console.log(prueba);
    const create: CreateEntity = {
      ...prueba,
    };
    createEntityRequest(create, authHeader())
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    props.enviar.getInfo();
    handleClose();
  };

  /*
  function getCurrentDateTime() {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Format as "YYYY-MM-DDTHH:mm"
  }
  */

  const handleNext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Collect form data for the current step
    const currentStepData = new FormData(event.currentTarget);
    
    //--------------------------------------------------------------------
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
    createEntity(mergedFormData);
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
          "& .MuiTextField-root": { m: 1, width: "20ch" },
          "& .MuiFormControl-root": { m: 1, width: "20ch" },
          "&. MuiInputBase-root": { m: 1, width: "20ch" },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: actualTheme==="light" ? "white" : "#252525",
            color: actualTheme==="light" ? "#252525" : "white",
            "& .MuiInputBase-root": { border: "none" },
          }}
        >
          {t("dialog.addRegister")}
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: actualTheme==="light" ? "white" : "#252525",
            color: actualTheme==="light" ? "#252525" : "white",
            "& .MuiInputBase-root": { border: "none" },
          }}
        >
          <DialogContentText>{t("dialog.fillInfo")}</DialogContentText>
          <Box>
          {step === 1 && (
            <form onSubmit={handleNext}>
              <div className="verticalForm">
                <div className="horizontalForm">
                  <p>
                  {t("columnsNames.responsibleIdentity")}
                  </p>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="responsibleIdentity"
                    name="responsibleIdentity"
                    type="string"
                    variant="standard"
                    value={formDataSteps.responsibleIdentity}
                    onChange={(e) => handleChange('responsibleIdentity', e.target.value)}
                  />
                </div>
                <div className="horizontalForm">
                  <p>
                  {t("columnsNames.topic")}
                  </p>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="topic"
                    name="topic"
                    type="string"
                    variant="standard"
                    value={formDataSteps.topic}
                    onChange={(e) => handleChange('topic', e.target.value)}
                  />
                </div>
                {/* <div className="horizontalForm">
                  <p>
                  {t("columnsNames.lastUpdate")}
                  </p>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="lastUpdate"
                    name="lastUpdate"
                    type="datetime-local"
                    variant="standard"

                    sx= {{
                      backgroundColor: 'none',
                      width: '100%',
                      border: 'none',
                      borderBottom: '1px solid lightgrey',
                      '& input': {
                        backgroundColor: 'none',
                        border: 'none',
                        
                      },
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      style:{
                        backgroundColor: 'none',
                        width: '100%',
                        border: 'none',
                        borderBottom: '1px solid lightgrey',
                      },
                      readOnly: true,
                    }}
                  />
                  
                </div> */}
                <div className="horizontalForm">
                  <p>
                  {t("columnsNames.contactPerson")}
                  </p>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="contactPerson"
                    name="contactPerson"
                    type="string"
                    variant="standard"
                    value={formDataSteps.contactPerson}
                    onChange={(e) => handleChange('contactPerson', e.target.value)}
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
                }}>{t("dialog.cancel")}</Button>
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
                }}>{t("dialog.next")}</Button>
              </div>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleSubmit}>
            <div className="verticalForm">
              <div className="horizontalForm">
                <p>
                {t("columnsNames.location")}
                </p>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="location"
                  name="location"
                  type="string"
                  variant="standard"
                  value={formDataSteps.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                />
              </div>
              <div className="horizontalForm">
                <p>
                {t("columnsNames.phoneNumber")}
                </p>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="telephone"
                  name="telephone"
                  type="string"
                  variant="standard"
                  value={formDataSteps.telephone}
                  onChange={(e) => handleChange('telephone', e.target.value)}
                />
              </div>
              {/* <div className="horizontalForm">
                <p>
                  Fecha de creación
                </p>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="creationDate"
                  name="creationDate"
                  type="datetime-local"
                  variant="standard"
              

                  sx= {{
                    backgroundColor: 'none',
                    width: '100%',
                    border: 'none',
                    borderBottom: '1px solid lightgrey',
                    '& input': {
                      backgroundColor: 'none',
                      border: 'none',
                      
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    style:{
                      backgroundColor: 'none',
                      width: '100%',
                      border: 'none',
                      borderBottom: '1px solid lightgrey',
                    },
                    readOnly: true,
                  }}
                />
                
              </div> */}
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
                  type="email"
                  variant="standard"
                  value={formDataSteps.email}
                  onChange={(e) => handleChange('email', e.target.value)}
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
              }}>{t("dialog.cancel")}</Button>
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
                  }}>{t("dialog.addEntityButton")}</Button>
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
            "& .MuiInputBase-root": { border: "none" },
          }}
        >
        </DialogActions>
      </Dialog>
    </ThemeProvider>
    </>
  );
}
