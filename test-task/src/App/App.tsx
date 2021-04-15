import * as React from "react";
import { useEffect } from "react";
import { ChartContainer } from "../common/Chart/Chart";
import { Users } from "../common/Users/Users";
import { CSSTransition } from "react-transition-group";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "../common/Header/Header";
import { IRoute } from "models/IRoute";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import usePrefersColorScheme from "use-prefers-color-scheme";
import { getUsers } from "store/Users/actions";
import { IUser } from "models/IUser";
import { switchTheme } from "store/App/actions";

import "./App.scss";

export const App: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const preferredColorSchema: string = usePrefersColorScheme();
  const isDarkMode: boolean = preferredColorSchema === "dark";

  useEffect(() => {
    if (isDarkMode) {
      dispatch(switchTheme());
    }
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
