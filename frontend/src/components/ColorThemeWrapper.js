import { Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ColorModeContext from "common/contexts";
import * as React from "react";
import { useMemo, useState } from "react";

const ColorThemeWrapper = ({ children }) => {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
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
};

export default ColorThemeWrapper;
