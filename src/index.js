import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "jquery/dist/jquery";
import "popper.js/dist/popper";
import "../css/styles.scss";
import App from "./components/App";
import { Auth0Provider } from "@auth0/auth0-react";
import history from "./auth/history";

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

render(
  <Auth0Provider
    domain={process.env.Domain}
    clientId={process.env.ClientId}
    audience={process.env.API_Audience}
    redirectUri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <Router history={history}>
      <App />
    </Router>
  </Auth0Provider>,
  document.getElementById("app")
);
