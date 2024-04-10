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
import Chip from "@mui/material/Chip";
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
  yesOrNo,
  valOrEsp,
} from "../../utils/functions/table-functions";

function CatalogueList() {
  const authHeader = useAuthHeader();
  const user = useAuthUser();
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const [deletedCatalogues, setDeletedCatalogues] = useState<Catalogue[]>([]);
  const [selectedCatalogues, setSelectedCatalogues] = useState<string[]>([]);
  const [rows, setRows] = useState<Catalogue[]>([]);
  const [deletedTable, setDeletedTable] = useState<boolean>(false);
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
      field: "topic",
      headerName: t("columnsNames.topic"),
      width: 200,
      description: t("tooltipText.topic"),
    },
    {
      field: "responsibleIdentity",
      headerName: t("columnsNames.responsibleIdentity"),
      width: 200,
      description: t("tooltipText.responsibleIdentity"),
    },
    {
      field: "datasetsRelation",
      headerName: t("columnsNames.datasetsRelation"),
      width: 200,
      description: t("tooltipText.datasetsRelation"),
    },
    {
      field: "fieldList",
      headerName: t("columnsNames.fieldList"),
      width: 200,
      description: t("tooltipText.fieldList"),
    },
    {
      field: "dataUnbundling",
      headerName: t("columnsNames.dataUnbundling"),
      width: 200,
      description: t("tooltipText.dataUnbundling"),
    },
    {
      field: "updateFrequency",
      headerName: t("columnsNames.updateFrequency"),
      width: 200,
      description: t("tooltipText.updateFrequency"),
    },
    {
      field: "format",
      headerName: t("columnsNames.format"),
      width: 200,
      description: t("tooltipText.format"),
    },
    {
      field: "dataOrigin",
      headerName: t("columnsNames.dataOrigin"),
      width: 200,
      description: t("tooltipText.dataOrigin"),
    },
    {
      field: "dataOriginURL",
      headerName: t("columnsNames.dataOriginURL"),
      width: 200,
      description: t("tooltipText.dataOriginURL"),
    },
    {
      field: "connection",
      headerName: t("columnsNames.connection"),
      width: 200,
      description: t("tooltipText.connection"),
    },
    {
      field: "dataFiability",
      headerName: t("columnsNames.dataFiability"),
      width: 200,
      description: t("tooltipText.dataFiability"),
    },
    {
      field: "comments",
      headerName: t("columnsNames.comments"),
      width: 200,
      description: t("tooltipText.comments"),
    },
    {
      field: "temporaryCoverage",
      headerName: t("columnsNames.temporaryCoverage"),
      width: 200,
      description: t("tooltipText.temporaryCoverage"),
    },
    {
      field: "repositoryStorage",
      headerName: t("columnsNames.repositoryStorage"),
      width: 200,
      description: t("tooltipText.repositoryStorage"),
    },
    {
      field: "repositoryStorageURL",
      headerName: t("columnsNames.repositoryStorageURL"),
      width: 200,
      description: t("tooltipText.repositoryStorageURL"),
    },
    {
      field: "fieldSuppression",
      headerName: t("columnsNames.fieldSuppression"),
      width: 200,
      description: t("tooltipText.fieldSuppression"),
    },
    {
      field: "accessType",
      headerName: t("columnsNames.accessType"),
      width: 200,
      description: t("tooltipText.accessType"),
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
      description: t("tooltipText.activeAds"),
    },
    {
      field: "posts",
      headerName: t("columnsNames.posts"),
      width: 200,
      description: t("tooltipText.posts"),
    },
    {
      field: "licence",
      headerName: t("columnsNames.licence"),
      width: 200,
      description: t("tooltipText.licence"),
    },
    {
      field: "RAT",
      headerName: t("columnsNames.RAT"),
      width: 200,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <>
          <Chip label={params.value} color={yesOrNo(params.value)} />
        </>
      ),
      description: t("tooltipText.RAT"),
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
      description: t("tooltipText.georreference"),
    },
    {
      field: "language",
      headerName: t("columnsNames.language"),
      width: 70,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <>{valOrEsp(params.value)}</>
      ),
      description: t("tooltipText.language"),
    },
    {
      field: "source",
      headerName: t("columnsNames.source"),
      width: 200,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <a href={params.value}>{params.value}</a>
      ),
      description: t("tooltipText.source"),
    },
    {
      field: "lastUpdate",
      headerName: t("columnsNames.lastUpdate"),
      type: "dateTime",
      width: 200,
      valueGetter: ({ value }) => value && new Date(value),
      description: t("tooltipText.lastUpdate"),
    },
  ];

  function rowCouldBeSelectable(params: any) {
    return (
      (userData.role === ROLE.ADMIN &&
        params.row.responsibleIdentity.includes(userData.service)) ||
      userData.role === ROLE.SUPER_ADMIN
    );
  }

  function getAndSetCatalogues() {
    getCataloguesRequest(authHeader())
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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

  function itCouldBeSelectable() {
    return userData.role === ROLE.ADMIN || userData.role === ROLE.SUPER_ADMIN;
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
    if (user() !== null) {
      const a = user() ? user().user : userMock;
      if (a) {
        setUserData(a);
      }
      getAndSetCatalogues();
    }
  }, []);

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
        <DataGrid
          apiRef={gridApiRef}
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
              paginationModel: { pageSize: 25, page: 0 },
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
                  selectedCatalogues={selectedCatalogues}
                  deleteRegisters={deleteRegisters}
                  showshowDeleted={() => {
                    setDeletedTable(!deletedTable);
                    showDeleted();
                  }}
                  createDialogOpen={createDialogOpen}
                  getSelectedCatalogues={getSelectedCatalogues}
                ></CustomToolbar>
              );
            },
            Pagination: CustomPagination,
          }}
          getRowId={(row) => row._id}
          pageSizeOptions={[5, 10]}
          isRowSelectable={(params) => rowCouldBeSelectable(params)}
          checkboxSelection={itCouldBeSelectable()}
          onRowSelectionModelChange={(catalogues) => {
            let aux = catalogues as string[];
            setSelectedCatalogues(aux);
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
      </div>
      <CreateCatalogueDialog enviar={datosDialog}></CreateCatalogueDialog>
      <UpdateCatalogueDialog enviar={datosUpdateDialog}></UpdateCatalogueDialog>
    </>
  );
}

export default CatalogueList;
