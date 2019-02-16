import React from "react";
import ReactDOM from "react-dom";

import Firebase, { FirebaseContext } from "customComponents/Firebase";
import App from "customComponents/App";

import "assets/scss/material-kit-react.css";

import * as serviceWorker from "serviceWorker";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

serviceWorker.register();
