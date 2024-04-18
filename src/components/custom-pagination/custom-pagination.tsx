import { GridPagination } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import { PaginationItem } from "@mui/material";

const CustomPagination = (props: any) => {
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
      /*sx={{
        color: actualTheme==="light" ? "black" : "white",
      }}*/
      // @ts-expect-error
      renderItem={props2 => 
      <PaginationItem {...props2} disableRipple 
        sx={{
          color: actualTheme==="light" ? "black" : "white",
        }} 
      />}
    />
  );
};
export default CustomPagination;
