import PropTypes from "prop-types";
import { useMemo, useState } from "react";

import ColorModeContext from "common/contexts";

import { Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function ColorThemeWrapper({ children }) {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Paper sx={{ bgcolor: "background.default", color: "text.primary" }}>
          {children}
        </Paper>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

ColorThemeWrapper.propTypes = {
  children: PropTypes.node,
};

ColorThemeWrapper.defaultProps = {
  children: undefined,
};
