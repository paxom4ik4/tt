import * as React from "react";
import { useEffect } from "react";
import { ChartContainer } from "../containers/Chart/Chart";
import { Users } from "../containers/Users/Users";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "../common/Header/Header";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getUsers } from "store/Users/actions";
import { IUser } from "models/IUser";
import { switchTheme } from "store/App/actions";
import { useCookies } from "react-cookie";
import "./App.scss";

interface IAppProps {
  isDarkMode: boolean;
}

export const App: React.FC<IAppProps> = ({ isDarkMode }): JSX.Element => {
  const dispatch = useDispatch();

  const users: Array<IUser> = useSelector(
    (state: RootStateOrAny) => state.users.users
  );
  const appTheme: string = useSelector(
    (state: RootStateOrAny) => state.app.appTheme
  );

  const [cookies, setCookie] = useCookies(["app_theme"]);

  console.log(isDarkMode);

  useEffect(() => {
    if (cookies.appTheme) {
      if (cookies.appTheme === "dark") {
        dispatch(switchTheme());
      }
      setCookie("appTheme", "light");
    } else {
      isDarkMode && dispatch(switchTheme());
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
        <Header setCookie={setCookie} />
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
