import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import { ModalProvider } from "./context/Modal";
import { SearchProvider } from "./context/search";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <SearchProvider>
      <ModalProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ModalProvider>
    </SearchProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
