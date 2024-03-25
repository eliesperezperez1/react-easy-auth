import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbarExport,
  esES,
  useGridApiRef,
} from "@mui/x-data-grid";
import { Box, Button, Chip, ClickAwayListener, Fade, FormControl, PaginationItem, ThemeProvider, Tooltip, createTheme } from "@mui/material";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  GridPagination,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import FolderIcon from "@mui/icons-material/Folder";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useEffect, useState } from "react";
import { Entity } from "../../interfaces/entity.interface";
import { updateCatalogueRequest } from "../../api/catalogues";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { useTranslation } from "react-i18next";
import "./entities.css";
import { entityMock } from "../../utils/entity.mock";
import { getEntitiesRequest, getEntityRequest } from "../../api/entities";
import { User } from "../../interfaces/user.interface";
import UpdateEntityDialog, { UpdateDialogData } from "./update-entity.dialog";
import { userMock } from "../../utils/user.mock";
import CreateEntityDialog, { DialogData } from "./create-entity.dialog";
import { ROLE } from "../../utils/enums/role.enum";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { LANGUAGE } from "../../utils/enums/language.enum";
import { RESPONSIBLE_IDENTITY } from "../../utils/enums/responsible-identity.enum";
import { grey } from "@mui/material/colors";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";


const baseTheme = (actualTheme:any) => createTheme(
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
    palette:{
      mode: actualTheme==="light" ? "light" : "dark",
      ...(actualTheme === 'light'
      ? {
          // palette values for light mode
          primary: grey,
          divider: grey[800],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: grey,
          divider: grey[800],
          background: {
            default: grey[800],
            paper: grey[800],
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }),
    },
  },
  esES
);

