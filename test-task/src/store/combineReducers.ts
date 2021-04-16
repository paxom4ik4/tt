import { usersReducer } from "store/Users/reducer";
import { appReducer } from "store/App/reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  users: usersReducer,
  app: appReducer,
});

export default rootReducer;
