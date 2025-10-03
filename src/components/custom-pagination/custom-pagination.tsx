import { GridPagination } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import { THEMEAPP } from "../../utils/enums/themeApp.enum";

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
      /* Santi 09/09/25 */
      rowsPerPageOptions={[10, 25, 50, 100, 200]} 
      /* */
      sx={{
        color: actualTheme===THEMEAPP.light ? "black" : "white",
      }}
      showFirstButton
      showLastButton
    />
  );
}
export default CustomPagination;
