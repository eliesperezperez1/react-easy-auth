import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  useGridApiRef,
} from "@mui/x-data-grid";
import { Chip, ThemeProvider } from "@mui/material";
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
            "a":{
              color: actualTheme==="light" ? "darkblue" : "lightblue",
            }
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
            Toolbar: function CustomToolbarComponent() {
              return (
                <CustomToolbar
                  userData={userData}
                  deletedTable={deletedTable}
                  visibleData={gridApiRef}
                  selectedCatalogues={selectedEntities}
                  deleteRegisters={deleteRegisters}
                  showshowDeleted={() => {
                    setDeletedTable(!deletedTable);
                    showDeleted();
                  }}
                  createDialogOpen={() => {
                    setOpenDialog(true);
                  }}
                  getSelectedCatalogues={getSelectedEntities}
                ></CustomToolbar>
              );
            },
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
