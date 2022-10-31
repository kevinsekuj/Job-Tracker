import { Auth0Provider } from "@auth0/auth0-react";
import { CLIENT_ID, DOMAIN } from "common/constants";
import ColorThemeWrapper from "components/ColorThemeWrapper";
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
      <ColorThemeWrapper>
        <Main />
      </ColorThemeWrapper>
    </Auth0Provider>
  </React.StrictMode>
);
