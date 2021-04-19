import * as React from "react";
import { searchIcon } from "common/Icons/Icons";
import { useDispatch } from "react-redux";
import { searchUsers } from "store/Users/actions";
import "./SearchItem.scss";

const SearchItem: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  return (
    <div className="search-user-container">
      {searchIcon}
      <input
        className="search-user-input"
        placeholder="search for users..."
        onChange={(event) => dispatch(searchUsers(event.currentTarget.value))}
      />
    </div>
  );
};

export default SearchItem;
