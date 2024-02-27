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
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./create-users.dialog.css";

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

  useEffect(() => {
    setOpen(props.enviar.open);
  });

  const handleClose = () => {
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
  return (
    <>
      <Dialog fullWidth={true} open={open} onClose={handleClose}>
        <DialogTitle>{t("dialog.addRegister")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="dialogContentText">
              <span>{t("dialog.fillInfo")}</span>
              <span>
                <b>{step}/2</b>
              </span>
            </div>
          </DialogContentText>
          <Box>
            {step === 1 && (
              <form onSubmit={handleNext}>
                <div className="verticalForm">
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="name"
                    label={t("columnsNames.name")}
                    type="string"
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="surname"
                    name="surname"
                    label={t("columnsNames.surname")}
                    type="string"
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="email"
                    name="email"
                    label={t("login.email")}
                    type="string"
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="username"
                    name="username"
                    label={t("columnsNames.username")}
                    type="string"
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="password"
                    name="password"
                    label={t("login.password")}
                    type="string"
                    variant="standard"
                  />
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
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="language"
                    name="language"
                    label={t("columnsNames.language")}
                    type="string"
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="role"
                    name="role"
                    label={t("columnsNames.role")}
                    type="string"
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="service"
                    name="service"
                    label={t("columnsNames.responsibleIdentity")}
                    type="string"
                    variant="standard"
                  />
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
          </Box>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
}
