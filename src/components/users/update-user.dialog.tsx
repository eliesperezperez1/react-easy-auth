import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import {
  User,
  UpdateUser,
} from "../../interfaces/user.interface";
import { updateUserRequest } from "../../api/users";
import { useAuthHeader } from "react-auth-kit";
import { Box, ThemeProvider } from "@mui/material";
import { useTranslation } from "react-i18next";
import baseTheme from "../darkModeSwitch/darkmodeTheme";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
    setStep(1);
  }, [props.enviar.open, props.enviar.user]);

  const handleClose = () => {
    setOpen(false);
    setStep(1);
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
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        style={dynamicStyle}
        sx={{
          "& .MuiTextField-root": { m: 1, width: "20ch" },
          "& .MuiFormControl-root": { m: 1, width: "20ch" },
          "&. MuiInputBaseRoot": { m: 1, width: "20ch" },
        }}
      >
        <DialogTitle 
        style={dynamicStyle}
        >
          {t("dialog.updateRegister")}
        </DialogTitle>
        <DialogContent
          style={dynamicStyle}
        >
        <div className="dialogContentText">
          <span>{t("dialog.fillInfo")}</span>
          <span><b>{step}/2</b></span>
        </div>
          
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
    </LocalizationProvider>
    </ThemeProvider>
    </>
  );
}
