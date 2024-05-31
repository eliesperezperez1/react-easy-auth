import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { Entity, UpdateEntity } from "../../interfaces/entity.interface";
import { updateEntityRequest } from "../../api/entities";
import { useAuthHeader } from "react-auth-kit";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import baseTheme from "../darkModeSwitch/darkmodeTheme";
import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
export interface UpdateDialogData {
  open: boolean;
  closeDialog: (a: boolean) => void;
  getInfo: () => void;
  entity: Entity;
}

export default function UpdateEntityDialog(props: {
  enviar: UpdateDialogData;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const authHeader = useAuthHeader();
  const [update, setUpdate] = useState<UpdateEntity>({});
  const [t, i18n] = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const {actualTheme} = useAlternateTheme();

  useEffect(() => {
    setUpdate(props.enviar.entity);
    setOpen(props.enviar.open);
  }, [props.enviar.open, props.enviar.entity]);

  const handleClose = () => {
    setFormData({});
    setStep(1);
    setOpen(false);
    props.enviar.closeDialog(false);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdate((prevState) => ({ ...prevState, [name]: value }));
  };

  const updateEntity = (formJson: any) => {
    const prueba = formJson as UpdateEntity;
    setUpdate(prueba);
    updateEntityRequest(props.enviar.entity._id, update, authHeader()).then(
      (response) => response.json()
    );
    props.enviar.getInfo();
    handleClose();
  };

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const currentStepData = new FormData(event.currentTarget);
    const currentStepJson = Object.fromEntries(currentStepData.entries());
    setFormData((prevData) => ({ ...prevData, ...currentStepJson }));
    const mergedFormData = { ...formData, ...currentStepJson };
    updateEntity(mergedFormData);
  };

  const handleGoBack = () => {
    setStep(step - 1);
  };

  const dynamicStyle = {
    backgroundColor: actualTheme === "light" ? "white" : "#252525",
    color: actualTheme === "light" ? "#252525" : "white",
    "& .MuiInputBase-root": { border: "none" },
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
                    <TextField
                      autoFocus
                      margin="dense"
                      id="responsibleIdentity"
                      name="responsibleIdentity"
                      type="string"
                      variant="standard"
                      value={update.responsibleIdentity}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="horizontalForm">
                    <p>{t("columnsNames.topic")}</p>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="topic"
                      name="topic"
                      type="string"
                      variant="standard"
                      value={update.topic}
                      onChange={handleChange}
                    />
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
