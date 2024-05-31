import { GridPagination } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";

function CustomPagination(props: any) {
  const { t } = useTranslation();
  const {actualTheme} = useAlternateTheme();

  return (
    
    <GridPagination
      labelRowsPerPage={t("tooltipText.rowsPage")}
      sx={{
        color: actualTheme==="light" ? "black" : "white",
      }}
      showFirstButton
      showLastButton
    />
  );
}
export default CustomPagination;
