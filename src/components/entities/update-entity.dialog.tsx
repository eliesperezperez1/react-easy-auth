import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { Entity, UpdateEntity } from "../../interfaces/entity.interface";
import { updateEntityRequest } from "../../api/entities";
import { useAuthHeader } from "react-auth-kit";
import { Box } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTranslation } from "react-i18next";
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

  useEffect(() => {
    setUpdate(props.enviar.entity);
    setOpen(props.enviar.open);
  }, [props.enviar.open, props.enviar.entity]);

  const handleClose = () => {
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
    updateEntityRequest(
      props.enviar.entity._id,
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
    updateEntity(mergedFormData);
  };

  /* const handleValuePicker = (picker: any) => {
    if(picker==="lastUpdate"){
      if(update.lastUpdate !== undefined) {
        const dateObject = new Date(update.lastUpdate);
        const formattedDate = dateObject.toISOString().slice(0, 16);
        return formattedDate;
      }
    }
    else if (picker==="creationDate"){
      if(update.creationDate !== undefined) {
        const dateObject = new Date(update.creationDate);
        const formattedDate = dateObject.toISOString().slice(0, 16);
        return formattedDate;
      }
    }
  } */

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
                    value={update.responsibleIdentity}
                    onChange={handleChange}
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
                    value={update.topic}
                    onChange={handleChange}
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
                    value={creationDate}

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
                  value={update.location}
                  onChange={handleChange}
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
                  value={update.telephone}
                  onChange={handleChange}
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
                  value={creationDate}
              

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
              }}>{t("dialog.updateEntity")}</Button>
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
