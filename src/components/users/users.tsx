import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbarExport,
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
import { User } from "../../interfaces/user.interface";
import {
  getUserRequest,
  getUsersRequest,
  updateUserRequest,
} from "../../api/users";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import Chip from "@mui/material/Chip";
import { ReactComponent as Val } from "../../assets/val.svg";
import { ReactComponent as Esp } from "../../assets/esp.svg";
import { useTranslation } from "react-i18next";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import FolderIcon from "@mui/icons-material/Folder";
import Tooltip from "@mui/material/Tooltip";
import "./users.css";
import CreateUserDialog, { DialogData } from "./create-user.dialog";
import UpdateUserDialog, { UpdateDialogData } from "./update-user.dialog";
import { userMock } from "../../utils/user.mock";
import { ROLE } from "../../utils/enums/role.enum";

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
  return p === "YES" || undefined ? "success" : "error";
}
function valOrEsp(p: string | undefined) {
  return p === "VAL" || undefined ? <Val /> : <Esp />;
}

function UserList() {
  const authHeader = useAuthHeader();
  const user = useAuthUser();
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
    setUserData(user()?.user);
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
            {userData.role === ROLE.ADMIN ||
            userData.role === ROLE.SUPER_ADMIN ? (
              deletedTable === true ? (
                <Button
                  disabled={selectedUsers.length <= 0}
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
                    disabled={selectedUsers.length <= 0}
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
                    onClick={getSelectedUsers}
                  >
                    Editar
                  </Button>
                  <Button
                    disabled={selectedUsers.length <= 0}
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
              )
            ) : (
              <></>
            )}
        <GridToolbarQuickFilter
              sx={{
                height: 33,
                backgroundColor: "#D9D9D9",
                color: "#404040",
                borderColor: "#404040",
                borderRadius: 1,
              }}
            />
          </GridToolbarContainer>
        </ThemeProvider>
      </div>
    );
  }

  if (!users.length)
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
    </ThemeProvider>
  );
}

export default UserList;
