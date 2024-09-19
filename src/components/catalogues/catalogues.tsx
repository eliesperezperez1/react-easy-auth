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
  isCheckedNoApply,
} from "../../utils/functions/table-functions";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import baseTheme from "../darkModeSwitch/darkmodeTheme";
import {
  Backdrop,
  CircularProgress,
  IconButton,
  Rating,
  Snackbar,
  ThemeProvider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { refreshODSRequest } from "../../api/ods";
import { ORGANISM } from "../../utils/enums/organism.enum";
import { MINIMUM_VALUE } from "../../utils/enums/minimum-value.enum";
import { TOPIC } from "../../utils/enums/topic.enum";
import { THEMEAPP } from "../../utils/enums/themeApp.enum";

/**
 * Renders a CatalogueList component that displays a table of catalogues.
 * The component fetches catalogues from the server and displays them in a DataGrid component.
 * It also provides functionality to delete, restore, and update catalogues.
 * The component uses various hooks and custom components to manage state and render the table.
 *
 * @return {JSX.Element} The rendered CatalogueList component.
 */
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
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
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
      type: "string",
    },
    {
      field: "description",
      headerName: t("columnsNames.description"),
      width: 200,
      description: t("tooltipText.description"),
      type: "string",
    },
    {
      field: "responsibleIdentity",
      headerName: t("columnsNames.responsibleIdentity"),
      width: 200,
      description: t("tooltipText.responsibleIdentity"),
    },
    {
      field: "organism",
      headerName: t("columnsNames.organism"),
      width: 200,
      description: t("tooltipText.organism"),
      type: "singleSelect",
      valueOptions: Object.entries(ORGANISM).map(([key, value]) => {
        return value;
      }),
    },
    {
      field: "topic",
      headerName: t("columnsNames.topic"),
      width: 200,
      type: "singleSelect",
      valueOptions: Object.entries(TOPIC).map(([key, value]) => {
        return value;
      }),
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
      headerName: t("columnsNames.keyWords"),
      width: 200,
      description: t("tooltipText.keyWords"),
      renderCell: (params: GridRenderCellParams<any, string[]>) => {
        return arrayCell(params.value);
      },
    },
    {
      field: "minimumVariables",
      headerName: t("columnsNames.minimumVariables"),
      width: 200,
      description: t("tooltipText.minimumVariables"),
      type: "singleSelect",
      valueOptions: Object.entries(MINIMUM_VALUE).map(([key, value]) => {
        return value;
      }),
    },
    {
      field: "contactPerson",
      headerName: t("columnsNames.contactPerson"),
      width: 200,
      description: t("tooltipText.contactPersonService"),
    },
    {
      field: "masterData",
      headerName: t("columnsNames.masterData"),
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description: t("tooltipText.masterData"),
      type: "boolean",
    },
    {
      field: "referenceData",
      headerName: t("columnsNames.referenceData"),
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description:
      t("tooltipText.referenceData"),
    },
    {
      field: "highValue",
      headerName: t("columnsNames.highValue"),
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description: t("tooltipText.highValue"),
    },
    {
      field: "activeAds",
      headerName: t("columnsNames.activeAds"),
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description: t("tooltipText.activeAds"),
      type: "boolean",
    },
    {
      field: "comments",
      headerName: t("columnsNames.comments"),
      width: 200,
      description: t("tooltipText.comments"),
    },

    {
      field: "typeGeo",
      headerName: t("columnsNames.typeGeo"),
      width: 200,
      description: t("tooltipText.typeGeo"),
    },
    {
      field: "temporaryCoverage",
      headerName: t("columnsNames.temporaryCoverage"),
      width: 200,
      description: t("tooltipText.temporaryCoverage"),
    },
    {
      field: "format",
      headerName: t("columnsNames.format"),
      width: 200,
      description: t("tooltipText.format"),
      renderCell: (params: GridRenderCellParams<any, string[]>) => {
        return arrayCell(params.value);
      },
    },
    {
      field: "genderInfo",
      headerName: t("columnsNames.genderInfo"),
      width: 200,
      renderCell: (params) => {
        return isCheckedNoApply(params.value);
      },
      description: t("tooltipText.genderInfo"),
    },
    {
      field: "structuredComments",
      headerName: t("columnsNames.structuredComments"),
      width: 200,
      description: t("tooltipText.structuredComments"),
    },
    {
      field: "associatedApplication",
      headerName: t("columnsNames.associatedApplication"),
      width: 200,
      description: t("tooltipText.associatedApplication"),
    },
    {
      field: "autoAcess",
      headerName: t("columnsNames.autoAcess"),
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description: t("tooltipText.autoAcess"),
      type: "boolean",
    },
    {
      field: "originComments",
      headerName: t("columnsNames.originComments"),
      width: 200,
      description: t("tooltipText.originComments"),
    },
    {
      field: "RAT",
      headerName: t("columnsNames.RAT"),
      width: 200,
      renderCell: (params) => {
        return isCheckedNoApply(params.value);
      },
      description: t("tooltipText.RAT"),
      type: "boolean",
    },
    {
      field: "dataProtection",
      headerName: t("columnsNames.dataProtection"),
      width: 200,
      renderCell: (params) => {
        return isCheckedNoApply(params.value);
      },
      description: t("tooltipText.dataProtection"),
      type: "boolean",
    },
    {
      field: "dataStandards",
      headerName: t("columnsNames.dataStandards"),
      width: 200,
      renderCell: (params) => {
        return isCheckedNoApply(params.value);
      },
      description: t("tooltipText.dataStandards"),
      type: "boolean",
    },
    {
      field: "dataProtectionComments",
      headerName: t("columnsNames.dataProtectionComments"),
      width: 200,
      description: t("tooltipText.dataProtectionComments"),
    },
    {
      field: "dataAnonymize",
      headerName: t("columnsNames.dataAnonymize"),
      width: 200,
      renderCell: (params: GridRenderCellParams<any, string[]>) => {
        return arrayCell(params.value);
      },
      description: t("tooltipText.dataAnonymize"),
    },
    {
      field: "dataQuality",
      headerName: t("columnsNames.dataQuality"),
      width: 200,
      renderCell: (params) => {
        return <Rating name="read-only" value={params.value} readOnly />;
      },
      description: t("tooltipText.dataQuality"),
      type: "number",
    },
    {
      field: "sharingLevel",
      headerName: t("columnsNames.sharingLevel"),
      width: 200,
      description: t("tooltipText.sharingLevel"),
    },
    {
      field: "sharedData",
      headerName: t("columnsNames.sharedData"),
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description: t("tooltipText.sharedData"),
      type: "boolean",
    },
    {
      field: "VLCi",
      headerName: "VLCi",
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description: t("tooltipText.VLCi"),
      type: "boolean",
    },
    {
      field: "ArcGIS",
      headerName: "ArcGIS",
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description: t("tooltipText.ArcGIS"),
      type: "boolean",
    },
    {
      field: "Pentaho",
      headerName: "Pentaho",
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description: t("tooltipText.Pentaho"),
      type: "boolean",
    },
    {
      field: "CKAN",
      headerName: "CKAN",
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description: t("tooltipText.CKAN"),
      type: "boolean",
    },
    {
      field: "MongoDB",
      headerName: "MongoDB",
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description: t("tooltipText.MongoDB"),
      type: "boolean",
    },
    {
      field: "OpenDataSoft",
      headerName: "OpenDataSoft",
      width: 200,
      renderCell: (params) => {
        return isChecked(params.value);
      },
      description: t("tooltipText.OpenDataSoft"),
      type: "boolean",
    },
    {
      field: "temporarySolution",
      headerName: t("columnsNames.temporarySolution"),
      width: 200,
      description: "Frecuencia de actualización del dato",
      type: "string",
    },
    {
      field: "chargeStateComments",
      headerName: t("columnsNames.chargeStateComments"),
      width: 200,
      description: t("tooltipText.chargeStateComments"),
    },
    {
      field: "productData",
      headerName: t("columnsNames.productData"),
      width: 200,
      description: t("tooltipText.productData"),
    },
    {
      field: "productComments",
      headerName: t("columnsNames.productComments"),
      width: 200,
      description: t("tooltipText.productComments"),
    },
  ];

