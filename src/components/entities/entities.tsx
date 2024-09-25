import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  useGridApiRef,
} from "@mui/x-data-grid";
import { Chip, ThemeProvider } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { Entity } from "../../interfaces/entity.interface";
import { updateCatalogueRequest } from "../../api/catalogues";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { useTranslation } from "react-i18next";
import "./entities.css";
import { entityMock } from "../../utils/entity.mock";
import { getEntitiesRequest, getEntityRequest, updateEntityRequest, deletePermamentEntityRequest, } from "../../api/entities";
import { User } from "../../interfaces/user.interface";
import UpdateEntityDialog, { UpdateDialogData } from "./update-entity.dialog";
import { userMock } from "../../utils/user.mock";
import CreateEntityDialog, { DialogData } from "./create-entity.dialog";
import { ROLE } from "../../utils/enums/role.enum";
import { LANGUAGE } from "../../utils/enums/language.enum";
import { RESPONSIBLE_IDENTITY } from "../../utils/enums/responsible-identity.enum";
import CustomPagination from "../custom-pagination/custom-pagination";
import {
  getLocationUrl,
  getTopicColor,
  paletaColores,
} from "../../utils/functions/table-functions";
import CustomToolbar from "../custom-toolbar/custom-toolbar";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import baseTheme from "../darkModeSwitch/darkmodeTheme";
import { THEMEAPP } from "../../utils/enums/themeApp.enum";
import { LANGUAGE_FORM } from "../../utils/enums/language-form.enum";

/**
 * Renders a list of entities with a DataGrid component that displays the entities' contact person, location, topic, responsible identity, phone number, and email. 
 * Allows the user to filter and select entities, as well as view deleted entities and restore them. 
 * Also allows the user to create and update entities.
 *
 * @return {JSX.Element} The rendered component
 */
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
  const [userData, setUserData] = useState<User>(userMock);
  const gridApiRef = useGridApiRef();
  const {actualTheme} = useAlternateTheme();
  const prevOpenDialogRef = useRef(openDialog);
  const prevOpenUpdateDialogRef = useRef(openUpdateDialog);


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
          color: actualTheme===THEMEAPP.light ? "darkblue" : "lightblue", // Set your desired color here
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
        userData.language === LANGUAGE_FORM.esES
          ? "responsibleIdentity"
          : "responsibleIdentity",
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
          color: actualTheme===THEMEAPP.light ? "darkblue" : "lightblue", // Set your desired color here
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
          color: actualTheme===THEMEAPP.light ? "darkblue" : "lightblue", // Set your desired color here
          // Add any other styling properties you need
        }}
        >
          {params.value}
        </a>
      ),
      description: t("tooltipText.emailService"),
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
        params.row.responsibleIdentity === userData.service) ||
      userData.role === ROLE.SUPER_ADMIN
    );
  }
