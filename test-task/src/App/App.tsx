import * as React from "react";
import { useEffect } from "react";
import { ChartContainer } from "../containers/Chart/Chart";
import { Users } from "../containers/Users/Users";
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

  const users: Array<IUser> = useSelector(
    (state: RootStateOrAny) => state.users.users
  );
  const appTheme: string = useSelector(
    (state: RootStateOrAny) => state.app.appTheme
  );

  const preferredColorSchema: string = usePrefersColorScheme();
  const isDarkMode: boolean = preferredColorSchema === "dark";

  useEffect(() => {
    if (isDarkMode) {
      dispatch(switchTheme());
    }
    dispatch(getUsers());
  }, []);

  const containerTheme =
    appTheme === "dark"
      ? "app-container dark-theme"
      : "app-container light-theme";

  return (
    <Router>
      <div className={containerTheme}>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Users users={users} />
          </Route>
          <Route path="/chart" exact>
            <ChartContainer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
