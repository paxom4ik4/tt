import { App } from "./App/App";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "store";

import "./index.scss";

const Index: React.FC = () => {
  return (
    <div className="app-container">
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
