import { IAppInitialState } from "models/IAppInitialState";
import { IUser } from "models/IUser";
import { ActionTypes } from "./constants";

const initialState: IAppInitialState = {
  isLoading: false,
  users: [],
  usersCopy: [],
  error: null,
};

interface IActionPayload {
  type: string;
  payload: IUser | IUser[] | string;
}

export const UsersTableReducer = (
  state = initialState,
  action: IActionPayload
) => {
  switch (action.type) {
    case ActionTypes.FETCH_USERS_START: {
      return { ...state, isLoading: true };
    }
    case ActionTypes.FETCH_USERS_FAILURE: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case ActionTypes.FETCH_USERS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        users: action.payload,
        usersCopy: action.payload,
      };
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
    case ActionTypes.COPY_USER: {
      const copyUserId = state.users.findIndex(
        (user) => user.id === action.payload
      );
      const copiedUser = state.users[copyUserId];
      copiedUser.id = state.users.length.toString();
      const updatedUsers = [...state.users, copiedUser];

      return {
        ...state,
        usersCopy: updatedUsers,
        users: updatedUsers,
      };
    }
    case ActionTypes.SEARCH_USERS: {
      const searchUsers = [
        ...state.users.filter(
          (user) =>
            user.firstName
              .toLowerCase()
              .includes(action.payload.toString().toLowerCase()) ||
            user.lastName
              .toLowerCase()
              .includes(action.payload.toString().toLowerCase())
        ),
      ];

      if (action.payload === "") {
        return {
          ...state,
          users: state.usersCopy,
        };
      }
      return {
        ...state,
        copyUsers: state.users,
        users: searchUsers,
      };
    }
    default:
      return state;
  }
};
