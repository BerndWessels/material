// Dependencies
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";
import lime from "@material-ui/core/colors/lime";

// Create the theme
const createTheme = prefersDarkMode =>
  responsiveFontSizes(
    createMuiTheme({
      palette: {
        type: prefersDarkMode ? "dark" : "light",
        primary: teal,
        secondary: lime
      },
      status: {
        danger: "orange"
      }
    })
  );

export default createTheme;
