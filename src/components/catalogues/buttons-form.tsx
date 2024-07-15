import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./create-catalogue.dialog.css";
import { buttonStyle } from "../../utils/functions/table-functions";

export interface buttonsFormInfo {
  handleClose: () => void;
  handleGoBack: () => void;
  isUpdate: boolean;
  step: number;
}



export default function ButtonsForm(props: { info: buttonsFormInfo }) {
  const [t, i18n] = useTranslation();

  return (
    <div className="buttonsForm">
      <Button onClick={props.info.handleClose} sx={buttonStyle}>
        {t("dialog.cancel")}
      </Button>
      <div>
        {props.info.step > 1 && (
          <Button
            onClick={props.info.handleGoBack}
            sx={{ ...buttonStyle, marginRight: 1 }}
          >
            Atrás
          </Button>
        )}
        {props.info.step < 5 && (
          <Button type="submit" sx={buttonStyle}>
            {t("dialog.next")}
          </Button>
        )}
        {props.info.step === 5 && (
          <Button type="submit" sx={buttonStyle}>
            {props.info.isUpdate
              ? t("dialog.updateButton")
              : t("dialog.addButton")}
          </Button>
        )}
      </div>
    </div>
  );
}
