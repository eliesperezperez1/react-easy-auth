import { Box, Button, FormControl, Tooltip } from "@mui/material";
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
import { MutableRefObject } from "react";
import { GridApiCommunity } from "@mui/x-data-grid/models/api/gridApiCommunity";
import { RESPONSIBLE_IDENTITY } from "../../utils/enums/responsible-identity.enum";
import ods from "../../assets/ods.svg";
import ods3 from "../../assets/ods3.svg";


export interface CustomToolbarProperties {
  userData: User;
  deletedTable: boolean;
  verifiedTable?: boolean;
  isCatalogues?: boolean;
  visibleData: MutableRefObject<GridApiCommunity>;
  selectedCatalogues: any[];
  deleteRegisters: () => void;
  showshowDeleted: () => void;
  showVerified?: () => void;
  createDialogOpen: () => void;
  getSelectedCatalogues: () => void;
  restoreRegisters?: () => void;
  refreshODS?: () => void;
}

const buttonStyles = {
  height: 37,
  backgroundColor: "#D9D9D9",
  color: "#404040",
  borderColor: "#404040",
  "&:hover": {
    borderColor: "#0D0D0D",
    backgroundColor: "#0D0D0D",
    color: "#f2f2f2",
  },
  "&.Mui-disabled": {
    color: "darkgrey",
  },
};

const odsStyles = {
  height: 60,
  backgroundColor: "#D9D9D9",
  color: "#404040",
  borderColor: "#404040",
  "&:hover": {
    borderColor: "#0D0D0D",
    backgroundColor: "#0D0D0D",
    color: "#f2f2f2",
  },
  "&.Mui-disabled": {
    color: "darkgrey",
  },
};

function CustomToolbar(props: CustomToolbarProperties) {
  const { t } = useTranslation();
  const {
    userData,
    deletedTable,
    verifiedTable,
    selectedCatalogues,
    visibleData,
    isCatalogues,
    showVerified,
    showshowDeleted,
    restoreRegisters,
    createDialogOpen,
    getSelectedCatalogues,
    deleteRegisters,
    refreshODS
  } = props;
  const isAdminOrSuperAdmin =
    userData.role === ROLE.ADMIN || userData.role === ROLE.SUPER_ADMIN;
  const isNotViewer = userData.role !== ROLE.VIEWER;
  const isTransparencia =
    userData.service === RESPONSIBLE_IDENTITY.GENERAL ||
    userData.service === RESPONSIBLE_IDENTITY.transparencia;
  return (
    <GridToolbarContainer sx={{ color: "#404040" }}>
      {isNotViewer && (
        <FormControl
          sx={{ m: 1, minWidth: 120, color: "#404040" }}
          size="small"
        >
          <Box className="Tabla" sx={{ display: "flex", alignItems: "center" }}>
            <Button
              sx={buttonStyles}
              id="demo-select-small"
              onClick={showshowDeleted}
            >
              {deletedTable ? <FolderIcon /> : <FolderDeleteIcon />}
            </Button>
          </Box>
        </FormControl>
      )}
      {isTransparencia && isNotViewer && isCatalogues && (
        <FormControl>
          <Box className="Tabla" sx={{ display: "flex", alignItems: "center" }}>
            <Button
              sx={buttonStyles}
              id="demo-select-small"
              onClick={showVerified}
            >
              {verifiedTable === false ? <RemoveDoneIcon /> : <DoneAllIcon />}
            </Button>
          </Box>
          <Box className="Tabla" sx={{ display: "flex", alignItems: "center" }}>
            <Button
              sx={odsStyles}
              id="demo-select-small"
              onClick={refreshODS}
            >
              <img
                src={ods3}
                alt="Image"
                style={{
                  objectFit: "cover",
                  objectPosition: "left",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Button>
          </Box>
        </FormControl>
      )}
      <GridToolbarColumnsButton sx={buttonStyles} />
      <GridToolbarFilterButton sx={buttonStyles} />
      <GridToolbarDensitySelector sx={buttonStyles} />
      <ExportButton visibleData={visibleData} />
      <GridToolbarQuickFilter
        sx={{ ...buttonStyles, height: 33, borderRadius: 1 }}
      />
      <div className="customToolbarRightButtons">
        {isAdminOrSuperAdmin &&
          (deletedTable ? (
            <Button
              disabled={selectedCatalogues.length <= 0}
              startIcon={<RestoreIcon />}
              sx={buttonStyles}
              onClick={restoreRegisters}
            >
              Restaurar
            </Button>
          ) : (
            <>
              <Button
                startIcon={<AddIcon />}
                onClick={createDialogOpen}
                sx={buttonStyles}
              >
                {t("dataTable.addDataset")}
              </Button>
              <Button
                disabled={selectedCatalogues.length <= 0}
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
      </div>
    </GridToolbarContainer>
  );
}

export default CustomToolbar;
