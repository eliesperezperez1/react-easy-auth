import { Button, ClickAwayListener, Fade, Tooltip } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { MutableRefObject, useState } from "react";
import { GridApiCommunity } from "@mui/x-data-grid/models/api/gridApiCommunity";

export interface ExportButtonProps {
  visibleData: MutableRefObject<GridApiCommunity>;
}

function ExportButton(props: ExportButtonProps) {
  const [openMenuExportar, setOpenMenuExportar] = useState<boolean>(false);
  const handleCloseExportMenu = () => {
    setOpenMenuExportar(false);
  };

  const handleSwitchExportMenu = () => {
    setOpenMenuExportar(!openMenuExportar);
  };

  function getVisibleData() {
    const rowModels = Array.from(
      props.visibleData.current.getRowModels().values()
    );
    var saveDataRow: any = [];
    saveDataRow = rowModels.map((obj) => {
      const clonedObj = JSON.parse(JSON.stringify(obj));
      delete clonedObj._id;
      return clonedObj;
    });
    const visibleColumns = props.visibleData.current.getVisibleColumns();
    const saveDataColumn = visibleColumns.map((obj) =>
      JSON.parse(JSON.stringify({ field: obj.field }))
    );

    const dataShowed = saveDataRow.map((obj: any) => {
      const nuevoObjeto: { [key: string]: any } = {};
      saveDataColumn.forEach((columna: any) => {
        const clave = columna.field;
        nuevoObjeto[clave] = obj[clave];
      });
      return nuevoObjeto;
    });
    return dataShowed;
  }

  function handleExportExcel() {
    var dataShowed = getVisibleData();
    const worksheet = XLSX.utils.json_to_sheet(dataShowed);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "catalogues");
    XLSX.writeFile(workbook, document.title + ".xlsx", { compression: true });
  }

  const handleExportJSON = () => {
    var dataShowed = getVisibleData();
    const json = JSON.stringify(dataShowed);
    const blob = new Blob([json], { type: "application/json" });
    saveAs(blob, "data.json");
  };

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
            marginLeft: "5px",
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
            marginLeft: "5px",
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
export default ExportButton;
