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
import { updateUserRequest } from "../../api/users";
import { useAuthHeader } from "react-auth-kit";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { namespaces } from "../../@types/i18n.constants";
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
    const a = formJson.lastUpdate;
    const b = formJson.creationDate;
    const deletedDate = new Date();
    const deleted = false;
    const lastUpdate = new Date(a);
    const creationDate = new Date(b);
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

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        sx={{
          "& .MuiTextField-root": { m: 1, width: "20ch" },
        }}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            updateUser(formJson);
          },
        }}
      >
        <DialogTitle>{t("dialog.updateRegister")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {t("dialog.fillInfo")}
          </DialogContentText>
          
          <Box>
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
                type="date"
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="deleted"
                name="deleted"
                label={t("columnsNames.deleted")}
                type="string"
                variant="standard"
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("dialog.cancel")}</Button>
          <Button type="submit">{t("dialog.updateButton")}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
