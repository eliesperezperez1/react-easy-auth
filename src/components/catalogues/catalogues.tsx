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
import { useTranslation } from "react-i18next";
import { namespaces } from "../../@types/i18n.constants";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import FolderIcon from "@mui/icons-material/Folder";
import Tooltip from "@mui/material/Tooltip";
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

  const [t, i18n] = useTranslation();
  const datosUpdateDialog: UpdateDialogData = {
    open: openUpdateDialog,
    closeDialog: (close: boolean) => setOpenUpdateDialog(close),
    getInfo: () => getAndSetCatalogues(),
    catalogue: catalogueSelected,
  };

  const columns: GridColDef[] = [
    // { field: "_id", headerName: "ID", width: 200, hideable: true },
    { field: "title", headerName: t("columnsNames.title"), width: 200 },
    {
      field: "description",
      headerName: t("columnsNames.description"),
      width: 200,
    },
    { field: "topic", headerName: t("columnsNames.topic"), width: 200 },
    {
      field: "responsibleIdentity",
      headerName: t("columnsNames.responsibleIdentity"),
      width: 200,
    },
    {
      field: "datasetsRelation",
      headerName: t("columnsNames.datasetsRelation"),
      width: 200,
    },
    { field: "fieldList", headerName: t("columnsNames.fieldList"), width: 200 },
    {
      field: "dataUnbundling",
      headerName: t("columnsNames.dataUnbundling"),
      width: 200,
    },
    {
      field: "updateFrequency",
      headerName: t("columnsNames.updateFrequency"),
      width: 200,
    },
    { field: "format", headerName: t("columnsNames.format"), width: 200 },
    {
      field: "dataOrigin",
      headerName: t("columnsNames.dataOrigin"),
      width: 200,
    },
    {
      field: "dataOriginURL",
      headerName: t("columnsNames.dataOriginURL"),
      width: 200,
    },
    {
      field: "connection",
      headerName: t("columnsNames.connection"),
      width: 200,
    },
    {
      field: "dataFiability",
      headerName: t("columnsNames.dataFiability"),
      width: 200,
    },
    { field: "comments", headerName: t("columnsNames.comments"), width: 200 },
    { field: "RAT", headerName: t("columnsNames.RAT"), width: 200 },
    {
      field: "temporaryCoverage",
      headerName: t("columnsNames.temporaryCoverage"),
      width: 200,
    },
    {
      field: "repositoryStorage",
      headerName: t("columnsNames.repositoryStorage"),
      width: 200,
    },
    {
      field: "repositoryStorageURL",
      headerName: t("columnsNames.repositoryStorageURL"),
      width: 200,
    },
    {
      field: "fieldSuppression",
      headerName: t("columnsNames.fieldSuppression"),
      width: 200,
    },
    {
      field: "accessType",
      headerName: t("columnsNames.accessType"),
      width: 200,
    },
    {
      field: "activeAds",
      headerName: t("columnsNames.activeAds"),
      width: 200,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <>
          <Chip label={params.value} color={yesOrNo(params.value)} />
        </>
      ),
    },
    { field: "posts", headerName: t("columnsNames.posts"), width: 200 },
    { field: "licence", headerName: t("columnsNames.licence"), width: 200 },
    {
      field: "sensitiveInformation",
      headerName: t("columnsNames.sensitiveInformation"),
      width: 200,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <>
          <Chip label={params.value} color={yesOrNo(params.value)} />
        </>
      ),
    },
    {
      field: "personalData",
      headerName: t("columnsNames.personalData"),
      width: 200,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <>
          <Chip label={params.value} color={yesOrNo(params.value)} />
        </>
      ),
    },
    {
      field: "georreference",
      headerName: t("columnsNames.georreference"),
      width: 200,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <>
          <Chip label={params.value} color={yesOrNo(params.value)} />
        </>
      ),
    },
    {
      field: "language",
      headerName: t("columnsNames.language"),
      width: 70,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <>{valOrEsp(params.value)}</>
      ),
    },
    {
      field: "source",
      headerName: t("columnsNames.source"),
      width: 200,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <a href={params.value}>{params.value}</a>
      ),
    },
    {
      field: "lastUpdate",
      headerName: t("columnsNames.lastUpdate"),
      type: "dateTime",
      width: 200,
      valueGetter: ({ value }) => value && new Date(value),
    },
  ];

  function getAndSetCatalogues() {
    getCataloguesRequest(authHeader())
      .then((response) => response.json())
      .then((data) => {
        let notDeleted = data.filter((d: Catalogue) => d.deleted !== true);
        let deleted = data.filter((d: Catalogue) => d.deleted === true);
        setCatalogues(notDeleted);
        setDeletedCatalogues(deleted);
        if (deletedTable) {
          setRows(deleted);
        } else {
          setRows(notDeleted);
        }
      });
  }
  function getSelectedCatalogues() {
    selectedCatalogues.forEach((sc) => {
      getCatalogueRequest(authHeader(), sc)
        .then((response) => response.json())
        .then((data) => {
          setCatalogueSelected(data);
          setOpenUpdateDialog(true);
        });
    });
  }

  function showDeleted() {
    if (!deletedTable) {
      setRows(deletedCatalogues);
    } else {
      setRows(catalogues);
    }
  }

  function deleteRegisters() {
    selectedCatalogues.forEach((sc: string) => {
      let cata = catalogues.find((v) => v._id === sc);
      if (cata) {
        updateCatalogueRequest(
          cata._id,
          { ...cata, deleted: true, deletedDate: new Date() },
          authHeader()
        );
      }
    });
    getAndSetCatalogues();
  }

  function restoreRegisters() {
    selectedCatalogues.forEach((sc: string) => {
      let cata = deletedCatalogues.find((v) => v._id === sc);
      if (cata) {
        updateCatalogueRequest(
          cata._id,
          { ...cata, deleted: false },
          authHeader()
        );
      }
    });
    getAndSetCatalogues();
  }

  useEffect(() => {
    getAndSetCatalogues();
  }, []);

  function createDialogOpen() {
    setOpenDialog(true);
  }

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
                    {deletedTable === true ? (
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
              </div>
            </FormControl>
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
            {deletedTable === true ? (
              <Button
                disabled={selectedCatalogues.length <= 0}
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
                >
                  {t("dataTable.addDataset")}
                </Button>
                <Button
                  disabled={selectedCatalogues.length <= 0}
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
                  onClick={getSelectedCatalogues}
                >
                  Editar
                </Button>
                <Button
                  disabled={selectedCatalogues.length <= 0}
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
            )}

            <GridToolbarQuickFilter />
          </GridToolbarContainer>
        </ThemeProvider>
      </div>
    );
  }

  if (!catalogues.length)
    return (
      <p className="text-center text-xl font-bold my-4">
        {t("dataTable.noCatalogues")}
      </p>
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
            let aux = catalogues as string[];
            setSelectedCatalogues(aux);
          }}
          localeText={{
            toolbarColumns: t("dataTable.columns"),
            toolbarFilters: t("dataTable.filters"),
            toolbarDensity: t("dataTable.density"),
            toolbarQuickFilterPlaceholder: t("dataTable.quickFilter"),
          }}
        />
      </div>
      <CreateCatalogueDialog enviar={datosDialog}></CreateCatalogueDialog>
      <UpdateCatalogueDialog enviar={datosUpdateDialog}></UpdateCatalogueDialog>
    </ThemeProvider>
  );
}

export default CatalogueList;
