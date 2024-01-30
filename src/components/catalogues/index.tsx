import { DataGrid, GridColDef } from "@mui/x-data-grid";
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
                    backgroundColor: "blue",
                    color: "white",
                  },
                }}
                id="demo-select-small"
              ></Button>
            </Box>
            <Box
              className="Tabla"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Button
                sx={{
                  "&:hover": {
                    backgroundColor: "blue",
                    color: "white",
                  },
                  "&:active": {
                    backgroundColor: "blue",
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
      return "#1976d2";
    case "colorBgRowSelected":
      return "rgba(255, 202, 66, 0.62)";
    case "colorBgRowSelectedBorder":
      return "rgba(104, 250, 255, 1)";
    case "colorRowHover":
      return "rgba(255,200,64, 0.2)";
  }
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
    {
      field: "lastUpdate",
      headerName: "Last Update",
      type: "dateTime",
      width: 200,
      valueGetter: ({ value }) => value && new Date(value),
    },
  ];
  const logout = () => {
    singOut();
    navigate("/login");
  };
  useEffect(() => {
    getCataloguesRequest(authHeader())
      .then((response) => response.json())
      .then((data) => {
        setCatalogues(data);
      });
  }, []);

  if (!catalogues.length)
    return (
      <p className="text-center text-xl font-bold my-4">No catalogues Yet</p>
    );

  return (
    <div>
      <div>
        <button onClick={logout}>LOG OUT</button>
      </div>
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
