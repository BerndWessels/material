/**
 * Dependencies
 */
import React, { useMemo } from "react";
import { hot } from "react-hot-loader/root";
/**
 * Redux
 */
import reducers from "../../redux/reducers";
/**
 * Providers
 */
import { BrowserRouter } from "react-router-dom/umd/react-router-dom";
import { IntlProvider } from "react-intl";
import { ThemeProvider } from "@material-ui/core/styles";
import { ReduxProvider } from "../../providers/redux";
/**
 * Hooks
 */
import useMediaQuery from "@material-ui/core/useMediaQuery";
/**
 * Theme
 */
import createTheme from "../../theme/theme";
/**
 * Components
 */
import CssBaseline from "@material-ui/core/CssBaseline";
import Site from "../site/site";

/**
 * Component
 */
const Root = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(() => createTheme(prefersDarkMode), [prefersDarkMode]);
  return (
    <ThemeProvider theme={theme}>
      <IntlProvider
        key={navigator.language}
        locale={navigator.language}
        onError={() => {}}
      >
        <ReduxProvider initialState={{ bla: "blub" }} reducers={reducers}>
          <BrowserRouter>
            <CssBaseline />
            <Site />
          </BrowserRouter>
        </ReduxProvider>
      </IntlProvider>
    </ThemeProvider>
  );
};

export default hot(Root);
