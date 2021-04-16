import { copyUser, deleteUser } from "store/Users/actions";
import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { useTable, useSortBy, usePagination } from "react-table";
import { useState } from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faCopy,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Tooltip } from "@material-ui/core";
import { IUser } from "models/IUser";

import "./UsersTable.scss";

interface IUsersTableProps {
  setUserDeleted: (state: boolean) => void;
}

export const UsersTable: React.FC<IUsersTableProps> = ({
  setUserDeleted,
}): JSX.Element => {
  const dispatch = useDispatch();

  const appTheme: string = useSelector(
    (state: RootStateOrAny) => state.app.appTheme
  );

  const tbodyClass = appTheme === "dark" ? "tbody-dark" : "";
  const usersTableClass =
    appTheme === "dark" ? "users-table users-table-dark" : "users-table";
  const paginationClass =
    appTheme === "dark" ? "pagination pagination-dark" : "pagination";

  const override = css`
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-color: black;
  `;

  const [onDelete, setOnDelete] = useState<boolean>(false);
  const [onCopy, setOnCopy] = useState<boolean>(false);
  const [deleteUserId, setDeleteUserId] = useState<string>("");
  const [copyUserId, setCopyUserId] = useState<string>("");

  const isTableLoading = useSelector(
    (state: RootStateOrAny) => state.users.isLoading
  );

  const copyClickOpen = (): void => {
    setOnCopy(true);
  };

  const copyClickClose = (): void => {
    setOnCopy(false);
  };

  const handleClickOpen = (): void => {
    setOnDelete(true);
  };

  const handleClose = (): void => {
    setOnDelete(false);
  };

  const angleRigthIcon: JSX.Element = <FontAwesomeIcon icon={faAngleRight} />;
  const angleLeftIcon: JSX.Element = <FontAwesomeIcon icon={faAngleLeft} />;
  const angleDoubleRigthIcon: JSX.Element = (
    <FontAwesomeIcon icon={faAngleDoubleRight} />
  );
  const angleDoubleLeftIcon: JSX.Element = (
    <FontAwesomeIcon icon={faAngleDoubleLeft} />
  );

  const deleteUserHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    handleClickOpen();
    setDeleteUserId(event.currentTarget.getAttribute("id"));
  };

  const copyUserHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    copyClickOpen();
    setCopyUserId(event.currentTarget.getAttribute("id"));
  };

  interface IIconProps {
    userId: string;
  }

  const DeleteIcon: React.FC<IIconProps> = ({ userId }) => {
    return (
      <div
        id={userId}
        className="delete-user-btn"
        onClick={(event) => deleteUserHandler(event)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </div>
    );
  };

  const CopyIcon: React.FC<IIconProps> = ({ userId }) => {
    return (
      <div
        id={userId}
        className="copy-user-btn"
        onClick={(event) => copyUserHandler(event)}
      >
        <FontAwesomeIcon icon={faCopy} />
      </div>
    );
  };

  const users: Array<IUser> = useSelector(
    (state: RootStateOrAny) => state.users.users
  );

  const connectionConverter = (text: Array<string>): string => {
    if (text.length) {
      return text.join(" ");
    }
    return "No connections";
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName",
          },
          {
            Header: "Last Name",
            accessor: "lastName",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age",
          },
          {
            Header: "Profile Views",
            accessor: "profileViews",
          },
          {
            Header: "Country",
            accessor: "country",
          },
          {
            Header: "City",
            accessor: "city",
          },
          {
            Header: "Address",
            accessor: "address",
          },
          {
            Header: "Phone",
            accessor: "phone",
          },
          {
            Header: "Company",
            accessor: "company",
          },
        ],
      },
      {
        Header: "User",
        columns: [
          {
            Header: "Last Logged In",
            accessor: "lastLoggedIn",
          },
          {
            Header: "Connections",
            accessor: "connections",
            Cell: (props) => (
              <Tooltip
                title={connectionConverter(props.cell.value)}
                className="tooltip-table"
              >
                <Button>User Connections</Button>
              </Tooltip>
            ),
          },
          {
            Header: "Role",
            accessor: "role",
          },
          {
            Header: "Copy | Delete",
            accessor: "id",
            Cell: (props) => {
              return (
                <div className="delete-copy-container">
                  <CopyIcon userId={props.cell.value} />
                  <DeleteIcon userId={props.cell.value} />{" "}
                </div>
              );
            },
          },
        ],
      },
    ],
    []
  );

  const Table = ({ columns, data }) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      state: { pageIndex },
    } = useTable(
      {
        columns,
        data,
        initialState: {
          pageIndex: 0,
          pageSize: 7,
        },
      },
      useSortBy,
      usePagination
    );

    return (
      <>
        <div className={paginationClass}>
          <div className="table-controls">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {angleDoubleLeftIcon}
            </button>{" "}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {angleLeftIcon}
            </button>{" "}
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {angleRigthIcon}
            </button>{" "}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {angleDoubleRigthIcon}
            </button>{" "}
          </div>
          <div className="average-values">
            <div className="average-ages">
              Average Age:{" "}
              {users
                .map((user) => user.age)
                .reduce((sum, value) => {
                  return sum + value / users.length;
                }, 0)
                .toFixed(2)}
            </div>
            <div className="average-profile-views">
              Average Profile Views:{" "}
              {users
                .map((user) => user.profileViews)
                .reduce((sum, value) => {
                  return sum + value / users.length;
                }, 0)
                .toFixed(2)}
            </div>
          </div>
        </div>
        <table {...getTableProps()} className={usersTableClass}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="table-header-row"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="table-header-ceil"
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowDropDownIcon className="arrow-icon" />
                        ) : (
                          <ArrowDropUpIcon className="arrow-icon" />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className={tbodyClass}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="table-row">
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <br />
      </>
    );
  };

  return (
    <div className="users-table-container">
      {isTableLoading ? (
        <ClipLoader
          color="#ffffff"
          loading={isTableLoading}
          css={override}
          size={50}
        />
      ) : (
        <>
          <Table columns={columns} data={users} />
          <Dialog
            open={onDelete}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirm Action"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure want delete user?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                No
              </Button>
              <Button
                onClick={() => {
                  dispatch(deleteUser(deleteUserId));
                  setUserDeleted(true);
                  handleClose();
                }}
                color="primary"
                autoFocus
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={onCopy}
            onClose={copyClickClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirm Action"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure want delete user?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={copyClickClose} color="primary">
                No
              </Button>
              <Button
                onClick={() => {
                  dispatch(copyUser(copyUserId));
                  // setUserCopied(true);
                  copyClickClose();
                }}
                color="primary"
                autoFocus
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};
