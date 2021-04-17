import * as React from "react";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { switchTheme } from "store/App/actions";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Header.scss";

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

interface IHeaderProps {
  setCookie: (name: string, value: any) => void;
}

export const Header: React.FC<IHeaderProps> = ({ setCookie }): JSX.Element => {
  const dispatch = useDispatch();

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
          onClick={() => {
            if (appTheme === "dark") {
              setCookie("appTheme", "light");
            } else {
              setCookie("appTheme", "dark");
            }
            dispatch(switchTheme());
          }}
        >
          {currentThemeIcon}
        </button>
        <div className="header-nav">
          <NavLink
            className="nav-link"
            to="/"
            activeClassName="active-link"
            exact
          >
            Users
          </NavLink>
          <NavLink
            className="nav-link"
            to="/chart"
            activeClassName="active-link"
            exact
          >
            Chart
          </NavLink>
        </div>
      </div>
    </div>
  );
};
