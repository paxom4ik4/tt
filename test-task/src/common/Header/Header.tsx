import * as React from "react";
import { switchTheme } from "store/App/actions";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Header.scss";
import { moonIcon, sunIcon } from "common/Icons/Icons";

interface IHeaderProps {
  setCookie: (name: string, value: any) => void;
}

export const Header: React.FC<IHeaderProps> = ({ setCookie }): JSX.Element => {
  const dispatch = useDispatch();

  const appTheme: string = useSelector(
    (state: RootStateOrAny) => state.app.appTheme
  );

  const currentThemeIcon = appTheme === "dark" ? moonIcon : sunIcon;

  return (
    <div className="header">
      <div className="header-content">
        <button
          className="header-change-theme-btn"
          onClick={() => {
            appTheme === "dark"
              ? setCookie("appTheme", "light")
              : setCookie("appTheme", "dark");
            appTheme === "dark"
              ? dispatch(switchTheme("light"))
              : dispatch(switchTheme("dark"));
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
