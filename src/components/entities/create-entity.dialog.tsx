import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { CreateEntity } from "../../interfaces/entity.interface";
import { createEntityRequest } from "../../api/entities";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { Box, FormControl, MenuItem, Select, ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useTranslation } from "react-i18next";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./create-entity.dialog.css";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import { grey } from "@mui/material/colors";
import { esES } from "@mui/material/locale";
import { RESPONSIBLE_IDENTITY } from "../../utils/enums/responsible-identity.enum";
import { TOPIC } from "../../utils/enums/topic.enum";
import { StyledProfileBody } from "baseui/menu";
import { THEMEAPP } from "../../utils/enums/themeApp.enum";

export interface DialogData {
  open: boolean;
  closeDialog: (a: boolean) => void;
  getInfo: () => void;
}

/**
 * Creates a base theme for the application based on the provided actualTheme, and changes
 * the color palette based on the actualTheme.
 *
 * @param {any} actualTheme - The actual theme object.
 * @return {object} The created base theme object.
 */
const baseTheme = (actualTheme: any) =>
  createTheme(
    {
      typography: {
        fontFamily: "Montserrat",
      },
      components: {
        MuiTextField: {},
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
      },
      palette: {
        mode: actualTheme === THEMEAPP.light ? THEMEAPP.light : THEMEAPP.dark,
        ...(actualTheme === THEMEAPP.light
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

/**
 * Renders a dialog for creating an entity.
 *
 * @param {Object} props - The properties for the dialog.
 * @param {Function} props.enviar.closeDialog - Function to close the dialog.
 * @param {Function} props.enviar.getInfo - Function to get information.
 * @return {JSX.Element} The rendered dialog component.
 */
export default function CreateEntityDialog(props: { enviar: DialogData }) {
  const [open, setOpen] = useState<boolean>(false);
  const authHeader = useAuthHeader();
  const userData = useAuthUser();
  const [t, i18n] = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [formDataSteps, setFormDataSteps] = useState({
    responsibleIdentity: "",
    topic: "",
    contactPerson: "",
    location: "",
    telephone: "",
    email: "",
  });
  const { actualTheme } = useAlternateTheme();
  //const [creationDate, setCreationDate] = useState(getCurrentDateTime());

  useEffect(() => {
    setOpen(props.enviar.open);
  });
  /**
   * Handles the close event of the dialog. Resets steps, the form data and closes the dialog.
   *
   * @return {void} 
   */
  const handleClose = () => {
    setFormData({});
    setFormDataSteps({
      responsibleIdentity: "",
      topic: "",
      contactPerson: "",
      location: "",
      telephone: "",
      email: "",
    });
    setStep(1);
    setOpen(false);
    props.enviar.closeDialog(false);
  };

/**
 * Creates a new entity using the provided form data and sends a request to the server to create it.
 *
 * @param {any} formJson - The form data to create the entity with.
 * @return {Promise<void>} A promise that resolves when the entity is created.
 */
  const createEntity = (formJson: any) => {
    const prueba = formJson as CreateEntity;
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
    console.log(currentStepData.get("responsibleIdentity"));
    setStep(step + 1);
  };

/**
 * Handles the form submission for the current step. Collects the form data for the current step, 
 * merges it with the existing form data, and creates the entity.
 *
 * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
 * @return {void} This function does not return anything.
 */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const currentStepData = new FormData(event.currentTarget);
    const currentStepJson = Object.fromEntries(currentStepData.entries());
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    const mergedFormData = { ...formData, ...currentStepJson };
    createEntity(mergedFormData);
  };

  /**
   * Decrements the step value by 1, returning to the previous step in the dialog.
   *
   * @return {void} This function does not return anything.
   */
  const handleGoBack = () => {
    console.log(formDataSteps);
    setStep(step - 1);
  };

  /**
   * Updates the form data with the provided field and value.
   *
   * @param {string} field - The name of the field to update.
   * @param {string} value - The new value for the field.
   * @return {void} This function does not return anything.
   */
  const handleChange = (field: string, value: string) => {
    // Update the form data
    setFormDataSteps((prevData) => ({
      ...prevData,
      [field]: value,
    }));
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
    return menuItems;
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
            open={open}
            onClose={handleClose}
            sx={{
              backgroundColor: actualTheme === THEMEAPP.light ? "white" : "#252525",
              color: actualTheme === THEMEAPP.light ? "#252525" : "white",
              "& .MuiTextField-root": { m: 1, width: "20ch" },
              "& .MuiFormControl-root": { m: 1, width: "20ch" },
              "& .MuiInputBaseRoot": { m: 1, width: "20ch", border: "none" },
            }}
          >
            <DialogTitle style={dynamicStyle}>
              {t("dialog.addRegister")}
            </DialogTitle>
            <DialogContent style={dynamicStyle}>
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
                              defaultValue={formDataSteps.responsibleIdentity}
                              //disabled={!isGeneralOrTrans} || No creo que haga falta porque solo un super admin puede crear servicios
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
                        <p>{t("columnsNames.topic")}</p>
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
                        <p>{t("columnsNames.contactPerson")}</p>
                        <TextField
                          autoFocus
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
                        <p>{t("columnsNames.location")}</p>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="location"
                          name="location"
                          type="string"
                          variant="standard"
                          value={formDataSteps.location}
                          onChange={(e) =>
                            handleChange("location", e.target.value)
                          }
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
                          value={formDataSteps.telephone}
                          onChange={(e) =>
                            handleChange("telephone", e.target.value)
                          }
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
                        <p>{t("login.email")}</p>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="email"
                          name="email"
                          type="email"
                          variant="standard"
                          value={formDataSteps.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
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
                          {t("dialog.addEntityButton")}
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
              </Box>
            </DialogContent>
            <DialogActions
              sx={{
                backgroundColor: actualTheme === THEMEAPP.light ? "white" : "#252525",
                color: actualTheme === THEMEAPP.light ? "#252525" : "white",
                "& .MuiInputBaseRoot": { border: "none" },
              }}
            ></DialogActions>
          </Dialog>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}
