import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./create-catalogue.dialog.css";

export interface buttonsFormInfo {
  handleClose: () => void;
  handleGoBack: () => void;
}
export default function ButtonsForm(props: { info: buttonsFormInfo }) {
  const [t, i18n] = useTranslation();

  return (
      <div className="buttonsForm">
        <Button
          onClick={props.info.handleClose}
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
  );
}
