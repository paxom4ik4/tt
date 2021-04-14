import { getUsers } from "containers/UsersTable/actions";
import * as React from "react";
import { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useTable, useSortBy, usePagination } from "react-table";
import { useState } from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

import "./UsersTable.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faSortDown,
  faSortUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const UsersTable: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const override = css`
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-color: black;
  `;
  const [color, setColor] = useState("#ffffff");

  const isTableLoading = useSelector(
    (state: RootStateOrAny) => state.users.isLoading
  );

  const angleRigthIcon = <FontAwesomeIcon icon={faAngleRight} />;
  const angleLeftIcon = <FontAwesomeIcon icon={faAngleLeft} />;
  const angleDoubleRigthIcon = <FontAwesomeIcon icon={faAngleDoubleRight} />;
  const angleDoubleLeftIcon = <FontAwesomeIcon icon={faAngleDoubleLeft} />;

  const sortUpIcon = <FontAwesomeIcon icon={faSortUp} />;
  const sortDownIcon = <FontAwesomeIcon icon={faSortDown} />;

  const deleteUserHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    console.log(event.currentTarget);
  };

  const DeleteIcon: React.FC = () => {
    return (
      <div
        className="delete-user-btn"
        onClick={(event) => deleteUserHandler(event)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </div>
    );
  };

  const data = useSelector((state: RootStateOrAny) => state.users.users);

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
          },
          {
            Header: "Role",
            accessor: "role",
          },
          {
            Header: "Delete",
            Cell: () => <DeleteIcon />,
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
        <div className="pagination">
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
        <table {...getTableProps()} className="users-table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>{column.isSorted ? column.isSortedDesc : ""}</span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
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
          color={color}
          loading={isTableLoading}
          css={override}
          size={50}
        />
      ) : (
        <Table columns={columns} data={data} />
      )}
    </div>
  );
};

export default UsersTable;
