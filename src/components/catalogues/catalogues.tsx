import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  useGridApiRef,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Catalogue } from "../../interfaces/catalogue.interface";
import {
  getCatalogueRequest,
  getCataloguesRequest,
  updateCatalogueRequest,
} from "../../api/catalogues";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { useTranslation } from "react-i18next";
import "./catalogues.css";
import CreateCatalogueDialog, { DialogData } from "./create-catalogue.dialog";
import UpdateCatalogueDialog, {
  UpdateDialogData,
} from "./update-catalogue.dialog";
import { catalogueMock } from "../../utils/catalogue.mock";
import { ROLE } from "../../utils/enums/role.enum";
import { User } from "../../interfaces/user.interface";
import { userMock } from "../../utils/user.mock";
import { RESPONSIBLE_IDENTITY } from "../../utils/enums/responsible-identity.enum";
import CustomPagination from "../custom-pagination/custom-pagination";
import CustomToolbar from "../custom-toolbar/custom-toolbar";
import {
  paletaColores,
  valOrEsp,
  isChecked,
  arrayCell,
} from "../../utils/functions/table-functions";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import baseTheme from "../darkModeSwitch/darkmodeTheme";
import { Rating, ThemeProvider } from "@mui/material";
import { refreshODSRequest } from "../../api/ods";

