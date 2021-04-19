import * as React from "react";
import { useState } from "react";
import { UsersTable } from "./UsersTable/UsersTable";
import { AddUser } from "containers/Users/AddUser/AddUser";
import { Button } from "@material-ui/core";
import { IUser } from "models/IUser";
import SearchItem from "./SeachItem/SearchItem";
import { userIcon } from "common/Icons/Icons";
import "./Users.scss";

interface IUsersProps {
  users: Array<IUser>;
}

export const Users: React.FC<IUsersProps> = ({ users }): JSX.Element => {
  const [isOnAddUser, setIsOnAddUser] = useState<boolean>(false);

  return (
    <div className="users-container">
      <div className="users-content">
        <div className="users-content-header">
          <SearchItem />
          <Button variant="contained" onClick={() => setIsOnAddUser(true)}>
            {userIcon} <span style={{ padding: "0 0 0 10px" }}>+</span>
          </Button>
        </div>
        {users.length ? (
          <UsersTable />
        ) : (
          <div className="no-users">No users</div>
        )}
        {isOnAddUser && <AddUser setIsOnAddUser={setIsOnAddUser} />}
      </div>
    </div>
  );
};
