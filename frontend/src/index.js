import { Auth0Provider } from "@auth0/auth0-react";
import { CLIENT_ID, DOMAIN } from "common/constants";
import Main from "components/Main";
import "index.css";
import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={DOMAIN}
      clientId={CLIENT_ID}
      redirectUri={window.location.origin}
    >
      <Main />
    </Auth0Provider>
  </React.StrictMode>
);