function CatalogueList() {
  const authHeader = useAuthHeader();
  const user = useAuthUser();
  const { actualTheme } = useAlternateTheme();
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const [deletedCatalogues, setDeletedCatalogues] = useState<Catalogue[]>([]);
  const [selectedCatalogues, setSelectedCatalogues] = useState<string[]>([]);
  const [rows, setRows] = useState<Catalogue[]>([]);
  const [deletedTable, setDeletedTable] = useState<boolean>(false);
  const [notDeletedNotVerified, setNotDeletedNotVerified] = useState<
    Catalogue[]
  >([]);
  const [notDeletedVerified, setNotDeletedVerified] = useState<Catalogue[]>([]);
  const [deletedNotVerified, setDeletedNotVerified] = useState<Catalogue[]>([]);
  const [deletedVerified, setDeletedVerified] = useState<Catalogue[]>([]);
  const [verifiedTable, setverifiedTable] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const [catalogueSelected, setCatalogueSelected] =
    useState<Catalogue>(catalogueMock);
  const [userData, setUserData] = useState<User>(userMock);
  const gridApiRef = useGridApiRef();

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
    {
      field: "title",
      headerName: t("columnsNames.title"),
      width: 200,
      description: t("tooltipText.title"),
    },
    {
      field: "description",
      headerName: t("columnsNames.description"),
      width: 200,
      description: t("tooltipText.description"),
    },
    {
      field: "responsibleIdentity",
      headerName: t("columnsNames.responsibleIdentity"),
      width: 200,
      description: t("tooltipText.responsibleIdentity"),
    },
    {
      field: "organism",
      headerName: "Organismo",
      width: 200,
      description: "Organismo al que pertenece",
    },
    {
      field: "topic",
      headerName: t("columnsNames.topic"),
      width: 200,
      description: t("tooltipText.topic"),
      renderCell: (params: GridRenderCellParams<any, string[]>) => {
        return arrayCell(params.value);
      },
    },
    {
      field: "language",
      headerName: "Idioma",
      width: 70,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <>{valOrEsp(params.value)}</>
      ),
      description: t("tooltipText.language"),
    },
    {
      field: "keyWords",
      headerName: "Palabras clave",
      width: 200,
      description: "Palabras clave",
      renderCell: (params: GridRenderCellParams<any, string[]>) => {
        return arrayCell(params.value);
      },
    },
    {
      field: "minimumVariables",
      headerName: "Campos mínimos",
      width: 200,
      description: "Campos mínimos que debe incluir el dataset",
    },
    {
      field: "contactPerson",
      headerName: t("columnsNames.contactPerson"),
      width: 200,
      description: t("tooltipText.contactPersonService"),
    },
    {
      field: "masterData",
      headerName: "Dato maestro",
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description: "Datos referentes a las características básicas del negocio",
    },
    {
      field: "referenceData",
      headerName: "Dato de referencia",
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description:
        "Datos que definen el conjunto de valores admisibles en otros campos de datos",
    },
    {
      field: "highValue",
      headerName: "Alto valor",
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description: "¿Es un dataset de alto valor?",
    },
    {
      field: "activeAds",
      headerName: t("columnsNames.activeAds"),
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description: t("tooltipText.activeAds"),
    },
    {
      field: "comments",
      headerName: t("columnsNames.comments"),
      width: 200,
      description: t("tooltipText.comments"),
    },

    {
      field: "typeGeo",
      headerName: "Información geográfica",
      width: 200,
      description: "¿Qué tipo de información geográfica contiene el dataset?",
    },
    {
      field: "temporaryCoverage",
      headerName: t("columnsNames.temporaryCoverage"),
      width: 200,
      description: t("tooltipText.temporaryCoverage"),
    },

    {
      field: "genderInfo",
      headerName: "Información de género",
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description: "¿¿El dataset dispone de información de género??",
    },
    {
      field: "structuredComments",
      headerName: "Comentarios de la estructura",
      width: 200,
      description: "Comentarios relativos a la estructura interna del dataset",
    },
    {
      field: "associatedApplication",
      headerName: "Aplicación de origen",
      width: 200,
      description: "Nombre de la aplicación de origen de los datos",
    },
    {
      field: "autoAcess",
      headerName: "Acceso automatizado",
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description:
        "¿Se puede acceder a los datos de origen de forma automatizada? ",
    },
    {
      field: "originComments",
      headerName: "Comentarios del origen",
      width: 200,
      description: "Comentarios relativos al origen de los datos",
    },
    {
      field: "RAT",
      headerName: t("columnsNames.RAT"),
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description: t("tooltipText.RAT"),
    },
    {
      field: "dataProtection",
      headerName: "Protección de datos",
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description:
        "¿El dataset contiene datos personales protegidos por la LOPD?",
    },
    {
      field: "dataStandards",
      headerName: "Estándares de datos",
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description:
        "¿Existen campos del dataset que deberían publicarse por normativa?",
    },
    {
      field: "dataProtectionComments",
      headerName: "Comentarios del origen",
      width: 200,
      description: "Comentarios relativos a la protección de los datos",
    },
    {
      field: "dataAnonymize",
      headerName: "Anonimización de datos",
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description:
        "Campos del dataset que requieren ser anonimizados. Separar cada campo con un punto y coma (;)",
    },
    {
      field: "dataQuality",
      headerName: "Calidad de los datos",
      width: 200,
      renderCell: (params) => {
        return <Rating name="read-only" value={params.value} readOnly />;
      },
      description:
        "Valoración numérica de la calidad de los datos (del 1 al 5)",
    },
    {
      field: "sharingLevel",
      headerName: "Nivel de compartición",
      width: 200,
      description:
        "¿Quién tiene acceso a estos datos dentro de la organización?",
    },
    {
      field: "sharedData",
      headerName: "Datos compartidos",
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description: "¿Se han compartido estos datos en alguna plataforma?",
    },
    {
      field: "VLCi",
      headerName: "VLCi",
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description: "¿Está compartido en la plataforma Smart City?",
    },
    {
      field: "ArcGIS",
      headerName: "ArcGIS",
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description: "¿Está cargado en ArcGIS?",
    },
    {
      field: "Pentaho",
      headerName: "Pentaho",
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description: "¿Está disponible en Pentaho?",
    },
    {
      field: "CKAN",
      headerName: "CKAN",
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description: "¿Está cargado en CKAN?",
    },
    {
      field: "MongoDB",
      headerName: "MongoDB",
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description: "¿Está cargado en MongoDB?",
    },
    {
      field: "OpenDataSoft",
      headerName: "OpenDataSoft",
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description: "¿Está publicado en OpenDataSoft?",
    },
    {
      field: "temporarySolution",
      headerName: "Resolución temporal",
      width: 200,
      description: "Frecuencia de actualización del dato",
    },
    {
      field: "chargeStateComments",
      headerName: "Comentarios sobre el estado de carga",
      width: 200,
      description: "Comentarios relativos al estado de carga del dataset",
    },
    {
      field: "productData",
      headerName: "Producto de datos",
      width: 200,
      description: "Nombre del producto de datos",
    },
    {
      field: "productComments",
      headerName: "Comentarios del producto",
      width: 200,
      description: "Comentarios relativo al producto de datos",
    },
  ];

  function rowCouldBeSelectable(params: any) {
    return (
      (userData.role === ROLE.ADMIN &&
        params.row.responsibleIdentity.includes(userData.service)) ||
      userData.role === ROLE.SUPER_ADMIN
    );
  }

  async function refreshODS() {
    await refreshODSRequest(authHeader())
      .then((response) => response.json())
      .then(() => {
        getAndSetCatalogues();
      });
    classifyCatalogues(catalogues);
  }

  function classifyCatalogues(data: Catalogue[]) {
    let notDeletedNotVerifiedaux: Catalogue[] = [];
    let notDeletedVerifiedaux: Catalogue[] = [];
    let deletedNotVerifiedaux: Catalogue[] = [];
    let deletedVerifiedaux: Catalogue[] = [];
    data.forEach((d: Catalogue) => {
      if (d.deleted) {
        if (d.hasOwnProperty("verified") && d.verified === false) {
          deletedNotVerifiedaux.push(d);
        } else {
          deletedVerifiedaux.push(d);
        }
      } else {
        if (d.hasOwnProperty("verified") && d.verified === false) {
          notDeletedNotVerifiedaux.push(d);
        } else {
          notDeletedVerifiedaux.push(d);
        }
      }
    });
    setNotDeletedNotVerified(notDeletedNotVerifiedaux);
    setNotDeletedVerified(notDeletedVerifiedaux);
    setDeletedNotVerified(deletedNotVerifiedaux);
    setDeletedVerified(deletedVerifiedaux);
    showDeleted();
  }

  async function getAndSetCatalogues() {
    await getCataloguesRequest(authHeader())
      .then((response) => response.json())
      .then((data) => {
        setCatalogues(data);
      });
  }

  function getSelectedCatalogues() {
    selectedCatalogues.forEach((sc: any) => {
      getCatalogueRequest(authHeader(), sc)
        .then((response) => response.json())
        .then((data) => {
          setCatalogueSelected(data);
          setOpenUpdateDialog(true);
        });
    });
  }

  function showDeleted() {
    setRows(
      deletedTable
        ? verifiedTable
          ? deletedVerified
          : deletedNotVerified
        : verifiedTable
        ? notDeletedVerified
        : notDeletedNotVerified
    );
  }

  function deleteRegisters() {
    selectedCatalogues.forEach((sc: string) => {
      let cata = catalogues.find((v: any) => v._id === sc);
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

  function itCouldBeSelectable() {
    return userData.role === ROLE.ADMIN || userData.role === ROLE.SUPER_ADMIN;
  }

  function restoreRegisters() {
    selectedCatalogues.forEach((sc: string) => {
      let cata = deletedCatalogues.find((v: any) => v._id === sc);
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
    if (user() !== null) {
      const a = user() ? user().user : userMock;
      if (a) {
        setUserData(a);
      }
      getAndSetCatalogues();
    }
  }, []);

  useEffect(() => {
    classifyCatalogues(catalogues);
  }, [catalogues]);

  const getRowClassName = (params: any) => {
    if (params.row.verified === false) {
      return "no-verificado";
    }
  };

  function createDialogOpen() {
    setOpenDialog(true);
  }

  if (!catalogues.length)
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
            getRowClassName={getRowClassName}
            sx={{
              height: "100%",
              width: "100%",
              backgroundColor: actualTheme === "light" ? "white" : "#252525",
              color: actualTheme === "light" ? "#252525" : "white",
              "& .header-theme": {
                backgroundColor: "lightblue",
                border: "1px 1px 0px 0px solid black",
              },
              "& .MuiDataGrid-row:hover": {
                color:
                  actualTheme === "light"
                    ? paletaColores("colorTextAlter")
                    : paletaColores("colorBgRowSelectedBorder"),
                bgcolor:
                  actualTheme === "light"
                    ? paletaColores("colorRowHover")
                    : paletaColores("colorRowHoverDark"),
                border:
                  "1px solid " + paletaColores("colorBgRowSelectedBorder"),
              },
            }}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 25, page: 0 },
              },
              filter: {
                filterModel: {
                  items:
                    userData.service !== RESPONSIBLE_IDENTITY.GENERAL
                      ? [
                          {
                            field: "responsibleIdentity",
                            operator: "equals",
                            value: userData.service,
                          },
                        ]
                      : [],
                  quickFilterValues: [],
                },
              },
            }}
            components={{
              Toolbar: function CustomToolbarComponent() {
                return (
                  <CustomToolbar
                    userData={userData}
                    deletedTable={deletedTable}
                    verifiedTable={verifiedTable}
                    visibleData={gridApiRef}
                    selectedCatalogues={selectedCatalogues}
                    deleteRegisters={deleteRegisters}
                    showshowDeleted={() => {
                      setDeletedTable(!deletedTable);
                      showDeleted();
                    }}
                    isCatalogues={true}
                    showVerified={() => {
                      setverifiedTable(!verifiedTable);
                      showDeleted();
                    }}
                    refreshODS={refreshODS}
                    restoreRegisters={restoreRegisters}
                    createDialogOpen={createDialogOpen}
                    getSelectedCatalogues={getSelectedCatalogues}
                  ></CustomToolbar>
                );
              },
              Pagination: CustomPagination,
            }}
            getRowId={(row) => row._id}
            pageSizeOptions={[5, 10, 25]}
            isRowSelectable={(params) => rowCouldBeSelectable(params)}
            checkboxSelection={itCouldBeSelectable()}
            onRowSelectionModelChange={(catalogues) => {
              let aux = catalogues as string[];
              setSelectedCatalogues(aux);
            }}
            localeText={{
              toolbarColumns: t("dataTable.columns"),
              filterPanelColumns: t(
                "localtext.columnsTexts.filterPanelColumns"
              ),
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
              filterPanelOperator: t(
                "localtext.filterTexts.filterPanelOperator"
              ),
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
              filterOperatorAfter: t(
                "localtext.filterTexts.filterOperatorAfter"
              ),
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
      <CreateCatalogueDialog enviar={datosDialog}></CreateCatalogueDialog>
      <UpdateCatalogueDialog enviar={datosUpdateDialog}></UpdateCatalogueDialog>
    </>
  );
}

export default CatalogueList;
