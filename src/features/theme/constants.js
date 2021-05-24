const themes = {
  dark: {
    palette: {
      type: "dark",
      action: {
        hover: "#ffb627",
      },
      primary: {
        main: "#0582ca",
        light: "#00a6fb",
        dark: "#006494",
      },
      background: {
        default: "#272733",
        paper: "#2b2d42",
        paperalt: "#402f4a",
        papercontrast: "#2e1f27",
      },
      secondary: {
        main: "#5e548e",
        dark: "#231942",
        light: "#9f86c0",
      },
      ghostName: {
        background: "#2b2d42",
      },
      ghosts: {
        background: "#2b2d42",
        invalid: "#5c677d",
        valid: "#2a628f",
      },
      info: {
        main: "#5aa9e6",
      },
      text: {
        primary: "#5fa8d3",
        secondary: "#cae9ff",
        contrast: "#ffbc0a",
      },
    },
  },
  light: {
    palette: {
      type: "light",
      action: {
        hover: "#d1d4b8",
      },
      background: {
        default: "#e8decf",
        paper: "#b1cf9f",
        paperalt: "#6897b0",
        papercontrast: "#c5d86d",
      },
      primary: {
        main: "#c8d5b9",
        light: "#faf3dd",
        dark: "#8fc0a9",
      },
      secondary: {
        main: "#d3bccc",
        dark: "#a167a5",
        light: "#e8d7f1",
      },
      ghostName: {
        background: "#b8bedd",
      },
      ghosts: {
        background: "#4f6d7a",
        invalid: "#4f6d7a",
        valid: "#4872b5",
      },
      info: {
        main: "#1957db",
      },
      text: {
        primary: "#3d718f",
        secondary: "#cae9ff",
        contrast: "#240b0b",
      },
    },
  },
};

export const initialState = {
  themeTypes: ["dark", "light"],
  themeType: "dark",
  themes,
};
