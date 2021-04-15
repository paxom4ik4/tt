import { IUser } from "models/IUser";
import { ActionTypes } from "./constants";
import { fetchUsers } from "../../requests/fetchUsers";
import { Action, Dispatch } from "redux";

export const fetchUsersStart = () => ({
  type: ActionTypes.FETCH_USERS_START,
});

export const fetchUsersSuccess = (users: Array<IUser>) => ({
  type: ActionTypes.FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error: string) => ({
  type: ActionTypes.FETCH_USERS_FAILURE,
  payload: error,
});

export const addUser = (user: IUser) => ({
  type: ActionTypes.ADD_USER,
  payload: user,
});

export const deleteUser = (id: string) => ({
  type: ActionTypes.DELETE_USER,
  payload: id,
});

export const getUsers = () => (dispatch: Dispatch<Action>) => {
  dispatch(fetchUsersStart());

  fetchUsers()
    .then((res) => res.json())
    .then((data) => dispatch(fetchUsersSuccess(data)))

    .catch((err) => dispatch(fetchUsersFailure(err.message)));
};
