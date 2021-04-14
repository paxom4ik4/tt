import * as React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "./Users.scss";
import UsersTable from "./UsersTable";
import AddUser from "components/AddUser";

const Users: React.FC = (): JSX.Element => {
  const userIcon = <FontAwesomeIcon icon={faUser} />;
  const [isOnAddUser, setIsOnAddUser] = useState<boolean>(false);

  return (
    <div className="users-container">
      <div className="users-content">
        <div className="users-content-header">
          <h3 className="users-table-title">Table</h3>
          <button className="add-user-btn" onClick={() => setIsOnAddUser(true)}>
            {userIcon} +
          </button>
        </div>
        <UsersTable />
        {isOnAddUser ? <AddUser setIsOnAddUser={setIsOnAddUser} /> : ""}
      </div>
    </div>
  );
};

export default Users;
