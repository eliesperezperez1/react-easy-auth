import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  useGridApiRef,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { User } from "../../interfaces/user.interface";
import {
  getUserRequest,
  getUsersRequest,
  updateUserRequest,
} from "../../api/users";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import Chip from "@mui/material/Chip";
import { useTranslation } from "react-i18next";
import "./users.css";
import CreateUserDialog, { DialogData } from "./create-user.dialog";
import UpdateUserDialog, { UpdateDialogData } from "./update-user.dialog";
import { userMock } from "../../utils/user.mock";
import { ROLE } from "../../utils/enums/role.enum";
import CustomToolbar from "../custom-toolbar/custom-toolbar";
import CustomPagination from "../custom-pagination/custom-pagination";
import {
  paletaColores,
  yesOrNo,
  valOrEsp,
} from "../../utils/functions/table-functions";

function UserList() {
  const authHeader = useAuthHeader();
  const user = useAuthUser();
  const gridApiRef = useGridApiRef();
  const [users, setUsers] = useState<User[]>([]);
  const [deletedUsers, setDeletedUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [rows, setRows] = useState<User[]>([]);
  const [deletedTable, setDeletedTable] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const [userSelected, setUserSelected] = useState<User>(userMock);
  const [userData, setUserData] = useState<User>(userMock);
  const datosDialog: DialogData = {
    open: openDialog,
    closeDialog: (close: boolean) => setOpenDialog(close),
    getInfo: () => getAndSetUsers(),
  };

  const [t, i18n] = useTranslation();
  const datosUpdateDialog: UpdateDialogData = {
    open: openUpdateDialog,
    closeDialog: (close: boolean) => setOpenUpdateDialog(close),
    getInfo: () => getAndSetUsers(),
    user: userSelected,
  };
  
  const columns: GridColDef[] = [
    { field: "name", headerName: t("columnsNames.name"), width: 200 },
    {
      field: "surname",
      headerName: t("columnsNames.surname"),
      width: 200,
    },
    { field: "email", headerName: t("login.email"), width: 200 },
    {
      field: "username",
      headerName: t("columnsNames.username"),
      width: 200,
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
      field: "role",
      headerName: t("columnsNames.role"),
      width: 200,
    },
    {
      field: "service",
      headerName: t("columnsNames.responsibleIdentity"),
      width: 200,
    },
    {
      field: "deleted",
      headerName: t("columnsNames.deleted"),
      width: 200,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <>
          <Chip label={params.value} color={yesOrNo(params.value)} />
        </>
      ),
    },
  ];

  function getAndSetUsers() {
    getUsersRequest(authHeader())
      .then((response) => response.json())
      .then((data) => {
        let notDeleted = data.filter((d: User) => d.deleted !== true);
        let deleted = data.filter((d: User) => d.deleted === true);
        setUsers(notDeleted);
        setDeletedUsers(deleted);
        if (deletedTable) {
          setRows(deleted);
        } else {
          setRows(notDeleted);
        }
      });
  }
  function getSelectedUsers() {
    selectedUsers.forEach((sc) => {
      getUserRequest(authHeader(), sc)
        .then((response) => response.json())
        .then((data) => {
          setUserSelected(data);
          setOpenUpdateDialog(true);
        });
    });
  }

  function showDeleted() {
    if (!deletedTable) {
      setRows(deletedUsers);
    } else {
      setRows(users);
    }
  }

  function deleteRegisters() {
    selectedUsers.forEach((sc: string) => {
      let cata = users.find((v) => v._id === sc);
      if (cata) {
        updateUserRequest(cata._id, { ...cata, deleted: true }, authHeader());
      }
    });
    getAndSetUsers();
  }

  function restoreRegisters() {
    selectedUsers.forEach((sc: string) => {
      let cata = deletedUsers.find((v) => v._id === sc);
      if (cata) {
        updateUserRequest(cata._id, { ...cata, deleted: false }, authHeader());
      }
    });
    getAndSetUsers();
  }

  useEffect(() => {
    setUserData(user().user);
    getAndSetUsers();
  }, []);

  function itCouldBeSelectable() {
    return userData.role === ROLE.ADMIN || userData.role === ROLE.SUPER_ADMIN;
  }
  function rowCouldBeSelectable(params: any) {
    return (
      (userData.role === ROLE.ADMIN &&
        params.row.responsibleIdentity === userData.service) ||
      userData.role === ROLE.SUPER_ADMIN
    );
  }

  if (!users.length)
    return (
      <span className="text-center text-xl font-bold my-4">
        {t("dataTable.noCatalogues")}
      </span>
    );

  return (
    <>
      <div>
        <DataGrid
          rows={rows}
          columns={columns}
          apiRef={gridApiRef}
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
            Toolbar: function CustomToolbarComponent() {
              return (
                <CustomToolbar
                  userData={userData}
                  deletedTable={deletedTable}
                  visibleData={gridApiRef}
                  selectedCatalogues={selectedUsers}
                  deleteRegisters={deleteRegisters}
                  showshowDeleted={() => {
                    setDeletedTable(!deletedTable);
                    showDeleted();
                  }}
                  createDialogOpen={() => {
                    setOpenDialog(true);
                  }}
                  getSelectedCatalogues={getSelectedUsers}
                ></CustomToolbar>
              );
            },
            Pagination: CustomPagination,
          }}
          getRowId={(row) => row._id}
          pageSizeOptions={[5, 10]}
          checkboxSelection={itCouldBeSelectable()}
          isRowSelectable={(params) => rowCouldBeSelectable(params)}
          onRowSelectionModelChange={(users) => {
            let aux = users as string[];
            setSelectedUsers(aux);
          }}
          localeText={{
            toolbarColumns: t("dataTable.columns"),
            toolbarFilters: t("dataTable.filters"),
            toolbarDensity: t("dataTable.density"),
            toolbarQuickFilterPlaceholder: t("dataTable.quickFilter"),
          }}
        />
      </div>
      <CreateUserDialog enviar={datosDialog}></CreateUserDialog>
      <UpdateUserDialog enviar={datosUpdateDialog}></UpdateUserDialog>
    </>
  );
}

export default UserList;
