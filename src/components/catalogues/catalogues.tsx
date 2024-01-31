import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Button, FormControl } from "@mui/material";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { Catalogue } from "../../interfaces/catalogue.interface";
import { getCataloguesRequest } from "../../api/catalogues";
import { useAuthHeader, useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import { ReactComponent as Val } from "../../assets/val.svg";
import { ReactComponent as Esp } from "../../assets/esp.svg";

import "./catalogues.css";
function CustomToolbar() {
  return (
    <div>
      <GridToolbarContainer>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <div>
            <Box
              className="Tabla"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Button
                sx={{
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                  "&:active": {
                    backgroundColor: "black",
                    color: "white",
                  },
                }}
                id="demo-select-small"
              >
                Deleted
              </Button>
            </Box>
          </div>
        </FormControl>
        <GridToolbarColumnsButton
          sx={{
            padding: 1,
            "&:hover": {
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#acacff",
            },
          }}
        />
        <GridToolbarFilterButton
          sx={{
            padding: 1,
            "&:hover": {
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#acacff",
            },
          }}
        />
        <GridToolbarDensitySelector
          sx={{
            padding: 1,
            "&:hover": {
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#acacff",
            },
          }}
        />
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          sx={{
            "&:hover": {
              backgroundColor: "blue",
              color: "white",
            },
          }}
        >
          Editar
        </Button>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          sx={{
            "&:hover": {
              backgroundColor: "blue",
              color: "white",
            },
          }}
        >
          Eliminar
        </Button>
        <Button
          variant="outlined"
          startIcon={<RestoreIcon />}
          sx={{
            "&:hover": {
              backgroundColor: "blue",
              color: "white",
            },
          }}
        >
          Restaurar
        </Button>
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    </div>
  );
}

function paletaColores(color: string) {
  switch (color) {
    case "colorTextAlter":
      return "#787878";
    case "colorBgRowSelected":
      return "rgba(255, 202, 66, 0.62)";
    case "colorBgRowSelectedBorder":
      return "#333333";
    case "colorRowHover":
      return "rgba(212, 212, 212, 0.2)";
  }
}

function yesOrNo(p: string | undefined) {
  return p === "NO" || undefined ? "error" : "success";
}
function valOrEsp(p: string | undefined) {
  console.log(p);
  return p === "VAL" || undefined ? <Val /> : <Esp />;
}

function CatalogueList() {
  const authHeader = useAuthHeader();
  const singOut = useSignOut();
  const navigate = useNavigate();
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 200 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "territorialScope", headerName: "Territorial Scope", width: 200 },
    { field: "contactPerson", headerName: "Contact Person", width: 200 },
    {
      field: "georreference",
      headerName: "Georeference",
      width: 70,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <>
          <Chip label={params.value} color={yesOrNo(params.value)} />
        </>
      ),
    },
    {
      field: "language",
      headerName: "Language",
      width: 70,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <>{valOrEsp(params.value)}</>
      ),
    },
    {
      field: "source",
      headerName: "Source",
      width: 200,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <a href={params.value}>{params.value}</a>
      ),
    },
    {
      field: "lastUpdate",
      headerName: "Last Update",
      type: "dateTime",
      width: 200,
      valueGetter: ({ value }) => value && new Date(value),
    },
  ];

  useEffect(() => {
    getCataloguesRequest(authHeader())
      .then((response) => response.json())
      .then((data) => {
        setCatalogues(data);
      });
  }, [catalogues]);

  if (!catalogues.length)
    return (
      <p className="text-center text-xl font-bold my-4">No catalogues Yet</p>
    );

  return (
    <div>
      <DataGrid
        rows={catalogues}
        columns={columns}
        sx={{
          height: 700,
          width: "100%",
          "& .header-theme": {
            backgroundColor: "lightblue",
            border: "1px 1px 0px 0px solid black",
          },
          "& .MuiDataGrid-row:hover": {
            color: paletaColores("colorTextAlter"),
            bgcolor: paletaColores("colorRowHover"),
            border: "1px solid " + paletaColores("colorBgRowSelectedBorder"),
          },
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
          filter: {
            filterModel: {
              items: [],
              quickFilterValues: [],
            },
          },
        }}
        components={{
          Toolbar: CustomToolbar,
        }}
        getRowId={(row) => row._id}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={(catalogue) => {
          const c = catalogue.at(0)?.toString();
        }}
      />
    </div>
  );
}

export default CatalogueList;
