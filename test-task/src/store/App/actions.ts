import { ActionTypes } from "./constants";

export const switchTheme = (theme: string) => ({
  type: ActionTypes.SWITCH_THEME,
  payload: theme,
});