/**
 * Determines if a row could be selectable based on the user's role and the row's responsible identity.
 *
 * @param {any} params - The parameters passed to the function.
 * @return {boolean} Returns true if the row could be selectable, otherwise false.
 */
  function rowCouldBeSelectable(params: any) {
    return (
      (userData.role === ROLE.ADMIN &&
        params.row.responsibleIdentity.includes(userData.service)) ||
      userData.role === ROLE.SUPER_ADMIN
    );
  }

/**
 * Gets the new catalogues from OpenDataSoft and updates the catalogues.
 *
 * @return {Promise<void>} A promise that resolves when the refresh is complete and the catalogues are updated.
 */
  async function refreshODS() {
    await refreshODSRequest(authHeader())
      .then((response) => response.json())
      .then(() => {
        getAndSetCatalogues();
      });
    setOpenSnackBar(true);
    classifyCatalogues(catalogues);
  }

  useEffect(() => {
    if (deletedTable) {
      showDeleted();
    } else {
      showNotDeleted();
    }
  }, [deletedTable, verifiedTable, showDeleted, showNotDeleted]);

/**
 * Classifies the catalogues based on their deleted and verified status.
 *
 * @param {Catalogue[]} data - The array of catalogues to be classified.
 * @return {void} This function does not return anything.
 */
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
    showNotDeleted();
  }

