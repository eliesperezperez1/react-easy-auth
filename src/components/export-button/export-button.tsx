import { Button, ClickAwayListener, Fade, Tooltip } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { MutableRefObject, useEffect, useState } from "react";
import { GridApiCommunity } from "@mui/x-data-grid/models/api/gridApiCommunity";
import { gridFilteredSortedRowIdsSelector, gridVisibleColumnFieldsSelector } from '@mui/x-data-grid';

export interface ExportButtonProps {
  visibleData: MutableRefObject<GridApiCommunity>;
}

function ExportButton({ visibleData }: ExportButtonProps) {
  const [openMenuExportar, setOpenMenuExportar] = useState(false);
  useEffect(() => {}, [visibleData])

  const getVisibleData = () => {
    const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(visibleData);
    const visibleColumnsField = gridVisibleColumnFieldsSelector(visibleData);

    // Format the data. Here we only keep the value
    const data = filteredSortedRowIds.map((id) => {
      const row: any = {};
      visibleColumnsField.forEach((field) => {
        row[field] = visibleData.current.getCellParams(id, field).value;
      });
      return row;
    });

    return data;
  };

  const handleExport = (type: "xlsx" | "json") => {
    const dataShowed = getVisibleData();

    if (type === "xlsx") {
      const worksheet = XLSX.utils.json_to_sheet(dataShowed);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "catalogues");
      XLSX.writeFile(workbook, document.title + ".xlsx", { compression: true });
    } else {
      const json = JSON.stringify(dataShowed);
      const blob = new Blob([json], { type: "application/json" });
      saveAs(blob, "data.json");
    }

    setOpenMenuExportar(false);
  };

  return (
    <ClickAwayListener onClickAway={() => setOpenMenuExportar(false)}>
      <Tooltip
        open={openMenuExportar}
        title={
          <div className="menuExportar">
            {["xlsx", "json"].map((type) => (
              <Button
                key={type}
                variant="text"
                className="menu-item-exportar"
                onClick={() => handleExport(type)}
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
                {type.toUpperCase()}
              </Button>
            ))}
          </div>
        }
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        disableHoverListener
      >
        <Button
          className="botonExportar"
          variant="text"
          onClick={() => setOpenMenuExportar((prev) => !prev)}
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
