import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    esES,
  } from "@mui/x-data-grid";
  import {
    Box,
    Button,
    FormControl,
    ThemeProvider,
    createTheme,
  } from "@mui/material";
  import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarFilterButton,
    GridToolbarQuickFilter,
  } from "@mui/x-data-grid";
  import DeleteIcon from "@mui/icons-material/Delete";
  import RestoreIcon from "@mui/icons-material/Restore";
  import AddIcon from "@mui/icons-material/Add";
  import EditIcon from "@mui/icons-material/Edit";
  import { useEffect, useState } from "react";
  import { Catalogue } from "../../interfaces/catalogue.interface";
  import {
    getCatalogueRequest,
    getCataloguesRequest,
    updateCatalogueRequest,
  } from "../../api/catalogues";
  import { useAuthHeader } from "react-auth-kit";
  import Chip from "@mui/material/Chip";
  import { ReactComponent as Val } from "../../assets/val.svg";
  import { ReactComponent as Esp } from "../../assets/esp.svg";
  
  import "./catalogues.css";
  import CreateCatalogueDialog, { DialogData } from "./create-catalogue.dialog";
  import UpdateCatalogueDialog, {
    UpdateDialogData,
  } from "./update-catalogue.dialog";
  import { catalogueMock } from "../../utils/catalogue.mock";
  
  const theme = createTheme(
    {
      typography: {
        fontFamily: "Montserrat",
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: `
          @font-face {
            font-family: 'Montserrat';
            src: url(https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap);
          }
        `,
        },
      },
    },
    esES
  );
  
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
    return p === "VAL" || undefined ? <Val /> : <Esp />;
  }
  
  function CatalogueList() {
    const authHeader = useAuthHeader();
    const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
    const [deletedCatalogues, setDeletedCatalogues] = useState<Catalogue[]>([]);
    const [selectedCatalogues, setSelectedCatalogues] = useState<string[]>([]);
    const [rows, setRows] = useState<Catalogue[]>([]);
    const [deletedTable, setDeletedTable] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
    const [catalogueSelected, setCatalogueSelected] =
      useState<Catalogue>(catalogueMock);
    const datosDialog: DialogData = {
      open: openDialog,
      closeDialog: (close: boolean) => setOpenDialog(close),
      getInfo: () => getAndSetCatalogues(),
    };
  
    const datosUpdateDialog: UpdateDialogData = {
      open: openUpdateDialog,
      closeDialog: (close: boolean) => setOpenUpdateDialog(close),
      getInfo: () => getAndSetCatalogues(),
      catalogue: catalogueSelected,
    };
  
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
    
function CustomToolbar() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <GridToolbarContainer>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <div>
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
                    onClick={() => {
                      setDeletedTable(!deletedTable);
                      showDeleted();
                    }}
                  >
                    {deletedTable === true
                      ? "Mostrar no eliminados"
                      : "Mostrar eliminados"}
                  </Button>
                </Box>
              </div>
            </FormControl>
            <GridToolbarColumnsButton
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
            />
            <GridToolbarFilterButton
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
            />
            <GridToolbarDensitySelector
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
            />
            {deletedTable === true ? (
              <Button
                startIcon={<RestoreIcon />}
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
                onClick={restoreRegisters}
              >
                Restaurar
              </Button>
            ) : (
              <>
                <Button
                  startIcon={<AddIcon />}
                  onClick={createDialogOpen}
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
                  Añadir
                </Button>
                <Button
                  startIcon={<EditIcon />}
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
                  onClick={getSelectedCatalogues}
                >
                  Editar
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
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
                  onClick={deleteRegisters}
                >
                  Eliminar
                </Button>
              </>
            )}

            <GridToolbarQuickFilter />
          </GridToolbarContainer>
        </ThemeProvider>
      </div>
    );
  }

  if (!catalogues.length)
    return (
      <p className="text-center text-xl font-bold my-4">No catalogues Yet</p>
    );

  return (
    <ThemeProvider theme={theme}>
      <div>
        <DataGrid
          rows={rows}
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
          onRowSelectionModelChange={(catalogues) => {
            console.log(catalogues);
            let aux = catalogues as string[];
            setSelectedCatalogues(aux);
          }}
        />
      </div>
      <CreateCatalogueDialog enviar={datosDialog}></CreateCatalogueDialog>
      <UpdateCatalogueDialog enviar={datosUpdateDialog}></UpdateCatalogueDialog>
    </ThemeProvider>
  );
}

export default CatalogueList;