/**
 * Asynchronously fetches catalogues from the server using the auth header and updates the catalogue's array
 * with the received data.
 *
 * @return {Promise<void>} A Promise that resolves when the catalogues are fetched and the state is updated.
 */
  async function getAndSetCatalogues() {
    await getCataloguesRequest(authHeader())
      .then((response) => response.json())
      .then((data) => {
        setCatalogues(data);
        classifyCatalogues(data);
      });
  }

/**
 * Retrieves the selected catalogues by making a request to the server for each catalogue ID in the `selectedCatalogues` array.
 * Updates the state with the received data and opens the update dialog.
 *
 * @return {void} This function does not return anything.
 */
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

/**
 * Sets the rows array to either the `deletedVerified` or `deletedNotVerified` array
 * depending on the value of the `verifiedTable` state.
 *
 * @return {void} This function does not return anything.
 */
  function showDeleted() {
    setRows(verifiedTable ? deletedVerified : deletedNotVerified);
  }

/**
 * Sets the rows array to either the `notDeletedVerified` or `notDeletedNotVerified` array
 * depending on the value of the `verifiedTable` state.
 *
 * @return {void} This function does not return anything.
 */
  function showNotDeleted() {
    setRows(verifiedTable ? notDeletedVerified : notDeletedNotVerified);
  }

/**
 * Deletes the selected catalogues and updates the state with the new catalogue data. Then,
 * calls `getAndSetCatalogues` to fetch the updated catalogues, also it classifies the new 
 * catalogues and calls `showDeleted` or `showNotDeleted` depending on the value of the
 * `deletedTable` state.
 *
 * @return {void} This function does not return anything.
 */
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
      classifyCatalogues(catalogues);
      if (deletedTable) {
        showDeleted();
      } else {
        showNotDeleted();
      }
    }

/**
 * Determines if something could be selected based on the current user role which can be either admin or super admin.
 *
 * @return {boolean} Returns true if the user has the role of admin or super admin, otherwise false.
 */
  function itCouldBeSelectable() {
    return userData.role === ROLE.ADMIN || userData.role === ROLE.SUPER_ADMIN;
  }

