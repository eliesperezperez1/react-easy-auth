import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  esES,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  Chip,
  FormControl,
  ThemeProvider,
  Tooltip,
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
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import FolderIcon from "@mui/icons-material/Folder";
import { useEffect, useState } from "react";
import { Entity } from "../../interfaces/entity.interface";
import { updateCatalogueRequest } from "../../api/catalogues";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { ReactComponent as Val } from "../../assets/val.svg";
import { ReactComponent as Esp } from "../../assets/esp.svg";
import { useTranslation } from "react-i18next";

import "./entities.css";
import { entityMock } from "../../utils/entity.mock";
import { getEntitiesRequest, getEntityRequest } from "../../api/entities";
import CreateEntityDialog, { DialogData } from "./create-entity.dialog";
import UpdateEntityDialog, { UpdateDialogData } from "./update-entity.dialog";

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

function EntitiesList() {
  const authHeader = useAuthHeader();
  const user = useAuthUser();
  const [entities, setEntities] = useState<Entity[]>([]);
  const [deletedEntities, setDeletedEntities] = useState<Entity[]>([]);
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
  const [rows, setRows] = useState<Entity[]>([]);
  const [deletedTable, setDeletedTable] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const [entitySelected, setEntitySelected] = useState<Entity>(entityMock);
  const [userService, setUserService] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");

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
    entity: entitySelected,
  };
  function isDisabled(): boolean {
    return !(
      selectedEntities.length > 0 &&
      (userService === "general" || userRole === "admin")
    );
  }

  function getLocationUrl(location: string | undefined) {
    return !!location
      ? "https://www.google.com/maps/search/?api=1&query=" +
          location.split(" ").join("+")
      : "";
  }
  function getTopicColor(topic: string | undefined) {
    switch (topic) {
      case "Sector Público":
        return { backgroundColor: "#9400D3", color: "white" };
      case "Salud":
        return { backgroundColor: "#4B0082", color: "white" };
      case "Cultura y ocio":
        return { backgroundColor: "#0000FF", color: "white" };
      case "Urbanismo e infraestructuras":
        return { backgroundColor: "#00FF00" };
      case "Ciencia y tecnología":
        return { backgroundColor: "#FFFF00" };
      case "Medio Ambiente":
        return { backgroundColor: "#FF7F00" };
      case "Economía":
        return { backgroundColor: "#FF0000" };
      case "Hacienda":
        return { backgroundColor: "#FF00FF" };
      case "Seguridad":
        return { backgroundColor: "#00FF80" };
      case "Turismo":
        return { backgroundColor: "#00FFFF" };
      case "Sociedad y Bienestar":
        return { backgroundColor: "#0080FF" };
      case "Educación":
        return { backgroundColor: "#000000", color: "white" };
      case "Transporte":
        return { backgroundColor: "#FFFFFF", color: "black" };
    }
  }

  const columns: GridColDef[] = [
    {
      field: "contactPerson",
      headerName: t("columnsNames.contactPerson"),
      width: 200,
    },
    {
      field: "location",
      headerName: t("columnsNames.location"),
      width: 200,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <a href={getLocationUrl(params.value)}>{params.value}</a>
      ),
    },
    {
      field: "topic",
      headerName: t("columnsNames.topic"),
      width: 200,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <>
          <Chip label={params.value} style={getTopicColor(params.value)} />
        </>
      ),
    },
    {
      field: "responsibleIdentity",
      headerName: t("columnsNames.responsibleIdentity"),
      width: 300,
    },
    {
      field: "telephone",
      headerName: t("columnsNames.phoneNumber"),
      width: 200,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <a href={"tel:+34" + params.value}>{params.value}</a>
      ),
    },
    {
      field: "email",
      headerName: t("login.email"),
      width: 200,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <a href={"mailto:" + params.value}>{params.value}</a>
      ),
    },
  ];

  function getAndSetCatalogues() {
    getEntitiesRequest(authHeader())
      .then((response) => response.json())
      .then((data) => {
        let notDeleted = data.filter((d: Entity) => d.deleted !== true);
        let deleted = data.filter((d: Entity) => d.deleted === true);
        setEntities(notDeleted);
        setDeletedEntities(deleted);
        if (deletedTable) {
          setRows(deleted);
        } else {
          setRows(notDeleted);
        }
      });
  }
  function getSelectedEntities() {
    selectedEntities.forEach((sc) => {
      getEntityRequest(authHeader(), sc)
        .then((response) => response.json())
        .then((data) => {
          setEntitySelected(data);
          setOpenUpdateDialog(true);
        });
    });
  }

  function showDeleted() {
    if (!deletedTable) {
      setRows(deletedEntities);
    } else {
      setRows(entities);
    }
  }

  function deleteRegisters() {
    selectedEntities.forEach((sc: string) => {
      let cata = entities.find((v) => v._id === sc);
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
    selectedEntities.forEach((sc: string) => {
      let cata = deletedEntities.find((v) => v._id === sc);
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
    setUserRole(user().user.role);
    setUserService(user().user.service);
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
                disabled={isDisabled()}
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
                  disabled
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
                  disabled={isDisabled()}
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
                  onClick={getSelectedEntities}
                >
                  Editar
                </Button>
                <Button
                  disabled
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

            <GridToolbarQuickFilter
              sx={{
                height: 33,
                backgroundColor: "#D9D9D9",
                color: "#404040",
                borderColor: "#404040",
                borderRadius: 1,
                "&:hover": {
                  //borderColor: "#0D0D0D",
                  //backgroundColor: "#0D0D0D",
                  //color: "#f2f2f2",
                },
              }}
            />
          </GridToolbarContainer>
        </ThemeProvider>
      </div>
    );
  }

  if (!entities.length)
    return (
      <span className="text-center text-xl font-bold my-4">
        {t("dataTable.noCatalogues")}
      </span>
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
          onRowSelectionModelChange={(entities) => {
            let aux = entities as string[];
            setSelectedEntities(aux);
          }}
          localeText={{
            toolbarColumns: t("dataTable.columns"),
            toolbarFilters: t("dataTable.filters"),
            toolbarDensity: t("dataTable.density"),
            toolbarQuickFilterPlaceholder: t("dataTable.quickFilter"),
          }}
        />
      </div>
      <CreateEntityDialog enviar={datosDialog}></CreateEntityDialog>
      <UpdateEntityDialog enviar={datosUpdateDialog}></UpdateEntityDialog>
    </ThemeProvider>
  );
}

export default EntitiesList;
