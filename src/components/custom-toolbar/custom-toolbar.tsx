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
import { ROLE } from "../../utils/enums/role.enum";
import { User } from "../../interfaces/user.interface";
import { useTranslation } from "react-i18next";
import { MutableRefObject } from "react";
import { GridApiCommunity } from "@mui/x-data-grid/models/api/gridApiCommunity";


export interface CustomToolbarProperties {
  userData: User;
  deletedTable: boolean;
  visibleData: MutableRefObject<GridApiCommunity>;
  selectedCatalogues: any[];
  deleteRegisters: () => void;
  showshowDeleted: () => void;
  createDialogOpen: () => void;
  getSelectedCatalogues: () => void;
}

function CustomToolbar(props: CustomToolbarProperties) {
  const { t } = useTranslation();

  return (
    <>
      <GridToolbarContainer
        sx={{
          color:"#404040",
        }}
      >
        {props.userData.role !== ROLE.VIEWER ? (
          <FormControl sx={{ m: 1, minWidth: 120, color:"#404040", }} size="small">
            <Box
              className="Tabla"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Button
                sx={{
                  backgroundColor: "#D9D9D9",
                  color: "#404040",
                  borderColor: "#404040",
                  "&:hover": {
                    borderColor: "#0D0D0D",
                    backgroundColor: "#0D0D0D",
                    color: "#f2f2f2",
                  },
                }}
                id="demo-select-small"
                onClick={props.showshowDeleted}
              >
                {props.deletedTable === true ? (
                  <Tooltip title={t("dataTable.showNotDeleted")}>
                    <FolderIcon></FolderIcon>
                  </Tooltip>
                ) : (
                  <Tooltip title={t("dataTable.showDeleted")}>
                    <FolderDeleteIcon></FolderDeleteIcon>
                  </Tooltip>
                )}
              </Button>
            </Box>
          </FormControl>
        ) : (
          <></>
        )}
        <Tooltip title={t("tooltipText.column")}>
          <GridToolbarColumnsButton
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
          />
        </Tooltip>
        <Tooltip title={t("tooltipText.filter")}>
          <GridToolbarFilterButton
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
          />
        </Tooltip>
        <Tooltip title={t("tooltipText.density")}>
          <GridToolbarDensitySelector
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
          />
        </Tooltip>
        <ExportButton visibleData={props.visibleData} />

        <Tooltip title="Búsqueda rápida">
          <GridToolbarQuickFilter
            sx={{
              height: 33,
              backgroundColor: "#D9D9D9",
              color: "#404040",
              borderColor: "#404040",
              borderRadius: 1,
            }}
          />
        </Tooltip>

        <div className="customToolbarRightButtons">
          {props.userData.role === ROLE.ADMIN ||
          props.userData.role === ROLE.SUPER_ADMIN ? (
            props.deletedTable === true ? (
              <Button
                disabled={props.selectedCatalogues.length <= 0}
                startIcon={<RestoreIcon />}
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
                  "&.Mui-disabled": {
                    color: 'darkgrey',
                  },
                }}
                onClick={props.getSelectedCatalogues}
              >
                Restaurar
              </Button>
            ) : (
              <>
                <Button
                  startIcon={<AddIcon />}
                  onClick={props.createDialogOpen}
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
                    "&.Mui-disabled": {
                      color: 'darkgrey',
                    },
                  }}
                >
                  {t("dataTable.addDataset")}
                </Button>
                <Button
                  disabled={props.selectedCatalogues.length <= 0}
                  startIcon={<EditIcon />}
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
                    "&.Mui-disabled": {
                      color: 'darkgrey',
                    },
                  }}
                  onClick={props.getSelectedCatalogues}
                >
                  Editar
                </Button>
                <Button
                  disabled={props.selectedCatalogues.length <= 0}
                  startIcon={<DeleteIcon />}
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
                    "&.Mui-disabled": {
                      color: 'darkgrey',
                    },
                  }}
                  onClick={props.deleteRegisters}
                >
                  Eliminar
                </Button>
              </>
            )
          ) : (
            <></>
          )}
        </div>
      </GridToolbarContainer>
    </>
  );
}
export default CustomToolbar;
