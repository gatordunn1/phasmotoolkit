import React from "react";

import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { palettes } from "./constants";

export default function Theme({ children, themeName }) {
  const palette = React.useMemo(() => palettes[themeName], [themeName]);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        ...palette,
      }),
    [palette]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
