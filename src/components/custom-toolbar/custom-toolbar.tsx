import { Box, Button, FormControl, styled } from "@mui/material";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ExportButton from "../export-button/export-button";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import { ROLE } from "../../utils/enums/role.enum";
import { User } from "../../interfaces/user.interface";
import { useTranslation } from "react-i18next";
import { MutableRefObject, useState } from "react";
import { GridApiCommunity } from "@mui/x-data-grid/models/api/gridApiCommunity";
import { RESPONSIBLE_IDENTITY } from "../../utils/enums/responsible-identity.enum";
import ods3 from "../../assets/ods3.svg";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import { ThemeProvider } from '@mui/material/styles';
import "./custom-toolbar.css";
import { BorderColor } from "@mui/icons-material";
import quickFilterTheme from "./quickFilterTheme";
import quickFilterHoverTheme from "./quickFilterHoverTheme";
export interface CustomToolbarProperties {
  userData: User;
  deletedTable: boolean;
  verifiedTable?: boolean;
  isCatalogues?: boolean;
  isEntities?: boolean;
  visibleData: MutableRefObject<GridApiCommunity>;
  selectedCatalogues: any[];
  deleteRegisters: () => void;
  showshowDeleted: () => void;
  showVerified?: () => void;
  createDialogOpen: () => void;
  getSelectedCatalogues: () => void;
  restoreRegisters?: () => void;
  deletePermanentRegisters?: () => void;
  refreshODS?: () => void;
}





/**
 * Renders the custom toolbar for the data grid. The buttons are rendered depending on the 
 * user's role.
 *
 * @param {CustomToolbarProperties} props - The properties for the custom toolbar.
 * @return {JSX.Element} The custom toolbar component.
 */
function CustomToolbar(props: CustomToolbarProperties) {
  const { t } = useTranslation();
  const { actualTheme } = useAlternateTheme();
  const [theme, setTheme] = useState(quickFilterTheme(actualTheme));
  const {
    userData,
    deletedTable,
    verifiedTable,
    selectedCatalogues,
    visibleData,
    isCatalogues,
    isEntities,
    showVerified,
    showshowDeleted,
    restoreRegisters,
    deletePermanentRegisters,
    createDialogOpen,
    getSelectedCatalogues,
    deleteRegisters,
    refreshODS,
  } = props;

  const buttonStyles = {
    height: 37,
    backgroundColor: "#D9D9D9",
    color: "#404040",
    borderColor: "#404040",
    marginLeft: "5px",
    "&:hover": {
      borderColor: "#0D0D0D",
      backgroundColor: "#0D0D0D",
      color: "#f2f2f2",
    },
    "&.Mui-disabled": {
      color: "darkgrey",
    },
  };

  const quickFilterStyle = {
    height: 37,
    backgroundColor: "#D9D9D9",
    "&:hover": {
      backgroundColor: "#0D0D0D",
    },
    "&.Mui-disabled": {
      color: "darkgrey",
    },
  };

  const isAdminOrSuperAdmin =
    userData.role === ROLE.ADMIN || userData.role === ROLE.SUPER_ADMIN;
  const isNotViewer = userData.role !== ROLE.VIEWER;
  const isTransparencia =
    userData.service === RESPONSIBLE_IDENTITY.GENERAL ||
    userData.service === RESPONSIBLE_IDENTITY.transparencia;

  return (
    <GridToolbarContainer
      sx={{
        color: "#404040",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box className="Tabla" sx={{ display: "flex", alignItems: "center" }}>
        {isTransparencia && isNotViewer && isCatalogues && (
          <Button sx={buttonStyles} onClick={refreshODS}>
            <img
              src={ods3}
              alt="odslogo"
              style={{
                objectFit: "cover",
                objectPosition: "left",
                width: "50%",
                height: "50%",
              }}
            />
          </Button>
        )}
        {isTransparencia && isNotViewer && isCatalogues && (
          <Button sx={buttonStyles} id="verify" onClick={showVerified}>
            {verifiedTable === false ? <DoneAllIcon /> : <RemoveDoneIcon />}
          </Button>
        )}
        {isNotViewer && (
          <Button sx={buttonStyles} onClick={showshowDeleted}>
            {deletedTable ? <FolderIcon /> : <FolderDeleteIcon />}
          </Button>
        )}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <GridToolbarColumnsButton sx={buttonStyles} />
        <GridToolbarFilterButton sx={buttonStyles} />
        <GridToolbarDensitySelector sx={buttonStyles} />
        <ExportButton visibleData={visibleData} /> 
        <ThemeProvider theme={theme}>
          <GridToolbarQuickFilter 
            sx={{ ...quickFilterStyle, marginLeft: "5px", height: 33, borderRadius: 1, }}
            onMouseEnter={() => setTheme(quickFilterHoverTheme(actualTheme))}
            onMouseLeave={() => setTheme(quickFilterTheme(actualTheme))}
          />
        </ThemeProvider>
      </Box>
      <Box
        className="rightButtons"
        sx={{ display: "flex", alignItems: "center" }}
      >
        {isAdminOrSuperAdmin &&
          (deletedTable ? (
            <>
            <Button
              disabled={selectedCatalogues.length <= 0}
              startIcon={<RestoreIcon />}
              sx={buttonStyles}
              onClick={restoreRegisters}
            >
              Restaurar
            </Button>
            <Button
              disabled={selectedCatalogues.length <= 0}
              startIcon={<DeleteIcon />}
              sx={buttonStyles}
              onClick={deletePermanentRegisters}
            >
              Eliminar
            </Button>
            </>
          ) : (
            <>
              {!(isEntities && userData.role !== ROLE.SUPER_ADMIN) && (
                <Button
                  startIcon={<AddIcon />}
                  onClick={createDialogOpen}
                  sx={buttonStyles}
                >
                  {t("dataTable.addDataset")}
                </Button>
              )}
              <Button
                disabled={selectedCatalogues.length <= 0 || selectedCatalogues.length > 1}
                startIcon={<EditIcon />}
                sx={buttonStyles}
                onClick={getSelectedCatalogues}
              >
                Editar
              </Button>
              <Button
                disabled={selectedCatalogues.length <= 0}
                startIcon={<DeleteIcon />}
                sx={buttonStyles}
                onClick={deleteRegisters}
              >
                Eliminar
              </Button>
            </>
          ))}
      </Box>
    </GridToolbarContainer>
  );
}

export default CustomToolbar;
