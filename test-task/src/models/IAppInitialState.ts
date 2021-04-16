import { IUser } from "./IUser";

export interface IAppInitialState {
  isLoading: boolean;
  users: Array<IUser>;
  usersCopy: Array<IUser>;
  error: null | string;
}
