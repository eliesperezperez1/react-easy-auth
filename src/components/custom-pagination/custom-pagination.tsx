import { GridPagination } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";

const CustomPagination = (props: any) => {
  const { t } = useTranslation();

  return (
    <GridPagination
      {...props}
      labelRowsPerPage={t("tooltipText.rowsPage")} // Use your translation key here
    />
  );
};
export default CustomPagination;
