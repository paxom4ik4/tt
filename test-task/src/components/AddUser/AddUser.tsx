import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IUser } from "models/IUser";
import * as React from "react";
import { useState, useEffect } from "react";
import { RootStateOrAny, useSelector } from "react-redux";

import "./AddUser.scss";

interface IAddUserProps {
  setIsOnAddUser: (state: boolean) => void;
}

const AddUser: React.FC<IAddUserProps> = ({ setIsOnAddUser }): JSX.Element => {
  const closeIcon = <FontAwesomeIcon icon={faTimes} />;

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [role, setRole] = useState<string>("client");
  const [connections, setConnections] = useState<Array<string>>([]);

  const [clients, setClients] = useState<Array<IUser>>([]);

  const users = useSelector((state: RootStateOrAny) => state.users.users);

  useEffect(() => {
    // Получаем список всех клиентов
    const userClients = users.filter((user) => user.role === "client");
    setClients(userClients);
  }, []);

  const addCurrentConnection = (event) => {
    const updatedConnections = [...connections, event.currentTarget.value];
    setConnections(updatedConnections);

    const updatedClients = clients.filter(
      (client) =>
        client.firstName + " " + client.lastName !== event.currentTarget.value
    );
    setClients(updatedClients);
  };

  const clientsOptions = clients.map((client: IUser, id: number) => {
    return (
      <option key={id.toString()}>
        {client.firstName + " " + client.lastName}
      </option>
    );
  });

  const addNewUser = (user: IUser) => {
    const newUser = {
      firstName,
      lastName,
      age,
      country,
      city,
      address,
      phone,
      company,
      role,
      connetions: [],
    };
  };

  return (
    <div className="add-user-container">
      <div className="add-user-content">
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
                  value={firstName}
                  onChange={(event) => setFirstName(event.currentTarget.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  value={lastName}
                  onChange={(event) => setLastName(event.currentTarget.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="age">Age</label>
                <input
                  id="age"
                  value={age}
                  onChange={(event) => setAge(event.currentTarget.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="country">Country</label>
                <input
                  id="country"
                  value={country}
                  onChange={(event) => setCountry(event.currentTarget.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  value={city}
                  onChange={(event) => setCity(event.currentTarget.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  value={address}
                  onChange={(event) => setAddress(event.currentTarget.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  value={phone}
                  onChange={(event) => setPhone(event.currentTarget.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  value={company}
                  onChange={(event) => setCompany(event.currentTarget.value)}
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
                onChange={(event) => setRole(event.target.value)}
              >
                <option value="client">Client</option>
                <option value="lawyer">Lawyer</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="connections">Connections</label>
              <select
                name="connections"
                id="connections"
                placeholder="client name"
                onChange={(event) => addCurrentConnection(event)}
              >
                <option selected disabled>
                  Choose people to connect
                </option>
                {clientsOptions}
              </select>
            </div>
            <div className="current-connections-container">
              <h4>Chosen connections: </h4>
              <ul className="current-conntections">
                {connections.map((connection, id) => {
                  return <li key={id.toString()}>{connection}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
        <button className="confirm-user-btn">Add New One</button>
      </div>
    </div>
  );
};

export default AddUser;
