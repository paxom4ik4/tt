import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faCopy,
  faTrash,
  faUser,
  faSearch,
  faTimes,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

export const angleRigthIcon: JSX.Element = (
  <FontAwesomeIcon icon={faAngleRight} />
);
export const angleLeftIcon: JSX.Element = (
  <FontAwesomeIcon icon={faAngleLeft} />
);
export const angleDoubleRigthIcon: JSX.Element = (
  <FontAwesomeIcon icon={faAngleDoubleRight} />
);
export const angleDoubleLeftIcon: JSX.Element = (
  <FontAwesomeIcon icon={faAngleDoubleLeft} />
);
export const transhIcon: JSX.Element = <FontAwesomeIcon icon={faTrash} />;
export const copyIcon: JSX.Element = <FontAwesomeIcon icon={faCopy} />;
export const userIcon: JSX.Element = <FontAwesomeIcon icon={faUser} />;
export const searchIcon: JSX.Element = (
  <FontAwesomeIcon icon={faSearch} className="search-icon" />
);
export const closeIcon: JSX.Element = <FontAwesomeIcon icon={faTimes} />;

export const sunIcon: JSX.Element = (
  <div>
    <FontAwesomeIcon icon={faSun} />
  </div>
);
export const moonIcon: JSX.Element = (
  <div>
    <FontAwesomeIcon icon={faMoon} />
  </div>
);
