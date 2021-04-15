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
    case ActionTypes.ADD_USER: {
      const updatedUsers = [...state.users, action.payload];
      return {
        ...state,
        users: updatedUsers,
      };
    }
    case ActionTypes.DELETE_USER: {
      const deleteUserId = state.users.findIndex(
        (user) => user.id === action.payload
      );

      const updatedUsers = [
        ...state.users.splice(0, deleteUserId),
        ...state.users.splice(deleteUserId + 1),
      ];

      return {
        ...state,
        users: updatedUsers,
      };
    }
    default:
      return state;
  }
};
