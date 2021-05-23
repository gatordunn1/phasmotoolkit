import React from "react";

import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useSelector } from "react-redux";
import { selectPalette } from "./themeSlice";

export default function Theme({ children }) {
  const palette = useSelector(selectPalette);

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
