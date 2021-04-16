import * as React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Alert, AlertTitle } from "@material-ui/lab";
import { UsersTable } from "./UsersTable/UsersTable";
import { AddUser } from "containers/Users/AddUser/AddUser";
import { Button } from "@material-ui/core";
import { IUser } from "models/IUser";
import SearchItem from "./SeachItem/SearchItem";
import "./Users.scss";

interface IUsersProps {
  users: Array<IUser>;
}

export const Users: React.FC<IUsersProps> = ({ users }): JSX.Element => {
  const userIcon: JSX.Element = <FontAwesomeIcon icon={faUser} />;
  const [isOnAddUser, setIsOnAddUser] = useState<boolean>(false);
  const [userDeleted, setUserDeleted] = useState<boolean>(false);
  const [isDataFullfield, setIsDataFullfield] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setUserDeleted(false);
    }, 2500);
  }, [userDeleted]);

  useEffect(() => {
    setTimeout(() => {
      setIsDataFullfield(true);
    }, 2500);
  }, [isDataFullfield]);

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
      {userDeleted ? (
        <Alert severity="info" className="success-alert">
          <AlertTitle>Deleted</AlertTitle>
          User has successfully been deleted
        </Alert>
      ) : (
        ""
      )}
      {isDataFullfield ? (
        ""
      ) : (
        <Alert severity="error" className="empty-fields-alert">
          Check input data. All fields should not be empty!
        </Alert>
      )}
      <div className="users-content">
        <div className="users-content-header">
          <SearchItem />
          <Button variant="contained" onClick={() => setIsOnAddUser(true)}>
            {userIcon} <span style={{ padding: "0 0 0 10px" }}>+</span>
          </Button>
        </div>
        {users.length ? (
          <UsersTable setUserDeleted={setUserDeleted} />
        ) : (
          <div className="no-users">No users</div>
        )}

        {isOnAddUser ? (
          <AddUser
            setIsDataFullfield={setIsDataFullfield}
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
