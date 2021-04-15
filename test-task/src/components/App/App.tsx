import * as React from "react";
import { ChartContainer } from "components/Chart/Chart";
import { Users } from "components/Users/Users";
import { CSSTransition } from "react-transition-group";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "components/Header/Header";
import { IRoute } from "models/IRoute";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

import "./App.scss";
import { getUsers } from "store/UsersTable/actions";
import { IUser } from "models/IUser";

export const App: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUsers());
  }, []);

  const users: Array<IUser> = useSelector(
    (state: RootStateOrAny) => state.users.users
  );

  const routes: Array<IRoute> = [
    { path: "/", name: "Users", Component: <Users users={users} /> },
    { path: "/charts", name: "Chart", Component: <ChartContainer /> },
  ];

  const appTheme: string = useSelector(
    (state: RootStateOrAny) => state.app.appTheme
  );

  appTheme === "dark"
    ? document.body.classList.add("dark-theme")
    : document.body.classList.remove("dark-theme");

  return (
    <Router>
      <Header routes={routes} />
      <Switch>
        <>
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={300}
                  classNames="page"
                  unmountOnExit
                >
                  <div className="page">{Component}</div>
                </CSSTransition>
              )}
            </Route>
          ))}
        </>
      </Switch>
    </Router>
  );
};
