import { ActionTypes } from "./constants";

interface IAppReducerState {
  appTheme: string;
}

const initialState: IAppReducerState = {
  appTheme: "light",
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SWITCH_THEME: {
      const nextTheme = state.appTheme === "dark" ? "light" : "dark";
      return {
        ...state,
        appTheme: nextTheme,
      };
    }

    default:
      return state;
  }
};
