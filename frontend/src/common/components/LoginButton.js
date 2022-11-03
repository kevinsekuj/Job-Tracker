import { useAuth0 } from "@auth0/auth0-react";

import { NAV_BUTTON_THEME } from "common/constants";

import { Button, createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme(NAV_BUTTON_THEME);

const LoginButton = ({ rest }) => {
  const { loginWithPopup } = useAuth0();

  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" onClick={() => loginWithPopup()} {...rest}>
        Sign In
      </Button>
    </ThemeProvider>
  );
};

export default LoginButton;
