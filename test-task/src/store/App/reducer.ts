import { ActionTypes } from "./constants";

interface IAppReducerState {
  appTheme: string;
}

const initialState: IAppReducerState = {
  appTheme: "light",
};

interface IAppAction {
  type: string;
  payload: string;
}

export const appReducer = (state = initialState, action: IAppAction) => {
  switch (action.type) {
    case ActionTypes.SWITCH_THEME: {
      return {
        ...state,
        appTheme: action.payload,
      };
    }

    default:
      return state;
  }
};