const CustomPagination = (props: any) => {
  const { t } = useTranslation();
  const {actualTheme} = useAlternateTheme();

  return (
    <GridPagination
      labelRowsPerPage={t("tooltipText.rowsPage")}
      sx={{
        color: actualTheme==="light" ? "black" : "white",
      }}
      showFirstButton
      showLastButton
      /*sx={{
        color: actualTheme==="light" ? "black" : "white",
      }}*/
      // @ts-expect-error
      renderItem={props2 => 
      <PaginationItem {...props2} disableRipple 
        sx={{
          color: actualTheme==="light" ? "black" : "white",
        }} 
      />}
    />
  );
};

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
      case "colorRowHoverDark":
        return "rgba(212, 212, 212, 1)";
  }
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
  const [openMenuExportar, setOpenMenuExportar] = useState<boolean>(false);
  const [entitySelected, setEntitySelected] = useState<Entity>(entityMock);
  const [userData, setUserData] = useState<User>(userMock);
  const gridApiRef = useGridApiRef();
  const {actualTheme} = useAlternateTheme();

  const [t, i18n] = useTranslation();

  const datosUpdateDialog: UpdateDialogData = {
    open: openUpdateDialog,
    closeDialog: (close: boolean) => setOpenUpdateDialog(close),
    getInfo: () => getAndSetEntities(),
    entity: entitySelected,
  };

  const dialogData: DialogData = {
    open: openDialog,
    closeDialog: (a: boolean) => setOpenDialog(a),
    getInfo: () => getAndSetEntities(),
  };

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
      description: t("tooltipText.contactPersonService"),
    },
    {
      field: "location",
      headerName: t("columnsNames.location"),
      width: 200,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <a 
        href={getLocationUrl(params.value)}
        style={{
          color: actualTheme==="light" ? "darkblue" : "lightblue", // Set your desired color here
          // Add any other styling properties you need
        }}
        >
          {params.value}
        </a>
      ),
      description: t("tooltipText.locationService"),
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
      description: t("tooltipText.topicService"),
    },
    {
      field:
        userData.language === LANGUAGE.ES
          ? "responsibleIdentityES"
          : "responsibleIdentityVAL",
      headerName: t("columnsNames.responsibleIdentity"),
      width: 300,
      description: t("tooltipText.responsibleIdentityService"),
    },
    {
      field: "telephone",
      headerName: t("columnsNames.phoneNumber"),
      width: 200,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <a 
        href={"tel:+34" + params.value}
        style={{
          color: actualTheme==="light" ? "darkblue" : "lightblue", // Set your desired color here
          // Add any other styling properties you need
        }}
        >
          {params.value}
        </a>
      ),
      description: t("tooltipText.phoneNumberService"),
    },
    {
      field: "email",
      headerName: t("login.email"),
      width: 200,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <a 
        href={"mailto:" + params.value}
        style={{
          color: actualTheme==="light" ? "darkblue" : "lightblue", // Set your desired color here
          // Add any other styling properties you need
        }}
        >
          {params.value}
        </a>
      ),
      description: t("tooltipText.emailService"),
    },
  ];

  function rowCouldBeSelectable(params: any) {
    return (
      (userData.role === ROLE.ADMIN &&
        params.row.responsibleIdentity === userData.service) ||
      userData.role === ROLE.SUPER_ADMIN
    );
  }

  function getAndSetEntities() {
    getEntitiesRequest(authHeader())
      .then((response) => response.json())
      .then((data) => {
        console.log(userData);
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

  function itCouldBeSelectable() {
    return userData.role === ROLE.ADMIN || userData.role === ROLE.SUPER_ADMIN;
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
    getAndSetEntities();
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
    getAndSetEntities();
  }

  useEffect(() => {
    if (user() !== null) {
      const a = user() ? user().user : userMock;
      if (a) {
        setUserData(a);
      }
    }
    getAndSetEntities();
  }, []);

  function createDialogOpen() {
    setOpenDialog(true);
  }

  function CustomToolbar() {
    return (
          <GridToolbarContainer>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <div>
                <Box
                  className="Tabla"
                  sx={{ display: "flex", alignItems: "center" }}
                >
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
            
            {/* <Tooltip title={t("tooltipText.export")}>
              <GridToolbarExport
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
            </Tooltip> */}
            
            <ExportButton />

            <Tooltip 
            title="Búsqueda rápida"
            sx={{
              color: actualTheme==="light" ? 'darkgrey' : 'darkgrey',
            }}
            >
            <GridToolbarQuickFilter
              sx={{
                height: 33,
                backgroundColor: "#D9D9D9",
                color: actualTheme==="light" ? 'darkgrey' : 'darkgrey',
                borderColor: "#404040",
                borderRadius: 1,
              }}
            />
          </Tooltip>


        <div className="customToolbarRightButtons">
          {userData.role === ROLE.ADMIN || 
          userData.role === ROLE.SUPER_ADMIN ? (
            deletedTable === false ? (
              <>
                <Button
                  disabled={selectedEntities.length <= 0}
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
                  onClick={getSelectedEntities}
                >
                  Editar
                </Button>
                <Button
                  disabled={selectedEntities.length <= 0}
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
        </div>
      </GridToolbarContainer>
    );
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
  const handleCloseExportMenu = () => {
    setOpenMenuExportar(false);
  };

  const handleSwitchExportMenu = () => {
    setOpenMenuExportar(!openMenuExportar);
  };

  function ExportButton() {
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

  function getVisibleData(){
    const rowModels = Array.from(gridApiRef.current.getRowModels().values());
    var saveDataRow:any = [];
    saveDataRow = rowModels.map(obj => {
      const clonedObj = JSON.parse(JSON.stringify(obj));
      delete clonedObj._id;
      return clonedObj;
    });
    const visibleColumns = gridApiRef.current.getVisibleColumns();
    const saveDataColumn = visibleColumns.map(obj => JSON.parse(JSON.stringify({ field: obj.field })));
    
    const dataShowed = saveDataRow.map((obj:any) => {
      const nuevoObjeto: { [key: string]: any } = {};
      saveDataColumn.forEach(columna => {
        const clave = columna.field;
        nuevoObjeto[clave] = obj[clave];
      });
      return nuevoObjeto;
    });

    return dataShowed;
  }

  //-----------------------------------------------------------------------
  // EXPORT AS EXCEL
  //-----------------------------------------------------------------------
  function handleExportExcel() {
    
    var dataShowed = getVisibleData();

    const worksheet = XLSX.utils.json_to_sheet(dataShowed);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'entities');
    XLSX.writeFile(workbook, document.title + ".xlsx", { compression: true });
    
  }

  //-----------------------------------------------------------------------
  // EXPORT AS JSON
  //-----------------------------------------------------------------------
  const handleExportJSON = () => {
    
    var dataShowed = getVisibleData();
    
    const json = JSON.stringify(dataShowed);
    const blob = new Blob([json], { type: "application/json" });
    saveAs(blob, "data.json");
  };

  if (!entities.length)
    return (
      <span className="text-center text-xl font-bold my-4">
        {t("dataTable.noCatalogues")}
      </span>
    );

  return (
    <>
      <div>
        <ThemeProvider theme={baseTheme(actualTheme)}>
        <DataGrid
          apiRef={gridApiRef}
          rows={rows}
          columns={columns}
          sx={{
            height: 700,
            width: "100%",
            backgroundColor: actualTheme==="light" ? "white" : "#252525",
            color: actualTheme==="light" ? "#252525" : "white",
            "& .header-theme": {
              backgroundColor: "lightblue",
              border: "1px 1px 0px 0px solid black",
            },
            "& .MuiDataGrid-row":{
              border: "none",
              margin: "none",
            },
            "& .MuiDataGrid-row:hover": {
              color: actualTheme==='light' ? paletaColores("colorTextAlter") : paletaColores("colorBgRowSelectedBorder"),
              bgcolor: actualTheme==='light' ? paletaColores("colorRowHover") : paletaColores("colorRowHoverDark"),
              border: "1px solid " + paletaColores("colorBgRowSelectedBorder"),
            },
          }}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
            filter: {
              filterModel: {
                items:
                  userData.service === RESPONSIBLE_IDENTITY.GENERAL
                    ? []
                    : [
                        {
                          field: "responsibleIdentity",
                          operator: "contains",
                          value: userData.service,
                        },
                      ],
                quickFilterValues: [],
              },
            },
          }}
          components={{
            Toolbar: CustomToolbar,
            Pagination: CustomPagination,
          }}
          getRowId={(row) => row._id}
          pageSizeOptions={[5, 10]}
          checkboxSelection={itCouldBeSelectable()}
          isRowSelectable={(params) => rowCouldBeSelectable(params)}
          onRowSelectionModelChange={(entities) => {
            let aux = entities as string[];
            setSelectedEntities(aux);
          }}
          localeText={{
            toolbarColumns: t("dataTable.columns"),
            filterPanelColumns: t("localtext.columnsTexts.filterPanelColumns"),
            columnMenuLabel: t("localtext.columnsTexts.columnMenuLabel"),
            columnsPanelShowAllButton: t(
              "localtext.columnsTexts.columnsPanelShowAllButton"
            ),
            columnsPanelHideAllButton: t(
              "localtext.columnsTexts.columnsPanelHideAllButton"
            ),
            columnsPanelTextFieldLabel: t(
              "localtext.columnsTexts.columnsPanelTextFieldLabel"
            ),
            columnsPanelTextFieldPlaceholder: t(
              "localtext.columnsTexts.columnsPanelTextFieldPlaceholder"
            ),
            toolbarFilters: t("dataTable.filters"),
            filterPanelInputLabel: t(
              "localtext.filterTexts.filterPanelInputLabel"
            ),
            filterPanelInputPlaceholder: t(
              "localtext.filterTexts.filterPanelInputPlaceholder"
            ),
            filterPanelOperator: t("localtext.filterTexts.filterPanelOperator"),
            filterOperatorContains: t(
              "localtext.filterTexts.filterOperatorContains"
            ),
            filterOperatorEquals: t(
              "localtext.filterTexts.filterOperatorEquals"
            ),
            filterOperatorStartsWith: t(
              "localtext.filterTexts.filterOperatorStartsWith"
            ),
            filterOperatorEndsWith: t(
              "localtext.filterTexts.filterOperatorEndsWith"
            ),
            filterOperatorIs: t("localtext.filterTexts.filterOperatorIs"),
            filterOperatorNot: t("localtext.filterTexts.filterOperatorNot"),
            filterOperatorAfter: t("localtext.filterTexts.filterOperatorAfter"),
            filterOperatorOnOrAfter: t(
              "localtext.filterTexts.filterOperatorOnOrAfter"
            ),
            filterOperatorBefore: t(
              "localtext.filterTexts.filterOperatorBefore"
            ),
            filterOperatorOnOrBefore: t(
              "localtext.filterTexts.filterOperatorOnOrBefore"
            ),
            filterOperatorIsEmpty: t(
              "localtext.filterTexts.filterOperatorIsEmpty"
            ),
            filterOperatorIsNotEmpty: t(
              "localtext.filterTexts.filterOperatorIsNotEmpty"
            ),
            filterOperatorIsAnyOf: t(
              "localtext.filterTexts.filterOperatorIsAnyOf"
            ),

            toolbarDensity: t("dataTable.density"),
            toolbarDensityCompact: t(
              "localtext.densityTexts.toolbarDensityCompact"
            ),
            toolbarDensityStandard: t(
              "localtext.densityTexts.toolbarDensityStandard"
            ),
            toolbarDensityComfortable: t(
              "localtext.densityTexts.toolbarDensityComfortable"
            ),

            toolbarQuickFilterPlaceholder: t("dataTable.quickFilter"),
          }}
        />
        </ThemeProvider>
      </div>
      <CreateEntityDialog enviar={dialogData}></CreateEntityDialog>
      <UpdateEntityDialog enviar={datosUpdateDialog}></UpdateEntityDialog>
    </>
  );
}

export default EntitiesList;
