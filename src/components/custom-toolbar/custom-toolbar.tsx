import {
  FormControl,
  Box,
  Tooltip,
  Button,
  ClickAwayListener,
  Fade,
} from "@mui/material";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  useGridApiRef,
} from "@mui/x-data-grid";
import { ROLE } from "../../utils/enums/role.enum";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import FolderIcon from "@mui/icons-material/Folder";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useTranslation } from "react-i18next";
import {  useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { userMock } from "../../utils/user.mock";
import { User } from "../../interfaces/user.interface";

export interface CustomToolbarProps {
  isDeleted: boolean;
  deletedTable: () => void;
  selectedRegisters: string[];
  deleteRegisters: () => void;
  getRegisters: () => void;
}

function CustomToolbar(props: {
  p: CustomToolbarProps;
}){
  const gridApiRef = useGridApiRef();
  const [t, i18n] = useTranslation();
  const [openMenuExportar, setOpenMenuExportar] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>(userMock);
  const user = useAuthUser();

  useEffect(() => {
    if (user() && user().user) {
      setUserData(user().user);
    }
  }, [user().user]);

  function getVisibleData() {
    const rowModels = Array.from(gridApiRef.current.getRowModels().values());
    var saveDataRow: any = [];
    saveDataRow = rowModels.map((obj) => {
      const clonedObj = JSON.parse(JSON.stringify(obj));
      delete clonedObj._id;
      return clonedObj;
    });
    const visibleColumns = gridApiRef.current.getVisibleColumns();
    const saveDataColumn = visibleColumns.map((obj) =>
      JSON.parse(JSON.stringify({ field: obj.field }))
    );

    const dataShowed = saveDataRow.map((obj: any) => {
      const nuevoObjeto: { [key: string]: any } = {};
      saveDataColumn.forEach((columna) => {
        const clave = columna.field;
        nuevoObjeto[clave] = obj[clave];
      });
      return nuevoObjeto;
    });

    return dataShowed;
  }
  function exportButtonOption() {
    return (
      <div className="menuExportar">
        <Button
          variant="text"
          className="menu-item-exportar"
          onClick={() => handleExportExcel()}
          sx={{
            backgroundColor: "#D9D9D9",
            color: "#404040",
            borderColor: "#404040",
            marginRight: "5px",
            marginTop: "5px",
            marginBottom: "5px",
            "&:hover": {
              borderColor: "#0D0D0D",
              backgroundColor: "#0D0D0D",
              color: "#f2f2f2",
            },
          }}
        >
          EXCEL
        </Button>
        <Button
          variant="text"
          className="menu-item-exportar"
          onClick={() => handleExportJSON()}
          sx={{
            backgroundColor: "#D9D9D9",
            color: "#404040",
            borderColor: "#404040",
            marginTop: "5px",
            marginBottom: "5px",
            "&:hover": {
              borderColor: "#0D0D0D",
              backgroundColor: "#0D0D0D",
              color: "#f2f2f2",
            },
          }}
        >
          JSON
        </Button>
      </div>
    );
  }

  function ExportButton() {
    const handleCloseExportMenu = () => {
      setOpenMenuExportar(false);
    };

    const handleSwitchExportMenu = () => {
      setOpenMenuExportar(!openMenuExportar);
    };

    return (
      <ClickAwayListener onClickAway={handleCloseExportMenu}>
        <Tooltip
          open={openMenuExportar}
          title={exportButtonOption()}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          disableHoverListener
        >
          <Button
            className="botonExportar"
            variant="text"
            onClick={handleSwitchExportMenu}
            startIcon={<FileDownloadIcon />}
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
          >
            Exportar
          </Button>
        </Tooltip>
      </ClickAwayListener>
    );
  }

  function handleExportExcel() {
    var dataShowed = getVisibleData();

    const worksheet = XLSX.utils.json_to_sheet(dataShowed);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "entities");
    XLSX.writeFile(workbook, document.title + ".xlsx", { compression: true });
  }

  const handleExportJSON = () => {
    var dataShowed = getVisibleData();

    const json = JSON.stringify(dataShowed);
    const blob = new Blob([json], { type: "application/json" });
    saveAs(blob, "data.json");
  };

  function deleteRegisters() {
    props.p.deleteRegisters();
  }

  function getRegisters() {
    props.p.getRegisters();
  }

  return (
    <GridToolbarContainer>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <div>
          <Box className="Tabla" sx={{ display: "flex", alignItems: "center" }}>
            {userData.role !== ROLE.VIEWER ? (
              <>
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
                  onClick={() => {
                    props.p.deletedTable();
                  }}
                >
                  {props.p.isDeleted === true ? (
                    <Tooltip title={t("dataTable.showNotDeleted")}>
                      <FolderIcon></FolderIcon>
                    </Tooltip>
                  ) : (
                    <Tooltip title={t("dataTable.showDeleted")}>
                      <FolderDeleteIcon></FolderDeleteIcon>
                    </Tooltip>
                  )}
                </Button>
              </>
            ) : (
              <></>
            )}
          </Box>
        </div>
      </FormControl>
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
      <ExportButton />

      {userData.role === ROLE.ADMIN || userData.role === ROLE.SUPER_ADMIN ? (
        props.p.isDeleted === true ? (
          <>
            <Button
              disabled={props.p.selectedRegisters.length <= 0}
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
              }}
              onClick={getRegisters}
            >
              Editar
            </Button>
            <Button
              disabled={props.p.selectedRegisters.length <= 0}
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
              }}
              onClick={deleteRegisters}
            >
              Eliminar
            </Button>
          </>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
      <GridToolbarQuickFilter
        sx={{
          height: 33,
          backgroundColor: "#D9D9D9",
          color: "#404040",
          borderColor: "#404040",
          borderRadius: 1,
        }}
      />
    </GridToolbarContainer>
  );
}
export { CustomToolbar };
