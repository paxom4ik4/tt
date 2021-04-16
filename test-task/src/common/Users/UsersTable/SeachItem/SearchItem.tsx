import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./SearchItem.scss";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { searchUser } from "store/Users/actions";

const SearchItem: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const appTheme = useSelector((state: RootStateOrAny) => state.app.appTheme);

  const searchUserContainerClass =
    appTheme === "dark"
      ? "search-user-container search-user-container-dark"
      : "search-user-container";

  const searchIcon = (
    <FontAwesomeIcon icon={faSearch} className="search-icon" />
  );

  return (
    <div className={searchUserContainerClass}>
      {searchIcon}
      <input
        className="search-user-input"
        placeholder="search for users..."
        onChange={(event) => dispatch(searchUser(event.currentTarget.value))}
      />
    </div>
  );
};

export default SearchItem;
