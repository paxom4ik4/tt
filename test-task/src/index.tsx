import { App } from "./App/App";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "store";
import { useMediaPredicate } from "react-media-hook";
import "./index.scss";

const Index: React.FC = () => {
  const preferredTheme = useMediaPredicate("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";
  const isDarkMode = preferredTheme === "dark";

  return (
    <div className="app-container">
      <Provider store={store}>
        <App isDarkMode={isDarkMode} />
      </Provider>
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
