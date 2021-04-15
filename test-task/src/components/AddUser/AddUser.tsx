  import { faTimes } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { IUser } from "../../models/IUser";
  import * as React from "react";
  import { useState, useEffect } from "react";
  import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
  import { addUser } from "store/UsersTable/actions";
  import { Button } from "@material-ui/core";
  import { Alert } from "@material-ui/lab";

  import "./AddUser.scss";

  interface IAddUserProps {
    setIsOnAddUser: (state: boolean) => void;
    setOnSuccsessCreation: (state: boolean) => void;
  }

  export const AddUser: React.FC<IAddUserProps> = ({
    setIsOnAddUser,
    setOnSuccsessCreation,
  }): JSX.Element => {
    const dispatch = useDispatch();

    const appTheme = useSelector((state: RootStateOrAny) => state.app.appTheme);
    const addUserContentClass =
      appTheme === "dark"
        ? "add-user-content add-user-content-dark"
        : "add-user-content";

    const closeIcon: JSX.Element = <FontAwesomeIcon icon={faTimes} />;

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
    const [conntection, setConnection] = useState("");

    const [isDataFullfield, setIsDataFullfield] = useState<boolean>(true);

    const setConnectionsHadnler = (
      event: React.ChangeEvent<HTMLSelectElement>
    ): void => {
      setConnection(event.target.value);
    };

    const [clients, setClients] = useState<Array<IUser>>([]);

    const users: Array<IUser> = useSelector(
      (state: RootStateOrAny) => state.users.users
    );

    useEffect(() => {
      const userClients: Array<IUser> = users.filter(
        (user) => user.role === "client"
      );
      setClients(userClients);
    }, []);

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
      if (
        firstName &&
        lastName &&
        role &&
        age &&
        country &&
        city &&
        address &&
        phone &&
        company
      ) {
        const newUser: IUser = {
          id: users.length.toString(),
          firstName,
          lastName,
          avatar: "",
          role,
          lastLoggedIn: "offline",
          profileViews: 0,
          age: Number(age),
          country,
          city,
          address,
          phone,
          company,
          connections,
        };

        dispatch(addUser(newUser));
        setIsOnAddUser(false);

        setOnSuccsessCreation(true);
        setTimeout(() => {
          setOnSuccsessCreation(false);
        }, 2000);
      }

      setIsDataFullfield(false);
      setTimeout(() => {
        setIsDataFullfield(true);
      }, 3000);
    };

    return (
      <div className="add-user-container">
        {isDataFullfield ? (
          ""
        ) : (
          <Alert severity="error" className="empty-fields-alert">
            Check input data. All fields should not be empty!
          </Alert>
        )}
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
                  value={conntection}
                  name="connections"
                  id="connections"
                  placeholder="client name"
                  onChange={(event) => {
                    setConnectionsHadnler(event);
                    addCurrentConnection(event);
                  }}
                >
                  <option className="choose-user-to-connect">Choose user to connect with</option>
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
