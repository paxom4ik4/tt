import Chart from "components/Chart";
import Users from "components/Users";
import * as React from "react";
import { CSSTransition } from "react-transition-group";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "components/Header";
import { IRoute } from "models/IRoute";

import "./App.scss";
import { RootStateOrAny, useSelector } from "react-redux";

const App: React.FC = (): JSX.Element => {
  const routes: Array<IRoute> = [
    { path: "/", name: "Users", Component: Users },
    { path: "/charts", name: "Chart", Component: Chart },
  ];

  const appTheme: string = useSelector(
    (state: RootStateOrAny) => state.app.appTheme
  );

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
                  <div className="page">
                    <Component />
                  </div>
                </CSSTransition>
              )}
            </Route>
          ))}
        </>
      </Switch>
    </Router>
  );
};

export default App;
