import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IUser } from "../../../models/IUser";
import * as React from "react";
import { useState, useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { addUser } from "store/Users/actions";
import { Button } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import "./AddUser.scss";

interface IAddUserProps {
  setIsOnAddUser: (state: boolean) => void;
}

const closeIcon: JSX.Element = <FontAwesomeIcon icon={faTimes} />;

export const AddUser: React.FC<IAddUserProps> = ({
  setIsOnAddUser,
}): JSX.Element => {
  const dispatch = useDispatch();

  const appTheme = useSelector((state: RootStateOrAny) => state.app.appTheme);
  const addUserContentClass =
    appTheme === "dark"
      ? "add-user-content add-user-content-dark"
      : "add-user-content";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: 0,
    country: "",
    city: "",
    address: "",
    phone: "",
    company: "",
    role: "",
  });

  const [clients, setClients] = useState<Array<IUser>>([]);
  const [connections, setConnections] = useState<Array<string>>([]);
  const [conntection, setConnection] = useState("");

  useEffect(() => {
    const userClients: Array<IUser> = users.filter(
      (user) => user.role === "client"
    );
    setClients(userClients);
  }, []);

  const setConnectionsHadnler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setConnection(event.target.value);
  };

  const users: Array<IUser> = useSelector(
    (state: RootStateOrAny) => state.users.users
  );

  const addCurrentConnection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const updatedConnections = [...connections, event.currentTarget.value];
    setConnections(updatedConnections);

    const updatedClients = clients.filter(
      (client) =>
        client.firstName + " " + client.lastName !== event.currentTarget.value
    );
    setClients(updatedClients);
  };

  const clientsOptions: Array<JSX.Element> = clients.map(
    (client: IUser, id: number) => {
      return (
        <option key={id.toString()}>
          {client.firstName + " " + client.lastName}
        </option>
      );
    }
  );

  const addNewUserHandler = (): void => {
    if (formData.firstName && formData.lastName) {
      const newUser: IUser = {
        ...formData,
        id: uuidv4(),
        avatar: "",
        profileViews: 0,
        lastLoggedIn: "",
        connections,
      };

      dispatch(addUser(newUser));
      setIsOnAddUser(false);
    } 
  };

  return (
    <div className="add-user-container">
      <div className={addUserContentClass}>
        <div className="add-user-header">
          <button
            onClick={() => {
              setIsOnAddUser(false);
            }}
            className="close-btn"
          >
            {closeIcon}
          </button>
          <h4>Adding New User</h4>
        </div>
        <div className="main-form-content">
          <div className="personal-info">
            <div className="inputs-content">
              <div className="input-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      firstName: event.currentTarget.value,
                    })
                  }
                />
              </div>
              <div className="input-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      lastName: event.currentTarget.value,
                    })
                  }
                />
              </div>
              <div className="input-group">
                <label htmlFor="age">Age</label>
                <input
                  id="age"
                  value={formData.age}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      age: Number(event.currentTarget.value),
                    })
                  }
                />
              </div>
              <div className="input-group">
                <label htmlFor="country">Country</label>
                <input
                  id="country"
                  value={formData.country}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      country: event.currentTarget.value,
                    })
                  }
                />
              </div>
              <div className="input-group">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  value={formData.city}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      city: event.currentTarget.value,
                    })
                  }
                />
              </div>
              <div className="input-group">
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  value={formData.address}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      address: event.currentTarget.value,
                    })
                  }
                />
              </div>
              <div className="input-group">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  value={formData.phone}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      phone: event.currentTarget.value,
                    })
                  }
                />
              </div>
              <div className="input-group">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  value={formData.company}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      company: event.currentTarget.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="connections-group">
            <div className="input-group">
              <label htmlFor="role">Role</label>
              <select
                name="role"
                id="tole"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    role: event.currentTarget.value,
                  })
                }
              >
                <option value="client">Client</option>
                <option value="lawyer">Lawyer</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="connections">Connections</label>
              <select
                value={conntection}
                name="connections"
                id="connections"
                placeholder="client name"
                onChange={(event) => {
                  setConnectionsHadnler(event);
                  addCurrentConnection(event);
                }}
              >
                <option className="choose-user-to-connect">
                  Choose user to connect with
                </option>
                {clientsOptions}
              </select>
            </div>
            <div className="current-connections-container">
              <h5>Chosen connections: </h5>
              <ul className="current-conntections">
                {connections.map((connection, id) => {
                  return <li key={id.toString()}>{connection}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="confirm-user-btn">
          <Button
            variant="contained"
            color="primary"
            onClick={() => addNewUserHandler()}
          >
            Add New One
          </Button>
        </div>
      </div>
    </div>
  );
};