/**
 * Restores the selected catalogues by updating their deleted status to false and 
 * fetching the updated catalogues. Then, it updates the catalogues array calling `getAndSetCatalogues`.
 *
 * @return {void} This function does not return anything.
 */
  function restoreRegisters() {
    selectedCatalogues.forEach((sc: string) => {
      let cata;
      if(verifiedTable){
        cata = deletedVerified.find((v: any) => v._id === sc);
      } else {
        cata = deletedNotVerified.find((v: any) => v._id === sc);
      }
      if (cata) {
        console.log("Encontrado");
        updateCatalogueRequest(
          cata._id,
          { ...cata, deleted: false },
          authHeader()
        );
      }
    });
    getAndSetCatalogues();
    classifyCatalogues(catalogues);
    if (deletedTable) {
      showDeleted();
    } else {
      showNotDeleted();
    }
  }

  useEffect(() => {
    if (user() !== null) {
      const a = user() ? user().user : userMock;
      if (a) {
        setUserData(a);
      }
      getAndSetCatalogues();
    }
  }, [user()]);

  useEffect(() => {
    classifyCatalogues(catalogues);
  }, [catalogues]);

/**
 * Returns the CSS class name for a row in the table, based on the value of the 'verified' field in the row data.
 *
 * @param {any} params - The parameters passed to the function.
 * @return {string} The CSS class name for the row.
 */
  const getRowClassName = (params: any) => {
    if (params.row.verified === false) {
      return "no-verificado";
    }
  };

  /**
   * Opens the dialog by setting the `openDialog` state to `true`.
   *
   * @return {void} This function does not return anything.
   */
  function createDialogOpen() {
    setOpenDialog(true);
  }

  if (!catalogues.length) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

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
              backgroundColor: actualTheme === THEMEAPP.light ? "white" : "#252525",
              color: actualTheme === THEMEAPP.light ? "#252525" : "white",
              "& .header-theme": {
                backgroundColor: "lightblue",
                border: "1px 1px 0px 0px solid black",
              },
              "& .MuiDataGrid-row:hover": {
                color:
                  actualTheme === THEMEAPP.light
                    ? paletaColores("colorTextAlter")
                    : paletaColores("colorBgRowSelectedBorder"),
                bgcolor:
                  actualTheme === THEMEAPP.light
                    ? paletaColores("colorRowHover")
                    : paletaColores("colorRowHoverDark"),
                border:
                  "1px solid " + paletaColores("colorBgRowSelectedBorder"),
              },
            }}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
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
                    isCatalogues={true}
                    isEntities={false}
                    deleteRegisters={deleteRegisters}
                    showshowDeleted={() => {
                      setDeletedTable(!deletedTable);
                      if (!deletedTable) {
                        showDeleted();
                      } else {
                        showNotDeleted();
                      }
                    }}
                    showVerified={() => {
                      setverifiedTable(!verifiedTable);
                      if (deletedTable) {
                        showDeleted();
                      } else {
                        showNotDeleted();
                      }
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
              columnMenuSortAsc: t("localtext.columnMenu.columnMenuSortAsc"),
              columnMenuSortDesc: t("localtext.columnMenu.columnMenuSortDesc"),
              columnMenuFilter: t("localtext.columnMenu.columnMenuFilter"),
              columnMenuHideColumn: t("localtext.columnMenu.columnMenuHideColumn"),
              columnMenuManageColumns: t("localtext.columnMenu.columnMenuManageColumns"),
              columnHeaderSortIconLabel: t("localtext.columnMenu.columnHeaderSortIconLabel"),
            }}
          />
        </ThemeProvider>
      </div>
      <CreateCatalogueDialog enviar={datosDialog}></CreateCatalogueDialog>
      <UpdateCatalogueDialog enviar={datosUpdateDialog}></UpdateCatalogueDialog>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={() => {
          setOpenSnackBar(false);
        }}
        message="Note archived"
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setOpenSnackBar(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </>
  );
}

export default CatalogueList;