/**
 * Asynchronously fetches entities from the server using the auth header and updates the entities array
 * with the received data.
 *
 * @return {Promise<void>} A Promise that resolves when the entities are fetched and the state is updated.
 */
  function getAndSetEntities() {
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
/**
 * Retrieves the selected entities by making a request to the server for each entity ID 
 * in the `selectedEntities` array.
 * Updates the state with the received data and opens the update dialog.
 *
 * @return {void} This function does not return anything.
 */
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
  /**
   * Toggles the display of deleted entities in the table by setting the rows array to 
   * either the `deletedVerified` or `deletedNotVerified` array 0depending on the value 
   * of the `verifiedTable` state.
   *
   * @return {void} This function does not return anything.
   */
  function showDeleted() {
    if (!deletedTable) {
      setRows(deletedEntities);
    } else {
      setRows(entities);
    }
  }
/**
 * Determines if something could be selected based on the current user role which can be either admin or super admin.
 *
 * @return {boolean} Returns true if the user has the role of admin or super admin, otherwise false.
 */
  function itCouldBeSelectable() {
    const rolUsuario = userData.role;
    const servicioUsuario = userData.service;
    return userData.role === ROLE.ADMIN || userData.role === ROLE.SUPER_ADMIN;
  }

/**
 * Deletes the selected entities and updates the state with the new entity data. Then,
 * calls `getAndSetEntities` to fetch the updated entities, also it classifies the new 
 * entities and calls `showDeleted` or `showNotDeleted` depending on the value of the
 * `deletedTable` state.
 *
 * @return {void} This function does not return anything.
 */
  function deleteRegisters() {
    selectedEntities.forEach((sc: string) => {
      let cata = entities.find((v) => v._id === sc);
      if (cata) {
        updateEntityRequest(
          cata._id,
          { ...cata, deleted: true},
          authHeader()
        ).then(() => {
          window.location.reload();
        });
      }
    });
    getAndSetEntities();
  }

/**
 * Restores the selected entities by updating their deleted status to false and 
 * fetching the updated entities. Then, it updates the entities array calling `getAndSeEntities`.
 *
 * @return {void} This function does not return anything.
 */
  function restoreRegisters() {
    selectedEntities.forEach((sc: string) => {
      let cata = deletedEntities.find((v) => v._id === sc);
      if (cata) {
        updateEntityRequest(
          cata._id,
          { ...cata, deleted: false },
          authHeader()
        ).then(() => {
          window.location.reload();
        });
      }
    });
    getAndSetEntities();
  }

/**
 * Deletes the selected entities permanently from the server by calling
 * `deletePermamentEntityRequest` for each entity ID in the `selectedEntities`
 * array. Then, it reloads the page and fetches the updated entities by calling
 * `getAndSetEntities`.
 *
 * @return {void} This function does not return anything.
 */
  function deletePermamentEntity() {
    selectedEntities.forEach((sc: string) => {
      let cata = deletedEntities.find((v) => v._id === sc);
      if (cata) {
        deletePermamentEntityRequest(
          cata._id,
          authHeader()
        ).then(() => {
          window.location.reload();
        });
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

  useEffect(() => {
    if ((!openDialog && prevOpenDialogRef.current) || (!openUpdateDialog && prevOpenUpdateDialogRef.current)) {
      window.location.reload();
    }
    prevOpenDialogRef.current = openDialog;
    prevOpenUpdateDialogRef.current = openUpdateDialog;
  }, [openDialog, openUpdateDialog]);

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
            height: "100%",
            width: "100%",
            backgroundColor: actualTheme===THEMEAPP.light ? "white" : "#252525",
            color: actualTheme===THEMEAPP.light ? "#252525" : "white",
            "& .header-theme": {
              backgroundColor: "lightblue",
              border: "1px 1px 0px 0px solid black",
            },
            "& .MuiDataGrid-row":{
              border: "none",
              margin: "none",
            },
            "& .MuiDataGrid-row:hover": {
              color: actualTheme===THEMEAPP.light ? paletaColores("colorTextAlter") : paletaColores("colorBgRowSelectedBorder"),
              bgcolor: actualTheme===THEMEAPP.light ? paletaColores("colorRowHover") : paletaColores("colorRowHoverDark"),
              border: "1px solid " + paletaColores("colorBgRowSelectedBorder"),
            },
            "a":{
              color: actualTheme===THEMEAPP.light ? "darkblue" : "lightblue",
            }
          }}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 20, page: 0 },
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
            Toolbar: function CustomToolbarComponent() {
              return (
                <CustomToolbar
                  userData={userData}
                  deletedTable={deletedTable}
                  visibleData={gridApiRef}
                  selectedCatalogues={selectedEntities}
                  deleteRegisters={deleteRegisters}
                  isCatalogues={false}
                  isEntities={true}
                  showshowDeleted={() => {
                    setDeletedTable(!deletedTable);
                    showDeleted();
                  }}
                  createDialogOpen={() => {
                    setOpenDialog(true);
                  }}
                  getSelectedCatalogues={getSelectedEntities}
                  restoreRegisters={restoreRegisters}
                  deletePermanentRegisters={deletePermamentEntity}
                ></CustomToolbar>
              );
            },
            Pagination: CustomPagination,
          }}
          getRowId={(row) => row._id}
          pageSizeOptions={[5, 10, 20]}
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
