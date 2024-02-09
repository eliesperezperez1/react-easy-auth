import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { CreateCatalogue } from "../../interfaces/catalogue.interface";

export interface DialogData {
  open: boolean;
  closeDialog: (a: boolean) => void;
  getInfo: (s: any) => void;
}

export default function CreateCatalogueDialog(props: { enviar: DialogData }) {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(props.enviar.open);
  });

  const handleClose = () => {
    setOpen(false);
    props.enviar.closeDialog(false);
  };
  const sendInformation = (e: any) => {
    props.enviar.getInfo(e);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const title = formJson.title;
            const description = formJson.description;
            const language = formJson.language;
            sendInformation({ title, description, language });
            handleClose();
          },
        }}
      >
        <DialogTitle>Añadir un conjunto de datos</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Rellena todos los campos para hacer cosas
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Título"
            type="string"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Descripción"
            type="string"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="language"
            name="language"
            label="Idioma"
            type="string"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
