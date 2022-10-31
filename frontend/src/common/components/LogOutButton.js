import { useAuth0 } from "@auth0/auth0-react";
import { Button, createTheme, ThemeProvider } from "@mui/material";
import { NAV_BUTTON_THEME } from "common/constants";

const theme = createTheme(NAV_BUTTON_THEME);

const LogOutButton = () => {
  const { logout } = useAuth0();

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Sign out
      </Button>
    </ThemeProvider>
  );
};

export default LogOutButton;
