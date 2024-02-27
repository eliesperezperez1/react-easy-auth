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
import { Box } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useTranslation } from "react-i18next";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./create-entity.dialog.css";

export interface DialogData {
  open: boolean;
  closeDialog: (a: boolean) => void;
  getInfo: () => void;
}

export default function CreateEntityDialog(props: { enviar: DialogData }) {
  const [open, setOpen] = useState<boolean>(false);
  const authHeader = useAuthHeader();
  const [t, i18n] = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  //const [creationDate, setCreationDate] = useState(getCurrentDateTime());

  useEffect(() => {
    setOpen(props.enviar.open);
  });

  const handleClose = () => {
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

  return (
    <>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiTextField-root": { m: 1, width: "20ch" },
          "& .MuiFormControl-root": { m: 1, width: "20ch" },
          "&. MuiInputBase-root": { m: 1, width: "20ch" },
        }}
      >
        <DialogTitle>{t("dialog.addRegister")}</DialogTitle>
        <DialogContent>
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
                    required
                    margin="dense"
                    id="responsibleIdentity"
                    name="responsibleIdentity"
                    type="string"
                    variant="standard"
                  />
                </div>
                <div className="horizontalForm">
                  <p>
                  {t("columnsNames.topic")}
                  </p>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="topic"
                    name="topic"
                    type="string"
                    variant="standard"
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
                    required
                    margin="dense"
                    id="contactPerson"
                    name="contactPerson"
                    type="string"
                    variant="standard"
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
              }}>{t("dialog.addEntityButton")}</Button>
            </div>
          </form>
          )}
          </Box>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </>
  );
}
