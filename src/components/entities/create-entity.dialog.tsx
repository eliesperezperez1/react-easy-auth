import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { CreateEntity } from "../../interfaces/entity.interface";
import { useAuthHeader } from "react-auth-kit";
import { Box } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useTranslation } from "react-i18next";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export interface DialogData {
  open: boolean;
  closeDialog: (a: boolean) => void;
  getInfo: () => void;
}

export default function CreateEntityDialog(props: { enviar: DialogData }) {
  const [open, setOpen] = useState<boolean>(false);
  const authHeader = useAuthHeader();
  const [t, i18n] = useTranslation();

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
    props.enviar.getInfo();
    handleClose();
  };

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        sx={{
          "& .MuiTextField-root": { m: 1, width: "20ch" },
          "& .MuiFormControl-root": { m: 1, width: "20ch" },
          "&. MuiInputBase-root": { m: 1, width: "20ch" },
        }}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            createEntity(formJson);
          },
        }}
      >
        <DialogTitle>{t("dialog.addRegister")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("dialog.fillInfo")}</DialogContentText>
          <Box>
            <div>
              <TextField
                autoFocus
                required
                margin="dense"
                id="responsibleIdentity"
                name="responsibleIdentity"
                label={t("columnsNames.responsibleIdentity")}
                type="string"
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="topic"
                name="topic"
                label={t("columnsNames.topic")}
                type="string"
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="lastUpdate"
                name="lastUpdate"
                type="date"
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="contactPerson"
                name="contactPerson"
                label={t("columnsNames.contactPerson")}
                type="string"
                variant="standard"
              />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker name="creationDate" />
            </LocalizationProvider>
            <div>
              <TextField
                autoFocus
                required
                margin="dense"
                id="creationDate"
                name="creationDate"
                type="date"
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="location"
                name="location"
                label={t("columnsNames.location")}
                type="string"
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="telephone"
                name="telephone"
                label={t("columnsNames.phoneNumber")}
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
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("dialog.cancel")}</Button>
          <Button type="submit">{t("dialog.addEntityButton")}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
