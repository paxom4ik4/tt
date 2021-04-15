import * as React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Alert, AlertTitle } from "@material-ui/lab";
import { UsersTable } from "./UsersTable/UsersTable";
import { AddUser } from "common/AddUser/AddUser";
import { Button } from "@material-ui/core";
import { IUser } from "models/IUser";

import "./Users.scss";

interface IUsersProps {
  users: Array<IUser>;
}

export const Users: React.FC<IUsersProps> = ({ users }): JSX.Element => {
  const userIcon: JSX.Element = <FontAwesomeIcon icon={faUser} />;
  const [isOnAddUser, setIsOnAddUser] = useState<boolean>(false);

  const [onSuccessCreation, setOnSuccsessCreation] = useState<boolean>(false);

  return (
    <div className="users-container">
      {onSuccessCreation ? (
        <Alert severity="success" className="success-alert">
          <AlertTitle>Success</AlertTitle>
          New user appears in the end of the table —{" "}
          <strong>check it out!</strong>
        </Alert>
      ) : (
        ""
      )}
      <div className="users-content">
        <div className="users-content-header">
          <h3 className="users-table-title">Table</h3>
          <Button variant="contained" onClick={() => setIsOnAddUser(true)}>
            {userIcon} <span style={{ padding: "0 0 0 10px" }}>+</span>
          </Button>
        </div>
        {users.length ? (
          <UsersTable />
        ) : (
          <div className="no-users">No users</div>
        )}

        {isOnAddUser ? (
          <AddUser
            setIsOnAddUser={setIsOnAddUser}
            setOnSuccsessCreation={setOnSuccsessCreation}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
