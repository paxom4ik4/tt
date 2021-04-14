import { IAppInitialState } from "models/IAppInitialState";
import { ActionTypes } from "./constants";

const initialState: IAppInitialState = {
  isLoading: false,
  users: [],
  error: null,
};

export const UsersTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USERS_START: {
      return { ...state, isLoading: true };
    }
    case ActionTypes.FETCH_USERS_FAILURE: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case ActionTypes.FETCH_USERS_SUCCESS: {
      return { ...state, isLoading: false, users: action.payload };
    }
    default:
      return state;
  }
};
