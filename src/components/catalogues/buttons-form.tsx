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



/**
 * Renders a form with buttons for navigating through a multi-step dialog.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.info - The information object.
 * @param {Function} props.info.handleClose - The function to handle the close button.
 * @param {Function} props.info.handleGoBack - The function to handle the back button.
 * @param {boolean} props.info.isUpdate - Indicates if the form is in update mode.
 * @param {number} props.info.step - The current step in the dialog.
 * @return {JSX.Element} The rendered form.
 */
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
