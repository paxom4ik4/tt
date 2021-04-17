import * as React from "react";
import { useEffect } from "react";
import { ChartContainer } from "../containers/Chart/Chart";
import { Users } from "../containers/Users/Users";
import { AnimatedSwitch } from "react-router-transition";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "../common/Header/Header";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import usePrefersColorScheme from "use-prefers-color-scheme";
import { getUsers } from "store/Users/actions";
import { IUser } from "models/IUser";
import { switchTheme } from "store/App/actions";
import { useCookies } from "react-cookie";
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

  const [cookies, setCookie] = useCookies(["app_theme"]);

  useEffect(() => {
    if (cookies.appTheme) {
      if (cookies.appTheme === "dark") {
        dispatch(switchTheme());
      }
      setCookie("appTheme", "light");
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
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper"
          >
            <Route path="/" exact>
              <Users users={users} />
            </Route>
            <Route path="/chart" exact>
              <ChartContainer />
            </Route>
          </AnimatedSwitch>
        </Switch>
      </div>
    </Router>
  );
};
