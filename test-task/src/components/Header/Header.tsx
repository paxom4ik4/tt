import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { switchTheme } from "store/App/actions";
import { IRoute } from "models/IRoute";
import * as React from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "./Header.scss";

interface IHeaderProps {
  routes: Array<IRoute>;
}

export const Header: React.FC<IHeaderProps> = ({ routes }): JSX.Element => {
  const dispatch = useDispatch();

  const sunIcon: JSX.Element = (
    <div>
      <FontAwesomeIcon icon={faSun} />
    </div>
  );
  const moonIcon: JSX.Element = (
    <div>
      <FontAwesomeIcon icon={faMoon} />
    </div>
  );

  const appTheme: string = useSelector(
    (state: RootStateOrAny) => state.app.appTheme
  );

  const currentThemeIcon = appTheme === "dark" ? moonIcon : sunIcon;
  const headerClass = appTheme === "dark" ? "header header-dark" : "header";
  const themeModeClass = appTheme === "dark" ? "theme-mode-dark" : "theme-mode";

  return (
    <div className={headerClass}>
      <div className="header-content">
        <button
          className={themeModeClass}
          onClick={() => dispatch(switchTheme())}
        >
          {currentThemeIcon}
        </button>
        <div className="header-nav">
          {routes.map((route) => (
            <NavLink
              className="nav-link"
              key={route.path}
              to={route.path}
              activeClassName="active-link"
              exact
            >
              {route.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};
