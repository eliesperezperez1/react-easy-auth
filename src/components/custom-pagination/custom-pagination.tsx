import { GridPagination } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";

/**
 * Renders a custom pagination component using the MUI GridPagination component.
 *
 * @param {any} props - The props passed to the component.
 * @return {JSX.Element} The rendered custom pagination component.
 */
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
